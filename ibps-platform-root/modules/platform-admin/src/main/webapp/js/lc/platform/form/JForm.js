
/**
 * 表单--封装自定义代码扩展接口
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2017-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
(function() {
/**
 * 封装自定义代码扩展接口
 */
$.extend({JForm: {
    // 已经初始化
    _isInitialization: false,
    _isLoadJavaScriptFile: false,
    _init: function (form) {
        if (this._isInitialization) return;
        this.form = form,_this =this;
        
        // 把所有控件转为 this.model_的模式,如  this.model_****.set("value");
        form.response_fields.each(function(model){
        	var _name = model.get("name");
    		if(undefined != _name) {
    			_this["model_" + _name] = model;
    		}
        });

        // 把所有控件转为 this.view_的模式,如  this.view_****.hide();
        _.each(form.response_views, function(view, name){
        		if(undefined != name) {
        			_this["view_" + name] = view;
        		}
        });
        
        this._isInitialization = true;
    },

    _loadJavaScriptFile : function(){
    	if(this._isLoadJavaScriptFile) return;
    	if(_.isArray($.JForm.javaScriptFiles)){
    		for (var i=0,pi ;pi = $.JForm.javaScriptFiles[i++];) {
    	        this._write(pi);
    	    }
    	}else if(_.isString($.JForm.javaScriptFiles)){
    		this._write($.JForm.javaScriptFiles);
    	}
    	this._isLoadJavaScriptFile = true;
    },
    
    _write : function(src){
    	document.write('<script type="text/javascript" src="'+ __ctx + src +'"></script>');
    },
    
    // 表单加载
    _onLoad: function (form) {
    	if ($.isNotEmpty($.JForm.javaScriptFiles)) {
    		this._loadJavaScriptFile();
    	}
        if ($.isFunction($.JForm.onLoad)) {
            this._init(form);
            $.JForm.onLoad();
        }
    },

    // 加载按钮
    _onLoadActions: function (form, actions) {
        if ($.isFunction($.JForm.onLoadActions)) {
            this._init(form);
            $.JForm.onLoadActions(actions);
        }
    },

    // 表单校验
    _onValidate: function (form, actionControl) {
        if ($.isFunction($.JForm.onValidate)) {
            this._init(form);
            return $.JForm.onValidate(actionControl);
        }
        return true;
    },

    // 提交前事件
  _beforeSubmit	: function (form, action, postValue) {
        if ($.isFunction($.JForm.beforeSubmit)) {
            this._init(form);
            return $.JForm.beforeSubmit(action, postValue);
        }
    },

    // 提交后事件
    _afterSubmit: function (form, action, postValue) {
        if ($.isFunction($.JForm.afterSubmit)) {
            this._init(form);
            return $.JForm.afterSubmit(action, postValue);
        }
    },
    /**
     * 子表按钮的提交前事件
     * 
     */
    _beforeSubButton:function(form,action,position,params){
        if ($.isFunction($.JForm.beforeSubButton)) {
            this._init(form);
            return $.JForm.beforeSubButton(action, position,params);
        }
    },
    _afterSubButton:function(form,action,position,params){
        if ($.isFunction($.JForm.afterSubButton)) {
            this._init(form);
            return $.JForm.afterSubButton(action, position,params);
        }
    },
    // 清理所有自定义事件
   cleanEvents: function () {
        this.onLoad = null;
        this.onLoadActions = null;
        this.onValidate = null;
        this._isInitialization = false;
    }
}
});

}).call(this);