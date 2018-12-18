
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
import com.lc.ibps.bpmn.repository.BpmOperNotifyRecerRepository;
import com.lc.ibps.bpmn.persistence.entity.BpmOperNotifyRecerPo;
import com.lc.ibps.bpmn.domain.BpmOperNotifyRecer;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 流程通知接收列表 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-29 21:28:25
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmOperNotifyRecer/")
public class BpmOperNotifyRecerController extends GenericController{
	@Resource
	private BpmOperNotifyRecerRepository bpmOperNotifyRecerRepository;
	
	/**
	 * 【流程通知接收列表】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BpmOperNotifyRecerPo> bpmOperNotifyRecerList=(PageList<BpmOperNotifyRecerPo>)bpmOperNotifyRecerRepository.query(queryFilter);
		return new PageJson(bpmOperNotifyRecerList);
	}
	
	/**
	 * 编辑【流程通知接收列表】信息页面
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
		BpmOperNotifyRecerPo bpmOperNotifyRecer=null;
		if(StringUtil.isNotEmpty(id)){
			bpmOperNotifyRecer=bpmOperNotifyRecerRepository.get(id);
		}
		return getAutoView().addObject("bpmOperNotifyRecer", bpmOperNotifyRecer).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【流程通知接收列表】信息页面
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
		BpmOperNotifyRecerPo bpmOperNotifyRecer=null;
		if(StringUtil.isNotEmpty(id)){
			bpmOperNotifyRecer=bpmOperNotifyRecerRepository.get(id);
		}
		return getAutoView().addObject("bpmOperNotifyRecer", bpmOperNotifyRecer).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【流程通知接收列表】明细页面
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
		BpmOperNotifyRecerPo bpmOperNotifyRecer=null;
		if(StringUtil.isNotEmpty(id)){
			bpmOperNotifyRecer=bpmOperNotifyRecerRepository.get(id);
		}
		return getAutoView().addObject("bpmOperNotifyRecer", bpmOperNotifyRecer).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【流程通知接收列表】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmOperNotifyRecer
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmOperNotifyRecerPo bpmOperNotifyRecerPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmOperNotifyRecer bpmOperNotifyRecer =bpmOperNotifyRecerRepository.newInstance(bpmOperNotifyRecerPo);
			bpmOperNotifyRecer.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存流程通知接收列表成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对流程通知接收列表操作失败,"+e.getMessage());
			logger.error("对流程通知接收列表操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmOperNotifyRecerPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BpmOperNotifyRecerPo bpmOperNotifyRecerPo = getBpmOperNotifyRecerPo(jsonObj);

		return bpmOperNotifyRecerPo;
	}
	
	/** 
	 * 获取流程通知接收列表数据
	 *
	 * @param jsonObj
	 */
	private BpmOperNotifyRecerPo getBpmOperNotifyRecerPo(JSONObject jsonObj){
		BpmOperNotifyRecerPo bpmOperNotifyRecerPo = (BpmOperNotifyRecerPo) JsonUtil.getDTO(jsonObj.toString(), BpmOperNotifyRecerPo.class);
		return bpmOperNotifyRecerPo;
	}
	
	
	/**
	 *  批量删除【流程通知接收列表】记录
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
			BpmOperNotifyRecer bpmOperNotifyRecer =bpmOperNotifyRecerRepository.newInstance();
			bpmOperNotifyRecer.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程通知接收列表成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除流程通知接收列表失败，" + e.getMessage());
			logger.error("删除流程通知接收列表失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
