package com.lc.ibps.platform.rest.org;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.org.service.IPartyGroupMgrService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 用户组控制器，第三方系统调用
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：Lium
 * 邮箱：1316679699@qq.com
 * 日期：2017年7月18日-下午8:36:36
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/groupMgrService")
@Api(value = "/groupMgrService",description="用户组管理服务")
@Controller
public class GroupMgrController {
	
	
	private IPartyGroupMgrService groupMgrService;
	
	public GroupMgrController(){
		groupMgrService = AppUtil.getBean(IPartyGroupMgrService.class);
	}
	
	/**
	 * 添加用户组信息
	 *
	 * @param json {id:""/*选填/,name:"group1"/*必填/,groupAlias:"用户组1"/*必填/,groupNote:"用户组描述"/*选填/,
					partyUserGroupPoList:[{id:"",userId:"498b9030",userName:"test",groupId:""}]/*选填/}";
	 */
	@Path("/createGroup")
	@ApiOperation(value = "添加用户组信息", notes = "添加用户组信息")
	@POST
	public WebAPIResult createGroup(
			@QueryParam("json") @ApiParam(value = "用户组信息json", required = true) String json
			){	
		WebAPIResult result = new WebAPIResult();
		try{
			groupMgrService.createGroup(json);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	/**
	 * 修改用户组信息
	 *
	 * @param json {id:"33687884",name:"group1"/*必填/,groupAlias:"用户组1"/*必填/,groupNote:"用户组描述"/*选填/,
			partyUserGroupPoList:[{id:"39635968",userId:"498b9030",userName:"test",groupId:"33687884"},
									{id:"",userId:"498b9030",userName:"test",groupId:""]/*选填/}";
	 */
	@Path("/updateGroup")
	@ApiOperation(value = "修改用户组信息", notes = "修改用户组信息")
	@PUT
	public WebAPIResult updateGroup(
			@QueryParam("json") @ApiParam(value = "用户组信息json", required = true) String json
			){
		WebAPIResult result = new WebAPIResult();
		try{
			groupMgrService.updateGroup(json);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/deleteGroup")
	@ApiOperation(value = "删除用户组信息", notes = "根据组ID删除用户组信息")
	@DELETE
	public WebAPIResult deleteGroup(
			@QueryParam("id") @ApiParam(value = "组ID", required = true) String id) {
		WebAPIResult result = new WebAPIResult();
		try{
			groupMgrService.deleteGroup(id);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/addEmployee2Group")
	@ApiOperation(value = "添加用户组用户", notes = "根据组ID添加用户组用户")
	@POST
	public WebAPIResult addEmployee2Group(
			@QueryParam("groupId") @ApiParam(value = "组ID", required = true) String groupId,
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId) {
		WebAPIResult result = new WebAPIResult();
		try{
			groupMgrService.addEmployee2Group(groupId, userId);			
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	@Path("/removeEmployee4Group")
	@ApiOperation(value = "移除用户组用户", notes = "根据用户ID移除用户组")
	@DELETE
	public WebAPIResult removeEmployee4Group(
			@QueryParam("groupId") @ApiParam(value = "组ID", required = true) String groupId,
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId) {	
		WebAPIResult result = new WebAPIResult();
		try{
			groupMgrService.removeEmployee4Group(groupId, userId);		
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
}
