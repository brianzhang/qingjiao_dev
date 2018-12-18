
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
import com.lc.ibps.bpmn.repository.BpmTaskChangeAssignRepository;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskChangeAssignPo;
import com.lc.ibps.bpmn.domain.BpmTaskChangeAssign;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 任务变更候选人 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-11 19:45:11
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmTaskChangeAssign/")
public class BpmTaskChangeAssignController extends GenericController{
	@Resource
	private BpmTaskChangeAssignRepository bpmTaskChangeAssignRepository;
	
	/**
	 * 【任务变更候选人】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BpmTaskChangeAssignPo> bpmTaskChangeAssignList=(PageList<BpmTaskChangeAssignPo>)bpmTaskChangeAssignRepository.query(queryFilter);
		return new PageJson(bpmTaskChangeAssignList);
	}
	
	/**
	 * 编辑【任务变更候选人】信息页面
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
		BpmTaskChangeAssignPo bpmTaskChangeAssign=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTaskChangeAssign=bpmTaskChangeAssignRepository.get(id);
		}
		return getAutoView().addObject("bpmTaskChangeAssign", bpmTaskChangeAssign).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【任务变更候选人】信息页面
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
		BpmTaskChangeAssignPo bpmTaskChangeAssign=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTaskChangeAssign=bpmTaskChangeAssignRepository.get(id);
		}
		return getAutoView().addObject("bpmTaskChangeAssign", bpmTaskChangeAssign).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【任务变更候选人】明细页面
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
		BpmTaskChangeAssignPo bpmTaskChangeAssign=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTaskChangeAssign=bpmTaskChangeAssignRepository.get(id);
		}
		return getAutoView().addObject("bpmTaskChangeAssign", bpmTaskChangeAssign).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【任务变更候选人】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmTaskChangeAssign
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmTaskChangeAssignPo bpmTaskChangeAssignPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmTaskChangeAssign bpmTaskChangeAssign =bpmTaskChangeAssignRepository.newInstance(bpmTaskChangeAssignPo);
			bpmTaskChangeAssign.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存任务变更候选人成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对任务变更候选人操作失败,"+e.getMessage());
			logger.error("对任务变更候选人操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmTaskChangeAssignPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BpmTaskChangeAssignPo bpmTaskChangeAssignPo = getBpmTaskChangeAssignPo(jsonObj);

		return bpmTaskChangeAssignPo;
	}
	
	/** 
	 * 获取任务变更候选人数据
	 *
	 * @param jsonObj
	 */
	private BpmTaskChangeAssignPo getBpmTaskChangeAssignPo(JSONObject jsonObj){
		BpmTaskChangeAssignPo bpmTaskChangeAssignPo = (BpmTaskChangeAssignPo) JsonUtil.getDTO(jsonObj.toString(), BpmTaskChangeAssignPo.class);
		return bpmTaskChangeAssignPo;
	}
	
	
	/**
	 *  批量删除【任务变更候选人】记录
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
			BpmTaskChangeAssign bpmTaskChangeAssign =bpmTaskChangeAssignRepository.newInstance();
			bpmTaskChangeAssign.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除任务变更候选人成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除任务变更候选人失败，" + e.getMessage());
			logger.error("删除任务变更候选人失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
