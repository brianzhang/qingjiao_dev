/**
 * 分类树
 */

var TypeTree = function($this,options){
	/**
	 * 加载树
	 */ 
	this.loadTree = function (){
		var opts = this.options,
			url =opts.url,
			params={categoryKey:opts.categoryKey},
			depth = opts.depth,
			setting = {
				data: {
					key:{name:opts.nameKey},
					simpleData: {
						enable: true,
						idKey: 'id',
						pIdKey: 'parentId',
						categoryKey: opts.categoryKey,
						rootPId:1
					}
				},
				view: {
					showIconFont:true
				},
				callback:{
					onClick: opts.onClick,
					onRightClick: opts.onRightClick
				}
			};
		if(opts.setting)
			setting = $.extend(true,{}, setting, opts.setting);
		if(!opts.treeList){
	        $.post(url,params,function(result){
	        	if(opts.rootField) result = result[opts.rootField];
	            for(var i=0;i<result.length;i++){
	                var node=result[i];
	                if(!node)
	                	continue;
	                if(node.parentId=='-1'){
	                    node.icon= "bigger-120 fa-home";
	                    node.isRoot=1;
	                }
	            }
	            if($.isEmpty(result))
	            	return;
	            initTree(result);
	        });
		}else{
			initTree(opts.treeList);
		}
        function initTree(result){
        	 //初始化数据
            tree = $.fn.zTree.init($this, setting,result);
            //展开层级
            if(depth!=null && depth>=0){
                var nodes = tree.getNodesByFilter(function(node){
                    return (node.level==depth);
                });
                if(nodes.length>0){
                    for(var idx=0;idx<nodes.length;idx++){
                    	tree.expandNode(nodes[idx],false,false);
                    }
                }
            } else {
            	tree.expandAll(true);
            }
            if(typeof opts.onLoaded=='function'){
            	opts.onLoaded.call($this,tree);
            }
        }
	};
	/**
	 * 展开收起
	 * type: true 是展开，false是默认
	 */
    this.expandAll =  function(type){
    	tree.expandAll(type);
	};
	this.defaults = {
			url:__ctx + "/platform/cat/type/getTreeData.htm",
			depth:null, //展开深度 
			onClick :null,
			onRightClick:null,
			nameKey:'name',
			categoryKey:'type'
	};
	this.getTree = function(){
		return tree;
	};

	
	/**
	 * 初始化树的顶部按钮
	 */
	this.initTreeToolbar = function(){
		var me = this;
		$('.tree-toolbar').on("click", "a.btn", function(){
			if($(this).hasClass("fa-refresh")){//刷新
				me.loadTree();
			}else	if($(this).hasClass("fa-expand")){//展开
				me.getTree().expandAll(true);
			} else{//收缩
				me.getTree().expandAll(false);	
			}
		});
	};
	/**
	 * 左侧菜单的滚动
	 */
	this.initTreeScroll = function(){
		$this.niceScroll({
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
		$this.getNiceScroll().resize();
	};
	//初始化加载数据
	{
		this.tree = null;
		this.options = $.extend({}, this.defaults, options);
		this.loadTree();
	     //初始化树的顶部按钮
		this.initTreeToolbar();
        //初始化滚动
        this.initTreeScroll();
    }
};