package com.lc.ibps.platform.rest.org;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.org.service.IPartyRoleMgrService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 角色控制器，第三方系统调用
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：Lium
 * 邮箱：1316679699@qq.com
 * 日期：2017年7月19日-上午11:36:19
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@Path("/webapi/roleMgrService")
@Api(value = "/roleMgrService", description = "角色管理服务")
public class RoleMgrController {
	
	
	private IPartyRoleMgrService roleMgrService;
	
	public RoleMgrController(){
		roleMgrService = AppUtil.getBean(IPartyRoleMgrService.class);
	}
	
	/**
	 * 添加角色信息
	 *
	 * @param json {id:""/*选填/,name:"测试"/*必填/,roleAlias:"cs"/*必填/,roleNote:"角色描述"/*选填/,subSystemId:""/*选填/}
	 */
    @POST
    @ApiOperation(value = "添加角色信息", notes = "添加角色信息")
    @Path("/createRole")
	public WebAPIResult createRole(@QueryParam("json") @ApiParam(value = "角色信息json", required = true) String json
			){	
		WebAPIResult result = new WebAPIResult();
		try{
			roleMgrService.createRole(json);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	/**
	 * 修改角色信息
	 *
	 * @param json {id:"3b463b30",name:"测试"/*必填/,roleAlias:"cs"/*必填/,roleNote:"角色描述"/*选填/,subSystemId:"1"/*选填/}
	 */
    @PUT
    @ApiOperation(value = "修改角色信息", notes = "修改角色信息")
    @Path("/updateRole")
	public WebAPIResult updateRole(@QueryParam("json") @ApiParam(value = "角色信息json", required = true) String json
			){		
		WebAPIResult result = new WebAPIResult();
		try{
			roleMgrService.updateRole(json);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
    @DELETE
    @ApiOperation(value="删除角色信息", notes="根据id删除角色")
    @Path("/deleteRole")
	public WebAPIResult deleteRole(@QueryParam("id") @ApiParam(value="角色ID", required = true) String id
			){
		WebAPIResult result = new WebAPIResult();
		try{
			roleMgrService.deleteRole(id);
		}catch(Exception e){
			result.setMessage(e.getMessage());
		}
		return result;
	}
}
