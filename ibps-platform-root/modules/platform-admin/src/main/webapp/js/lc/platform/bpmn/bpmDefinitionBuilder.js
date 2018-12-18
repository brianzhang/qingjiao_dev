/**
 * 流程设置工具
 * 
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	
  var BuilderView, EditView, BpmDefinitionBuilder, BpmDefinitionBuilderCollection, BpmDefinitionBuilderModel, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
   
  
   // ====================TODO 编辑模版==================
  EditView = (function(_super) {
    __extends(EditView, _super);

    function EditView() {
      _ref3 = EditView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    EditView.prototype.className = "edit-response-node";

    EditView.prototype.events = {
	    'click .js-add-user':'editUser',//添加人员
	    'click .js-edit-user':'editUser',//修改人员
	    'click .js-remove-user':'removeUser',//删除人员
	    
	    'click .js-add-button':'editButton',//添加按钮
	    'click .js-edit-button':'editButton',//编辑按钮
	    'click .js-remove-button':'removeButton',//删除按钮
	    'click .js-clean-button':'cleanButton',//清除按钮
	    'click .js-init-button':'initButton',//初始化按钮
	    
	    'click .js-select-bo':'selectBo',//选择BO
	    'click .js-remove-bo':'removeBo',//删除BO
	    
	    'click .js-checked-form':'checkedForm', //选择表单类型
	    'click .js-select-form':'selectForm',//选择表单
	    'click .js-remove-form':'removeForm',//删除表单
	    'click .js-rights-form':'rightsForm',//设置表单权限
	    'click .js-clean-form':'cleanForm', 
	    'click .js-select-print-template':'selectPrintTemplate', //选择打印模版
	    'click .js-remove-print-template':'removePrintTemplate', //删除打印模版
	    
	    'click .js-checked-voteType':'selectVoteType',//选择投票规则
	    'click .js-privileges':'settingPrivileges',//设置特权
	    
	    'click .js-select-flow':'selectFlow',//选择流程
	    'click .js-setting-callActivity':'settingCallActivity',//选择流程
	    
	    'click .js-common-script':'commonScript',//选择常用脚本
	    'click .js-condition-script':'conditionScript',//选择条件脚本
	    'click .js-sign-result':'setSignResult',//设置会签结果
	    //'click .js-form-var':'formVariate',//选择表单变量
	    
	    'click .js-checked-muliInstance':'checkedMuliInstance',
	   
	    'click .js-add-jumpRule':'editJumpRule',//添加跳转规则
	    'click .js-edit-jumpRule':'editJumpRule',//编辑跳转规则
	    'click .js-clean-jumpRule':'cleanJumpRule',//清空跳转规则
	    'click .js-remove-jumpRule':'removeJumpRule',//删除跳转规则
	    		
	    'click .js-setEndNotify':'setEndNotify',//设置办结抄送
	    'click [data-toggle="tab"]':'selectTab',// 选择tab的bug
	    
	    'click .js-serviceSetting':'setServiceNode',//设置服务节点
	    'click .js-serviceSetting-clean':'cleanServiceNode',//清空服务节点配置
	    
	    'click .js-add-reminder':'editReminder',//添加催办
	    'click .js-edit-reminder':'editReminder',//编辑催办
	    'click .js-clean-reminder':'cleanReminder',//清空催办
	    'click .js-remove-reminder':'removeReminder',//删除催办
	    
	    'click .js-add-trigerFlow':'editTrigerFlow',//添加触发流程
	    'click .js-edit-trigerFlow':'editTrigerFlow',//编辑触发流程
	    'click .js-setting-trigerFlow':'settingTrigerFlow',//设置触发流程
	    'click .js-clean-trigerFlow':'cleanTrigerFlow',//清空触发流程
	    'click .js-remove-trigerFlow':'removeTrigerFlow',//删除触发流程
	    	
	    'click .js-add-variable':'editVariable'//添加流程变量
	    ,'click .js-edit-variable':'editVariable'//编辑流程变量
	    ,'click .js-clean-variable':'cleanVariable'//清空流程变量
	    ,'click .js-remove-variable':'removeVariable'//删除流程变量
	    
	    //,'change .js-select-jumpType':'selectJumpType'//跳转类型选择

    };

    EditView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      this.defId = this.parentView.options.defId;
      this.defKey = this.parentView.options.defKey;
      this.model.bind('change', this.parentView.handleFormUpdate, this.parentView);
      return this.listenTo(this.model, "destroy", this.remove);
    };

    /**
	 * 渲染编辑字段
	 * 
	 * @returns {EditView}
	 */
    EditView.prototype.render = function() {
    	
        this.$el.html(BpmDefinitionBuilder.templates["edit/base"]({
            rf: this.model
        }));
        rivets.bind(this.$el, {
          model: this.model
        });
      return this;
	};
	
	EditView.prototype.forceRender = function() {
      return this.model.trigger('change');
    };
    
    //删除操作
    EditView.prototype.removeOperate = function($el,item,key){
    	var opts,index;
		index = this.$el.find(item).index($el.closest(item));
    	opts = this.model.get(key);
    	opts.splice(index, 1);
        this.model.set(key, opts);
        this.forceRender();

    	return  this.redoRender();
    };
    
    /**
     * 修复渲染bug
     */
    EditView.prototype.redoRender = function($el,item,key){
	   if( this.model.get("node_type") == BpmDefinitionBuilder.options.NODE_TYPE.RECEIVE_TASK){
		   this.parentView.destroyEditor() 
		   this.render();
		   this.parentView.initEditor(this.$el,this.model);
	   }else{
		   this.render();
	   }
    }
    /**
     * 添加或编辑用户
     */
    EditView.prototype.editUser = function(e) {
    	e.preventDefault(); e.stopPropagation();
    	var _this = this,
    		model = this.model,
    		nodeType=this.model.get("node_type"),
    		$el = $(e.currentTarget),
    		key ="users", 
     		item ='.users',
    		users = this.model.get(key) || [],
    		idx = -1,
    		params = {};
		
        if($el.hasClass("js-edit-user")){//如果是编辑用户
        	idx = this.$el.find(item).index($el.closest(item));
        	if(idx < 0) return;      
        	params= users[idx];
        }
        params.defId = this.defId;
        params.nodeId = model.get("id");
        params.formVars = this.parentView.getFormVars(model);
		DialogUtil.dialog({
			   content: __ctx+'/platform/bpmn/bpmNodeDef/conditionEdit.htm?nodeType='+nodeType,
			   params:params,
			   title:"节点人员条件",
			   area: ['60%', '85%'],
			   btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   var  data = DialogUtil.getChildFrameWindow(index).getData();
					   if(data){
						   if(idx >-1){
							   users.splice(idx, 1,data);
						   }else{
							   users.push(data);
						   }
						   model.set(key,users);
						   _this.forceRender();
			
						   _this.redoRender();
					
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
			   } ]
		});
    };
    
    /**
     * 删除用户
     */
    EditView.prototype.removeUser = function(e){
    	this.removeOperate($(e.currentTarget),'.users','users');
    }
	
    /**
     * 选择业务对象
     */
    EditView.prototype.selectBo = function() {
    	var _this =this, model = this.model,
    		bo = "";
    	new BoDefDialog({
			params:bo,
			callback : function(data,index) {
				DialogUtil.close(index);
				//TODO 原来的bo和现在bo不一致，表单设置为空
				if(data.length ==0){
					model.set("bo.name",null);
					model.set("bo.code",null);
					model.set("bo.version",null);
					return ;
				}else{
					model.set("bo.name",data[0].name);
					model.set("bo.code",data[0].code);
					model.set("bo.version",data[0].version);
					_this.parentView.setBoList(data[0].code);
				}
				_this.forceRender();
			}
		}).show();
    };
    
    /**
     * 删除bo
     */
    EditView.prototype.removeBo =function(e) { 
		e.preventDefault(); e.stopPropagation();
    	this.model.set("bo.name",null);
    	this.model.set("bo.code",null);
    	this.model.set("bo.version",null);
		this.forceRender();
    };
    

    /**
     *判断是否全局，不是全局则返回全局的值
     * @returns
     */
    EditView.prototype.isGlobal =function() {
    	if(this.model.get("node_type")){
    		return this.parentView.response_global;
    	}else{
    		return null
    	}
    }
    
    EditView.prototype.cleanForm =function(e){
     	var $el = $(e.currentTarget),
 		 $elForm = $el.closest("[data-type]"),
 		 key =$elForm.attr("data-type");
     		this.model.set(key+".type",null);
			this.model.set(key+".name",null);
			this.model.set(key+".formValue",null);
			this.model.set(key+".editUrl",null);
			this.forceRender();	
    }
    /**
     * 选择表单类型
     */
    EditView.prototype.checkedForm = function(e) {
    	var $el = $(e.currentTarget),
    		 $elForm = $el.closest("[data-type]"),
    		key =$elForm.attr("data-type"),
    		formType =$el.val(),
    		innerForm = $("#inner"+key	,this.$el),
    		urlLoadForm = $("#urlLoad"+key	,this.$el),
    		frameForm = $("#frame"+key	,this.$el);
    		
    	if(formType == 'inner'){
    		innerForm.removeClass("hidden");
    		urlLoadForm.addClass("hidden");
    		frameForm.addClass("hidden");
    	}else if(formType == 'urlLoad'){
       		innerForm.addClass("hidden");
    		urlLoadForm.removeClass("hidden");
    		frameForm.addClass("hidden");
    	} else if(formType == 'frame'){
       		innerForm.addClass("hidden");
    		urlLoadForm.removeClass("hidden");
    		frameForm.removeClass("hidden");
    	}
		this.model.set(key+".name",null);
		this.model.set(key+".formValue",null);
		this.model.set(key+".editUrl",null);
    	
		if(key =='form' && $.isEmpty(this.isGlobal())){//如果是全局表单级联
			$(".js-checked-form[data-rv-checked='model.instForm.type'][value='"+formType+"']").trigger("click");
		}
    };
    
    /**
     * 选择表单
     */
    EditView.prototype.selectForm = function(e) {
    	var _this =this, model = this.model,boCode,t,form,d;
    	if(t = this.isGlobal()){    	//如果是节点则设置父类的
    		boCode = t.get("bo.code");
    	}else{
    		boCode = model.get("bo.code");
    	}
    	
    	if(!boCode){
    		DialogUtil.msg( '请先选择业务对象');
    		return;
    	}
		form  =model.get("form");
    	if($.isNotEmpty(form) && $.isNotEmpty(form.formValue) && $.isNotEmpty(form.name)){
        		d =[{
    				key:form.formValue,
    				name:form.name
    			}];
    	}
    	
    	var $el = $(e.currentTarget),
    		$elForm = $el.closest("[data-type]"),
			key =$elForm.attr("data-type");
    	new FormDefDialog({
    			gridUrl:__ctx + '/platform/bpmn/bpmDefine/getFormJsonByBo.htm?boCode='+boCode,
    			pkKey:'key',
    			params:{
    				data:d
    			},
    			callback:function(data,index){
    				var formKey = null,
						formName =null;
    				if(data.length >0){
    					formKey =  data[0].key,
    					formName = data[0].name;
    				}
					model.set(key+".name",formName);
					model.set(key+".formValue",formKey);
					if(key =='form'  && $.isEmpty(t)){//如果是全局表单级联
						model.set("instForm.name",formName);
						model.set("instForm.formValue",formKey);
					}
					_this.forceRender();	
    				DialogUtil.close(index);
    			}}).show();
    	
    };
    
    /**
     * 删除表单
     */
    EditView.prototype.removeForm =function(e) { 
		e.preventDefault(); e.stopPropagation();
		var $el = $(e.currentTarget);
	     	$elForm = $el.closest("[data-type]"),
			key = $elForm.attr("data-type");
    	this.model.set(key+".name",null);
    	this.model.set(key+".formValue",null);
		this.forceRender();
    };
    
    /**
     * 选择打印模版
     */
    EditView.prototype.selectPrintTemplate = function(e) {
    	var _this =this, model = this.model,form,formKey;
    	
		form  =model.get("form");
    	if($.isEmpty(form)  || $.isEmpty(form.formValue) || $.isEmpty(form.name)){
    		DialogUtil.msg( '请先选择表单');
    		return;
    	}else{
    		formKey = form.formValue;
    	}
    	
    	var $el = $(e.currentTarget),
    		$elForm = $el.closest("[data-type]"),
			key =$elForm.attr("data-type");
    	new FormPrintTemplateDialog({
			isSingle:true,
			formKey:formKey,
			callback : function(data,index) {
				var id="",name="";
				if($.isNotEmpty(data)){
					var d =data[0];
					id= d.id;
					name =d.name;
				}
				model.set(key+".templateId",id);
				model.set(key+".templateName",name);
				DialogUtil.close(index);	
			}
		}).show();
    };
    
    /**
     * 删除打印模版
     */
    EditView.prototype.removePrintTemplate =function(e) { 
		e.preventDefault(); e.stopPropagation();
		var $el = $(e.currentTarget);
	     	$elForm = $el.closest("[data-type]"),
			key = $elForm.attr("data-type");
    	this.model.set(key+".templateId",null);
    	this.model.set(key+".templateName",null);
		this.forceRender();
    };
    /**
     * 表单权限
     */
    EditView.prototype.rightsForm =function(e) { 
    	e.preventDefault(); e.stopPropagation();
		var $el = $(e.currentTarget),
	     	$elForm = $el.closest("[data-type]"),
			key = $elForm.attr("data-type"),
			formKey =   this.model.get(key+".formValue"),
			nodeId =null;
    	if($.isNotEmpty(this.isGlobal())){//如果是全局的表单
    		nodeId = this.model.get("id");
    	}
    	var isInst= key=='form'?false:true,
    		flowKey = this.defKey,
    		 rightsScope = 'flow';
    	
    	
		if(isInst) rightsScope = 'inst';
		else if(nodeId) rightsScope = 'node';
		else if (flowKey) rightsScope = 'flow';
		else rightsScope = 'form';
    	
    	new FormRightsDialog({
			formKey:formKey,
			flowKey:flowKey,
			nodeId:nodeId,
			parentFlowKey:this.parentFlowKey,
			isInst:isInst,
			rightsScope:rightsScope
		}).show();
    };

    /**
     * 添加/编辑操作按钮
     */
    EditView.prototype.editButton = function(e) { 
		e.preventDefault(); e.stopPropagation();
	 	var _this = this,
				model = this.model,
				nodeType=this.model.get("node_type"),
				$el = $(e.currentTarget),
				key ="buttons", 
		 		item ='.buttons',
				buttons = this.model.get(key) || [],
				idx = -1,
				data = {};
			
		   if($el.hasClass("js-edit-button")){//如果是编辑按钮
			  idx = this.$el.find(item).index($el.closest(item));
		      if(idx < 0) return;      
		      data= buttons[idx];
		   }  
		
		
		DialogUtil.dialog({
			title:'节点按钮',
			params:{
				data:data
			},
			area: ['70%', '90%'],
			content:__ctx+'/platform/bpmn/bpmDefine/editButton.htm?nodeType='+nodeType,
		    btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   var  data = DialogUtil.getChildFrameWindow(index).getData();
					   if(data){
						   if(idx >-1){
							   buttons.splice(idx, 1, data);
						   }else{
							   buttons.push(data);
						   }
						   model.set(key,buttons);
						   _this.forceRender();
						   _this.render();	
						   
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
			   } ]
		});
    	
    };
    /**
     * 初始化按钮
     */
    EditView.prototype.initButton = function(e){ 
       	e.preventDefault(); e.stopPropagation();
		var _this = this,
			nodeType = this.model.get("node_type");
	    $.get(  __ctx+ '/platform/bpmn/bpmDefine/initButton.htm?nodeType='+nodeType,function(data){
	    		_this.model.set("buttons",data);
			   _this.forceRender();
			   _this.render();	
	    });	
    };
    
    /**
     * 清空按钮
     */
    EditView.prototype.cleanButton = function(e){
       	e.preventDefault(); e.stopPropagation();
       	var _this = this;
    	DialogUtil.confirm( '是否清空按钮？', function(rtn) {
    		if(!rtn)
    			return;
    		_this.model.set("buttons",[]);
    		_this.forceRender();
    		_this.render();	
    	});

    };
    
    EditView.prototype.removeButton = function(e){
    	this.removeOperate($(e.currentTarget),'.buttons','buttons');
    };
    
    EditView.prototype.selectVoteType = function(e) {
    	var $el = $(e.currentTarget),voteType =$el.val();
	   if(voteType == 'percent'){
		   $("#votePer").removeClass("hidden");
	   }else{
		   $("#votePer").addClass("hidden");
	   }
    };
    /**
     * 办结（或办理）抄送设置
     */
    EditView.prototype.setEndNotify = function(e) {
		var url=__ctx+'/platform/bpmn/bpmDefine/endNotify.htm',
			_this =this,
			$el = $(e.currentTarget),
			title= $.isEmpty(this.isGlobal())?"办结抄送设置":"办理抄送设置",
			params = {},
			procNotify  =  this.model.get("procNotify")||null;
		
		params.defId = this.defId;
        params.nodeId = this.model.get("id");
        params.formVars = this.parentView.getFormVars(this.model);
        params.procNotify = procNotify;
			
		DialogUtil.dialog({
			params:params,
			title:title,
			content:url,
			btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   var  data = DialogUtil.getChildFrameWindow(index).getData();
					   if(data){
						   _this.model.set("procNotify",data);
						   _this.forceRender();
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
			   } ]
		});
    };
    
    /**
     * 清空催办
     */
    EditView.prototype.cleanReminder = function(e){
       	e.preventDefault(); e.stopPropagation();
       	var _this = this;
    	DialogUtil.confirm( '是否清空？', function(rtn) {
    		if(!rtn)
    			return;
    		_this.model.set("reminders",[]);
    		_this.forceRender();
    		_this.render();	
    	});
    };
    
    /**
     * 催办设置编辑
     */
    EditView.prototype.editReminder = function(e) {
       	e.preventDefault(); e.stopPropagation();
    	var url=__ctx+'/platform/bpmn/bpmTaskReminder/edit.htm?procDefId='+this.defId+'&nodeId='+this.model.get("id"),
			_this =this,
			reminders  =  this.model.get("reminders")||[],
			$el = $(e.currentTarget),
	 		item ='.reminders',
			idx = -1,
			data = {};
    	
		if($el.hasClass("js-edit-reminder")){//如果是编辑
			idx = this.$el.find(item).index($el.closest(item));
		    if(idx < 0) return;
		    data= reminders[idx];
	    }
		
		DialogUtil.dialog({
			params:{data:data,formVars:this.parentView.getFormVars(this.model)},
			title:'催办设置',
			content:url,
			btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   data = DialogUtil.getChildFrameWindow(index).bpmTaskReminder.getData();
					   if(data){
						   if(idx >-1){
							   reminders.splice(idx, 1, data);
						   }else{
							   reminders.push(data);
						   }
						   _this.model.set("reminders", reminders);
						   _this.forceRender();
						   _this.render();
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
			   }]
		});
    };
    
    /**
     * 删除催办
     */
    EditView.prototype.removeReminder = function(e){
    	this.removeOperate($(e.currentTarget),'.reminders','reminders');
    };
    
    /**
     * 清空触发流程
     */
    EditView.prototype.cleanTrigerFlow = function(e){
       	e.preventDefault(); e.stopPropagation();
       	var _this = this;
    	DialogUtil.confirm( '是否清空？', function(rtn) {
    		if(!rtn)
    			return;
    		_this.model.set("trigerFlows",[]);
    		_this.forceRender();
    		_this.render();	
    	});
    };
    
    /**
     * 触发流程编辑
     */
    EditView.prototype.editTrigerFlow = function(e) {
       	e.preventDefault(); e.stopPropagation();
    	var url=__ctx+'/platform/bpmn/bpmTrigerFlow/edit.htm?procDefId='+this.defId+'&nodeId='+this.model.get("id"),
			_this =this,
			trigerFlows  =  this.model.get("trigerFlows")||[],
			$el = $(e.currentTarget),
	 		item ='.trigerFlows',
			idx = -1,
			data = {};
    	
		if($el.hasClass("js-edit-trigerFlow")){//如果是编辑
			idx = this.$el.find(item).index($el.closest(item));
		    if(idx < 0) return;
		    data= trigerFlows[idx];
	    }
		
		DialogUtil.dialog({
			params:{data:data,formVars:this.parentView.getFormVars(this.model)},
			title:'触发流程设置',
			area: ['100%', '100%'],
			content:url,
			btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   data = DialogUtil.getChildFrameWindow(index).bpmTrigerFlow.getData();
					   if(data){
						   if(idx >-1){
							   trigerFlows.splice(idx, 1, data);
						   }else{
							   trigerFlows.push(data);
						   }
						   _this.model.set("trigerFlows", trigerFlows);
						   _this.forceRender();
						   _this.render();
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
			   }]
		});
    };
    
    /**
     * 设置触发流程
     */
    EditView.prototype.settingTrigerFlow = function(e) {
       	e.preventDefault(); e.stopPropagation();
    	var _this =this,
			trigerFlows  =  this.model.get("trigerFlows")||[],
			$el = $(e.currentTarget),
	 		item ='.trigerFlows',
			idx = -1,
			data = {};
    	
    	idx = this.$el.find(item).index($el.closest(item));
	    if(idx < 0) return;
	    data= trigerFlows[idx];
    	
    	var flowKey = data.trigerFlowKey;
    	if($.isEmpty(flowKey)){
    		DialogUtil.msg( '请先选择流程！');
    		return;
    	}
    		
		DialogUtil.dialog({
			maxmin:false,
			title:false,
			content:__ctx+'/platform/bpmn/bpmDefine/setting.htm?defKey='+flowKey,
		    area: ['100%', '100%']
		});
    };
    
    /**
     * 删除触发流程
     */
    EditView.prototype.removeTrigerFlow = function(e){
    	this.removeOperate($(e.currentTarget),'.trigerFlows','trigerFlows');
    };
    
    /**
     * 设置会签特权
     */
    EditView.prototype.settingPrivileges = function() {
    	var _this = this;
    	var params =  $.isNotEmpty(this.model.get("privileges") )?this.model.get("privileges") : {};
    	params.defId = this.defId;
    	params.nodeId = this.model.get("id");
		DialogUtil.dialog({
			title:'会签特权设置',
			content:__ctx+'/platform/bpmn/bpmNodeDef/settingPrivileges.htm',
			params:params,
			btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   var data = DialogUtil.getChildFrameWindow(index).getData();
					   if(data){
						   _this.model.set("privileges",data);
						   _this.forceRender();
						   _this.render();
						   DialogUtil.close(index);
					   }
				   }
			   },
			   {
				   label:'取消',
				   iconCls : 'btn btn-danger fa fa-cancel',
				   action:function(dialog,index){
					   var ps = _this.model.get("privileges");
					   DialogUtil.close(index);
				   }
			   } ]
		});
    };
    
    EditView.prototype.selectFlow = function(){
    	var _this =this;
  		new BpmDefinitionDialog({
			params:{},
			isSingle:true,
			callback : function(data,index) {
				_this.model.set("callActivity.flowKey",data[0].defKey);
				_this.model.set("callActivity.flowName",data[0].name);
			   _this.forceRender();
			   _this.render();	
				DialogUtil.close(index);
			}
		}).show();
    };
    
    EditView.prototype.settingCallActivity  = function(){
    	var flowKey = this.model.get("callActivity.flowKey");
    	if($.isEmpty(flowKey)){
    		DialogUtil.msg( '请先选择子流程定义！');
    		return;
    	}
    	var me = this;
		DialogUtil.dialog({
			maxmin:false,
			title:false,
			params:{
			   preDefId:me.defId,
			   curDefKey:flowKey
			},
			content:__ctx+'/platform/bpmn/bpmDefine/setting.htm?defKey='+flowKey,
		    area: ['100%', '100%'],
		    callback:function(rtn){
		    	
		    }
		});
    };
    
    /**
     * 常用脚本
     */
    EditView.prototype.commonScript = function(e) {
    	var $el = $(e.currentTarget),
    		name= $el.parent().data("name"),
			codemirror = this.parentView.$codemirror[name];
    	if(!codemirror)
    		return;
    	new ScriptSelDialog({
			callback:function(data){
				codemirror.setValue(data);
			}
		}).show();
    }
    
    /**
     * 条件脚本
     */
    EditView.prototype.conditionScript = function(e) {
    	var $el = $(e.currentTarget),
			name= $el.parent().data("name"),
			codemirror = this.parentView.$codemirror[name];
    	if(!codemirror)
    		return;
    	
    	var url = __ctx+'/platform/script/conditionScript/setting.htm';
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
				  codemirror.setValue(data);
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
    }
    
    /**
     * 设置会签结果
     */
    EditView.prototype.setSignResult = function(e) {
    	var $el = $(e.currentTarget),
    	result = $el.data("result"),
		name= $el.parent().parent().data("name"),
		codemirror = this.parentView.$codemirror[name];
	if(!codemirror)
		return;
		codemirror.setValue(result);
    }
    
    /**
     * 添加/编辑跳转规则
     */
    EditView.prototype.editJumpRule = function(e) { 
		e.preventDefault(); e.stopPropagation();
		
	 	var _this = this,
				model = this.model,
				id=this.model.get("id"),
				$el = $(e.currentTarget),
				key ="jumpRules", 
		 		item ='.jumpRules',
		 		jumpRules = this.model.get(key) || [],
				idx = -1,
				data = {};
			
		   if($el.hasClass("js-edit-jumpRule")){//如果是编辑规则
			  idx = this.$el.find(item).index($el.closest(item));
		      if(idx < 0) return;      
		      data= jumpRules[idx];
		   }  
		   
		DialogUtil.dialog({
			title:'跳转规则',
			params:{
				data:data,
				nodes:this.getNodesWithoutStart(id),//获得任务节点
				formVars:this.parentView.getFormVars(this.model)//获得表单变量
			},
			area: ['70%', '80%'],
			content:__ctx+'/platform/bpmn/bpmNodeDef/ruleEdit.htm',
		    btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   var  data = DialogUtil.getChildFrameWindow(index).getData();
					   if(data){
						   if(idx >-1){
							   jumpRules.splice(idx, 1, data);
						   }else{
							   jumpRules.push(data);
						   }
						   model.set(key,jumpRules);
						   _this.forceRender();
						   _this.render();	
						   
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
			   } ]
		});
    	
    };
    
    /**
     * 清空跳转规则
     */
    EditView.prototype.cleanJumpRule = function(e){
       	e.preventDefault(); e.stopPropagation();
       	var _this = this;
    	DialogUtil.confirm( '是否清空规则？', function(rtn) {
    		if(!rtn)
    			return;
    		_this.model.set("jumpRules",[]);
    		_this.forceRender();
    		_this.render();	
    	});

    };
    
    /**
     * 删除跳转规则
     */
    EditView.prototype.removeJumpRule  = function(e){
    	this.removeOperate($(e.currentTarget),'.jumpRules','jumpRules');
    };
    
    EditView.prototype.getNodesWithoutStart= function (id){
  	   var nodes = [];
 		   _.each( this.parentView.response_nodes.models,function(node){
 			   if(node.get("id") !=id && (node.get("node_type") == 'userTask' || node.get("node_type") == 'signTask' || node.get("node_type") == 'end')  )
 			   nodes.push({
 				   id:node.get("id") ,
 				   name:$.isEmpty(node.get("node_name"))?node.get("id"):node.get("node_name") 
 			   })
 		});
 		   
 		return nodes;
     }
    
    EditView.prototype.getTaskNode= function (id){
 	   var nodes = [];
		   _.each( this.parentView.response_nodes.models,function(node){
			   if(node.get("id") !=id && (node.get("node_type") == 'userTask' || node.get("node_type") == 'signTask')  )
			   nodes.push({
				   id:node.get("id") ,
				   name:$.isEmpty(node.get("node_name"))?node.get("id"):node.get("node_name") 
			   })
		});
		   
		return nodes;
    }
    
    /**
     * 添加/编辑流程变量
     */
    EditView.prototype.editVariable = function(e) { 
		e.preventDefault(); e.stopPropagation();
	 	var _this = this,
				model = this.model,
				id=this.model.get("id"),
				$el = $(e.currentTarget),
				key ="variables", 
		 		item ='.variables',
		 		variables = this.model.get(key) || [],
				idx = -1,
				data = {};
			
		   if($el.hasClass("js-edit-variable")){//如果是编辑规则
			  idx = this.$el.find(item).index($el.closest(item));
		      if(idx < 0) return;      
		      data= variables[idx];
		   }  
		   
		DialogUtil.dialog({
			title:'流程变量',
			params:{
				data:data,
				nodes:this.getTaskNode()
			},
			area: ['70%', '80%'],
			content:__ctx+'/platform/bpmn/bpmDefine/editVariable.htm',
		    btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   var  data = DialogUtil.getChildFrameWindow(index).getData();
					   if(data){
						   if(idx >-1){//编辑
							   variables.splice(idx, 1, data);
						   }else{
							   variables.push(data);
						   }
						   model.set(key,variables);
						   _this.forceRender();
						   _this.render();	
						 
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
			   } ]
		});
    };
    
    /**
     * 清空流程变量
     */
    EditView.prototype.cleanVariable = function(e){
       	e.preventDefault(); e.stopPropagation();
       	var _this = this;
    	DialogUtil.confirm( '是否清空流程变量？', function(rtn) {
    		if(!rtn)
    			return;
    		_this.model.set("variables",[]);
    		_this.forceRender();
    		_this.render();	
    	});
    };
    
    /**
     * 删除流程变量
     */
    EditView.prototype.removeVariable  = function(e){
    	this.removeOperate($(e.currentTarget),'.variables','variables');
    };
    
    /**
     * 选择跳转类型
     */
    //TODO 暂时不用
    EditView.prototype.selectJumpType  = function(e){
    	//e.preventDefault(); e.stopPropagation();
	 	var _this = this,
			model = this.model,
			jumpType = this.model.get("attributes.jumpType")||"common";
	 	if(undefined != jumpType && null != jumpType){
	 		var jumpTypeArr = jumpType.split(",");
	 		var pathRadios = $('input[data-rv-checkedboolen="model.attributes.hidePath"]',this.$el);
	 		var disabled = false;
	 		for(var i = 0,len = jumpTypeArr.length; i < len; i ++){
	 			if("select" == jumpTypeArr[i] || "free" == jumpTypeArr[i]){
	 				disabled = true;
	 				break;
	 			}
	 		}
	 		
	 		if(disabled){
	 			$(pathRadios[0]).attr("checked",true);
 				pathRadios.attr("disabled",true);
	 		}else{
	 			pathRadios.removeAttr("disabled");
	 		}
	 	}
    };
    
    /**
     * 选择tab
     */
    EditView.prototype.selectTab = function(e) {
    	var codemirror = this.parentView.$codemirror,
    		$el = $(e.currentTarget),name =$el.data("name");
    	if(!$.isEmpty(codemirror) && !$.isEmpty(codemirror[name])){
    		setTimeout(function(){
    			codemirror[name].refresh();
    		},1000);
    	}
    };
    
    EditView.prototype.setServiceNode = function(e) {
    	var _this =this;
    	var pluginType = $(e.currentTarget).attr("type");
		var url=__ctx+'/platform/bpmn/bpmNodeDef/autoTaskPluginGet.htm?'
			+'defId='+this.defId
			+'&nodeId='+this.model.get("id")
			+'&pluginType='+pluginType;
		DialogUtil.dialog({
			title:pluginType+'设置',
			content:url,
			btn: [{
				   label:'确定',
				   iconCls : 'btn btn-primary fa fa-ok',
				   action:function(dialog,index){
					   var  data = DialogUtil.getChildFrameWindow(index).getData();
					   if(data){
						   _this.model.set("serviceJson",data);
						   _this.forceRender();
						   _this.render();
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
		});
	};
	
	EditView.prototype.checkedMuliInstance =function(e){
		var $el = $(e.currentTarget),
			supportMuliInstance = $el.val();
		if(supportMuliInstance == 'true'){
			$("#isParallel").removeClass("hidden");
		}else{
			$("#isParallel").addClass("hidden");
		}
		
	};
	
	EditView.prototype.cleanServiceNode = function(e) {
		var _this =this;
		_this.model.set("serviceJson",{});
		_this.forceRender();
		_this.render();
	};
    
    return EditView;

  })(Backbone.View);
  
    
  // ====================TODO 编辑视图==================
  BuilderView = (function(_super) {
    __extends(BuilderView, _super);

    function BuilderView() {
      _ref4 = BuilderView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    BuilderView.prototype.SUBVIEWS = [];

    BuilderView.prototype.events = {
      'click .js-save-setting': 'saveData',// 保存数据
      'click #bpmImage':'selectBpmImage',
      'click .js-setting-header':'clickHeader'
    };

    
    BuilderView.prototype.initialize = function(options) {
      var selector,d = {} ;
      		selector = options.selector;
      this.bpmDefinitionBuilder= options.bpmDefinitionBuilder;
      this.options = options;
      
      if (selector != null) 
        this.setElement($(selector));
      
      // 初始化流程定义
      this.initBpmDefinition();
      //默认是展开的
      this.isCollapse = false;
      return this.bindSaveEvent();
    };
    
    
    BuilderView.prototype.initBpmDefinition = function(){
    	   this.render();
    	   this.renderGlobal();
    	   this.initOperation();
    };
    BuilderView.prototype.initOperation = function(e){
	      $(document).on("mouseenter", ".select-list", function() {
	          return $(this).find(".select-actions").show();
	      } );
	      $(document).on("mouseleave", ".select-list", function() {
	          return $(this).find(".select-actions").hide();
	      });
    };
    
    BuilderView.prototype.selectBpmImage = function(e){
		var target = $(e.target), self =$(e.currentTarget);
		self.find(".editing-flownode").remove();
		self.find(".editing").removeClass("editing");
	      //默认是展开的
	      this.isCollapse = false;
	      
		if(target.hasClass("flowNode")){
    		var data = target.data(),
    			nodeId = data.nodeId,
    			nodeType = data.nodeType,
	    		left = parseFloat(target.attr("layout-left")),
	    		top = parseFloat(target.attr("layout-top")),
	    		width = parseFloat(target.attr("layout-width")),
	    		height = parseFloat(target.attr("layout-height"));
    		if(nodeType == BpmDefinitionBuilder.options.NODE_TYPE.PARALLEL_GATEWAY){
    			this.renderGlobal();
    			return;
    		}
    		var model =  this.response_nodes.get(nodeId);
    		if(model){
    			//渲染节点的
        		this.renderNode(model);
    		}else{
    			DialogUtil.msg("未支持的节点！");
    		}
    		
    		target.addClass("editing").css({
    			"left":left-5,
    			'top':top-5,
    			'width':width+10,
    			'height':height+10
    		});
    		
    		target.append('<span class="badge badge-danger editing-flownode" style="margin-top: '+top+';margin-left: '+left+';">正在配置</span>');

		}else{
			//全局
			this.renderGlobal();
		}
		//滚动到顶部
		//$(".niceScroll").getNiceScroll(0).doScrollTop(0, 0);
    };
    
    
    BuilderView.prototype.render = function(){
        this.$bpmSettingTitle = this.$el.find('#bpmSettingTitle');
        this.$bpmSetting = this.$el.find('#bpmSetting');
        this.response_nodes =  new Backbone.Collection;
        //全局
		this.response_global   =  new Backbone.DeepModel(this.options.data.global); 
		//初始化bo列表
		 this.setBoList(this.response_global.get("bo.code"));
		
		//节点
		var  _ref,model,rf,_i,_len;
		
		_ref = this.options.data.nodes;
	      for ( _i = 0, _len = _ref.length; _i < _len; _i++) {
		        rf = _ref[_i]; 
		        model  =  new Backbone.DeepModel(rf); 
		        this.response_nodes.add(model);
	      }
    };
    
    BuilderView.prototype.setBoList = function(code){
    	$("#boDefJson").val("");
    	if(!code)
    		return;
		var url = __ctx+"/platform/bo/boDef/getBoTree.htm";
		$.post(url,{code:code},function(result){
			$("#boDefJson").val(JSON.stringify(result));
    	});
    	
    		
    };
    
    
    //设置标题
    BuilderView.prototype.setTitle = function(text){
    	this.$bpmSettingTitle.text(text);
    };
    
    BuilderView.prototype.renderGlobal = function(){
    	this.setTitle("全局设置");
    	var editView = new EditView({
            model: this.response_global,
            parentView: this
          });
    	var nodeView = this.$bpmSetting.find(".edit-response-node");
    	if(nodeView.length >0){
    	 	this.destroyEditor();
    	 	 this.$bpmSetting.empty().append(editView.render().el);
    	}else{
    		nodeView  =this.$bpmSetting.append(editView.render().el);
    	}
    	//渲染编辑器
    	this.initEditor(this.$bpmSetting,this.response_global);
     	this.initQtip();
     	this.initVarTreeForUeditor(this.response_global);
    };
    
    /**
     * 渲染节点
     */
    BuilderView.prototype.renderNode = function(model){
    	var text = BpmDefinitionBuilder.lang.node_type[model.get("node_type")] +"设置" +($.isEmpty(model.get("node_name"))?"":("--【"+model.get("node_name")+"】"));
    	this.setTitle(text);
    
	 	var editView = new EditView({
	         model: model,
	         parentView: this
	       });
	 	
	 	this.destroyEditor();
	 	this.$bpmSetting.empty().append(editView.render().el);
	 	this.initCodemirror(model);
	 	
    	this.initEditor( this.$bpmSetting,model);
    	
    	this.initVarTree(model);
    	this.initQtip();

    };
    BuilderView.prototype.getFormVars = function(model){
    	var formVars  =[];
    	//=======业务对象
    	var boDefJson = $("#boDefJson").val();
    	if(!$.isEmpty(boDefJson))
    	$.merge(formVars,JSON.parse(boDefJson));
    	
    	//==流程变量
       	var flowRootId = $.uniqueId();
    	var flowRoot = {
        		id:flowRootId,
        		parentId:"0",
        		name:"流程变量"
        };
    	var variables =  this.response_global.get("variables");
    	
    	var vars =[];
    	
    	if($.isNotEmpty(model)){
    		var nodeId = model.get("id");
    		vars  =_.filter(variables,function(v){
    			if($.isEmpty(v.nodeId) ||  (v.nodeId==nodeId))
    				return v;
    		});
    	}else{
    		vars  =_.filter(variables,function(v){
    			if($.isEmpty(v.nodeId) ||  (v.nodeId==nodeId))
    				return v;
    		});
    	}
    	_.each(vars,function(v){
    		formVars.push({
        		id: $.uniqueId(),
        		parentId:flowRootId,
        		attrType:'var',
        		name:v.name,
        		key:v.key
    		});
		});
    	
/*    	if(model.get(id)){
    		
    	}*/
    	
    	formVars.push(flowRoot);
    	
    	//=========流程常量
    	var bpmConstantId = $.uniqueId();
    	formVars .push({
	    		id:bpmConstantId,
	    		parentId:"0",
	    		name:"流程常量"
	    });
    	formVars .push({
    		id:$.uniqueId(),
    		parentId:bpmConstantId,
    		name:"流程实例ID",
    		key:'instanceId_',
    		attrType:'bpmConstants',
    		type:'string'
    	});
    	formVars .push({
    		id:$.uniqueId(),
    		parentId:bpmConstantId,
    		name:"流程定义Key",
    		key:'flowKey_',
    		attrType:'bpmConstants',
    		type:'string'
    	});
    	
    	formVars .push({
    		id:$.uniqueId(),
    		parentId:bpmConstantId,
    		name:"发起人",
    		key:'startUser',
    		attrType:'bpmConstants',
    		type:'string'
    			
    	});
    	
    	return formVars;
    };
    /**
     * 获取表单变量（用于设置标题）
     */
    BuilderView.prototype.getFormVarsForUeditor = function(model){
    	var formVars  =[];
    	//=======业务对象
    	var boDefJson = $("#boDefJson").val();
    	if(!$.isEmpty(boDefJson))
    		$.merge(formVars,JSON.parse(boDefJson));
    	
    	//==流程变量
    	var flowRootId = $.uniqueId();
    	var flowRoot = {
    			id:flowRootId,
    			parentId:"0",
    			name:"流程变量"
    	};
    	var variables =  this.response_global.get("variables");
    	
    	var vars =[];
    	
    	if($.isNotEmpty(model)){
    		var nodeId = model.get("id");
    		vars  =_.filter(variables,function(v){
    			if($.isEmpty(v.nodeId) ||  (v.nodeId==nodeId))
    				return v;
    		});
    	}else{
    		vars  =_.filter(variables,function(v){
    			if($.isEmpty(v.nodeId) ||  (v.nodeId==nodeId))
    				return v;
    		});
    	}
    	_.each(vars,function(v){
    		formVars.push({
    			id: $.uniqueId(),
    			parentId:flowRootId,
    			attrType:'var',
    			name:v.name,
    			key:v.key
    		});
    	});
    	
    	/*    	if(model.get(id)){
    		
    	}*/
    	
    	formVars.push(flowRoot);
    	
    	//=========流程常量
    	var bpmConstantId = $.uniqueId();
    	formVars .push({
    		id:bpmConstantId,
    		parentId:"0",
    		name:"流程常量"
    	});
    	formVars .push({
    		id:$.uniqueId(),
    		parentId:bpmConstantId,
    		name:"标题",
    		key:'title',
    		attrType:'bpmConstants',
    		type:'string'
    	});
    	formVars .push({
    		id:$.uniqueId(),
    		parentId:bpmConstantId,
    		name:"发起人",
    		key:'startorName',
    		attrType:'bpmConstants',
    		type:'string'
    	});
    	formVars .push({
    		id:$.uniqueId(),
    		parentId:bpmConstantId,
    		name:"发起日期",
    		key:'startDate',
    		attrType:'bpmConstants',
    		type:'string'
    			
    	});
    	formVars .push({
    		id:$.uniqueId(),
    		parentId:bpmConstantId,
    		name:"发起时间",
    		key:'startTime',
    		attrType:'bpmConstants',
    		type:'string'
    			
    	});
    	formVars .push({
    		id:$.uniqueId(),
    		parentId:bpmConstantId,
    		name:"业务主键",
    		key:'businessKey',
    		attrType:'bpmConstants',
    		type:'string'
    			
    	});
    	
    	return formVars;
    };
    BuilderView.prototype.initQtip  = function(){
    	$('[data-tip]')	.each(function() {
    		var  el =$(this);
    		defaultSetting = {
    				position : {
    					my : 'top center',
    					at : 'bottom center'
    				},
    				hide: {
    					event:'mouseleave',
    		        	leave: false,
    		        	fixed:true,
    		        	delay:100
    		        },
    				style: {
    					classes: 'qtip-default  qtip qtip-bootstrap qtip-shadow'
    			    }
    			  };
    		var option =  el.attr("data-tip"), options ;
    		try {
    			options = eval('(' + option + ')');
    		} catch (e) {
    			options = {};
    		}
    		var setting =  $.extend({}, defaultSetting, options);
    		$(this).qtip(setting);
    		});
    }
    
    BuilderView.prototype.initVarTreeForUeditor = function(model){
    	var formVars = this.getFormVarsForUeditor(model);
    	$(".js-form-var").each(function(idx){
 	  		var id = $(this).attr("id");
 	  		var name = $(this).attr("name");
 	       var  editor =UE.getEditor(name);
 	  	   var   varTree = new BpmFormVar('varTree'+id,formVars)
 	  		 	.setCallback({onClick:function(event, treeId, node){
 	  			var data ="";
 	  		 	if(node.attrType == 'field'){
  		 			data = '{'+node.tableName+'.'+node.key+'}';
  		 		}else if(node.attrType == 'bpmConstants'){
  		 			data = '{'+node.name+':'+node.key+'}';
  		 		}else if(node.attrType == 'var'){
  		 			data = '{'+node.key+'}';
  		 		}else return ;
 	  		 	
 	  		 	varTree.hideMenu();
 	  		 	editor.focus();
 	  		 	editor.execCommand('inserthtml', data); 
 	  		 	}})
 	  		 	.makeCombTree(id)
 	  		 	.initZtree();
 	  	});
    }
    
    BuilderView.prototype.initVarTree = function(model){
    	var formVars = this.getFormVars(model);
    	var  $codemirror =	this.$codemirror;
    	 $(".js-form-var").each(function(idx){
 	  		var id = $(this).attr("id");
 	  		var name = $(this).attr("name");
 	       var  editor =$codemirror[name];
 	  	   var   varTree = new BpmFormVar('varTree'+id,formVars)
 	  		 	.setCallback({onClick:function(event, treeId, node){
 	  		 		//alert(node);
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
  		 			data =node.key;
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
 	  	});
    };
    
    
    BuilderView.prototype.destroyEditor = function(){
    	try {
  	      for ( var _i = 0, _len = this.$editor.length; _i < _len; _i++) {//销毁原来的
	    	  this.$editor[_i].destroy();
	      }
    	} catch (e) {
		}
    };
    
    //初始化ueditor
    BuilderView.prototype.initEditor = function($el,model){
    	this.$editor= [];
    	var _this = this;
    	$("script[data-toggle='editor']",$el).each(function(){
	    	  	var editor,
	    	  		name =   $(this).data("name"),
	    	  		val =model.get(name);
	    	  		id = $(this).attr("id");
	    	try {
        		editor =  new UE.ui.Editor(window.UEDITOR_CONFIG);
        		editor.render(id);
	        	// 页面渲染好后如果有值
				if(!editor) return;
				_this.$editor.push(editor);
				editor.ready( function( e ) {
					if(!$.isEmpty(val))
						editor.setContent(val);
				     // 当内容改变了进行值的变更
				     editor.addListener( 'contentChange', function( e ) {
				    	 model.set(name,editor.getContent());
				     });
				 });
	    	} catch (e) {
			}
	    	});
  
    };

    BuilderView.prototype.initCodemirror = function(model){
    	var _this = this;
    	this.$codemirror = {};
	 	$("textarea[data-control='codemirror']").each(function(){
			var self = $(this),
					height=self.data("height")?$(this).data("height"):'50px',
					name= self.attr("name"),
					array=self.data("array"),
					idKey=self.data("id")||'id';
					valKey= self.data("value")||'value';
			var editor = CodeMirror.fromTextArea(this, {
					tabMode : "shift",
			        lineWrapping: true, //是否自动换行
			        lineNumbers: true,//是否显示行数
			        autoMatchParens: true,
			        mode:"groovy"
				  });
			
			editor.on("change", function (instance, changes) {
		        	var docValue =  instance.doc.getValue();
					var val  = "";
					if(array){
						val =	_.each(model.get(name)||[],function(c){
							if( c[idKey] ==array ) {
								c[valKey] =docValue;
							}
						});
					}else{
						val = docValue;
					}
					 model.set(name,val);
				});
			var val ='',nameKey= array?(name+"_"+array):name;
			_this.$codemirror[nameKey]= editor;
			if(array){
				var aryObj = _.find(model.get(name)||[], function(c){ return c[idKey] ==array  });
				if(aryObj) val = aryObj[valKey]||'';
			}else{
				val=	model.get(name)||'';
			}
			editor.setValue(val);
		});
    }
    BuilderView.prototype.clickHeader = function(){
    	if(this.isCollapse){
    		$('.collapse').collapse("show");
    		this.isCollapse = false;
    	}else{
    		$('.collapse').collapse("hide");
    		this.isCollapse = true;
    	}
    }
   
    /**
	 * 绑定保存事件
	 * 
	 * @returns
	 */
    BuilderView.prototype.bindSaveEvent = function() {
      var _this = this;
      this.formSaved = true;
      return $(window).bind('beforeunload', function() {
        if (_this.formSaved) {
          return void 0;
        } else {
          return BpmDefinitionBuilder.lang.dict.UNSAVED_CHANGES;
        }
      });
    };
    

    BuilderView.prototype.handleFormUpdate = function() {
	  if (this.updatingBatch) {
	    return;
	  }
	  this.formSaved = false;
    };

    BuilderView.prototype.saveData= function(e) {
      var payload;
      payload =  this.getData();
      if (BpmDefinitionBuilder.options.HTTP_ENDPOINT) {
        this.doAjaxSave(payload);
      }
      return this.bpmDefinitionBuilder.trigger('save', payload);
    };
    
    BuilderView.prototype.getData = function(){
      	var data ={
  			global:this.response_global.toJSON(),
  			nodes:this.response_nodes.toJSON()
      	};
      	return data;
    };
    
    /**
     * 检查表单数据
     */
    BuilderView.prototype.checkFormValid =function (){
    	return false;
    }

    /**
	 * 保存数据
	 * 
	 * @param payload
	 * @returns
	 */
    BuilderView.prototype.doAjaxSave = function(payload) {
    	if(console)
    		console.info(payload);
     var loading=	DialogUtil.load("加载中...");
	  var b =  this.checkFormValid(); 
	  if(b) return ;
      var _this = this,defId = this.options.defId;
      return $.ajax({
        url: BpmDefinitionBuilder.options.HTTP_ENDPOINT,
        type: BpmDefinitionBuilder.options.HTTP_METHOD,
        data: {
        	data:JSON.stringify(payload),
        	defId:defId
        },
        success: function(data) {
        	DialogUtil.close(loading);
        	var result= JSON.parse(data);
        	if(result.result == 1){
        		 _this.formSaved = true;
        		DialogUtil.confirm(result.message + ',是否继续操作', function(rtn) {
        			if(_this.options.callback)
        				_this.options.callback(rtn);
        			if (rtn){
        				if(_this.options.dialogDefIds&&_this.options.dialogDefIds.curDefKey){
        					window.location.href=__ctx+"/platform/bpmn/bpmDefine/setting.htm?defKey="+_this.options.dialogDefIds.curDefKey;
        				}else{
        					window.location.href=__ctx+"/platform/bpmn/bpmDefine/setting.htm?defId="+defId;
        				}
        			}else{
        				DialogUtil.closeDialog();
        				if(_this.options.dialogDefIds&&_this.options.dialogDefIds.preDefId){
        					defId = _this.options.dialogDefIds.preDefId;
        					window.location.href=__ctx+"/platform/bpmn/bpmDefine/setting.htm?defId="+defId;
        				}
        			}
				});
        	}else{
        		DialogUtil.error(result.message,result.cause);
        	}
        }
      });
    };
    

    return BuilderView;

  })(Backbone.View);

  
  /** *******************************流程定义*********************************************** */  
  BpmDefinitionBuilder = (function() {
	  BpmDefinitionBuilder.helpers = {
		      defaultTemplateAttrs: function(template_type,$this) {
		        var attrs, _base;
		        attrs = {};
		        attrs[BpmDefinitionBuilder.options.LABEL] = BpmDefinitionBuilder.lang.template_type[template_type];
		        attrs[BpmDefinitionBuilder.options.TEMPLATE_TYPE] = template_type;
		     
		
		        return (typeof (_base = BpmDefinitionBuilder.dataTempates[template_type]).defaultAttributes === "function" ? _base.defaultAttributes(attrs) : void 0) || attrs;
		      },
		      simple_format: function(x) {
		    	 // 把\n 替换成br
		        return x != null ? x.replace(/\n/g, '<br />') : void 0;
		      }
		    };
   
		BpmDefinitionBuilder.MESSAGE_TYPES =[];
	  
	  	BpmDefinitionBuilder.nodes = {};
	  
	  	BpmDefinitionBuilder.registerNode = function(name, opts) {
	        var x, _i, _len, _ref5;
	        _ref5 = ['edit'];
	        
	        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
	          x = _ref5[_i];
	          opts[x] = _.template(opts[x]);
	        }
	        opts.node_type = name;
	        
	        BpmDefinitionBuilder.nodes[name] = opts;
	      };

    function BpmDefinitionBuilder(opts) {
      var args;
      if (opts == null) 
        opts = {};
      
      _.extend(this, Backbone.Events);
      
      args = _.extend(opts, {
        bpmDefinitionBuilder: this
      });

      BpmDefinitionBuilder.MESSAGE_TYPES = JSON.parse($("#messageTypes").val());
      this.mainView = new BuilderView(args);
    }

    return BpmDefinitionBuilder;

  })();

  window.BpmDefinitionBuilder = BpmDefinitionBuilder;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = BpmDefinitionBuilder;
  } else {
    window.BpmDefinitionBuilder = BpmDefinitionBuilder;
  }

}).call(this);

(function() {
BpmDefinitionBuilder.options = {
		BUTTON_CLASS: 'tb-button',
		HTTP_ENDPOINT: __ctx+'/platform/bpmn/bpmDefine/saveSetting.htm',
		HTTP_METHOD: 'POST',
		NAME:'name',
		LABEL:'label',
		NODETYPE:'node_type',
		
		NODE_TYPE:{
			START:'start',
			END:"end",
			USER_TASK:"userTask",
			SIGN_TASK:"signTask",
			SUBP_ROCESS:"subProcess",
			CALL_ACTIVITY:"callActivity",
			EXCLUSIVE_GATEWAY:"exclusivegateway",
			PARALLEL_GATEWAY:"parallelGateway",
			INCLUSIVE_GATEWAY:"inclusiveGateway",
			SUB_START_GATEWAY:"subStartGateway",
			SUB_ENDGA_TEWAY:"subEndGateway",
			SUB_MULTI_START_GATEWAY:"subMultiStartGateway",
			SERVICE_TASK:"serviceTask",
			SCRIPT_TASK:"scriptTask",
			RECEIVE_TASK:"receiveTask",
			GLOBAL:'global'
		}

			
	};
	     
}).call(this);    



/** *******************************国际化*********************************************** */
(function() {
	BpmDefinitionBuilder.lang ={
	      dict: {
		        UNSAVED_CHANGES: '您的配置有些修改尚未保存,是否确定离开？'
		      },
		      node_type:{
		    	  start:'开始',
		    	  end:"结束",
		    	  userTask:"用户任务",
		    	  signTask:"会签任务",
		    	  subProcess:"子流程",
		    	  callActivity:"外部子流程",
		    	  exclusivegateway:"分支网关",
		    	  parallelGateway:"同步网关",
		    	  inclusiveGateway:"条件网关",
		    	  subStartGateway:"内嵌子流程开始网关",
		    	  subEndGateway:"内嵌子流程结束网关",
				  subMultiStartGateway:"多实例内嵌子流程开始网关",
				  serviceTask:"服务任务",
				  scriptTask:"脚本任务",
				  receiveTask:"消息任务",
				  global:'全局'
		      }
	};
}).call(this);

/** *****************************TODO 注册模版************************************* */

/**
 * 全局模版
 */
(function() {
	
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.GLOBAL, {
    edit: "<%= BpmDefinitionBuilder.templates['edit/boDef']({rf:rf}) %>\n"+
    		"<%= BpmDefinitionBuilder.templates['edit/formSetting']({rf:rf,formType:'form'}) %>\n"+
    		"<%= BpmDefinitionBuilder.templates['edit/formSetting']({rf:rf,formType:'instForm'}) %>\n"+
    		"<%= BpmDefinitionBuilder.templates['edit/variable']({rf:rf}) %>\n"+
    		"<%= BpmDefinitionBuilder.templates['edit/endNotify']({rf:rf}) %>\n"+
    		"<%= BpmDefinitionBuilder.templates['edit/otherParam']({rf:rf}) %>\n"
  });

}).call(this);

/**
 * 开始
 */
(function() {
	
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.START, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/eventScript']({rf:rf}) %>\n"+
  			" <%= BpmDefinitionBuilder.templates['edit/buttonSetting']({rf:rf}) %>\n"
  });

}).call(this);

