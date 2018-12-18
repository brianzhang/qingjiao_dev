var menubar 	= null,
	params 		= frameElement.dialog.params;
			
$(function(){
	menubar = new Menubar();
	menubar.init();
});

(function() {
	//定义常量
	var _consts = {
		TREE_ID : 'menuTree',// 树
		TREE : '#menuTree'// 树的ID
	};
	
	/**
	 * 菜单栏 对象
	 * @returns {Menubar}
	 */
	Menubar = function() {
		var fileMenu = [
			     {alias:'file', css : 'fa-file', text:'文件', parentAlias : '-1'},
			     {alias:'save', css : 'fa-floppy-o ', text:'保存', parentAlias : 'file'},
			     {alias:'print', css : 'fa-print', text:'打印', parentAlias : 'file'},
			     {alias:'printPreview', css : 'fa-file', text:'打印预览', parentAlias : 'file'}
			 ];
		var reviewMenu = [
		             {alias:'review', css : 'fa-file', text:'审阅', parentAlias : '-1'},
		             {alias:'addComment', css : 'fa-file', text:'新建批注', parentAlias : 'review'},
		             {alias:'delAllComment', css : 'fa-file', text:'删除所有批注', parentAlias : 'review'}
		             ];
		var rightsMenu = [
		             {alias:'rights', css : 'fa-file', text:'权限', parentAlias : '-1'},
		             {alias:'setReadOnly', css : 'fa-file', text:'设置只读', parentAlias : 'rights'},
		             {alias:'cancelReadOnly', css : 'fa-file', text:'取消只读', parentAlias : 'rights'},
		             {alias:'enCopy', css : 'fa-file', text:'启用复制粘贴', parentAlias : 'rights'},
		             {alias:'disCopy', css : 'fa-file', text:'禁用复制粘贴', parentAlias : 'rights'}
		             ];
		
		// word菜单
		var docMenu = $.merge([{alias:'-1', text:'word菜单', parentAlias : ''}], fileMenu);
			docMenu = $.merge(docMenu, reviewMenu);
			docMenu = $.merge(docMenu, rightsMenu);
		
		// excel菜单
		var excelMenu = $.merge([{alias:'-1', text:'excel菜单', parentAlias : ''}], fileMenu);
			excelMenu = $.merge(excelMenu, reviewMenu);
			excelMenu = $.merge(excelMenu, rightsMenu);
		
		// ppt菜单
		var pptMenu = $.merge([{alias:'-1', text:'ppt菜单', parentAlias : ''}], fileMenu);
			pptMenu = $.merge(pptMenu, reviewMenu);
			pptMenu = $.merge(pptMenu, rightsMenu);
		
		// 定义属性
		this.menuData = {
				'doc'	: docMenu,
				'xls'	: excelMenu,
				'ppt'	: pptMenu
			};
		
		var menubars 	= params.options,
			office_type = params.office_type;
		
		this.data = this.menuData[office_type];
		
		if(menubars && $.isArray(menubars)){
			for(var i = 0, len = menubars.length; i < len; i ++){
				var menu = menubars[i];
				for(var j = 0, jlen = this.data.length; j < jlen; j ++){
					var _menu = this.data[j];
					if(_menu.alias == menu.alias){
						_menu.checked = true;
					}
				}
			}
		}
	};

	/**
	 * 方法
	 */
	 Menubar.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.TREE).length > 0)// 树
				this._initTree();
		},
		/**
		 * 初始化树
		 */
		_initTree:function(){
			var me = this;
			// 树
			this.menuTree =null;
			this.loadTree();
	        //初始化滚动
	        this.initLeftScroll();
			this.initTreeToolbar();
		},
		initTreeToolbar:function(){
			var me = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me.loadTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					me.menuTree.expandAll(true);
				} else{
					me.menuTree.expandAll(false);	
				}
			});
		},
		// 加载树
		loadTree:function (){
			var me = this;
			this._treeRootId=0;
			this.expandByDepth = 1;
			var setting = {
				data : {
					key:{name:"text"},
					simpleData : {
						enable 	: true,
						idKey 	: "alias",
						pIdKey 	: "parentAlias",
						rootPId :'0'
					}
				},
				check: {
					enable: true,
					chkStyle: "checkbox",
					chkboxType: { "Y": "ps", "N": "s" }
				},
				view : {
					selectedMulti 	: true,
					showIconFont 	: true
				},
				edit : {
					drag: {
						prev	: false,
						inner	: false,
						next	: false,
						isMove	: false
					},
					enable: true,
					showRemoveBtn: false,
					showRenameBtn: false
				},
				callback : {
					onClick : function(e, treeId, treeNode) {
						// 复选框选中
						me.menuTree.checkNode(treeNode, true, true);
					}
				}
			};
			
			me.menuTree = $.fn.zTree.init($(me.consts.TREE), setting, me.data);
	        if(me.expandByDepth!=0) {
	            var nodes = me.menuTree.getNodesByFilter(function(node){
	                return (node.level <=me.expandByDepth);
	            });
	            if(nodes.length>0){
	                for(var idx=0;idx<nodes.length;idx++){
	                	me.menuTree.expandNode(nodes[idx],true,false);
	                }
	            }
	        }else{
	        	me.menuTree.expandAll(true);
	        }
		},
		/**
		 * 左侧菜单的滚动
		 */
		initLeftScroll:function(){
	    	$(_consts.TREE).niceScroll({
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
	    	$(_consts.TREE).getNiceScroll().resize();
		},
		getData : function(){
			var nodes = this.menuTree.getCheckedNodes(true);
			
			if(nodes.length > 0){
				var data = [];
				
				for(var i = 0, len = nodes.length; i < len; i ++){
					var node = nodes[i];
					if(node.alias == '-1'){
						continue;
					}
					data.push({alias:node.alias, css : node.css ,text:node.text, parentAlias : node.parentAlias});
				}
				
				return data;
			}
			
			return [];
		},
		resetSelectData : function(){
			// me.menuTree
			
		}
	};
})();

function getData(){
	return menubar.getData();
}

function cleanData(){
	return menubar.resetSelectData();
}