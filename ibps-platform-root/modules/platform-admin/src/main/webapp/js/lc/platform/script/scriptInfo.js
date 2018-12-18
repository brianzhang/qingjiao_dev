
/**
 * 脚本管理
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-28 16:07:44
 *</pre>
 */
$(function() {
	scriptInfo  = new ScriptInfo();
	scriptInfo.init();
	
	formUrl = scriptInfo.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#scriptInfoGrid",// 列表对象
			PAGER : "#scriptInfoPager",// 列表分页
			FORM : '#scriptInfoForm'// 表单form
	};
	/**
	 * 脚本管理 对象
	 * @returns {ScriptInfo}
	 */
	ScriptInfo = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ScriptInfo.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				
			}
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
				this._initBtns();
				this.initArgumentTable();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/script/scriptInfo/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','脚本别名','类路径','对象名','方法名','方法描述','返回类型','相关设置','是否有效','脚本类型','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_'
				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'aliasName',
				                	   index: 'ALIAS_NAME_'
				                	 					                	 	}, {
				                 	   name:'className',
				                	   index: 'CLASS_NAME_'
				                	 					                	 	}, {
				                 	   name:'classInsName',
				                	   index: 'CLASS_INS_NAME_'
				                	 					                	 	}, {
				                 	   name:'methodName',
				                	   index: 'METHOD_NAME_'
				                	 					                	 	}, {
				                 	   name:'methodDesc',
				                	   index: 'METHOD_DESC_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'returnType',
				                	   index: 'RETURN_TYPE_'
				                	 					                	 	}, {
				                 	   name:'argument',
				                	   index: 'ARGUMENT_'
				                	 	,hidden:true
				                	 	}, {
				                 	   name:'enable',
				                	   index: 'ENABLE_'
				                	 	,formatter: 'select'
				                        ,formatoptions: {
			                            	value: {
												'Y':'是'
												,'N':'否'
			                                }
				                        }
				                	 	}, {
				                 	   name:'type',
				                	   index: 'TYPE_'
				                	 	,hidden:true
				                	 	}, {
									name : '__manage',
									width : 40,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/script/scriptInfo/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/script/scriptInfo/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/script/scriptInfo/get.htm?id={id}'
									}]
								} ]
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.initArgument();
				me.formUrl.submit(me._showResponse);
			});
		},
		
		initArgument : function(){
			var args = [];
			$("#paramTable tbody tr").each(function(i){
				// paramName
				var paramName = $("[name='paramName']", this).val();
				// paramType
				var paramType = $("[name='paramType']", this).val();
				// paramTypeLabel
				var paramTypeLabel = $("[name='paramTypeLabel']", this).val();
				// paramMode
				var paramMode = $("[name='paramMode']", this).val();
				// paramValue
				var paramValue = $("[name='paramValue']", this).val();
				
				var arg = {paramName : paramName, paramType : paramType, paramTypeLabel : paramTypeLabel, paramMode : paramMode, paramValue : paramValue};
				args.push(arg);
			});
			$("#argument").val(JSON2.stringify(args));
		},
		
		initArgumentTable : function(){
			var argument = $("#argument").val()
				args = JSON.parse(argument) || [];
			
			$(args).each(function(i){
				var timestamp = Date.parse(new Date());
				this.idx = timestamp;
				var html = template("paramTemplate", this);
				$("#trContainer").append(html);
			});
		},
		
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		_initBtns : function(){
			var me = this;
			$(document).on('click', 'a.fa-bug', function() {
				me.initArgument();
				
				var cn = $("#className").val();
				var mn = $("#methodName").val();
				var cin = $("#classInsName").val();
				var rt = $("#returnType").val();
				var args = $("#argument").val();
				
				var valiMessage = '';
				if($.isEmpty(cn)){
					valiMessage += "类名为空|";
				}
				if($.isEmpty(mn)){
					valiMessage += "方法名为空|";
				}
				if($.isEmpty(cin)){
					valiMessage += "对象名为空|";
				}
				if($.isEmpty(rt)){
					valiMessage += "返回类型为空|";
				}
				
				if(valiMessage.length > 0){
					DialogUtil.warn(valiMessage);
					return;
				}
				
				// 校验方法一致性
				var ld = DialogUtil.load("校验中...");
				
				$.ajax({
					url : __ctx + "/platform/script/scriptInfo/validation.htm",
					type : "get",
					data : {
						className 		: cn,
						methodName 		: mn,
						classInsName 	: cin,
						returnType 		: rt,
						argument		: args
					},
					async : true,
					success : function(rs){
						DialogUtil.close(ld);
						var msg = new com.lc.form.ResultMessage(rs);
						if (msg.isSuccess()) {
							DialogUtil.alert(msg.getMessage());
						} else {
							DialogUtil.error(msg.getMessage());
						}
					},
					error : function(){
						DialogUtil.close(ld);
						DialogUtil.error("服务器异常");
					}
				});
			});
		},
		
		addDataParam : function(){
			//var idx = $("#paramTable tbody tr").length + 1;
			var timestamp = Date.parse(new Date()); 
			var html = template("paramTemplate", {idx : timestamp});
			$("#trContainer").append(html);
		},
		
		move : function(obj, isUp) {
			var thisTr = $(obj).parents("tr");
			if (isUp) {
				var prevTr = $(thisTr).prev();
				if (prevTr) {
					thisTr.insertBefore(prevTr);
				}
			} else {
				var nextTr = $(thisTr).next();
				if (nextTr) {
					thisTr.insertAfter(nextTr);
				}
			}
		},
		
		del : function(obj) {
			$(obj).closest("tr").remove();
		},
		
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/script/scriptInfo/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