/**
 * 结束
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.END, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/eventScript']({rf:rf}) %>\n"
  });

}).call(this);

/**
 * 用户任务
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.USER_TASK, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/userSetting']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/formSetting']({rf:rf,formType:'form'}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/eventScript']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/buttonSetting']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/jumpRule']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/reminder']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/trigerFlow']({rf:rf}) %>\n"+
    		"<%= BpmDefinitionBuilder.templates['edit/endNotify']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/otherAttribute']({rf:rf}) %>\n"
    		
  });

}).call(this);

/**
 * 会签任务
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.SIGN_TASK, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/userSetting']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/formSetting']({rf:rf,formType:'form'}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/signRule']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/privileges']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/eventScript']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/buttonSetting']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/jumpRule']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/reminder']({rf:rf}) %>\n"+
    		"<%= BpmDefinitionBuilder.templates['edit/endNotify']({rf:rf}) %>\n"+
    		" <%= BpmDefinitionBuilder.templates['edit/otherAttribute']({rf:rf}) %>\n"
   
  });

}).call(this);


/**
 * 分支网关
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.EXCLUSIVE_GATEWAY, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/branchCondition']({rf:rf}) %>\n"
  });

}).call(this);

/**
 * 条件同步网关
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.INCLUSIVE_GATEWAY, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/branchCondition']({rf:rf}) %>\n"
  });

}).call(this);


/**
 * 外部子流程
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.CALL_ACTIVITY, {
    edit:  " <%= BpmDefinitionBuilder.templates['edit/callActivity']({rf:rf}) %>\n"
  });

}).call(this);

/**
 * 服务任务
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.SERVICE_TASK, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/serviceSetting']({rf:rf}) %>\n"
  });

}).call(this);

/**
 * 脚本任务
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.SCRIPT_TASK, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/eventScript']({rf:rf}) %>\n"
  });

}).call(this);

/**
 * 消息任务
 */
