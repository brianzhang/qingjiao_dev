/**
 * 岗位选择器
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var partyDialogPosition;
var single = window.isSingleSelector, partyOrgTree=null;
$(function() {
	partyDialogPosition = new PartyDialogPosition();
	partyDialogPosition.init();
});

(function() {
	var template = '<span class="attach-span" posid="#posid#" posname="#posname#" poskey="#poskey#">' +
						'<span title="#posname#">#posname#</a>' +
						'&nbsp;' +
						'<a class="btn btn-ms" title="移除" href="javascript:partyDialogPosition.remove(\'#posid#\',\'#poskey#\');"><i class="fa fa-remove"></i></a>' +
						'</span>'+
					'</span>';
	
	// 定义常量
	var _consts = {
		TREE_ID : 'partyPositionTree',// 树
		TREE : '#partyPositionTree'// 树的ID
	};
	
	/**
	 * 用户选择框 对象
	 * 
	 * @returns {PartyDialogPosition}
	 */
	PartyDialogPosition = function() {
		
	};

	/**
	 * 方法
	 */
	PartyDialogPosition.prototype = {
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
			this.type = params.type;
			this.data = params.params;
			//初始化页面数据
			this._initTree();
			this._initPositionContainer();
			this._initCheckMyself();
			this._initData();
			this._initEvent();
		},
		_initPositionContainer : function(){
			if(!this.isSingle){
				$("div[name='position_container']").height("80px");
			}
		},
		_initCheckMyself : function(){
			var me = this;
			var $obj = $("#tbl_myself");
			$(':checkbox',$obj).bind('click',function(event){
				event.stopPropagation();
				
				var val = $(this).val();
				var id_name = val.split(',');
				if($(this).is(':checked')){
					var data = {id: id_name[0], name: id_name[1], key:id_name[2]};
					me.add(data);
				}else{
					me.remove(id_name[0],id_name[2]);
				}
			});
			
			$("tr", $obj).on("click", function(){
				var chkbox = $(this).find(":checkbox");
				$(chkbox).click();
			});
		},
		add:function(data){
			var records = $("span.attach-span");
			if(this.isSingle){
				if(records.length == 1)
					$(records[0]).remove();
			}
			for(var i=0;i<records.length;i++){
				if($(records[i]).attr("posid")==data['id'] || $(records[i]).attr("poskey")==data['key']){
					return; 
				}
			}
			// 岗位展示演示
			var html = this.getHtml(data);
			$("div[name='position_container']").append($(html));
		},
		remove:function(id,key){
			var obj = null;
			if(id && "" != id) obj = $("span[posid='"+id+"']");
			if(key && "" != key) obj = $("span[poskey='"+key+"']");
			if(null!=obj) obj.remove();
		},
		clearSelect:function(){
			var me = this;
			me.grid.trigger("reloadGrid");
		},
		/**
		 * 初始化树
		 */
		_initTree:function(){
			//初始化布局
			var me = this;
			// 树
			this.partyOrgTree =null;
			this._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){
				me._treeFrameResize();
			});
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
					me.partyOrgTree.expandAll(true);
				}else	if($(this).hasClass("fa-compress")){//收缩
					me.partyOrgTree.expandAll(false);
				}
			});
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$('.treeFrame').height( $(window).height()-20);
			$(this.consts.TREE).height( $(window).height()-155);
		},
		// 加载树
		loadTree:function (){
			var me = this;
			this._treeRootId=0;
			this.expandByDepth = 1;
			var chkstyle = "checkbox";
			if(me.isSingle) chkstyle = "radio";
			this.setting = {
				async: {enable: false},
				data: {
					key:{name:"name"},
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "parentId"
					}
				},
				check: {
					enable: true,
					chkStyle: chkstyle,
					radioType: "all",
					chkboxType: { "Y": "", "N": "" }
				},
				view: {
					selectedMulti: !me.isSingle,
					showIconFont:true
				},
				edit: {
					drag: {
						prev: false,inner: false,next: false,isMove:false
					},
					enable: true,
					showRemoveBtn: false,
					showRenameBtn: false
				},
				callback:{
					onClick: function(e, treeId, treeNode) {
						me.treeOnLeftClick(me,treeNode);	
					},
					onCheck : function(e, treeId, treeNode) {
						me.treeOnCheck(me,treeNode);	
					},
					onRightClick : null,
					beforeDrop: null,
					onDrop: null
				}
			};
			
			var url=__ctx+"/platform/org/partyPosition/getTreeData.htm";
			var params = {'type' : 'position'};
			//增加参与者属性
			$(".pace-inactive input[type='hidden']").each(function(){
				params[$(this).attr("name")] = $(this).val();
			});
			
			$.post(url, params, function(result){
				me.partyOrgTree=$.fn.zTree.init($(me.consts.TREE), me.setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.partyOrgTree.getNodesByFilter(function(node){
		                return (node.level <=me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.partyOrgTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.partyOrgTree.expandAll(true);
		        }
			});
		},
		treeOnLeftClick:function(me, treeNode) {
			orgId = treeNode.id;
			me.partyOrgTree.checkNode(treeNode, !treeNode.checked, true);
			if(orgId != 0 && orgId != '0'){
				if(treeNode.checked){
					me.add({id:treeNode.id,name:treeNode.name,key:treeNode.alias});
				}else{
					me.remove(treeNode.id,treeNode.alias);
				}
			}
		},
		treeOnCheck:function(me, treeNode) {
			orgId = treeNode.id;
			if(orgId != 0 && orgId != '0'){
				if(treeNode.checked){
					me.add({id:treeNode.id,name:treeNode.name,key:treeNode.alias});
				}else{
					me.remove(treeNode.id,treeNode.alias);
				}
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
				var id=data.id||"", name=data.name||"", key=data.key||"", 
					tmp=template .replaceAll("#posid#", id).replaceAll("#posname#",name).replaceAll("#poskey#",key);
				str+=tmp;
			return str;
		},
		/**
		 * 回调获取数据
		 * @returns {Array}
		 */
		getData:function(){
			var data = $("span.attach-span");
			var aryData=[];
			$.each(data, function(i, n){
				var obj = {posid:$(n).attr("posid"), posname:$(n).attr("posname"), poskey:$(n).attr("poskey")};
				aryData.push(obj);
			});
			return aryData;
		},
		/**
		 * 获取选中节点
		 */
		getSelectNode:function(){
			partyOrgTree = $.fn.zTree.getZTreeObj("partyPositionTree");
			var nodes  = partyOrgTree.getSelectedNodes();
			var node   = nodes[0];
			return node;
		},
		_initEvent:function(){
			var me = this;
			$(document).on("click", ".fa-find", function(){
				var val = $("#qPosName").val();
				if(val){
					var nodes = me.partyOrgTree.getNodeByParam("name", val, null);
					me.partyOrgTree=$.fn.zTree.init($(me.consts.TREE), me.setting,nodes);
					if(me.expandByDepth!=0) {
						var nodes = me.partyOrgTree.getNodesByFilter(function(node){
							return (node.level <=me.expandByDepth);
						});
						if(nodes.length>0){
							for(var idx=0;idx<nodes.length;idx++){
								me.partyOrgTree.expandNode(nodes[idx],true,false);
							}
						}
					} else   {
						me.partyOrgTree.expandAll(true);
					}
				}else{
					me.loadTree();
				}
			});
			$(document).on("click", ".fa-refresh", function(){
				$("#qPosName").val("");
			});
			$(document).off("click", ".tree-toolbar a.btn.fa-more");
			$(document).off("click", ".tree-toolbar a.btn.fa-more");
			$(document).on("click", ".tree-toolbar a.btn.fa-more", function(){
				$("#qOrgName").val("");
				var params = [];
				$(".pace-inactive input[type='hidden']").each(function(){
					params.push({name:$(this).attr("name"),value:$(this).val()});
				  });
				new AttrDialog({
					title:"更多查询条件",
					partyType: 'position',
					params:params,
					callback:function(data){
						me.setInputVal(".pace-inactive", data);
					}
				}).show();
				
			});
		},
		setInputVal : function(selector, params){
			if(!params) return;
			var inputHtml = "<input type='hidden' name='#name#' value='#value#' />";
			var element = $(selector);
			element.html("");
			for(var i=0,temp;i<params.length;i++){
				temp = inputHtml;
				element.append( temp.replace("#name#",params[i].name).replace("#value#",params[i].value));
			}
			$("a.btn.fa-refresh").trigger("click");
		}
	};
})();