
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
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.repository.BpmOperNotifyRepository;
import com.lc.ibps.platform.bpmn.builder.BpmOperNotifyBuilder;
import com.lc.ibps.bpmn.persistence.entity.BpmOperNotifyPo;
import com.lc.ibps.bpmn.persistence.entity.BpmOperNotifyRecerPo;
import com.lc.ibps.bpmn.domain.BpmOperNotify;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;

import java.util.List;

/**
 * 流程通知 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-29 21:28:25
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmOperNotify/")
public class BpmOperNotifyController extends GenericController{
	@Resource
	private BpmOperNotifyRepository bpmOperNotifyRepository;
	
	/**
	 * 【流程通知】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		queryFilter.addParamsFilter("cuser", ContextUtil.getCurrentUserId());
		PageList<BpmOperNotifyPo> bpmOperNotifyList=(PageList<BpmOperNotifyPo>)bpmOperNotifyRepository.query(queryFilter);
		BpmOperNotifyBuilder.build(bpmOperNotifyList);
		return new PageJson(bpmOperNotifyList);
	}
	
	/**
	 * 编辑【流程通知】信息页面
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
		BpmOperNotifyPo bpmOperNotify=null;
		if(StringUtil.isNotEmpty(id)){
			bpmOperNotify=bpmOperNotifyRepository.loadCascade(id);
		}
		return getAutoView().addObject("bpmOperNotify", bpmOperNotify).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【流程通知】信息页面
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
		BpmOperNotifyPo bpmOperNotify=null;
		if(StringUtil.isNotEmpty(id)){
			bpmOperNotify=bpmOperNotifyRepository.loadCascade(id);
		}
		
		return getAutoView().addObject("bpmOperNotify", bpmOperNotify).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【流程通知】明细页面
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
		boolean show=RequestUtil.getBoolean(request, "show", true);
		BpmOperNotifyPo bpmOperNotify=null;
		if(StringUtil.isNotEmpty(id)){
			if(show){
				bpmOperNotify=bpmOperNotifyRepository.loadCascade(id);
			}else{
				bpmOperNotify=bpmOperNotifyRepository.get(id);
			}
			BpmOperNotify bpmOperNotifyDomain = bpmOperNotifyRepository.newInstance();
			bpmOperNotifyDomain.read(id);
		}
		BpmOperNotifyBuilder.build(bpmOperNotify);
		
		return getAutoView().addObject("bpmOperNotify", bpmOperNotify).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【流程通知】标记已读
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("readAll")
	public void readAll(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] ids=RequestUtil.getStringAryByStr(request, "ids");
			BpmOperNotify bpmOperNotifyDomain = bpmOperNotifyRepository.newInstance();
			bpmOperNotifyDomain.read(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "流程通知标记已读成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对流程通知标记已读失败,"+e.getMessage());
			logger.error("对流程通知标记已读失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 保存【流程通知】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmOperNotify
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmOperNotifyPo bpmOperNotifyPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmOperNotify bpmOperNotify =bpmOperNotifyRepository.newInstance(bpmOperNotifyPo);
			bpmOperNotify.saveCascade();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存流程通知成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对流程通知操作失败,"+e.getMessage());
			logger.error("对流程通知操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmOperNotifyPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		List<BpmOperNotifyRecerPo> bpmOperNotifyRecerPoList = getBpmOperNotifyRecerPoList(jsonObj);
		BpmOperNotifyPo bpmOperNotifyPo = getBpmOperNotifyPo(jsonObj);
		bpmOperNotifyPo.setBpmOperNotifyRecerPoList(bpmOperNotifyRecerPoList);

		return bpmOperNotifyPo;
	}
	
	/** 
	 * 获取流程通知数据
	 *
	 * @param jsonObj
	 */
	private BpmOperNotifyPo getBpmOperNotifyPo(JSONObject jsonObj){
		BpmOperNotifyPo bpmOperNotifyPo = (BpmOperNotifyPo) JsonUtil.getDTO(jsonObj.toString(), BpmOperNotifyPo.class);
		return bpmOperNotifyPo;
	}
	
	/** 
	 * 获取流程通知接收列表数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<BpmOperNotifyRecerPo> getBpmOperNotifyRecerPoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("bpmOperNotifyRecerPoList")){
			return null;
		}
		
		List<BpmOperNotifyRecerPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("bpmOperNotifyRecerPoList").toString(), 
													BpmOperNotifyRecerPo.class);
		jsonObj.discard("bpmOperNotifyRecerPoList");
		return rs;
	}
	
	/**
	 *  批量删除【流程通知】记录
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
			BpmOperNotify bpmOperNotify =bpmOperNotifyRepository.newInstance();
			bpmOperNotify.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程通知成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除流程通知失败，" + e.getMessage());
			logger.error("删除流程通知失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
