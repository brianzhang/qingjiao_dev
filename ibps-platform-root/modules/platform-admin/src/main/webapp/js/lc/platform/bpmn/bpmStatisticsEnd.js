$(function() {
	bpmStatEnd = new BpmStatEnd();
	bpmStatEnd.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRIDBOX : "#gbox_endStatGrid",
		GRID : "#endStatGrid",
		PAGER : "#endProcessPager",// 列表分页
		SHOWTYPE : "#showType",
		TARGET : "#endStatPic",
		TARGETPAGER: "#endStatPicPager"
	};
	

	BpmStatEnd = function() {
		// 定义属性
	};

	BpmStatEnd.prototype = {
		initData : false,
		consts : _consts,
		rows: 20,
		page: 1,
		sord: 'asc',
		total: 1,
		type : 'grid',
		gridData:[],
		nameList:[],
		normalEndList:[],
		manualEndList:[],
		inList:[],
		outList:[],
		lineList:[],
		
		//折线、柱形、饼图配置
		_lineOption:function(t){
			return {
	            title: {},
	            tooltip: {trigger: 'axis',position: function (pt) {return [pt[0], '10%'];}},
	            legend: { data:["正常结束","人工结束"]},
	            xAxis: {type: 'category',data: t.nameList},
	            yAxis: {type: 'value'},
	            series: [
					{name:"正常结束",type:'line',data: t.normalEndList},
					{name:"人工结束",type:'line',data: t.manualEndList}
	            ]
	        }
		},
		_barOption:function(t){
			return {
	            title: {},
	            tooltip: {trigger: 'axis',position: function (pt) {return [pt[0], '10%'];}},
	            legend: {data:["正常结束","人工结束"]},
	            xAxis: {type: 'category',data: t.nameList},
	            yAxis: {type: 'value'},
	            series: [
					{name:"正常结束",type:'bar',stack: '总量',data: t.normalEndList},
					{name:"人工结束",type:'bar',stack: '总量',data: t.manualEndList}
	            ]
	        }
		},
        _pieOption:function(t){
        	return {
				title: {},
	            tooltip: {trigger: 'item',formatter: "{a} <br/>{b}: {c} ({d}%)"},
	            legend: {type:'scroll',pageButtonGap:1,orient: 'vertical',x: 'left',data:t.nameList},
				series: [
//				         {
//				        	 name: '事项数量',type: 'pie',selectedMode: 'single',radius: [0, '35%'],
//				        	 label: {normal: {show: false}},labelLine: {normal: {show: false}},data: t.inList
//				         },
				         {
				        	 name: '事项数量',type: 'pie',selectedMode: 'single',radius: ['0%', '55%'],
				        	 avoidLabelOverlap: false,label: {normal: {show: false}},
				        	 labelLine: {normal: {show: false}},data: t.outList
				         }
				]
			}
        },
		
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this._initEndGridList();
			this._initEvent();
//			this._refreshData();
		},
		/**
		 * 待办事宜
		 */
		_initEndGridList:function(){
			$(this.consts.GRID).GridList({
				url : __ctx+'/platform/bpmn/bpmStatistics/endStatistics.htm',
				multiselect:false,
				pager:this.consts.PAGER,
				rowNum: 20,
				colNames: ['流程名称', '正常结束','人工结束'],
		        colModel: [{name:'procName',sortable:false},  
		                   {name:'normalend',sortable:false},
		                   {name:'manualend',sortable:false}
			               ]
			});
		},
		_refreshData:function(callback){
			var that = this;
			$.ajax({
				   type: "post",
				   url: __ctx+'/platform/bpmn/bpmStatistics/endStatistics.htm',
				   data:$(".end-search-form").serialize()+'&rows='+that.rows+'&page='+that.page+'&sord='+that.sord,
				   dataType: 'json',
				   success: function(data){
					   var msg = data.rows==null?[]:data.rows;
					   that.page = data.page;
					   that.total = data.total;
					   that.nameList = [];
					   that.normalEndList = [];
					   that.manualEndList = [];
					   that.inList = [];
					   that.outList = [];
					   that.lineList = [];
						for ( var i = 0; i < msg.length; i++){
							that.nameList.push(msg[i].procName);
							that.normalEndList.push({name:msg[i].procName,value:msg[i].normalend});
							that.manualEndList.push({name:msg[i].procName,value:msg[i].manualend});
//							that.lineList.push(msg[i].normalend);
//							that.lineList.push(msg[i].manualend);
							
							that.outList.push({name:msg[i].procName,value:msg[i].normalend});
							that.outList.push({name:msg[i].procName,value:msg[i].manualend});
							
						 }
						that.inList = [{name:'正常结束',value:that._sumList(that.normalEndList)},
						               {name:'人工结束',value:that._sumList(that.manualEndList)}];

				   },
				   complete: function(){
					   callback();
				   }
				});
		},
		_initEcharts:function(opt){
			var target = document.getElementById("endStatPic");
			var width = $(".jqGrid_wrapper").width();
			target.style.width=width;
			target.style.height="400px";
			
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
			for(var i=0,temp = 0;i<list.length;i++){
				temp+=list[i].value;
			}
			return temp;
		}
	}
})();