/**
 * 办结抄送配置人员设置数据
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-01-14 14:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var endNotify;
$(function() {
	endNotify  = new EndNotify();
	endNotify.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TABLEID : "#endNotify", // 表单对象
			NOTIFYTEMP:'endNotifyTemp', //抄送数据模板
			USERRULETEMP:'userRuleTemp' //人员配置数据模板
	};
	/**
	 * 流程定义 对象
	 * @returns {EndNotify}
	 */
	EndNotify = function() {
		//定义属性
		this.endNotifyJson = [];
		this.msgTypeList =this._getMsgType();
	};

	/**
	 * 方法
	 */
	EndNotify.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.TABLEID).length > 0)//表格
				this._initTable();
		},
		/**
		 * 初始表格
		 */
		_initTable : function() {
			var me=this;
			var params = frameElement.dialog.params;
			if(!params || params.length ==0)
				params = [{"userAssignRules":[],"msgTypes":""}];
			me.endNotifyJson = params.procNotify;
			me.params = params;
			me._initData();
		},
		
		_initData : function(){
			var me = this;
			var json = {
					copyTo : me.endNotifyJson,
					msgTypeList : me.msgTypeList
				};
			var notifyHtml = me._renderHml(json,me.consts.NOTIFYTEMP);
			$("tbody#notifyView").html($(notifyHtml));
		},
		
		/**
		 * 渲染
		 * @param json
		 */
		_renderHml : function(json,templateName){
			if(!json)return;
			var data = {list :json};
			var html = template(templateName, data);
			return html;
		},
	
		
		// 获取发送消息的分类列表
		_getMsgType:function(){
			var result=[];
			$("input#msgType").each(function(){
				var _me= $(this);
				var type = _me.val();
				var title = _me.attr("title");
				value={
						type:type,
						title:title
				}
				result.push(value);
			})
			return result;
		},
		
		/**
		 * 添加或修改人员配置
		 * @param conf
		 * @param notify_i  必填，说明是endNotifyJson 中的第notify_i组抄送配置数据
		 * @param userRule_j  选题，有值说明是第notify_i组抄送配置数据中的第userRule_j组人员配置 
		 */
		_addUserRule:function(conf,notify_i,userRule_j){
			if(!notify_i){
				return;
			}
			var me = this ;
			var url=__ctx+'/platform/bpmn/bpmNodeDef/conditionEdit.htm';
			var param={};
			if(userRule_j != undefined){
				param = me.endNotifyJson[notify_i].userAssignRules[userRule_j]
			}
			
			param.defId = me.params.defId;
			param.nodeId = me.params.nodeId;
			param.formVars = me.params.formVars;
			
			DialogUtil.dialog({
				   content: url,
				   params:param,
				   title:"节点人员条件",
				   area: ['60%', '85%'],
				   btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   var  data = DialogUtil.getChildFrameWindow(index).getData();
						   if(data){
								   if(data.groupNo==-1){
									   data.groupNo = me.endNotifyJson[notify_i].userAssignRules.length+1;
								   }
								   if( userRule_j != undefined){
									   me.endNotifyJson[notify_i].userAssignRules[userRule_j] = data;
								   }else{
									   me.endNotifyJson[notify_i].userAssignRules.push(data);
								   }
								   var userRuleHtml = me._renderHml({
									   userAssignRules : me.endNotifyJson[notify_i].userAssignRules,
									   notify_i : notify_i
										},me.consts.USERRULETEMP);
								   
									$("tbody#userRuleView_"+notify_i).html($(userRuleHtml));
									DialogUtil.close(index);
							  }
					   }
				   },
				   {
					   label:'取消',
					   iconCls : 'btn btn-danger fa fa-cancel',
					   action:function(dialog,index){
						   DialogUtil.close(index);
					   }
				   }
				   ]
			})
		},
		
		_saveData : function(){
			var me = this ;
			
			for(var i = 0; i<me.endNotifyJson.length; i++){
				var procNotify=me.endNotifyJson[i] , groupNo="" ;
				for(var j=0 ; j< procNotify["userAssignRules"].length; j++){
					var userRuleJson = procNotify["userAssignRules"][j];
					var No = '{'+userRuleJson.groupNo+'}';
					if(groupNo.indexOf(No) != -1){
						DialogUtil.toastr(" 节点 配置批次号 不能重复!");
						return;
					} 
					groupNo = groupNo + No;
				}
			}
			
			return me.endNotifyJson;
			
		},
		
		/**
		 * 添加一行抄送配置
		 */
		_addNotify : function(){
			var me = this ;
			var newJson={"userAssignRules":[],"msgTypes":""};
			me.endNotifyJson.push(newJson);
			me._initData();
		},
		
		/**
		 * 更改发送消息的类型
		 * 根据复选框所在的第notify_i组，获取对应组下所有的选中的复选框，
		 * 修改到endNotifyJson中的第notify_i组的msgTypes属性中
		 * @param conf 触发的checkbox对象（this）;
		 * @param notify_i 触发的checkbox 所在的组
		 */
		_changeMsgType : function(conf,notify_i){
			if(!notify_i){
				return;
			}
			var me=this, msgTypeAry=[];
			$("input:checkbox[notifyId='"+notify_i+"']:checked").each(function(){
				msgTypeAry.push($(this).val());
			})
			me.endNotifyJson[notify_i].msgTypes = msgTypeAry.join(",");
		},
		
		/**
		 * 删除第notify_i组的抄送配置数据
		 * @param notify_i
		 */
		_delNotify : function(notify_i){
			if(!notify_i){
				return;
			}
			var me=this;
			if(me.endNotifyJson.length==1){
				DialogUtil.toastr("至少保留一个抄送配置!")
				return;
			}
        	DialogUtil.confirm( '确认删除吗？','提示信息', function(r) {
        		if (r) {
        			me.endNotifyJson.splice(notify_i,'1');
        			me._initData();
        		}
        	})
		},
		
		/**
		 * 删除第notify_i组的抄送配置数据中的第userRule_j组人员配置 
		 * @param notify_i
		 * @param userRule_j
		 */
		_delUserRule : function(notify_i,userRule_j){
			if(!notify_i || !userRule_j){
				return;
			}
			var me=this;
			me.endNotifyJson[notify_i].userAssignRules.splice(userRule_j,'1');
			me._initData();
		},
		
		_changeNo : function(conf,notify_i,userRule_j){
			var me = this;
			if(!me.endNotifyJson || !notify_i || !userRule_j) {
				return true;
			}
			var value = $(conf).val();
			me.endNotifyJson[notify_i].userAssignRules[userRule_j].groupNo=value;
		},
	};
	
})();

function getData(){
	return endNotify._saveData();
}


