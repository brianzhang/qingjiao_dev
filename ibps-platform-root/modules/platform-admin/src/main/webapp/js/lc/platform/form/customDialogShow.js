/**
 * 自定义对话框
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 21:40:48
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	customDialogShow = new CustomDialogShow();
	customDialogShow.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#customDialogShowGrid",// 列表对象
		PAGER : "#customDialogShowPager",// 列表分页
	}; ;
	/**
	 * 自定义对话框 对象
	 * @returns {CustomDialog}
	 */
	CustomDialogShow = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CustomDialogShow.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.data = frameElement.dialog.params;
			this.isSingle = this.data.selectNum==1?true:false;
			this.displayfield = eval('(' + this.data.displayfield + ')');
			this.resultfield= eval('(' + this.data.resultfield + ')') ;
			
			this.conditionfield= eval('(' + this.data.conditionfield + ')') ;
			for(var i=0;i<this.conditionfield.length;i++){
				if(this.conditionfield[i].paraCt=="2"){
					this.conditionfield[i].select = eval('(' + this.conditionfield[i].select + ')') ;
				}
			}
			if(this.data.style==0){//列表
				this._initGridList();
				this._initCondition();
			} else{//树形
				this._initTree();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,id =this.data.id,colNames =[],colModel=[],colKey =[];
			function buildGridCols(c,hidden){
				var fieldName =c.fieldName,displayType =c.displayType;
				colNames.push(c.comment);
				var o = {
						name:fieldName,
						index:fieldName,
				};
				if(hidden){
					o. hidden=  true;
				}else{
					colKey.push(fieldName);
				}
				if(displayType == 'date'){//日期格式
					o.formatter =  'timestamp';
					o.formatoptions= me.getDateFormat(c.format);
				}else if(displayType == 'enum'){//枚举值
					o.formatter = 'dataFormat',
					o.formatoptions = me.getEnumFormat(c.enumStr);
				}
				colModel.push(o);
			}
			
			for(var i=0,c;c=this.displayfield[i++];){
				buildGridCols(c);
			}
			for(var i=0,c;c=this.resultfield[i++];){
				var fieldName =c.fieldName;
				if($.inArray(fieldName, colKey) < 0){
					buildGridCols(c,true);
				}
			}
		$(this.consts.GRID).GridList({
						url : __ctx+ '/platform/form/customDialog/doQuery.htm?id='+id,
						postData:{
							params:JSON.stringify( this.data.params)
						},
						pager : this.consts.PAGER,
						colNames :colNames,
						colModel : colModel,
						multiboxonly:this.isSingle,
						loadBeforeSend : function() {
							if(me.isSingle)
								$('#cb_customDialogGrid').hide();
						}
					});
		},
		/**
		 * 因为前后台格式不一致
		 * @param format
		 * @returns
		 */
		getDateFormat:function(format){
			return format;
		},
		/**
		 * 枚举值
		 * @param format
		 * @returns
		 */
		getEnumFormat:function(enumStr){
			var formatoptions = {};
			var enumArr = enumStr.split("##");
			var json=[];
			for(var i=0;i<enumArr.length-1;i++){
				var obj = {};
				obj.name =  enumArr[i].split("&")[1];
				obj.value =  enumArr[i].split("&")[0];
				json.push(obj);
			}
			formatoptions.value=json;
			console.log(formatoptions);
			return formatoptions;
		},
		_initCondition:function(){
			var data = {
					list :this.conditionfield
			};
			var  html = template('conditionTem', data);
			$('#searchForm').append(html);
		},
		_initTree:function(){
			var me = this,
				json = this.displayfield,
				id =this.data.id,
				url= __ctx+ '/platform/form/customDialog/getTreeData.htm?id='+id;
			var setting = {
					async:{
						enable:true,
						url:url,
						autoParam:[json.id+"=idKey",json.pid+"=pidKey",json.displayName+"=nameKey"],
						otherParam:{idKeyName:json.id,pidKeyName:json.pid,nameKeyName:json.displayName}
					},
					data: {
						key : {name: json.displayName},
						simpleData: {
							enable: true,
							idKey: json.id,
							pIdKey: json.pid
						}
					},
					check: {
						enable: !this.isSingle,
						chkboxType:  { "Y" : "", "N" : "p" }
					},
					callback:{onClick: me.zTreeOnClick,
						onCheck:me.zTreeOnCheck,
						beforeExpand:function(treeId,treeNode){
							me.zTreeBeforeExpand(treeId,treeNode);
						},
						onAsyncSuccess:me.zTreeonAsyncSuccess,
						onAsyncError:me.zTreeOnAsyncError}
					
				};

				var initUrl = url+"&isRoot=1" ;
				$.post(initUrl,function(result){
					if(result!="")
						me.dialogTree=$.fn.zTree.init($("#dialogTree"), setting,result);
					//dialogTree.expandAll(true);
				});
				
				this.initTreeOpt();
		},
		zTreeBeforeExpand :function (treeId,treeNode){
			if(!treeNode.isAjaxing){
				this.dialogTree.reAsyncChildNodes(treeNode,"refresh",true);
			}
		},
		zTreeonAsyncSuccess : function (){
			
		},
		zTreeOnAsyncError :function (){
			
		},	
		initTreeOpt:function(){
			var me = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me._initTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					me.dialogTree.expandAll(true);
				} else{
					me.dialogTree.expandAll(false);	
				}
			});
		},
		/**
		 * 返回获取的数据
		 * @returns
		 */
		getData:function(){
			var me= this, rtn =[];
			if(this.data.style==0){//列表
				var ids =	$(this.consts.GRID).jqGrid('getGridParam',"selarrrow");
				for(var i=0,a;a=ids[i++];){
					var data = $(this.consts.GRID).jqGrid('getRowData',a), obj={};
					for(var j=0,c;c=this.resultfield[j++];){
						var fieldName =c.fieldName;
						obj[fieldName] =  data[fieldName];
					}
					 rtn.push(obj);
				}
				return rtn ;
				
			}else{//返回树形
				if(this.isSingle){
					var nodes = this.dialogTree.getSelectedNodes();
					if(nodes.length<1){
						return -1;
					}
					var obj=new Object();
					var node=nodes[0];
					for(var i=0;i<this.resultfield.length;i++)	{
						var field=this.resultfield[i].fieldName;
						obj[field]=node[field];
					}
					return obj;
				}else{
					
					var aryRtn=new Array();
					var nodes = this.dialogTree.getCheckedNodes(true);
					if(nodes.length<1){
						return -1;	
					}
					
					for(var i=0;i<nodes.length;i++){
						var obj=new Object();
						var node=nodes[i];
						for(var j=0;j<this.resultfield.length;j++)	{
							var field=this.resultfield[j].fieldName;
							obj[field]=node[field];
						}
						aryRtn.push(obj);
					}
					return aryRtn;
					
				}
			}
		},
		/**
		 * 用户
		 * @param obj
		 */
		_getUsers : function(obj){
			var trObj =$(obj).parent("div");
			var users = [];
			var accountVal = trObj.find("#account").val();
			if(accountVal){
				accountVal = accountVal.split(',');
				var fullnames = trObj.find("#fullName").val().split(',');
				var userIds = trObj.find("#userId").val().split(',');
				for(var i = 0; i<accountVal.length;  i++){
					users[i] = {account:accountVal[i],fullname:fullnames[i],userId:userIds[i]};
				}
			}
			var callback=function(data){
				var accounts = [];
				var name=[];
				var userIds=[];
				$.each(data, function(i, content) {
					var account=this['account'];
					var fullname=this['fullname'];
					var userId=this['userId'];
					accounts.push(account);
					name.push(fullname);
					userIds.push(userId);
				});
				trObj.find("#account").val(accounts);
				trObj.find("#fullName").val(name);
				trObj.find("#userId").val(userIds);
			}
			new PersonDialog({isSingle:false,isObj:true,params:users,callback:callback}).show();
		},
		/**
		 * 组织
		 * @param obj
		 */
		_getGroup : function(obj){
			var trObj =$(obj).parent("div");
			var groups = [];
			var groupVal = trObj.find("#group").val();
			if(groupVal){
				groupVal = groupVal.split(',');
				var groupNames = trObj.find("#groupName").val().split(',');
				var groupIds = trObj.find("#groupId").val().split(',');
				for(var i = 0; i<groupVal.length;  i++){
					groups[i] = {group:groupVal[i],groupName:groupNames[i],groupId:groupIds[i]};
				}
			}
			var callback=function(data){
				var groups = [];
				var name=[];
				var groupIds=[];
				$.each(data, function(i, content) {
					var group=this['key'];
					var groupName=this['name'];
					var groupId=this['groupId'];
					groups.push(group);
					name.push(groupName);
					groupIds.push(groupId);
				});
				trObj.find("#group").val(groups);
				trObj.find("#groupName").val(name);
				trObj.find("#groupId").val(groupIds);
			}
			new OrgDialog({isSingle:false,isObj:true,params:groups,callback:callback}).show();
		},
		/**
		 * 角色
		 * @param obj
		 */
		_getRole : function(obj){
			var trObj =$(obj).parent("div");
			var groups = [];
			var groupVal = trObj.find("#group").val();
			if(groupVal){
				groupVal = groupVal.split(',');
				var groupNames = trObj.find("#groupName").val().split(',');
				var groupIds = trObj.find("#groupId").val().split(',');
				for(var i = 0; i<groupVal.length;  i++){
					groups[i] = {group:groupVal[i],groupName:groupNames[i],groupId:groupIds[i]};
				}
			}
			var callback=function(data){
				var groups = [];
				var name=[];
				var groupIds=[];
				$.each(data, function(i, content) {
					var group=this['key'];
					var groupName=this['name'];
					var groupId=this['groupId'];
					groups.push(group);
					name.push(groupName);
					groupIds.push(groupId);
				});
				trObj.find("#group").val(groups);
				trObj.find("#groupName").val(name);
				trObj.find("#groupId").val(groupIds);
			}
			new RoleDialog({isSingle:false,isObj:true,params:groups,callback:callback}).show();
		},
		/**
		 * 岗位
		 * @param obj
		 */
		_getPos : function(obj){
			var trObj =$(obj).parents("div");
			var groups = [];
			var groupVal = trObj.find("#group").val();
			if(groupVal){
				groupVal = groupVal.split(',');
				var groupNames = trObj.find("#groupName").val().split(',');
				var groupIds = trObj.find("#groupId").val().split(',');
				for(var i = 0; i<groupVal.length;  i++){
					groups[i] = {group:groupVal[i],groupName:groupNames[i],groupId:groupIds[i]};
				}
			}
			var callback=function(data){
				var groups = [];
				var name=[];
				var groupIds=[];
				$.each(data, function(i, content) {
					var group=this['key'];
					var groupName=this['name'];
					var groupId=this['groupId'];
					groups.push(group);
					name.push(groupName);
					groupIds.push(groupId);
				});
				trObj.find("#group").val(groups);
				trObj.find("#groupName").val(name);
				trObj.find("#groupId").val(groupIds);
			}
			new PositionDialog({isSingle:false,isObj:true,params:groups,callback:callback,type:"5",title:"岗位选择框",dimkey:"position"}).show();
		},
		/**
		 * 自定义对话框
		 * @param alais   对话框别名
		 * @param obj    this
		 */
		_getDialog : function(alais,obj){
			var me = this;
			var callback={
					callback:function(data){
						var trObj =$(obj).parent("div");
						var param = trObj.find("#fullName").attr("param");
						trObj.find("#fullName").val(data[0][param]);
					}
			};
			me._preview(alais,callback);
		},
		/**
		 * 预览
		 */
		_preview:function(alias,callback){
			//向对话框传入参数
			var me = this;
			if($.isEmpty(alias)){
				DialogUtil.alert("别名为空！");
				return;
			}
			var url = __ctx+'/platform/form/customDialog/getByAlias.htm';
			$.post(url,{"alias":alias},function(data){
				var fieldObj=eval("("+data.conditionfield.trim()+")"),
				isParamsNeeded= false,paramArr=[];
				for(var i=0,c;c=fieldObj[i++];){
					//4：动态传入参数，5：java脚本参数
					if(c.defaultType=="4"){
						paramArr.push(c.fieldName) ;
						isParamsNeeded = true ;
					}else if(c.defaultType=="5" && c.dbType=='isAfferent'){
						paramArr.push(c.field);
						isParamsNeeded = true ;
					}
				}
				if(!isParamsNeeded){
					CustomDialogUtil.preview(data,callback);
				}else{
					data.paramArr = paramArr;
					data.isPreviewCallCode = true;
					var urlForParams = __ctx + "/platform/form/customDialog/params.htm";
					DialogUtil.dialog({
						title:data.name+"-设置参数",
						content:urlForParams,
						params:data,//传递参数
						area:['50%','50%'],
						btn:[{
				            	label: '下一步',
				            	iconCls:'btn btn-primary fa fa-ok',
				                action: function(dialog,index) {
				                	var   params = DialogUtil.getChildFrameWindow(index).getData();
				                	DialogUtil.closeAll();
				          			callback.params = params;
				                	CustomDialogUtil.preview(data,callback);
				                }
						 	},{
				            	label: '取消',
				            	iconCls:'btn btn-danger fa fa-cancel',
				                action: function(dialog,index) {
				                	DialogUtil.close(index);
				                }
				            }]
					});
				}
			});
		},
	};
})();
