/**
 * 数据模版设计
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-07 15:42:57
 *</pre>
 */
$(function() {
	dataTemplateSettingField = new DataTemplateSettingField();
	dataTemplateSettingField.init();
});

(function() {
	//定义常量
	var 	_consts = {
			TREE_ID : 'datasetTree',// 树
	},me;
	var DataTemplateFieldMode,DataTemplateFieldView;
	
	DataTemplateSettingField = function() {
		this.boTree = null;
	};

	/**
	 * 方法
	 */
	DataTemplateSettingField.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			me = this;
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			var datasetJson = $("#data").val();
			if($.isEmpty(datasetJson)){
				var params=  frameElement.dialog.params;
				this.datasets = params.datasets;
			}else{
				this.datasets = JSON.parse(datasetJson);
			}
		
			
			this.initFields();
		
			//初始化布局
			this._initLayout();
			
			this._initScroll();
			
			this.initDatasetTree();
			
			//字段类型
			FieldTypeSetting.initBindEvents();
			
		},
		
		initDatasetTree:function(){
			var me =this;
			var setting = {
				async: {enable: false},
				data: {
					key:{name:"label"},
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "parentId",
						rootPId:me._treeRootId
					}
				},
				view: {
					selectedMulti: false,
					showIconFont:true
				},
				callback:{
					onClick: function(e, treeId, treeNode) {
						me.treeOnLeftClick.apply(me,arguments);
					},
					onRightClick :function(e,treeId, treeNode) {
//							me.treeOnRightClick.apply(me,arguments);
					}
				}
			};
			
			me.datasetTree=$.fn.zTree.init($("#datasetTree"), setting,this.datasets);
			me.datasetTree.expandAll(true);
		},
		treeOnLeftClick:function(e, treeId, treeNode){
			//进来之前先跟下之前的数据
			this.setBeforeFieldData();
			
			$("#emptyField").hide();
			$("#fieldEdit").show();
			if(treeNode.attrType =='column'){
				$("#fieldTypeGroup").show();
				//初始化控件类型
				FieldTypeSetting.initFieldTypeOptions(treeNode.type);
			}else{
				$("#fieldTypeGroup").hide();
			}
			
			this.fieldId = treeNode.id;
			this.treeNode = treeNode;
			this.initData(this.response_fields[treeNode.id],treeNode);
		},
		setBeforeFieldData:function(){
			if($.isEmpty(this.fieldId))
				return;
			var label = $('#label').val(),
				fieldType = $('#fieldType').val(),
				response_field = this.response_fields[this.fieldId];
			if($.isEmpty(response_field))
				return;
			response_field.label = label;
			response_field.field_type = fieldType;

			var  fieldOptions =  FieldTypeSetting.getFieldOptions(fieldType) ;
			if($.isNotEmpty(fieldOptions))
				response_field.field_options = fieldOptions;
			
			this.response_fields[this.fieldId]  = response_field;
		
			//更新树名称
			this.treeNode.label = label;
			this.datasetTree.updateNode(this.treeNode);
			
		},
		initData:function(data,treeNode){

			$('#label').val(data.label);
			
			//如果为空给个默认的控件
			var fieldType = data["field_type"];
			if($.isEmpty(fieldType))
				data["field_type"] = 'text';
			
			FieldTypeSetting.setData(data);
		},
		/**
		 * 初始化布局
		 */
		_initLayout:function(){
			var layout = $('body').layout({
				applyDefaultStyles : true,
				west: {
					size:					250
				},
				onresize : function() {
				}
			});
			//布局加载完成初始化
			$(".layout-header").removeClass("hidden");
			$(".tb-tabs").removeClass("hidden");
			
			var height = $(window).height();
			$(".niceScroll").height(height-40);
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
		initFields:function(){
			var rf, _i, _len,_ref;
			_ref = this.datasets;
			this.response_fields = {};
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				rf = _ref[_i];
			   	this.response_fields[rf.id] = rf;
			}
		},
		getData:function(){
			this.setBeforeFieldData();
			var data =  [];
			for (var rf in this.response_fields) {
				data.push(this.response_fields[rf]);
			}
			return data;
		},
		reset:function(){
			return this.datasets;
		}
		
	};
	

})();