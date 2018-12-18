var datasetSetCategoryDialog;    
$(function() {
	datasetSetCategoryDialog = new DatasetSetCategoryDialog();  
	datasetSetCategoryDialog.init();
});

(function() {
	// 定义常量
	var _consts = {
		TYPE_TREE : "#typeTree",
		TREE_ID : 'typeTree',// 树
	};
	/**
	 * 设置 对象
	 * 
	 * @returns {BpmForm}
	 */
	DatasetSetCategoryDialog = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	DatasetSetCategoryDialog.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.TYPE_TREE).length > 0)// 分类树
				this._initTypeTree();
		},
		/**
		 * 初始化类型树
		 */
		_initTypeTree : function() {
			var typeTree = new TypeTree($(this.consts.TYPE_TREE), {
				categoryKey : 'DATASET_TYPE',
				onClick : function(event, treeId, treeNode) {
					var typeId = treeNode.id;
					if (treeNode.isRoot == 1)
						typeId = "";
					$("#typeId").val(typeId);
					$("a.btn.fa-search").click();
				},
				onRightClick : function(event, treeId, treeNode) {
					
					
				}
			});
			this._initLayout();
		},
		/**
		 * 初始化布局
		 */
		_initLayout : function() {
			var layout = $('body').layout({
				applyDefaultStyles : true,
				onopen : function() {
					GridList.resizeGridSize();
				},
				onclose : function() {
					GridList.resizeGridSize();
				},
				onresize : function() {
					GridList.resizeGridSize();
				}
			});
			layout.addPinBtn(".pinBtn", "west");
		},

		/**
		 * 回调获取数据
		 * @returns typeId
		 */
		getData:function(){
			var typeId=$("#typeId").val();
			return typeId;
		}
	};
})();
