/**
 * ibps_DS_DATASOURCE【系统数据源管理】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-06 11:38:43
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	 dataSource = new DataSource({
		grid : '#dataSourceGrid',// 列表对象
		pager : '#dataSourcePager',// 列表分页
		form : '#dataSourceForm',// 表单form
		get : '#dataSourceDiv'//get详细页面
	});
});
/**
 * ibps_DS_DATASOURCE【系统数据源管理】 对象
 * @param opt
 * @returns {DataSource}
 */
DataSource = function(opt) {
	this.options = $.extend({}, opt);
	this.init();
};

/**
 * 方法
 */
DataSource.prototype = {
	/**
	 * 初始化
	 */
	init : function() {
		if (this.hasInit) // 是否已初始化
			return false;
		this.hasInit = true;
		if ($(this.options.grid).length > 0)//列表
			this._initGridList();
		if ($(this.options.form).length > 0)//表单
			this._initForm();
		if ($(this.options.get).length > 0)//get详细页面
			this._initGet();
	},
	/**
	 * 初始列表
	 */
	_initGridList : function() {
		var me = this, opt = me.options;
		$(opt.grid).GridList(
				{
					url :  __ctx+'/platform/ds/dataSource/listJson.htm',
					pager : opt.pager,
					colNames: ['别名','名称','数据库类型','是否默认','状态','管理'],
			        colModel: [{
			                 	   name:'alias',
			                 	   width: 60,
			                 	   sortable:false,
			                 	   key:true
			                	 				                	 	}, {
			                 	   name:'name',
			                 	   sortable:false,
			                 	   width: 60
			                	 				                	 	}, {
			                 	   name:'driver',
			                 	   sortable:false,
			                 	   width: 80
			                	 				                	 	}, {
			                 	   name:'isDefault',
			                 	   width: 40,
			                 	   sortable:false,
					               formatter:'select', 
					               formatoptions:{value:{ 'true':'是','false':'否'}}
			                	 				                	 	}, {
			                 	   name:'status',
			                 	   sortable:false,
			                 	   width: 40
			                	 				                	 	},  {
								name : '__manage',
								label:'管理',
								sortable:false,
								width : 20,
								classes:'rowOps',
								formatter : 'manage',
								formatoptions :[{
									label:'编辑',
									classes:'btn btn-primary fa fa-edit',
									action:__ctx+'/platform/ds/dataSource/edit.htm?alias={alias}'
								},{
									label:'明细',
									classes:'btn btn-primary fa fa-detail',
									action: __ctx+'/platform/ds/dataSource/get.htm?alias={alias}'
								},{
									label:'删除',
									classes:'btn btn-primary fa fa-remove',
									hidden:function(opts,rowData){
										return rowData.isDefault;
									} ,
									action:__ctx+'/platform/ds/dataSource/remove.htm?alias={alias}'
								}]
							} ]

				});
		$("#reload").on('click',function(){
			me._initReload();
		});
	},
	/**
	 * 初始化表单
	 */
	_initForm : function() {
		var me = this, form = $(me.options.form), frm = form.form(),alias;
		me.dbTypeAry =[
						{
							value:'mysql',
							driver:'com.mysql.jdbc.Driver',
							url:'jdbc:mysql://主机:3306/数据库名?useUnicode=true&characterEncoding=utf-8'
						},
						{
							value:'oracle',
							driver:'oracle.jdbc.OracleDriver',
							url:'jdbc:oracle:thin:@主机:1521:数据库实例'
						},
						{
							value:'sqlserver',
							driver:'com.microsoft.sqlserver.jdbc.SQLServerDriver',
							url:'jdbc:sqlserver://主机:1433;databaseName=数据库名;'
						}
					];
		// 触发表单验证
		 frm.valid();
		// 处理表单保存
		$(document).on('click', 'a.fa-save', function() {
			var $el = $(this);
			$el.button('loading'); 
			frm.ajaxForm({
				success : function(responseText){
					$el.button('reset'); 
					me._showResponse(responseText);
				},
				error: function(){
					$el.button('reset'); 
				}
			});
			if (frm.valid()){
				 nameJson = $("span#aliasJson").text().trim();
				 var oldAlias =$("input#oldAlias").val();
				 if(nameJson){
					nameAry = JSON2.parse(nameJson);
					var _alias = $("input#alias").val();
					if(_alias != oldAlias){
						if(nameAry.indexOf(_alias)>-1){
							DialogUtil.toastr("别名:"+_alias+"已经存在了，请重新输入！");
							return;
						}
					}
				}
				 //验证密码统一
				 var password = $("#password").val();
				 var confirmPwd = $("#confirmPwd").val();
				 if(confirmPwd != password){
						DialogUtil.toastr("密码不统一，请重新输入！");
						return;
				 }
				me._dealVariablesData();
				form.submit();
			}else{
				$el.button('reset');
				DialogUtil.toastr("验证失败，请检查!");
			}
		});
		
		alias = $("#alias").val();
		if(alias){
			me._initParam();
		}
		
		$("#dbType").on("change",function(){
			var dbType = $(this).find("option:selected").val();
			me._changeDbType(dbType);
		});
		
		$("a#testConn").on("click",function(){
			me._checkConnection();
		})
		
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
						window.location.href = __ctx+'/platform/ds/dataSource/list.htm';
					});
		} else {
			DialogUtil.error(msg.getMessage());
		}
	},
	
	_initGet : function(){
		var me = this;
		var paramJson = $("#paramJson").val();
		var param = JSON2.parse(paramJson);
		if(param){
			var variableDefJson = param.variableDefJson;
			var variableDef = JSON2.parse(variableDefJson);
			me._renderHml(variableDef)
		}
	},
	
	/**
	 * 编辑数据源时初始化参数
	 */
	_initParam:function(){
		var me = this;
		var variableJson = $("#variableJson").val();
		var variableObj  = JSON2.parse(variableJson);
		for(prop in variableObj){
			$("input#"+prop).val(variableObj[prop]);
		}
		/*var paramMap = $("input#paramMap").val();
		if(paramMap){
			var paramObj = JSON2.parse(paramMap);
			var variableDefJson = paramObj.variableDefJson;
			var initMethod = paramObj.initMethod;
			var closeMethod = paramObj.closeMethod;
			var classPath = paramObj.classPath;
			$("input#initMethod").val(initMethod);
			$("input#closeMethod").val(closeMethod);
			$("#classPath").val(classPath);
			if(variableDefJson){
				//
				var variableDefObj = JSON2.parse(variableDefJson);
				for(var i = 0 ;i<variableDefObj.length;i++){
					var variable =variableDefObj[i];
					$("input#"+variable.name).val(variable.value);
				}
			}else{
				var variableJson = $("#variableJson").val();
				var variableObj  = JSON2.parse(variableJson);
				for(prop in variableObj){
					$("input#"+prop).val(variableObj[prop]);
				}
			}
		}else{
			var variableJson = $("#variableJson").val();
			var variableObj  = JSON2.parse(variableJson);
			for(prop in variableObj){
				$("input#"+prop).val(variableObj[prop]);
			}
		}*/
	},
	
	
	/**
	 * 渲染 paramView参数区域
	 * @param json
	 */
	_renderHml : function(json){
		if(!json)return;
		var data = {list :json};
		var html = template('paramTem', data);
		$("#paramView").html(html);
	},
	
	/**
	 * 根据选择的数据库类型带出对应的参数规范
	 * @param dbType
	 */
	_changeDbType : function(dbType){
		var me = this;
		for(var i=0;i<me.dbTypeAry.length;i++){
			var _dbTypeObj = me.dbTypeAry[i];
			if(_dbTypeObj.value != dbType)continue;
			$("input#driver").val(_dbTypeObj.driver);
			$("input#driver").closest("div.has-error").removeClass("has-error");
			$("input#driverUrl").val(_dbTypeObj.url);
			$("input#driverUrl").closest("div.has-error").removeClass("has-error");
		}
	},
	
	/**
	 * 提交前处理 variable，param数据
	 */
	_dealVariablesData : function(){
		var me=this,
		variable={},
		initMethod = $("input#initMethod").val(),
		closeMethod = $("input#closeMethod").val(),
		classPath = $("#classPath").val(),
		paramAry=[];
		$("input[variable='variable']").each(function(){
			var _me = $(this), _key, _value,_comment,_type,_isReq;
			_key = _me.attr("id");
			_value = _me.val();
			_comment = _me.attr("comment");
			_type = _me.attr("type");
			_isReq = _me.attr("isReq");
			
			variable[_key] =_value;
			var paramObj={
					name : _key,
					comment : _comment,
					type : _type,
					isReq : _isReq,
					value : _value
			};
			paramAry.push(JSON2.stringify(paramObj));
		})
		var variableStr = JSON2.stringify(variable);
		paramObj={
				classPath:classPath,
				variableDefJson : "["+paramAry.join(",")+"]",
				initMethod :initMethod,
				closeMethod :closeMethod
				};
		$("input#variableJson").val(variableStr);
		$("input#paramJson").val(JSON2.stringify(paramObj));
	},
	
	/**
	 * 从dataSource.xml重新加载数据源
	 */
	_initReload : function(){
		var url=__ctx+"/platform/ds/dataSource/reload.htm";
		url=url.getNewUrl();
		$.post(url,{},function(responseText){
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				window.location.reload(true);
			} else {
				DialogUtil.error(msg.getMessage());
			}
		})
	},
	
	_checkConnection : function(){
		var me=this;
		me._dealVariablesData();
		var param ={
				alias :  $("#alias").val(),
				driver :  $("#driver").val(),
				driverUrl : $("#driverUrl").val(),
				user : $("#user").val(),
				password : $("#password").val(),
				variableJson : $("#variableJson").val(),
				paramJson: $("#paramJson").val()
		}
		var url=__ctx+"/platform/ds/dataSource/checkConnection.htm";
		url=url.getNewUrl();
		$.post(url,param,function(responseText){
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.toastr(msg.getMessage());
			}else{
				DialogUtil.error(msg.getMessage());
			}
		})
	},
	
	_setDefault : function(alias){
		var url = __ctx+'/platform/ds/dataSource/setDefault.htm';
		url=url.getNewUrl();
		$.post(url,{alias:alias},function(responseText){
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.toastr(msg.getMessage());
				window.location.reload(true);
			}else{
				DialogUtil.error(msg.getMessage());
			}
		})
	}
};
