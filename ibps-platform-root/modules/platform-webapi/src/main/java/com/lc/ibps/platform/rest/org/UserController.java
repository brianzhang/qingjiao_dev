package com.lc.ibps.platform.rest.org;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 
 * 用户服务 控制器，第三方系统调用。
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
@Path("/webapi/userService")
@Api(value = "/userService", description = "用户服务")
public class UserController {

	
	private IPartyUserService userService;
	
	public UserController(){
		userService = AppUtil.getBean(IPartyUserService.class);
	}

    @GET
    @ApiOperation(value = "根据ID获取人员", notes = "根据ID获取人员")
    @Path("/loadById")
	public WebAPIResult loadById(@QueryParam("id") @ApiParam(value = "用户ID", required = true) String id) {
		User user = userService.getById(id);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(user);
		
		return result;
	}

	@GET
	@ApiOperation(value = "根据账号获取人员", notes = "根据账号获取人员")
	@Path("/loadByAccount")
	public WebAPIResult loadByAccount(@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account) {
		User user = userService.getByAccount(account);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(user);
		
		return result;
	}
	
	@GET
	@ApiOperation(value = "根据微信账号获取人员", notes = "根据微信账号获取人员")
	@Path("/loadByWcAccount")
	public WebAPIResult loadByWcAccount(@QueryParam("account") @ApiParam(value = "用户微信号", required = true) String account) {
		User user = userService.getByWcAccount(account);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(user);
		
		return result;
	}
	
	@GET
	@ApiOperation(value = "是否管理员账号", notes = "根据账号判断是否管理员账号")
	@Path("/isSuper")
	public WebAPIResult isSuper(@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account) {
		boolean isSuper = userService.isSuperUser(account);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("isSuper", isSuper);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(map);
		
		return result;
	}
	
