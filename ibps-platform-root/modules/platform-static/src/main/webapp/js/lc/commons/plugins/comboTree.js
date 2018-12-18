/**
 * 下拉树
 * 
 * <br>
 * 1、在输入框输入支持 <input data-toggle="comboTree"/>
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-11-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	$('[data-toggle="comboTree"]').each(function() {
		var $el = $(this), options = $el.data(), w = parseFloat($el
					.css('width')), h = $el.outerHeight();

		options.width = options.width || $el.outerWidth();
		options.height = options.height || '200';
	
		var guid = function() {
			var a = function() {
				return Math.floor(Math.random() * 0x10000)
						.toString(16);
			};
			return (a() + a() + "-" + a() + "-" + a() + "-"
					+ a() + "-" + a() + a() + a());
		}, 
		treeid = guid(), 
		$tree = $('<ul id="' + treeid + '" class="ztree hide" ></ul>');
	
		$el.css("cursor", "pointer").after($tree);
	
		var $box = $('#' + treeid + '_select_box'), setting = {
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
					
					if(options.key)
						$(options.key).val(treeNode.key);
					if(options.type_key)
						$(options.type_key).val(treeNode.typeKey);
					if(options.id)
						$(options.id).val(treeNode.id);

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
						
						$el.val(rsArr.join(split));
					}else{
						$el.val(treeNode.name);
					}
					
					$el.blur();
					$box.hide();
				}
			}
		};
		
		var setPosition = function($box) {
			var top = $el.offset().top, left = $el.offset().left, $clone = $tree
					.clone().appendTo($('body')), treeHeight = $clone
					.outerHeight();
			$clone.remove();
			var offsetBot = $(window).height() - treeHeight
					- top - h, maxHeight = $(window).height()
					- top - h;
	
			if (options.height == 'auto' && offsetBot < 0)
				maxHeight = maxHeight + offsetBot;
			$box.css({
				top : (top + h),
				left : left,
				'max-height' : maxHeight
			});
		};
	
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
	
		// 点击事件
		$el.click(function() {
			if ($box && $box.length) {
				setPosition($box);
				$box.show();
				return;
			}
			var zindex = 200;
			$box = $('<div id="'+ treeid+ '_select_box" class="tree-box"></div>')
					.css({
						position : 'absolute',
						'zIndex' : zindex,
						'min-width' : options.width,
						height : options.height,
						overflow : 'auto',
						background : '#FFFFFF',
						border : '1px #EEE solid'
					}).hide().appendTo($('body'));
			
			$.post(url, options.params ? options.params
					: {}, function(data) {
				var tree = $.fn.zTree.init($('#'
						+ treeid), setting, data);
				// 展开所有
				tree.expandAll(true);
				$tree.appendTo($box).css('width',
						'100%').removeClass('hide')
						.show();
				setPosition($box);
				$box.show();
			});
		});
	
		// 鼠标离开
		$('body').on('mousedown',function(e) {
			var $target = $(e.target);
			if (!($el[0] == e.target || ($box
					&& $box.length > 0 && $target
					.closest('.tree-box').length > 0))) {
				$box.hide();
			}
		});
	});
});
