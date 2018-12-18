(function($) {
	$.extend($.fn, {
		/**
		 * 功能:校验数据 input : 校验对象 validRule :校验规则
		 */
		validMe:function(conf){
			var input = conf&&conf.text,validRule = conf&&conf.rule,element = conf&&conf.el||this;
			input=input||getValByScope(element);
			validRule = validRule || element.attr("validate"); 
			if(input instanceof  Array) input=input.toString();
			if(input === undefined) input = "";
			var res=this.__checkValidRule(input,validRule,element);
			var obj=element.parents(".field-home");
			if(obj.eq(0).hasClass("form-td")) obj = element;
			if(!obj[0]){
				obj = element.closest(".field-home");
				if(!obj[0]) obj = element.parent();
			}
			if(!res.success){
				obj.qtipError(res.tip,true);
			}else{
				obj.qtipSuccess();
			}
			return res;
		},
		qtipSuccess : function(){
			var obj = $(this);
			obj.removeClass("has-error");
			obj.addClass("has-success");
			obj.qtip('destroy');
		},
		qtipError : function(text,hasFieldHome){
			var obj = $(this);
			if(!hasFieldHome) obj.addClass("field-home");
			obj.removeClass("has-success");
			obj.addClass("has-error");
			obj.qtip('destroy');
			obj.qtip({
				   content: text, // Set the tooltip content to the
										// current corner
	               position: {
		            	my: 'left center',  // Position my top left...
                        at: 'right center',
                        target: 'mouse', // Track the mouse as the positioning target
                        adjust: { x: 5, y: 5 } 
	               },
	               hide: {
	            	   event:"mouseleave" // Don't specify a hide event
	               },
	               style: {
	            	   classes: 'qtip-default  qtip qtip-bootstrap qtip-shadow'
	               }
			});
		},
		isNgModelValid:function (){
			if($(".has-error",$(this)).length>0||$(this).hasClass("has-error")) return false;
			return true;
		},
		__checkValidRule : function(input,validRule,element){
			validRule = parseToJson(validRule);
			var unNullable=validRule.required;
			if(unNullable){
				if(this.__checkNull(input)){
					return {success:false,tip:(element[0].nodeName=="SELECT")?("请选择"):("必填")};//(element.attr("placeholder")&&("必填 : "+element.attr("placeholder")))||
				}
			}
			var rules = validRule.rules;
			if(!rules) {
				element.removeClass("has-error");
				element.addClass("has-success");
				return {success:true};
			}
			var res = this.__checkRules(input,rules);
			return res;
		},
		__checkRules : function(input,rules){
			for(var i=0;i<rules.length;i++){
				var rule = rules[i];
				if(rule.isDefault){
					rule = ConstUtil.getRuleByName(rule.text);
					if(!rule.rule(input)){
						return {success:false,tip:rule.msg};
					}
				}else if(!this.__checkRegex(input,rule.text)) {
					return {success:false,tip:rule.tip};
				}
			}
			return {success:true};
		},
		/**
		 * 功能:判断是否为空 input : 校验对象
		 */
		__checkNull:function (input){
			if(input==null||input==""){
				return true;
			}
			return false;
		},
		__checkRegex:function (input,reg){
			var regex=new RegExp(reg,'g');
			var r=input.match(regex);
			if(r==null){
				return false;
			}
			return true;
		}
	});
})(jQuery);
