package com.lc.ibps.platform.rest.org;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.org.service.IPartyRelService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 
 * 参与者关系服务 控制器，第三方系统调用。
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年9月22日-下午2:47:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@Path("/webapi/relService")
@Api(value = "/relService", description = "参与者关系服务")
public class RelController {

	
	private IPartyRelService relService;
	
	public RelController(){
		relService = AppUtil.getBean(IPartyRelService.class);
	}

	@Path("/findPartyRelations")
	@ApiOperation(value = "获取参与者关系类型列表", notes = "获取参与者关系类型列表")
	@GET
	public WebAPIResult findPartyRelations(
			@QueryParam("partyType") @ApiParam(value = "partyType", required = true) String partyType
			) {
		String rel = relService.getPartyRelationsJson(partyType);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(rel);
		
		return result;
	}
	
	@Path("/findRoleRelations")
	@ApiOperation(value = "获取角色关系类型列表", notes = "获取角色关系类型列表")
	@GET
	public WebAPIResult findRoleRelations(
			) {
		String rel = relService.getRoleRelationsJson();
		
		WebAPIResult result = new WebAPIResult();
		result.setData(rel);
		
		return result;
	}
	
	@Path("/findUserRelations")
	@ApiOperation(value = "获取用户关系类型列表", notes = "获取用户关系类型列表")
	@GET
	public WebAPIResult findUserRelations(
			) {
		String rel = relService.getUserRelationsJson();
		
		WebAPIResult result = new WebAPIResult();
		result.setData(rel);
		
		return result;
	}
	
	@Path("/findUserPartyRelations")
	@ApiOperation(value = "获取用户与参与者关系类型列表", notes = "获取用户与参与者关系类型列表")
	@GET
	public WebAPIResult findUserPartyRelations(
			@QueryParam("partyType") @ApiParam(value = "partyType", required = true) String partyType
			) {
		String rel = relService.getUserPartyRelationsJson(partyType);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(rel);
		
		return result;
	}
	
	@Path("/findUserRoleRelations")
	@ApiOperation(value = "获取用户与角色关系类型列表", notes = "获取用户与角色关系类型列表")
	@GET
	public WebAPIResult findUserRoleRelations(
			) {
		String rel = relService.getUserRoleRelationsJson();
		
		WebAPIResult result = new WebAPIResult();
		result.setData(rel);
		
		return result;
	}
	
}
