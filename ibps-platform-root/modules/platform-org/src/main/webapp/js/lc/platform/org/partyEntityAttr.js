/**
 * 员工
 * 
 * <pre>
 * 作者：huangchunyan
 * 邮箱：3378340995@qq.com
 * 日期：2016-07-04 16:02:01
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
(function ($) {
    $.extend($.fn, {
        // 获取复选框的值。
        getCheckBoxValue: function (objJson, scope) {
            $(':checkbox,:radio', scope).each(function () {
                var name = $(this).attr('name');
                objJson[name] = '';
            });

            $(':checkbox:checked,:radio:checked', scope).each(function () {
                var name = $(this).attr('name');
                if (objJson[name] == '') {
                    objJson[name] = $(this).val();
                } else {
                    objJson[name] += "," + $(this).val();
                }
            });
        },
    });
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };
})(jQuery);

var partyEntityAttr;

$(function() {
	partyEntityAttr = new PartyEntityAttr();
	partyEntityAttr.init();
});

(function() {
	//定义常量
	var _consts = {
		FORM : '#partyEntityAttrForm'// 表单form
	};
	/**
	 * 员工 对象
	 * @returns {PartyEntityAttr}
	 */
	PartyEntityAttr = function() {
		//定义属性
		this.roleItemList = [];
	};

	/**
	 * 方法
	 */
	PartyEntityAttr.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.save(me, frm);
			});
			// 处理表单清空
			$(document).on('click', 'a.fa-transh-o', function() {
				me.clearAttr();
				me.save(me, frm);
			});
		},
		/**
         * 清空扩展属性
         */
        clearAttr: function () {
        	var me = this;
        	var tab = $("#partyEntityAttrForm");
        	$(":text", tab).val('');
        	$(":checkbox", tab).removeAttr('checked');
        	$(":radio", tab).removeAttr('checked');
        },
		save:function(me, frm){
			/*重写表单提交事件*/
            action = frm[0].action;
            newForm = $("<form></form>");
            newForm.attr('action', action);
            newForm.attr('method', 'post');

            var main = {};

            main['attrItemList'] = me.getAttrData();
            
            var mainStr = JSON2.stringify(main);
            $('textarea[name="json"]', newForm).remove();
            input1 = "<textarea style='display:none;'  name='json'>" + mainStr + "</textarea>";
            input2 = "<textarea style='display:none;'  name='entityId'>" + entityId + "</textarea>";
            newForm.append(input1);
            newForm.append(input2);
            newForm.appendTo("body");
            newForm.css('display', 'none');
            
//            console.log(entityId);
//            console.log(mainStr);
            var loading = DialogUtil.load("保存中...");
            newForm.ajaxForm({
            	success : function(responseText){
            		DialogUtil.close(loading);
					me._showResponse(responseText);
				},
				error: function(){
					DialogUtil.close(loading);
				}
            });
            if (frm.valid()){
            	newForm.submit();
			}else{
				DialogUtil.close(loading);
			}
		},
		/**
		 * 获取扩展属性数据
		 * @returns {Array}
		 */
		getAttrData:function(){
			var data = $("div[type='attrItem']");
			var aryData=[];
			$.each(data, function(i, n){
				//{attrId:'-', value:'-'}
				var attrId = $("input[name='attrId']", n).val();
				var input = $("input[type='text']", n);
				if(input && input.val() != '' && $.trim(input.val()) != ''){
					var attr = {'attrId':attrId,'value':$.trim(input.val())};
					aryData.push(attr);
				}
				
				var chks = $(":checkbox:checked,:radio:checked", n);
				if(chks && chks != null && chks.length != 0){
					for(var i = 0; i < chks.length; i ++){
						var chk = $(chks[i]);
						var attr = {'attrId':attrId,'value':$.trim(chk.val())};
						aryData.push(attr);
					}
				}
			});
			return aryData;
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.msg(msg.getMessage());
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	}
})();
