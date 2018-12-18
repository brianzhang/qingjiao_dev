(function(){
	var OnlineForm = {} , defaultOpt = {
			content : __ctx + '/platform/form/formDef/online.htm',
			area : ['100%','100%']
	}
	
	OnlineForm.open = function( pageKey , saveFun , saveThenClose ){
		_post({
			pageKey,
			saveFun,
			saveThenClose,
			success : _open,
			fail : function(){
				DialogUtil.alert( "错误："+pageKey+"，无对应表单！" );
			}
		});
	}
	
	OnlineForm.check = function( pageKey , dom , saveFun , saveThenClose ){
		_post({
			pageKey,
			saveFun,
			saveThenClose,
			success : function(){
				$(dom).removeClass('hidden');
				$(dom).unbind('click').bind('click' , _open );
			},
			fail : function(){
				$(dom).addClass('hidden');
			}
		});
	}
	
	
	_post = function( opt ){
		var pageKey = opt.pageKey , saveFun = opt.saveFun , saveThenClose = opt.saveThenClose;
		$.post(__ctx + '/platform/form/formDef/pageForm.htm' , {pageKey} , function(res){
			if( res.success ){
				_init( res.formKey , saveFun , saveThenClose );
				opt.success();
			}else
				opt.fail();
		},'json');
	}
	
	_init = function( formKey , _saveFun , saveThenClose ){
		var data = get( OnlineForm.data ), saveFun = get( _saveFun );
	
		OnlineForm.opt = $.extend({} , defaultOpt , { params : { formKey , saveFun ,  data  , saveThenClose}});
	}
	
	_open = function(){
		DialogUtil.dialog( OnlineForm.opt );
	}
	
	
	
	window.OnlineForm = OnlineForm;
	
	function get( obj ){
		return obj? obj : null;
	}
	
})(window);

$(function(){
	var form = $('.form') , fr , loading ;
	
	if( form.length > 0 ){
		
		var params = frameElement.dialog.params;
		
		loading = DialogUtil.load();
		
		$.post( 
			__ctx + '/platform/form/formDef/getFormData.htm' ,
			
			{formKey : params.formKey} ,
			
			function(f){
				f = eval( '(' + f + ')' );
				f.response = {
					responses : params.data
				};
				fr = new FormRenderer( f );
				savable();
				DialogUtil.close( loading );
				
			} ,
			'json');
		
		$(document).ready(function() {
			$('.panel-toolbar').stickUp();
		});
		
		$(document).on("click", "a.fa-close", function() {
			DialogUtil.closeDialog();
		});
		
		function savable(){
			if( params.saveFun ){
				$('a.fa-save').removeClass('hidden');
				$('a.fa-save').on('click' , function(){
					params.saveFun( fr.getValue() );
					if( params.saveThenClose )
						DialogUtil.closeDialog();
				} );
			}
		}
	}
	
});