(function() {
  BpmDefinitionBuilder.registerNode(BpmDefinitionBuilder.options.NODE_TYPE.RECEIVE_TASK, {
    edit: " <%= BpmDefinitionBuilder.templates['edit/messageSetting']({rf:rf}) %>\n"
  });

}).call(this);


/** ***************************TODO 模版***************************** */
this["BpmDefinitionBuilder"] = this["BpmDefinitionBuilder"] || {};
this["BpmDefinitionBuilder"]["templates"] = this["BpmDefinitionBuilder"]["templates"] || {};

/**
 * 编辑-基础模版
 */
this["BpmDefinitionBuilder"]["templates"]["edit/base"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		var nodeType = rf.get(BpmDefinitionBuilder.options.NODETYPE)?rf.get(BpmDefinitionBuilder.options.NODETYPE):BpmDefinitionBuilder.options.NODE_TYPE.GLOBAL;
		__p += '<div class="panel panel-info">';
	// 个性化设置
	__p +=((__t = ( BpmDefinitionBuilder.nodes[nodeType].edit({rf: rf}) )) == null ? '' : __t) +
			'\n';
	__p += '</div>';
	}
	return __p
};

/**
 * 编辑-业务对象
 */
this["BpmDefinitionBuilder"]["templates"]["edit/boDef"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p += ' <div class="panel-heading" data-toggle="collapse" data-target="#boDef">业务对象绑定</div>'+
					'<div class="panel-body collapse in"  id="boDef">'+
						'<table class="table table-form">'+
							'<tr>'+
								'<th>保存方式:</th>'+
								'<td>'+
									' <label class="radio-inline">'+
										' <input type="radio" class="ibps"  data-rv-checked="model.bo.saveMode" value="table"/>'+
										' <span class="lbl"><abbr title="业务表就是必须要生成物理表。" data-tip>业务表</abbr></span>'+
									' </label>'+
					               '<label class="radio-inline">'+
					              	 	'<input type="radio" class="ibps"  data-rv-checked="model.bo.saveMode" value="instance"/ >'+
					              	 	'<span class="lbl"><abbr title="实例表就不需要生成物理表。" data-tip>实例表</abbr></span>'+
					               '</label>'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>绑定对象:</th>'+
								'<td>'+
									'<div class="select-list ">'+
										'<div data-rv-show="model.bo.name">'+
										       '<div class="preview-area pull-left"><i class="fa fa-bo"></i><span data-rv-text ="model.bo.name" class="select-name"></span></div>'+
										      '<div class="actions select-actions pull-right" style="display: none;">'+
								                      '<a class="rechoose-link  js-select-bo"  data-role="rechoose"   href="javascript:void(0)" >重新选择</a> |' +
								               		  '<a class="delete-link  js-remove-bo" data-role="remove"  href="javascript:void(0)" >删除</a>'+
								               '</div>'+   
						                   '</div>'+  
									   	 '<label class="js-select-bo"   data-rv-hide="model.bo.name"><div class="plus">+</div><div class="select-empty"> '+
									   	 	'  请选择业务对象</div></label>' +
									  	 '</div>'+
								'</td>'+
							'</tr>'+
						'</table>'+
					'</div>';
	}
	return __p
};


