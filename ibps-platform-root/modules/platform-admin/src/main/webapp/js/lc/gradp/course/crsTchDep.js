$(function() {
	crsTch = new CrsTch();
	crsTch.init();
	formUrl = crsTch.formUrl;
});
(function() {
	var j = {
		GRID : "#crsTchGrid",
		PAGER : "#crsTchPager",
		FORM : '#crsTchForm'
	};
	CrsTch = function() {
	};
	CrsTch.prototype = {
		consts : j,
		init : function() {
			if (this.hasInit)
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0) {
				this._initGridList();
				this.loadIntro();
			}

			if ($(this.consts.FORM).length > 0) {
				this._initForm();
				this._initData();
				this.initTableSelect2();
			}
		},
		_initGridList : function() {
			var a = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/gradp/course/crsTch/listDepJson.htm?curTerm='
										+ curTerm,
								pager : this.consts.PAGER,
								colNames : [
										'主键',
										'<div style="text-align:center;">课程编号</div>',
										'<div style="text-align:center;">课程名称</div>',
										'<div style="text-align:center;">教师工号</div>',
										'<div style="text-align:center;">教师姓名</div>',
										'<div style="text-align:center;">上课班级</div>',
										'<div style="text-align:center;">上课学期</div>',
										'<div style="text-align:center;">上课地点</div>',
										'<div style="text-align:center;">上课时间</div>',
										'<div style="text-align:center">操 作</div>' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'crsNum',
											index : 'crs_num',
											width : 100,
											align : 'center'
										},
										{
											name : 'crsName',
											index : 'crs_name',
											sortable : false,
											align : 'center'
										},
										{
											name : 'tchNum',
											index : 'tch_num',
											sortable : false,
											align : 'center',
										},
										{
											name : 'tchName',
											width : 80,
											align : 'center'
										},
										{
											name : 'clazz',
											index : 'clazz',
											align : 'center'
										},
										{
											name : 'term',
											index : 'term',
											width : 70,
											align : 'center',
										},
										{
											name : 'location',
											index : 'location',
											align : 'center',
										},
										{
											name : 'time',
											index : 'time',
											align : 'center',
										},
										{
											name : '__manage',
											sortable : false,
											classes : 'rowOps',
											width : 100,
											formatter : 'manage',
											align : 'center',
											formatoptions : [ {
												label : ' 授课情况查看',
												classes : 'btn btn-primary fa fa-edit',
												action : 'javascript:crsTch.edit("{id}","{crsName}")',
											} ]
										} ],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps({
												showNum : 2
											});
										})
									} catch (e) {
									}
								}
							})
			$('a.fa-help').on('click', function() {
				// 清理缓存
				localStorage.removeItem("tour_end");
				localStorage.setItem("tour_current_step", 0);
				a.loadIntro();
			});
			var url = __ctx + '/gradp/course/crsTch/export.htm?type=myCourse';
			$('a.fa-export').attr('href', url);
			$('#importCrsTch').on('click', function() {
				var con = __ctx + '	/gradp/admin/data/imbort.htm?type=3';
				DialogUtil.dialog({
					title : '导入教师授课关系',
					content : con,
					index : 'edit',
					area : [ '70%', '70%' ],
					btn : [ {
						label : '关闭',
						iconCls : 'btn btn-success fa fa-cancel',
						action : function(a, b) {
							DialogUtil.close(b);
						}
					} ]
				});
			});

		},
		_initForm : function() {
			var i = this, form = $(this.consts.FORM), frm = form.form();
			i.formUrl = new com.lc.form.FormData(form);
			frm.valid();
			$(document)
					.on(
							'click',
							'a.fa-save',
							function() {
								var e = {}, f = $('#mainBd').find(
										"input,select");

								$(f).each(function() {
									var a = $(this).attr("name");
									var b = $(this).val();
									e[a] = b;
								});
								var g = __ctx + '/gradp/course/crsTch/save.htm', h = JSON2
										.stringify(e);
								if (!admin) {
									DialogUtil
											.confirm(
													'是否同时清空当前<span style="color:red">所有课程学生作业及相关信息</span>？',
													function(d) {
														DialogUtil
																.alert("正在初始化数据，请稍候");
														$
																.post(
																		g,
																		{
																			crsTchPo : h,
																			reset : d,
																			copy : copy
																		},
																		function(
																				b) {
																			var c = new com.lc.form.ResultMessage(
																					b);
																			if (c
																					.isSuccess()) {
																				DialogUtil
																						.msg(c
																								.getMessage());
																				window.location.href = preUrl;
																			} else {
																				DialogUtil
																						.error(c
																								.getMessage());
																			}
																		});
													});
								} else {
									$
											.post(
													__ctx
															+ '/gradp/course/crsTch/save.htm',
													{
														admin : true,
														crsTchPo : h
													},
													function(b) {
														var c = new com.lc.form.ResultMessage(
																b);
														if (c.isSuccess()) {
															DialogUtil
																	.msg(c
																			.getMessage());
															window.location.href = preUrl;
														} else {
															DialogUtil
																	.error(c
																			.getMessage());
														}
													});
								}
							});
		},
		_initData : function() {
			if (!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)
					&& !$.isEmpty(frameElement.dialog.params)
					&& !$.isEmpty(frameElement.dialog.params.data)) {
				var a = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", a);
			}
			this.formUrl.validate();
		},
		_showResponse : function(b) {
			var c = new com.lc.form.ResultMessage(b);
			if (c.isSuccess()) {
				DialogUtil.msg(c.getMessage());
				window.location.href = preUrl;
			} else {
				DialogUtil.error(c.getMessage());
			}
		},
		showList : function(c, d) {
			var e = __ctx + '/gradp/course/' + d;
			DialogUtil.dialog({
				title : c,
				content : e,
				index : 'showList',
				area : [ '100%', '100%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
			});
		},
		loadIntro : function() {
			var tour = new Tour({
				orphan : !0,
				steps : [ {
					element : "td",
					title : "欢迎使用本系统",
					content : "本指引讲为您介绍当前界面<br>支持键盘←→控制"
				}, {
					element : "#crsTchGrid_crsName",
					title : "表头",
					content : "点击此处可进行排序，升序或降序"
				}, {
					element : "#crsTchGrid_crsName",
					title : "课程",
					content : "点击此处进行学生作业批阅等操作"
				}, {
					element : "input[name='Q^CLAZZ^SL']",
					title : "筛选条件",
					content : "支持多种筛选条件，您可以根据需要筛选出相应数据"
				}, {
					element : "td",
					title : "恭喜您",
					content : '<span style="color:green">完成了所有指引</span>'
				} ]
			});
			tour.init();
			tour.start();
		},
		edit : function(crsTchId, crsName) {
			DialogUtil.dialog({
				title : '作业管理',
				content : __ctx
						+ '/gradp/course/crsJob/list.htm?admin=1&crsTchId='
						+ crsTchId + '&crsName=' + crsName,
				index : 'edit',
				area : [ '80%', '80%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
			});
		},
		initTableSelect2 : function() {
			try {
				var me = this, $el = $('#param').length > 0 ? $('#param')
						: $('#source'), options = $el.data(), cooc = options.cooc, $val = options.value, $comment = options.comment, ajax = options.ajax, multiple = $
						.isEmpty(options.multiple) ? true
						: (options.multiple == 'true'
								|| options.multiple == true ? true : false), clear = $
						.isEmpty(options.clear) ? true
						: (options.clear == 'true' || options.clear == true ? true
								: false), split = $.isEmpty(options.split) ? ','
						: options.split;
				var params = {
					placeholder : '请选择',
					theme : "bootstrap",
					language : "zh-CN",
					multiple : multiple,
					allowClear : clear,
					separator : split,
					initSelection : function(element, callback) { // 初始化时设置默认值
						callback({
							'id' : $val,
							'text' : $val
						});
					},
					formatSelection : function(item) {
						return item.id;
					} /* 选择结果中的显示 */
					,
					formatResult : function(item) {
						return item.id;
					} /* 搜索列表中的显示 */
					,
					escapeMarkup : function(markup) {
						return markup;
					},
					createSearchChoice : function(term, data) {
						/* 创建搜索结果（使用户可以输入匹配值以外的其它值） */
						return {
							id : term,
							text : term
						};
					}
				};

				if (ajax) {
					params.ajax = {
						url : ajax,
						dataType : 'json',
						delay : 250,
						data : function(_params) {
							return {
								whereK : cooc,
								whereV : _params.term,
								select : cooc
							};
						},
						processResults : function(data) {
							return {
								results : data
							};
						},
						cache : true
					};
				}

				$el.select2(params);
			} catch (e) {
			}
		}
	}
})();

function cg() {
	$('a.fa-search').click();
}