
package com.lc.ibps.loanp.apply.controller;

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
import com.lc.ibps.loans.apply.repository.ApplyMoneyRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.loans.apply.persistence.entity.ApplyMoneyPo;
import com.lc.ibps.loans.apply.domain.ApplyMoney;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_jiedai 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:37:03
 *</pre>
 */
@Controller
@RequestMapping("/loanp/apply/applyMoney/")
public class ApplyMoneyController extends GenericController{
	@Resource
	ApplyMoneyRepository applyMoneyRepository;
	@Resource
	XinDaiLiuChengRepository xinDaiLiuChengRepository;
	/**
	 * 【t_jiedai】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ApplyMoneyPo> applyMoneyList=(PageList<ApplyMoneyPo>)applyMoneyRepository.query(queryFilter);
		return new PageJson(applyMoneyList);
	}
	
	/**
	 * 编辑【t_jiedai】信息页面
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
		ApplyMoneyPo applyMoney=null;
		if(StringUtil.isNotEmpty(id)){
			applyMoney=applyMoneyRepository.get(id);
		}
		return getAutoView().addObject("applyMoney", applyMoney).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_jiedai】信息页面
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
		ApplyMoneyPo applyMoney=null;
		if(StringUtil.isNotEmpty(id)){
			applyMoney=applyMoneyRepository.get(id);
		}
		return getAutoView().addObject("applyMoney", applyMoney).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_jiedai】明细页面
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
		ApplyMoneyPo applyMoney=null;
		if(StringUtil.isNotEmpty(id)){
			applyMoney=applyMoneyRepository.get(id);
		}
		return getAutoView().addObject("applyMoney", applyMoney).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_jiedai】信息
	 *
	 * @param request
	 * @param response
	 * @param  applyMoney
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ApplyMoneyPo applyMoneyPo = getFromRequest(request);
			//构造领域对象和保存数据
			ApplyMoney applyMoney =applyMoneyRepository.newInstance(applyMoneyPo);
			applyMoney.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL,"操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ApplyMoneyPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ApplyMoneyPo applyMoneyPo = getApplyMoneyPo(jsonObj);

		return applyMoneyPo;
	}
	
	/** 
	 * 获取t_jiedai数据
	 *
	 * @param jsonObj
	 */
	private ApplyMoneyPo getApplyMoneyPo(JSONObject jsonObj){
		ApplyMoneyPo applyMoneyPo = (ApplyMoneyPo) JsonUtil.getDTO(jsonObj.toString(), ApplyMoneyPo.class);
		return applyMoneyPo;
	}
	
	
	/**
	 *  批量删除【t_jiedai】记录
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
			ApplyMoney applyMoney =applyMoneyRepository.newInstance();
			applyMoney.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("startFlow")
	public void startFlow(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String id = RequestUtil.getString(request, "id");
			String flowKey = RequestUtil.getString(request, "flowKey");
			System.out.println("=============>"+flowKey);
			//构造领域对象和保存数据
			ApplyMoney applyMoney=applyMoneyRepository.newInstance();
			applyMoney.startFlow(flowKey,id);//启动流程
			message=new ResultMessage(ResultMessage.SUCCESS, "审核流程启动成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "审核流程启动失败，" + e.getMessage());
			logger.error("审核流程启动失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