/**
 * 编辑-表单设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/formSetting"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		var key = typeof formType !== 'undefined'?formType:'form',
			  title = key!='form'?"实例":"",
			  inner =  (rf.get(key+".type") =='inner')?'':'hidden',
			  urlLoad =  (rf.get(key+".type") =='urlLoad' ||  rf.get(key+".type") =='frame')?'':'hidden',
             frame =  (rf.get(key+".type") =='frame')?'':'hidden';
	
		
		__p+='<div class="panel-heading" data-toggle="collapse" data-target="#'+key+'Setting" >'+title+'表单设置</div>'+
		' <div class="panel-body collapse in" id="'+key+'Setting" data-type="'+key+'">'+
				'<table class="table table-form">'+
				'<tr>'+
					'<th class="js-clean-form">表单类型:</th>'+
					'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps js-checked-form" data-rv-checked="model.'+key+'.type" value="inner" />'+
							' <span class="lbl">在线表单</span>'+
						' </label>'+
	                   '<label class="radio-inline">'+
	                  	 	'<input type="radio" class="ibps js-checked-form"  data-rv-checked="model.'+key+'.type" value="urlLoad"/ >'+
	                  	 	'<span class="lbl">URL表单</span>'+
	                   '</label>'+
	                     '<label class="radio-inline">'+
	                  	 	'<input type="radio" class="ibps js-checked-form"   data-rv-checked="model.'+key+'.type" value="frame" >'+
	                  	 	'<span class="lbl">内嵌URL表单（iframe方式）</span>'+
	                   '</label>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>表单:</th>'+
					'<td>'+
						'<div class="select-list  '+inner+'" id="inner'+key+'"   >'+
							'<div data-rv-show="model.'+key+'.formValue">'+
						      '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.'+key+'.name" class="select-name"></span></div>'+
						      '<div class="actions select-actions pull-right" style="display: none;">'+
				                      '<a class="rechoose-link   js-select-form"  data-role="rechoose"   href="javascript:void(0)" >重新选择</a> |' +
				               		  '<a class="delete-link  js-remove-form" data-role="remove"  href="javascript:void(0)" >删除</a> |'+
				             		  '<a class="rights-link  js-rights-form" data-role="remove"  href="javascript:void(0)" >权限</a>'+
				               '</div>'+   
		                   '</div>'+  
					   	 	'<label class="js-select-form"   data-rv-hide="model.'+key+'.formValue"><div class="plus">+</div>'+
					   	 		'<div class="select-empty"> 请选择表单</div>'+
					   	 	'</label>' +
					  	'</div>'+
						
						'<div  id="urlLoad'+key+'" class="'+urlLoad+'" >	'+
							'表单URL:<input type="text"  data-rv-input ="model.'+key+'.formValue"  class="form-control" />'+
							'<div id="frame'+key+'" class="'+frame+'">明细URL:<input type="text"    data-rv-input ="model.'+key+'.editUrl"  class="form-control" /></div>'+
						'</div>'+
					'</td>'+
				'</tr>'+

				'<tr>'+
					'<th>打印模版:</th>'+
					'<td>'+
						'<div class="select-list  '+inner+'PrintTemplate" id="inner'+key+'PrintTemplate"   >'+
							'<div data-rv-show="model.'+key+'.templateId">'+
						      '<div class="preview-area pull-left"><i class="fa fa-form"></i><span data-rv-text ="model.'+key+'.templateName" class="select-name"></span></div>'+
						      '<div class="actions select-actions pull-right" style="display: none;">'+
				                      '<a class="rechoose-link   js-select-print-template"  data-role="rechoose"   href="javascript:void(0)" >重新选择</a> |' +
				               		  '<a class="delete-link  js-remove-print-template" data-role="remove"  href="javascript:void(0)" >删除</a> '+
				               '</div>'+   
			               '</div>'+  
					   	 	'<label class="js-select-print-template"   data-rv-hide="model.'+key+'.templateId"><div class="plus">+</div>'+
					   	 		'<div class="select-empty"> 请选择打印模版</div>'+
					   	 	'</label>' +
					  	'</div>'+
					'</td>'+
				'</tr>';
		
		
				if(key == 'form'){
					__p+= '<tr>'+
									'<th>前置处理器:</th>'+
									'<td>'+
										 '<input type="text"  data-rv-input="model.attributes.prevHandler"  class="form-control js-handler"/>'+
									'</td>'+
								'</tr>'+
								'<tr>'+
									'<th>后置处理器:</th>'+
									'<td>'+
										'<input type="text" data-rv-input="model.attributes.postHandler"  class="form-control  js-handler"/>'+
									'</td>'+
								'</tr>';
				}
				__p+= '</table>'+'</div>';
	}
	return __p
};



/**
 * 编辑-办结抄送设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/endNotify"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		var isGlobal  =$.isEmpty(rf.get("node_type"))?true:false;
		__p +=' <div class="panel-heading" data-toggle="collapse" data-target="#endNotify">'+(isGlobal?'办结抄送设置':'办理抄送设置')+
				'<a  href="javascript:void(0);" style="text-decoration: none;" title="进行设置'+(isGlobal?'流程结束时':'审批结束时')+'抄送给某批人。"'+
				'  class="fa fa-exclamation-circle" data-tip>　</a>'+
		'</div>'+
		'<div class="panel-body collapse in" id="endNotify">';
__p +='<table class="table table-form">';
__p +='<tr><td colspan="2">'+
		'<a class="btn btn-sm   btn-block btn-info js-setEndNotify"  href="javascript:void(0);"><i class="fa fa-cog"></i>设置</a>'+
		'</tr></td>';
__p += '</table></div>';
	}
	return __p
};
/**
 * 编辑-其他设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/otherParam"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p += ' <div class="panel-heading" data-toggle="collapse"  data-target="#otherParam">其他设置</div>'+
					'<div class="panel-body  collapse in" id="otherParam">'+
						'<table class="table table-form">'+
							'<tr>'+
								'<th class="text-left" style="width: 20%;">标题规则:</th>'+
							   	'<td class="text-left" style="width: 80%;" data-name="subjectRule">'+
						    	'<a class="btn btn-primary btn-xs js-form-var" id="varTree_subjectRule" name="subjectRule">表单变量</a>'+
						    	'</td>'+
							'</tr>'+
							'<tr>'+
								'<td colspan="2">'+
			               			'<script data-name="attributes.subjectRule" data-toggle="editor" id="subjectRule" class="editor" type="text/plain"  style="width:100%;height:100px;"></script>'+
								'</td>'+
							'</tr>'+
							
							'<tr>'+
								'<th colspan="2" class="text-left" >流程描述:</th>'+
							'</tr>'+
							'<tr>'+
								'<td colspan="2">'+
			          				' <textarea rows="5" cols="30"  data-rv-input="model.attributes.description" class="form-control"></textarea>'+
								'</td>'+
							'</tr>'+
							
							'<tr>'+
								'<th>通知类型:</th>'+
								'<td>';
		    					_.each(BpmDefinitionBuilder.MESSAGE_TYPES,function(g,i){
		    						__p +=' <label class="checkbox-inline">'+
										' <input type="checkbox" class="ibps"     data-rv-checkedarraystr="model.attributes.notifyType" value="'+g.type+'" />'+
										' <span class="lbl">'+g.title+'</span>'+
									' </label>';
		    					});
								 
		    					__p +='</td>'+
							'</tr>'+
							
							'<tr>'+
								'<th >测试通知类型:</th>'+
								'<td>';
		    					_.each(BpmDefinitionBuilder.MESSAGE_TYPES,function(g,i){
		    						__p +=' <label class="checkbox-inline">'+
										' <input type="checkbox" class="ibps"  data-rv-checkedarraystr="model.attributes.testNotifyType"  value="'+g.type+'" />'+
										' <span class="lbl">'+g.title+'</span>'+
									' </label>';
		    					});
								 
		    					__p +='</td>'+
							'</tr>'+
							'<tr>'+
								'<th>跳过第一个<br/>节点:</th>'+
								'<td>'+
									' <label class="radio-inline">'+
											' <input type="radio" class="ibps"  data-rv-checkedboolen="model.attributes.skipFirstNode"  value="true"/>'+
											' <span class="lbl">是</span>'+
									'</label>'+
						               '<label class="radio-inline">'+
						              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.skipFirstNode" value="false"/ >'+
						              	 	'<span class="lbl">否</span>'+
						               '</label>'+
								'</td>'+
							'</tr>'+
							
							'<tr>'+
								'<th>第一个节点<br/>可以选择执行人:</th>'+
								'<td>'+
									' <label class="radio-inline">'+
										' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.firstNodeUserAssign" value="true" />'+
										' <span class="lbl">是</span>'+
									' </label>'+
					               '<label class="radio-inline">'+
					              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.firstNodeUserAssign" value="false"/ >'+
					              	 	'<span class="lbl">否</span>'+
					               '</label>'+
								'</td>'+
							'</tr>'+
							
							'<tr>'+
							'<th>相邻节点相同执行人<br>直接跳过:</th>'+
							'<td>'+
								' <label class="radio-inline">'+
									' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.skipSameUser" value="true"/>'+
									' <span class="lbl">是</span>'+
								' </label>'+
				               '<label class="radio-inline">'+
				              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.skipSameUser" value="false"/ >'+
				              	 	'<span class="lbl">否</span>'+
				               '</label>'+
							'</td>'+
						'</tr>'+
						
						'<tr>'+
							'<th>任务允许转办:</th>'+
							'<td>'+
								' <label class="radio-inline">'+
									' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.allowTransTo" value="true"/>'+
									' <span class="lbl">是</span>'+
								' </label>'+
				               '<label class="radio-inline">'+
				              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.allowTransTo" value="false"/ >'+
				              	 	'<span class="lbl">否</span>'+
				               '</label>'+
							'</td>'+
						'</tr>'+

					'<tr>'+
						'<th>允许执行人为空:</th>'+
						'<td>'+
							' <label class="radio-inline">'+
								' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.allowExecutorEmpty" value="true"/>'+
								' <span class="lbl">是</span>'+
							' </label>'+
			               '<label class="radio-inline">'+
			              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.allowExecutorEmpty" value="false"/ >'+
			              	 	'<span class="lbl">否</span>'+
			               '</label>'+
						'</td>'+
					'</tr>'+
				'<tr>'+
					'<th>执行人为空时跳过任务:</th>'+
					'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.skipExecutorEmpty" value="true"/>'+
							' <span class="lbl">是</span>'+
						' </label>'+
		               '<label class="radio-inline">'+
		              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.skipExecutorEmpty" value="false"/ >'+
		              	 	'<span class="lbl">否</span>'+
		               '</label>'+
					'</td>'+
				'</tr>'+
			
					'<tr>'+
						'<th>是否正式:</th>'+
						'<td>'+
							' <label class="radio-inline">'+
								' <input type="radio" class="ibps" data-rv-checked="model.attributes.testStatus" value="run" />'+
								' <span class="lbl">正式</span>'+
							' </label>'+
			               '<label class="radio-inline">'+
			              	 	'<input type="radio" class="ibps" data-rv-checked="model.attributes.testStatus" value="test"/ >'+
			              	 	'<span class="lbl">测试</span>'+
			               '</label>'+
						'</td>'+
					'</tr>'+
		
					'<tr>'+
						'<th>状态:</th>'+
						'<td>'+
				           '<label class="radio-inline">'+
				          	 	'<input type="radio" class="ibps" data-rv-checked="model.attributes.status" value="deploy"/ >'+
				          	 	'<span class="lbl">已发布</span>'+
				           '</label>'+
							' <label class="radio-inline">'+
								' <input type="radio" class="ibps" data-rv-checked="model.attributes.status" value="forbidden"/>'+
								' <span class="lbl">禁止</span>'+
							' </label>'+
				           '<label class="radio-inline">'+
				          	 	'<input type="radio" class="ibps" data-rv-checked="model.attributes.status" value="forbidden_instance"/ >'+
				          	 	'<span class="lbl">禁止实例</span>'+
				           '</label>'+
						'</td>'+
					'</tr>'+
						
					'</table>'+
			'</div>';
	}
	return __p
};



/**
 * 编辑-事件脚本
 */
