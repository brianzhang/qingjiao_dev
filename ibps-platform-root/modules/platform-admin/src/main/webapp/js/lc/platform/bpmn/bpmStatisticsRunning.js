$(function() {
	bpmStatRunning = new BpmStatRunning();
	bpmStatRunning.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRIDBOX : "#gbox_runningStatGrid",
		GRID : "#runningStatGrid",
		PAGER : "#runningPager",// 列表分页
		SHOWTYPE : "#runningShowType",
		TARGET : "#runningStatPic",
		TARGETPAGER: "#runningStatPicPager"
	};
	

	BpmStatRunning = function() {
		// 定义属性
	};

	BpmStatRunning.prototype = {
		initData : false,
		consts : _consts,
		rows: 20,
		page: 1,
		sord: 'asc',
		total: 1,
		type : 'grid',
		gridData:[],
		nameList:[],
		inList:[],
		lineList:[],
		
		//折线、柱形、饼图配置
		_lineOption:function(t){
			return {
	            title: {},
	            tooltip: {trigger: 'axis',position: function (pt) { return [pt[0], '10%'];}},
	            legend: {data: t.nameList},
	            xAxis: {name: '名称',type: 'category',data: t.nameList},
	            yAxis: {name: '数量',type: 'value'},
	            series: [{name:'数量 ',type:'line',data: t.lineList}]
	        }
		},
		_barOption:function(t){
			return {
	            title: {},
	            tooltip: {trigger: 'axis',position: function (pt) {return [pt[0], '10%'];}},
	            legend: {},
	            xAxis: {name: '名称',type: 'category',data: t.nameList},
	            yAxis: {name: '数量',type: 'value'},
	            series: [{name: '数量 ',type: 'bar',data: t.lineList}]
	        }
		},
        _pieOption:function(t){
        	return {
				title: {},
	            tooltip: {trigger: 'item',formatter: "{a} <br/>{b}: {c} ({d}%)"},
	            legend: {type:'scroll',pageButtonGap:1,orient: 'vertical',x: 'left',data:t.nameList},
				series: [{
						name: '数量',type: 'pie',selectedMode: 'single',radius: [0, '55%'],avoidLabelOverlap: false,
						label: {normal: {show: false}},data: t.inList
					}]
			}
        },
		
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this._initrunningGridList();
			this._initEvent();
//			this._refreshData();
		},
		/**
		 * 待办事宜
		 */
		_initrunningGridList:function(){
			$(this.consts.GRID).GridList({
				url : __ctx+'/platform/bpmn/bpmStatistics/runningStatistics.htm',
				multiselect:false,
				pager:this.consts.PAGER,
				rowNum: 20,
				colNames: ['流程名称', '数量'],
		        colModel: [{name:'procName',sortable:false},  
		                   {name:'amount',sortable:false}
			               ]
			});
		},
		_refreshData:function(callback){
			var that = this;
			$.ajax({
			   type: "post",
			   url: __ctx+'/platform/bpmn/bpmStatistics/runningStatistics.htm',
			   data:$(".running-search-form").serialize()+'&rows='+that.rows+'&page='+that.page+'&sord='+that.sord,
			   dataType: 'json',
			   success: function(data){
				   var msg = data.rows==null?[]:data.rows;
				   that.page = data.page;
				   that.total = data.total;
				   that.gridData = msg
				   that.nameList = [];
				   that.inList = [];
				   that.lineList = [];
					for ( var i = 0; i < msg.length; i++){
						that.nameList.push(msg[i].procName);
						that.lineList.push(msg[i].amount);
						that.inList.push({name:msg[i].procName,value:msg[i].amount});
					 }
			   },
			   complete: function(){
				   callback();
			   }
			});
		},
		_initEcharts:function(opt){
			var target = document.getElementById("runningStatPic");
			var width = $(".jqGrid_wrapper").width();
			target.style.width=width;
			target.style.height="380px";
			
			var myChart = echarts.init(target);
			myChart.clear();
		    // 使用刚指定的配置项和数据显示图表。
		    myChart.setOption(opt);
			
		},
		_initEvent:function(){
			var those = this;
			$(those.consts.TARGETPAGER).find(".stat-pre-page").on("click",function(){
				if(those.page-1<0) return;
				those.page = those.page-1;
				those._refreshData(function(){
					$(those.consts.TARGETPAGER).find(".page").html(those.page);
					$(those.consts.TARGETPAGER).find(".total").html(those.total);
					those._setEchartsOption(those);
				});
			});
			$(those.consts.TARGETPAGER).find(".stat-next-page").on("click",function(){
				if(those.page+1>those.total) return;
				those.page = those.page+1;
 				those._refreshData(function(){
					$(those.consts.TARGETPAGER).find(".page").html(those.page);
					$(those.consts.TARGETPAGER).find(".total").html(those.total);
					those._setEchartsOption(those);
				});
			});
			$(those.consts.SHOWTYPE).on("change",function(event){
				those.type = $(those.consts.SHOWTYPE).val();
				if('grid'==those.type){
					those.initData=false;
					$(those.consts.GRID).setGridParam({page:those.page}).trigger("reloadGrid");
					$(those.consts.GRIDBOX).show();
					$(those.consts.PAGER).show();
					$(those.consts.TARGET).hide();
					$(those.consts.TARGETPAGER).hide();
				}else{
					if(!those.initData){
						those.page = $(those.consts.GRID).getGridParam('page'); 
						those.rows = $('.ui-pg-selbox').val();
						$(those.consts.GRIDBOX).hide();
						$(those.consts.PAGER).hide();
						$(those.consts.TARGET).show();
						$(those.consts.TARGETPAGER).show();
						those._refreshData(function(){
							those._setEchartsOption(those);
							$(those.consts.TARGETPAGER).find(".page").html(those.page);
							$(those.consts.TARGETPAGER).find(".total").html(those.total);
							those.initData=true;
						});
						
					}else{
						those._setEchartsOption(those);
					}
				}
				
			});
			$(document).on("click", ".toolbar-panel a.btn.fa-search", function(){
				those.page = 1;
				if(those.type!="grid"){
					those._refreshData(function(){
						those._setEchartsOption(those);
						$(those.consts.TARGETPAGER).find(".page").html(those.page);
						$(those.consts.TARGETPAGER).find(".total").html(those.total);
					});
				}
			});
			$(".toolbar-panel").keydown(function(e) {
				those.page = 1;
				if(those.type!="grid"){
					those._refreshData(function(){
						those._setEchartsOption(those);
						$(those.consts.TARGETPAGER).find(".page").html(those.page);
						$(those.consts.TARGETPAGER).find(".total").html(those.total);
					});
				}
			});
		},
		_setEchartsOption:function(those){
			if('line'==those.type){
				those._initEcharts(those._lineOption(those));
			}else if('bar'==those.type){
				those._initEcharts(those._barOption(those));
			}else if('pie'==those.type){
				those._initEcharts(those._pieOption(those));
			}
		},
		_sumList : function(list){
			var temp = 0;
			for(var i=0;i<list.length;i++){
				temp+=list[i];
			}
			return temp;
		}
	}
})();