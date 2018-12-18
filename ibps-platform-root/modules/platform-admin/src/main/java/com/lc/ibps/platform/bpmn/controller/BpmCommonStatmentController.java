

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
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.repository.BpmCommonStatmentRepository;
import com.lc.ibps.bpmn.service.BpmCommonStatmentService;
import com.lc.ibps.bpmn.persistence.entity.BpmCommonStatmentPo;
import com.lc.ibps.bpmn.domain.BpmCommonStatment;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 常用语 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：zhongjh
 * 邮箱地址：zjh20140614@163.com
 * 创建时间：2017-10-28 10:10:25
 *</pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmCommonStatment/")
public class BpmCommonStatmentController extends GenericController{
	@Resource
	private BpmCommonStatmentRepository bpmCommonStatmentRepository;
	@Resource
	private BpmCommonStatmentService bpmCommonStatmentService;
	
	/**
	 * 【常用语】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		User user = ContextUtil.getCurrentUser();
		queryFilter.addFilter("CREATE_BY_", user.getUserId(), QueryOP.EQUAL);
		PageList<BpmCommonStatmentPo> bpmCommonStatmentList=(PageList<BpmCommonStatmentPo>)bpmCommonStatmentRepository.query(queryFilter);
		return new PageJson(bpmCommonStatmentList);
	}
	
	/**
	 * 编辑【常用语】信息页面
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
		BpmCommonStatmentPo bpmCommonStatment=null;
		if(StringUtil.isNotEmpty(id)){
			bpmCommonStatment=bpmCommonStatmentRepository.get(id);
		}
		return getAutoView().addObject("bpmCommonStatment", bpmCommonStatment).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【常用语】信息页面
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
		BpmCommonStatmentPo bpmCommonStatment=null;
		if(StringUtil.isNotEmpty(id)){
			bpmCommonStatment=bpmCommonStatmentRepository.get(id);
		}
		return getAutoView().addObject("bpmCommonStatment", bpmCommonStatment).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【常用语】明细页面
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
		BpmCommonStatmentPo bpmCommonStatment=null;
		if(StringUtil.isNotEmpty(id)){
			bpmCommonStatment=bpmCommonStatmentRepository.get(id);
		}
		return getAutoView().addObject("bpmCommonStatment", bpmCommonStatment).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【常用语】信息
	 *
	 * @param request
	 * @param response
	 * @param  bpmCommonStatment
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BpmCommonStatmentPo bpmCommonStatmentPo = getFromRequest(request);
			bpmCommonStatmentPo.setCreateBy(ContextUtil.getCurrentUserId());
			String mes = bpmCommonStatmentService.save(bpmCommonStatmentPo);
			message=new ResultMessage(ResultMessage.SUCCESS, mes);
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对常用语操作失败，"+e.getMessage());
			logger.error("对常用语操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BpmCommonStatmentPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BpmCommonStatmentPo bpmCommonStatmentPo = getBpmCommonStatmentPo(jsonObj);

		return bpmCommonStatmentPo;
	}
	
	/** 
	 * 获取常用语数据
	 *
	 * @param jsonObj
	 */
	private BpmCommonStatmentPo getBpmCommonStatmentPo(JSONObject jsonObj){
		BpmCommonStatmentPo bpmCommonStatmentPo = (BpmCommonStatmentPo) JsonUtil.getDTO(jsonObj.toString(), BpmCommonStatmentPo.class);
		return bpmCommonStatmentPo;
	}
	
	
	/**
	 *  批量删除【常用语】记录
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
			BpmCommonStatment bpmCommonStatment =bpmCommonStatmentRepository.newInstance();
			bpmCommonStatment.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除常用语成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除常用语失败，" + e.getMessage());
			logger.error("删除常用语失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("listForSelector")
	public @ResponseBody PageJson listForSelector(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String action = request.getParameter("action");
		String curUser = request.getParameter("curUser");
		if(BeanUtils.isNotEmpty(action)) queryFilter.addParamsFilter("action", action);
		if(BeanUtils.isNotEmpty(curUser)&&"true".equals(curUser)) queryFilter.addFilter("CREATE_BY_", ContextUtil.getCurrentUserId(), QueryOP.EQUAL);
		PageList<BpmCommonStatmentPo> bpmCommonStatmentList=(PageList<BpmCommonStatmentPo>)bpmCommonStatmentRepository.queryIncludeNull(queryFilter);
		return new PageJson(bpmCommonStatmentList);
	} 
	
	/**
	 *  设置默认常用语
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setDefault")
	public void setDefault(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String id = RequestUtil.getString(request, "id");
			if(StringUtil.isEmpty(id)){
				throw new RuntimeException("ID为空,请传入ID!");
			}
			//构造领域对象和保存数据
			BpmCommonStatmentPo po = bpmCommonStatmentRepository.get(id);
			BpmCommonStatment bpmCommonStatment =bpmCommonStatmentRepository.newInstance(po);
			bpmCommonStatment.setDefault();
			message=new ResultMessage(ResultMessage.SUCCESS, "设置默认常用语成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "设置默认常用语失败，" + e.getMessage());
			logger.error("设置默认常用语失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
