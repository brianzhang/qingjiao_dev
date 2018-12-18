package com.lc.ibps.platform.rest.org;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.auth.service.ISubSysQueryService;
import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;

/** 
 * 子系统服务 控制器，第三方系统调用。
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：simon cai
 * 邮箱：48847557@qq.com
 * 日期：2017年7月20日-下午5:00:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@Path("/webapi/subSysService")
@Api(value = "/subSysService", description = "子系统服务")
public class SubSysController {

	
	private ISubSysQueryService subSysService;
	
	public SubSysController(){
		subSysService = AppUtil.getBean(ISubSysQueryService.class);
	}

    @GET
    @ApiOperation(value = "根据ID获取角色", notes = "根据ID获取角色")
    @Path("/getAllSubSys")
	public WebAPIResult getAllSubSys() {
		
		WebAPIResult result = new WebAPIResult();
		result.setData(subSysService.findAll());
		
		return result;
	}
	
}
