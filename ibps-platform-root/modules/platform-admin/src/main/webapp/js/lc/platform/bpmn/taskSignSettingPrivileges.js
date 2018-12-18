/**
 * 会签节点特权设置
 * <pre>
 * 作者：simon cai
 * 邮箱：48847557@qq.com
 * 日期：2017-2-5 20:00:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var privilegesDialog;
var pps = frameElement.dialog.params;

$(function() {
	privilegesDialog  = new PrivilegesDialog();
	privilegesDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
	};
	/**
	 * 
	 * @returns {CusersDialog}
	 */
	PrivilegesDialog = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	PrivilegesDialog.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this._init();
		},
		/**
		 * 初始表单
		 */
		_init : function() {
			this.privilegeList = {};
			
			$.cloneObject(frameElement.dialog.params,this.privilegeList);
			var html = "";
			
			if(!this.privilegeList.all)this.privilegeList.all=[];
			if(!this.privilegeList.direct)this.privilegeList.direct=[];
			if(!this.privilegeList.oneticket)this.privilegeList.oneticket=[];
			if(!this.privilegeList.allowAddSign)this.privilegeList.allowAddSign=[];
			
			this.appendType(this.privilegeList,"all");
			this.appendType(this.privilegeList,"direct");
			this.appendType(this.privilegeList,"oneticket");
			this.appendType(this.privilegeList,"allowAddSign");
		},
		appendType:function(privilegeList,type){
			var priPos = $("#"+type),
				html = priPos.html(),
				pris = null;
			if(type=="all"){
				pris = privilegeList.all;
			}else if(type=="direct"){
				pris = privilegeList.direct;
			}else if(type=="oneticket"){
				pris = privilegeList.oneticket;
			}else if(type=="allowAddSign"){
				pris = privilegeList.allowAddSign;
			}
			for(var idx=0;idx<pris.length;idx++){
				var userRule = pris[idx];
				html+=this.appendHtml(type,userRule,idx)
			}
			priPos.append(html);
		},
		appendHtml:function(type,userRule,idx){
			var ix = idx+1;
			var html = "<tr>"
				+"<td>"+ix+"</td>"
				+"<td>"+userRule.description+"</td>"
				+"<td><input type='text' size='5' value='"+userRule.groupNo+"'></td>" 
				+"<td>"
				+"<a href='javascript:void(0)' onclick='privilegesDialog.addUserCondition(\""+type+"\",false,"+idx+")' class='btn btn-default fa fa-edit'></a>"
				+"<a href='javascript:void(0)' onclick='privilegesDialog.deleteAttr(\""+type+"\","+idx+")' class='btn btn-default fa fa-delete'></a>"
				+"</td>"
				+"</tr>";
			return html;
		},
		//用户规则选择
		addUserCondition:function(type,isAdd,index){
			var _this = this;
			var priPos = $("#"+type);
			var ruleList = priPos.find("tr");
			var userRule = {};
			if(index != undefined){
				ruleList.each(function(idx,e){
					if(index==idx){
						if(type=="all"){
							userRule=_this.privilegeList.all[index];
						}else if(type=="direct"){
							userRule=_this.privilegeList.direct[index];
						}else if(type=="oneticket"){
							userRule=_this.privilegeList.oneticket[index];
						}else if(type=="allowAddSign"){
							userRule=_this.privilegeList.allowAddSign[index];
						}
					}
				});
			}
			userRule.defId=pps.defId;
			userRule.nodeId=pps.nodeId;

			DialogUtil.dialog({
				title:'节点人员条件配置',
				content:__ctx+'/platform/bpmn/bpmNodeDef/conditionEdit.htm',
				params:userRule,
				btn:[{
					label:'确定',
					iconCls : 'btn btn-primary fa fa-ok',
					action:function(dialog,ix){
						var  data = DialogUtil.getChildFrameWindow(ix).getData();
						if(!data) return;
						
						var arr;
						if(type=="all"){
							arr = _this.privilegeList.all;
						}else if(type=="direct"){
							arr = _this.privilegeList.direct;
						}else if(type=="oneticket"){
							arr = _this.privilegeList.oneticket;
						}else if(type=="allowAddSign"){
							arr = _this.privilegeList.allowAddSign;
						}
						_this.spliceArr(arr,index,isAdd,data);
						
						if(isAdd){
							var html = _this.appendHtml(type,data,arr.length-1);
							priPos.append(html);
						}else{
							var html = _this.appendHtml(type,data,index);
							var curtr = $("#"+type+" tr").get(index);
							$(html).insertAfter(curtr);
							curtr.remove();
						}
						DialogUtil.close(ix);
					}
				},{
					label:'取消',
					iconCls : 'btn btn-danger fa fa-cancel',
					action:function(dialog,index){DialogUtil.close(index);}
				}]
			});
		},
		spliceArr:function(arr,index,isAdd,data){
			if(isAdd){
				arr.push(data);
			}else{
				arr.splice(index,1,data);
			}
		},
		///删除行
		deleteAttr:function(type,index){
			var arr;
			if(type=="all"){
				arr = this.privilegeList.all;
			}else if(type=="direct"){
				arr = this.privilegeList.direct;
			}else if(type=="oneticket"){
				arr = this.privilegeList.oneticket;
			}else if(type=="allowAddSign"){
				arr = this.privilegeList.allowAddSign;
			}
			arr.splice(index,1);
			
			var priPos = $("#"+type);
			var ruleList = priPos.find("tr");
			ruleList.each(function(idx,e){
				$(e).remove();
			});
			
			this.appendType(this.privilegeList, type);
		}
	};
})();

/**
 * 获取数据
 */
function getData(){
//	console.log(privilegesDialog.privilegeList);
	return privilegesDialog.privilegeList;
}

