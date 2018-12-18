/**
 * 员工
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-07-04 16:02:01
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	partyEmployeeUnder = new PartyEmployeeUnder();
	partyEmployeeUnder.init();
});

(function() {
	 
	//定义常量
	var _consts = {
		GRID : "#partyEmployeeUnderGrid",// 列表对象
		PAGER : "#partyEmployeeUnderPager"// 列表分页
	};
	/**
	 * 员工 对象
	 * @returns {PartyEmployeeUnder}
	 */
	PartyEmployeeUnder = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyEmployeeUnder.prototype = {
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
				__url = __ctx + '/platform/org/partyEmployee/underListJson.htm?Q^MAIN_PID_^S='+id,
				__url = encodeURI(__url);
			
			$(this.consts.GRID)
					.GridList(
							{
								url : __url,
								pager : this.consts.PAGER,
								colNames : [
										' ID',
										'姓名',
										'状态',
										'性别',
										'归属组织',
										'创建时间', '管理' ],
								colModel : [
										{
											name : 'id',
											index : 'ID_',
											hidden : true,
											key : true
										},
										{
											name : 'name',
											index : 'NAME_'
										},
										{
											name : 'status',
											index : 'STATUS_',
											 formatter: 'dataFormat',
					                            formatoptions: {
					                            	value : [{
														name:'actived',
														value:'已激活',
														css:'green'
													},{
														name:'inactive',
														value:'未激活',
														css:'blue'
													},{
														name:'expired',
														value:'过期',
														css:'gray'
													},{
														name:'locked',
														value:'锁定',
														css:'orange'
													},{
														name:'disabled',
														value:'禁用',
														css:'red'
													},{
														name:'deleted',
														value:'已删除'
													}
												]}
											
										},
										{
											name : 'gender',
											index : 'GENDER_',
											formatter: 'select',
				                            formatoptions: {
				                                value: {
				                                    'male': '男',
				                                    'female': '女'
				                                }
				                            }
										},
										{
											name : 'orgName',
											index : 'orgName'
										},
										{
											name : 'createTime',
											index : 'CREATE_TIME_',
											formatter : 'timestamp'

										},
										{
											name : '__manage',
											width : 30,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											formatoptions : [
													{
														label : '移除',
														classes : 'btn btn-primary fa fa-remove',
														action : __ctx + '/platform/org/partyEmployee/removeUnder.htm?id={id}&userId='+id
													}]
										} ]
							});
		},
		/**
		 * 添加下属员工
		 * @param posId
		 */
		addUnder : function(userId){
			var me = this;
			var url =__ctx+"/platform/org/partyEmployee/addUnder.htm";
			new PersonDialog({
				isSingle:false, //是否单选
				type : 2,
				params : {entityId:'org'},
				callback : function(userIds, fullnames) {
					var param = {
							id:userId+'',
							relIds:userIds+''
							};
					me.post(url,param);
				}
			}).show();
		},
		post : function(url,param){
			$.post(url,param,function(responseText){
				var msg=new com.lc.form.ResultMessage(responseText);
				if(msg.isSuccess()){
					DialogUtil.alert(msg.getMessage());
					window.location.reload(true);
				}else{
					DialogUtil.error(msg.getMessage(),"");
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
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作', function(rtn) {
					if (rtn)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/platform/org/partyEmployee/underList.htm?id='+id;
				});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
        
	};
})();