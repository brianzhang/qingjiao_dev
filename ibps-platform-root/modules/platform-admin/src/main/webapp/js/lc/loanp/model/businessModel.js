
/**
 * 业务模板
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-07-21 10:16:51
 *</pre>
 */
$(function() {
	businessModel  = new BusinessModel();
	businessModel.init();
	
	formUrl = businessModel.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#businessModelGrid",// 列表对象
			PAGER : "#businessModelPager",// 列表分页
			FORM : '#businessModelForm'// 表单form
	};
	/**
	 * 业务模板 对象
	 * @returns {BusinessModel}
	 */
	BusinessModel = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BusinessModel.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			//if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			//}
			var li = $.find('select[name^="select"]');
			$.each(li,function(i){
				me.initTableSelect2(i+1);
			})
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			// 自定义添加按钮
			$(document).on('click', 'a.my-add', function() {
				var url = __ctx + '/loanp/model/businessModel/init.htm';
				DialogUtil.dialog({
					title : '新建模板',
					content : url,
					area : ['30%','40%'],
					btn : [{
						label : '下一步',
						index:'editParam',
						iconCls:'layui-laydialog-btn0 btn btn-success fa fa-arrow-circle-right',
						action : function(dialog, index) {
							var data = DialogUtil.getChildFrameWindow(index).businessModelInit.getNextData();
							if ($.isEmpty(data)) {
								return;
							}
							me.editData(data);
							DialogUtil.close(index);
						}
					}]
				})
			});
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/loanp/model/businessModel/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','模板名称','属性模板id','参数','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'

				                	 					                	 	}, {
				                 	   name:'propModelId',
				                	   index: 'prop_model_id_',
				                	   hidden : true

				                	 					                	 	}, {
				                 	   name:'param',
				                	   index: 'param_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/loanp/model/businessModel/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/model/businessModel/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/loanp/model/businessModel/get.htm?id={id}'
									}]
								} ],
								loadComplete: function(){
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
								}
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var modelName = $('#modelName').val();
				var id = $('#id').val();
				var url=__ctx+'/loanp/model/businessModel/save.htm';
				var businessModelParamList = [];
				var businessModelParamTable = $('body').find("table[name='businessModelParamList']");
				var trList = $(businessModelParamTable).find("tbody").find("tr");
				$(trList).each(function(){
					var businessModelParam = {};
					var inps = $(this).find("input,select");
					$(inps).each(function(){
						var name = $(this).attr("name");
						if(typeof(name)!='undefined'){
							var value = $(this).val();
							console.log(value)
							if(name.indexOf('@select') > -1){
								
								name=name.split("@")[0];
							}
							businessModelParam[name] = value;
						}
					});
					businessModelParamList.push(businessModelParam);
				});
				var strJson = JSON2.stringify(businessModelParamList);
				$.post(url,{id:id,modelName:modelName,param:strJson,propModelId:$('#propModelId').val()},function(responseText){
					var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.alert(resultMessage.getMessage());
			    		window.location.href=__ctx + "/loanp/model/businessModel/list.htm";
					} else {
						DialogUtil.error(resultMessage.getMessage());
					}
				});	
			});
			
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
			try{
				$('.clockpicker').clockpicker();
			}catch(e){}
			try{
				$('.spinner').spinner({ 
				    max:100, 
				    min:1, 
				    step:1 
				}); 
			}catch(e){}
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/loanp/model/businessModel/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		editData : function(data){
			window.location.href = __ctx+'/loanp/model/businessModel/edit.htm?name='+data.name+'&propModelId='+data.propModelId;
		},
		/**
		 * 添加子表数据
		 */
		addSub : function(tableName) {
			var me = this;
			var table = $("table[name='"+tableName+"']");
			// 修改记录数
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val();
			if(undefined == subSize || null == subSize) subSize = 0;
			subSize = parseInt(subSize)+1;
			$(subSizeObj).val(subSize);
			$(table).find("tfoot").find("tr").find("td").html("共" + (subSize) + "条");
			
			// 添加一行
			var templateId = tableName+"TrTemplate";
			var html = template(templateId, {index:subSize});
			$(table).find("tbody").append(html);
			this.initTableSelect2(subSize);
		},
		/**
		 * 删除子表数据
		 */
		removeSub : function(tableName,obj) {
			var me = this;
			// 删除一行
			var trObj = $(obj).parent().parent();
			$(trObj).nextAll().each(function(){
				var firstObj = $(this).find("td:first");
				var index = $(firstObj).html();
				$(firstObj).html(parseInt(index) - 1);
			});
			$(trObj).remove();
			
			// 修改记录数
			var table = $("table[name='"+tableName+"']");
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val();
			if(undefined == subSize || null == subSize) subSize = 0;
			subSize = parseInt(subSize)-1;
			$(subSizeObj).val(subSize);
			$(table).find("tfoot").find("tr").find("td").html("共" + (subSize) + "条");
		},
		/**
		 * 删除子表选中数据
		 */
		removeSubSelected : function(tableName) {
			var me = this;
			// 删除一行
			var table = $("table[name='"+tableName+"']");
			
			// 修改记录数
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val();
			if(undefined == subSize || null == subSize) subSize = 0;
			subSize = parseInt(subSize)-1;
			$(subSizeObj).val(subSize);
			$(table).find("tfoot").find("tr").find("td").html("共" + (subSize) + "条");
		},
		/**
		 * 删除子表选中数据
		 */
		removeSubAll : function(tableName) {
			var me = this;
			// 删除一行
			var table = $("table[name='"+tableName+"']");
			$(table).find("tbody").html("");
			
			// 修改记录数
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val("0");
			$(table).find("tfoot > tr > td").html("共0条");
		},
		initTableSelect2 : function(i){
			var me = this
				,$el = $('select[name*="select'+i+'"]')
				,options = $el.data()
				,$val = options.value
				,$comment = options.comment
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
				var params = {
						placeholder:'请选择'
						,theme: "bootstrap"
						,language: "zh-CN"
						,multiple: multiple
						,allowClear: clear
						,separator: split
						,initSelection: function(element, callback) { // 初始化时设置默认值  
							callback({'id':$val,'text':$val});
					    }
						,formatSelection : function (item) {return item.id;}  /*选择结果中的显示*/
						,formatResult : function (item) {return item.id;}  /*搜索列表中的显示*/
						,escapeMarkup : function (markup) {return markup;}
						,createSearchChoice : function(term, data) {
							/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
					        return {id: term, text: term};
					    }
					};
					
					if(ajax){
						params.ajax = {
						    url: ajax,
						    dataType: 'json',
						    delay: 250,
						    data: function (_params) {
						    	return {tableName: _params.term};
						    }
							,processResults: function (data) {
								return {
						          results: data
						        };
						     },
						     cache: true
						};
					}
					
					$el.select2(params);
		}
	};
})();


