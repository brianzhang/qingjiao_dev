
/**
 * 触发新流程
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-23 19:01:23
 *</pre>
 */
$(function() {
	bpmTrigerFlow  = new BpmTrigerFlow();
	bpmTrigerFlow.init();
	
	formUrl = bpmTrigerFlow.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmTrigerFlowGrid",// 列表对象
			PAGER : "#bpmTrigerFlowPager",// 列表分页
			FORM : '#bpmTrigerFlowForm'// 表单form
	};
	/**
	 * 触发新流程 对象
	 * @returns {BpmTrigerFlow}
	 */
	BpmTrigerFlow = function() {
		//定义属性
		this.data = {};
	};

	/**
	 * 方法
	 */
	BpmTrigerFlow.prototype = {
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
				this._initProcDefAdd();
				this._initSrcForm();
				this._initDestForm();
				this._initDropForm();
				this.initParam();
			}
		},
		initParam : function(){
			// 初始化子表
			if(this.data.bpmTrigerParamPoList){
				var attrs = this.data.bpmTrigerParamPoList;
				if($.isNotEmpty(attrs)){
					this.fillDestAttrs("initDroppableTemplate", attrs);
				}
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/bpmn/bpmTrigerFlow/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','流程定义ID','节点ID','触发流程Key','触发动作','触发类型','调用启动页面','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'ID_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'defId',
				                	   index: 'DEF_ID_'

				                	 					                	 	}, {
				                 	   name:'nodeId',
				                	   index: 'NODE_ID_'

				                	 					                	 	}, {
				                 	   name:'trigerFlowKey',
				                	   index: 'TRIGER_FLOW_KEY_'

				                	 					                	 	}, {
				                 	   name:'action',
				                	   index: 'ACTION_'

				                	 					                	 	}, {
				                 	   name:'trigerType',
				                	   index: 'TRIGER_TYPE_'

				                	 					                	 	}, {
				                 	   name:'callStartPage',
				                	   index: 'CALL_START_PAGE_'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/bpmn/bpmTrigerFlow/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/bpmn/bpmTrigerFlow/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/bpmTrigerFlow/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		
		_initProcDefAdd:function(){
			var me = this;
			
			// procDefName
			var proc = $("#flowSelector");
			var options = proc.data();

			// 绑定点击事件
			$("#flowSelector").on("click", function(){
				me.clickEvent(options);
			});
			
			$(options.name).on("click", function(){
				me.clickEvent(options);
			});
			
			me.clear($("#flowClear"));
		},
		
		clickEvent:function(options,callback){
			var  type = options.type,
					isSingle = $.isEmpty(options.single)?true:(options.single=='true' || options.single==true?true:false),
					key=options.key,
					name=options.name;
			var keyVal = $(key).val(),nameVal = $(name).val(),
				data=[];
			
			new BpmDefinitionDialog({
				isSingle:isSingle,
				callback:function(data,index){
					if($(key).length > 0){
						$(key).val(data[0].defKey);
					}
					$(name).val(data[0].name);
					if(callback)
						callback(data);
					DialogUtil.close(index);
				}
			}).show();
		},
		
		clear:function($this){
			var options = $this.data(),
				key=options.key,
				name=options.name;
			// 点击事件
			$this.click(function() {
				if($(key).length > 0 ) $(key).val('');
				if($(name).length > 0 ) $(name).val('');
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
				var ds = me.formUrl.getValue();
				var rs = $("#destAttr").find(".droppable");
				var dataMappingDetail = new Array(0);
				rs.each(function(idx,elm){
					var itm = {};
					itm.destAttr = $(elm).find(".destAttr")[0].innerText;
					itm.destAttrName = $(elm).find(".destAttrName")[0].innerText;
					
					var mapping = $(elm).find(".mapping")[0].innerText.split(" ");
					itm.srcAttr = mapping[1]!=null?mapping[1]:"";
					itm.srcAttrName = mapping[2]!=null?mapping[2]:"";
					if("" != itm.srcAttr){
						dataMappingDetail.push(itm);
					}
				});
				ds.bpmTrigerParamPoList=dataMappingDetail;
				if(me.formUrl.validate()){
					me.formUrl.submit2($("#bpmTrigerFlowForm"),ds,me._showResponse);
				}
			});
		},
		
		fillSrcAttrs : function(procDefId){
			$.ajax({
				url : __ctx+"/platform/bpmn/bpmTrigerFlow/srcRead.htm",
				data : {
					defId:procDefId
				},
				type : "post",
				async : false,
				success : function(rs){
					var msg = new com.lc.form.ResultMessage(rs);
					if (msg.isSuccess()) {
						$("#srcAttr").empty();
						var attrs = msg.getVar("attrs");
						attrs = JSON.parse(attrs);
						if($.isEmpty(attrs)){
							$("#srcWarnMessage").html(msg.getMessage());
							return;
						}
						var html = template("draggableTemplate", {fields:attrs});
						$("#srcAttr").append(html);
						$(".draggable").draggable({
							revert: false, 
							helper: "clone"
						});
					} else {
						DialogUtil.error(msg.getMessage());
					}
					$("#srcWarnMessage").html("");
				}
			});
		},
		
		/**
		 * 初始化源数据属性
		 */
		_initSrcForm : function() {
			var me = this;
			
			$(document).on('click', 'a.srcRead', function() {
				var procDefId = $("#procDefId").val();
				if(procDefId==""){
					DialogUtil.warn("主流程定义ID不能为空");
					return;
				}
				me.fillSrcAttrs(procDefId);
			});
		},
		
		fillDestAttrs : function(temp, attrs){
			$("#destAttr").empty();
			var html = template(temp, {fields:attrs});
			$("#destAttr").append(html);
			$(".droppable").droppable({
				drop: function(a,b) {
					var mapping = $(this).find(".mapping");
					mapping.empty();
					var drapHtml = b.draggable[0].innerHTML;
					drapHtml+='<label class="search-label fa fa-remove" style="width:1em;color:red;" onclick="bpmTrigeerFlow._delDestAttr(this)"></label>';
					mapping.append(drapHtml);
				}
			});
		},
		
		/**
		 * 初始化目标数据属性
		 */
		_initDestForm : function() {
			var me = this;

			$(document).on('click', 'a.destRead', function() {
				var procDefKey = $("#procDefKey").val();
				
				if(procDefKey==""){
					DialogUtil.warn("目标流程定义key不能为空");
					return;
				}
				
				$.ajax({
					url : __ctx+"/platform/bpmn/bpmTrigerFlow/destRead.htm",
					data:{
						defKey:procDefKey
					},
					type : "post",
					async : false,
					success : function(rs){
						var msg = new com.lc.form.ResultMessage(rs);
						if (msg.isSuccess()) {
							var attrs = msg.getVar("attrs");
							attrs = JSON.parse(attrs);
							if($.isEmpty(attrs)){
								$("#destWarnMessage").html(msg.getMessage());
								return;
							}
							me.fillDestAttrs("droppableTemplate", attrs);
						} else {
							DialogUtil.error(msg.getMessage());
						}
						$("#destWarnMessage").html("");
					}
				});
			});
		},
		/**
		 * 初始化目标数据属性
		 */
		_initDropForm : function() {
			var me = this,procDefId = $("#procDefId").val();
			if(procDefId!=""){
				me.fillSrcAttrs(procDefId);
			}
			
			var nodeId = $("#nodeId").val();
			var procDefKey = $("#procDefKey").val();
			
			if(procDefKey != ""){
				$.ajax({
					url : __ctx+"/platform/bpmn/bpmTrigerFlow/destRead.htm",
					data : {
						defKey:procDefKey
					},
					type : "post",
					async : false,
					success : function(rs){
						var msg = new com.lc.form.ResultMessage(rs);
						if (msg.isSuccess()) {
							var attrs = msg.getVar("attrs");
							attrs = JSON.parse(attrs);
							if($.isEmpty(attrs)){
								$("#destWarnMessage").html(msg.getMessage());
								return;
							}
							me.fillDestAttrs("droppableTemplate", attrs);
						} else {
							DialogUtil.error(msg.getMessage());
						}
						$("#destWarnMessage").html("");
					}
				});
			}
		},
		_delDestAttr:function(o){
			var mapping = $(o).parent()
			mapping.empty();
			mapping.append("&nbsp;");
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
				this.data = data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		getData : function(){
			var actionName = $("[name='m:bpmTrigerFlow:action']").find("option:selected").text();
			var data = this.formUrl.getValue();
			data.actionName = actionName;
			
			var rs = $("#destAttr").find(".droppable");
			var dataMappingDetail = new Array(0);
			rs.each(function(idx,elm){
				var itm = {};
				itm.destAttr = $(elm).find(".destAttr")[0].innerText;
				itm.destAttrName = $(elm).find(".destAttrName")[0].innerText;
				
				var mapping = $(elm).find(".mapping")[0].innerText.split(" ");
				itm.srcAttr = mapping[0]!=null?$.trim(mapping[0]):"";
				itm.srcAttrName = mapping[1]!=null?$.trim(mapping[1]):"";
				dataMappingDetail.push(itm);
			});
			data.bpmTrigerParamPoList=dataMappingDetail;
			
			return data;
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
							window.location.href = __ctx+'/platform/bpmn/bpmTrigerFlow/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


