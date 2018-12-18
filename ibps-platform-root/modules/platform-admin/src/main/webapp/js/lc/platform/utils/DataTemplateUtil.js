/**
 * 数据模版帮助类
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-11-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
DataTemplateUtil = {
		/**
		* 	key:数据模版key
		*	options 
		*			title:标题
		*			params：查询参数 或动态参数
		*			shows ： 展示数据，
		*			callback: 回调方法 ; 
		*                
		*					
		*/
		open: function(key,options){
			var me = this;
			if($.isEmpty(key)){
				DialogUtil.alert("数据模版key不能为空");
				return;
			}
			var url = __ctx+'/platform/data/dataTemplate/getByKey.htm';
			
			$.post(url,{"key":key},function(results){
				if(results.result){
					var data = eval('(' + results.data + ')'),
						fields = me.datasets2Fields(data.datasets);
					
						if(options.isPreview && data.type == 'dialog'){
							//对话框，显示字段
							me.previewDialog({
								data:data,
								fields:fields
							},options);
						}else{
							me.preview({
								data:data,
								fields:fields
							},options);
						}
				}else{
					DialogUtil.error(results.msg,results.cause?results.cause:null,"预览出错了");
				}
		
			});
		},
		/**
		 * 预览界面
		 * @param params
		 * 			需要传递参数
		 * 			data：该数据模版的数据。
		 * 			
		 * @param options
		 * @returns
		 */
		preview:function(params,options){
			var url =__ctx+'/platform/data/dataTemplate/preview.htm',
				data = params.data,
				type = data.type;
			var dialogs =  data.dialogs,
				 btn=null,
				 area= ['100%','100%'],
				 title =false,
				 maxmin=false;
			
			if(type == 'dialog' ){
				//初始化对话框脚本
				this._initDialogScript(dialogs);
				btn = this.getDialogButtons(dialogs.buttons?dialogs.buttons.dialog_buttons:null,options);
				title = options.title?options.title:data.name;
				maxmin = true;
				area= this.getArea(dialogs);
				params.params = options.params;
				params.isSingle =  this.getIsSingle(options,dialogs);
				params.shows = options.shows;
			}else if(type == 'valueSource' ){
				title = options.title?options.title:data.name;
				params.params = options.params;
				maxmin = true;
				area= ["60%","80%"]
			}
				
			DialogUtil.dialog({
				title:title,
				content:url,
				params:params,//传递参数
				maxmin:maxmin,
				area:area,
				btn:btn
			});
		},
		getIsSingle:function(options,dialogs){
			if( $.isEmpty(options.isSingle)){
				if(!dialogs  || !dialogs.attrs )
					return true;
				return dialogs.attrs.multi == "N";
			}else{
				return options.isSingle?true:false;
			}
		},
		datasets2Fields:function(datasets){
			if($.isEmpty(datasets))
				return [];
			var fields = [],dataset;
			for (var _i = 0, _len = datasets.length; _i < _len; _i++) {
			   	dataset = datasets[_i];
			   	if(dataset.attrType == 'column'){
			   		fields.push(dataset);
			   	}
			}
			return fields;
		},
		/**
		 * 初始化对话框脚本
		 */
		_initDialogScript:function(dialogs){
		      // 表单的事件
	    	  if(dialogs.attrs && dialogs.attrs.script){
	    		  try {
	    			  $("head").find("#jDialog").remove();
	    			  $("head") .append('<script type="text/javascript" id="jDialog">  try {\n'+dialogs.attrs.script+'\n} catch (e) {if(console){ console.info(e);	}}</script>');
				} catch (e) {
				   	 if(console){ 
				   		 console.info(e);
				   	}
				}
	    	  }
		},
		/**
		 * 页面的宽和高
		 */
		getArea:function(dialogs){
			var area =  ["100%",'100%'];
			if(!dialogs || !dialogs.attrs )
				return area;
			
			var width = dialogs.attrs.width,height =  dialogs.attrs.height; 
				width =$.isEmpty(width)?'100%':((width<=100)?width+"%":width+"px");
				height =$.isEmpty(height)?'100%':((height<=100)?height+"%":height+"px");	
			
			return [width,height];
		},
		getDialogButtons:function(dialogButtons,options){
			var btns = [],_this = this;
			if($.isEmpty(dialogButtons))
				return btns;
			for (var _i = 0, _len = dialogButtons.length; _i < _len; _i++) {
				var button = dialogButtons[_i],type= button.button_type,
					code = (type == 'custom'?( button.code || (type+button.$index)):type),
					btn ={
						label:button.label,
						code:code,
						iconCls:' btn  '+( button.style?button.style:FormButtons.t.buttons[type].style )+ ' '+( button.icon?button.icon: ( FormButtons.t.buttons[type].icon))
					};
				btn.action = function(dialog,index,conf) {
					_this._onClick(dialog,index,conf.code,options);
				}
				
				btns.push(btn);
			}
			return btns;
		},
		_onClick:function(dialog,index,code,options){
			var  data = DialogUtil.getChildFrameWindow(index).DTR.getData();
			options = options||{};
			options.dialog = dialog;
			options.index = index;	
			options.data = data;	
			// 前置事件
			var beforSubmitResult = $.JDialog._beforeSubmit(this,code,options);

			if (typeof (beforSubmitResult) != "undefined"
					&& !beforSubmitResult) {
				return;
			}

			if (this.onClick) {
				var r = this.onClick(code,options);
				if (r)
					return this;
			}
		},
		onClick:function(code,options){
			var  dialog = options.dialog,
					index = options.index, 
					data = options.data;
			switch (code) {
			case  'ok' :
					
				  if(options.callback){
					  if($.isEmpty(data)){
						  DialogUtil.msg("请选择!");
						  return;
					  }
					  options.callback(data,index);
				  }
            	
            	  if(!options.isClose)
            		  DialogUtil.close(index);
				break;
			case  'clean' :
				  if(options.callback)
          		  options.callback([],index);
          	  if(!options.isClose)
          		  DialogUtil.close(index);
				break;
				
			case  'cancel' :
          		  DialogUtil.close(index);
				break;
				
			case  'cleanSelected':
				DialogUtil.getChildFrameWindow(index).DTR.cleanSelected();
				break;
			default:
				break;
			}
		},
		
		dynamicParamsDialog:function(dynamicParams,params,options){
			var _this = this;
			DialogUtil.dialog({
				title:"【预览】参数设置",
				content:__ctx+'/platform/data/dataTemplate/dynamicParams.htm',
				params:{
					dynamicParams:dynamicParams,
					fields:params.fields
				},//传递参数
				maxmin:true,
				area:["60%","80%"],
				btn:[{
	            	label: '下一步',
	            	iconCls:'btn btn-primary fa fa-ok',
	                action: function(dialog,index) {
	                	var  d = DialogUtil.getChildFrameWindow(index).getData();
	                	
	                	options.params = d;
	                	_this.preview(params,options);
	                }
			 	},{
	            	label: '取消',
	            	iconCls:'btn btn-danger fa fa-cancel',
	                action: function(dialog,index) {
	                	DialogUtil.close(index);
	                }
	            }]
			});
		},
		buildDynamicParams:function(conditions){
			var  dynamicParams = {};
			if($.isEmpty(conditions))
				return dynamicParams;
			var filterConditions = $.isNotEmpty(conditions)?conditions[0]:{},
				 filter =  filterConditions.filter;
			if(filter)
				this._createDynamicParams(dynamicParams,filter);
			return dynamicParams;
		},

		_createDynamicParams:function(params,filter){
			var rules = filter.rules;
			for (var _i = 0, _len = rules.length; _i < _len; _i++) {
				var rule = rules[_i];
				if(	rule.rules){
					this.buildDynamicParams(params,	rule);
				}else{
					if(rule.source == 'dynamic'){
						params[rule.field] =  rule;
					}
				}
			}
		},
		previewDialog : function(params,options){
			var data = params.data,  dynamicParams = {};
			if(data.type == 'default' )
				return 	this.preview(params,options);
			if(data.templates){
				//如果是组合
				var template ={},conditions={};
				if(data.showType == 'compose'){
					var tpl ={};
					if(data.composeType == 'treeList'){
						tpl = data.templates[1];
					}else if(data.composeType == 'listTree'){
						tpl = data.templates[0];
					}
					if(!tpl){
						DialogUtil.alert("未设置模版！");
						return ;
					}
					
					
					if(tpl.attrs["bind_template"] == 'Y'){
						var t = this.getDataByKey(tpl.attrs["bind_template_key"] );
						if(t){
							template = t.templates[0];
							params.fields =  this.datasets2Fields(t.datasets);
						}
					}else{
						template = tpl;
					}
				}else{
					template =  data.templates[0];
				}
				
				if($.isNotEmpty(template))
					conditions =template.filter_conditions;
				
				dynamicParams = this.buildDynamicParams(conditions);
			}
			if($.isNotEmpty(dynamicParams)){
				this.dynamicParamsDialog(dynamicParams,params,options);
			}else{
				this.preview(params,options);
			}
			
		},
		getDataByKey:function(key){
			var template;
			//模版需要从后台抓去树形
			$.ajax({
				url :  __ctx+ "/platform/data/dataTemplate/getByKey.htm",
				type : "post",
				dataType:"json",
				async:false,
				data : {
					key:key
				},
				success : function(results) {
						if(!results.result){
							DialogUtil.alert(results.msg);
							return;
						}
						template = 	 eval('(' +results.data + ')');
				}
			});	
			
			return template;	
			
		},
		previewData : function(data){
			DialogUtil.open({
				title : "返回数据结果",
				area : [ '500px', '400px' ],
				content : '<div class="div_error_msg">实际是会返回数据到表单并关闭该对话窗口：</div><pre class="code-popup">'
						+ JSON.stringify(data, null, 2)
						.replace(/</g, '&lt;').replace(/>/g, '&gt;')+'</pre>'+ '</pre>',
				btn : [ {
					label : '&#x786E;&#x5B9A;',
					action : function(dialog, index) {
						DialogUtil.close(index);
					}
				} ]
			});
		},
		urlDialog : function(options){
			if(!options){
				DialogUtil.alert("请设置有效的参数！");
				return;
			}
			var width =options.width,height = options.height; 
				width =$.isEmpty(width)?'80%':((width<=100)?width+"%":width+"px");
				height =$.isEmpty(height)?'80%':((height<=100)?height+"%":height+"px");
			DialogUtil.dialog({
				title:options.title?options.title:"对话框",
				content:options.url,
				params:options.params?options.params:{},//传递参数
				area:[width,height],
				btn:[{
		            	label: '确定',
		            	iconCls:'btn btn-primary fa fa-ok',
		                action: function(dialog,index) {
		                	var  urlDialog = DialogUtil.getChildFrameWindow(index).UrlDialog;
		                	if(!urlDialog ){
		                		DialogUtil.alert("请在自定义对话框添加UrlDialog的getData()方法！");
		                		return;
		                	}
		                	var  d = urlDialog.getData();
		                	 
		                	  if(!options.isClose)
		                		  DialogUtil.close(index);
		                	  if(options.callback)
		                		  options.callback(d,index);
		                }
				 	},{
		            	label: '清空',
		            	iconCls:' btn btn-success fa fa-clean',
		                action: function(dialog,index) {
		                	  if(!o.isClose)
		                		  DialogUtil.close(index);
		                	  if(o.callback)
		                		  o.callback([],index);
		                }
				 	},{
		            	label: '取消',
		            	iconCls:'btn btn-danger fa fa-cancel',
		                action: function(dialog,index) {
		                	DialogUtil.close(index);
		                }
		            }]
			});
		}
};

+(function() {
	var paths  = [
	          	'/js/lc/platform/data/JDialog.js'
              ];
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ __ctx + pi +'"></script>');
    }
}).call(this);
