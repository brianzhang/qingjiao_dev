
package com.lc.ibps.platform.bpmn.controller;

import java.util.List;

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
import com.lc.ibps.bpmn.repository.BpmOperLogRepository;
import com.lc.ibps.bpmn.persistence.entity.BpmOperLogPo;
import com.lc.ibps.bpmn.api.constant.BpmOperTypeEnum;
import com.lc.ibps.bpmn.builder.BpmOperLogBuilder;
import com.lc.ibps.bpmn.domain.BpmOperLog;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 流程操作日志 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-21 11:18:52
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmOperLog/")
public class BpmOperLogController extends GenericController{
	@Resource
	private BpmOperLogRepository bpmOperLogRepository;
	
	/**
	 * 【流程操作日志】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		List<BpmOperTypeEnum> operTypeList = BpmOperTypeEnum.list();
		return getAutoView().addObject("operTypeList", operTypeList);
	}
	
	/**
	 * 【流程操作日志】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BpmOperLogPo> bpmOperLogList=(PageList<BpmOperLogPo>)bpmOperLogRepository.query(queryFilter);
		
		BpmOperLogBuilder.build(bpmOperLogList);
		
		return new PageJson(bpmOperLogList);
	}
	
	/**
	 * 编辑【流程操作日志】信息页面
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
		BpmOperLogPo bpmOperLog=null;
		if(StringUtil.isNotEmpty(id)){
			bpmOperLog=bpmOperLogRepository.get(id);
			BpmOperLogBuilder.build(bpmOperLog);
		}
		return getAutoView().addObject("bpmOperLog", bpmOperLog).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【流程操作日志】信息页面
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
		BpmOperLogPo bpmOperLog=null;
		if(StringUtil.isNotEmpty(id)){
			bpmOperLog=bpmOperLogRepository.get(id);
			BpmOperLogBuilder.build(bpmOperLog);
		}
		return getAutoView().addObject("bpmOperLog", bpmOperLog).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【流程操作日志】明细页面
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
		BpmOperLogPo bpmOperLog=null;
		if(StringUtil.isNotEmpty(id)){
			bpmOperLog=bpmOperLogRepository.get(id);
			BpmOperLogBuilder.build(bpmOperLog);
		}
		return getAutoView().addObject("bpmOperLog", bpmOperLog).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【流程操作日志】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmOperLog
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmOperLogPo bpmOperLogPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmOperLog bpmOperLog =bpmOperLogRepository.newInstance(bpmOperLogPo);
			bpmOperLog.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存流程操作日志成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对流程操作日志操作失败,"+e.getMessage());
			logger.error("对流程操作日志操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmOperLogPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BpmOperLogPo bpmOperLogPo = getBpmOperLogPo(jsonObj);

		return bpmOperLogPo;
	}
	
	/** 
	 * 获取流程操作日志数据
	 *
	 * @param jsonObj
	 */
	private BpmOperLogPo getBpmOperLogPo(JSONObject jsonObj){
		BpmOperLogPo bpmOperLogPo = (BpmOperLogPo) JsonUtil.getDTO(jsonObj.toString(), BpmOperLogPo.class);
		return bpmOperLogPo;
	}
	
	
	/**
	 *  批量删除【流程操作日志】记录
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
			BpmOperLog bpmOperLog =bpmOperLogRepository.newInstance();
			bpmOperLog.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程操作日志成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除流程操作日志失败，" + e.getMessage());
			logger.error("删除流程操作日志失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