	@GET
	@ApiOperation(value = "根据用户关系获取人员列表", notes = "根据用户关系获取人员列表")
	@Path("/findByUserRelation")
	public WebAPIResult findByUserRelation(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("partyRelType") @ApiParam(value = "用户参与者关系类型", required = true) String partyRelType,
			@QueryParam("relPartyName") @ApiParam(value = "当前关系方1名称", required = true) String relPartyName,
			@QueryParam("relLevel") @ApiParam(value = "关系层次", required = false, defaultValue = "1") int relLevel,
			@QueryParam("isRecursion") @ApiParam(value = "递归查找", required = false, defaultValue = "false") boolean isRecursion) {
		List<User> userList = userService.findByUserRelation(account, partyRelType, relPartyName, relLevel, isRecursion);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByUserRelLevel")
	@ApiOperation(value = "根据用户关系获取人员列表", notes = "根据用户关系获取人员列表")
	@GET
	public WebAPIResult findByUserRelation(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("partyRelType") @ApiParam(value = "用户参与者关系类型", required = true) String partyRelType,
			@QueryParam("relPartyName") @ApiParam(value = "当前关系方1名称", required = true) String relPartyName
			) {
		List<User> userList = userService.findByUserRelation(account, partyRelType, relPartyName);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findSupOrSubByUserId")
	@ApiOperation(value = "根据用户ID获取人员上下级负责人列表", notes = "根据用户ID获取人员上下级负责人列表")
	@GET
	public WebAPIResult findSupOrSubByUserId(
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId,
			@QueryParam("relLevel") @ApiParam(value = "关系层次", required = false, defaultValue = "1")  int relLevel,
			@QueryParam("pattern") @ApiParam(value = "查找模式", required = true, defaultValue = "equal") String pattern
			) {
		List<User> userList = userService.findSupOrSubByUserId(userId, relLevel, pattern);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findSupOrSubByAccount")
	@ApiOperation(value = "根据用户账号获取人员上下级负责人列表", notes = "根据用户账号获取人员上下级负责人列表")
	@GET
	public WebAPIResult findSupOrSubByAccount(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("relLevel") @ApiParam(value = "关系层次", required = false, defaultValue = "1")  int relLevel,
			@QueryParam("pattern") @ApiParam(value = "查找模式", required = true, defaultValue = "equal") String pattern
			) {
		List<User> userList = userService.findSupOrSubByAccount(account, relLevel, pattern);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findSupOrSubUserByUserId")
	@ApiOperation(value = "根据用户ID获取人员上下级列表", notes = "根据用户ID获取人员上下级列表")
	@GET
	public WebAPIResult findSupOrSubUserByUserId(
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId,
			@QueryParam("relLevel") @ApiParam(value = "关系层次", required = false, defaultValue = "1")  int relLevel,
			@QueryParam("pattern") @ApiParam(value = "查找模式", required = true, defaultValue = "equal") String pattern
			) {
		List<User> userList = userService.findSupOrSubUserByUserId(userId, relLevel, pattern);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findSupOrSubUserByAccount")
	@ApiOperation(value = "根据用户账号获取人员上下级列表", notes = "根据用户账号获取人员上下级列表")
	@GET
	public WebAPIResult findSupOrSubUserByAccount(
			@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("relLevel") @ApiParam(value = "关系层次", required = false, defaultValue = "1")  int relLevel,
			@QueryParam("pattern") @ApiParam(value = "查找模式", required = true, defaultValue = "equal") String pattern
			) {
		List<User> userList = userService.findSupOrSubUserByAccount(account, relLevel, pattern);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByUserIdRelation")
	@ApiOperation(value = "根据用户ID和关系获取人员列表", notes = "根据用户ID和关系获取人员列表")
	@GET
	public WebAPIResult findByUserIdRelation(
			@QueryParam("userId") @ApiParam(value = "用户ID", required = true) String userId,
			@QueryParam("partyRelType") @ApiParam(value = "用户参与者关系类型", required = true) String partyRelType,
			@QueryParam("relPartyName") @ApiParam(value = "当前关系方1名称", required = true) String relPartyName
			) {
		List<User> userList = userService.findByUserIdRelation(userId, partyRelType, relPartyName);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByPartyRel")
	@ApiOperation(value = "根据用户参与者关系获取人员列表", notes = "根据用户参与者关系获取人员列表")
	@GET
	public WebAPIResult findByPartyRelation(
			@QueryParam("alias") @ApiParam(value = "参与者别名", required = true) String alias,
			@QueryParam("partyType") @ApiParam(value = "参与者类型", required = true) String partyType,
			@QueryParam("partyRelType") @ApiParam(value = "用户参与者关系类型", required = true) String partyRelType
			) {
		List<User> userList = userService.findByPartyRelation(alias, partyType, partyRelType);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByPartyRelType")
	@ApiOperation(value = "根据用户组织别名获取组织的人员列表", notes = "根据用户组织别名获取组织的人员列表")
	@GET
	public WebAPIResult findByPartyRelation(
			@QueryParam("alias") @ApiParam(value = "参与者别名", required = true) String alias,
			@QueryParam("partyType") @ApiParam(value = "参与者类型", required = true) String partyType
			) {
		List<User> userList = userService.findByPartyRelation(alias, partyType);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByAttrValue")
	@ApiOperation(value = "获取人员列表", notes = "根据用户扩展属性获取人员列表")
	@GET
	public WebAPIResult findByAttrValue(
			@QueryParam("key") @ApiParam(value = "扩展属性key", required = true) String key,
			@QueryParam("value") @ApiParam(value = "扩展属性值", required = true) String value
			) {
		List<User> userList = userService.findByAttrValue(key, value);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByPartyAttrParam")
	@ApiOperation(value = "根据扩展属性的参数 jsonConfig 获取人员列表", notes = "根据扩展属性的参数 jsonConfig 获取人员列表")
	@GET
	public WebAPIResult findByPartyAttrParam(@QueryParam("jsonConfig") @ApiParam(value = "用户自定义参数", required = true) String jsonConfig
			) {
		List<User> userList = userService.findByPartyAttrParam(jsonConfig);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByUserAttrParam")
	@ApiOperation(value = "根据扩展属性的参数 jsonConfig 获取人员列表", notes = "根据扩展属性的参数 jsonConfig 获取人员列表")
	@GET
	public WebAPIResult findByUserAttrParam(@QueryParam("jsonConfig") @ApiParam(value = "用户自定义参数", required = true) String jsonConfig
			) {
		List<User> userList = userService.findByUserAttrParam(jsonConfig);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByParty")
	@ApiOperation(value = "根据参与者ID获取下属人员列表", notes = "根据参与者ID获取下属人员列表")
	@GET
	public WebAPIResult findByParty(@QueryParam("partyId") @ApiParam(value = "参与者ID", required = true) String partyId
			) {
		List<User> userList = userService.findByParty(partyId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByPartyAndType")
	@ApiOperation(value = "根据参与者ID及类型获取下属人员列表", notes = "根据参与者ID及类型获取下属人员列表")
	@GET
	public WebAPIResult findByPartyAndType(
			@QueryParam("partyId") @ApiParam(value = "参与者ID", required = true) String partyId,
			@QueryParam("partyType") @ApiParam(value = "参与者类型", required = true) String partyType
			) {
		List<User> userList = userService.findByParty(partyId, partyType);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByRoleId")
	@ApiOperation(value = "根据角色ID获取下属人员列表", notes = "根据角色ID获取下属人员列表")
	@GET
	public WebAPIResult findByRoleId(@QueryParam("roleId") @ApiParam(value = "角色ID", required = true) String roleId
			) {
		List<User> userList = userService.findByRole(roleId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByRoleAlias")
	@ApiOperation(value = "根据角色别名获取下属人员列表", notes = "根据角色别名获取下属人员列表")
	@GET
	public WebAPIResult findByRoleAlias(@QueryParam("roleAlias") @ApiParam(value = "角色别名", required = true) String roleAlias
			) {
		List<User> userList = userService.findByRoleAlias(roleAlias);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findAll")
	@ApiOperation(value = "获取所有人员列表", notes = "获取所有人员列表")
	@GET
	public WebAPIResult findAll() {
		List<User> userList = userService.findAll();
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
	@Path("/findByGroupId")
	@ApiOperation(value = "根据用户组ID获取人员列表", notes = "根据用户组ID获取人员列表")
	@GET
	public WebAPIResult findByGroupId(@QueryParam("groupId") @ApiParam(value = "用户组ID", required = true) String groupId
			) {
		List<User> userList = userService.findByGroupId(groupId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(userList);
		
		return result;
	}
	
}