this["BpmDefinitionBuilder"]["templates"]["edit/eventScript"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
	
	__p +=' <div class="panel-heading" data-toggle="collapse"  data-target="#eventScript">事件设置</div>'+
			'<div class="panel-body collapse in" id="eventScript">'+
				'<ul class="nav nav-tabs">';
		if(rf.get("node_type") =='start') {
			__p +=   '<li class="active">'+
					   		'<a href="#tab_startEvent" data-toggle="tab">开始事件</a>   '+
					   	 ' </li>   ';
		}		   
		else if(rf.get("node_type")  =='end') {
			__p  += ' <li class="active">   '+
					   		'<a href="#tab_endEvent" data-toggle="tab">结束事件 </a>   '+
					   '</li>   ';
		}
		else if(rf.get("node_type")  =='userTask' || rf.get("node_type")  =='signTask') {
			__p +=   '<li class="active">'+
				   				'<a href="#tab_beforeScript" data-name="scripts.create" data-toggle="tab">前置脚本</a>   '+
				   			' </li>   ';
			__p +=   '<li>'+
			   					'<a href="#tab_afterScript" data-name="scripts.complete"  data-toggle="tab">后置脚本</a>   '+
			   			' </li>   ';
		}
		else if(rf.get("node_type")  =='scriptTask') {
			
			__p +=   '<li class="active">'+
						'<a href="#tab_nodeScript" data-tab="tab_nodeScript" data-toggle="tab">节点脚本</a>   '+
					' </li>   ';
		}
		
		
		__p  += '</ul>   '+
				   '<div class="tab-content">   ';
		
		if(rf.get("node_type") =='start') {

			__p  +=   '<div class="tab-pane fade active in" id="tab_startEvent">'+
					   '<table class="table table-form">'+
							'<tr>'+
								'<th width="20%">说明:</th>'+
								'<td>'+
									'该脚本在<span class="red">流程启动</span>时执行，用户可以使用<span class="red">execution</span>做操作。例如设置流程变量:execution.setVariable("total", 100);'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<th style="width: 50px; border-right: 0px;" >脚本:'+
								'</th>'+
						    	'<th class="text-left" style="width: 200px; "  data-name="scripts.start">'+
							    	'<a class="btn btn-primary btn-xs js-common-script">常用脚本</a>&nbsp;&nbsp;'+
							    	'<a class="btn btn-primary btn-xs js-condition-script">条件脚本</a>&nbsp;&nbsp;'+
							    	'<a class="btn btn-primary btn-xs js-form-var" id="varTree_startEvent" name="scripts.start">表单变量</a>'+
							    '</th>'+
							'</tr>'+
							'<tr>'+
								'<td  colspan="2" > <textarea rows="5" cols="20" style="width:100%;" data-control="codemirror" name="scripts.start" class="form-control"></textarea></td>'+
							'</tr>'+
						'</table>'+
			  ' </div>';
		}		   
		else if(rf.get("node_type")  =='end') {

			__p  +=   '<div class="tab-pane fade active in" id="tab_endEvent">'+
					   '<table class="table table-form">'+
							'<tr>'+
								'<th width="20%">说明:</th>'+
								'<td>'+
									'该脚本在<span class="red">流程结束</span>时执行，用户可以使用<span class="red">execution</span>做操作。例如设置流程变量:execution.setVariable("total", 100);'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<th style="width: 50px; border-right: 0px;" >脚本:'+
								'</th>'+
							    '<th class="text-left" style="width: 200px;" data-name="scripts.end">'+
							    	'<a class="btn btn-primary btn-xs js-common-script">常用脚本</a>&nbsp;&nbsp;'+
							    	'<a class="btn btn-primary btn-xs js-condition-script">条件脚本</a>&nbsp;&nbsp;'+
							    	'<a class="btn btn-primary btn-xs js-form-var" id="varTree_endEvent" name="scripts.end">表单变量</a>'+
							    ' </th>'+
							'</tr>'+
							'<tr>'+
								'<td  colspan="2" > <textarea rows="5" cols="20"  data-control="codemirror" name="scripts.end" class="form-control"></textarea></td>'+
							'</tr>'+
						'</table>'+
			  ' </div>';
		}
		else if(rf.get("node_type")  =='userTask' || rf.get("node_type")  =='signTask') {
			__p  +=   '<div class="tab-pane fade active in" id="tab_beforeScript">'+
							   '<table class="table table-form">'+
									'<tr>'+
										'<th width="20%">说明:</th>'+
										'<td>'+
											'该事件在<span class="red">该任务启动前</span>执行，用户可以使用<span class="red">execution</span>做操作。例如设置流程变量:execution.setVariable("total", 100);'+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<th style="width: 50px; border-right: 0px;"  >脚本:'+
										'</th>'+
									    '<th class="text-left" style="width: 200px;" data-name="scripts.create">'+
									    	'<a class="btn btn-primary btn-xs js-common-script">常用脚本</a>&nbsp;&nbsp;'+
									    	'<a class="btn btn-primary btn-xs js-condition-script">条件脚本</a>&nbsp;&nbsp;'+
									    	'<a class="btn btn-primary btn-xs js-form-var" id="varTree_beforeScript" name="scripts.create">表单变量</a>'+
									    '</th>'+
									'</tr>'+
									'<tr>'+
										'<td  colspan="2" > <textarea rows="5" cols="20" tab="tab_beforeScript"  data-control="codemirror" name="scripts.create" class="form-control"></textarea></td>'+
									'</tr>'+
								'</table>'+
							' </div>';
			
			__p  +=   '<div class="tab-pane" id="tab_afterScript">'+
			   '<table class="table table-form">'+
					'<tr>'+
						'<th width="20%">说明:</th>'+
						'<td>'+
							'该事件在<span class="red">该任务结束后</span>执行，用户可以使用<span class="red">execution</span>做操作。例如设置流程变量:execution.setVariable("total", 100);'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<th style="width: 50px; border-right: 0px;" >脚本:'+
						'</th>'+
					    '<th class="text-left" style="width: 200px;" data-name="scripts.complete">'+
					    	'<a class="btn btn-primary btn-xs js-common-script">常用脚本</a>&nbsp;&nbsp;'+
					    	'<a class="btn btn-primary btn-xs js-condition-script">条件脚本</a>&nbsp;&nbsp;'+
					    	'<a class="btn btn-primary btn-xs js-form-var" id="varTree_afterScript" name="scripts.complete">表单变量</a>'+
					    '</th>'+
					'</tr>'+
					'<tr>'+
						'<td  colspan="2" > <textarea rows="5" cols="20"  tab="tab_afterScript"  data-control="codemirror" name="scripts.complete" class="form-control"></textarea></td>'+
					'</tr>'+
				'</table>'+
				' </div>';
		}
		else if(rf.get("node_type")  =='scriptTask') {

			__p  +=   '<div class="tab-pane fade active in" id="tab_nodeScript">'+
					   '<table class="table table-form">'+
							'<tr>'+
								'<th width="20%">说明:</th>'+
								'<td>'+
									'该脚本在<span class="red">脚本任务</span>触发时执行，用户可以使用<span class="red">execution</span>做操作。例如设置流程变量:execution.setVariable("total", 100);'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<th style="width: 50px; border-right: 0px;" >脚本:'+
								'</th>'+
							    '<th class="text-left" style="width: 200px;"  data-name="scripts.node">'+
							    	'<a class="btn btn-primary btn-xs js-common-script">常用脚本</a>&nbsp;&nbsp;'+
							    	'<a class="btn btn-primary btn-xs js-condition-script">条件脚本</a>&nbsp;&nbsp;'+
							    	'<a class="btn btn-primary btn-xs js-form-var" id="varTree_nodeScript" name="scripts.node">表单变量</a>'+
							    ' </th>'+
							'</tr>'+
							'<tr>'+
								'<td  colspan="2" > <textarea rows="5" cols="20"  data-control="codemirror" name="scripts.node" class="form-control"></textarea></td>'+
							'</tr>'+
						'</table>'+
			  ' </div>';
		}
		
		
		
		__p  += '</div></div>\n';
	
	}
	return __p
};



