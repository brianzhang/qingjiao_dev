package com.lc.ibps.platform.org.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.org.service.IPartyGroupService;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.org.party.persistence.entity.PartyGroupPo;

/**
 * 用户组 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-07 14:21:55
 *</pre>
 */
@Controller
@RequestMapping("/platform/org/partyGroup/")
public class PartyGroupBaseController extends GenericController{
	
	@Resource
	private IPartyGroupService partyGroupService;
	
	/**
	 * 【用户组】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		
		String listData = partyGroupService.query(queryFilter);
		PageList<PartyGroupPo> partyGroupList=null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyGroupPo> list = PartyGroupPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyGroupList = new PageList<PartyGroupPo>(list, pageResult);
		}
		
		return new PageJson(partyGroupList);
	}
	
}
