/**
 * ibps_DS_DATASOURCE_DEF【数据源定义】
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-15 22:54:34
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var dataSourceDef;
$(function() {
	dataSourceDef  = new DataSourceDef();
	dataSourceDef.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#dataSourceDefGrid",// 列表对象
			PAGER : "#dataSourceDefPager",// 列表分页
			FORM : '#dataSourceDefForm'// 表单form
	};
	/**
	 * ibps_DS_DATASOURCE_DEF【数据源定义】 对象
	 * @returns {DataSourceDef}
	 */
	DataSourceDef = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	DataSourceDef.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/ds/dataSourceDef/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['名称','别名','数据源类全路径','管理'],
				        colModel: [{
				                 	    name:'name',
				                 	    sortable:false,
				                	 	key:true
				                	 	}, {
				                 	   name:'alias',
				                 	  sortable:false
				                	 					                	 	}, {
				                 	  name:'classPath',
				                 	  sortable:false
				                	 					                	 	},  {
									name : '__manage',
									width : 20,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/ds/dataSourceDef/edit.htm?name={name}'
									},
							/*		{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/ds/dataSourceDef/remove.htm?name={name}'
									},*/
									{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/ds/dataSourceDef/get.htm?name={name}'
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
			var me = this, form = $(this.consts.FORM), frm = form.form(), nameJson,nameAry;
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
					 nameJson = $("span#nameJson").text().trim();
					 var oldName =$("input#oldName").val();
					 if(nameJson){
						nameAry = JSON2.parse(nameJson);
						var _name = $("input#name").val();
						if(_name != oldName){
							if(nameAry.indexOf(_name)>-1){
								DialogUtil.toastr("名称:"+_name+"已经存在了，请重新输入！");
								return;
							}
						}
					}
					me._dealParam();
					form.submit();
				}else{
					$el.button('reset');
				}
			});
			
			$("#getParam").on('click',function(){
				me._getParam();
			});
			
			//me._initParam();
			
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
							window.location.href = __ctx+'/platform/ds/dataSourceDef/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		
		_initParam:function(){
			var me = this;
			var variables = $("input#variables").val();
			
			if(variables){
				json = JSON2.parse(variables);
				me._renderHml(json);
			}
		},
		
		_renderHml : function(json){
			if(!json)return;
			var data = {list :json};
			var html = template('paramTem', data);
			$("#paramView").html(html);
		},
		
		_getParam:function(){
			var me=this, url;
			/* var classPath = $("#classPath").val();
			if(!classPath){
				DialogUtil.toastr("请填写数据源全路径！");
				return;
			}*/
			url =  __ctx+'/platform/ds/dataSourceDef/getParam.htm';
			url=url.getNewUrl();
			$.post(url,{},function(data){
				if(data){
					var jsonAry=[];
					for(var i=0;i<data.length;i++){
						var json={
								name:data[i].name,
								comment:data[i].comment,
								type:data[i].type,
								isReq:data[i].isReq,
								value:data[i].value
						};
						jsonAry.push(json);
					}
					me._renderHml(jsonAry);
				}
			})
		},
		
		_del:function(conf){
			$(conf).closest("tr").remove();
		},
		
		_dealParam:function(){
			var me=this,param=[];
			
			$("tr#param").each(function(){
				var _me =$(this);
				var name = _me.find("span#name").text().trim();
				var comment = _me.find("input#comment").val();
				var type = _me.find("span#type").text().trim();
				var value = _me.find("input#value").val();
				var isReq = _me.find("select#isReq").find("option:selected").val();
				
				var json={
						name : name,
						comment : comment,
						type : type,
						value : value,
						isReq : isReq
				}
				param.push(JSON2.stringify(json));
			})
			console.info(param.join(","));
			$("#variables").val("["+param.join(",")+"]");
		},
		
		_moveParam : function(obj,isUp){
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
		
		_initReload : function(){
			var url=__ctx+"/platform/ds/dataSourceDef/reload.htm";
			url=url.getNewUrl();
			$.post(url,{},function(responseText){
				var msg = new com.lc.form.ResultMessage(responseText);
				if (msg.isSuccess()) {
					window.location.reload(true);
				} else {
					DialogUtil.error(msg.getMessage());
				}
			})
		}
		
		
	};
})();


