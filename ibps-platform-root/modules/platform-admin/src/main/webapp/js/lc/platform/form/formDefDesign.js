/**
 * 表单设计
 */
$(function() {
	formDefDesign = new FormDefDesign();
	formDefDesign.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TREE_ID : 'boTree',// 树
	},me;
	FormDefDesign = function() {
		this.boTree = null;
	};

	/**
	 * 方法
	 */
	FormDefDesign.prototype = {
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
			//
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
	
			//初始化布局
			this._initLayout();
			//初始化滚动
			this._initScroll();
			
			this._initTree();
			
			this.formbuilder(this.data);
			
			this.initIntro();
		
			this.introFrom();
		},
		initIntro:function(){
            if (arguments.length ==0) {
                if ($.cookie("intro_form_cookie_index") == 1)
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
	                        element: '#form-builder',
	                        //这里是每个引导框具体的文字内容，中间可以编写HTML代码
	                        intro: '<h5>表单编辑区</h5>可为表单设计排版<br>1、可以随意拖拽控件的位置；<br>2、可以删除不需要的控件；<br>3、可以复制一份控件；<br>4、一些特殊控件的操作；<br>5、表单标题的操作。<br><br>',
	                        //这里可以规定引导框相对于选中对象出现的位置 top,bottom,left,right
	                        position: 'right'
	                    },
	                    {
	                        //第二步引导
	                        element: '#bo',
	                        intro: '<h5>业务对象区</h5>可以管理业务对象和绑定字段的对象属性。<br><br>',
	                        position: 'right'
	                    },
	                    {
	                        //第五步表单属性引导
	                        element: '#form_property',
	                        intro: '<h5>表单属性区</h5>您可以修改表单名称及其相应的描述。<br><br>',
	                        position: 'left'
	                    },
	                    {
	                        //第三步添加字段引导
	                        element: '#add_field',
	                        intro: '<h5>字段控件区</h5>以拖拽或点击的方式选择您需要的控件，设置到中间的表单编辑区。<br><br>',
	                        position: 'left'
	                    },{
	                        //第四步控件设置引导
	                        element: '#edit_field',
	                        intro: '<h5>控件设置</h5>可以设置当前选中控件的相关信息；<br><br>',
	                        position: 'left'
	                    },{
	                        //第六步保存表单引导
	                        element: '#save_tools',
	                        intro: '1、保存：表单编辑完毕后记得保存您的表单；<br>2、预览：可以查看表单的展示效果。<br><br>',
	                        position: 'bottom'
	                    }
	                ]

	            }).onbeforechange(function(c) {
	            	var id = $(c).attr("id");
	            	if(id == 'add_field' || id == 'edit_field' || id == 'form_property'){
	            		$("#form_design").find(".fb-tabs a[href=\"#"+id+"\"]").click();
	            	}
	            	if(id == 'bo'){
	            		$("#form_design").find(".fb-tabs a[href=\"#"+id+"\"]").click();
	            	}
	            }).oncomplete(function(){
	                $.cookie("intro_form_cookie_index",1, { expires: 365, path: '/' });
	            }).onexit(function(){
	               $.cookie("intro_form_cookie_index",1, { expires: 365, path: '/' });
	            }) .start();		
		},
		introFrom:function(){
			var _this =this;
			$(".js-intro-from").click(function(){
	            if(!$.browser.ie8)
	            	_this.loadIntro();
	            else
	            	alert("ie8不支持介绍！");
			});
		},
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout = $('body').layout({
				applyDefaultStyles : true,
				west: {
					size:					250
				},
				east: {
					size:					300
				},
				onresize : function() {
				}
			});
			//布局加载完成初始化
			$(".layout-header").removeClass("hidden");
			$(".fb-tabs").removeClass("hidden");
			
			var height = $(window).height();
			$(".niceScroll").height(height-40);
		
	
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
		/**
		 * 初始化树
		 */
		_initTree:function(){
			var me = this;
			me._treeRootId = 0;
			me.treeNodes =[];
		
			me._initTreeToolbar();
			//构建BO树
			me._loadTree();
		},
	
		/**
		 * 初始化加载树
		 */
		_loadTree:function(){
			var me =this;
			var setting = {
				async: {enable: false},
				data: {
					key:{name:"name"},
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
						me.treeOnLeftClick(me,treeNode);	
					},
					onRightClick :function(e,treeId, treeNode) {
					//	me.treeOnRightClick(me,treeNode,e);
					}
				}
			};
			var mode = this.data.mode?this.data.mode:'bo';
			var url = __ctx+"/platform/form/formDef/buildTree.htm";
			$.post(url,{code:this.data.code,busId:(this.data.busId?this.data.busId:''),mode:mode},function(result){
				$("#boDefJson").val(JSON.stringify(result));
				Formbuilder.boDef = result;
				me.boTree=$.fn.zTree.init($("#"+me.consts.TREE_ID), setting,result);
				me.boTree.expandAll(true);
        	});
			
//        	$("[treenode_a]:not(.level0)").draggable({
//				revert:true,
//				cursor:"default",
//		        appendTo: ".fb-response-fields",
//		        helper: function(e) {
//		        	var  $helper=  $(e.target);
//		        
//		        		$helper = $("<div class='field-dragging'>").html($helper.clone());
//		        		$helper.css({
//		        	          width: '100px',
//		          	          height: '80px'
//		          	        });
//		            return $helper;
//		        },
//		        stop: function(event, ui){
//		        //	ui.position();
//		        }
//			});
		},
		treeOnLeftClick: function(me,treeNode,e){
			if(!treeNode)
				return;
			this.fb.mainView.setBoField(treeNode);
			
		},
		treeOnRightClick:function(me,treeNode,e){
			if (!treeNode) 
				return;
			me.boTree.selectNode(treeNode);
			var menu= treeNode.id==me._treeRootId?$('#topMenu'):$('#subMenu');
			if(treeNode.children)
				return
			menu.contextMenu(e,{
				onItem: function(context, ev) {
					var target =$(ev.target), 
					action = target.data("action");
					if (target.hasClass('disabled'))
						return false;
					switch (action) {
							case "node_bind":// 新增节点
								me.bindBo(treeNode);
								break;
						}
				}
			});
		},
		bindBo:function(treeNode){
			var me = this;
			new BoDefDialog({
				isSingle : true,
				params : {},
				callback : function(data, index) {
					var boDefId =  data[0].id;
					var url = __ctx+"/platform/bo/boDef/getBoTree.htm";
					$.post(url,{id:boDefId},function(result){
						
							for (var i = 0; i < result.length; i++) {
								me.treeNodes.push(result[i]);
							}
							
							me._loadTree();
							$("#boDefId").val(boDefId);
							$("#boDefJson").val(JSON.stringify(result));
							Formbuilder.boDef = result;
							DialogUtil.close(index);
				       });
				}
			}).show();
		},
		_initTreeToolbar:function(){
			
		},
		formbuilder:function(data){
			this.fb = new Formbuilder({
			        selector : '#form_design',
			   //     boDef:JSON.parse( $('#boDefJson').val()),
			        data:data,
			        callback:function(rtn){
			        	if(frameElement && frameElement.dialog )
			        		frameElement.dialog.callback(true);
			        	if(!rtn)
			        		DialogUtil.close(frameElement.dialog.index);
			        }
			});
		
			
		}
	};
})();