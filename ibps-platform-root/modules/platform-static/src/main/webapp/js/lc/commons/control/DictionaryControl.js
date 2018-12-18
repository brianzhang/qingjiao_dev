/**
 * 数据字典。
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
+function ($) {
  ' ';

  var backdrop = '.dictionary-backdrop';
  var toggle   = '[data-toggle="dictionary"]';
  var Dictionary = function (element) {
    $(element).on('click.bs.dictionary', this.toggle);
  };

  Dictionary.VERSION = '1.0.0';
	  
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
			$clone = $tree.clone().appendTo($('body')),
			treeHeight = $clone.outerHeight(),
			h = $this.outerHeight();
		$clone.remove();
		var offsetBot = $(window).height() - treeHeight
				- top - h, 
				maxHeight = $(window).height()
				- top - h;

		if (options.height == 'auto' && offsetBot < 0)
			maxHeight = maxHeight + offsetBot;
		$box.css({
			top : (top + h),
			left : left,
			'max-height' :200
		});
		$this.addClass("open");
	};

 Dictionary.prototype.toggle = function (e) {
    var $this = $(this)

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
		$tree = $('<div class="dict-select" id="dict_select_'+treeid+'"><i class="fa fa-list"></i>请选择</div><ul id="' + treeid+ '" class="ztree hide" ></ul>'),
		$this.attr("treeid",treeid).css("cursor", "pointer").after($tree);
	}
	$("#dict_select_"+treeid).off('click').on("click",function(e){
		if(options.key){//查找离他最近的选项
			$this.siblings(options.key).val("");
		}else if(options.id){
			$this.siblings(options.id).val("");
		}else	if(options.typekey){
			$this.siblings(options.typekey).val("");
		}
		$this.val("");
		$box.hide();
	});
	
	if ($box && $box.length) {
		setPosition($this,$tree,$box,options);
		setTimeout(function(){
			$box.show();
			$this.addClass("open");
		},10);
		return;
	}
	
	
	var setting = {
		data : {
			key : {
				name : "name"
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
				// 任意节点选择、叶节点选择模式，默认叶节点选择模式
				if(options.select_mode != undefined && options.select_mode == 'leaf'){
					if(treeNode.isParent){
						return;
					}
				}
				
				if(options.isquery){
					var dic = JSON2.parse($(options.key+"_dicStr").val().replaceAll('quot','"'));
					var nodes = JSON.getSubByPnode(dic,treeNode.key,true);
					var queryfield = "";
					if(nodes.length>0){
						for(var ix=0;ix<nodes.length;ix++){
							queryfield+=nodes[ix].key+",";
						}
					}
					if(queryfield.length>0){
						queryfield = queryfield.substring(0,queryfield.length-1);
					}
					if(options.key){//查找离他最近的选项
						$this.siblings(options.key).val(queryfield);
					}else if(options.id){
						$this.siblings(options.id).val(queryfield);
					}else	if(options.typekey){
						$this.siblings(options.typekey).val(queryfield);
					}
				}else{
					if(options.key){//查找离他最近的选项
						$this.siblings(options.key).val(treeNode.key);
					}else if(options.id){
						$this.siblings(options.id).val(treeNode.id);
					}else	if(options.typekey){
						$this.siblings(options.typekey).val(treeNode.typeKey);
					}
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
					$this.val(treeNode.name);
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
			}).hide().appendTo($('body'));
	
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
			} else if (options.dic) {// 数据字段
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
      var data  = $this.data('bs.dictionary')

      if (!data) $this.data('bs.dictionary', (data = new Dictionary(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dictionary

  $.fn.dictionary             = Plugin
  $.fn.dictionary.Constructor = Dictionary

  // dictionary NO CONFLICT
  // ====================

  $.fn.dictionary.noConflict = function () {
    $.fn.dictionary = old
    return this
  }

  // APPLY TO STANDARD DROPDOWNTREE ELEMENTS
  // ===================================

  $(document)
      .on('click.bs.dictionary.data-api', clearMenus)
    .on('click.bs.dictionary.data-api', toggle, Dictionary.prototype.toggle);

}(jQuery);
