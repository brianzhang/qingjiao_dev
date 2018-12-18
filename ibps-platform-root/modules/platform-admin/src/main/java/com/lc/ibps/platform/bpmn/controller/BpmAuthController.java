package com.lc.ibps.platform.bpmn.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.repository.BpmAuthRepository;
import com.lc.ibps.common.rights.helper.RightsUtil;
import com.lc.ibps.bpmn.persistence.entity.BpmAuthPo;
import com.lc.ibps.bpmn.domain.BpmAuth;

/**
 * 流程分管授权 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-02-06 15:02:11
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/auth/bpmAuth/")
public class BpmAuthController extends GenericController{
	@Resource
	private BpmAuthRepository bpmAuthRepository;
	
	/**
	 * 【流程分管授权】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BpmAuthPo> bpmAuthList=(PageList<BpmAuthPo>)bpmAuthRepository.queryByFilter(queryFilter);
		return new PageJson(bpmAuthList);
	}
	
	/**
	 * 编辑【流程分管授权】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BpmAuthPo bpmAuth=null;
		if(StringUtil.isNotEmpty(id)){
			bpmAuth=bpmAuthRepository.get(id);
		}
		return getAutoView().addObject("bpmAuth", bpmAuth)
				.addObject("rightsTypes",RightsUtil.getRightsTypeJSON())
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【流程分管授权】明细页面
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
		BpmAuthPo bpmAuth=null;
		if(StringUtil.isNotEmpty(id)){
			bpmAuth=bpmAuthRepository.get(id);
		}
		return getAutoView().addObject("bpmAuth", bpmAuth)
				.addObject("rightsTypes",RightsUtil.getRightsTypeJSON())
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【流程分管授权】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmAuth
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,BpmAuthPo bpmAuthPo) throws Exception{
		ResultMessage message=null;
		try {
			//构造领域对象和保存数据
			BpmAuth bpmAuth =bpmAuthRepository.newInstance(bpmAuthPo);
			bpmAuth.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存流程分管授权成功");
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			message=new ResultMessage(ResultMessage.FAIL, "对流程分管授权操作失败",e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【流程分管授权】记录
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
			BpmAuth bpmAuth =bpmAuthRepository.newInstance();
			bpmAuth .deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程分管授权成功");
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			message=new ResultMessage(ResultMessage.FAIL, "删除流程分管授权失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
