/**
 * sql参数设置对话框
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017-10-11 22:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	datasetParamDialog = new DatasetParamDialog();
	datasetParamDialog.init();
});

(function() {

	// 定义常量
	var _consts = {
	};
	/**
	 * 参数定义 对象
	 * 
	 * @returns {DatasetParamDialog}
	 */
	DatasetParamDialog = function() {
	};

	/**
	 * 方法
	 */
	DatasetParamDialog.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			
			this.hasInit = true;
			this._initData();
			this._bind();
			
		},
		_bind : function(){
			var me = this;
			// 处理子表全选
			me._initChk();
			// 处理子表添加按钮
			$(document).on('click', 'table a.js-add-record', function() {
				var $table = $(this).parents().filter("table");
				var tableName = $($table).attr("name");
				// 表内编辑
				var templateId = tableName+":TrTemplate";
				var html = template(templateId, {idx : Math.ceil(Math.random()*10000000+1)});
				// 添加一行
				$(table).find("tbody").append(html);
				
				me._initChk();
			});
			// 处理子表删除按钮
			$(document).on('click', 'table a.js-remove-record', function() {
				var $table = $(this).parents().filter("table");
				me.removeSubSelected($table);
			});
			// 处理子表删除按钮
			$(document).on('click', 'table a.js-remove-row', function() {
				$(this).parents().filter("tr").remove();
			});
		},
		
		/**
		 * 表格全选
		 */
		_initChk : function(){
			var $table = $("table");
			$($table).each(function(){
				var $tabeName = $(this).attr("name");
				var $thead = $(this).find("thead");
				var $tbody = $(this).find("tbody");
				$(':checkbox[name="'+$tabeName+'"]', $thead).on('click',function(event){
					var $chkAll = $(this);
					var isChecked = $chkAll.is(':checked');
					var $chks = $(':checkbox[name="'+$chkAll.attr("name")+'"]', $tbody);
					$chks.each(function(){
						$(this).prop("checked", isChecked);
					});
				});
				$('tr', $tbody).on('click',function(event){
					//event.stopPropagation();
					var $chk = $(this).find(':checkbox[name="'+$tabeName+'"]');
					var isChecked = $chk.is(':checked');
					$chk.prop("checked", !isChecked);
				});
			});
		},
		
		add:function(data){
			var records = $("[name='dataset-span']");
			if(this.isSingle){
				if(records.length == 1)
					$(records[0]).remove();
			}
			for(var i=0;i<records.length;i++){
				if($(records[i]).data(this.pkKey)==data[this.pkKey]){
					return; 
				}
			}
			// 展示演示
			var html = this.getHtml(data);
			$("div[name='dataset_container']").append($(html));
		},
		remove:function(id,key){
			var obj,val;
			if(datasetSelector.pkKey == 'id'){
				val = id;
			}else{
				val = key;
			}
			obj = $("span[data-"+this.pkKey+"='"+val+"']");
			obj.remove();
		},
		getHtml:function(data){
			 var str ="",
			 	id=data.id?data.id:"", name=data.name?data.name:"", key=data.key?data.key:"", 
				tmp=template.replaceAll("#id#", id).replaceAll("#key#",key).replaceAll("#name#",name);
				str+=tmp;
			return str;
		},
		/**
		 * 初始数据
		 */
		_initData:function(){
			var data = frameElement.dialog.params;
			if($.isEmpty(data) || data.length <=0)
				return;
			for(var i=0,c;c=data[i++];){
				this.add(c);
			}
		},
		/**
		 * 回调获取数据
		 * @returns {Array}
		 */
		getData:function(){
			var data =  $("[name='dataset-span']");
			var aryData=[];
			$.each(data, function(i, n){
				var obj = $(n).data();
				aryData.push(obj);
			});
			return aryData;
		}
	};
	
})();