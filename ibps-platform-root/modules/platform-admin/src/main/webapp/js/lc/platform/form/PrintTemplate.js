/**
 * 打印模版
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2017-07-08 -下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
!function(window){var $=jQuery;(function(){window.IBPS=window.IBPS||{}
var e={}
$.shortcut=function(t,i){if(null!=e[t])throw"shortcut:["+t+"] has been registered"
e[t]=i,$.extend(i.prototype,{xtype:t})},IBPS.createWidget=function(t){if(t instanceof jQuery)return new IBPS.Widget({renderEl:t})
var i=t.type.toLowerCase(),n=e[i]
if(!n)throw i+" does not exist"
return new n(t)},IBPS.extend=function(e,t,i){"object"==typeof t&&(i=t,t=e,e=function(){t.apply(this,arguments)})
var n=function(){},a=t.prototype
return n.prototype=a,e.prototype=new n,e.superclass=a,$.extend(e.prototype,i),e},IBPS.STATIC={zIndex:8e3,num:0,IDBase:new Date-0},$.extend(IBPS,{States:{NORMAL:0,SUCCESS:1,ERROR:2,WARNING:3}})}).call(this),function(){IBPS.Utils=IBPS.Utils||{},$.extend(IBPS.Utils,{isString:function(e){return"string"==typeof e},isNumber:function(e){return $.isNumeric(e)},isFunction:function(e){return $.isFunction(e)},isDate:function(e){return e instanceof Date},isArray:function(e){return $.isArray(e)},isEmpty:function(e){return""===e||IBPS.Utils.isNull(e)},isBlank:function(e){return IBPS.Utils.isNull(e)||""===e.trim()},isNull:function(e){return null==e},isObjectEmpty:function(e){if(null==e)return!0
if(e.length>0)return!1
if(0===e.length)return!0
for(var t in e)if(hasOwnProperty.call(e,t))return!1
return isNaN(e)},isValueWidget:function(e){return!!IBPS.ValueWidgets[e]},applyFunc:function(e,t,i,n){return IBPS.Utils.isFunction(t)?t.apply(e,i?i:[]):n},forEach:function(e,t){if(Array.isArray(e)||e instanceof jQuery)for(var i=0,n=e.length;n>i&&t.apply(e[i],[i,e[i]])!==!1;i++);else if(e&&"object"==typeof e)for(var a in e)if(e.hasOwnProperty(a)&&t.apply(e[a],[a,e[a]])===!1)break},createLoadIcon:function(e,t){var i=$('<div class="x-loader-icon"/>').appendTo(e)
return t&&i.addClass("colorful"),$("<div/>").appendTo(i),i},createMask:function(e,t){var i=$('<div class="x-window-mask"/>'),n=t||{}
if(n.isModal&&i.addClass("modal"),n.isLight?i.addClass("light"):n.isDark&&i.addClass("dark"),n.hasLoader){var a=!n.isDark
this.createLoadIcon(i,a)}return e&&i.css({"z-index":IBPS.STATIC.zIndex++}).appendTo(e),i},fixDecimalPrecision:function(e,t){var i=""
if(t||(t=8),!this.isEmpty(e)){var n=parseFloat(e)
if(!isNaN(n)){var a=(n+"").split(".")[1]
i=a&&a.length>t?parseFloat(n.toFixed(t)):n,t>6&&Math.abs(i)<1&&/e-/.test(i+"")&&(i=parseFloat(n.toFixed(6)))}}return i},getFileDownloadURL:function(e,t){return e?void t(__ctx+"/components/upload/getImage.htm?id="+e.id):""},clientHeight:function(){var e=0
return window.innerHeight?e=window.innerHeight:document.body&&document.body.clientHeight?e=document.body.clientHeight:document.documentElement&&document.documentElement.clientHeight&&(e=document.documentElement.clientHeight),e},clientWidth:function(){var e=0
return window.innerHeight?e=window.innerWidth:document.body&&document.body.clientWidth?e=document.body.clientWidth:document.documentElement&&document.documentElement.clientWidth&&(e=document.documentElement.clientWidth),e}})}.call(this),function(){IBPS.UI={showPopover:function(e){var t=$('<div class="x-ui-popover"/>').appendTo("body"),i=$.extend({anchor:null,position:"topLeft",content:null,maxWidth:null,animation:!0,type:"info"},e)
i.maxWidth&&t.css({"max-width":i.maxWidth}),i.type&&t.addClass(i.type),i.type&&t.addClass("animation"),i.content&&i.content.appendTo(t)
var n=i.anchor,a=n.offset(),s={"z-Index":IBPS.STATIC.zIndex++}
switch(i.position){case"topLeft":t.addClass("top"),s.left=Math.max(a.left+n.width()/2-t.width()/2-5,4),s.bottom=IBPS.Utils.clientHeight()-a.top+8
break
case"topRight":t.addClass("top"),s.right=Math.max(document.body.clientWidth-a.left-n.width()/2-t.width()/2-5,4),s.bottom=IBPS.Utils.clientHeight()-a.top+8
break
case"bottomLeft":t.addClass("bottom"),s.left=Math.max(a.left+n.width()/2-t.width()/2-5,4),s.top=a.top+n.height()+8
break
case"bottomRight":}t.css(s),t.addClass("fadein")},closePopover:function(){var e=$(".x-ui-popover")
e.length>0&&(e.remove(),e=null)}},IBPS.Msg={bubble:function(e){var t=$.extend({anchor:null,msg:"",minWidth:null,contentWidget:null,contentHTML:null,contentPadding:10,onContentCreate:null,onCancel:null,onOk:null,type:"info",width4Btn:100,text4Cancel:"取消",text4Ok:"确定",dockPosition:"left",edge:150,onShow:null,onClose:null,animation:!0,scrollObj:null,hAdjust:0},e)
if(t.anchor){var i=$('<div class="x-msg-bubble"/>').addClass(t.type)
t.animation&&i.addClass("animation"),t.minWidth&&i.css({"min-width":t.minWidth})
var n,a=$('<div class="content"/>').css({padding:t.contentPadding}).appendTo(i)
IBPS.Utils.isEmpty(t.msg)?t.contentWidget?(t.contentWidget.renderEl=$("<div/>").appendTo(a),n=IBPS.createWidget(t.contentWidget)):t.contentHTML&&t.contentHTML.appendTo(a):$("<span/>").text(t.msg).appendTo(a)
var s=!1
if(t.text4Cancel&&(s=!0,new IBPS.Button({renderEl:$("<div/>").appendTo(i),customCls:"navi-btn-cancel",style:"white",text:t.text4Cancel,width:t.width4Btn,onClick:function(e){IBPS.Utils.applyFunc(this,t.onCancel,[n,e],!0)!==!1&&h()}})),t.text4Ok){s=!0
var l="green"
"error"===t.type&&(l="red"),new IBPS.Button({renderEl:$("<div/>").appendTo(i),customCls:"navi-btn-ok",style:l,text:t.text4Ok,width:t.width4Btn,onClick:function(e){IBPS.Utils.applyFunc(this,t.onOk,[n,e],!0)!==!1&&h()}})}s&&a.css({"padding-bottom":t.contentPadding+50})
var o=$('<div class="triangle-up"/>').appendTo(i),r=t.anchor.offset(),c=r.top+t.anchor.height()+8-$("body").offset().top,d={"z-index":IBPS.STATIC.zIndex++},u=Math.min(t.edge,IBPS.Utils.clientHeight()/2)
IBPS.Utils.clientHeight()+document.body.scrollTop-c<=u?(d.top="auto",d.bottom=IBPS.Utils.clientHeight()-r.top+8,i.addClass("dock-bottom")):(d.top=c,d.bottom="auto",i.addClass("dock-top"))
var p=t.hAdjust||0
switch(t.dockPosition){case"left":i.addClass("dock-left"),d.left=r.left+t.anchor.width()/2-8-p,o.css({left:p})
break
case"right":i.addClass("dock-right"),d.right=IBPS.Utils.clientWidth()-r.left-t.anchor.width()/2-8-p,o.css({right:p})}var h=function(){IBPS.Utils.applyFunc(this,t.onClose,arguments,!1)===!1&&(i.removeClass("active"),$(document).unbind("mousedown.bubble"),t.scrollObj&&$(t.scrollObj).unbind("scroll.bubble"),setTimeout(function(){i.remove()},t.animation?500:0))}
return i.css(d).appendTo("body"),setTimeout(function(){i.addClass("active"),IBPS.Utils.applyFunc(this,t.onShow,[n],!1)
var e=function(e){var t=$(e.target).closest(".x-msg-bubble,.x-dropdown")
0===t.length&&h()}
$(document).bind("mousedown.bubble",e),t.scrollObj&&$(t.scrollObj).bind("scroll.bubble",e)},0),{close:h}}}}}.call(this),function(){IBPS.OB=function(e){this.options=$.extend(this._defaultConfig(),e),this._beforeInit(),this._init(),this._afterInit()},$.extend(IBPS.OB.prototype,{_defaultConfig:function(){return{onBeforeInit:null,onAfterInit:null}},_init:function(){},_beforeInit:function(){IBPS.Utils.applyFunc(this,this.options.onBeforeInit,[],!1)},_afterInit:function(){IBPS.Utils.applyFunc(this,this.options.onAfterInit,[],!1)}})}.call(this),function(){IBPS.Widget=IBPS.extend(IBPS.OB,{_defaultConfig:function(){return $.extend(IBPS.Widget.superclass._defaultConfig.apply(this,arguments),{widgetName:"",baseCls:"",customCls:null,enable:!0,visible:!0,invalidateType:"blank"})},_init:function(){IBPS.Widget.superclass._init.apply(this,arguments),this._initRoot(),this._initNameEffects()},_afterInit:function(){this._initElementSize(),this._initVisualEffects(),this._initDefaultValue(),IBPS.Widget.superclass._afterInit.apply(this,arguments)},_initRoot:function(){var e=this.options
null!=e.renderEl?this.element=$(e.renderEl):this.element=this._defaultRoot(),e.baseCls&&this.element.addClass(e.baseCls),e.customCls&&this.element.addClass(e.customCls)},_initNameEffects:function(){var e=this.options
e.widgetName||(e.widgetName="_widget_"+IBPS.STATIC.IDBase++),this.element.attr({widgetName:e.widgetName})},_initElementSize:function(){this.doResize()},_initVisualEffects:function(){this.setEnable(this.options.enable),this.setVisible(this.options.visible)},_initDefaultValue:function(){var e=this.options
null!=e.value?this.setValue(e.value):null!=e.text&&this.setText(e.text)},_defaultRoot:function(){return $("<div/>")},getWidgetByName:function(e){return this.options.resultWidgets?this.options.resultWidgets[e]:null},getWidgetName:function(){return this.options.widgetName},getWidgetType:function(){return this.options.type},getText:function(){return this.options.text},setText:function(e){this.options.text=e},getValue:function(){return this.options.value},setValue:function(e){this.options.value=e},isEnabled:function(){return this.options.enable},setEnable:function(e){this.options.enable=!!e,this.options.enable===!0?this.element.removeClass("x-ui-disable"):this.element.addClass("x-ui-disable")},isVisible:function(){return this.options.visible},setVisible:function(e){this.options.visible=!!e,this.options.visible===!0?this.element.removeClass("x-ui-hidden"):this.element.addClass("x-ui-hidden")},reset:function(){this.setValue(null)},doResize:function(e){var t=this.options
e&&(t.width=e.width,t.height=e.height),IBPS.Utils.isEmpty(t.width)||this.element.css({width:t.width}),IBPS.Utils.isEmpty(t.height)||this.element.css({height:t.height})},destroy:function(){this.element.remove()},rebuild:function(){this.options.renderEl=this.element,this.element.empty(),this._beforeInit(),this._init(),this._afterInit()},checkValidate:function(){return!0},fireEvent:function(e,t){this.element.trigger(e,t)},getOptions:function(){var e=this.options
return{type:e.type,widgetName:e.widgetName,customCls:e.customCls,height:e.height,width:e.width,text:e.text,value:e.value,enable:e.enable,visible:e.visible,allowBlank:e.allowBlank,rely:e.rely}},getInvalidateType:function(){return this.options.invalidateType},setInvalidateType:function(e){this.options.invalidateType=e},getNullValue:function(){return null},getLinkValue:function(){return this.getValue()},getLinkType:function(){return this.getWidgetType()}})}.call(this),function(){IBPS.Switch=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.Switch.superclass._defaultConfig.call(),{baseCls:"fui_switch",width:44,height:22,value:!1,onSwitch:null,btnPadding:2,text4On:"开",text4Off:"关"})},_init:function(){IBPS.Switch.superclass._init.apply(this,arguments)
var e=this.options,t=this
this.$text=$('<span class="switch-text"/>').text(e.text4On).appendTo(this.element),this.$btn=$('<span class="switch-btn"/>').appendTo(this.element),this.element.click(function(){t.isEnabled()&&t._doSwitch(!e.value,!0)})},_doSwitch:function(e,t){var i=this.options,n=this,a={},s={},l=""
i.value=e,i.value===!0?(this.element.addClass("on").removeClass("off"),this.$text.text(""),a.left=i.width-i.height+i.btnPadding,s["padding-left"]=0,s["padding-right"]=i.height-3*i.btnPadding,l=i.text4On):(this.element.addClass("off").removeClass("on"),this.$text.text(""),a.left=i.btnPadding,s["padding-left"]=i.height-3*i.btnPadding,s["padding-right"]=0,l=i.text4Off),t?this.$btn.animate(a,150,function(){n.element.css(s),n.$text.text(l),IBPS.Utils.applyFunc(n,i.onSwitch,[i.value],!1)}):(this.$btn.css(a),this.element.css(s),this.$text.text(l))},setValue:function(e){this._doSwitch(e,!1)},getValue:function(){return this.options.value},doResize:function(e){IBPS.Switch.superclass.doResize.apply(this,arguments)
var t=this.options,i=t.height,n=t.width,a=i-2*t.btnPadding,s={}
i&&(s["line-height"]=i+"px"),n&&(this.$btn.css({width:a,height:a}),s["border-radius"]=n/2),this.element.css(s)}}),$.shortcut("switch",IBPS.Switch)}.call(this),function(){IBPS.BaseSelectPane=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return a.extend(IBPS.BaseSelectPane.superclass._defaultConfig.apply(this,arguments),{baseCls:"fx_base_select",title:"",value:[],allowBlank:!0,multi:!0,editable:!1})},_init:function(){IBPS.BaseSelectPane.superclass._init.apply(this,arguments)},_createSelectList:function(){var e=this,t=this.options
this.$selectList?this.$selectList.empty():this.$selectList=$('<ul class="select-list"/>').appendTo(this.element),this.value&&this.value.length>0?IBPS.Utils.forEach(this.value,function(t,i){var n=e.selectMap[i]
e._createSelectItem(n)}):t.editable||$('<div class="select-empty" />').append($("<span />").text(t.msg)).appendTo(this.$selectList)},_createSelectItem:function(e){if(!e)return null
var t=this,i=this.options,n=$('<li class="select-item"/>').append($("<span/>").text(e.name)).appendTo(this.$selectList)
return i.editable&&i.multi&&$('<span class="remove-btn" />').append($('<i class="icon-close-large" />')).click(function(){t._removeSelectItem(e),t.refresh()}).appendTo(n),n},_removeSelectItem:function(e){},_addSelectItem:function(e){},_createSelectPane:function(){var e=this,t=$('<div class="select-menu"/>').appendTo(this.element)
return $('<i class="icon-search"/>').appendTo(t).click(function(){return $(".search-info").hide(),$(".search-input").animate({width:"100%"},function(){$("#searchInput").unbind("keydown"),$("#searchInput").keydown(function(t){13===t.keyCode&&e._createSearchList($(this).val())}).focus()}).show(),$(document).bind("click.search",function(e){var t=e.target,i=$(t).closest(".search-input")
0===i.length&&($(".search-info").show(),$(".search-input").animate({width:0},function(){$(".search-input").hide()}),$(document).unbind("click.search"))}),!1}),t.append($('<div class="search-input"/>').append($('<input id="searchInput"/>')).append($('<i class="icon-search"/>'))),t},_bindEditEvent:function(){var e=this,t=this.options
this.$selectList.unbind("click"),this.$selectList.bind("click",function(){var i=e._getEditConfig(),n=new IBPS.ConfirmDialog({title:t.title,height:570,width:600,contentWidget:{rowSize:[450],colSize:[570],padding:15,items:[[i]]},onOk:function(){return IBPS.Utils.applyFunc(e,e._onStopEdit,[n],!1)}})
n.show()})},checkValidate:function(){var e=this.options
return!!e.allowBlank||!IBPS.Utils.isObjectEmpty(this.getValue())},_createSearchList:function(){},_getEditConfig:function(){return{}},_onStopEdit:function(e){},refresh:function(){}})}.call(this),function(){IBPS.TitleEditor=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.TitleEditor.superclass._defaultConfig.apply(),{baseCls:"fx_title_editor",name:"",defaultName:"未命名",editable:!0,onStopEdit:null})},_init:function(){IBPS.TitleEditor.superclass._init.apply(this,arguments)
var e=this.options
e.editable?this.element.append('<input value="'+e.name+'"/><span class="name-pre">'+e.name+"</span>"):this.element.append($("<span>"+e.name+"<span/>")),this._bindEvent()},_bindEvent:function(){var e=this.options,t=this
if(e.editable){this.needTip=!0
var i=this.element.children("input")
e.name===e.defaultName&&i.focus().select()
var n=this.element.children(".name-pre")
i.width(n.outerWidth()),i.on("input",function(){n.text(i.val()),i.width(n.outerWidth())}),i.on("keydown",function(e){13===e.keyCode&&$(this).blur()}),i.on("focus",function(){t.needTip=!1,IBPS.UI.closePopover()}),i.blur(function(){t.needTip=!0
var a=$(this).val()
a||(a=e.defaultName,n.text(a),$(this).val(a),i.width(n.outerWidth())),a!==e.name&&IBPS.Utils.applyFunc(t,e.onStopEdit,[{name:a}],!1)}),i.hover(function(){t.needTip&&IBPS.UI.showPopover({position:"bottomLeft",anchor:i,content:$("<span/>").text("重命名"),type:"dark"})},function(){t.needTip&&IBPS.UI.closePopover()})}}})}.call(this),function(){IBPS.TextEditor=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.TextEditor.superclass._defaultConfig.apply(),{baseCls:"fui_text",inputCls:"x-input",width:240,height:30,allowBlank:!0,noRepeat:!1,onValidateSuccess:null,onValidateFail:null,onAfterValidate:null,onBeforeEdit:null,onAfterEdit:null,onStopEdit:null})},_init:function(){IBPS.TextEditor.superclass._init.apply(this,arguments)
var e=this.options,t=this
this.editComp=this._createEditComp(),this.editComp.addClass(e.inputCls).appendTo(this.element),e.waterMark&&this.editComp.attr("placeholder",e.waterMark),this.editComp.focus(function(i){t.$err&&t.$err.hide(),t.isEnabled()&&t._isScanEditable()&&(t.editComp.addClass(e.inputCls+"-focus"),IBPS.Utils.applyFunc(t,e.onBeforeEdit,[i],!1))}).blur(function(i){if(t.isEnabled()&&t._isScanEditable()){t.editComp.removeClass(e.inputCls+"-focus")
var n=t.checkValidate()
IBPS.Utils.applyFunc(t,e.onStopEdit,[n,i],!1)}}).keyup(function(i){t.isEnabled()&&t._isScanEditable()&&IBPS.Utils.applyFunc(t,e.onAfterEdit,[i],!1)})},_createEditComp:function(){return $("<input type='text'/>")},checkValidate:function(){var e=this.options,t=this.editComp.val().trim(),i=!0
if(IBPS.Utils.isEmpty(t))i=e.allowBlank
else if(!IBPS.Utils.isEmpty(e.regex)){try{i=RegExp(e.regex).test(t)}catch(e){i=!1}i||this.setInvalidateType("regex")}return i?IBPS.Utils.applyFunc(this,e.onValidateSuccess,[t],!1)===!1&&this.setState(IBPS.States.NORMAL):IBPS.Utils.applyFunc(this,e.onValidateFail,[t],!1)===!1&&this.setState(IBPS.States.ERROR),IBPS.Utils.applyFunc(this,e.onAfterValidate,[t,i],!1),i},showErrorMsg:function(e){IBPS.Utils.isEmpty(e)||(this.$err||(this.$err=$('<span class="invalid-info"/>').appendTo(this.element)),this.$err.text(e).show())},select:function(){this.editComp&&(this.editComp.select(),this.editComp.focus())},_isScanEditable:function(){var e=this.options
return!e.scan||e.scan.editable},setEnable:function(e){IBPS.TextEditor.superclass.setEnable.apply(this,[e]),e&&this._isScanEditable()?this.editComp.removeAttr("readOnly"):this.editComp.attr("readOnly","readOnly")},setText:function(e){this.setValue(e)},setValue:function(e){this.editComp.val(e)},getText:function(){return this.getValue()},getValue:function(){return this.editComp.val().trim()},setState:function(e){var t=this.options,i=t.inputCls+"-error "+t.inputCls+"-success "+t.inputCls+"-warning"
switch(t.state=e,e){case IBPS.States.SUCCESS:this.editComp.removeClass(i).addClass(t.inputCls+"-success")
break
case IBPS.States.ERROR:this.editComp.removeClass(i).addClass(t.inputCls+"-error")
break
case IBPS.States.WARNING:this.editComp.removeClass(i).addClass(t.inputCls+"-warning")
break
default:this.editComp.removeClass(i)}},getState:function(){return this.options.state?0:this.options.state},getOptions:function(){var e=this.options
return $.extend(IBPS.TextEditor.superclass.getOptions.apply(this,arguments),{regex:e.regex,noRepeat:e.noRepeat,scan:e.scan})},getNullValue:function(){return""}}),$.shortcut("text",IBPS.TextEditor)}.call(this),function(){IBPS.Number=IBPS.extend(IBPS.TextEditor,{_defaultConfig:function(){return $.extend(IBPS.Number.superclass._defaultConfig.apply(),{allowDecimals:!1,allowNegative:!0})},_init:function(){IBPS.Number.superclass._init.apply(this,arguments)
var e=this.options,t="[\\d]{0,}"
e.allowDecimals&&(t="[\\d]{0,}[\\.]?[\\d]{0,}"),e.allowNegative&&(t="[-]?"+t),e.regex="^"+t+"$"},_createEditComp:function(){return $("<input/>")},getOptions:function(){var e=this.options
return $.extend(IBPS.Number.superclass.getOptions.apply(this,arguments),{allowDecimals:e.allowDecimals,allowNegative:e.allowNegative})},setValue:function(e){this.editComp.val(IBPS.Utils.fixDecimalPrecision(e))},getValue:function(){var e=this.editComp.val()
if(IBPS.Utils.isEmpty(e))return null
var t=parseFloat(e)
return isNaN(t)?null:t},getNullValue:function(){return null},getText:function(){return this.editComp.val()}}),$.shortcut("number",IBPS.Number)}.call(this),function(){IBPS.Trigger=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.Trigger.superclass._defaultConfig.apply(),{baseCls:"fui_trigger",width:240,height:30,btnWidth:30,waterMark:null,onElementCreate:null,triggerIcon:"",edge:{width:240,height:200}})},_init:function(){IBPS.Trigger.superclass._init.apply(this,arguments)
var e=this.options
IBPS.Utils.applyFunc(this,e.onElementCreate,[],!1)===!1&&(this.editComp=this._createEditComp(),e.waterMark&&this.editComp.attr("placeholder",e.waterMark),this.triggerBtn=this._createTriggerBtn(),this._bindEvts())},_createEditComp:function(){return $('<input class="fui_trigger-input" onfocus="this.blur();"/>').attr("readOnly","readOnly").attr("UNSELECTABLE","on").appendTo(this.element)},_createTriggerBtn:function(){return $('<i class="fui_trigger-btn"/>').addClass(this.options.triggerIcon).appendTo(this.element)},_bindEvts:function(){var e=this
this.element.unbind("click.trigger"),this.element.bind("click.trigger",function(t){var i=$(t.target);(i.closest(".fui_trigger-input").length>0||i.closest(".fui_trigger-btn").length>0)&&e._onTriggerClick()})},_onTriggerClick:function(e){},_getTriggerView:function(){var e=$(".x-dropdown-wrapper")
return 0===e.length&&(e=$('<div class="x-dropdown-wrapper"/>').appendTo("body")),e},_calTriggerViewPos:function(){var e={"z-Index":IBPS.STATIC.zIndex++},t=this.element.offset(),i=this.options.edge,n=document.body.clientWidth-t.left,a=t.top-$("body").offset().top
n<i.width?(e.right=n-this.element.outerWidth(),e.left="auto"):(e.right="auto",e.left=t.left)
var s=document.body.clientHeight+document.body.scrollTop-a-this.element.outerHeight()
return s<i.height?(e.top="auto",e.bottom=document.body.clientHeight-a):(e.top=a+this.element.outerHeight(),e.bottom="auto"),e},setValue:function(e){this.setText(e)},setText:function(e){this.editComp.val(e)},getValue:function(){return this.getText()},getText:function(){return this.editComp.val()},doResize:function(e){IBPS.Trigger.superclass.doResize.apply(this,arguments)
var t=this.options,i=t.height
this.element.css({"line-height":i-2+"px"})}}),IBPS.ComboBox=IBPS.extend(IBPS.Trigger,{_defaultConfig:function(){return $.extend(IBPS.ComboBox.superclass._defaultConfig.apply(),{baseCls:"fui_combo",triggerIcon:"icon-ui-combo",triggerList:"combo-list",textField:"text",valueField:"value",allowBlank:!0,async:null,asyncResultKey:"items",items:[{value:"选项1",text:"选项1"},{value:"选项2",text:"选项2"},{value:"选项3",text:"选项3"}],searchable:!0,onDataFilter:null,onItemCreate:null,onAfterItemSelect:null,onAfterTriggerHide:null,limitData:300,emptyTip:null})},_init:function(){IBPS.ComboBox.superclass._init.apply(this,arguments),this._initStoreValue(),this.options.async&&!this._hasDefaultValue()||this._createTriggerView()},_initStoreValue:function(){this.text=null,this.value=null},_hasDefaultValue:function(){return!IBPS.Utils.isEmpty(this.options.value)},_onTriggerClick:function(e){if(this.isEnabled()){this._showTriggerView()
var t=this,i="mousedown"
$(document).bind(i+".trigger",function(e){var i=e.target,n=$(i).closest(t.triggerView)
0===n.length&&t._hideTriggerView()})}},_hideTriggerView:function(){var e=this.options
if(this.triggerView){var t="mousedown"
if($(document).unbind(t+".trigger"),this.triggerView.detach(),IBPS.Utils.applyFunc(this,e.onAfterTriggerHide,[],!1),!this.changed)return
IBPS.Utils.applyFunc(this,e.onStopEdit,[],!1)}},_showTriggerView:function(){null==this.triggerView&&this._createTriggerView(),this.triggerView.appendTo("body").css(this._calTriggerViewPos()).show(),this.changed=!1},_createTriggerView:function(){if(this.triggerView=$('<div class="x-dropdown"/>'),this.valueMap={},this.options.searchable){var e=this,t=$('<div class="fui_combo-search"/>').appendTo(this.triggerView)
$("<input/>").bind("input propertychange",function(t){if(e.searchValue!==this.value){e.searchinterval&&clearTimeout(e.searchinterval),e.searchValue=this.value,e.$listView.empty()
var i=e._createLoadingIcon("搜索中...")
e.searchinterval=setTimeout(function(){i.remove(),e.startIndex=0,e._onBeforeItemsLoaded(),e._createItemList(e.searchValue)},500)}}).appendTo(t),t.append($('<i class="icon-search search-icon"/>'))}this.$listView=$('<div class="x-dropdown-list"/>').addClass(this.options.triggerList).appendTo(this.triggerView),this._onLoadItems(),this._bindViewEvts()},_hideItems:function(e){var t=this.$listView.children(".x-dropdown-item")
IBPS.Utils.forEach(t,function(t,i){var n=$(i)
n.text().indexOf(e)<0&&n.addClass("hide")})},_onLoadItems:function(e){var t=this.options,i=this
if(t.async&&t.async.url)if(this.items)i._onBeforeItemsLoaded(),IBPS.Utils.forEach(this.items,function(t,n){i._onItemCreate(n,t,e)})
else{var n=this._createLoadingIcon("加载中...")
IBPS.Utils.applyFunc(this,t.onBeforeAsync,[],!1),IBPS.Utils.dataAjax({url:t.async.url,data:t.async.data},function(a,s){n.remove(),i._onBeforeItemsLoaded(),i.items=IBPS.Utils.applyFunc(i,t.onAsyncSuccess,[a],!1),i.items===!1?(i.items=[],i.startIndex=0,IBPS.Utils.forEach(a[t.asyncResultKey],function(e,n){var a={}
IBPS.Utils.isEmpty(n)||(a[t.textField]=n[t.textField]||n,a[t.valueField]=n[t.valueField]||n,i.items.push(a))}),i.items=i._sortItems(i.items),i._createItemList(e)):IBPS.Utils.forEach(i.items,function(t,n){i._onItemCreate(n,t,e)}),i._onAfterItemsLoaded()},function(){n.remove()})}else if(t.items){if(i._onBeforeItemsLoaded(),IBPS.Utils.isArray(t.items))IBPS.Utils.forEach(t.items,function(t,n){i._onItemCreate(n,t,e)})
else{var a=0
for(var s in t.items){var l={}
l[t.valueField]=s,l[t.textField]=t.items[s],i._onItemCreate(l,a,e),a++}}i._onAfterItemsLoaded()}},_sortItems:function(e){var t=this.options
return $.sort(function(e,i){var n=e[t.valueField]||e[t.textField]||e,a=i[t.valueField]||i[t.textField]||i
return+(n>a)||+(n===a)-1})},_createItemList:function(e){var t=this,i=this.options
this.items||(this.items=i.items||[]),this.startIndex=this.startIndex||0
for(var n=0,a=!0;n<i.limitData;){if(this.startIndex>=this.items.length){a=!1
break}var s=this.items[this.startIndex]
this.startIndex++,t._onItemCreate(s,n,e)!==!1&&n++}a&&t._bindLoadMore(e)},_bindLoadMore:function(e){var t=this
this.$listView.bind("scroll.loadMore",function(){t.$listView.scrollTop()+t.$listView.height()+100>=26*t.startIndex&&(t.$listView.unbind("scroll.loadMore"),t._createItemList(e))})},_createLoadingIcon:function(e){var t=this.$listView.children(".loading-text")
return 0===t.length&&(t=$('<div class="loading-text"/>').appendTo(this.$listView),$("<span/>").text(e).appendTo(t)),t},_onAfterItemsLoaded:function(){var e=this.options,t=this.$listView.children($(".x-dropdown-item")),i=e.allowBlank?1:0
e.emptyTip&&t.length<=i&&this.$listView.empty().append($('<div class="empty-tip"/>').text(e.emptyTip))},_onBeforeItemsLoaded:function(){var e=this.options,t=this
e.allowBlank&&$('<a class="x-dropdown-item"/>').text("--请选择--").appendTo(t.$listView)},_onItemCreate:function(e,t,i){var n=this.options,a=this
if(IBPS.Utils.applyFunc(this,n.onItemCreate,[e,t],!1)===!1){var s=IBPS.Utils.applyFunc(this,n.onDataFilter,[e,t],!1)
s!==!1&&(e=s)
var l=e[n.textField],o=e[n.valueField]
if(this.valueMap[o]=l,!IBPS.Utils.isEmpty(i)&&!RegExp(IBPS.Utils.escapeRegexp(i),"i").test(l+""))return!1
var r=$('<a class="x-dropdown-item"/>').data("item",e).attr("option",o).attr("title",l).text(l).appendTo(this.$listView)
if((e.selected||!IBPS.Utils.isEmpty(o)&&this._isSelected(o))&&($(".select",this.triggerView).removeClass("select"),r.addClass("select"),this.value=o,this.text=l,this.editComp.val(l)),e.isOther){var c=$('<div class="fui-text-other"/>')
this.element.after(c),this.textOther=IBPS.createWidget({renderEl:c,width:n.width?n.width:240,type:"text",visible:!!e.selected,onStopEdit:function(){IBPS.Utils.applyFunc(a,n.onStopEdit,[],!1)}}),r.addClass("item-other")}}},_isSelected:function(e){return this.value==e},_bindViewEvts:function(){var e=this,t="click",i=!1
this.triggerView.bind(t,function(t){if(i)return void(i=!1)
var n=$(t.target).closest("a")
if(n.length>0){var a=n.data("item")
e._onItemClick(n,a),t.stopPropagation()}})},_onItemClick:function(e,t){var i=this.options
$(".select",this.triggerView).removeClass("select"),t?(e.addClass("select"),this.value=t[i.valueField],this.text=t[i.textField]):(this.value=null,this.text=null),this.editComp.val(this.text),this.textOther&&this.textOther.setVisible(e.hasClass("item-other")),IBPS.Utils.applyFunc(this,i.onAfterItemSelect,[e,t],!1),IBPS.Utils.applyFunc(this,i.onAfterEdit,[e,t],!1),this.changed=!0,this._hideTriggerView()},effectItemLinkWidgets:function(){var e=this.options
if(!e.async&&this.triggerView){var t=$(".select",this.triggerView)
IBPS.Utils.applyFunc(this,e.onAfterItemSelect,[t,t.data("item")],!1)}},checkValidate:function(){var e=this.options
return!(!e.allowBlank&&IBPS.Utils.isEmpty(this.getValue()))},setEnable:function(e){IBPS.ComboBox.superclass.setEnable.apply(this,[e]),this.textOther&&this.textOther.setEnable(e)},setValue:function(e){if(this.value=e,this.valueMap&&this.valueMap[e]?this.text=this.valueMap[e]:this.text=e,this.triggerView)if($(".select",this.triggerView).removeClass("select"),IBPS.Utils.isEmpty(e))this.textOther&&this.textOther.setVisible(!1)
else{var t=[]
if($("a.x-dropdown-item",this.$listView).each(function(i,n){var a=$(n).attr("option")
a==e&&(t=$(n).addClass("select"))}),this.textOther){if(0===t.length)return void this.setOtherItemSelect(e)
this.textOther.setVisible(!1)}}this.editComp&&this.editComp.val(this.text)},setOtherItemSelect:function(e){this.$listView.children(".item-other").addClass("select"),this.editComp.val("其他"),this.textOther.setVisible(!0),this.textOther.setValue(e)},setText:function(e){this.text=e,this.editComp&&this.editComp.val(e)},getValue:function(){return this.textOther&&this.textOther.isVisible()?this.textOther.getValue():this.value},getText:function(){return this.textOther&&this.textOther.isVisible()?this.textOther.getValue():this.text},rebuild:function(){this.triggerView&&(this.triggerView.remove(),this.triggerView=null,this.$listView=null,this.textOther&&(this.textOther.destroy(),this.textOther=null)),IBPS.ComboBox.superclass.rebuild.apply(this,arguments)},getOptions:function(){var e=this.options,t={noRepeat:e.noRepeat}
return e.async&&e.async.url?t.async=e.async:t.items=e.items,$.extend(IBPS.ComboBox.superclass.getOptions.apply(this,arguments),t)}}),$.shortcut("combo",IBPS.ComboBox)}.call(this),function(){IBPS.Slider=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.Slider.superclass._defaultConfig.apply(this,arguments),{renderEl:$("<div />").appendTo("body"),baseCls:"x-slider",title:"",contentWidget:{},content:null,position:"bottom",contentWidth:"100%",onCreate:null,onBeforeClose:null,onClose:null,btn4Left:null,closeDuration:218,autoClose:!1,onContentCreate:null,onHeaderCreate:null})},_init:function(){IBPS.Slider.superclass._init.apply(this,arguments)
var e=this.options,t=this
this.element.css({"z-index":IBPS.STATIC.zIndex++}),e.position&&this.element.addClass(e.position)
var i=$('<div class="slider-body"/>').appendTo(this.element).css({width:e.contentWidth}),n=$('<div class="slider-header"/>').appendTo(i)
IBPS.Utils.applyFunc(this,e.onHeaderCreate,[n],!1)===!1&&n.append($('<span class="title"/>').text(e.title)),IBPS.Utils.isNull(e.btn4Left)||$('<div class="header-btn"/>').text(e.btn4Left.text).on("click",function(){IBPS.Utils.applyFunc(this,e.btn4Left.onClick,[],!1)}).appendTo(n),$('<i class="icon-close-large"/>').click(function(){t._doClose()}).appendTo(n)
var a=$('<div class="slider-main"/>').appendTo(i)
this._createContent(a),this._bindEvent()},_createContent:function(e){var t=this.options,i=this
IBPS.Utils.applyFunc(this,t.onContentCreate,[e],!1)===!1&&(IBPS.Utils.isObjectEmpty(t.contentWidget)?e.append(t.content):i.contentWidget=IBPS.createWidget($.extend({renderEl:$("<div/>").appendTo(e)},t.contentWidget)))},getContentWidget:function(){return this.contentWidget},_doClose:function(){var e=this.options
IBPS.Utils.applyFunc(this,e.onBeforeClose,null,!0)&&this.close()},show:function(){var e=this
setTimeout(function(){e.element.addClass("fadein")},0)},close:function(){var e=this.options,t=this
this.element.removeClass("fadein"),setTimeout(function(){t.element.remove(),IBPS.Utils.applyFunc(t,e.onClose,[],!1)},e.closeDuration)},_bindEvent:function(){var e=this,t=this.options
t.autoClose&&this.element.click(function(i){$(i.target).hasClass(t.baseCls)&&e._doClose()})}})}.call(this),function(){IBPS.PrintUtils=function(e,t,i){var n=this
this.styleKey=1,this.imageKey=1,this.styleMap={},this.imageMap={},this.styleNameMap={},this.images=t,this.dpi=i,e["default"]&&(this.defaultStyle=e["default"]),IBPS.Utils.forEach(e,function(e,t){n.styleKey++,n.styleMap[e]=t,n.styleNameMap[JSON.stringify(t)]=e})},$.extend(IBPS.PrintUtils.prototype,{DEFAULT_STYLE_NAME:"default",STYLE_MAP:{htTop:{type:"vertical-align",style:"top"},htBottom:{type:"vertical-align",style:"bottom"},htMiddle:{type:"vertical-align",style:"middle"},htLeft:{type:"text-align",style:"left"},htRight:{type:"text-align",style:"right"},htCenter:{type:"text-align",style:"center"},bold:{type:"font-weight",style:"bold"},italic:{type:"font-style",style:"italic"},underline:{type:"text-decoration",style:"underline",result:"array"},"ff-SimSun":{type:"font-family",style:"SimSun"},"ff-KaiTi":{type:"font-family",style:"KaiTi"},"ff-SimHei":{type:"font-family",style:"SimHei"}},ClASS_MAP:{"vertical-align":{top:"htTop",bottom:"htBottom",middle:"htMiddle"},"text-align":{left:"htLeft",right:"htRight",center:"htCenter"},"font-weight":{bold:"bold"},"font-style":{italic:"italic"},"font-family":{SimSun:"ff-SimSun",KaiTi:"ff-KaiTi",SimHei:"ff-SimHei"},"text-decoration":{underline:"underline"},"font-size":"style"},DEFAULT_STYLE:{"font-family":"SimSun","font-size":12,"font-style":"normal","font-weight":"normal",color:"#000","line-height":14.4,padding:[4],"text-align":"left","vertical-align":"middle","text-decoration":[],opacity:1,"border-style":"none","border-color":"#000"},PAGE_SIZE:{A4:{width:210,height:297},A3:{width:297,height:420},A5:{width:148,height:210},B5:{width:176,height:250}},getPageSize:function(e){var t={}
return IBPS.Utils.isArray(e.size)?t={width:Math.ceil(e.size[0]),height:Math.ceil(e.size[1])}:(e.size=e.size||"A4",t={width:Math.ceil(this.PAGE_SIZE[e.size].width/25.4*this.dpi.design),height:Math.ceil(this.PAGE_SIZE[e.size].height/25.4*this.dpi.design)}),"landscape"===e.layout&&(t={width:t.height,height:t.width}),2===e.margin.length?(t.width=t.width-2*e.margin[1],t.height=t.height-2*e.margin[0]):4===e.margin.length&&(t.width=t.width-e.margin[1]-e.margin[3],t.height=t.height-e.margin[0]-e.margin[2]),t},getPageMargin:function(e){var t={}
return IBPS.Utils.forEach(e.margin,function(e,i){switch(e){case 0:t.top=i,t.bottom=i
break
case 1:t.left=i,t.right=i
break
case 2:t.bottom=i
break
case 3:t.left=i}}),t},getStyleByClassName:function(e){return $.extend(this._defaultCellStyle(),this.className2Style(e))},getStyleNameByCell:function(e){var t=this.className2Style(e.className)
if(IBPS.Utils.isObjectEmpty(t))return this.DEFAULT_STYLE_NAME
var i=JSON.stringify(t)
if(!this.styleNameMap[i]){var n=this._getStyleKey()
this.styleNameMap[i]=n,this.styleMap[n]=t}return this.styleNameMap[i]},getStyles:function(){var e=this
return IBPS.Utils.forEach(this.styleMap,function(t,i){e.styleMap[t]=e._design2Print(i)}),this.styleMap},getImages:function(){var e={}
return IBPS.Utils.forEach(this.imageMap,function(t,i){e[i.key]=i.image}),e},hasBorder:function(e){return e!==this.DEFAULT_STYLE_NAME&&this.styleMap[e]&&this.styleMap[e]["border-width"]},initStyles:function(){this.styleKey=1,this.imageKey=1,this.styleNameMap={},this.styleMap={},this.styleMap[this.DEFAULT_STYLE_NAME]=this._defaultCellStyle()},_print2Design:function(e,t){switch(e){case"font-size":return Math.round(t/this.dpi.design*this.dpi.print)
case"line-height":return IBPS.Utils.fixDecimalPrecision(t/this.dpi.design*this.dpi.print,1)
default:return t}},_design2Print:function(e){var t=this
return IBPS.Utils.forEach(e,function(i,n){switch(i){case"font-size":e[i]=Math.round(n/t.dpi.print*t.dpi.design)
break
case"line-height":e[i]=IBPS.Utils.fixDecimalPrecision(n/t.dpi.print*t.dpi.design,1)}}),e},_defaultCellStyle:function(){var e={},t=this
return IBPS.Utils.forEach(this.defaultStyle||this.DEFAULT_STYLE,function(i,n){e[i]=t._print2Design(i,n)}),e},className2Style:function(e){var t=this,i={}
if(IBPS.Utils.isEmpty(e))return i
var n=this._defaultCellStyle(),a=[]
return IBPS.Utils.forEach(e.split(" "),function(e,s){if(/font-size-[0-9]{1,2}/.test(s)){var l=s.replace("font-size-","")
if(l=parseInt(l),n["font-size"]===l)return
i["font-size"]=l,i["line-height"]=IBPS.Utils.fixDecimalPrecision(1.2*l,1)}else/border-/.test(s)&&a.push(s)
var o=t.STYLE_MAP[s]
o&&n[o.type]!==o.style&&("array"===o.result?i[o.type]=[o.style]:i[o.type]=o.style)}),$.extend(i,this._border2Style(a)),i},_border2Style:function(e){var t={}
IBPS.Utils.forEach(e,function(e,i){if(/border-width-[0-4]{1}/.test(i))return t.width=parseInt(i.replace("border-width-","")),null
switch(i){case"border-left":t.left=!0
break
case"border-top":t.top=!0
break
case"border-right":t.right=!0
break
case"border-bottom":t.bottom=!0}})
var i={}
i["border-style"]="solid",i["border-width"]=t.width||1
var n=4
return IBPS.Utils.forEach(["left","top","right","bottom"],function(e,a){var s=t[a],l=["border",a,"width"].join("-")
s||(i[l]=0,n--)}),n>0?i:{}},style2ClassName:function(e){if(e===this.DEFAULT_STYLE_NAME)return""
var t=this,i=""
return e=this.styleMap[e],IBPS.Utils.forEach(e,function(e,n){if(t.ClASS_MAP[e]){if("style"==t.ClASS_MAP[e])return n=t._print2Design(e,n),void(i+=" "+[e,n].join("-"))
if(IBPS.Utils.isArray(n))IBPS.Utils.forEach(n,function(a,s){t.ClASS_MAP[e][s]&&(IBPS.Utils.isEmpty(i)||(i+=" "),i+=t.ClASS_MAP[e][n])})
else{if(!t.ClASS_MAP[e][n])return
IBPS.Utils.isEmpty(i)||(i+=" "),i+=t.ClASS_MAP[e][n]}}}),i},formatData:function(e){var t=this,i=[]
return e?(IBPS.Utils.forEach(e,function(e,n){if(!n.image)return void i.push(n)
var a=t.images[n.image]||n.image,s=a.id
if(s){var l=""
t.imageMap[s]?l=t.imageMap[s].key:(l=t._getImageKey(),t.imageMap[s]={key:l,image:a}),i.push({image:l,fit:[100,100]})}}),i):i},_getStyleKey:function(){return"s_"+this.styleKey++},_getImageKey:function(){return"img_"+this.imageKey++}})}.call(this),function(){IBPS.PrintPane=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.PrintPane.superclass._defaultConfig.apply(),{baseCls:"fx_print_pane",appId:"",entryId:"",hasCoop:!0,fonts:{}})},_init:function(){IBPS.PrintPane.superclass._init.apply(this,arguments)
var e=this.options
IBPS.STATIC.APPID=e.appId,IBPS.STATIC.ENTRYID=e.entryId,this._initContent(),this._initFields(),this._bindConfirmBeforeClose()},_initHead:function(e){var t=this,i=$('<div class="print-head"/>').appendTo(this.element)
new IBPS.TitleEditor({renderEl:$("<div/>").appendTo(i),defaultName:"未命名模版",name:e,onStopEdit:function(e){t.template.name=e.name}}),this._initMenu(i)},_fetchContent:function(){var _this=this,options=this.options
$.ajax({url:__ctx+"/platform/form/formPrintTemplate/get.htm",type:"get",dataType:"json",async:!1,data:{id:options.printId},success:function(data){return data.result?(_this.template=data.template,_this._initHead(_this.template.name),void _this.setValue(eval("("+_this.template.content+")"))):void DialogUtil.error(data.message)}})},_initMenu:function(e){var t=this,i=this.options,n=$('<div class="menu-btn-group"/>').on("click",function(e){var n=$(e.target).closest(".menu-btn")
if(n.length)switch(n.data("action")){case"close":DialogUtil.closeDialog()
break
case"save":t.doSave({name:t.template.name,content:t.getValue()},function(e){DialogUtil.confirm("保存成功,是否继续操作？",function(e){i.callback(e),e||DialogUtil.closeDialog()})})}}).appendTo(e)
n.append($('<a class="btn btn-primary fa fa-save menu-btn">保存</a>').data("action","save")).append($('<a class="btn btn-danger fa fa-close menu-btn">关闭</a>').data("action","close"))},_initFields:function(){var _this=this,options=this.options
$.ajax({url:__ctx+"/platform/form/formDef/getFields.htm",type:"get",dataType:"json",async:!1,data:{formKey:options.formKey},success:function(data){data.result&&(_this.fieldsMap=_this.getFieldsMapData(eval("("+data.fields+")")),_this.fields=new IBPS.PrintFields({renderEl:$('<div class="print-field"/>').appendTo(_this.element.children(".print-body")),fieldContainer:_this.table.element,fields:_this.fieldsMap,hasFlowFields:!options.hasCoop,onDragStart:function(){_this.table.clearCurrentCell()},onDrag:function(){_this.table.selectCurrentCell()},onDrop:function(e,t){var i=$(t.target),n=i.closest("td.current")
n.length&&_this.table.setCurrentCellData(e)},onUndo:function(e){_this.table.removeCellField(e)}}),_this.table.setFieldNameMap(_this.fields.getFieldNameMap()),_this._fetchContent())}})},getFieldsMapData:function(e){var t=[],i=["flow_diagram","approval_history","desc","page_break","section_break"]
return $.each(e,function(e,n){return $.inArray(n.field_type,i)>-1?!0:void t.push(n)}),t},_initContent:function(){var e=this,t=this.options,i=$('<div class="print-body"/>').appendTo(this.element)
this.table=new IBPS.PrintTable({renderEl:$('<div class="print-table"/>').appendTo(i),onBeforeCellEdit:function(){e.menu.setEnable(!1)},onAfterChange:function(t,i){e.menu.setEnable(!0),t&&t.fields&&e.fields.setSelected(t.fields[0],!1),i&&i.fields&&e.fields.setSelected(i.fields[0],!0),e._checkMenuEnable()},onAfterSelect:function(t,i){e._setMenuState(t),e.menu.setMerge(i?"unmerge":"merge")},onAfterMerge:function(t){e.menu.setMerge(t?"unmerge":"merge")}}),this.menu=new IBPS.PrintMenu({renderEl:$('<div class="print-menu"/>').appendTo(i),printId:t.printId,fonts:t.fonts,onMenuClick:function(t){e._dealMenuEvent(t)}})},_checkMenuEnable:function(){this.menu.setMenuEnable("undoRedo","undo",this.table.checkUndoRedo("undo")),this.menu.setMenuEnable("undoRedo","redo",this.table.checkUndoRedo("redo"))},_dealMenuEvent:function(e){var t=this,i=this.options
switch(e.type){case"merge":this.table.mergeOrUnMerge()
break
case"fontStyle":this.table.setCellStyle(e)
break
case"align":this.table.setCellAlign(e)
break
case"border":this.table.setCellBorder(e)
break
case"undoRedo":this.table.undoRedo(e.action)
break
case"insert":this.table.insertOrDelete(e)
break
case"paper":this.table.setPage(e.value)
break
case"img":"setBgImg"===e.action?IBPS.Utils.isObjectEmpty(e.value.file)?this.table.removeBackground():this.table.setBackground(e.value):"insertImg"===e.action&&this.table.setCurrentCellImage(e.file)
break
case"global":"headerFooter"===e.action&&new IBPS.Slider({title:"页眉页脚设置",contentWidget:{type:"printpage",customCls:"fx_print_table",fonts:i.fonts,data:this.getValue(),dpi:this.value.dpi,content:this.table.getPageContent()},onClose:function(){t.pageValue=this.contentWidget.getValue()}}).show()}this._checkMenuEnable()},_setMenuState:function(e){this.menu.setMenuStyles(e)},setValue:function(e){this.value=$.extend(!0,{},e),e["default"]&&(this.table.options.rowHeight=e["default"].row_height,this.table.options.colWidth=e["default"].col_width),this.pageValue={footer:e.footer,header:e.header,styles:e.styles},this.menu.setValue(e),this.table.setValue(e)},getValue:function(){var e=$.extend({type:this.value.type,header:this.value.header,footer:this.value.footer,dpi:this.value.dpi,watermark:this.value.watermark,"default":this.value["default"]},this.menu.getValue(),this.table.getValue())
if(this.pageValue){$.extend(e,{footer:this.pageValue.footer,header:this.pageValue.header})
var t={}
IBPS.Utils.forEach(this.pageValue.styles,function(e,i){/hf_/.test(e)&&(t[e]=i)}),$.extend(e.styles,t)}return e},doSave:function(e,t){var i=this,n=this.options
$.ajax({url:__ctx+"/platform/form/formPrintTemplate/save.htm",type:"post",dataType:"json",data:{id:n.printId,formKey:n.formKey,data:JSON.stringify(e)},success:function(e){1==e.result?(IBPS.Utils.isEmpty(n.printId)&&(i.options.printId=e.id),t&&t(e.data)):DialogUtil.error(e.message,e.cause)}})},_compareTemplate:function(){var e=this.getValue(),t=this.value,i=["cols","rows","cells","merge","range","styles","background","images","page"],n=!0
return IBPS.Utils.forEach(i,function(i,a){var s=JSON.stringify(e[a]),l=JSON.stringify(t[a])
return l!==s?(n=!1,!1):void 0}),n},_bindConfirmBeforeClose:function(){var e=this
window.onbeforeunload=function(t){if(!e._compareTemplate()){t=t||window.event
var i="当前模版未保存"
return t&&(t.returnValue=i),i}}}}),$.shortcut("printpane",IBPS.PrintPane)}.call(this),function(){IBPS.PrintTable=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.PrintTable.superclass._defaultConfig.apply(),{baseCls:"fx_print_table",rowHeaderWidth:50,columnHeaderHeight:30,rowHeight:24,colWidth:100,onAfterChange:null,onAfterSelect:null,colHeaders:!0,rowHeaders:!0,hasEditor:!0,hasPaperBorder:!0,minRows:100,minCols:25,maxRows:200,maxCols:50})},_init:function(){IBPS.PrintTable.superclass._init.apply(this,arguments)
var e=this.options
this._expandTable(),this.value=e.value||{},this._initTable()},setPage:function(e){this.page=e,this.pageSize=this.printUtils.getPageSize(e)
var t=this.options,i=$(".ht_master",this.element).find(".wtHider"),n=this.printTable.countRows(),a=0,s=0,l=this.printTable.countCols(),o=0,r=0
this.rows=[]
for(var c=0;n>c;c++){var d=this.printTable.getRowHeight(c)
if(a+=d,a>this.pageSize.height){a-=d
break}this.rows.push(d),s=c}this.cols=[]
for(var u=0;l>u;u++){var p=this.printTable.getColWidth(u)
if(o+=p,o>this.pageSize.width){o-=p
break}this.cols.push(p),r=u}this.range={s:[0,0],e:[s,r]},t.hasPaperBorder&&($(".paper-horizontal",i).remove(),$('<div class="paper-horizontal"/>').appendTo(i).css({top:a+t.columnHeaderHeight,left:t.rowHeaderWidth}),$(".paper-vertical",i).remove(),$('<div class="paper-vertical"/>').appendTo(i).css({left:o+t.rowHeaderWidth,top:t.columnHeaderHeight})),this._resizeBackground(i,this.pageSize,e.margin)},setBackground:function(e){var t=this,i=this.options,n=$(".ht_master",t.element).find(".wtHider")
if($(".paper-background",n).remove(),!IBPS.Utils.isObjectEmpty(e)){var a=e.file||this.imageMap.background
this.imageMap.background=a,a&&IBPS.Utils.getFileDownloadURL(a,function(e){$('<div class="paper-background"/>').appendTo(n).css({left:i.rowHeaderWidth,top:i.columnHeaderHeight}).append($('<div class="background-img"/>').css({"background-image":'url("'+e+'")'})),t._resizeBackground(n,{width:t.pageSize.width,height:t.pageSize.height},t.page.margin)})}},removeBackground:function(){var e=$(".ht_master",this.element).find(".wtHider")
$(".paper-background",e).remove(),this.imageMap.background=null},_resizeBackground:function(e,t,i){var n=$(".paper-background",e),a=""
IBPS.Utils.forEach(i,function(e,t){a+=-t+"px "}),n.length>0&&(n.css({width:t.width,height:t.height}),n.children(".background-img").css({margin:a}))},_initTable:function(){var e=this,t=this.options
this.printTable=new Handsontable(this.element[0],{renderAllRows:!0,minRows:t.minRows,minCols:t.minCols,maxRows:t.maxRows,maxCols:t.maxCols,cells:function(i,n,a){this.renderer=function(t,i,n,a,s,l,o){var r=""
return e.loadingMap&&e.loadingMap[e._getCellTag(n,a)]?r+=e._getCellText({loading:!0}):l&&(r+=e._getCellText(l)),i.innerHTML='<div class="content"><div class="data">'+r+"</div></div>",i.className=t.getCellMeta(n,a).className||"",i}
var s=e.dataMap&&e.dataMap[e._getCellTag(i,n)]
!t.hasEditor||s&&!IBPS.Utils.isString(s[0])?this.editor=!1:this.editor="text"},colWidths:function(i){var n=e.value.cols
return n&&n.length>i&&n[i]?n[i]:t.colWidth},rowHeights:function(i){var n=e.value.rows
return n&&n.length>i&&n[i]?n[i]:t.rowHeight},columnHeaderHeight:t.columnHeaderHeight,rowHeaderWidth:t.rowHeaderWidth,rowHeaders:t.rowHeaders,colHeaders:t.colHeaders,manualColumnResize:!0,manualRowResize:!0,mergeCells:!0,contextMenu:this._getContextMenu(),customBorders:!0}),this._addTableHook()},_getContextMenu:function(){var e=this
return{callback:function(t,i){switch(t){case"merge":e.mergeOrUnMerge()
break
case"insertRow":case"insertCol":case"delRow":case"delCol":e.insertOrDelete({value:t})
break
case"rowHeight":case"colWidth":e.setSize({value:t})
break
case"empty":e.clearCellData()}},items:{insertRow:{name:"插入行"},delRow:{name:"删除行"},rowHeight:{name:"行高(R)",disabled:function(){var t=e.printTable.getSelected()
if(!t)return!1
var i=e.printTable.countRows(),n=Math.abs(t[0]-t[2]),a=n>=i-1?!0:!1
return a}},hsep1:"---------",insertCol:{name:"插入列"},delCol:{name:"删除列"},colWidth:{name:"列宽(C)",disabled:function(){var t=e.printTable.getSelected()
if(!t)return!1
var i=e.printTable.countCols(),n=Math.abs(t[1]-t[3]),a=n>=i-1?!0:!1
return a}},hsep2:"---------",merge:{name:"合并"},empty:{name:"清除内容"}}}},_addTableHook:function(){var e=this,t=this.options
this.printTable.addHook("afterSelectionEnd",function(i,n,a,s){e.selectRange=[i,n,a,s]
var l=e.printTable.getCellMeta(i,n)
IBPS.Utils.applyFunc(e,t.onAfterSelect,[e.printUtils.getStyleByClassName(l.className),e._isCellMerge(i,n,a,s)],!1)}),this.printTable.addHook("afterBeginEditing",function(i,n,a){IBPS.Utils.applyFunc(e,t.onBeforeCellEdit,[],!1)}),this.printTable.addHook("beforeCellStyle",function(t,i,n){var a=new Handsontable.plugins.UndoRedo.CellStyleAction(t,i,n)
e.printTable.undoRedo.done(a)}),this.printTable.addHook("beforeCellMerge",function(i,n,a){var s=new Handsontable.plugins.UndoRedo.CellMergeAction(i,n,a)
e.printTable.undoRedo.done(s),IBPS.Utils.applyFunc(e,t.onAfterMerge,[e._isCellMerge(n.from.row,n.from.col,n.to.row,n.to.col)],!1)}),this.printTable.addHook("beforeCellBorder",function(t,i,n){var a=new Handsontable.plugins.UndoRedo.CellBorderAction(t,i,n)
e.printTable.undoRedo.done(a)}),this.printTable.addHook("afterOnCellMouseOver",function(t,i,n){e.currentCell=i}),this.printTable.addHook("beforeChange",function(t,i){IBPS.Utils.forEach(t,function(t,i){var n=e._getCellTag(i[0],i[1])
IBPS.Utils.isEmpty(i[3])?e.dataMap[n]=void 0:e.dataMap[n]=[i[3]]})}),this.printTable.addHook("afterChange",function(i,n){IBPS.Utils.forEach(i,function(i,n){n[3]&&n[3].fields&&(e.fieldMap[n[3].fields[0]]=[n[0],n[1]]),IBPS.Utils.applyFunc(e,t.onAfterChange,[n[2],n[3]],!1)})}),this.printTable.addHook("afterColumnResize",function(i,n){var a=new Handsontable.plugins.UndoRedo.ColWidthAction({col:i,size:e.value.cols[i]||t.colWidth,newSize:n})
e.value.cols[i]=n,e.printTable.undoRedo.done(a),e.printTable.render(),e.setPage(e.page),IBPS.Utils.applyFunc(e,t.onAfterChange,[],!1)}),this.printTable.addHook("afterRowResize",function(i,n){var a=new Handsontable.plugins.UndoRedo.RowHeightAction({row:i,size:e.value.rows[i]||t.rowHeight,newSize:n})
e.value.rows[i]=n,e.printTable.undoRedo.done(a),e.printTable.render(),e.setPage(e.page),IBPS.Utils.applyFunc(e,t.onAfterChange,[],!1)}),this.printTable.addHook("afterSetCellMeta",function(t,i,n,a){"borders"===n&&(e.borderState[e._getCellTag(t,i)]=a)})},_expandTable:function(){var e=this
Handsontable.plugins.UndoRedo.CellStyleAction=function(e,t,i){this.stateBefore=e,this.range=t,this.style=i},Handsontable.plugins.UndoRedo.CellStyleAction.prototype.undo=function(e,t){for(var i=this.range.from.row;i<=this.range.to.row;i++)for(var n=this.range.from.col;n<=this.range.to.col;n++)e.setCellMeta(i,n,"className",this.stateBefore[i][n])
e.addHookOnce("afterRender",t),e.render()},Handsontable.plugins.UndoRedo.CellStyleAction.prototype.redo=function(t,i){t.selectCell(this.range.from.row,this.range.from.col,this.range.to.row,this.range.to.col),e.setCellStyle(this.style,this.range),t.addHookOnce("afterRender",i),t.render()},Handsontable.plugins.UndoRedo.CellMergeAction=function(e,t,i){this.stateBefore=e,this.dataBefore=i,this.range=t},Handsontable.plugins.UndoRedo.CellMergeAction.prototype.undo=function(t,i){e.unMerge(this.range),e.mergeOrUnMerge(this.range),IBPS.Utils.forEach(this.stateBefore,function(e,i){t.mergeCells.mergedCellInfoCollection.setInfo(i)}),IBPS.Utils.forEach(this.dataBefore,function(i,n){var a=e._splitCellTag(i)
t.setDataAtCell(a[0],a[1],n),t.undoRedo.doneActions.pop()}),t.addHookOnce("afterRender",i),t.render(),e.printTable.render()},Handsontable.plugins.UndoRedo.CellMergeAction.prototype.redo=function(t,i){e.mergeOrUnMerge(this.range),t.addHookOnce("afterRender",i),t.render()},Handsontable.plugins.UndoRedo.CellBorderAction=function(e,t,i){this.stateBefore=e,this.range=t,this.data=i},Handsontable.plugins.UndoRedo.CellBorderAction.prototype.undo=function(t,i){e._dealBorderState(this.range,this.stateBefore),t.addHookOnce("afterRender",i),t.render()},Handsontable.plugins.UndoRedo.CellBorderAction.prototype.redo=function(t,i){e.setCellBorder(this.data,this.range),t.addHookOnce("afterRender",i),t.render()},Handsontable.plugins.UndoRedo.RowHeightAction=function(e){this.stateBefore=e},Handsontable.plugins.UndoRedo.RowHeightAction.prototype.undo=function(t,i){t.getPlugin("ManualRowResize").setManualSize(this.stateBefore.row,this.stateBefore.size),e.value.rows[this.stateBefore.row]=this.stateBefore.size,t.addHookOnce("afterRender",i),t.render(),e.setPage(e.page)},Handsontable.plugins.UndoRedo.RowHeightAction.prototype.redo=function(t,i){t.getPlugin("ManualRowResize").setManualSize(this.stateBefore.row,this.stateBefore.newSize),e.value.rows[this.stateBefore.row]=this.stateBefore.newSize,t.addHookOnce("afterRender",i),t.render(),e.setPage(e.page)},Handsontable.plugins.UndoRedo.ColWidthAction=function(e){this.stateBefore=e},Handsontable.plugins.UndoRedo.ColWidthAction.prototype.undo=function(t,i){t.getPlugin("ManualColumnResize").setManualSize(this.stateBefore.col,this.stateBefore.size),e.value.cols[this.stateBefore.col]=this.stateBefore.size,t.addHookOnce("afterRender",i),t.render(),e.setPage(e.page)},Handsontable.plugins.UndoRedo.ColWidthAction.prototype.redo=function(t,i){t.getPlugin("ManualColumnResize").setManualSize(this.stateBefore.col,this.stateBefore.newSize),e.value.cols[this.stateBefore.col]=this.stateBefore.newSize,t.addHookOnce("afterRender",i),t.render(),e.setPage(e.page)}},_isCellMerge:function(e,t,i,n){var a=this.printTable.mergeCells,s=a.mergedCellInfoCollection.getInfo(e,t)
return s&&e+s.rowspan-1===i&&t+s.colspan-1===n},mergeOrUnMerge:function(e){var t=this
if(e||(e=this.printTable.getSelectedRange()),e&&!e.isSingle()){var i=[],n=this.printTable.mergeCells,a=n.mergedCellInfoCollection.getInfo(e.from.row,e.from.col)
if(this._isCellMerge(e.from.row,e.from.col,e.to.row,e.to.col))return i.push(a),n.unmergeSelection(e.from),this.printTable.runHooks("beforeCellMerge",i,e),void this.printTable.render()
var s=[]
e=this._formatRange(e)
for(var l=e.from.row;l<=e.to.row;l++)for(var o=e.from.col;o<=e.to.col;o++)$(this.printTable.getCell(l,o)).is(":visible")&&this.printTable.getDataAtCell(l,o)&&s.push({row:l,col:o})
s.length<=1?this.merge(e,s):DialogUtil.confirm("选择的区域包含多个数据，合并单元格后将只保留编辑过的所有单元格中最左上角的数值",function(i){i&&t.merge(e,s)})}},merge:function(e,t){var i=this,n=this.unMerge(e)
this.printTable.mergeCells.mergeSelection(e)
var a={},s=null
IBPS.Utils.forEach(t,function(e,t){var n=i._getCellTag(t.row,t.col)
a[n]=i.dataMap[n]&&i.dataMap[n][0],s||(s=a[n])}),this.printTable.selectCell(e.from.row,e.from.col,e.to.row,e.to.col),this.clearCellData(),this.printTable.undoRedo.doneActions.pop(),s&&(this.printTable.setDataAtCell(e.from.row,e.from.col,s),this.printTable.undoRedo.doneActions.pop()),this.printTable.runHooks("beforeCellMerge",n,e,a),this.printTable.render()},unMerge:function(e){var t=this.printTable.mergeCells,i=[]
return IBPS.Utils.forEach(t.mergedCellInfoCollection,function(t,n){n.row<e.from.row||n.col<e.from.col||n.row>e.to.row||n.col>e.to.col||i.push(n)}),IBPS.Utils.forEach(i,function(e,n){t.mergedCellInfoCollection.removeInfo(i.row,i.col)}),i},setCellStyle:function(e,t){if(t||(t=this.printTable.getSelectedRange()),t){var i=this._getCellClasses(t)
switch(this.printTable.runHooks("beforeCellStyle",i,t,e),e.action){case"fontSize":this._dealFontSize(t,e.value)
break
case"fontFamily":this._dealFontFamily(t,e.value)
break
default:this._dealFontStyle(t,e.action)}}},setCellAlign:function(e){var t=this.printTable.getSelectedRange()
if(t){var i=this._prepareAlignStyle(e.action)
this._dealAlignment(t,i.type,i.alignment)}},setCellBorder:function(e,t){if(t||(t=this.printTable.getSelectedRange()),t){t=this._formatRange(t)
var i=this._getCellBorders(t)
switch(this.printTable.runHooks("beforeCellBorder",i,t,e),e.action){case"borderLine":this._dealBorder(t,e.value)
break
case"borderWeight":this._dealBorderWeight(t,e.value)}}},setSize:function(e){var t=this,i=this.printTable.getSelected()
if(i){var n=i[0],a=i[1],s=i[2]
switch(col1=i[3],e.value){case"rowHeight":var l=this.printTable.getRowHeight(n)
laydialog.prompt({title:"行高",value:l},function(e,i){laydialog.close(i)
for(var a=n;s>=a;a++)t.printTable.runHooks("afterRowResize",a,e)})
break
case"colWidth":var l=this.printTable.getColWidth(a)
laydialog.prompt({title:"列宽",value:l},function(e,i){laydialog.close(i)
for(var n=a;n<=col1;n++)t.printTable.runHooks("afterColumnResize",n,e)})}}},insertOrDelete:function(e){var t=this.printTable.getSelected()
if(t){var i=this.printTable.countRows(),n=this.printTable.countCols(),a=Math.abs(t[0]-t[2]),s=Math.abs(t[1]-t[3]),l=a>=i-1?!0:!1,o=s>=n-1?!0:!1
switch(e.value){case"insertRow":this.insertRow()
break
case"delRow":if(l)return
this.removeRow()
break
case"insertCol":this.insertColumn()
break
case"delCol":if(o)return
this.removeColumn()}this._refreshDataMap(),this.printTable.selectCell(t[0],t[1],t[2],t[3]),this.printTable.render()}},removeColumn:function(){var e=this._getSelection()
if(e){var t=e.end.col-e.start.col+1
this.printTable.alter("remove_col",e.start.col,t)}},removeRow:function(){var e=this._getSelection()
if(e){var t=e.end.row-e.start.row+1
this.printTable.alter("remove_row",e.start.row,t)}},insertColumn:function(){var e=this._getSelection()
e&&this.printTable.alter("insert_col",e.start.col)},insertRow:function(){var e=this._getSelection()
e&&this.printTable.alter("insert_row",e.start.row)},undoRedo:function(e){switch(e){case"undo":this.printTable.undo()
break
case"redo":this.printTable.redo()}},checkUndoRedo:function(e){switch(e){case"undo":return this.printTable.undoRedo.isUndoAvailable()
case"redo":return this.printTable.undoRedo.isRedoAvailable()}},clearUndoRedo:function(){var e=this.options
this.printTable.undoRedo.clear(),IBPS.Utils.applyFunc(this,e.onAfterChange,[],!1)},_refreshDataMap:function(){var e=this,t=this.options,i=this.printTable.getData(this.range.s[0],this.range.s[1],this.printTable.countRows(),this.printTable.countCols())
IBPS.Utils.forEach(i,function(i,n){IBPS.Utils.forEach(n,function(n,a){var s=e._getCellTag(i,n)
IBPS.Utils.isEmpty(a)?e.dataMap[s]&&(IBPS.Utils.applyFunc(e,t.onAfterChange,[e.dataMap[s][0],a],!1),e.dataMap[s]=void 0):e.dataMap[s]=[a]})})},_getSelection:function(){var e=this.printTable.getSelectedRange()
return e?{start:e.getTopLeftCorner(),end:e.getBottomRightCorner()}:null},_dealFontSize:function(e,t){if(e.from.row==e.to.row&&e.from.col==e.to.col)this._dealFontSizeClass(e.from.row,e.from.col,t)
else{e=this._formatRange(e)
for(var i=e.from.row;i<=e.to.row;i++)for(var n=e.from.col;n<=e.to.col;n++)this._dealFontSizeClass(i,n,t)}this.printTable.render()},_dealFontFamily:function(e,t){if(e.from.row==e.to.row&&e.from.col==e.to.col)this._dealFontFamilyClass(e.from.row,e.from.col,t)
else{e=this._formatRange(e)
for(var i=e.from.row;i<=e.to.row;i++)for(var n=e.from.col;n<=e.to.col;n++)this._dealFontFamilyClass(i,n,t)}this.printTable.render()},_dealFontFamilyClass:function(e,t,i){var n=this.printTable.getCellMeta(e,t),a="ff-"+i
n.className&&(n.className=n.className.replace(/ff-[a-zA-Z]{3,}/,"").replace("  "," "),a=n.className+" "+a),n.className=a},_dealFontSizeClass:function(e,t,i){var n=this.printTable.getCellMeta(e,t),a="font-size-"+i
n.className&&(n.className=n.className.replace(/font-size-[0-9]{1,2}/,"").replace("  "," "),a=n.className+" "+a),n.className=a},_formatRange:function(e){if(IBPS.Utils.isObjectEmpty(e)||e.from||e.to)return e
var t={row:e.from.row,col:e.from.col},i={row:e.to.row,col:e.to.col}
return e.from.row=t.row<=i.row?t.row:i.row,e.to.row=t.row<=i.row?i.row:t.row,e.from.col=t.col<=i.col?t.col:i.col,e.to.col=t.col<=i.col?i.col:t.col,e},_dealFontStyle:function(e,t){if(e.from.row==e.to.row&&e.from.col==e.to.col)this._applyStyleClassName(e.from.row,e.from.col,t,!0)
else{var i=this.printTable.getSelected(),n=this.printTable.getCellMeta(i[0],i[1]),a=!0
n.className&&(a=-1===n.className.indexOf(t)),e=this._formatRange(e)
for(var s=e.from.row;s<=e.to.row;s++)for(var l=e.from.col;l<=e.to.col;l++)this._applyStyleClassName(s,l,t,!1,a)}this.printTable.render()},_applyStyleClassName:function(e,t,i,n,a){var s=this.printTable.getCellMeta(e,t)
s.className=this._prepareStyleClass(s.className,i,n,a)},_prepareStyleClass:function(e,t,i,n){return e?i&&-1!==e.indexOf(t)||!i&&!n?e=e.replace(""+t,"").replace("  "," "):(i||!i&&n&&-1===e.indexOf(t))&&(e+=" "+t):(i||n)&&(e=t),e},_dealAlignment:function(e,t,i){var n=this._getCellClasses(e)
if(this.printTable.runHooks("beforeCellAlignment",n,e,t,i),e.from.row==e.to.row&&e.from.col==e.to.col)this._applyAlignClassName(e.from.row,e.from.col,t,i)
else{e=this._formatRange(e)
for(var a=e.from.row;a<=e.to.row;a++)for(var s=e.from.col;s<=e.to.col;s++)this._applyAlignClassName(a,s,t,i)}this.printTable.render()},_applyAlignClassName:function(e,t,i,n){var a=this.printTable.getCellMeta(e,t),s=n
a.className&&(s="vertical"===i?this._prepareVerticalAlignClass(a.className,n):this._prepareHorizontalAlignClass(a.className,n)),a.className=s},_prepareVerticalAlignClass:function(e,t){return-1!=e.indexOf(t)?e:(e=e.replace("htTop","").replace("htMiddle","").replace("htBottom","").replace("  "," "),e+=" "+t)},_prepareHorizontalAlignClass:function(e,t){return-1!=e.indexOf(t)?e:(e=e.replace("htLeft","").replace("htCenter","").replace("htRight","").replace("htJustify","").replace("  "," "),e+=" "+t)},_prepareAlignStyle:function(e){switch(e){case"top":return{type:"vertical",alignment:"htTop"}
case"bottom":return{type:"vertical",alignment:"htBottom"}
case"middle":return{type:"vertical",alignment:"htMiddle"}
case"left":return{type:"horizontal",alignment:"htLeft"}
case"right":return{type:"horizontal",alignment:"htRight"}
case"center":return{type:"horizontal",alignment:"htCenter"}}},_getCellClasses:function(e){for(var t={},i=e.from.row;i<=e.to.row;i++)for(var n=e.from.col;n<=e.to.col;n++)t[i]||(t[i]=[]),t[i][n]=this.printTable.getCellMeta(i,n).className
return t},_getCellBorders:function(e){for(var t={},i=e.from.row;i<=e.to.row;i++)for(var n=e.from.col;n<=e.to.col;n++){var a=this._getCellTag(i,n)
t[a]=this.printTable.getCellMeta(i,n).className}return t},_dealBorderWeight:function(e,t){var i=""
t>0&&(i="border-width-"+t)
for(var n=e.from.row;n<=e.to.row;n++)for(var a=e.from.col;a<=e.to.col;a++){var s=this.printTable.getCellMeta(n,a).className
s?(s=s.replace(/border-width-[0-4]{1}/,"").replace("  "," "),s=[s,i].join(" ")):s=i,this.printTable.setCellMeta(n,a,"className",s)}this.printTable.render()},_dealBorder:function(e,t){switch(t){case"none":this._removeAllBorders(e)
break
case"top":for(var i=e.from.col;i<=e.to.col;i++)this._setBorder(e.from.row,i,t)
break
case"right":for(var n=e.from.row;n<=e.to.row;n++)this._setBorder(n,e.to.col,t)
break
case"bottom":for(var i=e.from.col;i<=e.to.col;i++)this._setBorder(e.to.row,i,t)
break
case"left":for(var n=e.from.row;n<=e.to.row;n++)this._setBorder(n,e.from.col,t)
break
case"all":this._setAllBorder(e)
break
case"outer":this._setOuterBorder(e)}this.printTable.render()},_isCellMergeInner:function(e,t,i,n){var a=this.printTable.mergeCells,s=a.mergedCellInfoCollection.getInfo(e,t)
return s&&i>=e&&i<=e+s.rowspan-1&&n>=t&&n<=t+s.colspan-1},_dealBorderState:function(e,t){for(var i=e.from.row;i<=e.to.row;i++)for(var n=e.from.col;n<=e.to.col;n++){var a=this._getCellTag(i,n),s=t[a]
this.printTable.setCellMeta(i,n,"className",s)}this.printTable.render()},_setOuterBorder:function(e){for(var t=e.from.row;t<=e.to.row;t++)for(var i=e.from.col;i<=e.to.col;i++){var n=[]
t==e.from.row&&n.push("border-top"),t==e.to.row&&n.push("border-bottom"),i==e.from.col&&n.push("border-left"),i==e.to.col&&n.push("border-right")
var a=this.printTable.getCellMeta(t,i).className
IBPS.Utils.isObjectEmpty(n)||(a?(IBPS.Utils.forEach(n,function(e,t){RegExp(t).test(a)||(a+=" "+t)}),a=a.replace("  "," ")):a=n.join(" ")),a||(a=""),this.printTable.setCellMeta(t,i,"className",a)}this.printTable.render()},_setAllBorder:function(e){var t=[]
IBPS.Utils.forEach(["top","right","bottom","left"],function(e,i){t.push(["border",i].join("-"))})
for(var i=e.from.row;i<=e.to.row;i++)for(var n=e.from.col;n<=e.to.col;n++){var a=this.printTable.getCellMeta(i,n).className
a?(IBPS.Utils.forEach(t,function(e,t){RegExp(t).test(a)||(a+=" "+t)}),a=a.replace("  "," ")):a=t.join(" "),this.printTable.setCellMeta(i,n,"className",a)}},_removeAllBorders:function(e){for(var t=e.from.row;t<=e.to.row;t++)for(var i=e.from.col;i<=e.to.col;i++){var n=this.printTable.getCellMeta(t,i).className
n&&(n=n.replace("border-left","").replace("border-right").replace("border-top","").replace("border-bottom","").replace("  "," ")),this.printTable.setCellMeta(t,i,"className",n)}},_setBorder:function(e,t,i){var n="border-"+i,a=this.printTable.getCellMeta(e,t).className
a&&!RegExp(n).test(a)?a+=" "+n:a=n,this.printTable.setCellMeta(e,t,"className",a)},_createBordersByStyle:function(e,t,i){if(i){var n=i["border-style"]
if(n&&"none"!==n){var a=[],s=i["border-width"]
return s&&a.push("border-width-"+s),IBPS.Utils.forEach(["top","right","bottom","left"],function(e,t){var n=["border",t,"width"].join("-");(i[n]||0!==i[n]&&s)&&a.push(["border",t].join("-"))}),a.join(" ")}}},_getCellText:function(e){var t=this,i=""
if(IBPS.Utils.isArray(e))IBPS.Utils.forEach(e,function(e,n){i+=t._getCellText(n)})
else if(IBPS.Utils.isString(e))i+=$("<div/>").append($("<span/>").text(e)).html()
else if(e.label)i+=this._getCellText(t.fieldNameMap[e.label]||"无效字段")
else if(e.image){var n=this.imageMap[e.image]||e.image
n&&IBPS.Utils.getFileDownloadURL(n,function(e){i+='<div class="background-img" style="background-image:url('+e+')"/>'})}else e.loading&&(i+='<div class="loader x-loader-icon colorful"/>')
return i},_getCellTag:function(e,t){return[e,t].join(":")},_splitCellTag:function(e){var t=e.split(":"),i=parseInt(t[0]),n=parseInt(t[1])
return IBPS.Utils.isNumber(i)&&IBPS.Utils.isNumber(n)?[i,n]:[]},clearCurrentCell:function(){this.currentCell=null},setCurrentCellData:function(e){this.currentCell&&e&&this.printTable.setDataAtCell(this.currentCell.row,this.currentCell.col,{label:"${"+e.name+"}",fields:[e.name]})},setCurrentCellImage:function(e){var t=this.printTable.getSelectedRange()
if(t){var i=t.from.row,n=t.from.col
this.loadingMap||(this.loadingMap={}),e?(this.loadingMap[this._getCellTag(i,n)]=!1,this.printTable.setDataAtCell(i,n,{image:e})):(this.loadingMap[this._getCellTag(i,n)]=!0,this.printTable.render())}},selectCurrentCell:function(){this.currentCell&&this.printTable.selectCell(this.currentCell.row,this.currentCell.col)},clearCellData:function(){var e=this.printTable.selection
e&&(e.empty(),this._refreshDataMap())},removeCellField:function(e){if(this.fieldMap[e.name]){var t=this.fieldMap[e.name]
this.printTable.setDataAtCell(t[0],t[1],""),this.fieldMap[e.name]=null}},_getDefaultValue:function(){return{rows:[],cols:[],merge:{},images:{},cells:{},styles:{},background:{},page:{size:"A4",layout:"portrait"}}},setFieldNameMap:function(e){var t=this
this.fieldNameMap={},IBPS.Utils.forEach(e,function(e,i){t.fieldNameMap["${"+e+"}"]="${"+i+"}"})},_setCellData:function(e,t,i){if(i){if(i.label&&IBPS.Utils.isEmpty(this.fieldNameMap[i.label])&&(i=""),!this.data){this.data=[]
for(var n=this._splitCellTag(this.value.range.e),a=0;a<=n[0];a++)this.data[a]=[],this.data[a].length=n[1]}this.data[e][t]=i}},setValue:function(e){var t=this,i=this.options
IBPS.Utils.isObjectEmpty(e)&&(e=this._getDefaultValue()),this.value=e,this.imageMap=e.images||{},this.dataMap={},this.styleMap={},this.fieldMap={},this.borderState={},this.printUtils=new IBPS.PrintUtils(e.styles,this.imageMap,e.dpi)
var n=[]
IBPS.Utils.forEach(this.value.cells,function(i,a){var s=t._splitCellTag(i)
if(!IBPS.Utils.isObjectEmpty(s)){var l=s[0],o=s[1]
t.dataMap[i]=a.content,t.styleMap[i]=t.printUtils.style2ClassName(a.style),t.borderState[i]=t._createBordersByStyle(l,o,e.styles[a.style]),a.content&&t._setCellData(l,o,a.content[0])
var r=[]
t.styleMap[i]&&r.push(t.styleMap[i]),t.borderState[i]&&r.push(t.borderState[i])
var c=""
IBPS.Utils.isObjectEmpty(r)||(c=r.join(" ")),n.push({row:l,col:o,prop:{className:c}})}})
var a=i.minRows,s=[]
IBPS.Utils.forEach(this.value.merge,function(e,i){var n=t._splitCellTag(e),l=t._splitCellTag(i),o=l[0]-n[0]+1,r=l[1]-n[1]+1;(o>1||r>1)&&s.push({row:n[0],col:n[1],rowspan:o,colspan:r}),l[0]+1>a&&(a=l[0]+1)})
var l={data:this.data}
a>i.minRows&&(l.minRows=a),IBPS.Utils.isObjectEmpty(s)||(l.mergeCells=s),this.printTable.updateSettings(l),IBPS.Utils.forEach(n,function(e,i){t.printTable.setCellMetaObject(i.row,i.col,i.prop)}),this.printTable.render(),this.clearUndoRedo(),this.setPage(e.page),this.setBackground(e.background)},getValue:function(){var e=this,t=this.options
this.printUtils.initStyles()
var i=this.printTable.countRows(),n=this.printTable.countCols(),a={},s={}
IBPS.Utils.forEach(this.printTable.mergeCells.mergedCellInfoCollection,function(t,l){if(!(l.row>i||l.col>n)){var o=e._getCellTag(l.row,l.col),r=e._getCellTag(l.row+l.rowspan-1,l.col+l.colspan-1)
a[o]=r
for(var c=0;c<=l.rowspan-1;c++)for(var d=0;d<=l.colspan-1;d++)(c||d)&&(s[e._getCellTag(l.row+c,l.col+d)]=!0)}})
var l={},o=0,r=0,c={}
c[this.printUtils.DEFAULT_STYLE_NAME]=!0,IBPS.Utils.forEach(this.printTable.getCellsMeta(),function(t,i){if(i&&IBPS.Utils.isNumber(i.row)&&IBPS.Utils.isNumber(i.col)){var n=e._getCellTag(i.row,i.col)
if(s[n])return!0
var d=e.dataMap[n],u=e.printUtils.getStyleNameByCell(i),p=!1,h=!1,f=e.printUtils.hasBorder(u)
if(IBPS.Utils.forEach(d,function(e,t){return t&&t.fields?(p=!0,!1):void 0}),IBPS.Utils.forEach(d,function(e,t){return IBPS.Utils.isEmpty(t)?void 0:(h=!0,!1)}),h&&(d=e.printUtils.formatData(d)),h||f){c[u]=!0
var g=i.row,m=i.col
if(a[n]){var v=e._splitCellTag(a[n])
g=v[0],m=v[1]}g>o&&(o=g),m>r&&(r=m),l[n]={content:d,style:u,hasField:p}}}})
var d=$.extend({background:this.imageMap.background},this.printUtils.getImages()),u={}
IBPS.Utils.forEach(this.printUtils.getStyles(),function(e,t){c[e]&&(u[e]=t)})
for(var p=[],h=[],f=0;o>=f;f++){var g=this.printTable.getRowHeight(f)||t.rowHeight
p.push(g)}for(var m=0;r>=m;m++){var v=this.printTable.getColWidth(m)||t.colWidth
h.push(v)}return{cols:h,rows:p,cells:l,merge:a,range:{s:this._getCellTag(this.range.s[0],this.range.s[1]),e:this._getCellTag(o,r)},images:d,styles:u}},getPageContent:function(){var e=$(".ht_master",this.element).find("table.htCore"),t=this.range.e[0],i=this.range.e[1],n=$("<table/>")
return IBPS.Utils.forEach($("tr",e.children("tbody")),function(e,a){if(e>t)return!1
var s=$("<tr/>")
IBPS.Utils.forEach($("td",$(a)),function(e,t){return!(e>i)&&void s.append($(t).clone().width($(t).outerWidth()).height($(t).outerHeight()))}),n.append(s)}),n}})}.call(this),function(){IBPS.PrintMenu=IBPS.extend(IBPS.Widget,{MENU:{undoRedo:{undo:{tip:"撤销",icon:"undo",enable:!1,select:!1},redo:{tip:"重做",icon:"redo",enable:!1,select:!1}},fontStyle:{fontFamily:{tip:"字体",icon:"family",value:"SimSun",combo:{items:[],width:75},enable:!0,select:!1},fontSize:{tip:"字号",icon:"size",value:9,combo:{items:[9,10,11,12,14,18,24,30,36],width:75},enable:!0,select:!1},bold:{tip:"粗体",icon:"bold",enable:!0,select:!1},italic:{tip:"斜体",icon:"italic",enable:!0,select:!1},underline:{tip:"下划线",icon:"underline",enable:!0,select:!1}},align:{top:{tip:"顶部对齐",icon:"top",enable:!0,select:!1},middle:{tip:"居中对齐",icon:"center",enable:!0,select:!1},bottom:{tip:"底部对齐",icon:"bottom",enable:!0,select:!1},left:{tip:"左对齐",icon:"align-left",enable:!0,select:!1},center:{tip:"居中对齐",icon:"align-center",enable:!0,select:!1},right:{tip:"右对齐",icon:"align-right",enable:!0,select:!1}},border:{borderLine:{tip:"边框线",icon:"border-left",enable:!0,combo:{items:[{value:"bottom"},{value:"top"},{value:"left"},{value:"right"},{value:"none"},{value:"all"},{value:"outer"}],width:163,customCls:"padding-large"},select:!1},borderWeight:{tip:"边框线粗细",icon:"border",value:0,enable:!0,combo:{items:[{value:0},{value:1},{value:2},{value:3},{value:4}],width:116},select:!1}},insert:{insert:{tip:"插入/删除",icon:"insert-row",value:"insertRow",enable:!0,combo:{items:[{icon:"insert-row",value:"insertRow",text:"插入行"},{icon:"insert-col",value:"insertCol",text:"插入列"},{icon:"del-row",value:"delRow",text:"删除行"},{icon:"del-col",value:"delCol",text:"删除列"}],width:116},select:!1}},merge:{merge:{tip:"合并",icon:"merge",enable:!0,visible:!0,select:!1},unmerge:{tip:"取消合并",icon:"unmerge",enable:!0,visible:!1,select:!1}},img:{insertImg:{tip:"插入图片",icon:"insert-img",enable:!0,select:!1},setBgImg:{tip:"设置背景图",icon:"set-img",enable:!0,value:{file:null,printable:!1},combo:{width:208},select:!1}},paper:{page:{tip:"纸张设置",icon:"paper",value:{pageSize:"A4",pageDir:"portrait",pageWidth:210,pageHeight:297,pagePaddingLeft:17.8,pagePaddingRight:17.8,pagePaddingTop:19.1,pagePaddingBottom:19.1},enable:!0,combo:{width:300},select:!1}},global:{cellHeight:{tip:"单元格高度设置",icon:"auto_cell_height",value:!1,enable:!0,combo:{width:300},select:!1},headerFooter:{tip:"页眉页脚",icon:"header-footer",enable:!0}}},_defaultConfig:function(){return $.extend(IBPS.PrintMenu.superclass._defaultConfig.apply(),{baseCls:"fx_print_menu",onMenuClick:null,printId:null,fonts:{}})},_init:function(){IBPS.PrintMenu.superclass._init.apply(this,arguments),this._renderMenu(),this._bindEvent()},_renderMenu:function(){var e=this,t=(this.options,$(".menu-tool",this.element))
0===t.length?t=$('<div class="menu-tool"/>').appendTo(this.element):t.empty(),IBPS.Utils.forEach(this.MENU,function(i,n){var a=$('<div class="menu-group-wrapper"/>').appendTo(t)
IBPS.Utils.forEach(n,function(t,n){e._createMenuItem(a,i,t,n)})})},_createMenuItem:function(e,t,i,n){var a=this,s=this.options,l=n.combo?"has-select":"",o=""
switch(i){case"fontSize":o=n.value
break
case"fontFamily":o=s.fonts[n.value]}var r=n.enable?"":"x-ui-disable",c=n.select?"select":""
if("insertImg"===i){var d=["menu-item",l,r,c,i].join(" "),u=$('<div class="'+d+'"><div class="menu-icon  '+n.icon+'">'+o+"</div></div>").appendTo(e).data("data",n).hover(function(){IBPS.UI.showPopover({position:"bottomLeft",anchor:u,content:$("<span/>").text(n.tip),type:"dark"})},function(){IBPS.UI.closePopover()}).on("click",function(){new UploadDialog({fileFormates:"bmp,gif,jpg,jpeg,png",maxUploadNum:1,accept:{title:"Images",extensions:"bmp,gif,jpg,jpeg,png",mimeTypes:"image/bmp,image/gif,image/jpg,image/jpeg,image/png"},callback:function(e){var n=e[0]
IBPS.Utils.applyFunc(a,s.onMenuClick,[{type:t,action:i,file:n}],!1)}}).show()})
IBPS.Utils.isObjectEmpty(n.visible)||!n.visible&&u.hide()}else{var d=["menu-item",l,r,c,i].join(" "),u=$('<div class="'+d+'"><div class="menu-icon  '+n.icon+'">'+o+"</div></div>").appendTo(e).data("data",n).hover(function(){IBPS.UI.showPopover({position:"bottomLeft",anchor:u,content:$("<span/>").text(n.tip),type:"dark"})},function(){IBPS.UI.closePopover()}).on("click",function(){return IBPS.UI.closePopover(),n.enable&&(n.combo?a._createMenuBubble(t,i,n,u):(a._setSelect(t,i,!n.select),IBPS.Utils.applyFunc(a,s.onMenuClick,[{type:t,action:i}],!1))),!1})
IBPS.Utils.isObjectEmpty(n.visible)||!n.visible&&u.hide()}},_createMenuBubble:function(e,t,i,n){var a=this,s=this.options,l=i.combo.customCls?i.combo.customCls:"",o=$('<div class="fx_print_menu_combo_wrapper '+l+'"/>').css({width:i.combo.width})
switch(t){case"fontFamily":IBPS.Utils.forEach(s.fonts,function(e,t){$('<div class="combo-item">'+t+"</div>").data("data",e).data("text",t).appendTo(o)}),o.on("click",function(i){var n=$(i.target).closest(".combo-item"),l=n.data("data"),o=n.data("text")
$(".menu-icon",i).text(o)
var r={type:e,action:t,value:l}
return a.MENU[e][t].value=r.value,$(".x-msg-bubble").remove(),IBPS.Utils.applyFunc(a,s.onMenuClick,[r],!1),!1})
break
case"fontSize":IBPS.Utils.forEach(i.combo.items,function(i,l){$('<div class="combo-item">'+l+"</div>").data("data",l).on("click",function(i){var l=$(i.target).data("data")
$(".menu-icon",n).text(l)
var o={type:e,action:t,value:l}
return a.MENU[e][t].value=o.value,$(".x-msg-bubble").remove(),IBPS.Utils.applyFunc(a,s.onMenuClick,[o],!1),!1}).appendTo(o)})
break
case"borderLine":IBPS.Utils.forEach(i.combo.items,function(i,n){$('<div class="combo-item-icon"><div class="icon-content  '+n.value+'"></div></div>').data("data",n.value).on("click",function(i){var n={type:e,action:t,value:$(i.currentTarget).data("data")}
return a.MENU[e][t].value=n.value,$(".x-msg-bubble").remove(),IBPS.Utils.applyFunc(a,s.onMenuClick,[n],!1),!1}).appendTo(o)})
break
case"borderWeight":IBPS.Utils.forEach(i.combo.items,function(i,n){var l=$('<div class="combo-item"/>').data("data",n.value).on("click",function(i){var n={type:e,action:t,value:$(i.currentTarget).data("data")}
return a.MENU[e][t].value=n.value,$(".x-msg-bubble").remove(),IBPS.Utils.applyFunc(a,s.onMenuClick,[n],!1),!1}).appendTo(o)
0===n.value?l.text("无边框"):$('<div class="item-line-wrapper"><div class="item-line" style="border-bottom-width:'+n.value+'px"></div></div>').appendTo(l)})
break
case"insert":IBPS.Utils.forEach(i.combo.items,function(i,n){var l=$('<div class="combo-item">'+n.text+"</div>").data("data",n.value).on("click",function(i){var n={type:e,action:t,value:$(i.currentTarget).data("data")}
return a.MENU[e][t].value=n.value,$(".x-msg-bubble").remove(),IBPS.Utils.applyFunc(a,s.onMenuClick,[n],!1),!1}).appendTo(o)
l.prepend('<div class="menu-icon  '+n.icon+'"/>')})
break
case"setBgImg":$('<div class="title">背景设置</div>').appendTo(o)
var r=$('<div class="line"></div>').appendTo(o),c=$('<div class="col-4">背景图</div>').appendTo(r),d=$('<i class="icon-help"></i>').hover(function(){IBPS.UI.showPopover({position:"bottomLeft",anchor:d,content:$("<span>请上传与纸张长宽比例一致的背景图</span>")})},function(){IBPS.UI.closePopover()}).appendTo(c),u=$('<div class="col-8"></div>').appendTo(r),p=$('<div class="fui_upload print-upload" style="width: 30px; height: 25px;"><div class="upload-btn x-btn style-white"><i class="icon-upload upload-icon"></i><span>选择文件</span></div></div>').appendTo(u),h=$('<div class="item-wrapper"><div class="text"></div><i class="icon-trasho"></i></div>').on("click",function(i){var n=$(i.target).closest(".icon-trasho")
n.length>0&&(h.hide(),p.show(),m.setValue(!1),m.setEnable(!1),a.MENU[e][t].value.file=null,a.MENU[e][t].value.printable=!1,a._menuOnStopEdit(e,t))}).appendTo(u)
p.on("click",function(){var i=$(this)
new UploadDialog({fileFormates:"bmp,gif,jpg,jpeg,png",maxUploadNum:1,accept:{title:"Images",extensions:"bmp,gif,jpg,jpeg,png",mimeTypes:"image/bmp,image/gif,image/jpg,image/jpeg,image/png"},callback:function(n){var s=n[0]
h.children(".text").text(s.fileName),h.show(),a.MENU[e][t].value.file=s,a._menuOnStopEdit(e,t),m.setEnable(!0),i.hide()}}).show()}),h.hide()
var f=$('<div class="line"></div>').appendTo(o)
f.append('<div class="col-4">打印背景</div>')
var g=$('<div class="col-8"/>').appendTo(f),m=new IBPS.Switch({renderEl:$("<div />").appendTo(g),customCls:"print-switch",width:30,height:20,text4On:"",text4Off:"",enable:!IBPS.Utils.isObjectEmpty(i.value.file),onSwitch:function(){a.MENU[e][t].value.printable=this.getValue(),a._menuOnStopEdit(e,t)}})
!IBPS.Utils.isObjectEmpty(i.value)&&i.value.file&&(h.children(".text").text(i.value.file.fileName),h.show(),p.hide(),m.setValue(i.value.printable))
break
case"page":a._createPaperBubble(o,i,e,t)
break
case"cellHeight":a._createCellHeightBubble(o,i,e,t)}this.bubble=IBPS.Msg.bubble({anchor:n,text4Cancel:null,text4Ok:null,hAdjust:i.combo.width/2-10,contentHTML:o,minWidth:i.combo.width,contentPadding:0}),"paper"!==e&&o.on("mousedown",function(){return!1})},_createPaperBubble:function(e,t,i,n){var a=this
$('<div class="title">纸张设置</div>').appendTo(e),$('<div class="line">纸张大小</div>').appendTo(e)
var s=$('<div class="line"/>').appendTo(e),l={customCls:"print-input",allowBlank:!1,width:52,allowDecimals:!0,allowNegative:!1},o={searchable:!1,allowBlank:!1,customCls:"print-combo",width:"100%"}
new IBPS.ComboBox($.extend({},o,{renderEl:$("<div/>").appendTo(s),value:a.MENU[i][n].value.pageSize,items:[{value:"A4",text:"A4"},{value:"A3",text:"A3"},{value:"A5",text:"A5"},{value:"B5",text:"B5"},{value:"auto",text:"自定义"}],onStopEdit:function(){var t=this.getValue()
"auto"===t?$(".paper-wh",e).removeClass("x-hide"):!$(".paper-wh",e).hasClass("x-hide")&&$(".paper-wh",e).addClass("x-hide"),a.MENU[i][n].value=$.extend(a.MENU[i][n].value,{pageSize:t}),a._menuOnStopEdit(i,n)}}))
var r="auto"!==a.MENU[i][n].value.pageSize?"x-hide":"",c=$('<div class="line paper-wh '+r+'"/>').appendTo(e),d=$('<div class="col-6"><span>宽：</span></div>').appendTo(c),u=$('<div class="print-input"/>').appendTo(d)
new IBPS.Number($.extend({},l,{renderEl:$("<div />").appendTo(u),value:a.MENU[i][n].value.pageWidth,onStopEdit:function(){this.checkValidate()&&(a.MENU[i][n].value=$.extend(a.MENU[i][n].value,{pageWidth:this.getValue()}),a._menuOnStopEdit(i,n))}})),d.append('<span class="left">mm</span>')
var p=$('<div class="col-6"><span>高：</span></div>').appendTo(c),h=$('<div class="print-input"/>').appendTo(p)
new IBPS.Number($.extend({},l,{renderEl:$("<div />").appendTo(h),value:a.MENU[i][n].value.pageHeight,onStopEdit:function(){this.checkValidate()&&(a.MENU[i][n].value=$.extend(a.MENU[i][n].value,{pageHeight:this.getValue()}),a._menuOnStopEdit(i,n))}})),p.append('<span class="left">mm</span>'),$('<div class="line">纸张方向</div>').appendTo(e)
var f=$('<div class="line"/>').appendTo(e)
new IBPS.ComboBox($.extend({},o,{renderEl:$("<div/>").appendTo(f),value:a.MENU[i][n].value.pageDir,items:[{value:"portrait",text:"纵向"},{value:"landscape",text:"横向"}],onStopEdit:function(){a.MENU[i][n].value=$.extend(a.MENU[i][n].value,{pageDir:this.getValue()}),a._menuOnStopEdit(i,n)}})),$('<div class="line">页边距</div>').appendTo(e)
var g=$('<div class="line"/>').appendTo(e),m=$('<div class="col-6"><span>上：</span></div>').appendTo(g),v=$('<div class="print-input"/>').appendTo(m)
new IBPS.Number($.extend({},l,{renderEl:$("<div />").appendTo(v),value:a.MENU[i][n].value.pagePaddingTop,onStopEdit:function(){this.checkValidate()&&(a.MENU[i][n].value=$.extend(a.MENU[i][n].value,{pagePaddingTop:this.getValue()}),a._menuOnStopEdit(i,n))}})),m.append('<span class="left">mm</span>')
var b=$('<div class="col-6"><span>下：</span></div>').appendTo(g),S=$('<div class="print-input"/>').appendTo(b)
new IBPS.Number($.extend({},l,{renderEl:$("<div />").appendTo(S),value:a.MENU[i][n].value.pagePaddingBottom,onStopEdit:function(){this.checkValidate()&&(a.MENU[i][n].value=$.extend(a.MENU[i][n].value,{pagePaddingBottom:this.getValue()}),a._menuOnStopEdit(i,n))}})),b.append('<span class="left">mm</span>')
var _=$('<div class="line"/>').appendTo(e),w=$('<div class="col-6"><span>左：</span></div>').appendTo(_),y=$('<div class="print-input"/>').appendTo(w)
new IBPS.Number($.extend({},l,{renderEl:$("<div />").appendTo(y),value:a.MENU[i][n].value.pagePaddingLeft,onStopEdit:function(){this.checkValidate()&&(a.MENU[i][n].value=$.extend(a.MENU[i][n].value,{pagePaddingLeft:this.getValue()}),a._menuOnStopEdit(i,n))}})),w.append('<span class="left">mm</span>')
var C=$('<div class="col-6"><span>右：</span></div>').appendTo(_),I=$('<div class="print-input"/>').appendTo(C)
new IBPS.Number($.extend({},l,{renderEl:$("<div />").appendTo(I),value:a.MENU[i][n].value.pagePaddingRight,onStopEdit:function(){this.checkValidate()&&(a.MENU[i][n].value=$.extend(a.MENU[i][n].value,{pagePaddingRight:this.getValue()}),a._menuOnStopEdit(i,n))}})),C.append('<span class="left">mm</span>')},_createCellHeightBubble:function(e,t,i,n){var a=this
$('<div class="title">单元格高度设置</div>').appendTo(e)
var s="",l=""
t.value?s=" select":l=" select"
var o=$('<div class="cell-height"><div class="line" role="auto"><div class="select-btn x-radio'+s+'"><i class="icon-blank"/></div><span>动态单元格高度（推荐）</span><div class="tip">当表单内容超出单元格时，自动拉伸单元格高度以打印全部内容</div></div><div class="line" role="fixed"><div class="select-btn x-radio'+l+'"><i class="icon-blank"/></div><span>固定单元格高度</span><div class="tip">严格按照模版设定的单元格尺寸打印，当内容超出单元格时会被省略</div></div></div>').appendTo(e)
o.bind("click",function(e){var t=$(e.target).closest(".line")
if(t.length){t.children(".select-btn").addClass("select"),t.siblings().children(".select-btn").removeClass("select")
var s=t.attr("role")
a.MENU[i][n].value="auto"===s}})},_menuOnStopEdit:function(e,t){var i,n=this.options
switch(t){case"setBgImg":i=this.MENU[e][t].value
break
case"page":i=this._formatPageValue(this.MENU[e][t].value)}var a={type:e,action:t,value:i}
IBPS.Utils.applyFunc(this,n.onMenuClick,[a],!1)},_bindEvent:function(){var e=this
this.element.bind("mousedown",function(){return e.bubble&&$(".x-msg-bubble").length>0&&e.bubble.close(),$(".x-dropdown-list").remove(),!1})},_setSelect:function(e,t,i){var n=["top","middle","bottom"],a=["center","left","right"],s=["merge","unmerge","undo","redo","fontSize","fontFamily"]
if(n.some(function(e){return e===t}))this._setMutexSelect(n,e,t,i)
else if(a.some(function(e){return e===t}))this._setMutexSelect(a,e,t,i)
else{if(s.some(function(e){return e===t}))return
this.MENU[e][t].select=i}},_setMutexSelect:function(e,t,i,n){var a=this
IBPS.Utils.forEach(e,function(e,i){a.MENU[t][i].select=!1}),this.MENU[t][i].select=n},_formatPageValue:function(e){var t="auto"===e.pageSize?[this._mm2PT(e.pageWidth,6),this._mm2PT(e.pageHeight,6)]:e.pageSize
return{size:t,layout:e.pageDir,margin:[this._mm2PT(e.pagePaddingTop,6),this._mm2PT(e.pagePaddingRight,6),this._mm2PT(e.pagePaddingBottom,6),this._mm2PT(e.pagePaddingLeft,6)]}},_mm2PT:function(e,t){return IBPS.Utils.isNumber(e)?parseFloat((e/25.4*this.pageDPI).toFixed(t)):void 0},_pt2MM:function(e,t){return IBPS.Utils.isNumber(e)?parseFloat((e/this.pageDPI*25.4).toFixed(t)):void 0},_clearMenuState:function(){var e=this
IBPS.Utils.forEach(this.MENU,function(t,i){IBPS.Utils.forEach(i,function(i){e.MENU[t][i].select=!1})})},setMerge:function(e){switch(e){case"merge":this.MENU.merge.merge.visible=!0,this.MENU.merge.unmerge.visible=!1
break
case"unmerge":this.MENU.merge.unmerge.visible=!0,this.MENU.merge.merge.visible=!1}this._renderMenu()},setMenuEnable:function(e,t,i){this.MENU[e]&&this.MENU[e][t]&&(this.MENU[e][t].enable=i,this._renderMenu())},setMenuStyles:function(e){var t=this
this._clearMenuState(),IBPS.Utils.forEach(e,function(e,i){if(i)switch(e){case"vertical-align":case"text-align":t.MENU.align[i]&&(t.MENU.align[i].select=!0)
break
case"font-weight":case"font-style":case"text-decoration":t.MENU.fontStyle[i]&&(t.MENU.fontStyle[i].select=!0)
break
case"font-size":t.MENU.fontStyle.fontSize.value=i
break
case"font-family":t.MENU.fontStyle.fontFamily.value=i}}),this._renderMenu()},setEnable:function(e){var t=this
this.enable!==e&&(this.enable=e,IBPS.Utils.forEach(this.MENU,function(i,n){IBPS.Utils.forEach(n,function(n,a){t.MENU[i][n].enable=e})}),this._renderMenu())},setValue:function(e){var t=this
IBPS.Utils.isObjectEmpty(e)||(this.pageDPI=e.dpi.design,IBPS.Utils.forEach(e,function(e,i){switch(e){case"page":if(IBPS.Utils.isArray(i.size)?(t.MENU.paper.page.value.pageSize="auto",t.MENU.paper.page.value.pageWidth=t._pt2MM(i.size[0],1),t.MENU.paper.page.value.pageHeight=t._pt2MM(i.size[1],1)):t.MENU.paper.page.value.pageSize=i.size,t.MENU.paper.page.value.pageDir=i.layout,IBPS.Utils.isArray(i.margin)){var n=0,a=1,s=2,l=3
2===i.margin.length&&(s=0,l=1),t.MENU.paper.page.value.pagePaddingTop=t._pt2MM(i.margin[n],1),t.MENU.paper.page.value.pagePaddingRight=t._pt2MM(i.margin[a],1),t.MENU.paper.page.value.pagePaddingBottom=t._pt2MM(i.margin[s],1),t.MENU.paper.page.value.pagePaddingLeft=t._pt2MM(i.margin[l],1)}break
case"images":IBPS.Utils.isObjectEmpty(i.background)||(t.MENU.img.setBgImg.value.file=i.background)
break
case"background":t.MENU.img.setBgImg.value.printable=i.printable
break
case"global":t.MENU.global.cellHeight.value=i.auto_cell_height}}),t._renderMenu())},getValue:function(){return{background:{printable:this.MENU.img.setBgImg.value.printable,image:"background"},images:{background:this.MENU.img.setBgImg.value.file},page:this._formatPageValue(this.MENU.paper.page.value),global:{auto_cell_height:this.MENU.global.cellHeight.value}}}})}.call(this),function(){IBPS.PrintPageMenu=IBPS.extend(IBPS.Widget,{MENU:{style:{marginTop:{label:"页眉顶端距离：",enable:!0,select:!1,defaultValue:5,combo:{items:[],width:75,height:180}},marginBottom:{label:"页脚底端距离：",enable:!0,select:!1,visible:!1,defaultValue:5,combo:{items:[],width:75,height:180}}},fontStyle:{fontFamily:{tip:"字体",icon:"family",value:"SimSun",combo:{items:[],width:75},enable:!0,select:!1},fontSize:{tip:"字号",icon:"size",value:9,combo:{items:[9,10,11,12,14,18,24,30,36],width:75},enable:!0,select:!1},bold:{tip:"粗体",icon:"bold",enable:!0,select:!1},italic:{tip:"斜体",icon:"italic",enable:!0,select:!1},underline:{tip:"下划线",icon:"underline",enable:!0,select:!1}},align:{left:{tip:"左对齐",icon:"align-left",enable:!0,select:!1},center:{tip:"居中对齐",icon:"align-center",enable:!0,select:!1},right:{tip:"右对齐",icon:"align-right",enable:!0,select:!1}},page:{number:{tip:"插入页码",icon:"paper-header-fork",enable:!0,select:!1}},clean:{all:{tip:"清除所有",icon:"clean-all",enable:!0,select:!1},header:{tip:"清除页眉",icon:"clean-header",enable:!0,select:!1,visible:!0},footer:{tip:"清除页脚",icon:"clean-footer",enable:!0,select:!1,visible:!1}}},_defaultConfig:function(){return $.extend(IBPS.PrintPageMenu.superclass._defaultConfig.apply(),{baseCls:"fx_print_page_menu",onMenuClick:null,fonts:{}})},_init:function(){IBPS.PrintPageMenu.superclass._init.apply(this,arguments)
var e=this.options
this._formatMargin("marginTop",e.margin.top),this._formatMargin("marginBottom",e.margin.bottom),this._renderMenu(),this._bindEvent()},_formatMargin:function(e,t){t=this._pt2MM(t,6)
var i=t-parseInt(t)
if(IBPS.Utils.isEmpty(this.MENU.style[e].value)){var n=Math.min(this.MENU.style[e].defaultValue,parseInt(t))
this.MENU.style[e].value=n+i}this.MENU.style[e].combo.items=[]
for(var a=0;t>=a;a++)this.MENU.style[e].combo.items.push(0===a?0:a+i)},_renderMenu:function(){var e=this,t=$(".menu-tool",this.element)
0===t.length?t=$('<div class="menu-tool"/>').appendTo(this.element):t.empty(),IBPS.Utils.forEach(this.MENU,function(i,n){var a=$('<div class="menu-group-wrapper"/>').appendTo(t)
IBPS.Utils.forEach(n,function(t,n){e._createMenuItem(a,i,t,n)})})},_createMenuItem:function(e,t,i,n){var a=this,s=this.options,l=n.combo?"has-select":"",o=""
switch(i){case"fontSize":o=n.value
break
case"fontFamily":o=s.fonts[n.value]
break
case"marginTop":case"marginBottom":o=parseInt(n.value)+"mm"}var r=n.enable?"":"x-ui-disable",c=n.select?"select":"",d=["menu-item",l,r,c,i].join(" "),u=n.label
if(!IBPS.Utils.isEmpty(u)){var p=$('<div class="menu-item label"><div class="menu-icon">'+u+"</div></div>").appendTo(e)
IBPS.Utils.isObjectEmpty(n.visible)||!n.visible&&p.hide()}var h=n.icon||"",f=$('<div class="'+d+'"><div class="menu-icon  '+h+'">'+o+"</div></div>").appendTo(e).data("data",n).hover(function(){return!IBPS.Utils.isEmpty(n.tip)&&void IBPS.UI.showPopover({position:"bottomLeft",anchor:f,content:$("<span/>").text(n.tip),type:"dark"})},function(){IBPS.UI.closePopover()}).on("click",function(){if(IBPS.UI.closePopover(),n.enable)if(n.combo)a._createMenuBubble(t,i,n,f)
else{var e=["center","left","right"]
if(e.some(function(e){return e===i})){var l=!n.select
IBPS.Utils.forEach(e,function(e,i){a.MENU[t][i].select=!1}),a.MENU[t][i].select=l}else"number"!==i&&(a.MENU[t][i].select=!n.select)
IBPS.Utils.applyFunc(a,s.onMenuClick,[{type:t,action:i}],!1),a._renderMenu()}return!1})
IBPS.Utils.isObjectEmpty(n.visible)||!n.visible&&f.hide()},_createMenuBubble:function(e,t,i,n){var a=this,s=this.options,l=$('<div class="fx_print_menu_combo_wrapper"/>').css({width:i.combo.width,"max-height":i.combo.height||"100%"}),o=[]
switch(t){case"fontFamily":IBPS.Utils.forEach(s.fonts,function(e,t){o.push({text:t,value:e})})
break
case"marginTop":case"marginBottom":IBPS.Utils.forEach(i.combo.items,function(e,t){o.push({text:parseInt(t)+"mm",value:a._mm2PT(t,6)})})
break
default:IBPS.Utils.forEach(i.combo.items,function(e,t){o.push({text:t,value:t})})}IBPS.Utils.forEach(o,function(e,t){$('<div class="combo-item">'+t.text+"</div>").data("val",t.value).data("text",t.text).appendTo(l)}),l.on("click",".combo-item",function(i){var n=$(i.target),l=n.data("val"),o=n.data("text")
$(".menu-icon",i).text(o)
var r={type:e,action:t,value:l},c="marginTop"===t||"marginBottom"===t?a._pt2MM(l,6):l
return a.MENU[e][t].value=c,$(".x-msg-bubble").remove(),IBPS.Utils.applyFunc(a,s.onMenuClick,[r],!1),a._renderMenu(),!1}),this.bubble=IBPS.Msg.bubble({anchor:n,text4Cancel:null,text4Ok:null,hAdjust:i.combo.width/2-10,contentHTML:l,minWidth:i.combo.width,contentPadding:0})},_clearMenuState:function(){var e=this
IBPS.Utils.forEach(this.MENU,function(t,i){IBPS.Utils.forEach(i,function(i){e.MENU[t][i].select=!1})})},_mm2PT:function(e,t){var i=this.options
return IBPS.Utils.isNumber(e)?parseFloat((e/25.4*i.pageDPI).toFixed(t)):void 0},_pt2MM:function(e,t){var i=this.options
return IBPS.Utils.isNumber(e)?parseFloat((e/i.pageDPI*25.4).toFixed(t)):void 0},setHeaderFooter:function(e){switch(e){case"header":this.MENU.style.marginTop.visible=!0,this.MENU.style.marginBottom.visible=!1,this.MENU.clean.header.visible=!0,this.MENU.clean.footer.visible=!1
break
case"footer":this.MENU.style.marginBottom.visible=!0,this.MENU.style.marginTop.visible=!1,this.MENU.clean.header.visible=!1,this.MENU.clean.footer.visible=!0}this._renderMenu()},setMenuStyles:function(e){var t=this
this._clearMenuState(),IBPS.Utils.forEach(e,function(e,i){if(!IBPS.Utils.isNull(i))switch(e){case"text-align":t.MENU.align[i]&&(t.MENU.align[i].select=!0)
break
case"font-weight":case"font-style":case"text-decoration":t.MENU.fontStyle[i]&&(t.MENU.fontStyle[i].select=!0)
break
case"font-size":t.MENU.fontStyle.fontSize.value=i
break
case"font-family":t.MENU.fontStyle.fontFamily.value=i
break
case"margin-top":t.MENU.style.marginTop.value=t._pt2MM(i)
break
case"margin-bottom":t.MENU.style.marginBottom.value=t._pt2MM(i)}}),this._renderMenu()},_bindEvent:function(){var e=this
this.element.bind("mousedown",function(){return e.bubble&&$(".x-msg-bubble").length>0&&e.bubble.close(),$(".x-dropdown-list").remove(),!1})}})}.call(this),function(){IBPS.PrintFields=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.PrintFields.superclass._defaultConfig.apply(),{baseCls:"fx_print_fields",onDrop:null,onDrag:null,onDragStart:null,onUndo:null,fieldContainer:null,fields:[],hasFlowFields:!1,flowFields:[{field_type:"flow",name:"flow_comment",label:"审批意见"},{field_type:"flow",name:"flow_diagram",label:"流程图"},{field_type:"flow",name:"approval_history",label:"审批历史"}]})},_init:function(){IBPS.PrintFields.superclass._init.apply(this,arguments),this._initContent(),this.fieldMap={},this.fieldNameMap={},this._createFieldList(),this._bindEvent()},_initContent:function(){var e=$('<div class="field-title"/>').append($('<div class="tab-item form-field select">表单字段</div>')).appendTo(this.element)
this.options.hasFlowFields&&e.addClass("with-flow").append($('<div class="tab-item flow-field">流程字段</div>'))},_createFieldList:function(){var e=this,t=this.options
this.$fieldList=$('<ul class="field-list"/>').appendTo(this.element),this.$flowFieldList=$('<ul class="field-list"/>').hide().appendTo(this.element),IBPS.Utils.forEach(t.fields,function(t,i){e._createField(i)}),t.hasFlowFields&&IBPS.Utils.forEach(t.flowFields,function(t,i){e._createField(i)})},_createField:function(e,t){var i=this,n=(this.options,this.$fieldList)
if("flow"===e.field_type&&(n=this.$flowFieldList),"table"===e.field_type)$('<div class="separate-line" />').appendTo(n),$('<div class="print-field-subform" />').append($('<i class="icon-widget-subform"/>')).append($("<span />").text(e.label)).appendTo(n),IBPS.Utils.forEach(e.field_options.columns,function(t,n){n.name=e.name+"."+n.name,i._createField(n,e)}),$('<div class="separate-line" />').appendTo(n)
else{var a="flow"===e.field_type?e.name:e.field_type,s=$('<li class="print-field-item"/>').data("field",e).append($('<i class="icon-widget-'+a+'" />')).append($("<span />").text(e.label)).append($('<i class="fa fa-undo icon-undo"/>'))
t?($('<div class="subform-item"/>').append($('<i class="icon-subform-turn"/>')).append(s).appendTo(n),this.fieldNameMap[e.name]=[t.label,e.label].join(".")):(s.appendTo(n),this.fieldNameMap[e.name]=e.label),this.fieldMap[e.name]=s,this.setSelected(e.name,e.selected)}},setSelected:function(e,t){var i=this.fieldMap[e]
i&&(t?i.addClass("selected"):i.removeClass("selected"))},getFieldNameMap:function(){return this.fieldNameMap},_bindEvent:function(){var e,t,i=this,n=this.options,a=this.element.find(".field-list")
a.sortable({group:"no-drop",pullPlaceholder:!1,drop:!1,exclude:".selected",onDragStart:function(a,s,l){var o=a.offset(),r=s.rootGroup.pointer
if(e={left:r.left-o.left,top:r.top-o.top},!s.options.drop){var c=a.clone().insertAfter(a)
c.data("field",a.data("field")),i.fieldMap[a.data("field").name]=c,a.width(a.width()).appendTo("body")}IBPS.Utils.applyFunc(i,n.onDragStart,[],!1),t=s,l(a,s)},onDrag:function(t,a,s,l){t.hasClass("print-field-item")?(a.left-=e.left,a.top-=e.top):(a.left=0,a.top-=e.top),IBPS.Utils.applyFunc(i,n.onDrag,[],!1),s(t,a)},onDrop:function(e,a,s,l){s(e,t),e.hasClass("print-field-item")&&(IBPS.Utils.applyFunc(i,n.onDrop,[e.data("field"),l],!1),e.remove())}}),n.fieldContainer.sortable({group:"no-drop"}),a.unbind(".field-undo").bind("click.field-undo",function(e){var t=$(e.target),a=t.closest(".icon-undo"),s=t.closest(".print-field-item"),l=s.data("field")
a.length&&(IBPS.Utils.applyFunc(i,n.onUndo,[l],!1),i.setSelected(l.name,!1))}),$(".field-title",this.element).bind("click",function(e){var t=$(e.target),n=t.closest(".tab-item")
n.length>0&&(n.addClass("select").siblings().removeClass("select"),n.hasClass("form-field")?(i.$fieldList.show(),i.$flowFieldList.hide()):(i.$fieldList.hide(),i.$flowFieldList.show()))})}})}.call(this),function(){IBPS.PrintPage=IBPS.extend(IBPS.Widget,{_defaultConfig:function(){return $.extend(IBPS.PrintPage.superclass._defaultConfig.apply(),{baseCls:"fx_print_page",appId:"",entryId:"",fonts:{},data:{},dpi:{},content:""})},_init:function(){IBPS.PrintPage.superclass._init.apply(this,arguments)
var e=this.options
this.printUtils=new IBPS.PrintUtils(e.data.styles,{},e.dpi),this.pageSize=this.printUtils.getPageSize(e.data.page),this.margin=this.printUtils.getPageMargin(e.data.page),this._initHead(),this._initBody(),this._bindEvent(),this.page.children(".header").children(".column").first().click()},_initHead:function(){var e=this,t=this.options
this.menu=new IBPS.PrintPageMenu({renderEl:$("<div/>").appendTo(this.element),fonts:t.fonts,pageDPI:t.dpi.design,margin:this.margin,onMenuClick:function(t){switch(t.type){case"fontStyle":e._setCellStyle(t)
break
case"style":"marginTop"===t.action?e._setHeaderMargin({margin:t.value}):e._setFooterMargin({margin:t.value})
break
case"align":e._setCellAlign(t.action)
break
case"clean":e._clean(t.action,e.$input)
break
case"page":e.$input&&e.$input.length&&e.insertAtCursor(e.$input[0],"{页码}")}}}),this.menu.setHeaderFooter("header"),t.data&&this.menu.setMenuStyles({"margin-top":t.data.header.margin,"margin-bottom":t.data.footer.margin})},_initBody:function(){var e=$('<div class="print-body"/>').appendTo(this.element)
this._initPage(e),this._initPageContent(),this._initPageHeader(),this._initPageFooter()},_initPage:function(e){var t=this.margin
this.page=$('<div class="print-page"/>').appendTo(e).css({width:this.pageSize.width+t.left+t.right,height:this.pageSize.height+t.top+t.bottom})},_initPageContent:function(){var e=this.options,t=this.margin
$('<div class="table-content"/>').append(e.content).appendTo(this.page).css({"padding-right":t.right,"padding-left":t.left,top:t.top,bottom:t.bottom})},_initPageHeader:function(){var e=this.options,t=e.data.header,i=$('<div class="header"/>').appendTo(this.page).css({"padding-right":this.margin.right,"padding-left":this.margin.left})
this._setHeaderMargin(t),this._createColumns(t.columns,i)},_setHeaderMargin:function(e){this.headerMargin=e.margin,this.page.children(".header").css("top",e.margin)},_initPageFooter:function(){var e=this.options,t=e.data.footer,i=$('<div class="footer"/>').appendTo(this.page).css({"padding-right":this.margin.right,"padding-left":this.margin.left})
this._setFooterMargin(t),this._createColumns(t.columns,i)},_setFooterMargin:function(e){this.footerMargin=e.margin,this.page.children(".footer").css("bottom",e.margin)},_createColumns:function(e,t){var i=this
IBPS.Utils.isObjectEmpty(e)&&(e=[{},{},{}]),IBPS.Utils.forEach(e,function(e,n){var a=i.printUtils.style2ClassName(n.style)
$('<div class="column"/>').appendTo(t).addClass(a).append('<div class="data">'+i._getCellText(n)+"</div>")})},_setCellAlign:function(e){if(this.$column){switch(e){case"left":e="htLeft"
break
case"right":e="htRight"
break
case"center":e="htCenter"}var t=this.$column.attr("class");-1===t.indexOf(e)&&(t=t.replace("htLeft","").replace("htCenter","").replace("htRight","").replace("  "," "),t+=" "+e,this.$column.attr("class",t))}},_setCellStyle:function(e){if(this.$column){var t=this.$column.attr("class"),i=""
switch(e.action){case"fontSize":i="font-size-"+e.value,t=t.replace(/font-size-[0-9]{1,2}/,"").replace("  "," "),t=t+" "+i
break
case"fontFamily":i="ff-"+e.value,t=t.replace(/ff-[a-zA-Z]{3,}/,"").replace("  "," "),t=t+" "+i
break
default:var n=e.action;-1!==t.indexOf(n)?t=t.replace(""+n,"").replace("  "," "):t+=" "+n}this.$column.attr("class",t)}},_getCellText:function(e){var t="",i=""
IBPS.Utils.isObjectEmpty(e.content)||(i=e.content.join(""))
var n=i.split(/(\${page_number})/)
return IBPS.Utils.forEach(n,function(e,i){t+=/\${page_number}/.test(i)?"{页码}":i}),t},_getCellValue:function(e){var t=[],i=e.split(/({页码})/)
return IBPS.Utils.forEach(i,function(e,i){IBPS.Utils.isEmpty(i)||(/{页码}/.test(i)?t.push("${page_number}"):t.push(i))}),[t.join("")]},_clean:function(e,t){var i=this.page.children(".header").children(".column"),n=this.page.children(".footer").children(".column")
t&&t.length&&t.val(""),"all"==e?(i.children(".data").text(""),i.removeClass().addClass("column"),n.children(".data").text(""),n.removeClass().addClass("column")):"header"==e?(i.children(".data").text(""),i.removeClass().addClass("column")):"footer"==e&&(n.children(".data").text(""),n.removeClass().addClass("column"))},_createEditor:function(e,t){var i=this
e.children(".data").text(""),this.$input=$('<input class="editor"/>').appendTo(e).val(t).focus().on("blur",function(){i._removeEditor(e,$(this))}).on("keydown",function(t){return 13===t.keyCode?(i._removeEditor(e,$(this)),!1):void 0})},_removeEditor:function(e,t){e.removeClass("select").children(".data").text(t.val()),t.remove()},insertAtCursor:function(e,t){if(IBPS.Utils.isNumber(e.selectionStart)){var i=e.selectionStart,n=e.selectionEnd
e.value=e.value.substring(0,i)+t+e.value.substring(n,e.value.length),e.focus(),e.selectionStart=i+t.length,e.selectionEnd=i+t.length}else e.value+=t,e.focus()},_bindEvent:function(){var e=this
this.page.on("click",".column",function(t){var i=$(t.currentTarget)
e.page.find(".column").removeClass("select"),i.addClass("select"),e.$column=i,i.parent().hasClass("footer")?e.menu.setHeaderFooter("footer"):e.menu.setHeaderFooter("header"),e.menu.setMenuStyles(e.printUtils.getStyleByClassName(i.attr("class")))}),this.page.on("dblclick",".column",function(t){var i=$(t.currentTarget)
i.children("input.editor").length||e._createEditor(i,i.text())}),$(document).unbind("keydown.del"),$(document).bind("keydown.del",function(){e.$column&&e.$column.children(".data").text()&&e.$column.children(".data").text("")})},_getColumns:function(e){var t=this,i=[]
return IBPS.Utils.forEach(e,function(e,n){var a=$(n),s=t.printUtils.getStyleNameByCell({className:a.attr("class")});/s_/.test(s)&&(s=s.replace(/s_/,"hf_")),i.push({content:t._getCellValue(a.text()),style:s})}),i},getValue:function(){this.printUtils.initStyles()
var e={},t={},i={}
return e.columns=this._getColumns(this.page.children(".header").children(".column")),e.margin=this.headerMargin,t.columns=this._getColumns(this.page.children(".footer").children(".column")),t.margin=this.footerMargin,IBPS.Utils.forEach(this.printUtils.getStyles(),function(e,t){/s_/.test(e)&&(e=e.replace(/s_/,"hf_"),i[e]=t)}),{header:e,footer:t,styles:i}}}),$.shortcut("printpage",IBPS.PrintPage)}.call(this)}(window)
