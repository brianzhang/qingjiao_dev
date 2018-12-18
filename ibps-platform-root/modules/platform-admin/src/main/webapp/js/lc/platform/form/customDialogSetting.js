/**
 * 自定义对话框
 * 
 * <pre>
 * 作者：huangyx
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 21:40:48
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	customDialogSetting = new CustomDialogSetting();
	customDialogSetting.init();
});

(function() {
	// 定义常量
	var _consts = {
		SETTING : '#customDialogSetting'// 设置页面
	};
	/**
	 * 自定义对话框 对象
	 * 
	 * @returns {CustomDialog}
	 */
	CustomDialogSetting = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	CustomDialogSetting.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.SETTING).length > 0)// 设置页面
				this._initSetting();
		},
		/**
		 * 初始化设置
		 */
		_initSetting : function() {
			var me = this, curConditionField, curField;
			// 初始化布局
			me._initLayout();
			// 初始化数据
			me._initData();
			//初始化字段操作
			me._initAddColumn();
			//初始化操作按钮
			me._initOperate();
			
			
			me.changeJavaField();
			
			//默认类型改变监听
			me.changeDefaultType();
			me.changeCt();
			me._dialogChange();
			
			
			
			//改变显示类型
			me.changeDisplayType();
			
		},
		_initLayout:function(){
			var layout =   $('body').layout({ applyDefaultStyles: true,
				west__size: 			'38%',
				east__size: 			'58%',
				spacing_open:			1	,	
				togglerLength_open:		0	,		
				togglerLength_closed:	-1	,
				resizable: 				false
			});  	
			var height = $(window).height();
			$(".niceScroll").height(height-40);
			this._initScroll();
		},
		/**
		 * 滚动
		 */
		_initScroll:function(){
	    	$(".niceScroll").niceScroll({
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
	    	$(".niceScroll").getNiceScroll().resize();
		},
		/**
		 * 初始化字段操作
		 */
		_initAddColumn:function(){
			var me = this;
			$("#addColumns").on("click", function() {
				me._setField();
			});
			
			me._initSelectTr();
		},
		/**
		 * 初始化
		 */
		_initSelectTr:function(){
				$("#tableColumn tr").each(function(){
					$(this).bind("mousedown",function(event){
						if(event.target.tagName=="TD")  
							var strFilter='input:checkbox[class="pk"],input:radio[class="pk"]';
							var obj=$(this).find(strFilter);
							if(obj.length==1){
								var state=obj.prop("checked");
								obj.prop("checked",!state);
							}
						}
					);    
				});
		 },
		 _initOperate:function(){
			// 其他面板上移
			this._sortTrUp();
			// 其他面板下移
			this._sortTrDown();
			// 条件字段上移
			this._sortConditionTr();
			// 条件字段下移
			this._sortConditionDown();
			// 删除当前行
			this.delRow();
			this.delDiv();
			this._delConditionTr();
		 },
		 /**
		  * 初始化数据
		  */
		_initData : function() {
			var me = this,
				params = frameElement.dialog.params;
			$("input.treeField").focus(function() {
				me.curField = $(this);
			});
			var fields = params.fields;
				 me.isTree = (params.style == 1);
			if (fields.displayField)
				me.initDisplayField(fields.displayField);
			if (fields.conditionField)
				me.initConditionField(fields.conditionField);
			if (fields.resultField)
				me.initResultField(fields.resultField);
			if (fields.sortField)
				me.initSortField(fields.sortField);
		},
//=====================TODO 显示字段=====================
		/**
		 * 初始化显示字段值
		 * 
		 * @param displayField
		 */
		initDisplayField : function(displayField) {
			var me = this, fieldObj = eval("(" + displayField + ")"), objContainer = $("#trDisplayField");
			objContainer.empty();
			if (!me.isTree) { //列表
				for (var i = 0, c; c = fieldObj[i++];) {
					objContainer	.append(me._getDispalyField(c));
				}
			} else {
				if (fieldObj.id)
					$("#treeId").val(fieldObj.id);
				if (fieldObj.pid)
					$("#parentId").val(fieldObj.pid);
				if (fieldObj.displayName)
					$("#displayName").val(fieldObj.displayName);
				if (fieldObj.pvalue)
					$("#parentValue").val(fieldObj.pvalue);
				if (fieldObj.isScript)
					$("#isScript").prop("checked", true);
			}
		},
		/**
		 * 设置显示字段
		 */
		_setDisplayField : function() {
			var me = this, objContainer = $("#trDisplayField"),
				checkField =   this.getCheckField();
			if($.isEmpty(checkField)){
				DialogUtil.msg( '请选择左边的字段！');
				return ;
			}
			for (var i = 0, c; c = checkField[i++];) {
				var obj = $("#display" + c.fieldName);
				if (obj.length > 0) 
					continue;
				var tr = me._getDispalyField(c);
				objContainer.append(tr);
			}
		},

		/**
		 * 获取字段名信息
		 * 
		 * @returns
		 */
		_getDispalyField : function(field) {
			if(field.displayType=="enum"){
				var valueArr = [];
				var enumStr = (field.enumStr).split("##");
				for(var i=0;i<enumStr.length-1;i++){
					var value = {};
					value.value = enumStr[i].split("&")[0];
					value.key = enumStr[i].split("&")[1];
					valueArr.push(value);
				}
				field.enumStr = valueArr;
			}else field.enumStr=[];
			return template('dispalyFieldTem', field);
		},
		/**
		 * 获取选择的字段
		 * @returns {Array}
		 */
		getCheckField:function(){
			var checkField =[];
			$("input:checkbox[name='fieldName']:checked").each(function() {
				var trObj = $(this).closest("tr"),
					fieldName = $(this).val(),
					comment = $("input[name='comment']", trObj).val(),
					dbType = $(this).attr("dbType");
				checkField.push({
					fieldName:fieldName,
					comment:comment,
					dbType:dbType
				})
			});
			return checkField;
		},
		
		changeDisplayType : function() {
			$(document).on("change","select[name='displayType']",	function() {
					var obj = this,
						val = $(obj).val(),
						objTr = $(obj).parents("tr"),
						dateFormat = $("div[name='dateFormatDiv']", objTr),
						enumFormat = $("div[name='enumFormatDiv']", objTr);
					switch (val) {
						case "orig":
							dateFormat.hide(),enumFormat.hide();
							break;
						case "date":
							dateFormat.show(),enumFormat.hide();
							break;
						case "enum":
							dateFormat.hide(),enumFormat.show();
							break;
						}
					});
		},
//=====================TODO 条件字段=====================
		/**
		 * 初始化条件字段
		 * 
		 * @param conditionField
		 */
		initConditionField : function(conditionField) {
			var me = this;
			if (conditionField == null)
				return;
			conditionField = conditionField.trim();
			if (conditionField == "")
				return;
			var fieldObj = eval("(" + conditionField + ")"), objContainer = $("#trConditionField");
			objContainer.empty();
			if (fieldObj.length > 0 && fieldObj[0].defaultType == 5) {
				for (var i = 0; i < fieldObj.length; i++) {
					var c = fieldObj[i];
					if (c.field == '')
						continue;
					var div = $('#templateDiv').clone(true).css('display', '');
					div.attr('id', c.field);
					var text = div.children(':text');
					text.val(c.comment);
					text.attr('name', c.field);
					text.attr('dbType', c.dbType);
					if ('isAfferent' == c.dbType) {
						div.children(':checkbox').attr('checked', "checked");
					}
					$('div.fieldBtnDiv').append(div);

				}
				$("#script").text(fieldObj[0].defaultValue);
				return;
			}
			var selector = me._selectorChange();
			var dialog = me._getDialogs();
			for (var i = 0, c; c = fieldObj[i++];) {
				c.selector = selector;
				c.dialogSelect = dialog;
				objContainer.append(me._getConditionField(c));
			//xxxx 需要渲染对话框
			}
//			me._initParam();
		},
		/**
		 * 改变默认值
		 */
		changeDefaultType : function() {
			$(document).on("change","select[name='defaultType']",	function() {
					var obj = this,
						val = $(obj).val(),
						objTr = $(obj).parents("tr"),
						txtObj = $("textarea[name='defaultValue']",	objTr),
						linkObj = $("div[name='btnScript']", objTr),
						selectObj = $("select[name='ct']", objTr),
						dateFormat = $("div[name='dateFormatDiv']", objTr),
						selectorDiv = $("div[name='selectorDiv']", objTr),
						comboBoxDiv = $("div[name='comboBoxDiv']", objTr),
						dialogDiv = $("div[name='dialogDiv']", objTr);
				
					if(val != '1'){
						dateFormat.hide();
						selectorDiv.hide();
						comboBoxDiv.hide();
						dialogDiv.hide();
					}	
							
					switch (val) {
						case "1":
						case "4":
							txtObj.hide();
							linkObj.hide();
							selectObj.show();
							selectObj.trigger('change');
							break;
						case "2":
							txtObj.show();
							linkObj.hide();
							selectObj.hide();
							break;
						case "3":
							txtObj.show();
							linkObj.show();
							selectObj.hide();
							break;
						}
					});
		},
		changeCt:function(){
			$(document).on("change","select[name='ct']",	function() {
				var obj = this,
					val = $(obj).val(),
					objTr = $(obj).parents("tr"),
					dbType = objTr.attr("dbType"),
					dateFormat = $("div[name='dateFormatDiv']", objTr),
					selectorDiv = $("div[name='selectorDiv']", objTr),
					comboBoxDiv = $("div[name='comboBoxDiv']", objTr),
					dialogDiv = $("div[name='dialogDiv']", objTr);
				switch (val) {
					case "1":
							if(dbType == 'date'){//如果日期类型 需要设置日期
								dateFormat.show();
							}else{
								dateFormat.hide();
							}
							comboBoxDiv.hide();
							selectorDiv.hide();
							dialogDiv.hide();
						break;
					case "2":
						dateFormat.hide();
						comboBoxDiv.show();
						selectorDiv.hide();
						dialogDiv.hide();
						break;
					case "3"://选择器
						dateFormat.hide();
						comboBoxDiv.hide();
						selectorDiv.show();
						dialogDiv.hide();
						break;
					case "4"://对话框
						dateFormat.hide();
						comboBoxDiv.hide();
						selectorDiv.hide();
						dialogDiv.show();
						break;
				}
			});	
		},
		/**
		 * 获取字段名信息
		 */
		_getConditionField : function(field) {
			if(field.paraCt=="2"){
				field.select = eval('('+field.select+')'); 
			}
			var obj = {
					fieldName:field.fieldName,
					comment:field.comment,
					dbType:field.dbType?field.dbType:'varchar',
					condition:field.condition?field.condition:'=',
					defaultType:field.defaultType?field.defaultType:'1',
					defaultValue:field.defaultValue?field.defaultValue:'',
					paraCt:field.paraCt?field.paraCt:'1',
					param:field.param,
					paramName:field.paramName,
					dialogParam:field.dialog,
					selector:field.selector,
					dialog:field.dialogSelect,
					select:field.select
			};
			return template('conditionFieldTem', obj);
		},
//=====================TODO 返回字段=====================
		/**
		 * 初始化返回字段
		 */
		initResultField : function(resultField) {
			var me = this,
				fieldObj = eval("(" + resultField + ")"), 
				objContainer = $("#trResultField");
			objContainer.empty();
			if (!fieldObj)
				return;
			for (var i = 0, c; c = fieldObj[i++];) {
				objContainer	.append(me._getResultField(c));
			}
		},

		/**
		 * 设置返回字段
		 */
		setResultField : function() {
			var me = this,objContainer = $("#trResultField"),
				checkField =   this.getCheckField();
			if($.isEmpty(checkField)){
				DialogUtil.msg( '请选择左边的字段！');
				return ;
			}
			for (var i = 0, c; c = checkField[i++];) {
				var obj = $("#result" + c.fieldName);
				if (obj.length > 0) 
					continue;
				var tr = me._getResultField(c);
				objContainer.append(tr);
			}
		},
		/**
		 * 设置返回字段操作选择
		 * 
		 * @returns
		 */
		_getResultField : function(field) {
			return template('resultFieldTem', field);
		},

//=====================TODO 排序字段=====================
		/**
		 * 初始化排序字段
		 * 
		 * @param sortField
		 */
		initSortField : function(sortField) {
			if (!sortField.trim())
				return;
			var  me = this, fieldObj = eval("(" + sortField + ")"), objContainer = $("#trSortField");
			objContainer.empty();
			if (!fieldObj)
				return;
			for (var i = 0, c; c = fieldObj[i++];) {
				objContainer	.append(me._getSortField(c));
			}
		},
		_getSortField:function(field){
			return template('sortFieldTem', field);
		},
		/**
		 * 设置排序字段
		 */
		setSortField : function() {
			var me = this,objContainer = $("#trSortField"),
				checkField =   this.getCheckField();
			if($.isEmpty(checkField)){
				DialogUtil.msg( '请选择左边的字段！');
				return ;
			}
			for (var i = 0, c; c = checkField[i++];) {
				var obj = $("#sort" + c.fieldName);
				if (obj.length > 0) 
					continue;
				var tr = me._getSortField(c);
				objContainer.append(tr);
			}
		},
//=====================TODO 中间设置字段信息=====================
		/**
		 * 添加字段信息
		 */
		_setField : function() {
			var me = this, divContents = $(
					"[aria-expanded='true'][class='accordion-toggle']")
					.closest("div").next().find(".panel-body");
			if (divContents.length == 0) {
				DialogUtil.msg( '请先展开右边目标区域');
				return;
			}
			var visibleDivContent = $("[aria-expanded='true'][class='accordion-toggle']").closest("div");
			// 选择字段面板
			var divParent = $(divContents).closest('.fieldContainer');
			// 选择树字段面板
			var treeParent = $(divContents).closest('.treeContainer');
			if (divParent.length == 0) {
				divParent = $(visibleDivContent).closest('.panel-default');
			}
			if (divParent.attr('class').indexOf('display') >= 0) {
				me._setDisplayField();
				return;
			}
			if (treeParent.length > 0
					&& treeParent.attr('class').indexOf('tree') >= 0) {
				me._selectTreeField();
				return;
			}
			
			
			//条件字段
			if (divParent.attr('class').indexOf('condition') >= 0) {
				if ($(".nav-tabs > li").attr('class').indexOf('active') >= 0) {
					var aField = $("[data-toggle='tab'][aria-expanded='true']").attr('href')
					if (aField == "#tab-1") {
						if ($('.btnTree') != undefined
								&& $('.btnTree').length > 0) {
							me._setConditionField(false);
						} else
							me._setConditionField(true);

					} else if (aField == "#tab-2") {
						var trObj = $(this).closest("tr");
						var fieldName = $(this).val(); // id
						var comment = $("input[name='comment']", trObj).val();
						var dbType = $(this).attr("dbType");
						var fnBtns = $('div.fieldBtnDiv').children(
								'div[id="' + fieldName + '"]');
						if (fnBtns == undefined || fnBtns.length < 1) {
							var div = $("#templateDiv").clone(true).css(
									'display', '');
							div.attr('id', fieldName);
							var text = div.children(':text');
							text.val(comment);
							text.attr('name', fieldName);
							text.attr('dbType', dbType);
							$('div .fieldBtnDiv').append(div);
							$('div.fieldBtnDiv').append(div);
							me.curConditionField = "javaField";
						}
						return;
					}
				}
			}
			if (divParent.attr('class').indexOf('return') >= 0) {
				me.setResultField();
				return;
			}
			if (divParent.attr('class').indexOf('sort') >= 0) {
				me.setSortField();
				return;
			}
		},

		/**
		 * 设置字段名信息
		 * 
		 * @param isList
		 */
		_setConditionField : function(isList) {
			var me = this,objContainer = $("#trConditionField"),
				checkField =   this.getCheckField();
			
			if($.isEmpty(checkField)){
				DialogUtil.msg( '请选择左边的字段！');
				return ;
			}
			var selector = me._selectorChange();
			var dialog = me._getDialogs();
			for (var i = 0, c; c = checkField[i++];) {
				if (c.dbType == "clob" || c.dbType == "blob") {
					DialogUtil.msg("【"+c.fieldName+"】该字段类型是clob或blob，不支持作为条件,请重新在左边选择字段!");
					return;
				}
				c.selector = selector;
				c.dialogSelect = dialog;
				var tr = me._getConditionField(c);
				objContainer.append(tr);
			}
		},

	
//=====================TODO 中间设置树形字段信息=====================
		/**
		 * 选择树事件
		 * 
		 * @param bool
		 */
		_selectTreeField : function() {
			var me = this;
			var obj = $("input:checkbox[name='fieldName']:checked");
			if (me.curField == null || me.curField.length == 0) {
				DialogUtil.msg("请选择右边的输入框!");
				return;
			}
			if (obj.length == 0) {
				DialogUtil.msg("请选择左边的字段!");
				return;
			}
			if (obj.length > 1) {
				DialogUtil.msg("只能选择一个左边的字段!");
				return;
			}
			me.curField.val(obj.val());
		},

		/**
		 * 控制条件面板的脚本
		 */
		changeJavaField : function() {
			var me = this;
			$(".nav-tabs > li").click(function() {
				var divShow = $("div[name='javaField']");
				if (divShow.lenght > 0) {
					$('div.fieldBtnDiv').show();
					me.curConditionField = "javaField";
				} else {
					$('div.fieldBtnDiv').hide();
					if ($("div[name='helpField']").length > 0) {
						me.curConditionField = "";
					}
				}
			});
		},
		//=====================TODO 获取设置结果数据=====================
		
		/**
		 * 获取设置结果数据
		 */
		getData : function() {
			var me = this;
			var rtn = "";
			// 如果是树状的只取不大于3个的返回值
			if (me.isTree) {
				rtn = me.buildTreeJson();
			} else {
				rtn = me.buildListJson();
			}
			if (!$.isEmpty(rtn)) {
				DialogUtil.alert(rtn, '提示信息');
				return;
			}
			var data = {
					displayfield:me.displayStr,
					conditionfield:me.conditionStr,
					resultfield:me.resultStr,
					sortfield:me.sortStr
			};
			return data;
		},

		/**
		 * 解析树型
		 */
		buildTreeJson : function() {
			var me = this,
				rtn = "", treeId = $("#treeId").val(),
				parentId = $("#parentId").val(),
				parentValue = $("#parentValue").val(),
				isScript = $("#isScript").is(":checked"),
				displayName = $("#displayName").val();
			if ($.isEmpty(treeId) || $.isEmpty(parentId) || $.isEmpty(displayName)) {
				rtn += "请填写映射树的字段！";
				return rtn;
			}
			var  display ={
					id :treeId,
					pid:parentId,
					displayName:displayName,
					pvalue:parentValue,
					isScript:isScript
					
			}
			me.displayStr = JSON2.stringify(display);
			
			
			var result = me.getCondition();
			if (result) {
				rtn += "请填写条件字段的值\r\n";
			}
			//结果字段
			var r3 = me.getResult();
			if (r3)
				rtn += "请选择返回字段\r\n";
			// 排序字段
			me.getSort();

			return rtn;
		},

		/**
		 * 获取列表字段值
		 */
		buildListJson : function() {
			var me = this, rtn = "";
			var r1=  	me.getDisplay();
			
			if (r1) 
				rtn +=  "请选择显示字段\r\n";
		
			//---- 获取条件字段
			var r2 = me.getCondition();
			if (r2) 
				rtn += "请填写条件字段的值\r\n";
			
			//---- 获取返回字段
			var r3 = me.getResult();
			if (r3)
				rtn += "请选择返回字段\r\n";
			// 排序字段
			me.getSort();
			return rtn;
		},
		/**
		 * 获取显示字段
		 * @returns {Boolean}
		 */
		getDisplay:function(){
			var me=this, aryDisplay = [];
			$("#trDisplayField").children().each(function() {
				var enumStr="",format="";
				var  tr =  $(this);
					   fieldName = tr.attr("name"),
					   comment = $("[name='comment']",tr).val();
					   displayType = $("[name='displayType']",tr).val();
					   if(displayType=="enum"){
						   var strValue="",strKey="";
							var valueArr = [];var keyArr = [];
							var values =  tr.find('input[name="value"]');
							values.each(function(i,name){
								strValue = strValue + name.value+"&";
					        });
							var keys =  tr.find('input[name="key"]');
							keys.each(function(i,name){
								strKey = strKey + name.value+"&";
					        });
							var Values = strValue.split("&");
							var Keys = strKey.split("&");
							for(var i=0;i<Values.length-1;i++){
								enumStr += Values[i]+"&"+Keys[i]+"##";
							}
					   }else{
						   format = $("[name='format']",tr).val();
					   }
				aryDisplay.push({
					fieldName:fieldName,
					comment:comment,
					displayType:displayType,
					format:format,
					enumStr:enumStr
				});
			});
			if (aryDisplay.length == 0) 
				return true;
			me.displayStr = JSON2.stringify(aryDisplay);
			return false;
		},
		getResult:function(){
			var me =this, aryResultField =[];
			//	 获取返回字段
			$("#trResultField").children().each(function() {
				var  tr =  $(this);
			   		fieldName =tr.attr("name"),
			   		comment = $("[name='comment']",tr).val();
				aryResultField.push({
					fieldName:fieldName,
					comment:comment
				});
			});

			if (aryResultField.length == 0) 
				return  true;
			me.resultStr = JSON2.stringify(aryResultField);
			return false;
		},
		/**
		 * 获取字段条件
		 */
		getCondition : function() {
			var me = this,aryContion = [],rtn = false;
			if (me.curConditionField == "javaField") {
				$('.fieldBtnDiv div').each(function() {
					var obj = {};
					obj.fieldName = $(this).attr('id');
					obj.comment = $(this).children(':text:first').val();
					obj.condition = "";
					obj.dbType = "";
					obj.defaultType = "5";
					obj.defaultValue = "";
					if ($(this).children(':checkbox').is(':checked')) {
						obj.dbType = "isAfferent";
					}
					aryContion.push(obj);
				});
				if (aryContion.length == 0) {
					obj.fieldName = "";
					obj.comment = "";
					obj.condition = "";
					obj.dbType = "";
					obj.defaultType = "5";
					obj.defaultValue = "";
					aryContion.push(obj);
				}
				me.conditionStr = JSON2.stringify(aryContion);
				return rtn;
			}
			$("#trConditionField").children("tr.trCondition").each(function() {
						var trObj = $(this),trDefault = trObj.next(),
							selObj = $('select.condition', trObj), 
							fieldName = selObj.attr("name"),
							comment = selObj.attr("comment"),
							condition = selObj.val(),
							dbType = selObj.attr("dbType");
						var obj = {
							fieldName : fieldName,
							comment : comment,
							dbType:dbType,
							condition:condition,
							paraCt:'',//控件类型
							format :'',//格式
							dialog:'',//对话框
							param:'',//参数值	 
						};
						var defaultType = $("select[name='defaultType']",
								trDefault).val(),
								defaultValue = $("textarea[name='defaultValue']",
								trDefault).val();
						obj.defaultType = defaultType;
						if (defaultType != "1" && defaultType != "4" 	&& defaultValue.trim() == "") {
							rtn = "请检查是否填写值！";
							return rtn;
						}
						
						if (defaultType == "1" || defaultType == "4") {
							obj.defaultValue = "";
							var paraCtSelector = $('select[name="ct"]',trDefault);
							obj.paraCt = paraCtSelector.val();
							if(obj.dbType != 'date'){//r
								obj. format  = 'yyyy-MM-dd';
							}
							
							if(obj.paraCt  == '2'){//下拉框
								var strValue="",strKey="";
								var valueArr = [];var keyArr = [];
								var values =  paraCtSelector.closest('td').find('input[name="value"]');
								values.each(function(i,name){
									strValue = strValue + name.value+"&";
						        });
								var keys =  paraCtSelector.closest('td').find('input[name="key"]');
								keys.each(function(i,name){
									strKey = strKey + name.value+"&";
						        });
								var Values = strValue.split("&");
								var Keys = strKey.split("&");
								for(var i=0;i<Values.length-1;i++){
									var value = {};
									value.value = Values[i];
									value.key = Keys[i];
									valueArr.push(value);
								}
								obj.select =  JSON2.stringify(valueArr);
							}else if(obj.paraCt  == '3'){//选择器
								obj.param =  paraCtSelector.closest('td').find('select[name="selector-type"]').val();;
							} else if(obj.paraCt  == '4'){//对话框
								obj.dialog = paraCtSelector.closest('td').find('select[name="dialog-type"]').val();
								var param = paraCtSelector.closest('td').find('select[name="dialog-param"]').val();
								var pa = param.split("&");
								obj.param = pa[0];
								obj.paramName = pa[1];
							}
							
						} else {
							obj.defaultValue = defaultValue;
						}
						aryContion.push(obj);
					});
			me.conditionStr = JSON2.stringify(aryContion);
			return rtn;
		},

		/**
		 * 获取排序字段
		 */
		getSort : function() {
			var me = this, arySortField = [];
			$("#trSortField").children().each(function() {
				var fieldName = $(this).attr("name"),
					direction = 'DESC';//不勾选为降序
				var sort = $('input[name="direction"]', this);
				var checked =sort[0].checked;
				if (checked) 
					direction = 'ASC';
				arySortField.push({
					fieldName : fieldName,
					direction:direction
				});
			});
			me.sortStr = JSON2.stringify(arySortField);
		},

		
//===============TODO 统一操作按钮 ====================
		/**
		 * 删除div
		 */
		delDiv : function() {
			$(document).on("click", "#delDiv", function() {
				$(this).closest('div').remove();
			})
		},

		/**
		 * 删除行
		 */
		delRow : function() {
			$(document).on("click", "#delRow", function() {
				$(this).closest("tr").remove();
			})
		},

		/**
		 * 上移动事件
		 */
		_sortTrUp : function(obj, isUp) {
			$(document).on("click", "#trUp", function() {
				var thisTr = $(this).parents("tr");
				var prevTr = $(thisTr).prev();
				if (prevTr) {
					thisTr.insertBefore(prevTr);
				}
			});
		},

		/**
		 * 下移事件
		 */
		_sortTrDown : function() {
			$(document).on("click", "#trDown", function() {
				var thisTr = $(this).parents("tr");
				var nextTr = $(thisTr).next();
				if (nextTr) {
					thisTr.insertAfter(nextTr);
				}
			})
		},

		/**
		 * 
		 * 排序:向上事件
		 */
		_sortConditionTr : function() {
			$(document).on("click", "#moveupup", function() {
				var thisTr = $(this).closest("tr");
				var nextTr = thisTr.next();
				// 向上
				var prevTr = thisTr.prev();
				if (prevTr.length == 0)
					return;
				var targeTr = prevTr.prev();
				thisTr.insertBefore(targeTr)
				nextTr.insertBefore(targeTr);
			})
		},

		/**
		 * 下移事件
		 */
		_sortConditionDown : function() {
			$(document).on("click", "#movedown", function() {
				var thisTr = $(this).closest("tr");
				var nextTr = thisTr.next();
				// 向下
				var tmpTr = nextTr.next();
				if (tmpTr.length == 0)
					return;
				var targeTr = tmpTr.next();
				nextTr.insertAfter(targeTr);
				thisTr.insertAfter(targeTr);
			})
		},

		/**
		 * 删除条件字段当前DIV
		 */
		_delConditionTr : function() {
			$(document).on("click", "#delConditionTr", function() {
				var tr = $(this).closest("tr");
				tr.next().remove().end().remove();
			});
		},

		/**
		 * 提示勾选
		 */
		_callQtip : function() {
			$('.fieldBtnDiv :checkbox').qtip({
				content : "勾选表示此参数为动态传入的参数，否则为查询参数",
				style : "cream"
			});
		},

		/**
		 * 获取自定义对话框
		 */
		_getDialogs : function() {
			var dialog;
			var url = __ctx + '/platform/form/customDialog/getAll.htm';
			$.ajax({
				type : "get",
				async : false,
				url : url,
				success : function(data) {
					if (data) {
						var fields = data.rows;
						dialog = fields;
					}
				}
			});
			return dialog;
		},

		/**
		 * 获取不同的对话框
		 */
		_dialogChange : function(obj) {
			$(document).on(	"change",
					"select[name='dialog-type']",
					function() {
						if (obj == null || obj == undefined) {
							obj = this;
						}
						var dia = $(obj).find("option:selected");
						var v = dia.attr("fields");
						var param = dia.attr("param");
						if (v) {
							var paramSelector = $(obj).siblings("#dialog-param");
							var opt = paramSelector.find("option:first-child");
							paramSelector.text('');
							var fields = $.parseJSON(v);
							for (var i = 0, f; f = fields[i++];) {
								var selected="";
								if(f.fieldName==param){
									selected = "selected";
								opt = $('<option value="' +  f.fieldName+'&'+f.comment + '" selected="'+selected+'">'
										+ f.comment + '</option>');
								}else{
									opt = $('<option value="' + f.fieldName+'&'+f.comment + '">'
											+ f.comment + '</option>');
								}
								paramSelector.append(opt);
							}
						}
					});
		},
		/**
		 * 初始化选择器
		 */
		_selectorChange : function() {
			var str ;
			var params = frameElement.dialog.params;
			var fieldObj = eval("(" + params.fields.conditionField + ")");
			var url = __ctx+"/platform/form/selector/listJson.htm";
			$.ajax({
					type : "get",
					async : false,
					url : url,
					success : function(data) {
						if (data) {
							var fields = data.rows;
							str = fields;
						}
					}
				});
			return str;
		},
		/**
		 * 添加下拉框值
		 */
		_addSelect : function(obj){
			//查找父节点的父节点即 id为select 的div
			//为了避免在该页面有多个下拉框，点击一个添加按钮时给其他的下拉框也添加了
			var trObj =$(obj).parent("div").parent("div");
			trObj.append('<div class="margin-10">'+
					'<div style="margin: 5px 0; position: relative; height: 40px;">'+
					' <input class="form-control  field-home"'+
						'type="text" name="key"'+
						'style="position: absolute; left: 7%;width:40%" /> <input '+
						'class="form-control  field-home" '+
						'type="text" name="value" '+
						'style="position: absolute; left: 50%; width:40%" />  '+
						'<span class="fa fa-times-circle-o hover-pointer" '+
						 'title="移除" onclick="customDialogSetting._deleteSelect(this)"'+
						'style="position: absolute; right: 5px; top: 10px;">'+
					'</span>'+
				'</div>'+
			'</div>'+
		'</div>');
		},
		/**
		 * 删除下拉框添加的值
		 * @param obj
		 */
		_deleteSelect : function(obj){
			obj.parentNode.parentNode.removeChild(obj.parentNode);
		}
	};
})();
