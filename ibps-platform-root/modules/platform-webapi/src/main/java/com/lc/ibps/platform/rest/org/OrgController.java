package com.lc.ibps.platform.rest.org;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.org.service.IPartyOrgService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/**
 * 组织服务 控制器，第三方系统调用。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-webapi
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年9月22日-下午2:47:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/orgService")
@Api(value = "/orgService",description="组织服务")
@Controller
public class OrgController {

	
	private IPartyOrgService orgService;
	
	public OrgController(){
		orgService = AppUtil.getBean(IPartyOrgService.class);
	}

	@Path("/loadById")
	@ApiOperation(value = "根据ID获取组织", notes = "根据ID获取组织")
	@GET
	public WebAPIResult loadById(@QueryParam("id") @ApiParam(value = "id", required = true) String id) {
		PartyEntity entity = orgService.getById(id);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/loadByAlias")
	@ApiOperation(value = "根据别名获取组织", notes = "根据别名获取组织")
	@GET
	public WebAPIResult loadByAlias(@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		PartyEntity entity = orgService.getByAlias(alias);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/loadDirectParent")
	@ApiOperation(value = "根据别名获取直接父级组织", notes = "根据别名获取直接父级组织")
	@GET
	public WebAPIResult loadDirectParent(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		PartyEntity entity = orgService.getDirectParent(alias);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findParents")
	@ApiOperation(value = "根据别名获取父级组织列表", notes = "根据别名获取父级组织列表")
	@GET
	public WebAPIResult findParents(@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		List<PartyEntity> entity = orgService.findParents(alias);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findChildren")
	@ApiOperation(value = "根据别名获取下属组织列表", notes = "根据别名获取下属组织列表")
	@GET
	public WebAPIResult findChildren(@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias,
			@QueryParam("descendants") @ApiParam(value = "descendants", required = false, defaultValue = "false") boolean descendants) {
		List<PartyEntity> entity = orgService.findChildren(alias, descendants);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findByOrgRelation")
	@ApiOperation(value = "根据组织关系获取组织列表", notes = "根据组织关系获取组织列表")
	@GET
	public WebAPIResult findByOrgRelation(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias,
			@QueryParam("relTypeKey") @ApiParam(value = "relTypeKey", required = true) String relTypeKey,
			@QueryParam("relPartyName") @ApiParam(value = "relPartyName", required = true) String relPartyName,
			@QueryParam("relLevel") @ApiParam(value = "relLevel", required = false, defaultValue = "1") int relLevel,
			@QueryParam("isRecursion") @ApiParam(value = "isRecursion", required = false, defaultValue = "false") boolean isRecursion) {
		List<PartyEntity> entity = orgService.findByOrgRelation(alias, relTypeKey, relPartyName, relLevel, isRecursion);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findByUserRelation")
	@ApiOperation(value = "根据用户关系获取组织列表", notes = "根据用户关系获取组织列表")
	@GET
	public WebAPIResult findByUserRelation(
			@QueryParam("account") @ApiParam(value = "account", required = true) String account,
			@QueryParam("relTypeKey") @ApiParam(value = "relTypeKey", required = true) String relTypeKey) {
		List<PartyEntity> entity = orgService.findByUserRelation(account, relTypeKey);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findByAttrKeyValue")
	@ApiOperation(value = "根据扩展属性获取组织列表", notes = "根据扩展属性获取组织列表")
	@GET
	public WebAPIResult findByAttrKeyValue(
			@QueryParam("account") @ApiParam(value = "account", required = true) String account,
			@QueryParam("relTypeKey") @ApiParam(value = "relTypeKey", required = true) String relTypeKey) {
		List<PartyEntity> entity = orgService.findByAttrKeyValue(account, relTypeKey);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findByUserAccount")
	@ApiOperation(value = "根据用户账号获取组织列表", notes = "根据用户账号获取组织列表")
	@GET
	public WebAPIResult findByUserAccount(
			@QueryParam("account") @ApiParam(value = "account", required = true) String account) {
		List<PartyEntity> entity = orgService.findByUserAccount(account);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findByUserId")
	@ApiOperation(value = "根据用户ID获取组织列表", notes = "根据用户ID获取组织列表")
	@GET
	public WebAPIResult findByUserId(
			@QueryParam("userId") @ApiParam(value = "userId", required = true) String userId) {
		List<PartyEntity> entity = orgService.findByUserId(userId);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findByOrgRel")
	@ApiOperation(value = "根据组织关系获取组织列表", notes = "根据组织关系获取组织列表")
	@GET
	public WebAPIResult findByOrgRel(@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias,
			@QueryParam("relTypeKey") @ApiParam(value = "relTypeKey", required = true) String relTypeKey,
			@QueryParam("relPartyName") @ApiParam(value = "relPartyName", required = true) String relPartyName) {
		List<PartyEntity> entity = orgService.findByOrgRel(alias, relTypeKey, relPartyName);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findAll")
	@ApiOperation(value = "获取所有组织列表", notes = "获取所有组织列表")
	@GET
	public WebAPIResult findAll() {
		List<PartyEntity> entity = orgService.findAll();

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/queryByParentId")
	@ApiOperation(value = "根据父ID获取组织列表", notes = "根据父ID获取组织列表")
	@GET
	public WebAPIResult queryByParentId(
			@QueryParam("parentId") @ApiParam(value = "parentId", required = true) String parentId,
			@QueryParam("page") @ApiParam(value = "page", required = false, defaultValue = "1") int page,
			@QueryParam("limit") @ApiParam(value = "limit", required = false, defaultValue = "20") int limit) {
		List<PartyEntity> entity = orgService.queryByParentId(parentId, new DefaultPage(page, limit));

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findByParentId")
	@ApiOperation(value = "根据父ID获取组织列表", notes = "根据父ID获取组织列表")
	@GET
	public WebAPIResult findByParentId(
			@QueryParam("parentId") @ApiParam(value = "父节点ID", required = true) String parentId) {
		List<PartyEntity> entity = orgService.findByParentId(parentId);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findSubByParentId")
	@ApiOperation(value = "根据父ID获取所有下属组织列表", notes = "根据父ID获取所有下属组织列表")
	@GET
	public WebAPIResult findSubByParentId(
			@QueryParam("parentId") @ApiParam(value = "parentId", required = true) String parentId) {
		List<PartyEntity> entity = orgService.findSubByParentId(parentId);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findWithSelfByParentId")
	@ApiOperation(value = "根据父ID获取下属组织列表", notes = "根据父ID获取下属组织列表")
	@GET
	public WebAPIResult findWithSelfByParentId(
			@QueryParam("parentId") @ApiParam(value = "parentId", required = true) String parentId) {
		List<PartyEntity> entity = orgService.findWithSelfByParentId(parentId);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findSubWithSelfByParentId")
	@ApiOperation(value = "根据父ID获取下属组织列表", notes = "根据父ID获取下属组织列表")
	@GET
	public WebAPIResult findSubWithSelfByParentId(
			@QueryParam("parentId") @ApiParam(value = "parentId", required = true) String parentId) {
		List<PartyEntity> entity = orgService.findSubWithSelfByParentId(parentId);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/queryByAlias")
	@ApiOperation(value = "根据别名获取下属组织列表", notes = "根据别名获取下属组织列表")
	@GET
	public WebAPIResult queryByAlias(@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias,
			@QueryParam("page") @ApiParam(value = "page", required = false, defaultValue = "1") int page,
			@QueryParam("limit") @ApiParam(value = "limit", required = false, defaultValue = "20") int limit) {
		List<PartyEntity> entity = orgService.queryByAlias(alias, new DefaultPage(page, limit));

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findByAlias")
	@ApiOperation(value = "根据别名获取下属组织列表", notes = "根据别名获取下属组织列表")
	@GET
	public WebAPIResult findByAlias(@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		List<PartyEntity> entity = orgService.findByAlias(alias);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findSubByAlias")
	@ApiOperation(value = "根据别名获取所有下属组织列表", notes = "根据别名获取所有下属组织列表")
	@GET
	public WebAPIResult findSubByAlias(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		List<PartyEntity> entity = orgService.findSubByAlias(alias);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findWithSelfByAlias")
	@ApiOperation(value = "根据别名获取所有下属组织列表", notes = "根据别名获取所有下属组织列表")
	@GET
	public WebAPIResult findWithSelfByAlias(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		List<PartyEntity> entity = orgService.findWithSelfByAlias(alias);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

	@Path("/findSubWithSelfByAlias")
	@ApiOperation(value = "根据别名获取所有下属组织列表", notes = "根据别名获取所有下属组织列表")
	@GET
	public WebAPIResult findSubWithSelfByAlias(
			@QueryParam("alias") @ApiParam(value = "alias", required = true) String alias) {
		List<PartyEntity> entity = orgService.findSubWithSelfByAlias(alias);

		WebAPIResult result = new WebAPIResult();
		result.setData(entity);

		return result;
	}

}
