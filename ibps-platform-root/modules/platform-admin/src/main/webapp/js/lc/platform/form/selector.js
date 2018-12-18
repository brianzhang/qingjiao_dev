/**
 * 控件定义管理
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-01-07 17:29:43
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	selector  = new Selector();
	selector.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#selectorGrid",// 列表对象
			PAGER : "#selectorPager",// 列表分页
			FORM : '#selectorForm',// 表单form
			GROUP_FIELD_FORM : '#groupFieldForm',// 组合字段表单form	
			BUTTON_FORM: '#buttonForm'// 按钮表单form	
	};
	/**
	 * 控件定义管理 对象
	 * @returns {Selector}
	 */
	Selector = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Selector.prototype = {
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
			if ($(this.consts.GROUP_FIELD_FORM).length > 0)//组合字段表单
				this._initGroupFieldForm();
			if ($(this.consts.BUTTON_FORM).length > 0)//按钮表单
				this._initButtonForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/form/selector/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','名称','别名','对应方法','系统预定义','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name_'
				                	 					                	 	}, {
				                 	   name:'alias',
				                	   index: 'alias_'
				                	 					                	 	}, {
				                	   name:'method',
				                	   index: 'method_'
				                	 						                    }, {
				                 	   name:'isCustom',
				                	   index: 'is_custom_',
				                	   formatter : 'dataFormat',
									   formatoptions : {
											value : [{
												name:0,
												value:'否'
											},{
												name:1,
												value:'是'
											}]
									    }
				                	 					                	 	}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/form/selector/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/form/selector/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/form/selector/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.setData();
				frm.ajaxForm({
					success : me._showResponse
				});
				if (frm.valid())
					form.submit();
			});
			
			//模版
			this.groupFieldTemplate = $("#groupFieldTemplate").val();
			this.buttonsTemplate = $("#buttonsTemplate").val();
			
			//初始化表单相关数据
			this.initGroupField();
			this.initButtons();
			//相关操作按钮
			this.initBtnOpt();
		},
		initBtnOpt:function(){
			var me=this;
			$(document).on('click', '.delete-tr', function() {
				me.delTr(this);
			});
			//新增组合字段
			$("#addGroupField").click(function() {
				me.addGroupField();
			});
			//编辑组合字段
			$(document).on('click', '.edit-groupField', function() {
					me.editGroupField(this);
			});
			//新增按钮
			$("#addButtons").click(function() {
				me.addButtons();
			});
			//编辑按钮
			$(document).on('click', '.edit-buttons', function() {
				me.editButtons(this);
			});
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
							window.location.href = __ctx+'/platform/form/selector/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		/**
		 * 初始化添加组合字段
		 */
		initGroupField:function(){
			var groupField = $('#groupField').val();
			if($.isEmpty(groupField))
				return;
			var me = this,
				data = $.parseJSON(groupField);
			$(data).each(function(i,n){	
				me.setGroupField(n);
			});
		},
		/**
		 * 设置组合字段数据
		 * @param data
		 * @param trObj
		 */
		setGroupField:function(data,trObj){
			if(trObj){//编辑
	 			$("[name='fieldName']",trObj).val(data.name) ;
	           	$("[name='fieldKey']",trObj).val(data.key) ;
	           	$("[name='fieldScript']",trObj).val(data.script) ;
	   			$('.fieldName-span',trObj).text(data.name);
	   			$('.fieldKey-span',trObj).text(data.key);
	   			$('.fieldScript-span',trObj).text(data.script);
			}else{ //新增
				var tr =  this.groupFieldTemplate
				.replaceAll("#fieldName",data.name)
				.replaceAll("#fieldKey",data.key)
				.replaceAll("#fieldScript",data.script);
				$("#groupFieldItem").append(tr);
			}
		},
		editGroupField:function(el){
			var trObj=$(el).closest('tr'),
				data ={
	        		name : $("[name='fieldName']",trObj).val(),
	        		key :$("[name='fieldKey']",trObj).val() ,
	        		script :$("[name='fieldScript']",trObj).val(),
        	};
        	this.addGroupField(data,trObj);
		},
		addGroupField:function(params,trObj){
			var me = this;
			var url=__ctx +'/platform/form/selector/GroupFieldDialog.htm';
			DialogUtil.dialog({
				title:'组合字段',
				area: ['50%', '55%'],
				params:params,
				content:url,
				btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   var data = DialogUtil.getChildFrameWindow(index).selector.getGroupFieldData();
		               		me.setGroupField(data,trObj);
		               		DialogUtil.close(index);
					   }
				   },  {
					   label:'取消',
					   iconCls : 'btn btn-danger fa fa-cancel',
					   action:function(dialog,index){
							DialogUtil.close(index);
					   }
				   } ]
			});
		},
		getGroupFieldData:function(){
			return {
				name:$('#fieldName').val(),
				key:$('#fieldKey').val(),
				script:$('#fieldScript').val()
			};
		},
		/**
		 * 初始化按钮设置
		 */
		initButtons:function(){
			var buttons = $('#buttons').val();
			if($.isEmpty(buttons))
				return;
			var me = this,
			data = $.parseJSON(buttons);
			$(data).each(function(i,n){	
				me.setButtons(n);
			});
		},
		/**
		 * 设置按钮
		 * @param data
		 * @param trObj
		 */
		setButtons:function(data,trObj){
			if(trObj){//编辑
	   			$("[name='buttonName']",trObj).val(data.name) ;
               	$("[name='buttonIcon']",trObj).val(data.icon) ;
               	$("[name='buttonOnclick']",trObj).val(data.onclick) ;
       			$('.buttonName-span',trObj).text(data.name);
       			$('#iconImg',trObj).removeAttr('class').addClass("fa "+data.icon);
       			$('.buttonOnclick-span',trObj).text(data.onclick);
			}else{ //新增
				var tr =  this.buttonsTemplate
				.replaceAll("#buttonName",data.name)
				.replaceAll("#buttonIcon",data.icon)
				.replaceAll("#buttonOnclick",data.onclick);
				$("#buttonsItem").append(tr);
			}
		},
		editButtons:function (el){
        	var trObj=$(el).closest('tr'),
			data ={
        		name : $("[name='buttonName']",trObj).val(),
        		icon :$("[name='buttonIcon']",trObj).val() ,
        		onclick :$("[name='buttonOnclick']",trObj).val(),
        	};
        	$('#iconImg',trObj).removeAttr('class').addClass("fa "+$("[name='buttonIcon']",trObj).val());
        	this.addButtons(data,trObj);
		},
		getButtonsData:function(){
			return {
				name:$('#buttonName').val(),
				icon:$('#buttonIcon').val(),
				onclick:$('#buttonOnclick').val()
			};
		},
		addButtons :function  (params,trObj){
			var me = this;
			var url=__ctx +'/platform/form/selector/buttonDialog.htm';
			DialogUtil.dialog({
				title:'按钮定义',
				area: ['50%', '55%'],
				params:params,
				content:url,
				btn: [{
					   label:'确定',
					   classes:'fa fa-check-circle',
					   action:function(dialog,index){
						   var data = DialogUtil.getChildFrameWindow().selector.getButtonsData();
						   me.setButtons(data,trObj);
						   DialogUtil.close(index);
					   }
				   },
				   {
					   label:'取消',
					   classes:'fa fa-times-circle',
					   action:function(dialog,index){
							DialogUtil.close(index);
					   }
				   }
	   ]
			});
		},
		delTr:function(obj){
			var tr=$(obj).closest('tr');
			tr.remove();
		},
		/**
		 * 设置当前的数据
		 */
		setData:function(){
			var groupField = [];
			$("#groupFieldItem tr").each(function(){
				var tr = $(this);
				var name = $("[name='fieldName']",tr).val();
				var key = $("[name='fieldKey']",tr).val();
				var script = $("[name='fieldScript']",tr).val();
				var item = {
						name:name,
						key:key,
						script:script
				};
				groupField.push(item);
			});
			
			$('#groupField').val(JSON2.stringify(groupField));
			var buttons = [];
			$("#buttonsItem tr").each(function(){
				var tr = $(this);
				var name = $("[name='buttonName']",tr).val();
				var key = $("[name='buttonIcon']",tr).val();
				var onclick = $("[name='buttonOnclick']",tr).val();
				var item = {
						name:name,
						icon:key,
						onclick:onclick
				};
				buttons.push(item);
			});
			
			$('#buttons').val(JSON2.stringify(buttons));
		},
		/**
		 * 初始化字段组合字段
		 */
		_initGroupFieldForm:function(){
			var params =  frameElement.dialog.params;
			if(params){
				$("#fieldName").val(params.name) ;
	           	$("#fieldKey").val(params.key) ;
	           	$("#fieldScript").val(params.script) ;
			}
		},
		_initButtonForm:function(){
			var params =  frameElement.dialog.params;
			if(params){
				$("#buttonName").val(params.name) ;
	           	$("#buttonIcon").val(params.icon) ;
	           	$("#buttonOnclick").val(params.onclick) ;
				$('#iconImg').addClass(params.icon);
			}
			$("#selectIcon").click(function() {// 选择对话框
				new IconDialog({
					callback : function(data,dialog,index) {
						$('#buttonIcon').val(data);
						$('#iconImg').removeAttr('class').addClass("fa "+data);
						DialogUtil.close(index);
					}
				}).show();
			});
		}
	};
})();


