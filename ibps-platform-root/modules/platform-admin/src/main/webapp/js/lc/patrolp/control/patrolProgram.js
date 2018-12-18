
/**
 * 巡课方案
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-28 01:48:20
 * </pre>
 */
$(function() {
	patrolProgram  = new PatrolProgram();
	patrolProgram.init();
	
	formUrl = patrolProgram.formUrl;
});

(function() {
	// 定义常量
	var 	_consts = {
			GRID : "#patrolProgramGrid",// 列表对象
			PAGER : "#patrolProgramPager",// 列表分页
			FORM : '#patrolProgramForm',// 表单form
			FORMGET : '#patrolProgramFormGet'// 表单form
			,MAPPAGE:'#map' // 地图控件
	};
	/**
	 * 巡课方案 对象
	 * 
	 * @returns {PatrolProgram}
	 */
	PatrolProgram = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	PatrolProgram.prototype = {
		consts:	_consts,
		
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){// 列表
				this._initGridList();
				
			}
			if ($(this.consts.FORM).length > 0){// 表单
				this._initForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.FORMGET).length > 0){// 明细页面office控件初始化
				this._initOffice('r');
			}
			
			if ($(this.consts.MAPPAGE).length > 0){// 地图页面
				this._initMapPage();
			}
		},
		_initMapPage: function(){
			// 初始化参数
			var me = this , 
				params = frameElement.dialog.params,
				defaultMapOpt = me.getFengMapDefaultParam();
				
			params.options = $.extend({}, params.options, defaultMapOpt);
				
			// 蜂鸟地图初始化
			me.mapInitial(params);
		
		},
		_initOffice : function(_rights){
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(me.consts.GRID).GridList(
					{
						url :  __ctx+'/patrolp/control/patrolProgram/listJson.htm',
						multiselect: 0,
						pager :this.consts.PAGER,
						colNames: ['主键',
						          center( '执行人'),
						          center( '巡课教师姓名'),
				        		  center( '巡课时间'),
				        		  center( '巡课完成度'),
		        				  center( '备注'),
		        				  center( '操作')],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
						                 	   name:'patroller',
						                	   index: 'patroller_',
						                	   align : 'center',
						                	   hidden : !0,

				                	 	},  {
					                 	   name:'patrollerName',
					                	   index: 'name_',
					                	   align : 'center'
	
					                	 					                	 	}, {
				                 	   name:'startTime',
				                	   index: 'start_time_',
				                	   align : 'center'

				                	 					                	 	}
				                	 	, {
					                 	   name:'ratio',
					                	   index: 'complete_',
					                	   align : 'center'

					                	 					                	 	},{
				                 	   name:'remarks',
				                	   index: 'remarks_',
				                	   align : 'center'

				                	 					                	 	},{
				                 	   name:'__manage',
				                 	   sortable : false,
				                 	   classes : 'rowOps',
				                 	   width : 200,
				                 	   formatter : 'manage',
				                 	   align : 'center',
				                 	   formatoptions : [
														{
															label : '3D历史',
															classes : 'btn btn-primary fa fa-history',
															action : 'javascript:patrolProgram.historyQunee("{id}","{startTime}")'
														},{
															label : '历史图表',
															classes : 'btn btn-primary fa fa-history',
															action : 'javascript:patrolProgram.historyQunee("{id}","{startTime}")'
														}]
				                	 	}, ],
								loadComplete: function(){
									try{
										$('.rowOps').each(function() {
											$(this).rowOps({showNum : 2});
										});
									}catch(e){}
								}
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				// office提交
        		OfficePlugin.submit();
				me.formUrl.submit(me._showResponse);
				//alert("yuda");
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/patrolp/control/patrolProgram/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
		,newInstance : function(k,course){
			var	me = this,
				content = __ctx +(k ? '/patrolp/tpt/tpt/edit.htm?markid=5&id=425640103063322624&course='+course :  '/patrolp/control/patrolProgram/mapControl.htm') , 
				title = '3D巡课', 
				url = __ctx + '/patrolp/control/patrolProgram/save.htm?course='+course,
				dprm = me.defaultParam() ,
				options = $.extend({} , dprm.options , { editable : !0}),
				params = $.extend( {} , dprm , { options , modalSaveFuction : me.msf} );
			
			if ( k ) editable = !0;
			
			$.get( url ,function(){ $(me.consts.GRID).trigger('reloadGrid'); });
			me.params = params;
			me.dialog( content , title , params );
		}
		,history : function( id ){
			var me = this,
				content = __ctx + '/patrolp/control/patrolProgram/mapControl.htm', 
				title = '巡课记录';
			
			me.dialog( content 
							, title 
							, $.extend({}  , me.defaultParam() , { modelClick : function( e ){ me.showModal( e.target.name , id, course ); }})
							);
			
		},
		historyQunee : function(id,startTime){
			//alert("id:"+id);
			//alert("startTime:"+startTime);
			var len = startTime.length;
			var course = startTime.substring(15,16);
			var 	me = this,
					content = __ctx + '/patrolp/tpt/tpt/edit.htm?id=425640103063322624&markid=5&pgId='+id+"&course="+course, 
					title = '巡课记录';
			
			me.dialog( content , title , $.extend({} , me.defaultParam() , { modelClick : function( e , fm ){ fm.showModal( e.target.name , id,course )}}));
			
		},
		defaultParam : function(){
			// PatrolProgramMapControl 的默认参数
			var me = this;
			return params = {
					// 通过patrolProgramMapControl控制FengMap的参数
					options : {
						closable : !0,
						// MapControl要显示地图的id
						mapId : 'smartfactory1'
					},
					
					modelClick : function( e ){
						// 点击地图模型回调
						me.showModal( e.target.name );
					},
					closeFuction : function(){
						// 左下角关闭按钮回调
						DialogUtil.closeAll();
					}
				};
		},
		dialog : function( content , title , params ){
			var me = this;
			me.curWindow = DialogUtil.dialog({
				content,
				title,
				area : ['100%','100%'],
				params : params ? params : me.defaultParam()
			});
		},
		msf : function( normal , data){
			
			data.normal = normal;
			$.post(__ctx + '/patrolp/control/patrolProgram/saveDetail.htm' , data , function(res){
				if(res.success){
					DialogUtil.msg( res.msg );
				}else{
					DialogUtil.warn( res.msg );
				}
			},'json');
		},
		showModal : function( className , id, course){
		
			var me=this,
			    data = { className  },
			    url = __ctx + '/patrolp/control/patrolProgram/getInf.htm' +( id? ('?id='+id) : '')+( course? ('&course='+course) : ''), 
			    loader = DialogUtil.load(),
			    find = me.findInCurWindow
			    , params = frameElement.dialog? frameElement.dialog.params : me.params ;
			find('#reason').val( '' );
			find('#actTch').val( '' );
			
			$.post( url , data , function(res){
				// 显示模态窗
				find('#dlgModelInfo').modal('show');
		    	// 填充信息W
		    	data =  $.extend({} , data , res , res.detailPo );
		    	for( k in data){
		    		find('#' + k ).text( data [ k ] );
			    }
		    	
		    	// 双页面控制
		    	if( data.reason || data.actTch ){
		    		find('#reason').val( data.reason );
		    		find('#actTch').val( data.actTch );
		    		me.change( 2 );
		    	}else{
		    		me.change( 1 );
		    	}
		    	// 修改权限控制
		    	
	    		if( ! params.options.editable){
		    		$.each( find('div.editable') , function(i , v){ find(v).addClass('hidden'); });
		    		$.each( find('div.disEditable'), function(i , v){ find(v).removeClass('hidden')})
	    		}
		    	DialogUtil.close( loader );
		    },'json');
		}
		,change : function( idx ){
				
			var me = this,
				elem = [ 'div.step-1' , 'div.step-2' ],c = 'hidden',
				find = me.findInCurWindow;
			if( !idx ){
				$.each( elem , function( i , v ){
					var e = find( v ) ;
					if( e.hasClass( c ) ) e.removeClass( c );
					else e.addClass( c );
				} )
			}else{
				$.each( find('div.step-' + idx) , function( i , v ){
					find(v).removeClass( c );
				})
				$.each( find('div.step-' + ( 3 - idx )) , function( i , v ){
					find(v).addClass( c );
				})
			}
		}
		,mapInitial : function(params){
			var me = this,
				options = params.options,
				d = $(document),
				fm = new FengMap( options );
			
			// 初始化蜂鸟地图
			mapId = options.mapId;
			fm.init();
			fm.params = params;
			// 关闭按钮
			if (options.closable) {
				$('a.fa-close').removeClass('hidden');
				d.on('click', 'a.fa-close', function() {
					params.closeFuction();
				});
			}
			// 可编辑
			if(options.editable){
				d.on('click', 'a[name^="modal-save"]', function() {
					$('#dlgModelInfo').modal('hide');
					var data={
								className : $('#className').text(),
								actTch : $('#actTch').val(),
								reason :$('#reason').val()
							};
					params.modalSaveFuction( $(this).attr('name').split('-')[2] == 'p' , data);
				});
			}
			d.on('click' , 'a.change' ,function(){
				me.change();
			})
		}
		,getFengMapDefaultParam : function(){
			return {
				showMultiGroup : !0,
				showZoom : 0,
				showCompass : !0,
				clickable : !0
			};
		},
		findInCurWindow : function( selector ){
			var me = this,
				cur = DialogUtil.getChildFrameWindow( me.curWindow );
			
			return cur.$( selector );
		}
		 
	};
})();


