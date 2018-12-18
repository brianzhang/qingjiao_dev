package com.lc.ibps.platform.rest.system;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.common.system.persistence.entity.NewsPo;
import com.lc.ibps.common.system.service.INewsRightsService;
import com.lc.ibps.common.system.service.INewsService;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

import net.sf.json.JSONObject;

@Path("/webapi/newsService")
@Api(value = "/newsService", description = "公告服务")
@Controller
public class NewsController {

	private IPartyUserService userService;
	
	private INewsService newsService;
	
	private INewsRightsService newsRightsService;
	
	private IPartyEntityService entityService;
	
	private IPartyEmployeeService employeeService;

	public NewsController() {
		userService = AppUtil.getBean(IPartyUserService.class);
		newsService = AppUtil.getBean(INewsService.class);
		newsRightsService = AppUtil.getBean(INewsRightsService.class);
		entityService = AppUtil.getBean(IPartyEntityService.class);
		employeeService = AppUtil.getBean(IPartyEmployeeService.class);
	}

	@Path("/list")
	@ApiOperation(value = "公告列表", notes = "公告列表")
	@GET
	public WebAPIResult newsList(@QueryParam("account") @ApiParam(value = "用户账号", required = true) String account,
			@QueryParam("page") @ApiParam(value = "页码", required = false, defaultValue = "1") String page,
			@QueryParam("limit") @ApiParam(value = "页容量", required = false, defaultValue = "15") String limit) {
		WebAPIResult result = new WebAPIResult();
		DefaultPage pg = new DefaultPage(Integer.parseInt(page), Integer.parseInt(limit));
		Map<String, String> pm = new HashMap<String, String>();
		newsService.updateStatus();
		User user = userService.getByAccount(account);
		boolean isSuper = user.isSuper();
		if (!isSuper) {
			PartyEmployeePo employee = (PartyEmployeePo) employeeService.getById(user.getUserId());

			if (StringUtil.isNotEmpty(employee.getGroupID())) {
				PartyEntityPo org = (PartyEntityPo) entityService.getById(employee.getGroupID());
				String newsIdStr = newsRightsService.getNewsIdStr(org.getId());
				if (StringUtil.isNotEmpty(newsIdStr)) {
					pm.put("ids", newsIdStr);
				}
			}
			pm.put("isPublic", "isPublic");
		}

		List<NewsPo> list = newsService.findByIdAndPublic(pm, pg);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取公告列表");
		result.setData(list);
		return result;
	}

	@Path("/getNews")
	@ApiOperation(value = "公告信息", notes = "详细公告信息")
	@GET
	public WebAPIResult getNews(@QueryParam("id") @ApiParam(value = "公告ID", required = true) String id) {
		WebAPIResult result = new WebAPIResult();
		NewsPo po = newsService.get(id);
		result.setData(po);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功获取公告信息");
		return result;
	}

	@Path("/removeNews")
	@ApiOperation(value = "删除公告", notes = "多个ID用,隔开")
	@DELETE
	public WebAPIResult removeNews(@QueryParam("id") @ApiParam(value = "公告ID", required = true) String id) {
		WebAPIResult result = new WebAPIResult();
		if (BeanUtils.isEmpty(id)) {
			result.setResult(WebAPIResult.FAIL);
			result.setMessage("删除公告失败");
			result.setCause("参数为空");
			return result;
		}
		newsService.remove(id.split(","));
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("成功删除公告");
		return result;
	}

	@Path("/saveNews")
	@ApiOperation(value = "保存公告", notes = "保存公告")
	@POST
	public WebAPIResult saveNews(@FormParam("newsJson") @ApiParam(value = "新闻信息", required = true) String newsJson) {
		WebAPIResult result = new WebAPIResult();
		try {
			JSONObject obj = JSONObject.fromObject(newsJson);
			NewsPo po = (NewsPo) JSONObject.toBean(obj, NewsPo.class);
			newsService.save(po);
			String newsId = po.getId();
			String deptIdStr = po.getDepId();
			newsRightsService.saveNewsRights(deptIdStr, newsId);
			result.setResult(WebAPIResult.SUCCESS);
			result.setMessage("保存公告成功");
		} catch (Exception e) {
			result.setCause(e.getMessage());
			result.setResult(WebAPIResult.FAIL);
			result.setMessage("保存公告失败");
		}
		return result;
	}
	

}
