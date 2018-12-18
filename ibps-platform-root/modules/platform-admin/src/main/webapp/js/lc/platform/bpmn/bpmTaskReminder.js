/**
 * 任务催办设置 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-22 11:46:22
 *</pre>
 */
$(function() {
	bpmTaskReminder  = new BpmTaskReminder();
	bpmTaskReminder.init();
});

(function() {
	//定义常量
	var 	_consts = {
	};
	/**
	 * 任务催办设置对象
	 * @returns {BpmTaskReminder}
	 */
	BpmTaskReminder = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmTaskReminder.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			
			this.hasInit = true;
			var params = frameElement.dialog.params;
			this.data = params.data;
			this.formVars = params.formVars;
			
			this._editor = null;
			this._initEditor();
			
			this._codemirror = new Array();
			this._initCronExpressionCodeMirror();
			this._tree = new Array();
			this._initCronExpressionTree();

			this._bindNeedSendMsg();
			
			this._btrDefId=$("#procDefId").val(),
			this._btrNodeId=$("#nodeId").val();

			this.initData();
		},
		_initEditor:function(){
			var editor = UE.getEditor('html');// 格式化富文本框
			this._editor = editor;
			editor.ready( function(e) {
				if(!$.isEmpty($("#html").val())){
					editor.setContent($("#html").val());
				}
			    // 当内容改变了进行值的变更
			    editor.addListener( 'contentChange', function(e) {
			    	$("#html").val(editor.getContent());
			    });
			});
		},
		_initCronExpressionTree:function(){
    		var id = "cronExpTree";
    		var editor = this._codemirror[0];
    		console.info(this.formVars);
 	  		var varTree = new BpmFormVar("varTree"+id, this.formVars)
 	  		 	.setCallback({onClick:function(event, treeId, node){
 	  			var data ="";
 	  		 	if(node.attrType == 'field'){
  		 			if(node.type == 'string')
  		 		  	    data = node.tableName+'.getString("'+node.key+'")';
  		 			else if(node.type == 'number')
  		 		  		data = node.tableName+'.getInt("'+node.key+'")';
  		 			else if(node.type == 'date')
  		 				data = node.tableName+'.getDate("'+node.key+'")';
  		 			else data = node.tableName+'.get("'+node.key+'")';
  		 		}else if (node.attrType == 'var'){
  		 			data =node.name;
  		 		}else if(node.attrType == 'bpmConstants'){
  		 			data =node.key;
  		 		}else return ;
 	  		 	
 	  		 	varTree.hideMenu();
 	  		 	editor.replaceSelection(data);
 	  	         var cursor = editor.getCursor();
 	  	         editor.setCursor(cursor.line,cursor.ch);
 	  	         editor.focus();
 	  		 	}})
 	  		 	.makeCombTree(id)
 	  		 	.initZtree();
		},
		_initCallScriptTree:function(){
			if (this._tree_1) // 是否已初始化
				return false;
			
			this._tree_1 = true;
			var id = "callScriptTree";
    		var editor = this._codemirror[1];
 	  		var varTree = new BpmFormVar("varTree"+id, this.formVars)
 	  		 	.setCallback({onClick:function(event, treeId, node){
 	  			var data ="";
 	  		 	if(node.attrType == 'field'){
  		 			if(node.type == 'string')
  		 		  	    data = node.tableName+'.getString("'+node.key+'")';
  		 			else if(node.type == 'number')
  		 		  		data = node.tableName+'.getInt("'+node.key+'")';
  		 			else if(node.type == 'date')
  		 				data = node.tableName+'.getDate("'+node.key+'")';
  		 			else data = node.tableName+'.get("'+node.key+'")';
  		 		}else if (node.attrType == 'var'){
  		 			data =node.name;
  		 		}else if(node.attrType == 'bpmConstants'){
  		 			data =node.key;
  		 		}else return ;
 	  		 	
 	  		 	varTree.hideMenu();
 	  		 	editor.replaceSelection(data);
 	  	         var cursor = editor.getCursor();
 	  	         editor.setCursor(cursor.line,cursor.ch);
 	  	         editor.focus();
 	  		 	}})
 	  		 	.makeCombTree(id)
 	  		 	.initZtree();
		},
		_initCronExpressionCodeMirror:function(){
			this._codemirror[0] = CodeMirror.fromTextArea(document.getElementById("cronExpression"), {
				lineNumbers: true,
		        mode: "text/java"
			 });
			try{
				this._codemirror[0].setSize('auto', 'auto');
			}catch (e) {}
		},
		_initCallScriptCodeMirror:function(){
			if (this._codemirror_1) // 是否已初始化
				return false;
			
			this._codemirror_1 = true;
			this._codemirror[1] = CodeMirror.fromTextArea(document.getElementById("callScript"), {
				lineNumbers: true,
		        mode: "text/java"
			 });
			try{
				this._codemirror[1].setSize('auto', 'auto');
			}catch (e) {}
		},
		/**
		 * 是否发送催办信息的checkbox
		 */
		_bindNeedSendMsg :function(){
			$("#needSendMsg").change(function() {
				var sendMsg = $("#needSendMsg").is(':checked');
				if (sendMsg) {
					$(".send-msg-tr").show();
				} else {
					$("#sendTimes").val(0);
					$(".send-msg-tr").hide();
				}
			});
		},
		/**
		 * 将年月日转换为分钟
		 * 
		 * @param day
		 * @param hour
		 * @param minute
		 * @returns {Number}
		 */
		getTotalMinute:function (day, hour, minute) {
			var t = 0;
			t += parseInt(60 * 24 * day);
			t += parseInt(60 * hour);
			t += parseInt(minute);
			return t;
		},
		/**
		 * 解析时间，将分钟总数转换为天时分
		 * 
		 * @param time
		 * @returns {___anonymous6827_6880}
		 */
		parseTime:function (time) {
			var day = Math.floor(time / (60 * 24));
			var hour =  Math.floor((time -day * (60 * 24)) / 60) ;
			var minute = time - day * (60 * 24) - hour * 60;
			var rtTime = {
				day : day,
				hour : hour,
				minute : minute
			}
			return rtTime;
		},
		/**
		 * 获取发送目标，中间用','隔开
		 * 
		 * @param name
		 * @returns {String}
		 */
		getChecked:function (name) {
			var s = '';
			$('input[name="' + name + '"]:checked').each(function() {
				s += $(this).val() + ',';
			});
			if(s.length > 0){
				s = s.substring(0, s.length-1);
			}
			return s;
		},
		/**
		 * 解析富文本的发送目标
		 * 
		 * @param name
		 * @param value
		 */
		parseChecked:function (name, value) {
			if(!value) return;
			var str = value.split(",");
			$('input[name="' + name + '"]').removeAttr("checked");
			$('input[name="' + name + '"]').each(function() {
			    for (i=0;i<str.length ;i++ ){
			    	var val = str[i];
			    	if($(this).val() == val){
			    		$(this).attr("checked", 'true');
			    		this.checked='true';
			    		continue;
			    	}
			    }
			});
		},
		/**
		 * 获取
		 * 
		 * @returns {___anonymous5842_6330}
		 */
		getReminder:function () {
			var id = $("#id").val(); // id 
			var name = $("#name").val(); // 名称
			var procDefId = $("#procDefId").val(); // 流程定义节点
			var nodeId = $("#nodeId").val(); // 当前节点
			var relNodeId = $("#relNodeId").val(); // 相对节点
			var relNodeEvent = $("#relNodeEvent").val(); // 相对处理事件
			var relTimeType = $("#relTimeType").val(); // 相对时间类型
			
			var cronExpression = this._codemirror[0].getValue(); // 条件表达式
			var callScript = this._codemirror[1]?this._codemirror[1].getValue():""; // 调用指定方法
			
			var dueAction = $("#dueAction").val(); // 到期执行动作
			
			var dueTimeDay = $("#dueTimeDay").val(); // 到期时间
			var dueTimeHour = $("#dueTimeHour").val(); // 到期时间
			var dueTimeMinute = $("#dueTimeMinute").val(); // 到期时间
			var dueTime = this.getTotalMinute(dueTimeDay, dueTimeHour, dueTimeMinute);// 将年月日转换为分钟
			
			var reminderStartDay = $("#reminderStartDay").val(); // 开始发送时间
			var reminderStartHour = $("#reminderStartHour").val(); // 开始发送时间
			var reminderStartMinute = $("#reminderStartMinute").val(); // 开始发送时间
			var startTime = this.getTotalMinute(reminderStartDay, reminderStartHour,
					reminderStartMinute);// 将年月日转换为分钟
					
			var reminderIntervalDay = $("#reminderIntervalDay").val(); // 发送时间间隔
			var reminderIntervalHour = $("#reminderIntervalHour").val(); // 发送时间间隔
			var reminderIntervalMinute = $("#reminderIntervalMinute").val(); // 发送时间间隔
			var interval = this.getTotalMinute(reminderIntervalDay, reminderIntervalHour,
					reminderIntervalMinute);// 将年月日转换为分钟

			var sendTimes = $("#sendTimes").val(); // 发送次数

			var html = $("#html").val(); // 富文本内容
			var msgTypeHtml = this.getChecked('msgType_html'); // 获取富文本的发送目标
		 	
			var plainText = $("#plainText").val(); // 普通文本内容
			var msgTypePt = this.getChecked('msgType_pt'); // 获取普通文本的发送目标
			
			var item = {
					id:id,
					name : name,
					procDefId : procDefId,
					nodeId : nodeId,
					relNodeId : relNodeId,
					relNodeEvent : relNodeEvent,
					relTimeType : relTimeType,
					cronExpression : cronExpression,
					callScript: callScript,
					dueAction : dueAction,
					dueTime : dueTime,
					startTime : startTime,
					interval : interval,
					sendTimes : sendTimes,
					html : html,
					msgTypeHtml : msgTypeHtml,
					plainText : plainText,
					msgTypePt : msgTypePt
			}
			return item;
		},
		/**
		 * 设置数据
		 */
		setReminder:function (rowData) {
			$("#id").val(rowData['id']);
			$("#name").val(rowData['name']); // 名称
			$("#nodeId").val(rowData['nodeId']); // 当前节点
			$("#relNodeId").val(rowData['relNodeId']); // 相对节点
			$("#relNodeEvent").val(rowData['relNodeEvent']); // 相对处理事件
			$("#relTimeType").val(rowData['relTimeType']); // 相对时间类型
			
			$("#cronExpression").val(rowData['cronExpression']);
			this._codemirror[0].setValue(rowData['cronExpression']);
			
			$("#dueAction").val(rowData['dueAction']); // 到期执行动作
			this.callMethod(rowData['dueAction'], rowData['callScript']);

			var dueTime = this.parseTime(rowData['dueTime']);
			$("#dueTimeDay").val(dueTime.day); // 到期时间
			$("#dueTimeHour").val(dueTime.hour); // 到期时间
			$("#dueTimeMinute").val(dueTime.minute); // 到期时间

			var startTime = this.parseTime(rowData['startTime']);
			$("#reminderStartDay").val(startTime.day); // 开始发送时间
			$("#reminderStartHour").val(startTime.hour); // 开始发送时间
			$("#reminderStartMinute").val(startTime.minute); // 开始发送时间

			var interval = this.parseTime(rowData['interval']);
			$("#reminderIntervalDay").val(interval.day); // 发送时间间隔
			$("#reminderIntervalHour").val(interval.hour); // 发送时间间隔
			$("#reminderIntervalMinute").val(interval.minute); // 发送时间间隔
			
			var sendTimes = rowData['sendTimes'];
			$("#sendTimes").val(sendTimes); // 发送次数
			if(sendTimes != null && sendTimes > 0){
				$("#needSendMsg").attr("checked", true);
				$(".send-msg-tr").show();
			}

			$("#html").val(rowData['html']); // 富文本内容
			this.parseChecked('msgType_html', rowData['msgTypeHtml']);// 解析富文本的发送目标

			$("#plainText").val(rowData['plainText']); // 普通文本内容
			this.parseChecked('msgType_pt', rowData['msgTypePt']);// 解析富文本的发送目标
		},
		/**
		 * 设置调用方法
		 */
		callMethod:function (obj, val){
			var key;
			if(typeof obj == 'object'){
				key = $(obj).val();
			}else{
				key = obj;
			}
			if (key == 'call-method') {
				$("#callScript").val(val); // 重新架构下
				$(".callScript-tr").show();
				this._initCallScriptCodeMirror();
				this._codemirror[1].setValue(val);
				this._initCallScriptTree();
			} else {
				$("#callScript").val('');
				$(".callScript-tr").hide();
			}
		},
		selectConditionScript:function(idx){
			var me = this,
		  	url = __ctx+'/platform/script/conditionScript/setting.htm';
			DialogUtil.dialog({
			title : '条件脚本选择框',
			content : url,
		    area : ['60%', '80%'],
		    btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					  var dataList = DialogUtil.getChildFrameWindow(index).getData();
					  var data='';
					  for(var i=0; i<dataList.length;i++){
						  data += dataList[i].script+'   ';
					  }
					  me._codemirror[idx].setValue(data);
					  DialogUtil.close(index);
				   }
			   },
			   {
				   label:'取消',
				   iconCls : 'btn btn-danger fa fa-cancel',
				   action:function(dialog,index){
					    DialogUtil.close(index);
				   }
			   }]
			});
		},
		selectScript:function(idx){
			var me = this,
		  	url = __ctx+'/platform/script/commonScript/selectorDialog.htm';
			DialogUtil.dialog({
			title : '常用脚本选择框',
			content : url,
		    area : ['60%', '80%'],
		    btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					  var dataList = DialogUtil.getChildFrameWindow(index).getData();
					  var data='';
					  for(var i=0; i<dataList.length;i++){
						  data += dataList[i].script+'   ';
					  }
					  me._codemirror[idx].setValue(data);
					  DialogUtil.close(index);
				   }
			   },
			   {
				   label:'取消',
				   iconCls : 'btn btn-danger fa fa-cancel',
				   action:function(dialog,index){
					    DialogUtil.close(index);
				   }
			   }]
			});
		},
		initData:function(){
			if(!$.isEmpty(this.data) && $.isPlainObject(this.data)){
				this.setReminder(this.data);
			}
		},
		getData:function(){
			var name = $("#name").val();
			if(name.length==0){
				DialogUtil.warn("请输入名称");
				return;
			}
			var reminderJson = this.getReminder();
			reminderJson.id=$.uniqueId();
			
			return reminderJson;
		}
	};
})();
