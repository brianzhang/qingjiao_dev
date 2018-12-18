$(function() {
	bpmStatPending = new BpmStatPending();
	bpmStatPending.init();
});

(function() {
	// 定义常量
	var _consts = {
		GRIDBOX : "#gbox_pendingStatGrid",
		GRID : "#pendingStatGrid",
		PAGER : "#pendingProcessPager",// 列表分页
		SHOWTYPE : "#showType",
		TARGET : "#pendingStatPic",
		TARGETPAGER: "#pendingStatPicPager"
	};
	

	BpmStatPending = function() {
		// 定义属性
	};

	BpmStatPending.prototype = {
		initData : false,
		consts : _consts,
		rows: 20,
		page: 1,
		sord: 'asc',
		total: 1,
		type : 'grid',
		gridData:[],
		nameList:[],
		normalList:[],
		shiftList:[],
		assigneeList:[],
		suspendList:[],
		inList:[],
		
		//折线、柱形、饼图配置
		_lineOption:function(t){
			return {
		            title: {},
		            tooltip: {trigger: 'axis',position: function (pt) {return [pt[0], '10%'];}},
		            legend: {data:["正常数量","代理数量","转办数量","挂起数量"]},
		            xAxis: {type: 'category',data: t.nameList},
		            yAxis: {type: 'value'},
		            series: [
						{name:"正常数量",type:'line',data: t.normalList},
						{name:"转办数量",type:'line',data: t.shiftList},
						{name:"代理数量",type:'line',data: t.assigneeList},
						{name:"挂起数量",type:'line',data: t.suspendList}
		            ]
		        }
		},
		_barOption:function(t){
			return {
	            title: {},
	            tooltip: {trigger: 'axis',position: function (pt) {return [pt[0], '10%'];}},
	            legend: {data:["正常数量","代理数量","转办数量","挂起数量"]},
	            xAxis: {type: 'category',data: t.nameList},
	            yAxis: {type: 'value'},
	            series: [
					{name: '正常数量',type: 'bar',stack: '总量',data: t.normalList},
					{name: '代理数量',type: 'bar',stack: '总量',data: t.assigneeList},
					{name: '转办数量',type: 'bar',stack: '总量',data: t.shiftList},
					{name: '挂起数量',type: 'bar',stack: '总量',data: t.suspendList}
	            ]
	        }
		},
        _pieOption:function(t){
        	return {
    			title: {},
                tooltip: {trigger: 'item',formatter: "{a} <br/>{b}: {c} ({d}%)"},
                legend: {type:'scroll',pageButtonGap:1,orient: 'vertical',x: 'left',data:['正常数量','转办数量','代理数量','挂起数量']},
    			series: [{
    					name: '事项数量',type: 'pie',selectedMode: 'single',radius: [0, '55%'],
    		            avoidLabelOverlap: false,label: {normal:{show:false}},labelLine: {normal: { show: false } },data: t.inList}]
    		}
        },
		
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this._initPendingGridList();
			this._initEvent();
//			this._refreshData();
		},
		/**
		 * 待办事宜
		 */
		_initPendingGridList:function(){
			$(this.consts.GRID).GridList({
				url : __ctx+'/platform/bpmn/bpmStatistics/pendingStatistics.htm',
				multiselect:false,
				pager:this.consts.PAGER,
				rowNum: 20,
				colNames: ['用户姓名', '正常数量','转办数量','代理数量','挂起数量'],
		        colModel: [{name:'name',formatter:function(cellvalue, options, rowObject){
					        	if(cellvalue==null||cellvalue==undefined||cellvalue=='ALL'){
					        		return "未知";
					        	}else{
					        		return cellvalue;
					        	}
					        },sortable:false
		        			},  
		                   {name:'normal',sortable:false},
		                   {name:'shift',sortable:false},
		                   {name:'assignee',sortable:false},
		                   {name:'suspend',sortable:false}
			               ]
			});
		},
		_refreshData:function(callback){
			var that = this;
			$.ajax({
				type: "post",
				url: __ctx+'/platform/bpmn/bpmStatistics/pendingStatistics.htm',
				data:$(".pending-search-form").serialize()+'&rows='+that.rows+'&page='+that.page+'&sord='+that.sord,
				dataType: 'json',
				success: function(data){
					var msg = data.rows==null?[]:data.rows;
					that.page = data.page;
					that.total = data.total;
					that.gridData = msg;
					that.nameList = [];
					that.normalList = [];
					that.shiftList = [];
					that.assigneeList = [];
					that.suspendList = [];
					that.inList = [];
					for ( var i = 0; i < msg.length; i++){
						that.nameList.push(msg[i].name);
						that.normalList.push(msg[i].normal);
						that.shiftList.push(msg[i].shift);
						that.assigneeList.push(msg[i].assignee);
						that.suspendList.push(msg[i].suspend);
					}
					that.inList = [{name:'正常数量',value:that._sumList(that.normalList)},
					               {name:'转办数量',value:that._sumList(that.shiftList)},
					               {name:'代理数量',value:that._sumList(that.assigneeList)},
					               {name:'挂起数量',value:that._sumList(that.suspendList)}];
					
			   },
			   complete: function(){
				   callback();
			   }
			});
		},
		_initEcharts:function(opt){
			var target = document.getElementById("pendingStatPic");
			var width = $(".jqGrid_wrapper").width();
			target.style.width=width;
			target.style.height= "380px";
			
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