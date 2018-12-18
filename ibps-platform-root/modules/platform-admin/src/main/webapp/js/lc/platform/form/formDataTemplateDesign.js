/**
 * 表单数据模版设计
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
	formDataTemplateDesign = new FormDataTemplateDesign();
	formDataTemplateDesign.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TREE_ID : 'boTree',// 树
	},me;
	FormDataTemplateDesign = function() {
		this.boTree = null;
	};

	/**
	 * 方法
	 */
	FormDataTemplateDesign.prototype = {
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
		
			//初始化布局
			this._initLayout();
			
			this._initScroll();
			
			this._initDataTemplate(this.data);
			
			this.initIntro();
			
			this.introTemplate();
			
			$('.js-add-menu').click(function(){
				me.add2Resource('/f/'+$(this).data("id")+".htm");
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
	                        intro: '<h5>模版编辑区</h5>可为模版设计排版<br>1、可以随意拖拽模版的位置；<br>2、可以删除不需要的模版；<br>3、查询条件的操作。<br><br>',
	                        //这里可以规定引导框相对于选中对象出现的位置 top,bottom,left,right
	                        position: 'right'
	                    },
	                    {
	                        //第三步添加字段引导
	                        element: '#add_template',
	                        intro: '<h5>添加模版区</h5>以拖拽或点击的方式选择您需要的模版，设置到中间的模版编辑区。<br><br>',
	                        position: 'right'
	                    },{
	                        //第四步控件设置引导
	                        element: '#query_condition',
	                        intro: '<h5>查询条件</h5>可以设置当前选中查询条件的相关信息；<br><br>',
	                        position: 'left'
	                    },{
	                        //第四步控件设置引导
	                        element: '#edit_template',
	                        intro: '<h5>模版设置</h5>可以设置当前选中模版的相关信息；<br><br>',
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
	            	if( id == 'query_condition' || id == 'edit_template'){
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
		_initDataTemplate:function(data){
			var form =  $("#formData").val();
			if($.isEmpty(form)){
				DialogUtil.alert("绑定表单不存在！",function(){
					DialogUtil.closeDialog();
				});
				return;
			}
		
			var formData = eval('(' + form + ')');
			var fields =formData.fields;
			
			new Templatebuilder({
		        selector : '#data_template_design',
		        fields:fields,
		        data:data,
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