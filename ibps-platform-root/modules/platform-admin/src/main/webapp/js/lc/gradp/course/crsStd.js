$(function() {
	crsStd = new CrsStd();
	crsStd.init();
	formUrl = crsStd.formUrl
});
(function() {
	var f = {
		GRID : "#crsStdGrid",
		PAGER : "#crsStdPager",
		FORM : '#crsStdForm'
	};
	CrsStd = function() {
	};
	CrsStd.prototype = {
		consts : f,
		init : function() {
			if (this.hasInit)
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)
				this._initGridList();
			if ($(this.consts.FORM).length > 0) {
				this._initForm();
				this._initData()
			}
		},
		_initGridList : function() {
			var a = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/gradp/course/crsStd/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ '主键', center('学号'), center('姓名'),
										center('课程名称'), center('授课教师'),
										center('上课学期'), '授课码', center('地点'),
										center('时间'), center('总成绩') , center('操作') ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'stdNum',
											index : 'std_num',
											hidden : !admin,
											align : 'center'
										},
										{
											name : 'stdName',
											hidden : !admin,
											align : 'center'
										},
										{
											name : 'crsName',
											align : 'center'
										}, {
											name : 'tchName',
											align : 'center'
										}, {
											name : 'term',
											align : 'center'
										}, {
											name : 'crsTchId',
											index : 'crsTchId',
											hidden : true
										}, {
											name : 'location',
											hidden : admin,
											align : 'center'
										}, {
											name : 'time',
											hidden : admin,
											align : 'center'
										}, {
											name : 'score',
											index : 'score',
											align : 'center'
										} ,
										{
											name : '__manage',
											sortable : false,
											classes : 'rowOps',
											hidden : admin,
											width : 100,
											formatter : 'manage',
											align : 'center',
											formatoptions : [
													{
														label : ' 打开作业本',
														classes : 'btn btn-primary fa fa-detail',
														action : 'javascript:crsStd.openJob("'+__ctx+'/gradp/course/jobStd/markScore.htm?role=std&stdNum={stdNum}&crsTchId={crsTchId}")'
														
													}]
										} ],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps({showNum : 1})
										})
									} catch (e) {
									}
								}
							})
		},
		_initForm : function() {
			var a = this, form = $(this.consts.FORM), frm = form.form();
			a.formUrl = new com.lc.form.FormData(form);
			frm.valid();
			$(document).on('click', 'a.fa-save', function() {
				a.formUrl.submit(a._showResponse)
			})
		},
		_initData : function() {
			if (!$.isEmpty(frameElement) && !$.isEmpty(frameElement.dialog)
					&& !$.isEmpty(frameElement.dialog.params)
					&& !$.isEmpty(frameElement.dialog.params.data)) {
				var a = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", a)
			}
			this.formUrl.validate()
		},
		_showResponse : function(b) {
			var c = new com.lc.form.ResultMessage(b);
			if (c.isSuccess()) {
				DialogUtil.msg(c.getMessage());
				window.location.href = returnUrl;
			} else {
				DialogUtil.error(c.getMessage())
			}
		},
		showList : function(c, d) {
			var e = __ctx + '/gradp/course/' + d;
			DialogUtil.dialog({
				title : c,
				content : e,
				index : 'showList',
				area : [ '80%', '90%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b)
					}
				} ]
			})
		},
		open : function(uri){
			var url = uri.replaceAll('<s.*>','');
			location.href = url;
		}
		
		, listJob : function(r) {
			DialogUtil.dialog({
				title : '作业列表',
				content : r,
				area : [ '80%', '80%' ],
				params:{
					"role" : "std"
				},
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						cg();
						DialogUtil.close(b);
					}
				} ]
			})
		},
		openJob: function(url){
			DialogUtil.dialog( {
				content : url
				, area : ['90%','90%']
				, btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
				});
			}
	}
})();

function cg() {
	$('a.fa-search').click()
}
center = function(s) {
	return '<div style="text-align:center;">' + s + '</div>';
}