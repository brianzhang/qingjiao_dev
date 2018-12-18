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
	partyEmployeeSuperior = new PartyEmployeeSuperior();
	partyEmployeeSuperior.init();
});

(function() {
	 
	//定义常量
	var _consts = {
		GRID : "#partyEmployeeSuperiorGrid",// 列表对象
		PAGER : "#partyEmployeeSuperiorPager"// 列表分页
	};
	/**
	 * 员工 对象
	 * @returns {PartyEmployeeSuperior}
	 */
	PartyEmployeeSuperior = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PartyEmployeeSuperior.prototype = {
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
				__url = __ctx + '/platform/org/partyEmployee/superiorListJson.htm?Q^SUB_PID_^S='+id,
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
										'创建时间'],
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

										}]
							});
		}
	};
})();