package com.lc.ibps.platform.org.controller;


import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityTreePo;

/**
* 参与者  控制器类。
*
* <pre> 
* 构建组：ibps-org-biz
* 作者：huangchunyan
* 邮箱：3378340995@qq.com
* 日期：2016-06-20 09:08:11
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/org/partyEntity/")
public class PartyEntityBaseController extends GenericController{
	@Resource
	private IPartyEntityService partyEntityService;
	
	/**
	 * 参与者列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.listJson()"
				+ "--->"
				+ "params="+queryFilter.getParams()
				);
		
		String listData = partyEntityService.query(queryFilter);
		PageList<PartyEntityPo> partyEntitList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyEntityPo> list = PartyEntityPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			partyEntitList = new PageList<PartyEntityPo>(list, pageResult);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.listJson()"
				+ "--->"
				+ "partyEntityList="+(partyEntitList!=null?Arrays.toString(partyEntitList.toArray()):"")
				);
		
		return new PageJson(partyEntitList);
	}
	
	/**
	 * 
	 * 参与者左树数据展示
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<PartyEntityTreePo> getTreeData(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String type=RequestUtil.getString(request, "type");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.getTreeData()"
				+ "--->"
				+ "type="+type
				);
		
		List<PartyEntityTreePo> groupTreeList = null;
		String data = partyEntityService.findTreeByTypeJson(type);
		if(JacksonUtil.isJsonArray(data)){
			groupTreeList = JacksonUtil.getDTOList(data, PartyEntityTreePo.class);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyEntityController.getTreeData()"
				+ "--->"
				+ "groupTreeList"+(groupTreeList!=null?Arrays.toString(groupTreeList.toArray()):"")
				);
		
		return groupTreeList;
	}
	
}
