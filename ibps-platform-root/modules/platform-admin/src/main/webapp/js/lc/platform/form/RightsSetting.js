/**
 * 权限设置
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-30 16:21:52
 * </pre>
 */
RightsSetting = {
	// 权限值
	rightsText : null,
	// 权限div
	rightsDiv : null,
	init : function(rightsText, rightsDiv) {
		this.rightsText = rightsText;
		this.rightsDiv = rightsDiv;
	},
	/**
	 * 设置权限
	 */
	setRights : function(rights) {
		if($.isEmpty(rights))
			rights = [ {type : "all"} ];
		
		var $rightsHtml = $(this.__getRightsSpan(rights));
		this.rightsDiv.empty();
		this.rightsDiv.append($rightsHtml);
		this.rightsText.val(JSON.stringify(rights));
		this._initEvent($rightsHtml);
	},
	__getRightsSpan : function(rights, idKey, nameKey) {
		var returnStr = "", noneStr = '<span class="owner-span" data-type="none" >无</span> ';
		if (!rights || rights.length == 0) {
			return noneStr;
		}
		idKey = idKey ? idKey : "rightsId";
		nameKey = nameKey ? nameKey : "rightsName";
		var removeOwner = '<a class="fa fa-remove remove-owner" title="删除"></a>';

		for (var i = 0; i < rights.length; i++) {
			var owner = rights[i], type = owner.type;
			if (type == 'all') {
				returnStr += '<span class="owner-span" data-type="' + type
						+ '">';
				returnStr += '所有人 ';
				returnStr += removeOwner;
				returnStr += '</span>';
			} else if (type == 'none') {
				returnStr += noneStr;
			} else {
				var ids = (owner[idKey] + "").split(","), names = owner[nameKey]
						.split(","), attrs = " ";
				switch (type) {
				case "employee":
					attrs = "class='owner-span span-employee' title='用户' ";
					break;
				case "pos":
					attrs = "class='owner-span span-pos' title='岗位' ";
					break;
				case "role":
					attrs = "class='owner-span span-role' title='角色' ";
					break;
				case "org":
					attrs = "class='owner-span span-org' title='组织' ";
					break;
				case "grant":
					attrs = "class='owner-span span-grant' title='组织下'";
					break;
				default:
					attrs = "class='owner-span span-org' title='组织' ";
					break;
				}
				for (var j = 0; j < ids.length; j++) {
					var id = ids[j], name = names[j];
					if (!id)
						continue;
					returnStr += '<span  ' + attrs + '  data-type="' + type
							+ '" data-id="' + id + '" data-name="' + name
							+ '">';
					returnStr += name;
					returnStr += removeOwner;
					returnStr += '</span>';
				}
			}
		}
		return returnStr;
	},
	/**
	 * 初始化事件
	 */
	_initEvent : function(html) {
		var me = this;
		$(html).on("click",".remove-owner",function() {
			var owner = $(this).closest(".owner-span"), ownerSiblings = owner
					.siblings(".owner-span");
			if (ownerSiblings.length == 0) {
				var rights = [ {
					type : 'none'
				} ], rightsHtml = me.__getRightsSpan(rights);
				owner.parent().append(rightsHtml);
			}
			me.remove(rights, owner);
		});
	},
	/**
	 * 删除权限
	 */
	remove : function(rights, owner) {
		var type = owner.data("type"), 
			idx = this.rightsDiv.find("span.owner-span[data-type='" + type + "']").index(owner), 
			rightsTexts = $.isEmpty(this.rightsText.val()) ? [] : $.parseJSON(this.rightsText.val());
		if (type == 'all') {
			rightsTexts = [{
				type : "none"
			}];
		} else {
			$.each(rightsTexts,function(i, r) {
					if (r.type != type)
						return true;
					if (!r.rightsId)
						return true;
					var rightsIdAry = r.rightsId.split(","), rightsNameAry = r.rightsName
							.split(",");
					rightsIdAry.splice(idx, 1);
					rightsNameAry.splice(idx, 1);
					r.rightsId = rightsIdAry.join(",");
					r.rightsName = rightsNameAry.join(",");
				});
		}

		this.rightsText.val(JSON2.stringify(rightsTexts));
		owner.remove();
	}
};