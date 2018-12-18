$(function() {
	crsJob = new CrsJob;
	crsJob.init();
	formUrl = crsJob.formUrl
});
(function() {
	CrsJob = function() {};
	CrsJob.prototype = {
		consts: {
			GRID: "#crsJobGrid",
			PAGER: "#crsJobPager",
			FORM: "#crsJobForm"
		},
		init: function() {
			if (this.hasInit) return !1;
			this.hasInit = !0;
			if ($(this.consts.GRID).length > 0) {
				this._initGridList();
				if(localStorage.getItem('crsJob_first')!=2){
					localStorage.setItem('crsJob_first',2);
					$('a.fa-help').click();
				}
			}
			if ($(this.consts.FORM).length > 0) {
				this._initForm();
				this._initData()
			}
		},
		_initGridList: function() {
			var a = $("#obj").val(),
				b = $("#num").val(),
				c = $("#t").val(),
				b = "?t=" + c + "&obj=" + a + "&num=" + b,
				c = 4 == c,
				d = !1,
				me = this;
			"student" == a && (c = !0);
			"teacher" == a && (d = !0);
			a = "student" == a;
			var xh = $("#xh").val();
			$(this.consts.GRID).GridList({
				url: __ctx + "/gradp/course/crsJob/listJsonPG.htm",
				pager: this.consts.PAGER,
				colNames: '主键;<div style="text-align:center">作业标题</div>;<div style="text-align:center">分值</div>;<div style="text-align:center">开始时间</div>;<div style="text-align:center">截止时间</div>;<div style="text-align:center">进行状态</div>;<div style="text-align:center">已提交</div>;<div style="text-align:center">未提交</div>;<div style="text-align:center">已审阅</div>;<div style="text-align:center">操作</div>'.split(";"),
				colModel: [{
					name: "id",
					index: "id_",
					hidden: true,
					key: true
				}, {
					name: "title",
					index: "title",
					align: "center"
				},  {
					name: "scorePower",
					index: "score_power",
					align: "center"
				}, {
					name: "startTime",
					index: "start_stop_time",
					align: "center"
				}, {
					name: "stopTime",
					align: "center"
				}, {
					name: "showStatus",
					index: "status",
					align: "center"
				},{
					name: "submitNum",
					index:"submitNum",
					align: "center"
				},{
					name: "unSubmitNum",
					index:"unSubmitNum",
					align: "center"
				},{
					name: "tchAllFnsh",
					index:"tchAllFnsh",
					align: "center"
				},{
					name: "showtj",
					sortable : false,
					classes : 'rowOps',
					width : 300,
					//hidden : !shenyue,
					align: "center",
					formatter : 'manage',
					formatoptions : [
						{
							label : ' 审阅',
							classes : 'btn btn-primary fa fa-detail',
							//hidden:!shenyue,                                                                                                     
							action : __ctx+'/gradp/course/jobStd/listStdsPG.htm?jobID={id}'+'&xh='+xh
						}]
				}
				
				/*, {
					name: "__manage",
					width: 300,
					sortable: !1,
					classes: "rowOps",
					hidden: a,
					formatter: "manage",
					align: "center",
					formatoptions: [{
						label: "评阅",
						classes: "btn btn-primary fa fa-detail",
						action: 'javascript:crsJob.review("{id}","{category}",1,"{clazz}","{title}")'
					}, {
						label: "未提交名单",
						classes: "btn btn-primary fa fa-detail",
						action: 'javascript:crsJob.review("{id}","{category}",0,"{clazz}","{title}")'
					}, {
						label: "导出未提交名单",
						classes: "btn btn-primary fa fa-export",
						// action:
						// 'javascript:crsJob.exbort("{id}","{clazz}","{title}")'
						action : __ctx+'/gradp/course/crsJob/exbort.htm?jobId={id}&clazz={clazz}&title={title}'
					}]
				}*/
				
				],
				loadComplete: function() {
					try {
						$(".rowOps").each(function() {
							$(this).rowOps({showNum : 3});
						})
					} catch (e) {}
				}
			});
			$('a.fa-help').on('click',function(){
				localStorage.removeItem("tour_end");
				localStorage.setItem("tour_current_step", 0);
//				a.loadIntro();
			});
			
			
			$('a.fa-export').click(function(){
				var ids= $("#crsJobGrid").jqGrid('getGridParam', 'selarrrow');
				if(ids.length == 0){
					DialogUtil.toastr("请选择要下载的作业!");
					return ;
				}
				var url =  __ctx + '/gradp/course/crsTch/export.htm?id='+ids.join(",")+'&type=someFiles&'+'crsName='+crsName+'&crsTchId='+crsTchId;
				$('a.fa-export').attr('href',url);		
				DialogUtil.alert('正在准备数据，文件大小会影响时间<br>请耐心等候...');
			});	
			$('#editMark').on('click',function(){
				
				var ids=$("#crsJobGrid").jqGrid("getGridParam", "selarrrow"),
					content = __ctx + '/gradp/course/crsJob/editView.htm';
				if(ids.length == 0){
					DialogUtil.toastr("请选择数据项!");
					return ;
				}
				DialogUtil.dialog({
					title : '批量修改分值',
					content,
					area : ['40%','40%'],
					params : {
						ids,
					},
					btn:[
						{
							label : '确定',
							iconCls : "btn btn-success fa fa-ok",
							action : function( a , b ){
								DialogUtil.getChildFrameWindow(b).saveScore();
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
		_initForm: function() {
			var a = this,
				b = $(this.consts.FORM),
				c = b.form();
			a.formUrl = new com.lc.form.FormData(b);
			$(document).on("click", "a.fa-save", function() {
				c.valid();
				if(showChangeAfter)
					DialogUtil.confirm('是否将之后所有作业进行相应调整？',function(e){
							b.attr('action','save.htm?after='+e);
							new com.lc.form.FormData(b).submit(a._showResponse);
					});
				else{
					b.attr('action','save.htm?after=false');
					new com.lc.form.FormData(b).submit(a._showResponse);
				}
			});
			$(document).on("click", "a.my-showSubmitted", function() {
				a.showDetail(1);
			});
			$(document).on("click", "a.my-showUnSubmitted", function() {
				a.showDetail(0);
			});
			$(document).on("click", "a.showRepeat", function() {
				a.showRepeat();
			});
		},
		_initData: function() {
			$.isEmpty(frameElement) || $.isEmpty(frameElement.dialog) || $.isEmpty(frameElement.dialog.params) || $.isEmpty(frameElement.dialog.params.data) || this.formUrl.setData("[name^='m:']", frameElement.dialog.params.data);
			var a = $(".clockpicker");
			try {
				a.clockpicker();
			} catch (b) {}
		},
		_showResponse: function(a) {
			a = new com.lc.form.ResultMessage(a);
			if(a.isSuccess()){
				DialogUtil.msg(a.getMessage());
				window.location.href = preUrl;
			}else{
				DialogUtil.error(a.getMessage());
			}
		},
		initIntro: function() {
			this.loadIntro();
		},
		loadIntro: function() {
			var tour = new Tour({
				orphan: !0,
				steps: [{
					element: "td",
					title: "欢迎使用本指引",
					content: "本指引讲为您介绍当前界面<br>支持键盘←→控制"
				},{
					element: "",
					title: "审阅",
					content: "点击审阅进行本次作业批判"
				}, {
					element: "#newJob",
					title: "创建新作业",
					content: "在此处您可以按照意愿创建新的作业"
				}, {
					element: "#plNewJob",
					title: "批量创建作业",
					content: "在此处您可以将设置好的【作业设置】绑定此课程，批量自动生成作业"
				},{
					element: "#plNewJob",
					title: "批量创建作业",
					content: "您可以在【教务管理->右侧菜单->帮助】页面查看如何使用作业设置功能"
				}, {
					element: "#edit",
					title: "编辑作业",
					content: "在这里您可以灵活的修改作业属性"
				},{
					element: "#file",
					title: "导出作业文件",
					content: "您可以选择导出哪门课的所有作业"
				}, {
					element: "td",
					title: "恭喜您",
					content: '<span style="color:green">完成了所有指引</span>'
				}]
			});
			tour.init();
			tour.start();
		},
		review: function(a, b, c , d,t) {
			var me = this;
			DialogUtil.dialog({
				title: "请选择一项进行批阅",
				content: __ctx + "/gradp/course/jobStd/list.htm?f=" + c + "&t=" + b + "&id=" + a+ "&clazz=" + d+ "-" + t,
				area: ["100%", "100%"],
				btn:[{
					label : '关闭',
					iconCls: "btn btn-success fa fa-cancel",
					action: function(i, j) {
						DialogUtil.close(j);
						me.updateData(a);
					}
				}]
			})
		},
		updateData : function(id){
			var a = $("#crsJobGrid"),
			url=__ctx+'/gradp/course/crsJob/getChange.htm';
			$.ajax({
				url : url,
				data : {
					id : id
				},
				method:'POST',
				success : function(data){
					a.jqGrid("setCell", id,"reviewPercent",data);
				}
			});
		},
		beforeSelectRow:function() {  
			$("#crsJobGrid").jqGrid('resetSelection');  
		    return(true);  
		},
		exbort : function(a,b,c){
			
		}
	}
})();

function cg() {
	$("a.fa-search").click();
}
function upload(a) {
	var b = $("#crsJobGrid"),
		c = b.jqGrid("getGridParam", "selarrrow");
	if (null == c || 1 > c.length) return DialogUtil.toastr("请选择记录!"), !1;
	if (1 < c.length) return DialogUtil.toastr("已经选择了多项,请选择一项进行操作!"), !1;
	var d = b.getCell(c, "status");
	0 == d ? DialogUtil.warn("未开始！") : DialogUtil.dialog({
		title: "提交作业",
		content: __ctx + "/gradp/course/jobStd/submit.htm?jobId=" + c,
		area: ["80%", "80%"],
		btn: [{
			label: "提交",
			iconCls: "btn btn-success fa fa-ok",
			action: function(b, c) {
				DialogUtil.getChildFrameWindow(c).upload(d, a , cg);
			}
		}, {
			label: "取消",
			iconCls: "btn btn-success fa fa-cancel",
			action: function(a, b) {
				DialogUtil.close(b);
			}
		}]
	})
}
function getComment() {
	var a = $("#crsJobGrid"),
		b = a.jqGrid("getGridParam", "selarrrow");
	if (null == b || 1 > b.length) return DialogUtil.toastr("请选择记录!"), !1;
	if (1 < b.length) return DialogUtil.toastr("已经选择了多项,请选择一项进行操作!"), !1;
	a = a.getCell(b, "comment");
	"" == a && (a = "暂无评语");
	DialogUtil.alert(a);
}
function exportInfo(num){
	var url=__ctx+'/gradp/course/crsJob/export.htm';
}

function updateEditData(ids) {
	var url = __ctx + '/gradp/course/crsJob/getEdits.htm';
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
				$("#crsJobGrid").jqGrid("setCell", json[index].id, "scorePower", json[index].scorePower);
			});
			
		}
	});

}


