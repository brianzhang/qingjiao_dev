$(function() {
	partyAttr = new PartyAttr();
	partyAttr.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#partyAttrGrid",// 列表对象
		PAGER : "#partyAttrPager",// 列表分页
		FORM : '#partyAttrForm'// 表单form
	};
	/**
	 * PartyAttr 对象
	 * @returns {PartyAttr}
	 */
	PartyAttr = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyAttr.prototype = {
		consts : _consts,
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
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx + '/platform/org/partyAttr/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ 'ID', '属性名称', '业务主键', '所属参与者类型', '属性类型', '数据类型', '是否多选', '创建时间', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'name',
											index : 'NAME_'
										},
										{
											name : 'key',
											index : 'KEY_'
										},
										{
											name : 'partyTypeName',
											index : 'PARTY_TYPE_NAME_'
										},
										{
											name : 'typeName',
											index : 'TYPE_NAME_'
										},
										{
											name : 'dataTypeName',
											index : 'DATA_TYPE_NAME_'
										},
										{
											name : 'isMulti',
											index : 'IS_MULTI_',
											formatter: 'select',
				                            formatoptions: {
				                                value: {
				                                    'Y': '是',
				                                    'N': '否',
				                                    '' : '否'
				                                }
				                            }
										},
										{
											name : 'createTime',
											index : 'CREATE_TIME_',
											formatter : 'timestamp'
										},
										{
											name : '__manage',
											width : 30,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '编辑',
														classes : 'btn btn-primary fa fa-edit',
														action : __ctx
																+ '/platform/org/partyAttr/edit.htm?id={id}'
													},
													{
														label : '删除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx
																+ '/platform/org/partyAttr/remove.htm?id={id}'
													},
													{
														label : '明细',
														classes : 'btn btn-primary fa fa-detail',
														action : __ctx
																+ '/platform/org/partyAttr/get.htm?id={id}'
													} ]
										} ]
							});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			$("#dataType").on("change", me.changeSelectFromType);
			me.changeSelectFromType();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				/*重写表单提交事件*/
                action = frm[0].action;
                newForm = $("<form></form>");
                newForm.attr('action', action);
                newForm.attr('method', 'post');

                var main = {};
                // 找到子表 遍历每一行 得到子表数据
                form.find('input:text,input:hidden,textarea,select,input:password').each(function () {
                    var value = $(this).val();
                    var name = $(this).attr('name');
                    if (value != null && value != '') {
                        main[name] = value;
                    }
                });
                
                form.children('input:hidden').each(function () {
                    var value = $(this).val();
                    var name = $(this).attr('name');
                    if (value != null && value != '') {
                        main[name] = value;
                    }
                });
                
                // 属性选项列表
                main['options'] = me.getOptionData();
                
                var mainStr = JSON2.stringify(main);
                $('textarea[name="json"]', newForm).remove();
                input1 = "<textarea style='display:none;'  name='json'>" + mainStr + "</textarea>";
                newForm.append(input1);
                newForm.appendTo("body");
                newForm.css('display', 'none');
                
                var $el = $(this);
				$el.button('loading');
                newForm.ajaxForm({
                	success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},
					error: function(){
						$el.button('reset'); 
					}
                });
                if (frm.valid()) {
                    newForm.submit();
                }else{
					$el.button('reset');
				}
			});
		},
		/**
		 * 获取选项列表
		 */
		getOptionData : function(){
			var arr = [];
			
			var $items = $("tr[type='arrayItem']");
			for(var i = 0; i < $items.length; i ++){
				var _groupName = $("input[name='groupName']", $items[i]).val();
				var _value = $("input[name='value']", $items[i]).val();
				arr.push({groupName:_groupName, value : _value});
			}
			
			return arr;
		},
		/**
		 * 添加选项
		 */
		addSelectItem : function(){
			var aryTr=[
			'<tr type="arrayItem" >',
			'<td style="text-align: right;width:10%;">',
			'<label class="control-label">选项:</label>',
			'</td><td>',
			'<input class="form-control" type="text" name="groupName" validate="{required:true,maxlength:120}" >',
			'</td>',
			'<td style="text-align: right;width:10%;">',
			'<label class="control-label">值:</label>',
			'</td><td>',
			'<input class="form-control" type="text" name="value" validate="{required:true,maxlength:120}" >',
			'</td>',
			'<td style="text-align:center;width:15%;">',
			'<a  href="javascript:void(0);" class="btn btn-info fa fa-delete" onclick="partyAttr.delSelectItem(this);">删除</a>',
			'</td>',
			'</tr>'];
			$("#selectItem").append(aryTr.join(""));
		},
		/**
		 * 删除选项
		 * @param obj
		 */
		delSelectItem : function(obj){
			$(obj).closest('tr').remove();
		},
		/**
		 * 数据类型选中
		 */
		changeSelectFromType : function(){
			var type = $("#dataType").val();
			if(type == 'OPTION'){
				$("#isMulti").show();
				$("#xuanzexiang").show();
			}else{
				$("#isMulti").hide();
				$("#xuanzexiang").hide();
			}
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/org/partyAttr/list.htm';
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();
