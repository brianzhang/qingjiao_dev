/**
 * 用户上下级弹出框
 * 
 * <pre>
 * 作者：caijj
 * 邮箱：48847557@qq.com
 * 日期：2016-11-27 9:22:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var userGradeDialog;
var data = frameElement.dialog.params;
$(function() {
	userGradeDialog  = new UserGradeDialog();
	userGradeDialog.init();
});

(function() {
	//定义常量
	var consts = {
		GRID : "#userGradeGrid"
	};
	/**
	 * 
	 * @returns {UserGradeDialog}
	 */
	UserGradeDialog = function() {
		//定义属性
		this.defId=data.defId;
		this.nodeId=data.nodeId;
	};

	/**
	 * 方法
	 */
	UserGradeDialog.prototype = {
		consts:	consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//
				this._init();
		},
		/**
		 * 初始表单
		 */
		_init : function() {
			var me= this;
			
			var rt = this.ruleTable= $(this.consts.GRID);
			this.ruleTable.jqGrid(	{
				datatype : "json",
				width: this.ruleTable.parent().width(), 
				height: "15em", 
				shrinkToFit : true,
				viewrecords : true,
				colNames: ['gradeid','上下级','级数','是否负责人','管理'],
		        colModel: [ {
                 	   	name:'gradeid',
               	 		hidden:true,
               	 		key:true
                	 },{
                 	   name:'graderel',
                 	   formatter:function(val,row,idx){
   							var sels=[{key:'s',val:'同级'},
   							          {key:'u',val:'上级'},
   							          {key:'d',val:'下级'}];
   							var rs = "<select name='graderel'>";
   							for(var ix=0;ix<sels.length;ix++){
   								var itm = sels[ix];
   								var seled = (itm.key==idx.graderel)?"selected='selected'":"";
   								rs+= "<option value='"+itm.key+"' "+seled+">"+itm.val+"</option>";
   							}
   							rs += "</select>";
   							return rs;
   						}
                	 },{
                 	   name:'grade',
                 	   formatter:function(val,row,idx){
                 		   var rs="<input name='grade' value='"+idx.grade+"'>";
                 		   return rs;
                 	   }
                	 },{
						name : 'principal',
						formatter:function(val,row,idx){
							var sels=[{key:'Y',val:'是'},
   							          {key:'N',val:'否'}];
   							var rs = "<select name='principal'>";
   							for(var ix=0;ix<sels.length;ix++){
   								var itm = sels[ix];
   								var seled = (itm.key==idx.principal)?"selected='selected'":"";
   								rs+= "<option value='"+itm.key+"' "+seled+">"+itm.val+"</option>";
   							}
   							rs += "</select>";
   							return rs;
                 	   }
                	 },{
						name : '__manage',
						label:'管理',
						width : '80',
						sortable:false,
						classes:'rowOps',
						formatter : 'manage',
						formatoptions :[{
							label:'',
							classes:'btn btn-sm btn-danger fa fa-delete',
							click:"javascript:userGradeDialog._delSetting('{gradeid}')"
						}]
				} ]
			});
			
			if(data.initData){
				var rs = JSON2.parse(data.initData);
				var source = rs.source;
				var settings = rs.settings;
				for(var ix=0;ix<settings.length;ix++){
					var setting = settings[ix];
					this.ruleTable.jqGrid("addRowData",  setting["gradeid"], setting, "last");
				}
				
				$("#"+source).attr("checked", true);
				
				if(source == 'node'){
					$("input#nodeId1").val(rs.nodeId);
					$("input#nodeName1").val(rs.nodeName);
				}else{
					$("#nd").hide();
				}
			}else{
				$("#nd").hide();
			}
			
			$('input[name=source]').on("change",function(){
				me._changeRadio(this);
			});
		},
		
		/**
		 * 改变组来源
		 */
		_changeRadio:function(obj){
			if('node' == $(obj).val()){
				$("#nd").show();
			}else{
				$("#nd").hide();
			}
			
			$('#nodeId1').val('');
			$('#nodeName1').val('');
		},
		
		addSetting : function(){
			var setting = {
				gradeid:new Date().getTime(),
				graderel:'s',
				grade:1,
				principal:'Y'
			};
		
			this.ruleTable.jqGrid("addRowData",  setting["gradeid"], setting, "first");
		},
		
		_getNode : function(obj){
			var trObj =$("#nd");
			var node = {};
			var nodeIdVal = trObj.find("#nodeId1").val();
			if(nodeIdVal){
				node.nodeId = nodeIdVal;
				node.nodeName = trObj.find("#nodeName1").val();
			}
			
			var url=__ctx+'/platform/bpmn/bpmNodeDef/nodeDef/sameNodeDialog.htm?defId='+this.defId+'&nodeId='+this.nodeId;
			var title="相同节点执行人";
			var callback=function(data){
				 trObj.find("#nodeName1").val(data.nodeName);
				 trObj.find("#nodeId1").val(data.nodeId);
			 };
			 
			 DialogUtil.dialog({
				   content: url,
				   params: node,
				   title:title,
				   area:['35%', '30%'] ,
				   btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						   var  data = DialogUtil.getChildFrameWindow(index).getData();
						   if(data){
							  if(callback){
								  callback.call(this,data); 
							  }
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
		},
		
		_delSetting : function(id){
			this.ruleTable.jqGrid("delRowData", id);
		}
		
	};
})();

/**
 * 获取数据
 */
 function getData(){
	 var retultData={};
	 var source = $('input[name="source"]:checked').val();
	 var sourceText = $('#'+source+'Text').text();
	 retultData["source"]=source;
	 
	 var rts = $("#userGradeGrid").jqGrid("getRowData");
	 if(rts.length==0){
		DialogUtil.toastr("请添加上下级设置");
		return;
	 }
	 var settings = [];
	 $("#userGradeGrid").find("tr").each(function(ix){
		 var me = this;
		 if(ix!=0){
			 var setting = {
				gradeid:$(me).find("td:first-child").text(),
			 	graderel:$(me).find("select[name=graderel]").val(),
			 	grade:$(me).find("input[name=grade]").val(),
			 	principal:$(me).find("select[name=principal]").val()
			 };
			 settings.push(setting);
		 }
	 });
	 
	 if(source == 'node'){
		var nodeName=$("input#nodeName1").val();
		var nodeId=$("input#nodeId1").val();
		retultData["nodeId"]=nodeId;
		retultData["nodeName"]=nodeName;
		sourceText = sourceText+"["+nodeName+"]";
		if(!nodeId || '' == nodeId){
			  DialogUtil.toastr("请指定节点！");
	  		  return;
		 }
	}
	 
	 retultData["settings"]=settings;
	 retultData["description"]=sourceText;
	 return retultData;
 }

