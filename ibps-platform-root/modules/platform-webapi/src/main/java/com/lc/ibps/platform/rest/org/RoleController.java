package com.lc.ibps.platform.rest.org;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.model.PartyRole;
import com.lc.ibps.api.org.model.PartyRoleTree;
import com.lc.ibps.api.org.service.IPartyRoleService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 
 * 角色服务 控制器，第三方系统调用。
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
@Path("/webapi/roleService")
@Api(value = "/roleService", description = "角色服务")
public class RoleController {

	
	private IPartyRoleService roleService;
	
	public RoleController(){
		roleService = AppUtil.getBean(IPartyRoleService.class);
	}

    @GET
    @ApiOperation(value = "根据ID获取角色", notes = "根据ID获取角色")
    @Path("/loadById")
	public WebAPIResult loadById(
			@QueryParam("id") @ApiParam(value = "id", required = true) String id) {
		PartyRole role = roleService.getById(id);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}

    @GET
    @ApiOperation(value = "根据别名获取角色", notes = "根据别名获取角色")
    @Path("/loadByAlias")
	public WebAPIResult loadByAlias(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		PartyRole role = roleService.getByAlias(alias);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
    @GET
    @ApiOperation(value = "获取角色列表", notes = "获取角色列表")
    @Path("/findAll")
	public WebAPIResult findAll() {
		List<PartyRole> role = roleService.findAll();
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
    @GET
    @ApiOperation(value = "根据用户账号获取角色列表", notes = "根据用户账号获取角色列表")
    @Path("/findByUserAccount")
	public WebAPIResult findByUserAccount(
			@QueryParam("account") @ApiParam(value = "account", required = true) String account
		) {
		List<PartyEntity> role = roleService.getByUserAccount(account);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
    @GET
    @ApiOperation(value = "根据用户ID获取角色列表", notes = "根据用户ID获取角色列表")
    @Path("/findByUserId")
	public WebAPIResult findByUserId(
			@QueryParam("userId") @ApiParam(value = "userId", required = true) String userId
		) {
		List<PartyEntity> role = roleService.getByUserId(userId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
	@Path("/queryBySubSysId")
	@ApiOperation(value = "根据子系统ID获取角色列表", notes = "根据子系统ID获取角色列表")
	@GET
	public WebAPIResult queryBySubSysId(
			@QueryParam("subSysId") @ApiParam(value = "subSysId", required = true) String subSysId
			,@QueryParam("page") @ApiParam(value = "page", required = false, defaultValue = "1") int page
			,@QueryParam("limit") @ApiParam(value = "limit", required = false, defaultValue = "20") int limit
		) {
		List<PartyRole> role = roleService.queryBySubSysId(subSysId, new DefaultPage(page, limit));
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
	@Path("/findBySubSysId")
	@ApiOperation(value = "根据子系统ID获取角色列表", notes = "根据子系统ID获取角色列表")
	@GET
	public WebAPIResult findBySubSysId(
			@QueryParam("subSysId") @ApiParam(value = "subSysId", required = true) String subSysId
		) {
		List<PartyRole> role = roleService.findBySubSysId(subSysId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
	@Path("/queryBySubSysAlias")
	@ApiOperation(value = "根据子系统别名获取角色列表", notes = "根据子系统别名获取角色列表")
	@GET
	public WebAPIResult queryBySubSysAlias(
			@QueryParam("subSysAlias") @ApiParam(value = "subSysAlias", required = true) String subSysAlias
			,@QueryParam("page") @ApiParam(value = "page", required = false, defaultValue = "1") int page
			,@QueryParam("limit") @ApiParam(value = "limit", required = false, defaultValue = "20") int limit
		) {
		List<PartyRole> role = roleService.queryBySubSysAlias(subSysAlias, new DefaultPage(page, limit));
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
	@Path("/findBySubSysAlias")
	@ApiOperation(value = "根据子系统别名获取角色列表", notes = "根据子系统别名获取角色列表")
	@GET
	public WebAPIResult findBySubSysAlias(
			@QueryParam("subSysAlias") @ApiParam(value = "subSysAlias", required = true) String subSysAlias
		) {
		List<PartyRole> role = roleService.findBySubSysAlias(subSysAlias);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
	@Path("/findTreeData")
	@ApiOperation(value = "获取角色列表", notes = "获取角色树数据")
	@GET
	public WebAPIResult findTreeData() {
		List<PartyRoleTree> role = roleService.findTreeData();
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
	@Path("/findTreeDataBySubSysId")
	@ApiOperation(value = "根据子系统ID获取角色树数据", notes = "根据子系统ID获取角色树数据")
	@GET
	public WebAPIResult findTreeDataBySubSysId(
			@QueryParam("subSysId") @ApiParam(value = "subSysId", required = true) String subSysId
		) {
		List<PartyRoleTree> role = roleService.findTreeDataBySubSysId(subSysId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
	@Path("/findTreeDataBySubSysAlias")
	@ApiOperation(value = "根据子系统别名获取角色树数据", notes = "根据子系统别名获取角色树数据")
	@GET
	public WebAPIResult findTreeDataBySubSysAlias(
			@QueryParam("subSysAlias") @ApiParam(value = "subSysAlias", required = true) String subSysAlias
		) {
		List<PartyRoleTree> role = roleService.findTreeDataBySubSysAlias(subSysAlias);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(role);
		
		return result;
	}
	
}
