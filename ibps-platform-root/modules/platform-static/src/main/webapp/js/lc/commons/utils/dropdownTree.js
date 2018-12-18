+function ($) {
  ' ';

  var backdrop = '.dropdownTree-backdrop';
  var toggle   = '[data-toggle="dropdownTree"]';
  var DropdownTree = function (element) {
	  $(element).on('click.bs.dropdownTree', this.toggle);
  };

  DropdownTree.VERSION = '1.0.0';
	  
	var guid = function() {
		var a = function() {
			return Math.floor(Math.random() * 0x10000)
					.toString(16);
		};
		return (a() + a() + "-" + a() + "-" + a() + "-"
				+ a() + "-" + a() + a() + a());
	};

	var setPosition = function($this,$tree,$box,options) {
		var top = $this.offset().top,
			left = $this.offset().left,
			treeHeight = 100,
			h = $this.outerHeight();
		var offsetBot = $(window).height() - treeHeight- top - h, 
				maxHeight = $(window).height()- top - h;
		if(offsetBot < 0){
			top = top+offsetBot-h-maxHeight+(options.isscroll?40:90);
		}else{
			top = (top + h);
		}
	
		if (options.height == 'auto' && offsetBot < 0)
			maxHeight = maxHeight + offsetBot;
		else
			maxHeight = 200;
		$box.css({
		    left: 0,
			top: '100%',
			'max-height' :maxHeight
		});
		$this.addClass("open");
	};

	 DropdownTree.prototype.toggle = function (e) {
	    var $this = $(this);
	
	    if ($this.is('.disabled, :disabled')) return
	
	
		var options = $this.data(), 
			w = parseFloat($this.css('width')),
			h = $this.outerHeight();
	
		options.width = options.width || $this.outerWidth();
		options.height = options.height || '200';
	
		var treeid = $this.attr("treeid")?$this.attr("treeid"):guid(),
			$tree = $("#"+treeid),
			$box =   $('#' + treeid + '_select_box');
		if($tree.length == 0){
			$tree = $('<ul id="' + treeid+ '" class="ztree hide" ></ul>'),
			$this.attr("treeid",treeid).css("cursor", "pointer").after($tree);
		}
	
		if ($box && $box.length) {
			setPosition($this,$tree,$box,options);
			setTimeout(function(){
				$box.show();
				$this.addClass("open");
			},10);
			return;
		}
		
		var setting_name = options.setting_name?options.setting_name:'name';
		
		var setting = {
			data : {
				key : {
					name :  setting_name
				},
				simpleData : {
					enable : true,
					idKey : "id",
					pIdKey : "parentId",
					rootPId : null
				}
			},
			view : {
				selectedMulti : false,
				showIconFont : true
			},
			callback : {
				onClick : function(e, treeId, treeNode) {
					if(options.field_type){
						if(treeNode.attrType == 'table' && options.field_type !='table') {
							return;
						}
					}
					
					// 任意节点选择、叶节点选择模式，默认叶节点选择模式
					if(options.select_mode != undefined && options.select_mode == 'leaf'){
						if(treeNode.isParent){
							return;
						}
					}
					
					if(options.key){//查找离他最近的选项
						$this.siblings(options.key).val(treeNode.key);
					}else if(options.id){
						$this.siblings(options.id).val(treeNode.id);
					}else	if(options.typekey){
						$this.siblings(options.typekey).val(treeNode.typeKey);
					}else if(options.value_id){
						$this.siblings(options.value_id).val(treeNode[options.value_key]);
					}
					
					if(options.opt){
						$this.data(options.opt,treeNode[options.opt]);
					}
				
					// 显示路径、显示名称，默认显示路径
					if(options.display_mode == undefined || options.display_mode == 'path'){
						var pathName = '', split = (options.split ? options.split : '/');
						var pathNameFunc = function(__pathName, __treeNode){
							if(undefined == __treeNode || null == __treeNode){
								return __pathName;
							}else if(typeof(__treeNode)!='undefined'&&__treeNode!=null){
								__pathName += split + pathNameFunc(__treeNode.name, __treeNode.getParentNode());
							}
							
							return __pathName;
						};
						
						pathName = pathNameFunc(treeNode.name, treeNode.getParentNode());
						
						
						var tmps = pathName.split(split);
						var rsArr = [];
						if(tmps.length>0){
							for(var ix=tmps.length-1;ix>=0;ix--){
								rsArr.push(tmps[ix]);
							}
						}
						
						$this.val(rsArr.join(split));
					}else{
						$this.val(treeNode[setting_name]);
					}
					
					$this.blur();
					$box.hide();
				}
			}
		};
	
		$box = $('<div id="'+ treeid+ '_select_box" class="tree-box"></div>')
				.css({
					position : 'absolute',
					'zIndex' : 200,
					'min-width' : options.width,
					height : options.height,
					overflow : 'auto',
					background : '#FFFFFF',
					border : '1px #EEE solid'
				}).hide();
		$box.insertAfter($this);
		
		if(options.data){
			var data =JSON.parse( $(options.data).val());
			
			var fieldType = options.field_type;
			if(fieldType){
				if(fieldType == 'table'){
					data = _.filter(data, function(d){
						return d.attrType == 'subTable';
					});
				}else{
					if(options.is_sub){
						var sub = _.find(data, function(d){
							return d.attrType == 'subTable' &&d.key == options.sub_name;
						});
						if(!sub){
							DialogUtil.msg("请先选择子表对象！");
							return;
						}
							
						data = _.filter(data, function(d){
							return d.parentId == sub.id;
						});
					}else{
						data = _.filter(data, function(d){
							return d.attrType == 'field';
						});
					}
				}
			}
			
			var tree = $.fn.zTree.init($('#'
					+ treeid), setting, data);
			// 展开所有
			tree.expandAll(true);
			$tree.appendTo($box).css('width','100%').removeClass('hide').show();
			setPosition($this,$tree,$box,options);
			$box.show();
		}else{
			var url = '';
			if (options.url) {// 自定义的url获取树
				url = options.url;
			} else {
				if (options.type) { // 分类树
					url = __ctx
							+ "/platform/cat/type/getByCategoryKey.htm?categoryKey="
							+ options.type;
				} else if (options.dic) {// 数据字典
					url = __ctx
							+ "/platform/cat/dictionary/getByTypeKeyForComBo.htm?typeKey="
							+ options.dic;
				} else {
					alert("配置不正确，请检查是否含有[data-url]、[data-type]、[data-dic]等参数");
					return;
				}
			}
			
			$.post(url, options.params ? options.params
					: {}, function(data) {
				var tree = $.fn.zTree.init($('#'
						+ treeid), setting, data);
				// 展开所有
				tree.expandAll(true);
				$tree.appendTo($box).css('width','100%').removeClass('hide').show();
				setPosition($this,$tree,$box,options);
				$box.show();
			});
		}
	    
	    return false
	  };

  function clearMenus(e) {
	    if (e && e.which === 3) return
	    $(toggle).each(function () {
	      var $this         = $(this);
	      if (!$this.hasClass('open')) return
	      
	      if (e.isDefaultPrevented()) return;
	      var treeId= $this.attr("treeid");
	      $this.removeClass("open");
	      $("#"+treeId+"_select_box").hide();
	    })
	  }

  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdownTree')

      if (!data) $this.data('bs.dropdownTree', (data = new DropdownTree(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdownTree             = Plugin
  $.fn.dropdownTree.Constructor = DropdownTree

  // dropdownTree NO CONFLICT
  // ====================

  $.fn.dropdownTree.noConflict = function () {
    $.fn.dropdownTree = old
    return this
  }

  // APPLY TO STANDARD DROPDOWNTREE ELEMENTS
  // ===================================

  $(document)
      .on('click.bs.dropdownTree.data-api', clearMenus)
    .on('click.bs.dropdownTree.data-api', toggle, DropdownTree.prototype.toggle);

}(jQuery);
