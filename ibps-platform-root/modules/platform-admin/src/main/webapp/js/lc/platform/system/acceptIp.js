/**
 * IP地址管理
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-03-03 15:54:35
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	var acceptIp  = new AcceptIp();
	acceptIp.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#acceptIpGrid",// 列表对象
			PAGER : "#acceptIpPager",// 列表分页
			FORM : '#acceptIpForm'// 表单form
	};
	/**
	 * IP地址管理 对象
	 * @returns {AcceptIp}
	 */
	AcceptIp = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	AcceptIp.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/platform/system/acceptIp/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','标题','开始地址','结束地址','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_',
				                	 	hidden:true,
				                	 	key:true
				          	}, {
				                 	   name:'title',
				                	   index: 'title_'
				             }, {
				                 	   name:'startIp',
				                	   index: 'start_ip_'
				                }, {
				                 	   name:'endIp',
				                	   index: 'end_ip_'
				             	}, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/system/acceptIp/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/system/acceptIp/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/system/acceptIp/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			 $("[data-inputmask]").inputmask();
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				frm.ajaxForm({
					success : function(responseText){
						$el.button('reset'); 
						me._showResponse(responseText);
					},error:function(){
						$el.button('reset');
		            }
				});
				if(!frm.valid()){
					$el.button('reset');
					return;
				}
				
				var sIp=$("#startIp").val();
				var eIp=$("#endIp").val();
				if ( me.isIP(sIp) && me. isIP(eIp)) {
					form.submit();
				}else{
					$el.button('reset');
					DialogUtil.msg("IP地址有误！");
				}
					
			});
		},
		isIP:function (strIP) {
			if (strIP==null||strIP=="") return false;
			var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
			if(re.test(strIP))
			{
			if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;
			}
			return false;
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
							window.location.href = __ctx+'/platform/system/acceptIp/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		}
	};
})();


