$(function() {
	jobStd = new JobStd();
	jobStd.init();
	formUrl = jobStd.formUrl;
});
(function() {
	var k = {
		GRID : "#jobStdGrid",
		PAGER : "#jobStdPager",
		FORM : '#jobStdForm'
	};
	JobStd = function() {
	};
	JobStd.prototype = {
		consts : k,
		topIndex : 0,

		init : function() {
			if (this.hasInit)
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)
				this._initGridList();
			if ($(this.consts.FORM).length > 0) {// 表单
				this._initForm();
				this._initData();
			}
		},
		_initGridList : function() {
			var a = this;
			var b = $('#jobId').val();
			var f = $('#f').val();
			var c = $('#c').val();
			var d = (f == 0 || c > 2);
			if (c > 2)
				$('#rs').css('display', 'none');
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx
										+ '/gradp/course/jobStd/listJson.htm?jobId='
										+ b + '&f=' + $('#f').val(),
								pager : this.consts.PAGER,
								colNames : [
										'主键',
										'作业ID',
										'<div style="text-align:center;">学号</div>',
										'<div style="text-align:center;">姓名</div>',
										'学生作业文件',
										'<div style="text-align:center;">文件上传时间</div>',
										'<div style="text-align:center;">完成状态</div>',
										'<div style="text-align:center;">评阅时间</div>',
										'<div style="text-align:center;">成绩</div>',
										'<div style="text-align:center;">操作</div>' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'jobid',
											index : 'jobID',
											hidden : true
										},
										{
											name : 'stdNum',
											index : 'std_num',
											align : 'center'
										},
										{
											name : 'stdName',
											index : 'std_name',
											align : 'center'
										},
										{
											name : 'file',
											index : 'file',
											hidden : true
										},
										{
											name : 'fileUploadTime',
											index : 'action_time',
											align : 'center',
											hidden : d
										},
										{
											name : 'showStatus',
											index : 'showStatus',
											align : 'center',
											hidden : true
										},
										{
											name : 'reviewTime',
											index : 'review_time',
											align : 'center',
											hidden : d
										},
										{
											name : 'score',
											index : 'score',
											align : 'center',
											hidden : d
										},
										{
											name : '__manage',
											width : 100,
											sortable : false,
											classes : 'rowOps',
											formatter : 'manage',
											align : 'center',
											hidden : d,
											formatoptions : [ {
												label : '评阅',
												classes : 'btn btn-primary fa fa-detail',
												action : 'javascript:jobStd.review("{id}","{stdName}")',
											} ]
										} ],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps();
										})
									} catch (e) {
									}
								}
							})
		},
		_initForm : function() {
			var j = this, form = $(this.consts.FORM), frm = form.form();
			j.formUrl = new com.lc.form.FormData(form);
			frm.valid();
			$(document).on('click', 'a.js-intro-from', function() {
			});
			$(document).on('click', 'a.fa-save', function() {
				j.formUrl.submit(j._showResponse);
			});
			$(document).on('click', 'a.fa-save-review', function() {
				j.saveReview();
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
				DialogUtil.confirm(c.getMessage() + ',是否继续操作', function(a) {
					if (a)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/gradp/course/jobStd/list.htm';
				});
			} else {
				DialogUtil.error(c.getMessage());
			}
		},
		review : function(c, n) {
			var i = DialogUtil.dialog({
				title : '开始评阅',
				content : __ctx + '/gradp/course/jobStd/markScore.htm?t=1&id='
						+ c,
				area : [ '100%', '100%' ],
				btn : [ {
					label : '提交',
					iconCls : "btn btn-success fa fa-ok",
					action : function(a, b) {
						DialogUtil.alert('提交中,请稍候...');
						var c = DialogUtil.getChildFrameWindow(b);
						saveScore(cg, b, c);
					}
				}, {
					label : '关闭',
					iconCls : 'btn btn-danger fa fa-cancel',
					action : function(a, b) {
						DialogUtil.close(b);
					}
				} ]
			});
			localStorage.setItem('index', i);
		},
		officeOnline : function() {
				var rights,btns,b =  [ {
					'alias' : 'file',
					'css' : 'fa-file',
					'text' : '文件',
					'parentAlias' : '-1'
				}, {
					'alias' : 'save',
					'css' : 'fa-floppy-o ',
					'text' : '保存',
					'parentAlias' : 'file'
				}, {
					'alias' : 'print',
					'css' : 'fa-print',
					'text' : '打印',
					'parentAlias' : 'file'
				}, {
					'alias' : 'review',
					'css' : 'fa-file',
					'text' : '审阅',
					'parentAlias' : '-1'
				}, {
					'alias' : 'addComment',
					'css' : 'fa-file',
					'text' : '新建批注',
					'parentAlias' : 'review'
				}, {
					'alias' : 'delAllComment',
					'css' : 'fa-file',
					'text' : '删除所有批注',
					'parentAlias' : 'review'
				}, {
					'alias' : 'rights',
					'css' : 'fa-file',
					'text' : '权限',
					'parentAlias' : '-1'
				}, {
					'alias' : 'setReadOnly',
					'css' : 'fa-file',
					'text' : '设置只读',
					'parentAlias' : 'rights'
				}, {
					'alias' : 'cancelReadOnly',
					'css' : 'fa-file',
					'text' : '取消只读',
					'parentAlias' : 'rights'
				}, {
					'alias' : 'enCopy',
					'css' : 'fa-file',
					'text' : '启用复制粘贴',
					'parentAlias' : 'rights'
				}, {
					'alias' : 'disCopy',
					'css' : 'fa-file',
					'text' : '禁用复制粘贴',
					'parentAlias' : 'rights'
				} ];
				if (status == '1' && role == 'std')//已经结束,教师可以编辑
					btn = [b[0],b[2]];
				else//进行中全部开放
					btn = b;
			new OfficeDialog({
				fileName : fileName,
				fileId : fileIds,
				rights : "e",
				btns :btn,
				title : "附件预览",
				extraParam : "&jobStdId=" + jobStdID,
				callback : function(){
					var url = __ctx + '/gradp/course/jobStd/thisD.htm';
					$.post(url , {jobStdId : jobStdID} , function(data){
						debugger;
						options.data[page.curPage - 1] = $.extend({}, options.data[page.curPage - 1] , data);
						page.init(options.data.length, page.curPage , options) ;
					},'json');
				}
			}).show();
		}
	}
})();

