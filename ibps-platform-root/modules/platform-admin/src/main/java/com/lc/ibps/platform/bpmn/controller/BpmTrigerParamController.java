
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
import com.lc.ibps.bpmn.repository.BpmTrigerParamRepository;
import com.lc.ibps.bpmn.persistence.entity.BpmTrigerParamPo;
import com.lc.ibps.bpmn.domain.BpmTrigerParam;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 触发参数 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-23 19:01:24
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmTrigerParam/")
public class BpmTrigerParamController extends GenericController{
	@Resource
	private BpmTrigerParamRepository bpmTrigerParamRepository;
	
	/**
	 * 【触发参数】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BpmTrigerParamPo> bpmTrigerParamList=(PageList<BpmTrigerParamPo>)bpmTrigerParamRepository.query(queryFilter);
		return new PageJson(bpmTrigerParamList);
	}
	
	/**
	 * 编辑【触发参数】信息页面
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
		BpmTrigerParamPo bpmTrigerParam=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTrigerParam=bpmTrigerParamRepository.get(id);
		}
		return getAutoView().addObject("bpmTrigerParam", bpmTrigerParam).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【触发参数】信息页面
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
		BpmTrigerParamPo bpmTrigerParam=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTrigerParam=bpmTrigerParamRepository.get(id);
		}
		return getAutoView().addObject("bpmTrigerParam", bpmTrigerParam).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【触发参数】明细页面
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
		BpmTrigerParamPo bpmTrigerParam=null;
		if(StringUtil.isNotEmpty(id)){
			bpmTrigerParam=bpmTrigerParamRepository.get(id);
		}
		return getAutoView().addObject("bpmTrigerParam", bpmTrigerParam).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【触发参数】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmTrigerParam
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmTrigerParamPo bpmTrigerParamPo = getFromRequest(request);
			//构造领域对象和保存数据
			BpmTrigerParam bpmTrigerParam =bpmTrigerParamRepository.newInstance(bpmTrigerParamPo);
			bpmTrigerParam.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存触发参数成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对触发参数操作失败,"+e.getMessage());
			logger.error("对触发参数操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmTrigerParamPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BpmTrigerParamPo bpmTrigerParamPo = getBpmTrigerParamPo(jsonObj);

		return bpmTrigerParamPo;
	}
	
	/** 
	 * 获取触发参数数据
	 *
	 * @param jsonObj
	 */
	private BpmTrigerParamPo getBpmTrigerParamPo(JSONObject jsonObj){
		BpmTrigerParamPo bpmTrigerParamPo = (BpmTrigerParamPo) JsonUtil.getDTO(jsonObj.toString(), BpmTrigerParamPo.class);
		return bpmTrigerParamPo;
	}
	
	
	/**
	 *  批量删除【触发参数】记录
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
			BpmTrigerParam bpmTrigerParam =bpmTrigerParamRepository.newInstance();
			bpmTrigerParam.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除触发参数成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除触发参数失败，" + e.getMessage());
			logger.error("删除触发参数失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
