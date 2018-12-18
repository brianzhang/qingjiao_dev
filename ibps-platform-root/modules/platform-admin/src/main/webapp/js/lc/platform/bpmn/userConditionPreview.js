/**
 * 流程节点人员设置 nodeDefCondition
 * 
 * <pre>
 * 作者：wudr
 * 邮箱：965582341@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var paramData = frameElement.dialog.params;
var userConPre;
$(function() {
	userConPre  = new UserConditionPreview();
	userConPre.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#userGrid",// 列表对象
			PAGER : "#userPager",// 列表分页
			BODYID : "#userConditionPer"// 列表对象
	};
	/**
	 * 流程定义 对象
	 * @returns {BpmDefinition}
	 */
	UserConditionPreview = function() {
		//定义属性
		var rowData=[];
	};

	/**
	 * 方法
	 */
	UserConditionPreview.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.BODYID).length > 0){
				this._initTable();
				this._initGridList();
			}
		},
		/**
		 * 初始表单
		 */
		_initTable : function() {
			var me = this ;
			if(paramData){
				var userCondition = paramData.calcs;
				$.each(userCondition,function(i,condition){
					if(condition.source == 'prev'){
						$("tr#prevUserTr").removeAttr("hidden");
					}else if(condition.source == 'start'){
						$("tr#startUserTr").removeAttr("hidden");
					}else if(condition.source =='var'){
						var varVal =condition['var'];
						if(typeof varVal =='string'){
							varVal =eval('('+condition['var']+')');
						}
						var html = me._renderHml(varVal);
						$("#paramTable").append($(html));
					}else{
						$("#noPre").show();
					}
				})
			}
		},
		
		/**
		 * 选择人员
		 */
		_selectUser : function(conf){
			var trObj = $(conf).parents("tr");
			var callback=function(userIds,fullNames){
				trObj.find("[name$='Id']").val(userIds[0]);
				trObj.find("[name$='Name']").val(fullNames[0]);
			}
			new PersonDialog({isSingle:true,callback:callback}).show();
		},
		
		/**
		 * 选择组
		 * @param conf
		 */
		_selectGourp : function(conf){
			var params ={};
			var trObj = $(conf).parents("tr");
			new PartyDialog({params:params,callback:function(groupIds,groupNames){
				trObj.find("[name$='Id']").val(groupIds[0]);
				trObj.find("[name$='Name']").val(groupNames[0]);
			}}).show();
		},
		
		/**
		 * 预览
		 */
		_previewCondition:function(){
			var me = this;
			var variables = {};
			var prevVal = $("#prevUserId").val();
			if(prevVal){
				variables["prevUser"]=  prevVal,
				variables["prevUserName"] = '['+$("#prevUserName").val()+']';
			}
			var startVal = $("#startUserId").val();
			if(startVal){
				variables["startUser"] = startVal;
				variables["startUserName"] =  '['+$("#startUserName").val()+']';
			}
			$("[name='groupVarId']").each(function(){
				var thisObj=$(this);
				var groupVal = thisObj.val();
				var key = thisObj.attr("key");
				variables[key] = groupVal;
			});
			$("[name='userVarId']").each(function(){
				var thisObj=$(this);
				var userVal = thisObj.val();
				var key = thisObj.attr("key");
				variables[key] = userVal;
			});
			variables = JSON2.stringify(variables)
			var conditionArray='['+JSON2.stringify(paramData)+']';
			//重新加载table
			me.$grid.jqGrid('setGridParam', {
				url : __ctx+ '/platform/bpmn/bpmNodeDef/previewCondition.htm',
				mtype: 'POST',
				postData:{'conditionArray':conditionArray,'variables':variables},
				page : 1
			}).trigger("reloadGrid"); // 重新载入
			
			//切换tab
			$("a[href='#queryResult']").tab('show');
		},
		_initGridList:function(){
			var me = this;
			this.$grid =	$(this.consts.GRID);
			me.$grid.jqGrid(
							{
							datatype : "json",
							pagerpos : 'left',
							pager : this.consts.PAGER,
							colNames : [
									'ID',
									'姓名',
									'账号'
									 ],
							colModel : [
									{
										name : 'userId',
										index : 'user_id_',
										hidden : true,
										key : true
									},
									{
										name : 'fullname',
										index : 'fullname_'
									},
									{
										name : 'account',
										index : 'account_'
									}],
									 width: $(window).width()-45, 
									 height: $(window).height()-225, 
									shrinkToFit : true,
									multiselect : true,
									multiboxonly:true,
									viewrecords : true
					});
		},
		
		/**
		 * 渲染
		 * @param json
		 */
		_renderHml : function(json){
			if(!json)return;
			var data = {list :json};
			console.info(data);
			var html = template('executorTypeTem', data);
			return html;
		},
	};
})();


