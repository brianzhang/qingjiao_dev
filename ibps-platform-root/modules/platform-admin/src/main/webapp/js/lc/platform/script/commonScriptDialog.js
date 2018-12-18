/**
 * 【常用脚本编辑器】
 * 
 * <pre>
 * 作者：xu qiang
 * 邮箱：819842974@qq.com
 * 日期：2015-12-16 09:29:20
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
var commonScriptDialog;
$(function() {
	commonScriptDialog = new CommonScriptDialog();
	commonScriptDialog.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : '#scriptForm',// 表单form
			TREE_ID : 'scriptTree',// 树
			TREE : '#scriptTree'// 树的ID
	};
	/**
	 * 【常用脚本编辑器】 对象
	 * @returns {CommonScriptDialog}
	 */
	CommonScriptDialog = function() {
		//定义属性
		//树
		this.scriptTree = null;
		//运算符工具框
		this.calTools = [ {
			exp : 'like',
			text : 'like',
			msg : '类似'
		}, {
			exp : 'not',
			text : 'not',
			msg : '不是'
		}, {
			exp : '||',
			text : 'or',
			msg : '或'
		}, {
			exp : '&&',
			text : 'and',
			msg : '并'
		}, {
			exp : '!=',
			text : '!=',
			msg : '不等于'
		}, {
			exp : '=',
			text : '=',
			msg : '等于'
		}, {
			exp : '<',
			text : '&lt;',
			msg : '小于'
		}, {
			exp : '>',
			text : '>',
			msg : '大于'
		}, {
			exp : ')',
			text : ')',
			msg : '右括号'
		}, {
			exp : '(',
			text : '(',
			msg : '左括号'
		}, {
			exp : '/',
			text : '÷',
			msg : '除'
		}, {
			exp : '*',
			text : '×',
			msg : '乘'
		}, {
			exp : '-',
			text : '-',
			msg : '减'
		}, {
			exp : '+',
			text : '+',
			msg : '加'
		} ];
		this.calTool = null;
	};

	/**
	 * 方法
	 */
	CommonScriptDialog.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)// 表单
				this._initForm();
			if ($(this.consts.TREE).length > 0)// 树
				this._initTree();
		},
		/**
		 * 初始化树
		 */
		_initTree:function(){
			var me = this;

			// 处理运算符
			$(document).on('click', '.calTool', function() {
				var exp = $(this).attr("value");
				me._editor.setValue(me._editor.getValue() + exp);
			});
			
			//初始化树
			me._loadTree();
			
			// 缩放时候计算高度
			/*me._treeFrameResize();
			$(window).resize(function(){  
				me._treeFrameResize();
			});*/
			
			//初始化代码显示框
			me._initCodeMirror();
			
	        //初始化滚动
			me._initLeftScroll();
			
			//初始化运算符工具框
			me._initExpTools();
		},
		/**
		 * 初始化树工具按钮
		 */
		_initTreeToolbar:function(){
			var me = this;
			$('.tree-toolbar').on("click", "a.btn", function(){
				if($(this).hasClass("fa-refresh")){//刷新
					me._loadTree();
				}else	if($(this).hasClass("fa-expand")){//展开
					me.scriptTree.expandAll(true);
				} else{
					me.scriptTree.expandAll(false);	
				}
			});
		},
		/**
		 * 缩放时候计算高度
		 */
		_treeFrameResize:function (){
			$(this.consts.TREE).height( $(window).height()-210);
		},
		/**
		 * 初始化代码显示框
		 */
		_initCodeMirror:function(){
			var height = $("#script").height();
			this._editor = CodeMirror.fromTextArea(document.getElementById("script"), {
				mode: "groovy",
				tabMode: "indent",
				lineNumbers: true
			 });
			
			this._editor.setSize("100%",height);
		},
		/**
		 * 树加载数据
		 */
		_loadTree:function(){
			var me = this;
			this._treeRootId = 0;
			this.expandByDepth = 0;
			var setting = {
				async: {enable: false},
				data: {
					key : {
						name : "name"
					},
					simpleData : {
						enable : true,
						idKey : "id",
						pIdKey : "parentId",
						rootPId : 0
					}
				},
				view: {
					selectedMulti: false,
					showIconFont: true
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
						me._treeOnLeftClick(me,treeNode);
					},
					onRightClick :function(e,treeId, treeNode) {
						me._treeOnRightClick(me,treeNode,e);
					},
					onDblClick :function(e,treeId, treeNode) {
						me._treeOnDBLeftClick(me,treeNode,e);
					},
					beforeDrop: null,
					onDrop: null
				}
			};
			var url=__ctx+"/platform/script/commonScript/genTreeJson.htm";
			$.post(url,{},function(result){
				me.scriptTree=$.fn.zTree.init($(me.consts.TREE), setting,result);
		        if(me.expandByDepth!=0) {
		            var nodes = me.scriptTree.getNodesByFilter(function(node){
		                return (node.level==me.expandByDepth);
		            });
		            if(nodes.length>0){
		                for(var idx=0;idx<nodes.length;idx++){
		                	me.scriptTree.expandNode(nodes[idx],true,false);
		                }
		            }
		        } else   {
		        	me.scriptTree.expandAll(true);
		        }
			});
		},
		/**
		 * 树双击左键事件
		 * @param me
		 * @param treeNode
		 */
		_treeOnDBLeftClick:function(me, treeNode){
			var script = treeNode.script == null ? '' : treeNode.script;
			if('undefined' == script || null == script){
				return;
			}else{
				me._editor.setValue(me._editor.getValue() + script);
			}
		},
		/**
		 * 树单击左键
		 * @param me
		 * @param treeNode
		 */
		_treeOnLeftClick:function(me, treeNode) {
			if(treeNode.leaf){
				return;
			}
			if(treeNode.open) {
				me.scriptTree.expandNode(treeNode, false, true, true);
			} else {
				me.scriptTree.expandNode(treeNode, true, true, true);
			}
		},
		/**
		 * 树单击右键
		 * @param me
		 * @param treeNode
		 */
		_treeOnRightClick:function(me, treeNode){
			//TODO ...
		},
		/**
		 * 左侧菜单的滚动
		 */
		_initLeftScroll:function(){
			var me = this;
	    	$(me.consts.TREE).niceScroll({
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
	    	$(me.consts.TREE).getNiceScroll().resize();
		},
		/**
		 * 初始化运算符工具框
		 */
		_initExpTools:function() {
			var me = this;
			while (me.calTool = me.calTools.pop()) {
				var _div = document.createElement("div");
				_div.setAttribute("class", "infont col-sm-4");
				var _a = document.createElement("a");
				_a.title = me.calTool.msg;
				_a.innerHTML = me.calTool.text;
				_a.className = "btn btn-outline btn-default calTool";
				_a.setAttribute("href", "javascript:void(0);");
				_a.setAttribute("value", me.calTool.exp);
				$(_div).append(_a);
				$("#tools_comment").append(_div);
			}
		}
	};
})();

/* 初始化验证事件 */
function initValid() {
	var script = commonScriptDialog._editor.getValue();
	var url = __ctx + "/platform/script/commonScript/validateScript.htm";
	$.post(url, {
		script : script
	}, function(obj) {
		if(obj.hasError){
			DialogUtil.error("表达式验证出错！", obj.errorMsg, "错误信息");
		}else{
			DialogUtil.alert("结果值类型:" + obj.resultType + "<br/>" + "结果值类型:" + obj.result);
		}
	});
}

/* 初始化确认事件 */
function initConfirm() {
    return commonScriptDialog._editor.getValue();
}

/* 初始化取消事件 */
function initCancle(callback){
    DialogUtil.confirm("是否关闭窗口？", "提示信息",function(rtn) {
    	callback(rtn);
	});
}