package com.lc.ibps.platform.rest.org;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.org.service.IPartyGroupService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 
 * 用户组服务 控制器，第三方系统调用。
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年9月22日-下午2:47:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/groupService")
@Api(value = "/groupService",description="用户组服务")
@Controller
public class GroupController {

	
	private IPartyGroupService groupService;
	
	public GroupController(){
		groupService = AppUtil.getBean(IPartyGroupService.class);
	}

	@Path("/loadById")
	@ApiOperation(value = "根据ID获取用户组", notes = "根据ID获取用户组")
	@GET
	public WebAPIResult loadById(
			@QueryParam("id") @ApiParam(value = "id", required = true) String id) {
		String data = groupService.getByIdJson(id);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(data);
		
		return result;
	}
	
	@Path("/loadByAlias")
	@ApiOperation(value = "根据别名获取用户组", notes = "根据别名获取用户组")
	@GET
	public WebAPIResult loadByAlias(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		String group = groupService.getByAliasJson(alias);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(group);
		
		return result;
	}
	
	@Path("/findAll")
	@ApiOperation(value = "获取用户组列表", notes = "获取用户组列表")
	@GET
	public WebAPIResult findAll() {
		String group = groupService.findAllJson();
		
		WebAPIResult result = new WebAPIResult();
		result.setData(group);
		
		return result;
	}
	
	@Path("/findByUserAccount")
	@ApiOperation(value = "根据用户账号获取用户组列表", notes = "根据用户账号获取用户组列表")
	@GET
	public WebAPIResult findByUserAccount(
			@QueryParam("account") @ApiParam(value = "account", required = true) String account
		) {
		String group = groupService.findByUserAccountJson(account);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(group);
		
		return result;
	}
	
	@Path("/findByUserId")
	@ApiOperation(value = "根据用户ID获取用户组列表", notes = "根据用户ID获取用户组列表")
	@GET
	public WebAPIResult findByUserId(
			@QueryParam("userId") @ApiParam(value = "userId", required = true) String userId
		) {
		String group = groupService.findByUserIdJson(userId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(group);
		
		return result;
	}
	
}
