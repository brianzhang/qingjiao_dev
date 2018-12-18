/**
 * 数据模版设计
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-07 15:42:57
 *</pre>
 */
$(function() {
	dataTemplateDesign = new DataTemplateDesign();
	dataTemplateDesign.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TREE_ID : 'datasetTree',// 树
	},me;
	DataTemplateDesign = function() {
		this.boTree = null;
	};

	/**
	 * 方法
	 */
	DataTemplateDesign.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			me = this;
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			// 从前个页面传过来的参数
			this.data ={};
			
			var id = $("#id").val(),
				 data = $("#data").val(),
				defData = $.isEmpty(data)?{}: JSON.parse(data);
			if(id != ""){
				this.data  = defData;
			}else{
				var params ={}
				if(frameElement){
					params=  frameElement.dialog.params;
				}
				//合并多个值
				$.extend(this.data, defData,params);
			}
			

			this.datasets =  this.data.datasets;
			
			this.datasetKey = this.data.datasetKey;
		
			//初始化布局
			this._initLayout();
			
			this._initScroll();
			
			
			this.initIntro();
			
			this.introTemplate();
			
			this.initDatasetTree();

			me._initDataTemplate();
			
			$('.js-add-menu').click(function(){
				me.add2Resource('/d/'+$(this).data("id")+".htm");
			});
		},
		initIntro:function(){
           
           if (arguments.length ==0) {
               if ($.cookie("intro_template_cookie_index") == 1)
                   return;
           } 
			if(!$.browser.ie8)
				this.loadIntro();
		},
		loadIntro:function(){
			  introJs().setOptions({
	                //对应的按钮
	                prevLabel:"上一步", 
	                nextLabel:"下一步",
	                skipLabel:"不再提示",
	                doneLabel:"完成",
	                //对应的数组，顺序出现每一步引导提示
	                steps: [
	                    {
	                        //第一步表单编辑引导
	                        element: '#template-builder',
	                        //这里是每个引导框具体的文字内容，中间可以编写HTML代码
	                        intro: '<h5>模版编辑区</h5>可为展示模版设计排版<br><br>',
	                        //这里可以规定引导框相对于选中对象出现的位置 top,bottom,left,right
	                        position: 'right'
	                    },
	                    {
	                        //第二步添加字段引导
	                        element: '#datasetTreeDiv',
	                        intro: '<h5>数据集</h5>可以设置数据集的字段，可以知道有什么字段。<br><br>',
	                        position: 'right'
	                    },{
	                        //第三步控件设置引导
	                        element: '#edit_template',
	                        intro: '<h5>模版设置</h5>可以设置当前选中模版的相关信息；<br><br>',
	                        position: 'left'
	                    }, {
	                        //第四步控件设置引导
	                        element: '#template_property',
	                        intro: '<h5>模版属性设置</h5>可以设置当前模版的相关相关信息；<br><br>',
	                        position: 'left'
	                    }, {
	                        //第六步保存模版引导
	                        element: '#save_tools',
	                        intro: '1、保存模版：模版编辑完毕后记得保存您的模版；<br>2、预览：可以查看模版的展示效果。<br><br>',
	                        position: 'bottom'
	                    }
	                ]

	            }).onbeforechange(function(c) {
	            	var id = $(c).attr("id");
	            	if( id == 'template_property' || id == 'edit_template'){
	            		$("#data_template_design").find(".tb-tabs a[href=\"#"+id+"\"]").click();
	            	}
	            }).oncomplete(function(){
	                $.cookie("intro_template_cookie_index",1, { expires: 365, path: '/' });
	            }).onexit(function(){
	                //点击结束按钮后， 执行的事件
	               $.cookie("intro_template_cookie_index",1, { expires: 365, path: '/' });
	            }) .start();		
		},
		introTemplate:function(){
			var _this =this;
			$(".js-intro-template").click(function(){
				if($.browser.ie8)
					alert("ie8不支持！")
				else
				_this.loadIntro();
			});
		},
		initDatasetTree:function(){
			var me =this;
			var setting = {
				async: {enable: false},
				data: {
					key:{name:"label"},
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "parentId",
						rootPId:me._treeRootId
					}
				},
				view: {
					selectedMulti: false,
					showIconFont:true
				},
				callback:{
					onClick: function(e, treeId, treeNode) {
					//	me.treeOnLeftClick(me,treeNode);	
					},
					onRightClick :function(e,treeId, treeNode) {
							me.treeOnRightClick.apply(me,arguments);
					}
				}
			};
				me.setFields(this.datasets);
				$("#datasetJson").val(JSON.stringify(this.datasets));
				me.datasetTree=$.fn.zTree.init($("#datasetTree"), setting,this.datasets);
				me.datasetTree.expandAll(true);
		},
		treeOnRightClick:function(e,treeId,treeNode){
			var me = this;
			if (!treeNode) 
				return;
			me.datasetTree.selectNode(treeNode);
			if(!treeNode.children)
				return
			var menu= $.isEmpty( treeNode.parentId)?$('#topMenu'):$('#subMenu');
			menu.contextMenu(e,{
				onItem: function(context, ev) {
					var target =$(ev.target), 
					action = target.data("action");
					if (target.hasClass('disabled'))
						return false;
					switch (action) {
							case "node_setting":// 设置字段
								me.settingField();
								break;
						}
				}
			});
		},
		settingField:function(){
			var datasets = $("#datasetJson").val();
			var me =this;
				DialogUtil.dialog({
					title:"设置字段控件",
					content:__ctx+"/platform/data/dataTemplate/settingField.htm",
					params:{
						datasets:JSON.parse(datasets)
					},//传递参数
					area:["700px","80%"],
					btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		                	var  d = DialogUtil.getChildFrameWindow(index).dataTemplateSettingField.getData();
		                
		                	me.datasets = d;
		                	me.initDatasetTree();
		                	DialogUtil.close(index);
		                
		                }
				 	},
				 	{
		            	label: '重置',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		            		DialogUtil.confirm('确认重置吗？重置后会还原默认。',function(rtn){
		        				if(!rtn)
		        					return;
		        				
		        				var url = __ctx+"/platform/data/dataset/buildTree.htm";
		        				$.post(url,{datasetKey:me.datasetKey},function(result){
		                        	me.datasets = result;
				                	me.initDatasetTree();
				                	
				                	DialogUtil.close(index);
				                	DialogUtil.msg("重置成功！")
		        				});
			
		            		});
		                }
				 	},
				 	{
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
				});
		},
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout = $('body').layout({
				applyDefaultStyles : true,
				east: {
					size:					300
				},
				onresize : function() {
				}
			});
			//布局加载完成初始化
			$(".layout-header").removeClass("hidden");
			$(".tb-tabs").removeClass("hidden");
			
			var height = $(window).height();
			$(".niceScroll").height(height-42);
		},
		/**
		 * 滚动
		 */
		_initScroll:function(){
	    	$(".niceScroll").niceScroll({
	    		horizrailenabled : false,
	    		cursorborder : "0",
	    		cursorwidth : "6px",
	    		cursorcolor : "#2A2A2A",
	    		zindex : "5555",
	    		autohidemode : true,
	    		bouncescroll : true,
	    		mousescrollstep : '40',
	    		scrollspeed : '100',
	    		background : "#999",
	    		cursoropacitymax : "0.6",
	    		cursorborderradius : "0"
	    	});
	    	$(".niceScroll").getNiceScroll().resize();
		},
		setFields:function(datasets){
			if($.isEmpty(datasets))
				return [];
			var fields = [],dataset;
			for (var _i = 0, _len = datasets.length; _i < _len; _i++) {
			   	dataset = datasets[_i];
			   	if(dataset.attrType == 'column'){
			   		fields.push(dataset);
			   	}
			}
			//还有可能有计算字段和关联字段
			
			DataTemplatebuilder.fields = fields;
			DataTemplatebuilder.response_fields = {};

			_.each(fields, function(field) {
				DataTemplatebuilder.response_fields[field.name] = field;
				//主键
				if(field.isPk == 'Y')
					DataTemplatebuilder.pk_field  = field.name;
			});
			
			
		},
		_initDataTemplate:function(){

			new DataTemplatebuilder({
		        selector : '#data_template_design',
		        data:this.data,
		        callback:function(rtn){
		        	frameElement.dialog.callback(true);
		        	if(!rtn)
		        		DialogUtil.close(frameElement.dialog.index);
		        }
			});
		},
		/**
		 * 添加到菜单资源
		 * @param id
		 */
		add2Resource:function(menuUrl){
			var url =  __ctx+ "/platform/auth/resources/addResource.htm?menuUrl="+menuUrl;
			DialogUtil.dialog({
				params:{},
				callback:function(rtn){
				},
				maxmin:false,
				title:false,
				area : [ '100%', '100%' ],
				content :url
			});
		},

		
	};
})();