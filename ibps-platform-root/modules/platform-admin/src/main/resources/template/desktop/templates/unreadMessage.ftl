      <div class="portlet light bordered">
        <div class="portlet-title tabbable-line">
            <div class="caption">
                <i class="fa fa-commenting  font-dark"></i>
                <span class="caption-subject font-dark bold uppercase">${model.title}</span>
            </div>
            <div class="tools">
	            <a href="javascript:void(0);" class="reload"  data-action="reload"> </a>
	           <a href="javascript:void(0);"   class="more" data-action="more" data-url="${model.url}" data-title="${model.title}"> </a>
	            <a href="javascript:void(0);" class="fullscreen"  data-action="fullscreen" > </a>
	            <a href="javascript:void(0)" class="collapse" data-action="collapse" ></a>
	        </div>
            <ul class="nav nav-tabs">
            	<#list data?keys as key> 
	                <li <#if key =="normal"> class="active"</#if>>
	                    <a href="#${key}" <#if key =="normal"> class="active"</#if> data-toggle="tab"><#if key =="normal">内部<#elseif  key =="system">系统</#if>  </a>
	                </li>
                 </#list>
            </ul>
        </div>
        <div class="portlet-body">
            <div class="tab-content">
               	  <#list data?keys as key> 
                <div class="tab-pane <#if key =="normal">active</#if>" id="${key}">
                  <div class="portlet-scroller" data-height="${model.height}px" >
      						<#if data[key]?exists && data[key]?size gt 0> 
                                <ul class="feeds">
                                	<#list data[key] as d>
                                    <li>
                                        <div class="col1">
                                            <div class="cont">
                                                <div class="cont-col1">
                                                    <div class="label label-sm label-success">
                                                        <i class="fa <#if key =="normal">fa-bell-o<#elseif  key =="system">fa-bolt</#if> "></i>
                                                    </div>
                                                </div>
                                                <div class="cont-col2">
                                                    <div class="desc"> 	${d.subject}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col2">
                                            <div class="date">${d.durationTime}</div>
                                        </div>
                                    </li>
                                    </#list>
                                   </ul>
                             <#else>
								<div class="alert alert-info">当前没有记录。</div>
							</#if>
                                  </div>
                           </div>
                   </#list>
           </div>
     </div>
</div>
