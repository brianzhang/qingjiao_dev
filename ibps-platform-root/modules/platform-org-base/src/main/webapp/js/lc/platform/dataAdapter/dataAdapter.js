/**
 * 数据适配器明细表
 * 
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-06-06 15:52:34
 *</pre>
 */
$(function() {
	dataAdapter  = new DataAdapter();
	dataAdapter.init();
	
	formUrl = dataAdapter.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#dataAdapterGrid",// 列表对象
			PAGER : "#dataAdapterPager",// 列表分页
			FORM : '#dataAdapterForm'// 表单form
	};
	/**
	 * 数据适配器明细表 对象
	 * @returns {DataAdapter}
	 */
	DataAdapter = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DataAdapter.prototype = {
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
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/dataAdapter/dataAdapter/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','目标连接信息','目标表','源头连接信息','源头表','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_',
				                	 	hidden:true,
				                	 	key:true
				                	 }, {
				                 	   name:'targetConnInfo',
				                	   index: 'TARGET_CONN_INFO_'
				                	 }, {
				                 	   name:'targetTable',
				                	   index: 'TARGET_TABLE_'
				                	 }, {
				                 	   name:'sourceConnInfo',
				                	   index: 'SOURCE_CONN_INFO_'
				                	 }, {
				                 	   name:'sourceTable',
				                	   index: 'SOURCE_TABLE_'
				                	 },  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[
									{
										label:'同步',
										classes:'btn btn-primary fa fa-edit',
										action:'javascript:dataAdapter._sync("{id}")',
									},{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/dataAdapter/dataAdapter/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/dataAdapter/dataAdapter/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/dataAdapter/dataAdapter/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.frm = frm;
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var ds = formUrl.getValue();
				var rs = $("#targetField").find(".droppable");
				var dataAdapterDetail = new Array(0);
				rs.each(function(idx,elm){
					var itm = {};
					itm.targetField = $(elm).find(".targetField")[0].innerText;
					itm.targetType = $(elm).find(".targetType")[0].innerText;
					var mapping = $(elm).find(".mapping")[0].innerText.split(" ");
					itm.sourceField = mapping[0]!=null?mapping[0]:"";
					itm.sourceType = mapping[1]!=null?mapping[1]:"";
					dataAdapterDetail.push(itm);
				});
				ds.dataAdapterDetailPoList=dataAdapterDetail;
				ds.id = $("#primaryKey").val();
				
				var loading = DialogUtil.load("保存中...");
				if(formUrl.validate()){
					formUrl.submit2($("#dataAdapterForm"),ds,me._showResponse, null, loading);
				}else{
					DialogUtil.close(loading);
				}
			});
			
			$('#sourceDbRes', document).on('change',function(event){
				me._initSourceTableSelect2();
			});
			$('#sourceTable', document).on('change',function(event){
				me.frm.valid();
			});
			$('#targetDbRes', document).on('change',function(event){
				me._initTargetTableSelect2();
			});
			$('#targetTable', document).on('change',function(event){
				me.frm.valid();
			});
			
			me._initSourceForm();
			me._initTargetForm();
			me._initSourceTableSelect2();
			me._initTargetTableSelect2();
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
							window.location.href = __ctx+'/platform/dataAdapter/dataAdapter/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		/**
		 * 初始化表单
		 */
		_initTargetForm : function() {
			var me = this;

			var primaryKey = $("#primaryKey").val();
			var targetDbRes = $("#targetDbRes").val();
			var targetTable = $("#targetTable").val();
			
			var fillFields = function(temp,cols){

				$("#targetField").empty();
				var html = template(temp, {fields:cols});
				$("#targetField").append(html);
				$(".droppable").droppable({
					drop: function(a,b) {
						var mapping = $(this).find(".mapping");
						mapping.empty();
						var drapHtml = b.draggable[0].innerHTML;
						drapHtml+='<label class="search-label fa fa-remove" style="width:1em;color:red;" onclick="dataAdapter._delTargetField(this)"></label>';
						mapping.append(drapHtml);
					}
				});
				
			};
			
			if(primaryKey!=""){
				$.post(
					__ctx+"/platform/dataAdapter/dataAdapter/initTargetFields.htm",
					{
						id:primaryKey
					},
					function(rs){
						if (rs.success) {
							
							fillFields("initDroppableTemplate",rs.details);
							
						}
					}
				);
			}
			
			$(document).on('click', 'a.targetRead', function() {
				
				targetDbRes = $("#targetDbRes").val();
				targetTable = $("#targetTable").val();
				
				if(targetDbRes==""){
					DialogUtil.warn("目标数据源不能为空");
					return;
				}
				if(targetTable==""){
					DialogUtil.warn("目标数据表不能为空");
					return;
				}
				$.post(
					__ctx+"/platform/dataAdapter/dataAdapter/targetRead.htm",
					{
						targetDbRes:targetDbRes,
						targetTable:targetTable
					},
					function(rs){
						if (rs.success) {

							fillFields("droppableTemplate",rs.cols);
							
						} else {
							DialogUtil.error(rs.msg);
						}
					}
				);
			});
		},
		/**
		 * 初始化表单
		 */
		_initSourceForm : function() {
			var me = this;

			var primaryKey = $("#primaryKey").val();
			var sourceDbRes, sourceTable;
			
			var fillFields = function(){
				
				sourceDbRes = $("#sourceDbRes").val();
				sourceTable = $("#sourceTable").val();
				
				$.post(
					__ctx+"/platform/dataAdapter/dataAdapter/sourceRead.htm",
					{
						sourceDbRes:sourceDbRes,
						sourceTable:sourceTable
					},
					function(rs){
						if (rs.success) {
							
							$("#sourceField").empty();
							var html = template("draggableTemplate", {fields:rs.cols});
							$("#sourceField").append(html);
							$(".draggable").draggable({
								revert: false, 
								helper: "clone"
							});
							
						} else {
							DialogUtil.error(rs.msg);
						}
					}
				);
				
			}

			if(primaryKey!=""){
				fillFields();
			}
			
			$(document).on('click', 'a.sourceRead', function() {
				
				sourceDbRes = $("#sourceDbRes").val();
				sourceTable = $("#sourceTable").val();
				
				if(sourceDbRes==""){
					DialogUtil.warn("同步数据源不能为空");
					return;
				}
				if(sourceTable==""){
					DialogUtil.warn("同步数据表不能为空");
					return;
				}
				fillFields();
			});
		},
		
		_sync : function(id) {
			
			DialogUtil.confirm("同步数据会清空旧有表数据,需要同步吗？",
				function(rtn) {
					if(rtn){
						var flag = DialogUtil.load();
						$.post(
							__ctx+'/platform/dataAdapter/dataAdapter/sync.htm?id='+id,
							{},
							function(rs){
								if(rtn){
									if (rs.success) {
										DialogUtil.msg(rs.msg);
										DialogUtil.close(flag);
									} else {
										DialogUtil.error(rs.msg);
									}
								}
							}
						);
					}
			});
			
		},
		
		_delTargetField:function(o){
			var mapping = $(o).parent()
			mapping.empty();
			mapping.append("&nbsp;");
		},
		
		_initSourceTableSelect2 : function(){
			var me = this
				,$el = $("#sourceTable")
				,dsAlias = $("#sourceDbRes").val()
				,options = $el.data()
				,$val = options.value
				,$comment = options.comment
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
			$el.val('');
			
			var params = {
				placeholder:'请选择'
				,theme: "bootstrap"
				,language: "zh-CN"
				,multiple: multiple
				,allowClear: clear
				,separator: split
				,initSelection: function(element, callback) { // 初始化时设置默认值  
					callback({'id':$val,'text':$val,'comment':$comment});
					me.frm.valid();
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
				    	return {tableName: _params.term, dsAlias:dsAlias};
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
			
			if(!$.isEmpty($val)){
				$el.append("<option selected value='"+$val+"'>"+$val+"</option>");
				me.frm.valid();
			}

			me.frm.valid();
		},
		
		_initTargetTableSelect2 : function(){
			var me = this
				,$el = $("#targetTable")
				,dsAlias = $("#targetDbRes").val()
				,options = $el.data()
				,$val = options.value
				,$comment = options.comment
				,ajax = options.ajax
				,multiple = $.isEmpty(options.multiple)?true:(options.multiple=='true' || options.multiple==true?true:false)
				,clear = $.isEmpty(options.clear)?true:(options.clear=='true' || options.clear==true?true:false)
				,split = $.isEmpty(options.split)?',':options.split
				;
			
			$el.val('');
			
			var params = {
				placeholder:'请选择'
				,theme: "bootstrap"
				,language: "zh-CN"
				,multiple: multiple
				,allowClear: clear
				,separator: split
				,initSelection: function(element, callback) { // 初始化时设置默认值  
					callback({'id':$val,'text':$val,'comment':$comment});
					me.frm.valid();
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
				    	return {tableName: _params.term, dsAlias:dsAlias};
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
			
			if(!$.isEmpty($val)){
				$el.append("<option selected value='"+$val+"'>"+$val+"</option>");
				me.frm.valid();
			}

			me.frm.valid();
		}
		
	};
})();


