/**
 * 流程定义选择器
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	bpmDefineSelector = new BpmDefineSelector();
	bpmDefineSelector.init();
});


(function() {
	var template = '<span class="attach-span" bpmdefid="#bpmdefid#" bpmdefname="#bpmdefname#" bpmdefkey="#bpmdefkey#">' +
					'<span title="#bpmdefname#">#bpmdefname#</a>' +
					'&nbsp;' +
					'<a class="btn btn-ms" title="移除" href="javascript:bpmDefineSelector.remove(\'#bpmdefid#\');"><i class="fa fa-remove"></i></a>' +
					'</span>'+
				'</span>';
	
	// 定义常量
	var _consts = {
		GRID : "#bpmDefineGrid",// 列表对象
		PAGER :'#bpmDefinePager',
		IDKEY:"defId",KEY:"defKey"
	};
	/**
	 *  流程定义 对象
	 * 
	 * @returns {BpmDefineSelector}
	 */
	BpmDefineSelector = function() {
		this.grid =$(this.consts.GRID);
	};

	/**
	 * 方法
	 */
	BpmDefineSelector.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			
			this.hasInit = true;
			//初始参数
			var params = frameElement.dialog.params;
			this.isSingle = params.isSingle;
			this.data = params.params;
			
			this._initGridList();
			this._initData()
			this._initBpmDefContainer();
		},
		_initBpmDefContainer : function(){
			if(!this.isSingle){
				$("div[name='bpmDef_container']").height("80px");
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			var url = __ctx+'/platform/bpmn/bpmDefine/listJson.htm';
			if(!$.isEmpty(this.data)){
				if(typeof(this.data.formKey)!="undefined"){
					url += '?formKey='+this.data.formKey;
				}else if(typeof(this.data.boId)!="undefined"){
					url += '?boId='+this.data.boId;
				}
			}
			
			this.grid.GridList({
							url :  url,
							pager :this.consts.PAGER,
							colNames: ['流程定义ID','流程名称','流程业务主键','创建时间'],
							colModel : [
									{
								  	   name:'defId',
				                	   index: 'def_id_',
										hidden : true,
										key : true
									},{
						             	name:'name',
					                	index: 'name_',
									}, {
				                 	   name:'defKey',
				                	   index: 'def_key_',
				                	   width : 60
				                	 }, {
				                 	  name:'createTime',
				                	   index: 'create_time_',
				                	   formatter: 'timestamp'
				                	 }],
									multiboxonly:this.isSingle,
									onSelectAll : function(rowids, status) {
										me.onSelectAll(rowids,status);
									},
									onSelectRow : function(rowid, status) {
											me.onSelectRow(rowid,status);
									},
									loadBeforeSend : function() {
										if(me.isSingle){
											$('#cb_bpmDefineGrid').hide();
										}
									}
						});
			
		},
		onSelectAll : function(rowids, status) {
			for (var i = 0; i < rowids.length; i++) {
				this.onSelectRow(rowids[i], status);
			}
		},
		onSelectRow : function(rowid, status) {
			var grid = this.grid,
				data = grid.jqGrid("getRowData", rowid);
				id= data[this.consts.IDKEY];
			if (status) {//选中
				this.add(data);
			} else {//取消选中
				this.remove(id);
			}
		},
		add:function(data){
			var records = $("span.attach-span");
			if(this.isSingle){
				if(records.length == 1)
					$(records[0]).remove();
			}
			for(var i=0;i<records.length;i++){
				if($(records[i]).attr("bpmdefid")==data[this.consts.IDKEY]){
					return; 
				}
			}
			// 
			var html = this.getHtml(data);
			$("div[name='bpmDef_container']").append($(html));
		},
		remove:function(id){
			var obj = $("span[bpmdefid='"+id+"']");
			obj.remove();
		},
		clearSelect:function(){
			var me = this;
			me.grid.trigger("reloadGrid");
		},
		/**
		 * 初始数据
		 */
		_initData:function(){
			if($.isEmpty(this.data))
				return;
			for(var i=0,c;c=this.data[i++];){
				this.add(c);
			}
		},
		getHtml:function(data){
			 var str ="";
				var id=data[this.consts.IDKEY], name=data.name, key=data[this.consts.KEY],
					tmp=template.replaceAll("#bpmdefid#", id).replaceAll("#bpmdefname#",name).replaceAll("#bpmdefkey#",key);
				str+=tmp;
			return str;
		},
		/**
		 * 回调获取数据
		 * @returns {Array}
		 */
		getData:function(){
			var me = this;
			var data = $("span.attach-span");
			var aryData=[];
			$.each(data, function(i, n){
				var obj = {defId:$(n).attr("bpmdefid"), name:$(n).attr("bpmdefname"), defKey:$(n).attr("bpmdefkey")};
				aryData.push(obj);
			});
			return aryData;
		}
	};
	
})();