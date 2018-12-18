package com.lc.ibps.platform.rest.org;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.org.service.IPartyEmployeeMgrService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 用户管理控制器，第三方系统调用。
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：Lium
 * 邮箱：1316679699@qq.com
 * 日期：2017年7月13日-上午9:37:39
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/employeeMgrService")
@Api(value = "/employeeMgrService",description="用户管理服务")
@Controller
public class EmployeeMgrController {
	
	
	private IPartyEmployeeMgrService employeeMgrService;
	
	public EmployeeMgrController(){
		employeeMgrService = AppUtil.getBean(IPartyEmployeeMgrService.class);
	}
	
	/**
	 * 添加用户信息
	 *
	 * @param json {id:""/*选填/,account:"test"/*必填/,password:"123"/*必填/,isSuper:"Y"/*必填/,name:"test"/*选填/,
	 * 				status:"actived"/*必填/,gender:"male"/*必填/,email:"123@qq.com"/*必填/,address:"地址"/*选填/,
	 * 				mobile:""/*选填/,QQ:""/*选填/,wcAccount:""/*选填/,photo:""/*选填/,groupID:""/*选填/,
	 * 				createTime:""/*选填/,
	 * 				posItemList:[{id:"", name:"", isMainPost:"", isPrincipal:""}]/*选填/,
	 * 				roleItemList:[{id:"", name:"", canDelete:""}]/*选填/,
	 * 				attrItemList:[{attrId:"", value:""}]/*选填/,
	 * 				userGroupItemList:[{groupId:""}]/*选填/}
	 */
	@Path("/createEmployee")
	@ApiOperation(value = "添加用户信息", notes = "添加用户信息")
	@POST
	public WebAPIResult createEmployee(
			@QueryParam("json") @ApiParam(value = "用户信息json", required = true) String json
			){		
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.createEmployee(json);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	/**
	 * 修改用户信息
	 *
	 * @param json {id:"498b9030",account:"test"/*必填/,password:"123"/*必填/,isSuper:"Y"/*必填/,name:"test"/*选填/,
	 * 				gender:"male"/*必填/,email:"123@qq.com"/*必填/,address:"地址"/*选填/,mobile:""/*选填/,QQ:""/*选填/,
	 * 				wcAccount:""/*选填/,photo:""/*选填/,groupID:""/*选填/,createTime:"2017-02-09 00:00:00"/*必填/,
	 * 				posItemList:[{id:"", name:"", isMainPost:"", isPrincipal:""}]/*选填/,
	 * 				roleItemList:[{id:"", name:"", canDelete:""}]/*选填/,
	 * 				attrItemList:[{attrId:"", value:""}]/*选填/,
	 * 				userGroupItemList:[{groupId:""}]/*选填/}
	 */
	@Path("/updateEmployee")
	@ApiOperation(value = "修改用户信息", notes = "修改用户信息")
	@PUT
	public WebAPIResult updateEmployee(
			@QueryParam("json") @ApiParam(value = "用户信息json", required = true) String json
			){		
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.updateEmployee(json);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addRole4Employee")
	@ApiOperation(value = "添加用户角色", notes = "根据用户ID添加用户角色")
	@POST
	public WebAPIResult addRole4Employee(
			@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id,
			@QueryParam("roles") @ApiParam(value = "角色ID", required = true) String roles) {		
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.addRole4Employee(id, roles);	
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeRole4Employee")
	@ApiOperation(value = "移除用户角色", notes = "根据用户ID移除用户角色")
	@DELETE
	public WebAPIResult removeRole4Employee(
			@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id,
			@QueryParam("roles") @ApiParam(value = "角色ID", required = true) String roles) {			
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.removeRole4Employee(id, roles);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addPosition4Employee")
	@ApiOperation(value = "添加用户岗位", notes = "根据用户ID添加用户岗位")
	@POST
	public WebAPIResult addPosition4Employee(
			@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id,
			@QueryParam("positions") @ApiParam(value = "岗位ID", required = true) String positions) {		
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.addPosition4Employee(id, positions);	
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removePosition4Employee")
	@ApiOperation(value = "移除用户岗位", notes = "根据用户ID用户岗位")
	@DELETE
	public WebAPIResult removePosition4Employee(
			@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id,
			@QueryParam("positions") @ApiParam(value = "岗位ID", required = true) String positions) {
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.removePosition4Employee(id, positions);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addOrg4Employee")
	@ApiOperation(value = "添加用户组织", notes = "根据用户ID添加用户组织")
	@POST
	public WebAPIResult addOrg4Employee(
			@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id,
			@QueryParam("groupID") @ApiParam(value = "组织ID", required = true) String groupID) {		
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.addOrg4Employee(id, groupID);	
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeOrg4Employee")
	@ApiOperation(value = "移除用户组织", notes = "根据用户ID移除用户组织")
	@DELETE
	public WebAPIResult removeOrg4Employee(
			@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id) {
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.removeOrg4Employee(id);		
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addGroup4Employee")
	@ApiOperation(value = "添加用户组", notes = "根据用户ID添加用户组")
	@POST
	public WebAPIResult addGroup4Employee(
			@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id,
			@QueryParam("groups") @ApiParam(value = "用户组ID", required = true) String groups) {	
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.addGroup4Employee(id, groups);		
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeGroup4Employee")
	@ApiOperation(value = "移除用户组", notes = "根据用户ID移除用户组")
	@DELETE
	public WebAPIResult removeGroup4Employee(
			@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id,
			@QueryParam("groups") @ApiParam(value = "用户组ID", required = true) String groups) {	
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.removeGroup4Employee(id, groups);		
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	/**
	 * 修改用户密码
	 *
	 * @param json {id:"498b9030"/*必填/,primitivePassword:"1"/*必填/,newPassword:"123"/*必填/,isReset:0/*选填/}
	 */
	@Path("/updatePasswd4Employee")
	@ApiOperation(value = "修改用户密码", notes = "根据用户ID修改用户密码")
	@PUT
	public WebAPIResult updatePasswd4Employee(
			@QueryParam("json") @ApiParam(value = "密码信息json", required = true) String json) {	
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.updatePasswd4Employee(json);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/deleteEmployee")
	@ApiOperation(value = "删除用户信息", notes = "根据用户ID删除用户信息")
	@DELETE
	public WebAPIResult deleteEmployee(
			@QueryParam("ids") @ApiParam(value = "用户ID", required = true) String ids) {
		WebAPIResult result = new WebAPIResult();
		try{
			employeeMgrService.deleteEmployee(ids);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
}
