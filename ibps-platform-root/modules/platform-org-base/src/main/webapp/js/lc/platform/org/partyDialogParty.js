/**
 * 参与者选择器
 * 
 * <pre>
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2015-11-26 11:15:45
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var partyDialogParty;
var single = window.isSingleSelector, partyTree=null;
$(function() {
	partyDialogParty = new PartyDialogParty();
	partyDialogParty.init();
	
	$("#party").change(function(){
		partyDialogParty = new PartyDialogParty();
		partyDialogParty.init();
		$("div[name='party_container']").html('');
		$("#qPartyName").val("");
	});
});

(function() {
	var template = '<span class="attach-span" entityid="#entityid#" entityname="#entityname#" entitykey="#entitykey#">' +
							'<span title="#entityname#">#entityname#</a>' +
							'&nbsp;' +
							'<a class="btn btn-ms" title="移除" href="javascript:partyDialogParty.remove(\'#entityid#\',\'#entitykey#\');"><i class="fa fa-remove"></i></a>' +
							'</span>'+
						'</span>';
	
	// 定义常量
	var _consts = {
		TREE_ID : 'partyTree',// 树
		TREE : '#partyTree'// 树的ID
	};
	
	/**
	 * 选择框 对象
	 * 
	 * @returns {PartyDialogParty}
	 */
	PartyDialogParty = function() {
		
	};

	/**
	 * 方法
	 */
	PartyDialogParty.prototype = {
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
			this._initPartyShow($("#party").val());
			this._initTree();
			this._initCheckMyself();
			this._initPartyContainer();
			this._initData();
			this._initEvent();
		},
		_initPartyContainer : function(){
			if(!this.isSingle){
				$("div[name='party_container']").height("80px");
			}
		},
		_initPartyShow : function(showType){
			console.log(showType);
			if('org' == showType){
				$("#tbl_position").hide();
				$("#tbl_org").show();
				$("a[href='#tab-1']").html('组织');
				$("a[href='#tab-2']").html('我的组织');
			}else{
				$("#tbl_org").hide();
				$("#tbl_position").show();
				$("a[href='#tab-1']").html('岗位');
				$("a[href='#tab-2']").html('我的岗位');
			}
		},
		_initCheckMyself : function(){
			var me = this;
			var $obj = $("table");
			$(':checkbox', $obj).off('click');
			$(':checkbox', $obj).on('click',function(event){
				event.stopPropagation();
				
				var val = $(this).val();
				var id_name = val.split(',');
				if($(this).is(':checked')){
					var data = {id: id_name[0], name: id_name[1], key : id_name[2]};
					me.add(data);
				}else{
					me.remove(id_name[0],id_name[2]);
				}
			});
			
			$("tr", $obj).off("click");
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
				if($(records[i]).attr("entityid")==data['id'] || $(records[i]).attr("entitykey")==data['key']){
					return; 
				}
			}
			// 人员展示演示
			var html = this.getHtml(data);
			$("div[name='party_container']").append($(html));
		},
		remove:function(id,key){
			var obj = null;
			if(id && "" != id){
				obj = $("span[entityid='"+id+"']");
			}
			if(key && "" != key){
				obj = $("span[entitykey='"+key+"']");
			}
			if(null!=obj){
				obj.remove();
			}
		},
		/**
		 * 初始化树
		 */
		_initTree:function(){
			//初始化布局
			var me = this;
			// 树
			this.partyTree =null;
			this._treeFrameResize();
			// 缩放时候计算高度
			$(window).resize(function(){
				me._treeFrameResize();
			});
			this.entityId=$("#party").val();
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
					me.partyTree.expandAll(true);
				} else{
					me.partyTree.expandAll(false);	
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
			
			var url=__ctx+"/platform/org/partyOrg/getTreeData.htm";
			if(me.entityId == 'position'){
				url = __ctx+"/platform/org/partyPosition/getTreeData.htm";
			}
			var params = {type: me.type};
			if(me.type == 3 || me.type == '3') params ={type: me.type, orgId : me.data.orgId};
			
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
					tmp=template .replaceAll("#entityid#", id).replaceAll("#entityname#",name).replaceAll("#entitykey#",key);
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
				var obj = {entityid:$(n).attr("entityid"), entityname:$(n).attr("entityname"), entitykey:$(n).attr("entitykey")};
				aryData.push(obj);
			});
			return aryData;
		},
		_initEvent:function(){
			var me = this;
			$(document).on("click", ".fa-find", function(){
				var val = $("#qPartyName").val();
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
				$("#qPartyName").val("");
			});
		}
	};
})();