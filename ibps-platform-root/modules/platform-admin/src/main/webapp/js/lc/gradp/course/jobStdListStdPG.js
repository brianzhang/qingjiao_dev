$(function() {
	jobStdListStd = new jobStdListStd();
	jobStdListStd.init();
	formUrl = jobStdListStd.formUrl
});
(function() {
	var d = {
		GRID : "#jobStdListStdGrid",
		PAGER : "#jobStdListStdPager",
		FORM : '#jobStdListStdForm'
	};
	jobStdListStd = function() {
	};
	jobStdListStd.prototype = {
		consts : d,
		init : function() {
			if (this.hasInit)
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0) {
				this._initGridList();
				if(localStorage.getItem('jobStdListStd_first')!=1){
					localStorage.setItem('jobStdListStd_first',1);
					$('a.fa-help').click();
				}
			}
			if ($(this.consts.FORM).length > 0) {
				this._initForm();
				this._initData()
			}
		},
		_initGridList : function() {
			var xh = $("#xh").val();
			var a = this,grid = $(this.consts.GRID);
					grid.GridList(
							{
								url : __ctx
										+ '/gradp/course/jobStd/listStdsJsonPG.htm?jobID='+jobID+'&xh='+xh,
								pager : this.consts.PAGER,
								colNames : [
										'主键',
										'<div style="text-align:center;">学 号</div>',
										'<div style="text-align:center;">姓 名</div>',
										'<div style="text-align:center;">所属教师</div>',
										'<div style="text-align:center;">所属团队</div>',
										'<div style="text-align:center;">成 绩</div>',
										'<div style="text-align:center">操 作</div>' ],
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
											align : 'center'
										},
										{
											name : 'stdName',
											index : 'stdName',
											align : 'center'
										},
										{
											name : 'finalTeacher',
											align : 'center'
										},
										{
											name : 'finalTeam',
											align : 'center'
										}, {
											name : 'score',
											index : 'score',
											align : 'center'
										},
										{
											name: "showtj",
											sortable : false,
											classes : 'rowOps',
											width : 200,
											hidden : false,
											align: "center",
											formatter : 'manage',
											formatoptions : [
												{
													label : ' 翻阅作业',
													classes : 'btn btn-primary fa fa-detail',
													hidden : uniManage=="false",
													action : 'javascript:jobStdListStd.listJob("{stdNum}","{stdName}","{id}")'
												}]
										}],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps({showNum : 2})
										})
									} catch (e) {
									}
									
								}
							});
			$('a.fa-help').on('click',function(){
				//清理缓存
				localStorage.removeItem("tour_end");
				localStorage.setItem("tour_current_step", 0);
				a.loadIntro();
			});
			$('#submitScore').on('click',function(){
				
				var ids=$("#jobStdListStdGrid").jqGrid("getGridParam", "selarrrow"),
					content = __ctx + '/gradp/course/jobStd/editView.htm';
				if(ids.length == 0){
					DialogUtil.toastr("请选择学生!");
					return ;
				}
				DialogUtil.dialog({
					title : '批量修改成绩',
					content,
					area : ['40%','40%'],
					params : {
						ids,
						crsTchId,
						power
					},
					btn:[
						{
							label : '确定',
							iconCls : "btn btn-success fa fa-ok",
							action : function( a , b ){
								debugger;
								DialogUtil.getChildFrameWindow(b).saveScore();
								/*location.reload();*/
								updateEditData(ids);
							}
						},
						{
							label : '取消',
							iconCls : 'btn btn-danger fa fa-cancel',
							action : function(a , b){
								DialogUtil.close( b );
							}
						}
					]
				})
			});
			

			
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
				DialogUtil.confirm(c.getMessage() + ',是否继续操作', function(a) {
					if (a)
						window.location.reload(true);
					else
						window.location.href = __ctx
								+ '/gradp/course/crsTchListMyStudents/list.htm'
				})
			} else {
				DialogUtil.error(c.getMessage())
			}
		},
		review : function(id, stdNum, stdName, f) {
			var url = __ctx + '/gradp/course/jobStd/markScore.htm?stdNum='
					+ stdNum + '&stdName=' + stdName + '&f=' + f, jt = [
					'实习笔记', '专题报告', '总结报告' ];
			DialogUtil.dialog({
				content : url,
				title : stdNum + '_' + stdName + '_' + jt[f],
				area : [ '100%', '100%' ],
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						updateData(id, stdNum);
						DialogUtil.close(b);
					}
				} ]
			});
		},
		listJob : function(stdNum,stdName,id) {
			var url =  __ctx+'/gradp/course/jobStd/markScore.htm?jobId='+jobID+'&title='+jobName+'&stdNum='+stdNum+'&crsTchId='+crsTchId;
			DialogUtil.dialog({
				
				title : '作业评判',
				content : url,
				area : [ '88%', '88%' ],
				index:"edit",
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
						updateMark(id);
						DialogUtil.close(b);
					}
				} ]
			})
		},
		loadIntro : function() {
			var tour = new Tour({
				orphan : !0,
				steps : [ {
					element : "td",
					title : "欢迎使用指引",
					content : "本指引讲为您介绍当前界面<br>支持键盘←→控制"
				}, {
					element : "",
					title : "批阅",
					content : "点击翻阅作业，可查看该学生本次作业进行批阅"
				}, {
					element : "#submitScore",
					title : "批量修改作业",
					content : "您可以在这里进行本作业所有学生的批量修改成绩操作，不必担心学生没有提交作业，我们会为您打0分"
				},{
					element : "#studentNumber",
					title : "学号",
					content : "根据学号查询学生"
				}, {
					element : "#studentScore",
					title : "成绩",
					content : "根据成绩查询学生"
				},{
					element : "#studentStatus",
					title : "状态",
					content : "根据提交状态查询学生"
				}, {
					element : "td",
					title : "恭喜您",
					content : '<span style="color:green">完成了所有指引</span>'
				} ]
			});
			tour.init();
			tour.start();
		}
		,open: function(url){
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
	debugger;
	$('a.fa-search').click()
}
function updateEditData(ids) {
	var a = $("#jobStdListStdGrid"), 
	url = __ctx + '/gradp/course/jobStd/getEdits.htm';
	$.ajax({
		type:'post',
		url : url,
		data : {
			ids:ids.join(","),
		},
		dataType : 'json',
		async:false,
		success : function(data) {
			var json=eval(data);
			$.each(json,function(index,item){
				$("#jobStdListStdGrid").jqGrid("setCell", json[index].id, "score", json[index].score);
			});
			
		}
	});

}

function updateMark(id) {
	var a = $("#jobStdListStdGrid"), 
	url = __ctx + '/gradp/course/jobStd/getEdits.htm';
	$.ajax({
		type:'post',
		url : url,
		data : {
			ids:id,
		},
		dataType : 'json',
		async:false,
		success : function(data) {
			var json=eval(data);
			$.each(json,function(index,item){
				$("#jobStdListStdGrid").jqGrid("setCell", json[index].id, "score", json[index].score);
			});
		}
	});

}

