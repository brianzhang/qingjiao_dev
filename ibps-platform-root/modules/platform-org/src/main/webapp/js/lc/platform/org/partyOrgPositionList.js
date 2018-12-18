var passConf={roleJson:""}; 
$(function(){
	var $obj=$("a.btn.btn-primary.fa-add");
	var url =__ctx+"/platform/org/partyOrg/addPos.htm";
	$obj.unbind('click');
	$obj.bind('click',function(){
		new PartyPositionDialog({
			url:__ctx+'/platform/org/partyPosition/dialog.htm?hiddenOrgName=true',
			params : {url: __ctx + '/platform/org/partyPosition/listJsonByOrgNull.htm', isHidden : true},
			callback : function(posIds,posNames) {
					var param = {
							id:id+'',
							posIds:posIds+''
							};
					$.post(url,param,function(responseText){	
						var msg=new com.lc.form.ResultMessage(responseText);
						if(msg.isSuccess()){
							DialogUtil.alert(msg.getMessage());
							window.location.reload(true);
						}else{
							DialogUtil.error(msg.getMessage(),"");
						}
					});
			}
		}).show();
	});
});			

$(function() {
	orgPositionAssign = new OrgPositionAssign();
	orgPositionAssign.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#orgPositionAssignGrid",// 列表对象
		PAGER : "#orgPositionAssignPager",// 列表分页
	};
	/**
	 * OrgPositionAssign 对象
	 * @returns {OrgPositionAssign}
	 */
	OrgPositionAssign = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	OrgPositionAssign.prototype = {
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
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,
				__url = __ctx + '/platform/org/partyOrg/orgPositionListJson.htm?Q^ORG_ID_^S='+id,
				__url = encodeURI(__url);
			
			$(this.consts.GRID)
					.GridList(
							{
								url : __url,
								pager : this.consts.PAGER,
								colNames : [ 'ID', '岗位名称', '等级', '业务类型', '管理' ],
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
											name : 'levelName',
											index : 'level_name_'
										},
										{
											name : 'type',
											index : 'TYPE_',
											formatter: 'dataFormat',
											formatoptions: {
					                            	value : [{
														name:'no',
														value:'无'
													}
												]}
											 
										},
										{
											name : '__manage',
											width : 30,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '移除',
														classes : 'btn btn-primary fa fa-delete',
														action : 'javascript:orgPositionAssign.changStatus("{id}","deleted")'
													} ]
										} ]

							});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading'); 
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},
					error: function(){
						$el.button('reset'); 
					}
				});
				if (frm.valid()){
					form.submit();
				}else{
					$el.button('reset');
				}
			});
		},
		changStatus : function(id,status){
			var msg = '你确定要移除？';
			DialogUtil.confirm(msg,function(rtn){
				if(!rtn)
					return;
				var url = __ctx+"/platform/org/partyOrg/changeOrgPosStatus.htm?id="+id+"&status="+status;
				$.post(url, function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.toastr( resultMessage.getMessage(),true);
				    	window.location.reload(true);
				    } else {
				    	DialogUtil.toastr( resultMessage.getMessage(),true);
				    }
				});
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/org/partyOrg/positionList.htm?groupId='+id;
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();