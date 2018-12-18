
package com.lc.ibps.platform.org.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
//import com.lc.ibps.test.demo.domain.RegData;
//import com.lc.ibps.test.demo.persistence.entity.RegDataPo;
//import com.lc.ibps.test.demo.repository.RegDataRepository;
import com.lc.ibps.register.domain.RegData;
import com.lc.ibps.register.persistence.entity.RegDataPo;
import com.lc.ibps.register.repository.RegDataRepository;


/**
 * 用户注册信息 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 20:21:43
 *</pre>
 */
@Controller
@RequestMapping("/platform/org/regData/")
public class RegDataController extends GenericController{
	@Resource
	private RegDataRepository regDataRepository;
	
	/**
	 * 【用户注册信息】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<RegDataPo> regDataList=(PageList<RegDataPo>)regDataRepository.query(queryFilter);
		return new PageJson(regDataList);
	}
	
	/**
	 * 【用户注册信息】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		RegDataPo regData=null;
		if(StringUtil.isNotEmpty(id)){
			regData=regDataRepository.get(id);
		}
		return getAutoView().addObject("regData", regData).addObject("returnUrl", preUrl);
	}

	/**
	 *  批量删除【用户注册信息】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			RegData regData =regDataRepository.newInstance();
			regData.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除用户注册信息成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除用户注册信息失败，" + e.getMessage());
			logger.error("删除用户注册信息失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
}
