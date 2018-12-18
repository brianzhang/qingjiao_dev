/*******************************************************************************
 * 构造Ztree 说明。
 * 
 * 快速构造默认配置的ztree new BpmFormVar('treeId',url).initZtree(param);
 * treeId:树的Id，url：请求的url ， initZtree(param,level,call); parma 异步请求提供参数，
 * level展开层级（可略，默认展开全部）， call 回调提供Ztree初始化对象
 * 
 * 
 * 完整例子 var bpmFormVar = new BpmFormVar('groupTree',url)
 * .setCallback({=beforeClick:beforeClick,onClick:zTreeOnLeftClick,onRightClick:zTreeOnRightClick})
 * .initZtree(params,function(treeObj){groupTree=treeObj});
 * 
 ******************************************************************************/
var BpmFormVar = function(treeId, data,options) {
	if(!options)
		options = {};
	options = $.extend(true,{},options);

	this.treeId = treeId;
	/** _seting 私有 配置项* */
	var _seting = {
		data : {
			key : {
				name : options.name?options.name:'name',
				title :options.title?options.title:'name'
			},
			simpleData : {
				enable : true,
				idKey :options.idKey?options.idKey:'id',
				pIdKey : options.pIdKey?options.pIdKey:'parentId',
				rootPId : options.rootPId?options.rootPId:0,
			}
		},
		async : {
			enable : false
		},
		edit : {
			drag : {
				prev : false,
				inner : false,
				next : false,
				isMove : false
			},
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		view : {
			nameIsHTML : true,
			selectedMulti : true,
			showIconFont : true,
			showIcon : null
		},
		check : {
			enable : false,
			chkboxType : {
				"Y" : "",
				"N" : ""
			}
		},
		callback : {
			beforeClick : null,
			onClick : null,
			onRightClick : null,
			beforeDrop : null,
			onDrop : null
		}
	};
	
	
	var _treeObj;

	/** 初始化树* */
	this.initZtree = function(param, callBack) {
		_treeObj = $.fn.zTree.init($("#" + treeId), _seting, data);
		_treeObj.expandAll(true);

		if ($.isFunction(callBack))
			callBack(_treeObj);
		return this;
	}

	this.getTreeObj = function() {
		if (!_treeObj)
			alert("尚未初始化");
		return _treeObj;
	};

	/**
	 * 设置树展示的标识key {idKey,pIdKey,name,title,rootPid} <br>
	 * idKey 默认 id<br>
	 *  pIdKey 默认 parentId<br>
	 *   name 默认 name <br>
	 *    title 默认 name
	 */
	this.setDataKey = function(data) {
		if (!data)
			return this;
		_seting.data = $.extend({}, 	_seting.data, data);
		return this;
	}

	/**
	 * 设置选择框的方式默认没有选择框 如果需要选择框，不需要级联 则传 true param true or { "Y": "p", "N": "s" }
	 */
	this.setCheckboxType = function(type) {
		_seting.check.enable = true
		if (type instanceof Object) {
			_seting.check.chkboxType = type;
		}
		return this;
	}

	/**
	 * 这里支持Ztree 所有的回调方法，请查API
	 * eg:传入参数{beforeClick：beforeClick,onClick:onClick,beforeCheck:beforeCheck}
	 */
	this.setCallback = function(callBack) {
		if (callBack instanceof Object)
			for (call in callBack) {
				if (!$.isFunction(callBack[call]))
					alert(call + " :is not a function");
				_seting.callback[call] = callBack[call];
			}
		return this;
	}

	/** 异步加载 */
	this.setAsync = function(conf) {
		_seting.async = conf;
		return this;
	}

	/** 是否显示图标配置项* */
	this.setShowIcon = function(call) {
		_seting.view.showIcon = call;
		return this;
	}
	/** 设置一些特殊的值请参照 Ztree _setting 格式 ** */
	this.setSetingParam = function(param) {
		if (param instanceof Object)
			for (p in param) {
				_seting[p] = param[p];
			}
		return this;
	}
	/***************************************************************************
	 * isShowIn,被显示在某个元素下面，比如 input框，做成类似comboTree的样子 width,height 设置出现 那个
	 * combox的宽高 TODO 如果是input 设置 autoSetValue = true ， 扩展回显和自动填值功能。
	 */
	var _isShowIn, _menuContent;
	this.makeCombTree = function(isShowIn, width, height) {
		width = width ? width : "12em";
		height = height?height:'200px';
		_menuContent = treeId + "MenuContent";
		_isShowIn = isShowIn;
		var menuContent = '<div id="'
				+ _menuContent
				+ '" style="'
				+ 'max-height:'
				+ height
				+ ';width:'
				+ width
				+ ';'
				+ 'overflow-y:scroll; position:absolute;z-index: 9999;display:none;background-color:#FFFFFF;">'
				+ '<ul id="' + treeId + '" class="ztree" ></ul></div>';
		$("#" + isShowIn).after(menuContent);
		$("#" + isShowIn).bind("click", this.showMenu);
		return this;
	}
	// 可以添加一个目标对象，如果是添加了点击事件的，则默认
	this.showMenu = function(target) {
		if (!target || target.currentTarget) {
			target = $(this);
		}

		var btnOffset = target.position();
		$("#" + _menuContent).css({
			left : btnOffset.left + "px",
			top : btnOffset.top + target.outerHeight() + "px"
		}).slideDown("fast").removeClass("hidden");
		$("body").bind("mousedown", onBodyDown);
	}
	this.hideMenu = function() {
		hideMenu();
	}

	var onBodyDown = function(event) {
		if (!(event.target.id == _isShowIn || event.target.id == _menuContent || $(event.target).parents("#" + _menuContent).length > 0)) {
			hideMenu();
		}
	}
	var hideMenu = function() {
		$("#" + _menuContent).fadeOut("fast").addClass("hidden");
		$("body").unbind("mousedown", onBodyDown);
	}

	

	/** *设置展开层级 */
	function expandTree(treeObj, node, level) {
		for (var i = 0; i < node.length; i++) {
			treeObj.expandNode(node[i], true, false, false);
			level = level - 1;
			if (level > 0 && node[i].children > 0) {
				expandTree(treeObj, node[i].children, level);
			}
		}
	}
};