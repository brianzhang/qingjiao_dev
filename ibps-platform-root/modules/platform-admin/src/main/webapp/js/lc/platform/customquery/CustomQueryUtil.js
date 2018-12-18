/**
 * 自定义查询
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-4-7 10:40:48
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	customQueryShow = new CustomQueryShow();
	customQueryShow.init();
});

(function() {
	//定义常量
	var _consts = {
		GRID : "#customQueryGrid",// 列表对象
		PAGER : "#customQueryPager",// 列表分页
	}; ;
	/**
	 * 自定义对话框 对象
	 * @returns {CustomDialog}
	 */
	CustomQueryShow = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CustomQueryShow.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.data = frameElement.dialog.params;
			this.isSingle = this.data.selectNum==1?true:false;
			this.displayfield = eval('(' + this.data.resultfield + ')');
			this.resultfield= eval('(' + this.data.resultfield + ')') ;
			
			this.conditionfield= eval('(' + this.data.conditionfield + ')') ;
			for(var i=0;i<this.conditionfield.length;i++){
				if(this.conditionfield[i].paraCt=="2"){
					this.conditionfield[i].select = eval('(' + this.conditionfield[i].select + ')') ;
				}
			}
				this._initGridList();
				this._initCondition();
				
				$(document).on("click", ".toolbar-panel a.btn.fa-search", function(){
					GridList.search(this);
					$('#customQuery').empty();
					$('#help').hide();
					var obj = $("#customQueryGrid").jqGrid("getRowData");
					if(obj.length!=0)
						$('#customQuery').append(JSON2.stringify(obj));
					$('#customQuery').show();
				});
				$(document).on("click",".toolbar-panel a.btn.fa-help",function() {
					$('#customQuery').hide();
					$("#help").show();
				});
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this,id =this.data.id,colNames =[],colModel=[],colKey =[];
			function buildGridCols(c,hidden){
				var fieldName =c.fieldName,displayType =c.displayType;
				colNames.push(c.comment);
				var o = {
						name:fieldName,
						index:fieldName,
				};
				if(hidden){
					o. hidden=  true;
				}else{
					colKey.push(fieldName);
				}
				if(displayType == 'date'){//日期格式
					o.formatter =  'timestamp';
					o.formatoptions= me.getDateFormat(c.format);
				}else if(displayType == 'enum'){//枚举值
					o.formatter ="dataFormat";
					o.formatoptions = c.format;
				}
				colModel.push(o);
			}
			
			for(var i=0,c;c=this.resultfield[i++];){
				buildGridCols(c);
			}
			for(var i=0,c;c=this.resultfield[i++];){
				var fieldName =c.fieldName;
				if($.inArray(fieldName, colKey) < 0){
					buildGridCols(c,true);
				}
			}
		$(this.consts.GRID).GridList({url : __ctx+ '/platform/form/customQuery/doQuery.htm?id='+id,
						pager : this.consts.PAGER,
						colNames :colNames,
						colModel : colModel,
						multiboxonly:this.isSingle,
						loadBeforeSend : function() {
							if(me.isSingle)
								$('#cb_customQueryGrid').hide();
							$('#help').hide();
						}
					});
		},
		_initCondition:function(){
			var data = {
					list :this.conditionfield
			};
			var  html = template('conditionTem', data);
			$('#searchForm').append(html);
		},
		zTreeOnClick : function (){
			
		},
		zTreeOnCheck : function  (){
			
		},
		zTreeBeforeExpand :function (){
			
		},
		zTreeonAsyncSuccess : function (){
			
		},
		zTreeOnAsyncError :function (){
			
		},		
		getData:function(){
			var me= this, rtn =[];
			if(this.data.style==0){//列表
				var ids =	$(this.consts.GRID).jqGrid('getGridParam',"selarrrow");
				for(var i=0,a;a=ids[i++];){
					var data = $(this.consts.GRID).jqGrid('getRowData',a), obj={};
					for(var i=0,c;c=this.resultfield[i++];){
						var fieldName =c.fieldName;
						obj[fieldName] =  data[fieldName];
					}
					 rtn.push(obj);
				}
				return rtn ;
				
			}else{//返回树形
				if(this.isSingle){
					var nodes = this.dialogTree.getSelectedNodes();
					if(nodes.length<1){
						return -1;
					}
					var obj=new Object();
					var node=nodes[0];
					for(var i=0;i<this.resultfield.length;i++)	{
						var field=this.resultfield[i].fieldName;
						obj[field]=node[field];
					}
					return obj;
				}else{
					
					var aryRtn=new Array();
					var nodes = this.dialogTree.getCheckedNodes(true);
					if(nodes.length<1){
						return -1;	
					}
					
					for(var i=0;i<nodes.length;i++){
						var obj=new Object();
						var node=nodes[i];
						for(var j=0;j<this.resultfield.length;j++)	{
							var field=this.resultfield[j].fieldName;
							obj[field]=node[field];
						}
						aryRtn.push(obj);
					}
					return aryRtn;
					
				}
			}
		
		}
	};
})();
