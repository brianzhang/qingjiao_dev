package com.lc.ibps.platform.rest.org;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.org.service.IPartyOrgMgrService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 组织控制器，第三方系统调用
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：Lium
 * 邮箱：1316679699@qq.com
 * 日期：2017年7月19日-下午5:50:26
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/orgMgrService")
@Api(value = "/orgMgrService",description="组织管理服务")
@Controller
public class OrgMgrControlle {
	
	
	private IPartyOrgMgrService orgMgrService;
	
	public OrgMgrControlle(){
		orgMgrService = AppUtil.getBean(IPartyOrgMgrService.class);
	}
	
	/**
	 * 添加组织信息
	 *
	 * @param json {id:""/*选填/,name:"开发部"/*必填/,orgAlias:"kfb"/*必填/,
	 * 				levelID:""/*选填/,status:""/*选填/,partyEntityPo.parentId:""/*选填/,
	 * 				createTime:""/*选填/}
	 */
	@Path("/createOrg")
	@ApiOperation(value = "添加组织信息", notes = "添加组织信息")
	@POST
	public WebAPIResult createOrg(
			@QueryParam("json") @ApiParam(value = "组织信息json", required = true) String json
			){
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.createOrg(json);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	/**
	 * 修改组织信息
	 *
	 * @param json {id:"e4f00720"/*必填/,name:"开发部"/*必填/,orgAlias:"kfb"/*必填/,
	 * 				levelID:""/*选填/,status:""/*选填/,partyEntityPo.parentId:""/*选填/,
	 * 				createTime:"2017-01-20 12:33:06"/*必填/}
	 */
	@Path("/updateOrg")
	@ApiOperation(value = "修改组织信息", notes = "修改组织信息")
	@PUT
	public WebAPIResult updateOrg(
			@QueryParam("json") @ApiParam(value = "组织信息json", required = true) String json
			){
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.updateOrg(json);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/deleteOrg")
	@ApiOperation(value = "删除组织信息", notes = "根据组织ID删除组织信息")
	@DELETE
	public WebAPIResult deleteOrg(
			@QueryParam("id") @ApiParam(value = "组织ID", required = true) String id) {	
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.deleteOrg(id);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addEmployee2Org")
	@ApiOperation(value = "人员加入组织", notes = "根据组织ID添加用户")
	@POST
	public WebAPIResult addEmployee2Org(
			@QueryParam("id") @ApiParam(value = "组织ID", required = true) String id,
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId) {	
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.addEmployee2Org(id, userId);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addRole2Org")
	@ApiOperation(value = "角色加入组织", notes = "根据组织ID添加角色")
	@POST
	public WebAPIResult addRole2Org(
			@QueryParam("id") @ApiParam(value = "组织ID", required = true) String id,
			@QueryParam("roleId") @ApiParam(value = "角色ID", required = true) String roleId) {
		orgMgrService.addRole2Org(id, roleId);	
		WebAPIResult result = new WebAPIResult();
		return result;
	}
	
	@Path("/addPosition2Org")
	@ApiOperation(value = "岗位加入组织", notes = "根据组织ID添加岗位")
	@POST
	public WebAPIResult addPosition2Org(
			@QueryParam("id") @ApiParam(value = "组织ID", required = true) String id,
			@QueryParam("positions") @ApiParam(value = "岗位ID", required = true) String positions) {
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.addPosition2Org(id, positions);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addManager4Org")
	@ApiOperation(value = "添加组织负责人", notes = "根据组织ID和用户ID添加负责人")
	@POST
	public WebAPIResult addManager4Org(
			@QueryParam("id") @ApiParam(value = "组织ID", required = true) String id,
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId) {
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.addManager4Org(id, userId);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;	
	}
	
	@Path("/removeEmployee4Org")
	@ApiOperation(value = "组织移除人员", notes = "根据组织Id移除用户")
	@DELETE
	public WebAPIResult removeEmployee4Org(
			@QueryParam("id") @ApiParam(value = "组织ID", required = true) String id,
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId) {
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.removeEmployee4Org(id, userId);		
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeRole4Org")
	@ApiOperation(value = "组织移除角色", notes = "根据组织ID移除角色")
	@DELETE
	public WebAPIResult removeRole4Org(
			@QueryParam("id") @ApiParam(value = "组织ID", required = true) String id,
			@QueryParam("roleId") @ApiParam(value = "角色ID", required = true) String roleId) {
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.removeRole4Org(id, roleId);	
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removePosition4Org")
	@ApiOperation(value = "组织移除岗位", notes = "根据用岗位ID移除岗位")
	@DELETE
	public WebAPIResult removePosition4Org(
		@QueryParam("positions") @ApiParam(value = "岗位ID", required = true) String positions) {
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.removePosition4Org(positions);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeManager4Org")
	@ApiOperation(value = "移除组织负责人", notes = "根据组织ID和用户Id移除负责人")
	@DELETE
	public WebAPIResult removeManager4Org(
			@QueryParam("id") @ApiParam(value = "组织ID", required = true) String id,
			@QueryParam("useId") @ApiParam(value = "用户ID", required = true) String userId) {
		WebAPIResult result = new WebAPIResult();
		try{
			orgMgrService.removeManager4Org(id, userId);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
}
