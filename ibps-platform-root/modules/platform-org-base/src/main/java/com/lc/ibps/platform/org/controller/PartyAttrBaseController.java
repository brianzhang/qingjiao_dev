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
import com.lc.ibps.api.org.service.IPartyAttrQueryService;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.org.party.persistence.entity.PartyAttrPo;

/** 参与者属性扩展 控制器
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年8月18日-下午4:06:07
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/org/partyAttr/")
public class PartyAttrBaseController extends GenericController{

	@Resource
	private IPartyAttrQueryService partyAttrQueryService;
	
	/**
	 * 
	 * 参与者属性扩展列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyAttrController.listJson()"
					+"--->params="+queryFilter.getParams()
				);
		
		String listData = partyAttrQueryService.query(queryFilter);
		PageList<PartyAttrPo> attributeList=null;
		if(JacksonUtil.isJsonObject(listData)){
			List<PartyAttrPo> result = JacksonUtil.getDTOList(JacksonUtil.getString(listData, "data"), PartyAttrPo.class);
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			attributeList = new PageList<PartyAttrPo>(result, pageResult);
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyAttrController.listJson()"
				+"--->attributeList="+(attributeList!=null?Arrays.toString(attributeList.toArray()):"")
			);
		
		return new PageJson(attributeList);
	}
	
}
