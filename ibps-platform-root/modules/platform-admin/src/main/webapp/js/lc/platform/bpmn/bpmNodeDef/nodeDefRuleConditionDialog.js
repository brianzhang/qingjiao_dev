/**
 * 
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-12-25 15:30:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var ruleCondition;
var params = frameElement.dialog.params;
$(function() {
	ruleCondition = new NodeDefRuleConditionDialog();
	ruleCondition.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TREE : "#boTree"// 列表对象
	};
	
	NodeDefRuleConditionDialog = function(){
		//定义属性
		this.defId=$("#defId").val();
		this.nodeId=$("#nodeId").val();
	}
	
	NodeDefRuleConditionDialog.prototype={
			consts:	_consts,
			/**
			 * 初始化
			 */
			init : function() {
				if (this.hasInit) // 是否已初始化
					return false;
				this.hasInit = true;
				if ($(this.consts.TREE).length > 0)//
					this._initTREE();
			},
			
			_initTREE : function(){
				var me = this , form = $(this.consts.FORM), frm = form.form();
				// 触发表单验证
				frm.valid();
				// 树
				me.boTree =null;
				me._treeFrameResize();
				// 缩放时候计算高度
				$(window).resize(function(){  
					me._treeFrameResize();
				});
				me._loadTree();
		        //初始化滚动
				me._initLeftScroll();
				//初始化表达式动作
				$(document).on("click","a.calTool",function(){
					me._intiCalTool(this);
				});
				
				// 修改用户或组值类型，清除匹配值
				$(document).on("change","select[name$='ValType']",function(){
					$("input[name='value']").val("");
					$("#valueText").val("");
					$("#valueId").val("");
				});
				
				if(params){
					me._initData();
				}
			},
			
			/**
			 * 缩放时候计算高度
			 */
			_treeFrameResize : function(){
				$('.treeFrame').height( $(window).height()-20);
				$(this.consts.TREE).height( $(window).height()-145);
			},
			
			/**
			 * 加载树
			 */
			_loadTree:function(){
				var me = this;
				this._treeRootId=0;
				this.expandByDepth = 1;
				var setting = {
					async: {enable: false},
					data: {
						key:{name:"name"},
						simpleData: {
							enable: true,
							idKey: "id",
							pIdKey: "parentId",
							rootPId:'0'
						}
					},
					view: {
						selectedMulti: false,
						showIconFont:true
					},
					edit: {
						drag: {
							prev: false,inner: false,next: false,isMove:false
						},
						enable: true,
						showRemoveBtn: false,
						showRenameBtn: false
					},
					callback:{
						beforeClick: me._beforeClick,
						onClick: function(e,treeId, treeNode) {
							me._onClickTree(me,e,treeNode);
						},
						onRightClick :null,
						beforeDrop: null,
						onDrop: null
					}
				};

				me.boTree=$.fn.zTree.init($(me.consts.TREE), setting, params.formVars);
				me.boTree.expandAll(true);
			},
			
			/**
			 *  左侧菜单的滚动
			 */
			_initLeftScroll:function(){
				$(_consts.TREE).niceScroll({
		    		horizrailenabled : false,
		    		cursorborder : "0",
		    		cursorwidth : "6px",
		    		cursorcolor : "#2A2A2A",
		    		zindex : "5555",
		    		autohidemode : true,
		    		bouncescroll : true,
		    		mousescrollstep : '40',
		    		scrollspeed : '100',
		    		background : "#999",
		    		cursoropacitymax : "0.6",
		    		cursorborderradius : "0"
		    	});
		    	$(_consts.TREE).getNiceScroll().resize();
			},
			
			/**
			 *  点击树是提前处理，如果是根节点就不触发点击动作 
			 */
			_beforeClick:function(treeId,node){
				if(node.type =='bo' || node.type =='root') return false;
			},
			
			/**
			 * 点击树动作
			 */
			 _onClickTree:function(me,e,node){
				if(node.attrType == 'field'){
					$("input[name='label']").val(node.name);
					$("input[name='name']").val(node.tableName+"."+node.key);
					$("input[name='source']").val('boVar');
				}else if (node.attrType == 'var'){
					$("input[name='name']").val(node.name);
					$("input[name='source']").val('flowVar');
				}else if(node.attrType == 'bpmConstants'){
					$("input[name='name']").val(node.key);
					$("input[name='source']").val('consVar');
				}
				$("input[name='dataType']").val(node.type);
				me._autoCreatDesc();
				me._changeCalTool();
			},
			
			/**
			 * 修改值类型
			 */
			_changeExeType:function(isInit){
				var type = $("#executorType").val();
				$("div[typeId]").hide();
				$("#valueBut").show();
				
				$("#dt").addClass("hidden");
				$("#dt").attr("name", "value_dt");
				$("#num").addClass("hidden");
				$("#num").attr("name", "value_num");
				$("#txt").show();
				$("#txt").attr("name", "value");
				$("#txt").attr("disabled", "disabled");
				
				if(!isInit){
					$("input[name='value']").val("");
					$("#valueText").val("");
					$("#valueId").val("");
				}
				
				if(type=="user"){
					$("div[typeId='user']").show();
				}else if(type=="org"){
					$("div[typeId='org']").show();
				}else if(type=="fixed"){
					//固定值，把选择按钮去除，输入框变成可编辑
					// 改变输入框
					this._changeFixedInput();
				}
			},
			
			_changeFixedInput : function(){
				$("#valueBut").hide();
				var dataType = $("input[name='dataType']").val();
				if(dataType=='number'){
					$("#num").removeClass("hidden");
					$("#num").attr("name", "value");
					$("#txt").hide();
					$("#txt").attr("name", "value_txt");
					$("#txt").attr("disabled", "disabled");
					$("#dt").addClass("hidden");
					$("#dt").attr("name", "value_dt");
				}else if(dataType=='date'){
					$("#dt").removeClass("hidden");
					$("#dt").attr("name", "value");
					$("#txt").hide();
					$("#txt").attr("name", "value_txt");
					$("#txt").attr("disabled", "disabled");
					$("#num").addClass("hidden");
					$("#num").attr("name", "value_num");
				}else{
					$("#dt").addClass("hidden");
					$("#dt").attr("name", "value_dt");
					$("#num").addClass("hidden");
					$("#num").attr("name", "value_num");
					$("#txt").show();
					$("#txt").attr("name", "value");
					$("#txt").removeAttr("disabled");
				}
			},
			
			_selectVal : function(obj){
				var me =this, executorType = $("#executorType").val();
				 if('user'==executorType){
					 me._getUsers(obj);
				 }else if('org'==executorType){
					 me._getOrg(obj);
				 }
			},
			
			/**
			 * 
			 * @param obj
			 */
			_getUsers : function(obj){
				var me=this, params=[];
				
				var userValType = $("#userValType").val();
				var valueId = $("#valueId").val();
				if(valueId){
					userIds = valueId.split(',');
					var fullnames = $("#valueText").val().split(',');
					 if('account'==userValType){
						 var accountVal = $("#value").val().split(',');
						 for(var i = 0; i<userIds.length;  i++){
							 params[i] = {account:accountVal[i],fullname:fullnames[i],id:userIds[i]};
						 }
					 }else {
						 for(var i = 0; i<userIds.length;  i++){
							 params[i] = {fullname:fullnames[i],id:userIds[i]};
						 }
					 }
				}
				
				var callback=function(data){
					var accounts = [];
					var name=[];
					var userIds=[];
					$.each(data, function(i, content) {
						var account=this['account'];
						var fullname=this['fullname'];
						var userId=this['userid'];
						accounts.push(account);
						name.push(fullname);
						userIds.push(userId);
					});
					if('userId'==userValType){
						$("[name='value']").val(userIds);
					}else if('account'==userValType){
						$("[name='value']").val(accounts);
					}
					$("#valueText").val(name);
					$("#valueId").val(userIds);
					me._autoCreatDesc();
				}
				new PersonDialog({single:false,isObj:true,params:params,callback:callback}).show();
			},
			
			/**
			 * 
			 * @param obj
			 */
			_getOrg : function(obj){
				var me=this, params=[];
				var orgValType = $("#orgValType").val();
				var valueId = $("#valueId").val();
				if(valueId){
					var orgIds = valueId.split(',');
					var orgNames = $("#valueText").val().split(',');
					 if('orgKey'==orgValType){
						 var orgKey = $("#value").val().split(',');
						 for(var i = 0; i<orgIds.length;  i++){
							 params[i] = {key:orgKey[i],name:orgNames[i],id:orgIds[i]};
						 }
					 }else {
						 for(var i = 0; i<orgIds.length;  i++){
							 params[i] = {name:orgNames[i],id:orgIds[i]};
						 }
					 }
				}
				
				new PartyDialog({params:params,isObj:true,callback:function(orgData){
					var orgIds = [];
					var orgKeys = [];
					var orgNames = [];
					$(orgData).each(function(i){
						orgIds.push(this['entityid']);
						orgKeys.push(this['entitykey']);
						orgNames.push(this['entityname']);
					});
					
					if('orgId'==orgValType){
						$("[name='value']").val(orgIds);
					}else if('orgKey'==orgValType){
						$("[name='value']").val(orgKeys);
					}
					$("#valueText").val(orgNames);
					$("#valueId").val(orgIds);
					me._autoCreatDesc();
				}}).show();
			},
			
			/**
			 * 修改匹配值
			 */
			_changeValue:function(conf){
				var me=this,thisObj =$(conf);
				var executorType = $("#executorType").val();
				if(executorType=="fixed"){
					$("#valueText").val(thisObj.val());
				}
				me._autoCreatDesc();
			},
			
			/**
			 * 自动生成预览字符串
			 */
			_autoCreatDesc:function(){
				var name = $("input[name='label']").val();
				var valueText = $("input[name='valueText']").val();
				var expre= $("a.calTool[disabled]").html();
				if(!expre) {
					expre = "";
				}
				var conDesc = "[ "+name+"]    "+expre +"    [ "+valueText+"]";
				$("#conDesc").text(conDesc);
			},
			
			/**
			 * 初始化表达式函数
			 */
			_intiCalTool:function(conf){
				var me=this, thisMe = $(conf);
				$("a.calTool[disabled]").each(function(){
					$(this).removeAttr("disabled");
				})
				thisMe.attr("disabled","disabled");
				me._autoCreatDesc();
			},
			
			/**
			 *  改变操作按钮
			 */
			_changeCalTool : function(){
				var dataType = $("input[name='dataType']").val();
				$("[name='specTool']").hide();
				if(dataType=='number'||dataType=='date'||dataType=='int'||dataType=='boolean' ){
					$("[name='specTool']").show();
				}
			},
			
			/**
			 * 初始化数据
			 */
			_initData : function(){
				var me=this;
				if(!params.executorVar){
					return;
				}
				var executorVar = params.executorVar
				var executorType = executorVar.executorType
				$("#executorType").val(executorType);
				if(executorType=="user"){
					$("#userValType").val(executorVar.valType);
				}else if(executorType=="org"){
					$("#orgValType").val(executorVar.valType);
				}
				
				$("input[name='name']").val(executorVar.name);
				$("input[name='value']").val(executorVar.value);
				$("#valueText").val(executorVar.valueText);
				$("input[name='source']").val(executorVar.source);
				
				$("#conDesc").text(params.conDesc);
				$("input[name='dataType']").val(params.dataType);
				$("a.calTool[value='"+params.expression+"']").attr("disabled","disabled");
				
				me._changeCalTool();
				me._changeExeType(true);
			}
		};
})();

function getData(){
	var form = $("#formVar"), frm = form.form();
	// 触发表单验证
	frm.valid();
	if (frm.valid()){
		var executorVar={},json={};
		var executorType =$("#executorType").val();
		executorVar.executorType = executorType;
		if(executorType=="user"){
			executorVar.valType = $("#userValType").val();
		}else if(executorType=="org"){
			executorVar.valType = $("#orgValType").val();
		}
		executorVar.name=$("input[name='name']").val();
		executorVar.value=$("input[name='value']").val();
		executorVar.valueText=$("#valueText").val();
		executorVar.source = $("input[name='source']").val();
		
		json.executorVar = executorVar;
		json.conDesc = $("#conDesc").text();
		json.dataType= $("input[name='dataType']").val();
		json.expression = $("a.calTool[disabled]").attr("value");
		json.ruleType="1";
		if(!json.expression){
			 DialogUtil.toastr("请选择表达式!");
			 return ;
		}
		return json;
	}
}
	
