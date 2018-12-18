/**
 * 生成类型
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-05 09:00:32
 *</pre>
 */
$(function() {
	doType  = new DoType();
	doType.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#doTypeGrid",// 列表对象
			PAGER : "#doTypePager",// 列表分页
			TYPE_TREE : "#typeTree", //左分类树
			FORM : '#doTypeForm'// 表单form
	};
	/**
	 * 生成类型 对象
	 * @returns {DoType}
	 */
	DoType = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DoType.prototype = {
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
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				//this._initSelect2();
				this._initSelectData();
			}
			
			if ($(this.consts.TYPE_TREE).length > 0)//分类树
				this._initTypeTree();
		},
		
		_initSelectData : function(){
			var me = this;
			
			$("#typeName").on("blur", function(e){
				var params = {doTypeId : $("#id").val(), typeId : $("#typeId").val(), subType: $("#subtype").val()};
				me._selectData(params);
			});
			
			$("#subType").on("change", function(e){
				var params = {doTypeId : $("#id").val(), typeId : $("#typeId").val(), subType: $(this).val()};
				me._selectData(params);
			});
		},
		
		_selectData : function(params){
			var divId = "#subKeysDiv"
				, templateId = "chkTemplate"
				, url = __ctx+'/platform/codegen/doType/doTypeOrTemplateListJson.htm';
			
			$.get(url, params,function(data){
				if($.isEmpty(data)){
					DialogUtil.msg("类型下无数据！请检查所选分类下是否有该类型数据！");
					return;
				}
				
				$(divId).html('');
				for(var i = 0, len = data.length; i < len; i ++){
					var html = template(templateId, data[i]);
					$(divId).append(html);
				}
			});
		},
		
		_initTypeTree:function(){
			var me = this;
			me.categoryKey ='TEMPLATE_TYPE';
		  	var typeTree =  new TypeTree( $(this.consts.TYPE_TREE),{
			  	categoryKey: me.categoryKey,
				onClick:function(event, treeId, treeNode){
					var typeId =treeNode.id;
					if(treeNode.isRoot == 1)typeId = "";
					$("#typeId").val(typeId);
					$("a.btn.fa-search").click();
				},
				onRightClick:function(event, treeId, treeNode){
		  			if (!treeNode) 
		  				return false ;
		  		}
			}); 
		  	this._initLayout();
		},
		
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout = $('body').layout({ applyDefaultStyles: true,
					onopen :function(){
						GridList.resizeGridSize();
					},
					onclose:function(){
						GridList.resizeGridSize();
					},
					onresize:function(){
						GridList.resizeGridSize();
					}
				});  
			layout.addPinBtn(".pinBtn", "west" );
		},
		
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/codegen/doType/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','类型key','类型名称','子集类型','子集keys','是否默认','创建时间','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'key',
				                	   index: 'key_'
				                	 					                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'subType',
				                	   index: 'sub_type_',
				                	   formatter: 'select',
			                            formatoptions: {
			                                value: {
			                                    'doType': '生成类型',
			                                    'template': '模板'
			                                }
			                            }
				                	 					                	 	}, {
				                 	   name:'subKeys',
				                	   index: 'sub_keys_'
				                	 					                	 	}, {
				                 	   name:'isDef',
				                	   index: 'is_def_',
				                	   formatter: 'select',
			                            formatoptions: {
			                                value: {
			                                    'true': '是',
			                                    'false': '否'
			                                }
			                            }
				                	 					                	 	}, {
				                 	   name:'createTime',
				                	   index: 'create_time_',
				                	 	formatter: 'timestamp',
				                	 	formatoptions: 'yyyy-MM-dd HH:mm:ss'
				                	 	},  {
									name : '__manage',
									width : 40,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/codegen/doType/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/codegen/doType/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/codegen/doType/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		_initSelect2:function(){
			var me = this;
			var subType = $("#subType").val();
			var $el = $("#subKeys");
			var subKeys = $el.data().value;
			if('doType' == subType){
				me.__initSelect2($el, "/platform/codegen/doType/doTypeList.htm?subType=template", subKeys);
			}else{
				me.__initSelect2($el, "/platform/codegen/template/templateList.htm", subKeys);
			}
			
			$("#subType").on("change", function(){
				var subType = $(this).val();
				if('doType' == subType){
					me.__initSelect2($el, "/platform/codegen/doType/doTypeList.htm?subType=template");
				}else{
					me.__initSelect2($el, "/platform/codegen/template/templateList.htm");
				}
			});
			
			$("#subKeys").on("change", function(){
				me.frm.valid();
			});
		},
		__initSelect2:function($el, $url, subKeys){
			var me = this;
			var split =',';
			
			var params = {
					placeholder:'请选择'
					,theme: "bootstrap"
					,language: "zh-CN"
					,multiple: true
					,allowClear: true
					,closeOnSelect: true
					,separator: split
					,formatSelection : function (item) {return item.id;}  /*选择结果中的显示*/
					,formatResult : function (item) {return item.id;}  /*搜索列表中的显示*/
					,escapeMarkup : function (markup) {return markup;}
					,createSearchChoice : function(term, data) {
						/*创建搜索结果（使用户可以输入匹配值以外的其它值）*/
				        return {id: term, text: term};
				    }
				};
				
			params.ajax = {
			    url: __ctx + $url,
			    dataType: 'json',
			    delay: 250,
			    data: function (_params) {
			    	return {key: _params.term, keys: $el.val()};
			    }
				,processResults: function (data) {
					return {
			          results: data
			        };
			     },
			     cache: true
			};
			
			
			var $selt2 = $el.select2(params);
			
			if(!$.isEmpty(subKeys)){
				var keyArr = subKeys.split(split);
				$.each(keyArr,function(index){
					$el.append('<option selected value="' + keyArr[index]+ '">'+keyArr[index]+'</option>');
				});
			}
			
			me.frm.valid();
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.frm = frm;
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				
				frm.ajaxForm({
					success : function(responseText) {
						$el.button('reset');
						me._showResponse(responseText);
					},error:function(){
						$el.button('reset');
					}
				});
				var subKeys = $("input:checked[name=subKeys]");
				if (frm.valid() && subKeys && subKeys.length > 0){
					form.submit();
				}
			});
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
							window.location.href = __ctx+'/platform/codegen/doType/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
