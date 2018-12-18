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
    	<div class="profile-user-info profile-user-info-striped">
        <div class="profile-info-row">
	        <div class="profile-info-name">登录帐号</div>
	        <div class="profile-info-value">${data.account}</div>
 		</div>
      <div class="profile-info-row">
        	<div class="profile-info-name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</div>
	        <div class="profile-info-value">
	          ${data.fullname}
	        </div>
      </div>
      <div class="profile-info-row">
        <div class="profile-info-name">所属组织</div>
        <div class="profile-info-value">
      		<#if (data.org)??>${data.org.orgName}</#if>
        </div>  
      </div>
      <div class="profile-info-row">
        <div class="profile-info-name">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</div>
        <div class="profile-info-value">
      			<#if (data.pos)??>${data.pos.posName}</#if>
      		</div>
      </div>
      <div class="profile-info-row">
	        <div class="profile-info-name">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</div>
	        <div class="profile-info-value">
	         		 ${data.mobile}
	        </div>
      </div>
      </div>
 	</div>
</div>