/**
 * 编辑-用户设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/userSetting"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p+='<div class="panel-heading row" data-toggle="collapse" data-target="#userSetting"><div class="pull-left">用户设置</div>'+
						'<div class="pull-right">'+
							'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-add-user"><i class="fa fa-add"></i>添加人员</a>'+
						'</div>'+
				   '</div>'+
					'<div class="panel-body collapse in" id="userSetting">'+
							'<table class="table table-bordered table-striped">'+
								'<thead>'+
									'<th width="50px">序号</th>'+
									'<th>条件</th>'+
									'<th  width="80px">批次</th>'+
									'<th  width="90px">管理</th>'+
								'</thead>';
								 if (rf.get("users") && rf.get("users").length >0 ) { ;
								 		__p += '<tr class="users"   data-rv-each-user="model.users">';
											__p +='<td  data-rv-text="user:$index"></td>';
											__p +='<td  data-rv-text="user:description"></td>';
											__p +='<td><input type="number" class="form-control" data-rv-input="user:groupNo" style="width: 70px" /></td>';
											__p +='<td >'+
														'<a class="btn btn-info btn-sm fa fa-edit js-edit-user" title="编辑"></a>'+
												        '<a  class="btn btn-danger  btn-sm fa fa-delete   js-remove-user"  title="删除"></a>'+
											       '</td>';
										__p +='</tr>';
								 } else{;
									 __p += '<tr>'+
											'<td colspan="4">'+
											     '暂无设置人员'+
											'</td>'+
										'</tr>';
								 };	
								
		__p +=		'	</table>'+
		 			' </div>';
	}
	return __p
};


/**
 * 编辑-按钮设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/buttonSetting"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p+='<div class="panel-heading row" data-toggle="collapse" data-target="#buttonSetting"><div class="pull-left">按钮设置</div>'+
						'<div class="pull-right">'+
							'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-add-button"><i class="fa fa-add"></i>添加按钮</a>'+
							'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-init-button"><i class="fa fa-recycle"></i>初始化按钮</a>'+
							'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-clean-button"><i class="fa fa-remove"></i>清空按钮</a>'+
							
						'</div>'+
				   '</div>'+
					'<div class="panel-body collapse in" id="buttonSetting">'+
							'<table class="table table-bordered table-striped ">'+
								'<thead>'+
									'<th  width="50%">按钮名称</th>'+
									'<th  width="30%">操作类型</th>'+
									'<th  width="20%">管理</th>'+
								'</thead>';
		 if (rf.get("buttons") && rf.get("buttons").length >0 ) { ;
		 		__p += '<tr class="buttons"   data-rv-each-button="model.buttons">';
					__p +='<td  data-rv-text="button:name"></td>';
					__p +='<td  data-rv-text="button:aliasName"></td>';
					__p +='<td >'+
								'<a class="btn btn-info btn-sm fa fa-edit js-edit-button" title="编辑"></a>'+
						        '<a  class="btn btn-danger  btn-sm fa fa-delete   js-remove-button"  title="删除"></a>'+
					       '</td>';
				__p +='</tr>';
		 } else{;

			 __p += '<tr>'+
					'<td colspan="3">'+
					     '暂无设置按钮'+
					'</td>'+
				'</tr>';
		 };
								
								
		 __p +='	</table>'+
		 			' </div>';
	}
	return __p
};


/**
 * 编辑-分支条件设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/branchCondition"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	
	with (obj) {
		__p +=' <div class="panel-heading" data-toggle="collapse" data-target="branchCondition">条件设置</div>'+
			'<div class="panel-body collapse in" id="branchCondition">';
		__p += 	'<table class="table table-form">';
		
			_.each(rf.get("conditions"),function(condition){
				__p += '<tr>'+
								'<th>'+condition.name+':</th>'+
								'<td>'+	
										'<div  class="row"  data-name="conditions_'+condition.id+'"  >'+
											'<a class="btn btn-primary btn-xs js-condition-script">条件脚本</a>&nbsp;&nbsp;'+
								    		'<a class="btn btn-primary btn-xs js-form-var" id="varTree_'+condition.id+'" name="conditions_'+condition.id+'" >表单变量</a></div>'+
								    	
								    	'<div class="row" data-name="conditions_'+condition.id+'" >';
								    	if(condition.sign){
								    		_.each(condition.sign,function(sign){
								    			__p +=  "<span class='owner-span'><a class='js-sign-result' href='javascript:void(0)' data-result='"+sign.id+"'>"+sign.name+"</a></span>";
								    		});
								    	}else{
								    		__p +=  "<span class='owner-span'><a class='js-sign-result' href='javascript:void(0)' data-result='taskCmd.getActionName().equals(\"agree\")'>同意</a></span>"+
								    				"<span class='owner-span'><a class='js-sign-result' href='javascript:void(0)' data-result='taskCmd.getActionName().equals(\"oppose\")'>反对</a></span>";
								    	}
								    	
								 __p += '</div>'+
								    	'<div  class="row"><textarea rows="5" cols="20"  data-control="codemirror" data-height="100px" data-array="'+condition.id+'" name="conditions"   class="form-control"></textarea></div>'+
								   '</td>'+
								 '</tr>';
			});
			__p += '</table></div>';
	}
	return __p
};	


/**
 * 编辑-会签规则
 */
