<div class="dashboard-container" > 
	<#list data as d>
		 <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"> 
		  <a class="dashboard dashboard-stat ${d.color}" data-url="${d.url}"  href="javascript:void(0);" > 
		   <div class="visual"> 
		    <i class="fa ${d.icon}"></i> 
		   </div> 
		   <div class="details"> 
		    <div class="number"> 
		     <span data-counter="counterup" data-value="${d.dataText}">0</span> 
		    </div> 
		    <div class="desc">
		  ${d.dataContent}
		    </div> 
		   </div> 
		  </a> 
		 </div> 
 	</#list>
</div>