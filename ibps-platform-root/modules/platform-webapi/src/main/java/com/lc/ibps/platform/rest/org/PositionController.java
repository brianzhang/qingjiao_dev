package com.lc.ibps.platform.rest.org;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.org.service.IPartyPositionService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/** 
 * 岗位服务 控制器，第三方系统调用。
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年9月22日-下午2:47:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/positionService")
@Api(value = "/positionService",description="岗位服务")
@Controller
public class PositionController {

	
	private IPartyPositionService positionService;
	
	public PositionController(){
		positionService = AppUtil.getBean(IPartyPositionService.class);
	}

	@Path("/loadById")
	@ApiOperation(value = "根据ID获取岗位", notes = "根据ID获取岗位")
	@GET
	public WebAPIResult loadById(
			@QueryParam("id") @ApiParam(value = "id", required = true) String id) {
		PartyEntity entity = positionService.getById(id);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	
	@Path("/loadByAlias")
	@ApiOperation(value = "根据别名获取岗位", notes = "根据别名获取岗位")
	@GET
	public WebAPIResult loadByAlias(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		PartyEntity entity = positionService.getByAlias(alias);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	
	@Path("/loadMainPostByUserId")
	@ApiOperation(value = "根据用户ID获取主岗位", notes = "根据用户ID获取主岗位")
	@GET
	public WebAPIResult loadMainPostByUserId(
			@QueryParam("userId") @ApiParam(value = "userId", required = true) String userId) {
		PartyEntity entity = positionService.findMainPostByUserId(userId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	
	@Path("/findAll")
	@ApiOperation(value = "获取岗位列表", notes = "获取岗位列表")
	@GET
	public WebAPIResult findAll() {
		List<PartyEntity> entity = positionService.findAll();
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	
	/*
	@Path("/findByPosRelation")
	@ApiOperation(value = "获取岗位列表", notes = "根据关系获取岗位列表")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@RequestMapping("/findByPosRelation")
	@ResponseBody
	public WebAPIResult findByPosRelation(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias
			,@QueryParam("relTypeKey") @ApiParam(value = "relTypeKey", required = true) String relTypeKey
			,@QueryParam("relPartyName") @ApiParam(value = "relPartyName", required = true) String relPartyName
			,@QueryParam("relLevel") @ApiParam(value = "relLevel", required = false, defaultValue = "1") int relLevel
			,@QueryParam("isRecursion") @ApiParam(value = "isRecursion", required = false, defaultValue = "false") boolean isRecursion
		) {
		List<PartyEntity> entity = positionService.getByPosRelation(alias, relTypeKey, relPartyName, relLevel, isRecursion);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	*/
	
	@Path("/findByUserRelation")
	@ApiOperation(value = "根据用户关系获取岗位列表", notes = "根据用户关系获取岗位列表")
	@GET
	public WebAPIResult findByUserRelation(
			@QueryParam("account") @ApiParam(value = "account", required = true) String account,
			@QueryParam("relTypeKey") @ApiParam(value = "relTypeKey", required = true) String relTypeKey
		) {
		List<PartyEntity> entity = positionService.getByUserRelation(account, relTypeKey);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	
/*	@Path("/findByAttrKeyValue")
	@ApiOperation(value = "根据属性获取岗位列表", notes = "根据属性获取岗位列表")
	@GET
	public WebAPIResult findByAttrKeyValue(
			@QueryParam("key") @ApiParam(value = "key", required = true) String key
			,@QueryParam("value") @ApiParam(value = "value", required = true) Object value
		) {
		List<PartyEntity> entity = positionService.getByAttrKeyValue(key, value);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}*/
	
	@Path("/findByUserAccount")
	@ApiOperation(value = "根据用户账号获取岗位列表", notes = "根据用户账号获取岗位列表")
	@GET
	public WebAPIResult findByUserAccount(
			@QueryParam("account") @ApiParam(value = "account", required = true) String account
		) {
		List<PartyEntity> entity = positionService.getByUserAccount(account);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	
	@Path("/findByUserId")
	@ApiOperation(value = "根据用户ID获取岗位列表", notes = "根据用户ID获取岗位列表")
	@GET
	public WebAPIResult findByUserId(
			@QueryParam("userId") @ApiParam(value = "userId", required = true) String userId
		) {
		List<PartyEntity> entity = positionService.getByUserId(userId);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	
	@Path("/findByPosRel")
	@ApiOperation(value = "根据岗位关系获取岗位列表", notes = "根据岗位关系获取岗位列表")
	@GET
	public WebAPIResult findByPosRel(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias,
			@QueryParam("relTypeKey") @ApiParam(value = "relTypeKey", required = true) String relTypeKey,
			@QueryParam("relPartyName") @ApiParam(value = "relPartyName", required = true) String relPartyName
		) {
		List<PartyEntity> entity = positionService.findByPosRel(alias, relTypeKey, relPartyName);
		
		WebAPIResult result = new WebAPIResult();
		result.setData(entity);
		
		return result;
	}
	
	@Path("/findByParentId")
	@ApiOperation(value = "根据父节点ID获取子岗位列表", notes = "根据父节点ID获取子岗位列表")
	@GET
	public WebAPIResult findByParentId(@QueryParam("parentId") @ApiParam(value = "父节点ID", required = true) String parentId){
		List<PartyEntity> entity = positionService.findByParentId(parentId);
		
		WebAPIResult result = new WebAPIResult();
		
		result.setData(entity);
		return result;
	}
	
}
