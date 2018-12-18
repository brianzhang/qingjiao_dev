package com.lc.ibps.platform.rest.org;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.org.service.IPartyPositionMgrService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 岗位管理控制器，第三方系统调用
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：Lium
 * 邮箱：1316679699@qq.com
 * 日期：2017年7月20日-下午2:26:26
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/positionMgrService")
@Api(value = "/positionMgrService",description="岗位管理服务")
@Controller
public class PositionMgrController {
	
	
	private IPartyPositionMgrService positionMgrService;
	
	public PositionMgrController(){
		positionMgrService = AppUtil.getBean(IPartyPositionMgrService.class);
	}
	
	/**
	 * 添加岗位信息
	 *
	 * @param json {id:""/*选填/,name:"测试员"/*必填/,posAlias:"csy"/*必填/,levelID:"84d780c0"/*必填/,
	 * 					desc:"岗位描述"/*选填/,orgID:""/*选填/,parentId:""/*选填/,createTime:""/*选填/}
	 */
	@Path("/createPosition")
	@ApiOperation(value = "添加岗位信息", notes = "添加岗位信息")
	@POST
	public WebAPIResult createPosition(@QueryParam("json") @ApiParam(value = "岗位信息json", required = true) String json
			){	
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.createPosition(json);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	/**
	 * 修改岗位信息
	 *
	 * @param json {id:"257116e0-dec9-11e6-a540-9ba5bdd095ea"/*必填/,name:"测试员"/*必填/,posAlias:"csy"/*必填/,
	 * 				levelID:"84d780c0-dec8-11e6-a540-9ba5bdd095ea"/*必填/,desc:"岗位描述"/*选填/,orgID:""/*选填/,
	 * 				parentId:""/*必填/,createTime:"2017-01-20 12:30:33"/*必填/}
	 */
	@Path("/updatePosition")
	@ApiOperation(value = "修改岗位信息", notes = "修改岗位信息")
	@PUT
	public WebAPIResult updatePosition(@QueryParam("json") @ApiParam(value = "岗位信息json", required = true) String json
			){		
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.updatePosition(json);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/deletePosition")
	@ApiOperation(value = "根据岗位ID删除岗位信息", notes = "根据岗位ID删除岗位信息")
	@DELETE
	public WebAPIResult deletePosition(
			@QueryParam("ids") @ApiParam(value = "岗位ID", required = true) String ids) {			
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.deletePosition(ids);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addEmployee2Position")
	@ApiOperation(value = "根据岗位ID添加人员", notes = "根据岗位ID添加人员")
	@POST
	public WebAPIResult addEmployee2Position(
			@QueryParam("id") @ApiParam(value = "岗位ID", required = true) String id,
			@QueryParam("users") @ApiParam(value = "用户ID", required = true) String users) {	
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.addEmployee2Position(id, users);		
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addRole2Position")
	@ApiOperation(value = "根据岗位ID添加角色", notes = "根据岗位ID添加角色")
	@POST
	public WebAPIResult addRole2Position(
			@QueryParam("id") @ApiParam(value = "岗位ID", required = true) String id,
			@QueryParam("roles") @ApiParam(value = "角色ID", required = true) String roles) {		
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.addRole2Position(id, roles);	
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addOrg4Position")
	@ApiOperation(value = "根据岗位ID添加组织", notes = "根据岗位ID添加组织")
	@POST
	public WebAPIResult addOrg4Position(
			@QueryParam("id") @ApiParam(value = "岗位ID", required = true) String id,
			@QueryParam("orgId") @ApiParam(value = "组织ID", required = true) String orgId) {		
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.addOrg4Position(id, orgId);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addManager4Position")
	@ApiOperation(value = "根据岗位ID和用户ID添加负责人", notes = "根据岗位ID和用户ID添加负责人")
	@POST
	public WebAPIResult addManager4Position(
			@QueryParam("id") @ApiParam(value = "岗位ID", required = true) String id,
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId) {	
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.addManager4Position(id, userId);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeEmployee4Position")
	@ApiOperation(value = "根据岗位ID移除人员", notes = "根据岗位ID移除人员")
	@DELETE
	public WebAPIResult removeEmployee4Position(
			@QueryParam("id") @ApiParam(value = "岗位ID", required = true) String id,
			@QueryParam("users") @ApiParam(value = "用户ID", required = true) String users) {		
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.removeEmployee4Position(id, users);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeRole4Position")
	@ApiOperation(value = "根据岗位ID移除角色", notes = "根据岗位ID移除角色")
	@DELETE
	public WebAPIResult removeRole4Position(
			@QueryParam("id") @ApiParam(value = "岗位ID", required = true) String id,
			@QueryParam("roles") @ApiParam(value = "角色ID", required = true) String roles) {		
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.removeRole4Position(id, roles);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeOrg4Position")
	@ApiOperation(value = "根据用岗位ID移除组织", notes = "根据用岗位ID移除组织")
	@DELETE
	public WebAPIResult removeOrg4Position(
			@QueryParam("id") @ApiParam(value = "岗位ID", required = true) String id,
			@QueryParam("orgId") @ApiParam(value = "组织ID", required = true) String orgId) {	
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.removeOrg4Position(id,orgId);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeManager4Position")
	@ApiOperation(value = "根据岗位ID和用户Id移除负责人", notes = "根据岗位ID和用户Id移除负责人")
	@DELETE
	public WebAPIResult removeManager4Position(
			@QueryParam("id") @ApiParam(value = "岗位ID", required = true) String id,
			@QueryParam("useId") @ApiParam(value = "用户ID", required = true) String userId) {
		WebAPIResult result = new WebAPIResult();
		try{
			positionMgrService.removeManager4Position(id, userId);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
}
