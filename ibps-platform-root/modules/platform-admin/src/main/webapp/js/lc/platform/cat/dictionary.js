/**
 * 数据字典
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-19 14:17:32
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var dictionary ;
$(function() {
	dictionary  = new Dictionary();
	dictionary.init();
	
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : '#dictionaryGrid',// 表单ID
			PAGER : '#dictionaryPager',//分页ID
			FORM : '#dictionaryForm'// 表单form
	};
	/**
	 * 数据字典 对象
	 * @returns {Dictionary}
	 */
	Dictionary = function() {
		//定义属性
		this.dictId=$("#dictId").val();
		this.typeId = $("#typeId").val();
	};

	/**
	 * 方法
	 */
	Dictionary.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 
				this._initGridList();
			if ($(this.consts.FORM).length > 0)// 
				this._initForm();
		},
		
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this
				,_url = __ctx+'/platform/cat/dictionary/listJson.htm?Q^TYPE_ID_^S='+this.typeId
				,__url = encodeURI(_url);
			
			this.$grid = $(this.consts.GRID).GridList(
					{
						url :  __url,
						pager :this.consts.PAGER,
						treeGrid: true,
						treedatatype:'json',
			            treeGridModel: 'adjacency',
					    ExpandColumn : 'name',
						colNames: ['字典对照值','id','字典对照码', '结构类型'],
				        colModel: [{
			                name: 'name',
			                sortable:false,
			                width: 90
			            },{
	                        name: 'id',
	                        index: 'ID_',
	                        hidden:true,
	                        key:true
			             },{
			                name: 'key',
			                sortable:false,
			                width: 60
			            },{
			                name: 'struType',
			                hidden:true
			            }],
			            treeReader : {  
			                parent_id_field: "parentId",
			                level_field: "level",  
			                leaf_field: "leaf", 
			                loaded:"loaded",
			                icon_field:"ui-icon-volume-on",
			                expanded_field: "expanded" 
			              }
	
					});
			
			$(document).on("click","#addDictionary",function(e){
				me._addDict(true);
			});
			$(document).on("click","#editDictionary",function(e){
				me._addDict(false);
			});
			$(document).on("click","#delDictionary",function(e){
				me._delDict();
			})
		},
		
		/**
		 * 添加或者编辑数据字典
		 * @param isAdd
		 * @returns {Boolean}
		 */
		_addDict : function(isAdd){
			var me = this;
			var url = __ctx+"/platform/cat/dictionary/edit.htm",
			id = me._getGridCheckedId();
			if(isAdd){
				if(!id || id.length == 0){
					id=this.typeId;
				}else{
					//如果选中一行，判断是否是平铺，平铺则设置父节点为分类id,树类型的则为选中数据的id
					data =  me._getGridData(id);
					if(data && data.struType==0){
						id=this.typeId;
					}
				}
				url +="?parentId="+id+"&typeId="+this.typeId;
			}else{
				if(!id || id.length == 0){
					DialogUtil.toastr('请选择记录!');
					return false;
				}
				url +="?id="+id;
			}
			
			//window.location.href = url;
			DialogUtil.dialog({
				   content: url,
				   title:"数据字典",
				   area: ['60%', '55%'],
				   btn: [{
					   label:'确定',
					   iconCls : 'btn btn-primary fa fa-ok',
					   action:function(dialog,index){
						  var  data = DialogUtil.getChildFrameWindow().getDicData();
						  if(data.length>0){
								var url=__ctx +'/platform/cat/dictionary/save.htm';		
								var params = {dictionary:data};
								var loading = DialogUtil.load("保存中...");
								$.ajax({
									url: url,
									data: params,
									type: "POST",
									success: function(responseText){
										var resultMessage = new com.lc.form.ResultMessage(responseText);
										me.$grid.trigger('reloadGrid');
										DialogUtil.toastr(resultMessage.getMessage(),true);
										DialogUtil.close(index);
										DialogUtil.close(loading);
									},
									error: function(responseText){
										var resultMessage = new com.lc.form.ResultMessage(responseText);
										DialogUtil.close(loading);
										DialogUtil.error(resultMessage.getMessage());
									}
								});
			
						  }
					   }
				   },
				   {
					   label:'取消',
					   iconCls : 'btn btn-danger fa fa-cancel',
					   action:function(dialog,index){
						   me.$grid.trigger('reloadGrid');
						   DialogUtil.close(index);
					   }
				   }
				]
			})
		},
		
		/**
		 * 获取选中单行数据行ID
		 * @returns
		 */
		_getGridCheckedId : function() {
			return this.$grid.jqGrid('getGridParam','selrow');
		},
		/**
		 * 根据id获取对应的数据
		 * @param id
		 * @returns
		 */
		_getGridData : function(id){
			return this.$grid.jqGrid('getRowData',id);
		},
		
		/**
		 * 删除数据字典
		 * @returns {Boolean}
		 */
		_delDict : function(){
			var me = this;
			var url = __ctx+"/platform/cat/dictionary/remove.htm",
			id = me._getGridCheckedId();
			if(!id || id.length == 0){
				DialogUtil.toastr('请选择记录!');
				return false;
			}
			url +="?id="+id;
			DialogUtil.confirm('确认删除吗？',function(rtn){
				if(!rtn)
					return;
				$.post(url, function(responseText){
				    var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.toastr( '删除成功！',true);
				  		me.$grid.trigger('reloadGrid');
				    } else {
				    	DialogUtil.toastr( '删除失败！'+resultMessage.getMessage(),true);
				    }
				});
			});
		
		},
		
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
		
		},
	};
})();

function getDicData(){
	var form = $(dictionary.consts.FORM), frm = form.form();
	if (!frm.valid()){
		DialogUtil.toastr("验证失败，请检查!");
		return "";
	}
	
	var id = $("[name='id']").val();
	var typeId = $("[name='typeId']").val();
	var parentId = $("[name='parentId']").val();
	var name = $("[name='name']").val();
	var key = $("[name='key']").val();
	var sn = $("[name='sn']").val();
	
	if(undefined == parentId || null == parentId || "" == parentId){
		DialogUtil.warn("父节点ID为空！");
		return "";
	}
	
	var data={
			id : id,
			typeId : typeId,
			parentId : parentId,
			name : name,
			sn : sn,
			key : key
	}
	return JSON2.stringify(data);
}