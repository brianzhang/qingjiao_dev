  <div class="portlet light bordered">
        <div class="portlet-title">
            <div class="caption">
                <i class="fa fa-file-o font-red-flamingo"></i>
                <span class="caption-subject bold font-red-flamingo uppercase"> ${model.title} </span>
        </div>
        <div class="tools">
            <a href="javascript:void(0);" class="reload"  data-action="reload"> </a>
           <a href="javascript:void(0);"   class="more" data-action="more" data-url="${model.url}" data-title="${model.title}"> </a>
            <a href="javascript:void(0);" class="fullscreen"  data-action="fullscreen" > </a>
            <a href="javascript:void(0)" class="collapse" data-action="collapse" ></a>
        </div>
    </div>
    <div class="portlet-body">
    	<div class="portlet-scroller" data-height="${model.height}px">
    <#if data?exists> 
		 <div class="general-item-list">
       		<#list data as data>
                <div class="item">
                    <div class="item-head">
                        <div class="item-details">
                            <a href="javascript:void(0)"  data-event="action" data-url="${ctx}/platform/bpmn/instance/bpmInst/toStart.htm?defId=${data.defId}" class="item-name primary-link">${data.name}</a>
                            <span class="item-label"></span>
                        </div>
                        <span class="item-status">
                            版本：${data.version}</span>
                    </div>
                    <div class="item-body">${data.creator}</div>
                </div>
               </#list>
              </div>
      <#else>
		<div class="alert alert-info">当前没有记录。</div>
	</#if>
        </div>
  </div>
</div>
