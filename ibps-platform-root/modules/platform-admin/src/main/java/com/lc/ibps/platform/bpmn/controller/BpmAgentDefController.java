
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
import com.lc.ibps.bpmn.repository.BpmAgentDefRepository;
import com.lc.ibps.bpmn.persistence.entity.BpmAgentDefPo;
import com.lc.ibps.bpmn.domain.BpmAgentDef;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 流程代理定义 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-30 17:29:14
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmAgentDef/")
public class BpmAgentDefController extends GenericController{
	@Resource
	private BpmAgentDefRepository bpmAgentDefRepository;
	
	/**
	 * 【流程代理定义】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BpmAgentDefPo> bpmAgentDefList=(PageList<BpmAgentDefPo>)bpmAgentDefRepository.query(queryFilter);
		return new PageJson(bpmAgentDefList);
	}
	
	/**
	 * 编辑【流程代理定义】信息页面
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
		BpmAgentDefPo bpmAgentDef=null;
		if(StringUtil.isNotEmpty(id)){
			bpmAgentDef=bpmAgentDefRepository.get(id);
		}
		return getAutoView().addObject("bpmAgentDef", bpmAgentDef).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【流程代理定义】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BpmAgentDefPo bpmAgentDef=null;
		if(StringUtil.isNotEmpty(id)){
			bpmAgentDef=bpmAgentDefRepository.get(id);
		}
		return getAutoView().addObject("bpmAgentDef", bpmAgentDef).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【流程代理定义】明细页面
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
		BpmAgentDefPo bpmAgentDef=null;
		if(StringUtil.isNotEmpty(id)){
			bpmAgentDef=bpmAgentDefRepository.get(id);
		}
		return getAutoView().addObject("bpmAgentDef", bpmAgentDef).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【流程代理定义】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmAgentDef
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmAgentDefPo bpmAgentDefPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmAgentDef bpmAgentDef =bpmAgentDefRepository.newInstance(bpmAgentDefPo);
			bpmAgentDef.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存流程代理定义成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对流程代理定义操作失败,"+e.getMessage());
			logger.error("对流程代理定义操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmAgentDefPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BpmAgentDefPo bpmAgentDefPo = getBpmAgentDefPo(jsonObj);

		return bpmAgentDefPo;
	}
	
	/** 
	 * 获取流程代理定义数据
	 *
	 * @param jsonObj
	 */
	private BpmAgentDefPo getBpmAgentDefPo(JSONObject jsonObj){
		BpmAgentDefPo bpmAgentDefPo = (BpmAgentDefPo) JsonUtil.getDTO(jsonObj.toString(), BpmAgentDefPo.class);
		return bpmAgentDefPo;
	}
	
	
	/**
	 *  批量删除【流程代理定义】记录
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
			BpmAgentDef bpmAgentDef =bpmAgentDefRepository.newInstance();
			bpmAgentDef.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程代理定义成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除流程代理定义失败，" + e.getMessage());
			logger.error("删除流程代理定义失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