this["BpmDefinitionBuilder"]["templates"]["edit/signRule"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape,isHidden = 'hidden';
	with (obj) {
		if(rf.get("signRule.voteType") == 'percent') isHidden = '';
		
		__p +=' <div class="panel-heading" data-toggle="collapse" data-target="#signRule">会签规则</div>'+
					'<div class="panel-body collapse in" id="signRule">';
		
		
		__p +='<table class="table table-form">'+
					'<tr>'+
						'<th>决策类型:</th>'+
						'<td>'+
							' <label class="radio-inline">'+
								' <input type="radio" class="ibps" data-rv-checked="model.signRule.decideType" value="agree"/>'+
								' <span class="lbl">同意票</span>'+
							' </label>'+
				           '<label class="radio-inline">'+
				          	 	'<input type="radio" class="ibps" data-rv-checked="model.signRule.decideType" value="refuse"/ >'+
				          	 	'<span class="lbl">否定票</span>'+
				           '</label>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<th>后续处理模式:</th>'+
						'<td>'+
							' <label class="radio-inline">'+
								' <input type="radio" class="ibps" data-rv-checked="model.signRule.followMode" value="wait"/>'+
								' <span class="lbl">等待所有人投票</span>'+
							' </label>'+
				           '<label class="radio-inline">'+
				          	 	'<input type="radio" class="ibps" data-rv-checked="model.signRule.followMode" value="complete"/ >'+
				          	 	'<span class="lbl">直接处理</span>'+
				           '</label>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<th>投票类型:</th>'+
						'<td>'+
							' <label class="radio-inline" >'+
								' <input type="radio" class="ibps js-checked-voteType" data-rv-checked="model.signRule.voteType" value="amount"/>'+
								' <span class="lbl">绝对票数</span>'+
							' </label>'+
				           '<label class="radio-inline">'+
				          	 	'<input type="radio" class="ibps js-checked-voteType" data-rv-checked="model.signRule.voteType" value="percent"/ >'+
				          	 	'<span class="lbl">百分比</span>'+
				           '</label>'+
						'</td>'+
					'</tr>'+
					
					'<tr>'+
						'<th>票数:</th>'+
						'<td>'+
							'<div class="input-group"> <input type="text" data-rv-input="model.signRule.voteAmount"  class="form-control"/>'+
							'<span  class="input-group-addon"><span id="votePer" class="'+isHidden+'"> %</span></span></div>'+
						'</td>'+
					'</tr>';
		
		__p += '</table></div>';
	}
	return __p
};	

/**
 * 编辑-会签特权
 */
this["BpmDefinitionBuilder"]["templates"]["edit/privileges"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=' <div class="panel-heading" data-toggle="collapse" data-target="#privileges">会签特权</div>'+
					'<div class="panel-body collapse in" id="privileges">';
		__p +='<table class="table table-form">'+
			'<tr>'+
				'<th>已配置项:</th>'+
				'<td>'+
				'<ul class="select-list">';
	
		if(!rf.get("privileges") || (
				(rf.get("privileges.all") &&rf.get("privileges.all").length == 0) &&
				(rf.get("privileges.direct") &&rf.get("privileges.direct").length == 0) &&
				(rf.get("privileges.oneticket") &&rf.get("privileges.oneticket").length == 0) &&
				(rf.get("privileges.allowAddSign") &&rf.get("privileges.allowAddSign").length == 0)
			)){
			__p +='<li class="select-item"><span>未进行配置</span></li>';
		}else{
			if(rf.get("privileges.all") &&rf.get("privileges.all").length>0){
				__p +='<li class="select-item"><span>所有特权</span></li>';
			}
			if(rf.get("privileges.direct") &&rf.get("privileges.direct").length>0){
				__p +='<li class="select-item"><span>直接处理</span></li>';
			}
			if( rf.get("privileges.allowAddSign") &&rf.get("privileges.oneticket").length>0){
				__p +='<li class="select-item"><span>一票制</span></li>';
			}
			if(rf.get("privileges.allowAddSign") &&rf.get("privileges.allowAddSign").length>0){
				__p +='<li class="select-item"><span>允许补签</span></li>';
			}
		}
		__p +=	'</ul>'+
				'</td>'+
			'</tr>';
		__p +='<tr><td colspan="2">'+'<a class="btn btn-sm  btn-block  btn-default js-privileges"  >会签特权设置</a></tr></td>';
		__p += '</table></div>';
	}
	return __p
};	


/**
 * 编辑-跳转规则设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/jumpRule"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p+='<div class="panel-heading row" data-toggle="collapse" data-target="#jumpRuleSetting"><div class="pull-left">跳转规则设置</div>'+
						'<div class="pull-right">'+
							'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-add-jumpRule"><i class="fa fa-add"></i>添加规则</a>'+
							'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-clean-jumpRule"><i class="fa fa-remove"></i>清空规则</a>'+
							
						'</div>'+
				   '</div>'+
					'<div class="panel-body collapse in" id="jumpRuleSetting">'+
							'<table class="table table-bordered table-striped ">'+
								'<thead>'+
									'<th  width="50%">规则名称</th>'+
									'<th  width="30%">目标节点</th>'+
									'<th  width="20%">管理</th>'+
								'</thead>';
		 if (rf.get("jumpRules") && rf.get("jumpRules").length >0 ) { ;
		 		__p += '<tr class="jumpRules"   data-rv-each-rule="model.jumpRules">';
					__p +='<td  data-rv-text="rule:ruleName"></td>';
					__p +='<td  data-rv-text="rule:targetNode"></td>';
					__p +='<td >'+
								'<a class="btn btn-info btn-sm fa fa-edit js-edit-jumpRule" title="编辑"></a>'+
						        '<a  class="btn btn-danger  btn-sm fa fa-delete   js-remove-jumpRule"  title="删除"></a>'+
					       '</td>';
				__p +='</tr>';
		 } else{;

			 __p += '<tr>'+
					'<td colspan="3">'+
					     '暂无设置跳转规则'+
					'</td>'+
				'</tr>';
		 };
								
								
		 __p +='	</table>'+
		 			' </div>';
	}
	return __p
};


/**
 * 编辑-流程变量设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/variable"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p+='<div class="panel-heading row" data-toggle="collapse" data-target="#variableSetting"><div class="pull-left">流程变量设置</div>'+
						'<div class="pull-right">'+
							'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-add-variable"><i class="fa fa-add"></i>添加变量</a>'+
							'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-clean-variable"><i class="fa fa-remove"></i>清空变量</a>'+
							
						'</div>'+
				   '</div>'+
					'<div class="panel-body collapse in" id="variableSetting">'+
							'<table class="table table-bordered table-striped ">'+
								'<thead>'+
									'<th  width="50%">变量名称</th>'+
									'<th  width="30%">变量KEY</th>'+
									'<th  width="20%">管理</th>'+
								'</thead>';
		 if (rf.get("variables") && rf.get("variables").length >0 ) { ;
		 		__p += '<tr class="variables"   data-rv-each-variable="model.variables">';
					__p +='<td  data-rv-text="variable:name"></td>';
					__p +='<td  data-rv-text="variable:key"></td>';
					__p +='<td >'+
								'<a class="btn btn-info btn-sm fa fa-edit js-edit-variable" title="编辑"></a>'+
						        '<a  class="btn btn-danger btn-sm fa fa-delete   js-remove-variable"  title="删除"></a>'+
					       '</td>';
				__p +='</tr>';
		 } else{;

			 __p += '<tr>'+
					'<td colspan="3">'+
					     '暂无设置流程变量'+
					'</td>'+
				'</tr>';
		 };
								
								
		 __p +='	</table>'+
		 			' </div>';
	}
	return __p
};


/**
 * 编辑-其他设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/otherAttribute"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape, __withOutGateway = false;
	with (obj) {
		
		__p +=' <div class="panel-heading" data-toggle="collapse" data-target="#otherAttribute">其他设置</div>'+
					'<div class="panel-body collapse in" id="otherAttribute">';
		
		
		__p +='<table class="table table-form">';
		
		__withOutGateway = rf.get("withOutGateway");
		/*	如果是普通任务直接出口2个及以上任务无网关
		 * usertask|-usertask
		 * 		   |-usertask
		 */
		if(__withOutGateway || 'true' == __withOutGateway){
			__p +='<tr>'+
			'<th>跳转类型:</th>'+
				'<td>'+
					' <label class="checkbox-inline">'+
						' <input type="checkbox" class="ibps" disabled data-rv-checkedarraystr="model.attributes.jumpType" value="common"/>'+
						' <span class="lbl">正常跳转</span>'+
					' </label>'+
					'<label class="checkbox-inline">'+
						'<input type="checkbox" class="ibps" disabled data-rv-checkedarraystr="model.attributes.jumpType" value="select"/ >'+
						'<span class="lbl">选择路径跳转</span>'+
					'</label>'+
					'<label class="checkbox-inline js-select-jumpType">'+
						'<input type="checkbox" class="ibps" data-rv-checkedarraystr="model.attributes.jumpType" value="free"/ >'+
						'<span class="lbl">自由跳转</span>'+
					'</label>'+
				'</td>'+
			'</tr>';
		} else {
			__p +='<tr>'+
				'<th>跳转类型:</th>'+
				'<td>'+
					' <label class="checkbox-inline">'+
						' <input type="checkbox" class="ibps" data-rv-checkedarraystr="model.attributes.jumpType" value="common"/>'+
						' <span class="lbl">正常跳转</span>'+
					' </label>'+
	               '<label class="checkbox-inline js-select-jumpType">'+
	              	 	'<input type="checkbox" class="ibps" data-rv-checkedarraystr="model.attributes.jumpType" value="select"/ >'+
	              	 	'<span class="lbl">选择路径跳转</span>'+
	               '</label>'+
	               '<label class="checkbox-inline js-select-jumpType">'+
	              	 	'<input type="checkbox" class="ibps" data-rv-checkedarraystr="model.attributes.jumpType" value="free"/ >'+
	              	 	'<span class="lbl">自由跳转</span>'+
	               '</label>'+
				'</td>'+
			'</tr>';
		}
					
		__p +='<tr>'+
					'<th>隐藏意见:</th>'+
					'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.hideOpinion" value="true"/>'+
							' <span class="lbl">是</span>'+
						' </label>'+
		               '<label class="radio-inline">'+
		              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.hideOpinion" value="false"/ >'+
		              	 	'<span class="lbl">否</span>'+
		               '</label>'+
					'</td>'+
				'</tr>';
				
		if(__withOutGateway || 'true' == __withOutGateway){
			__p +='<tr>'+
					'<th>隐藏路径:</th>'+
					'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps" disabled data-rv-checkedboolen="model.attributes.hidePath" value="true"/>'+
							' <span class="lbl">是</span>'+
						' </label>'+
		               '<label class="radio-inline">'+
		              	 	'<input type="radio" class="ibps" disabled data-rv-checkedboolen="model.attributes.hidePath" value="false"/ >'+
		              	 	'<span class="lbl">否</span>'+
		               '</label>'+
					'</td>'+
				'</tr>';
		} else {
			__p +='<tr>'+
					'<th>隐藏路径:</th>'+
					'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.hidePath" value="true"/>'+
							' <span class="lbl">是</span>'+
						' </label>'+
		               '<label class="radio-inline">'+
		              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.hidePath" value="false"/ >'+
		              	 	'<span class="lbl">否</span>'+
		               '</label>'+
					'</td>'+
				'</tr>';
		}
				
		__p +='<tr>'+
					'<th>允许执行人空:</th>'+
					'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.allowExecutorEmpty" value="true"/>'+
							' <span class="lbl">是</span>'+
						' </label>'+
		               '<label class="radio-inline">'+
		              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.allowExecutorEmpty" value="false"/ >'+
		              	 	'<span class="lbl">否</span>'+
		               '</label>'+
					'</td>'+
				'</tr>';
				
		__p +='<tr>'+
					'<th>执行人为空跳过:</th>'+
					'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.skipExecutorEmpty" value="true"/>'+
							' <span class="lbl">是</span>'+
						' </label>'+
		               '<label class="radio-inline">'+
		              	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.attributes.skipExecutorEmpty" value="false"/ >'+
		              	 	'<span class="lbl">否</span>'+
		               '</label>'+
					'</td>'+
				'</tr>';
				

				
		__p +='<tr>'+
					'<th>通知类型:</th>'+
					'<td>';
					_.each(BpmDefinitionBuilder.MESSAGE_TYPES,function(g,i){
						__p +=' <label class="checkbox-inline">'+
							' <input type="checkbox" class="ibps"     data-rv-checkedarraystr="model.attributes.notifyType" value="'+g.type+'" />'+
							' <span class="lbl">'+g.title+'</span>'+
						' </label>';
					});
					 
		__p +='</td>'+
				'</tr>';
					
		__p += '</table></div>';
	}
	return __p
};	

