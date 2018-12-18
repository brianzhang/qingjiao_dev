
$(function() {
	crsTchListMyStudents = new CrsTchListMyStudents();
	crsTchListMyStudents.init();
	formUrl = crsTchListMyStudents.formUrl
});
(function() {
	var d = {
		GRID : "#crsTchListMyStudentsGrid",
		PAGER : "#crsTchListMyStudentsPager",
		FORM : '#crsTchListMyStudentsForm'
	};
	CrsTchListMyStudents = function() {
	};
	CrsTchListMyStudents.prototype = {
		consts : d,
		init : function() {
			if (this.hasInit)
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0) {
				this._initGridList();
				if(localStorage.getItem('crsTchlistMyStudents_first')!=1){
					localStorage.setItem('crsTchlistMyStudents_first',1);
					$('a.fa-help').click();
				}
			}
			if ($(this.consts.FORM).length > 0) {
				this._initForm();
				this._initData()
			}
		},
		//jobStd/markScore.hjobId=422841117562634240&title=%E5%BC%80%E9%A2%98%E7%AD%94%E8%BE%A9ppt&stdNum=2014201408&crsTchId=06199800312014bysj						
		_initGridList : function() {
			var a = this,grid = $(this.consts.GRID);
					grid.GridList(
							{
								url : __ctx
										+ '/gradp/course/crsTch/listMyStudentsJson2.htm'								,
								rowNum:100,
								pager : this.consts.PAGER,
								colNames : [
										'主键',
										'<div style="text-align:center;">学 号</div>',
										'<div style="text-align:center;">姓 名</div>',
										'<div style="text-align:center;">班 级</div>',
										'<div style="text-align:center;">专 业</div>',
										'<div style="text-align:center;">毕设题目</div>',
										'<div style="text-align:center">操 作</div>' ],
								colModel : [
										{
											name : 'id',
											index : 'id_',
											hidden : true,
											key : true
										},
										{
											name : 'xh',
											index : 'xh',
											align : 'center'
										},
										{
											name : 'name',
											index : 'name',
											align : 'center'
										}, {
											name : 'classr',
											index : 'classr',
											//hidden : true,
											align : 'center'
										}, {
											name : 'tmdyzy',
											index : 'tmdyzy',
											//hidden : true,
											align : 'center'
										}, {
											name : 'tmmc',
											index : 'tmmc',
											align : 'center'
										},
										{
											name : '__manage',
											sortable : false,
											classes : 'rowOps',
											width : 30,
											formatter : 'manage',
											align : 'center',
											formatoptions : [
													{
														label : ' 周记分数统计',
														classes : 'btn btn-primary fa fa-edit',
														action :__ctx+'/platform/report/raqsoft/preview2.htm?reportId=442268142228471808&cname1=xh&cval1={xh}'
													},{
														label : ' 周记作业详情',
														classes : 'btn btn-primary fa fa-edit',                                //
														//action : __ctx+'/gradp/course/crsJob/listPG.htm?xh={xh}&crsTchid='+'2014liuxibysj'
														action : 'javascript:crsTchListMyStudents.open("'+__ctx+'/gradp/course/jobStd/markScore.htm?stdNum={xh}&role='+'123'+'&crsTchId='+'2014liuxibysj'+'&stdName={name}&crsName='+crsName.replaceAll('<s.*n>','')+'")'
															}]
										}],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps()
										})
									} catch (e) {
									}
									var rows = grid.jqGrid('getRowData');
							        var rowNum = grid.jqGrid('getGridParam', 'rowNum'); 
							        var stdNums = [];
							        $.each(rows,function(i,v){
							        	stdNums[i] = v.stdNum;
							        });
									$.post('getNew.htm' , {crsTchId : crsTchId , stdNums : JSON.stringify(stdNums)} , function(data){
										var ids = data.id , names = data.name ;
										$.each( ids , function( i , stdNum ){
											var index = stdNums.indexOf(stdNum);
											if(index != -1)
												grid.jqGrid("setCell", rows[index].id ,"stdName" , names[ i ] + " <span style='color:red'>●</span>");
										})
									},'json');
								}
							});
			$('a.fa-help').on('click',function(){
				//清理缓存
				localStorage.removeItem("tour_end");
				localStorage.setItem("tour_current_step", 0);
				a.loadIntro();
			});
			$('a.statistics').on('click',function(){
				var url = __ctx + '/gradp/course/crsTch/statistics.htm?crsTchId='+crsTchId+'&crsName='+crsName;
				DialogUtil.dialog({
					title : '数据统计'
					, content : url
					, area : ['90%','90%']
					, btn : [ {
						label : '关闭',
						iconCls : 'btn btn-success fa fa-cancel',
						action : function(a, b) {
							DialogUtil.close(b);
						}
					} ]
				});
			})
			var url = __ctx + '/gradp/course/crsTch/export.htm?type=myStudents&crsName='+crsName+'&crsTchId='+crsTchId;
			$('a.export-students').attr('href',url);
			url =  __ctx + '/gradp/course/crsTch/export.htm?type=files&crsTchId='+crsTchId+'&crsName='+crsName;
			$('a.export-file').attr('href',url);
			$('a.export-file').on('click',function(){
				DialogUtil.alert('正在准备数据，文件大小会影响时间<br>请耐心等候...');
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
		listJob : function(r) {
			DialogUtil.dialog({
				title : '作业列表',
				content : r,
				area : [ '70%', '85%' ],
				params : {
					"role" : "teacher"
				},
				btn : [ {
					label : '关闭',
					iconCls : 'btn btn-success fa fa-cancel',
					action : function(a, b) {
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
					content : "本指引为您介绍当前界面的主要操作功能"
				}, {
					element : "#crsTchListMyStudentsGrid_stdName",
					title : "学生",
					content : "点击学生，即可对该学生进行管理操作"
				}, {
					element : "#editJob",
					title : "周记分数统计",
					content : "您可以在这里查看学生周记分数统计情况"
				}, {
					element : "#dataImport",
					title : "周记作业详情",
					content : "您可以在这里查看学生周记作业内容详情"
				}, {
					element : "td",
					title : "恭喜您",
					content : '<span style="color:green">已完成所有指引</span>'
				} ]
			});
			tour.init();
			tour.start();
		},onlineForm : function( id ){
			var reqUrl = __ctx + "/bishe/kaitiGroup/kaitiGroup/ktdata.htm";
			//alert("123");
			$.post(reqUrl,{'id':id},function(result){
				//alert("456");
				var obj = JSON.parse(result);
				var fileId = obj.fileId;
				if(!fileId){
					DialogUtil.alert("学生没有提交开题准备情况记录")
				}
				else{
					/*var json = JSON.parse(result); */
					//alert("789");
					OnlineForm.data =obj;
					OnlineForm.open("开题情况记录" , function( json ){
						var url = __ctx + "/bishe/kaitiGroup/kaitiGroup/ktgrad.htm";
		                $.post(url,{'id':id,'json':JSON.stringify(json)},function(){
		                	DialogUtil.alert("保存成功"); 	
		                });
					} , true);
				}
				
		    });

		},onlineForm1 : function( xh ){
			var reqUrl = __ctx + "/bishe/kaitiGroup/kaitiGroup/zqdata.htm";
			//alert("123");
			$.post(reqUrl,{'xh':xh},function(result){
				//alert("456");
				var obj = JSON.parse(result);
				
					/*var json = JSON.parse(result); */
					//alert("789");
					OnlineForm.data =obj;
					OnlineForm.open("中期情况记录" , function( json ){
						var url = __ctx + "/bishe/kaitiGroup/kaitiGroup/zqgrad.htm";
		                $.post(url,{'xh':xh,'json':JSON.stringify(json)},function(){
		                	DialogUtil.alert("保存成功"); 	
		                });
					} , true);
				
				
		    });

		}	
//		},
//		 pageOffice:function(fileId){
//			POBrowser.openWindowModeless('/platform/office/pageOffice/dialog.htm?fileId='+fileId ,'fullscreen=yes','123');
//		}
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
var dataImport = function(li) {
	var url = __ctx + '/gradp/course/crsTch/dataImport.htm?crsTchId='
			+ crsTchId;

	DialogUtil.dialog({
		content : url,
		title : '导入学生名单',
		area : [ '50%', '50%' ],
		btn : [ {
			label : '关闭',
			iconCls : 'btn btn-success fa fa-cancel',
			action : function(a, b) {
				DialogUtil.close(b)
				cg()
			}
		} ]
	})
}
function cg() {
	$('a.fa-search').click()
}
function updateData(id, num) {
	var a = $("#crsTchListMyStudentsGrid"), url = __ctx
			+ '/gradp/course/CrsTchListMyStudents/getChange.htm';
	$.ajax({
		url : url,
		data : {
			name : num
		},
		dataType : 'json',
		method : 'POST',
		success : function(data) {
			a.jqGrid("setCell", id, "score", data.score);
		}
	});
	
	
}

var getCrsScoreErrorURL=__ctx+ '/gradp/course/crsStd/getCrsScoreError.htm?crsTchId='+crsTchId;
function checkErr(){
	$('#checkScore').attr('href',getCrsScoreErrorURL);
	DialogUtil.alert('请稍后查看D盘根目录下的文件');
}

