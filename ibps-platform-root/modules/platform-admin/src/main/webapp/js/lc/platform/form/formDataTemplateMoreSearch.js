/**
 * 更多
 */
$(function() {
	formDataTemplateMoreSearch.init();
});

function getData(){
	
}

var formDataTemplateMoreSearch = {
	init : function() {

		this.initQueryModel();
		this.initQueryView();
	},
	initQueryModel : function() {
		var params,options,model, rf, _i, _len, _ref;
		
			this.response_querys = new Backbone.Collection;
			params = frameElement.dialog.params;
			options = params.options;
			response_fields = params.response_fields;
			_ref = params.queryColumns;
			
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			 rf = _ref[_i];
			model = new TemplateRenderer.Models["ResponseQuery"
					+ (_.str.capitalize(rf['field_type']))](rf,
							options,  response_fields);
				this.response_querys.add(model);
		}
		
	},
	initQueryView:function(){
		var view, queryEl, model, rf, _i = 0, _len, _ref;
		
		queryEl = $("#moreSearchForm");
		
		this.response_querys.each((function(_this) {
			return function(rf) {
				view = new TemplateRenderer.Views["ResponseQuery"
						+ (_.str.capitalize(rf["field_type"]))]({
							model : rf
						});
				queryEl.append(view.render().el);
			};
		})(this));
		
		
	},
	clean:function(){
		var searchForm =$(".search-form");
		searchForm[0].reset();
		searchForm.find('[type="hidden"]').val("");
	},
	getData:function(){
		var searchForm =$(".search-form");
		return this._serializeObject(searchForm);
	},
	_serializeObject : function(form) {
		var o = {}, a = $(form).serializeArray();
		$.each(a, function() {
			var v = this.value || '';
			if (o[this.name]) {
				o[this.name] = o[this.name] + "," + v;
			} else {
				o[this.name] = v;
			}
		});
		return o;
	}
};