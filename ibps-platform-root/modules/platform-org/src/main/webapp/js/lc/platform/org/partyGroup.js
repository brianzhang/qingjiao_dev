
/**
 * 用户组
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-07 14:21:55
 *</pre>
 */
$(function() {
	partyGroup  = new PartyGroup();
	partyGroup.init();
	
	formUrl = partyGroup.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#partyGroupGrid",// 列表对象
			PAGER : "#partyGroupPager",// 列表分页
			USERTREE: '#userTree', // 用户树的ID
			FORM : '#partyGroupForm'// 表单form
	};
	/**
	 * 用户组 对象
	 * @returns {PartyGroup}
	 */
	PartyGroup = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyGroup.prototype = {
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
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/org/partyGroup/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','用户组名称','用户组别名','用户组描述','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_'
				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'NAME_'
				                	 					                	 	}, {
				                 	   name:'groupAlias',
				                	   index: 'GROUP_ALIAS_'
				                	 					                	 	}, {
				                 	   name:'groupNote',
				                	   index: 'GROUP_NOTE_'
				                	 	,hidden:true
				                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/org/partyGroup/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/org/partyGroup/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/org/partyGroup/get.htm?id={id}'
									}]
								} ]
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
			me.formUrl.initSub('/platform/org');
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				me.formUrl.submit(me._showResponse, $el);
			});
			this._initBts();
		},
		_initBts:function(){
			// 取消子表按钮事件
			$(document).off('click', 'table a.js-add-record');
			// 重新绑定子表添加按钮事件
			this._initUserAdd();
		},
		_initUserAdd:function(){
			var me = this;
			$(document).on('click', 'table[name="s:partyUserGroup"] a[data-type="add"]', function() {
				var table = $(this).parents().filter("table");
				new PersonDialog({
					isObj: true,
					callback:function(data,index){
						var formData = {};
						me.formUrl.getSubData("table[name='s:partyUserGroup']", me.formUrl.form, formData, 'r');
						var templateId = "s:partyUserGroup:TrTemplate";
						var exist = false;
						for(var i = 0, len = data.length; i < len; i ++){
							// 去重
							if(formData.partyUserGroupPoList && formData.partyUserGroupPoList.length > 0){
								for(var j = 0, jlen = formData.partyUserGroupPoList.length; j < jlen; j ++){
									if(data[i].userid == formData.partyUserGroupPoList[j].userId){
										exist = true;
										break;
									}
								}
							}
							
							if(!exist){
								var html = template(templateId, {userId:data[i].userid, userName:data[i].fullname});
								// 添加一行
								$(table).find("tbody").append(html);
							}
						}
						me.formUrl.initChk();
						
						DialogUtil.close(index);
					}
				}).show();
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
							window.location.href = __ctx+'/platform/org/partyGroup/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


