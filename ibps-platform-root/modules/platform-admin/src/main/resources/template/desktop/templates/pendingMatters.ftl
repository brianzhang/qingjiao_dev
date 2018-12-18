      <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-comments font-blue"></i>
                    <span class="caption-subject bold font-blue uppercase"> ${model.title} </span>
                </div>
                <div class="tools">
                    <a href="javascript:void(0);" class="reload"  data-action="reload"></a>
                   <a href="javascript:void(0);"   class="more" data-action="more" data-url="${model.url}" data-title="${model.title}"></a>
                    <a href="javascript:void(0);" class="fullscreen"  data-action="fullscreen" ></a>
                    <a href="javascript:void(0)" class="collapse" data-action="collapse" ></a>
                </div>
            </div>
            <div class="portlet-body">
            	<div class="portlet-scroller" data-height="${model.height}px">
            <#if data?exists> 
                   <div class="mt-comments">
                   		<#list data as data>
                            <div class="mt-comment">
                                <div class="mt-comment-img">
                                    <img src="${ctx}/${data.creatorPhoto}" /> </div>
                                <div class="mt-comment-body">
                                    <div class="mt-comment-info">
                                        <span class="mt-comment-author">${data.creator}</span>
                                        <span class="mt-comment-date">${data.createTime?string("yyyy-MM-dd HH:mm:ss")}</span>
                                    </div>
                                    <div class="mt-comment-text">
                                      	<#if data.remindTimes = 1>
                                  	  	<span class="badge badge-success">催办${data.remindTimes}次</span>
                                        <#elseif data.remindTimes = 2>
                                  	  	<span class="badge badge-warning">催办${data.remindTimes}次</span>
                                         <#elseif data.remindTimes &gt; 3>
                                  	  	<span class="badge badge-danger">催办${data.remindTimes}次</span>
                                      	</#if>
                                    	<span class="">${data.subject}</span>
                                    </div>
                                    <div class="mt-comment-details">
                                        <span class="mt-comment-status mt-comment-status-pending"> 待办</span>
                                        <ul class="mt-comment-actions">
                                             <li  >
                                               	 <a href="javascript:void(0);"  class="btn btn-sm btn-outline green" data-event="action" data-url="${ctx}/platform/bpmn/bpmTask/toStart.htm?id=${data.id}" ><i class="fa fa-check"></i>办理</a>
                                           	 </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            	</#list>
                          </div>
              <#else>
				<div class="alert alert-info">当前没有记录。</div>
			</#if>
                </div>
                </div>
       </div>