function cg() {
	$('a.fa-search').click()
}
function intro() {
	localStorage.removeItem('tour_end');
	localStorage.setItem('tour_current_step', 0);
	loadIntro();
}
loadIntro = function() {
	var a = new Tour({
		orphan : true,
		steps : [ {
			element : 'td',
			title : "欢迎使用本指引",
			content : "本指引讲为您介绍当前界面<br>支持键盘←→控制"
		}, {
			element : "#jobStdGrid_stdNum",
			title : "表头",
			content : "点击此处可进行排序，升序或降序"
		}, {
			element : "#search",
			title : "筛选条件",
			content : "支持多种筛选条件，您可以根据需要筛选出相应数据"
		}, {
			element : "#jobStdGrid___manage",
			title : "文件评阅",
			placement : 'left',
			content : "点此进行评阅"
		}, {
			element : "td",
			title : "恭喜您",
			content : "<span style=\"color:green\">完成了所有指引</span>"
		} ]
	});
	a.init();
	a.start();
}
updateData = function(id) {
	var a = $("#jobStdGrid"), url = __ctx
			+ '/gradp/course/jobStd/getChange.htm';
	$.ajax({
		url : url,
		data : {
			id : id
		},
		dataType : 'json',
		method : 'POST',
		success : function(data) {
			a.jqGrid("setCell", id, "reviewTime", data.reviewTime);
			a.jqGrid("setCell", id, "score", data.score);
		}
	});

}