
/**
 * 模板属性设置
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-07-21 02:16:57
 *</pre>
 */
$(function() {
	modelProp  = new ModelProp();
	modelProp.init();
	
	formUrl = modelProp.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#modelPropGrid",// 列表对象
			PAGER : "#modelPropPager",// 列表分页
			FORM : '#modelPropForm'// 表单form
	};
	/**
	 * 模板属性设置 对象
	 * @returns {ModelProp}
	 */
	ModelProp = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ModelProp.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			var me=this;
			if (me.hasInit) // 是否已初始化
				return false;
			me.hasInit = true;
			if ($(me.consts.GRID).length > 0)//列表
				me._initGridList();
			if ($(me.consts.FORM).length > 0){//表单
				me._initForm();
				me._initData();
			}
			var li = $.find('select[name^="tableName"]');
			$.each(li,function(i){
				me.initTableSelect2(i+1);
			})
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/loanp/model/modelProp/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','模板名称','模板参数','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'propName',
				                	   index: 'prop_name_'

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
										action:__ctx+'/loanp/model/modelProp/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/loanp/model/modelProp/remove.htm?id={id}'
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
				var modelName = $('#propName').val();
				var id = $('#id').val();
				var url=__ctx+'/loanp/model/modelProp/save.htm';
				var modelPropParamList = [];
				var modelPropParamTable = $('body').find("table[name='modelPropParamList']");
				var trList = $(modelPropParamTable).find("tbody").find("tr");
				$(trList).each(function(){
					var modelPropParamPo = {};
					var inps = $(this).find("input,select");
					$(inps).each(function(){
						var name = $(this).attr("name");
						if(typeof(name)!='undefined'){
							var value = $(this).val();
							if(name.indexOf('select') > -1){
								name='select';
								try{
									value=this.options[value].text;
								}catch(e){value='null'}
							}
							else if(name.indexOf('tableName') > -1){
								name='tableName';
								if(value==null)
									value='null'
							}
								
							modelPropParamPo[name] = value;
						}
					});
					modelPropParamList.push(modelPropParamPo);
				});
				var strJson = JSON2.stringify(modelPropParamList);
				$.post(url,{id:id,modelName:modelName,param:strJson},function(responseText){
					var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.alert(resultMessage.getMessage());
			    		window.location.href=__ctx + "/loanp/model/modelProp/list.htm";
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
							window.location.href = __ctx+'/loanp/model/modelProp/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
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
				,$el = $('select[name="tableName'+i+'"]')
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
							callback({'id':$val,'text':$val,'comment':$comment});
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
					
					
					$el.on('change', function (evt, params) {
						var sdata = params || $el.select2("data")[0];
						var __url = __ctx + "/platform/codegen/tableConfig/columnList.htm?tableName="+sdata.id;
						$.ajax({
							type: 'POST',
							url: __url,
							success: function(data){
								me.initField(i,data);
							},
							error: function(){
							}
						});
					})
			
			
			
		},
		initField : function(i,data){
			var $fl=$('select[name="select'+i+'"]')
			,me=this;
			$fl.empty();
			
			data.forEach(function(v,i){
				var pn = v.id
				,option = $("<option>").val(i).text(pn); 
				$fl.append(option); 
			})
		}
	};
})();