/**
 * 编辑-外部子流程设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/callActivity"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape,isHidden =true,isMuliInstance =false,isParallel =false;
	with (obj) {
		if($.isEmpty(rf.get("callActivity.flowKey")))isHidden =false;
		if(rf.get("callActivity.supportMuliInstance"))isMuliInstance =true;
		if(rf.get("callActivity.isParallel"))isParallel =true;
		__p +=' <div class="panel-heading" data-toggle="collapse" data-target="#callActivity">外部子流程设置</div>'+
					'<div class="panel-body collapse in" id="callActivity">';
		
		__p +='<table class="table table-form">'+
				'<tr>'+
					'<th>子流程流程定义:</th>'+
					'<td>'+
						'<div class="select-list">'+
						'<div class="'+(isHidden?'':'hidden')+'">'+
					      '<div class="preview-area pull-left"><i class="fa fa-flow"></i><span data-rv-text ="model.callActivity.flowName" class="select-name"></span></div>'+
					      '<div class="actions select-actions pull-right" style="display: none;">';
		
		/*__p +='<a class="rechoose-link js-select-flow" data-role="rechoose" href="javascript:void(0)">重新选择</a>';*/
		 
		/*__p +='</div>'+   
	                   '</div>'+  
				   	 	'<label class="js-select-flow '+(isHidden?'hidden':'')+'" ><div class="plus">+</div>'+
				   	 		'<div class="select-empty">请选择流程</div>'+
				   	 	'</label>' +
				  	'</div>'+
					'</td>'+
				'</tr>';*/
		
		__p +='</div>'+   
			        '</div>'+  
				   	 	'<label class="js-select-flow '+(isHidden?'hidden':'')+'">'+
				   	 		'未配置外部子流程'+
				   	 	'</label>' +
				  	'</div>'+
					'</td>'+
				'</tr>';
		
		/*__p +='<tr>'+
					'<th>是否多实例:</th>'+
						'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps js-checked-muliInstance" data-rv-checkedboolen="model.callActivity.supportMuliInstance" value="true"/>'+
							' <span class="lbl">是</span>'+
						' </label>'+
			           '<label class="radio-inline">'+
			          	 	'<input type="radio" class="ibps  js-checked-muliInstance" data-rv-checkedboolen="model.callActivity.supportMuliInstance" value="false"/ >'+
			          	 	'<span class="lbl">否</span>'+
			           '</label>'+
					'</td>'+
				'</tr>';*/
		
		__p +='<tr>'+
			'<th>是否多实例:</th>'+
			'<td>'+
				(isMuliInstance?'是':'否')+
			'</td>'+
			'</tr>';
		
		/*__p +='<tr  id="isParallel" class="'+(isMuliInstance?'':'hidden')+'">'+
					'<th>串行/并行:</th>'+
						'<td>'+
						' <label class="radio-inline">'+
							' <input type="radio" class="ibps" data-rv-checkedboolen="model.callActivity.isParallel" value="false"/>'+
							' <span class="lbl">串行</span>'+
						' </label>'+
			           '<label class="radio-inline">'+
			          	 	'<input type="radio" class="ibps" data-rv-checkedboolen="model.callActivity.isParallel" value="true"/ >'+
			          	 	'<span class="lbl">并行</span>'+
			           '</label>'+
					'</td>'+
				'</tr>';*/
		
		__p +='<tr id="isParallel" class="'+(isMuliInstance?'':'hidden')+'">'+
				'<th>串行/并行:</th>'+
				'<td>'+
					(isParallel?'并行':'串行')+
				'</td>'+
			'</tr>';
		
		__p +='<tr>'+
					'<th>子流程设置:</th>'+
						'<td>'+
							'<a class="btn btn-sm  btn-block  btn-primary js-setting-callActivity">外部子流程设置</a>';
					'</td>'+
				'</tr>';
		
		__p += '</table></div>';
	}
	return __p
};	


/**
 * 编辑-服务节点设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/serviceSetting"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=' <div class="panel-heading" data-toggle="collapse" data-target="#serviceSetting">服务任务设置</div>'+
					'<div class="panel-body collapse in" id="serviceSetting">';
		//__p += '<a class="btn btn-sm btn-block btn-primary js-serviceSetting" type="webService">webservice设置</a><br/>';
		__p += '<input type="text"  data-rv-input="model.serviceJson.methodName"  class="form-control" readOnly="readOnly"/><br/>';
		__p += '<table class="table table-form">';
		__p += '<tr>';
		__p += '<td><a class="btn btn-sm btn-block btn-primary js-serviceSetting" type="restService">rest设置</a></td>';
		__p += '<td><a class="btn btn-sm btn-block btn-primary js-serviceSetting-clean">清空</a></td>';
		__p += '</tr>';
		__p += '</table>';
		__p += '</div>';
	}
	return __p
};	

/**
 * 编辑-催办设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/reminder"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p+='<div class="panel-heading row" data-toggle="collapse" data-target="#reminder">'+
				'<div class="pull-left">催办设置</div>'+
				'<div class="pull-right">'+
					'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-add-reminder"><i class="fa fa-add"></i>添加催办</a>'+
					'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-clean-reminder"><i class="fa fa-remove"></i>清空催办</a>'+
				'</div>'+
			'</div>';
		
		__p +='<div class="panel-body collapse in" id="reminder">';
		__p += '<table class="table table-bordered table-striped">';
		__p += '<thead>';
		__p += '<th>催办名称</th>';
		__p += '<th width="20%">管理</th>';
		__p += '</thead>';
		
		if (rf.get("reminders") && rf.get("reminders").length >0 ) {
			_.each(rf.get("reminders"),function(g,i){
				__p += '<tr class="reminders">';
				__p += '<td>'+g.name+'</td>';
				__p +='<td >'+
							'<a class="btn btn-info btn-sm fa fa-edit js-edit-reminder" title="编辑"></a>'+
					        '<a class="btn btn-danger btn-sm fa fa-delete js-remove-reminder" title="删除"></a>'+
				       '</td>';
				__p += '</tr>';
			});
		}else{
			__p += '<tr>';
			__p += '<td colspan="2">暂无催办设置</td>';
			__p += '</tr>';
		}
		
		__p += '</table>';
		__p += '</div>';
	}
	return __p
};	

/**
 * 编辑-触发新流程设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/trigerFlow"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p+='<div class="panel-heading row" data-toggle="collapse" data-target="#trigerFlow">'+
				'<div class="pull-left">触发流程设置</div>'+
				'<div class="pull-right">'+
					'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-add-trigerFlow"><i class="fa fa-add"></i>添加流程</a>'+
					'<a href="javascript:void(0)" class="btn btn-xs btn-primary js-clean-trigerFlow"><i class="fa fa-remove"></i>清空流程</a>'+
				'</div>'+
			'</div>';
		
		__p +='<div class="panel-body collapse in" id="trigerFlow">';
		__p += '<table class="table table-bordered table-striped">';
		__p += '<thead>';
		__p += '<th>流程名称</th>';
		__p += '<th>触发动作</th>';
		__p += '<th width="30%">管理</th>';
		__p += '</thead>';
		
		if (rf.get("trigerFlows") && rf.get("trigerFlows").length >0 ) {
			_.each(rf.get("trigerFlows"),function(g,i){
				__p += '<tr class="trigerFlows">';
				__p += '<td>'+g.trigerFlowName+'</td>';
				__p += '<td>'+g.actionName+'</td>';
				__p +='<td >'+
							'<a class="btn btn-info btn-sm fa fa-cog js-setting-trigerFlow" title="设置"></a>'+
							'<a class="btn btn-info btn-sm fa fa-edit js-edit-trigerFlow" title="编辑"></a>'+
					        '<a class="btn btn-danger btn-sm fa fa-delete js-remove-trigerFlow" title="删除"></a>'+
				       '</td>';
				__p += '</tr>';
			});
		}else{
			__p += '<tr>';
			__p += '<td colspan="3">暂无流程设置</td>';
			__p += '</tr>';
		}
		
		__p += '</table>';
		__p += '</div>';
	}
	return __p
};

/**
 * 编辑-消息任务点设置
 */
this["BpmDefinitionBuilder"]["templates"]["edit/messageSetting"] = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __e = _.escape;
	with (obj) {
		__p +=' <div class="panel-heading" data-toggle="collapse" data-target="#messageSetting">消息任务设置</div>'+
					'<div class="panel-body collapse in" id="messageSetting">';
		__p +='<table class="table table-form">'+
		'<tr>'+
		'<th>通知类型:</th>'+
		'<td>';
		_.each(BpmDefinitionBuilder.MESSAGE_TYPES,function(g,i){
			__p +=' <label class="checkbox-inline">'+
				' <input type="checkbox" class="ibps"     data-rv-checkedarraystr="model.notifyType" value="'+g.type+'" />'+
				' <span class="lbl">'+g.title+'</span>'+
			' </label>';
		});
		__p +='</td>'+
	'</tr>'+

	'<tr>'+
		'<th  >主题/标题:</th>'+
		'<td colspan="2">'+
			'<input type="text"  data-rv-input="model.subject"  class="form-control"/>'+
		'</td>'+
	'</tr>'+

	'<tr>'+
		'<th colspan="2" " class="text-left" ><div class="pull-left">接收人:</div>'+
			'<div class="pull-right"><a href="javascript:void(0)" class="btn btn-xs btn-primary js-add-user" ><i class="fa fa-add"></i>添加人员</a></div>'+
		'</th>'+
	'</tr>'+
	'<tr>'+
		'<td colspan="2"><div>'+
		'<table class="table table-bordered table-striped">'+
			'<thead>'+
				'<th style="width: 20px;">序号</th>'+
				'<th style="width: 100px;">条件</th>'+
				'<th  width="80px">批次</th>'+
				'<th  width="90px">管理</th>'+
			'</thead>';
		 if (rf.get("users") && rf.get("users").length >0 ) { ;
		 		__p += '<tr class="users"   data-rv-each-user="model.users">';
					__p +='<td  data-rv-text="user:$index" style="width: 20px;"></td>';
					__p +='<td  data-rv-text="user:description" style="width: 100px;"></td>';
					__p +='<td><input type="number" class="form-control" data-rv-input="user:groupNo" style="width: 70px" /></td>';
					__p +='<td >'+
								'<a class="btn btn-info btn-sm fa fa-edit js-edit-user" title="编辑"></a>'+
						        '<a  class="btn btn-danger  btn-sm fa fa-delete   js-remove-user"  title="删除"></a>'+
					       '</td>';
				__p +='</tr>';
		 } else{;
			 __p += '<tr>'+
					'<td colspan="4">'+
					     '暂无设置人员'+
					'</td>'+
				'</tr>';
		 };	
		__p+='</table></div></td>'+

	'<tr>'+
	'<th colspan="2" class="text-left">富文本内容:</th>'+
	'</tr>'+
	'<tr>'+
		'<td colspan="2">'+
			'<script data-name="html"   data-toggle="editor" id="html"class="editor" type="text/plain"  style="width:100%;height:100px;"></script>'+
		'</td>'+
	'</tr>'+
	'</tr>'+
		'<th colspan="2" " class="text-left" >普通文本内容(一般用于短信类型):</th>'+
	'</tr>'+
	'<tr>'+
		'<td colspan="2">'+
				' <textarea rows="5" cols="30"  data-rv-input="model.plainText" class="form-control"></textarea>'+
		'</td>'+
	'</tr>';

		
	__p += '</table></div>';
	}
	return __p
};	