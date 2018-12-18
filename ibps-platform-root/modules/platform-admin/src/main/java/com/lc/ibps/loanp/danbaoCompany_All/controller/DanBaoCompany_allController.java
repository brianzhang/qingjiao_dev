
package com.lc.ibps.loanp.danbaoCompany_All.controller;

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
import com.lc.ibps.loans.danbaoCompany_All.repository.DanBaoCompany_allRepository;
import com.lc.ibps.loans.danbaoCompany_All.persistence.entity.DanBaoCompany_allPo;
import com.lc.ibps.loans.bzrAll.persistence.entity.BaoZhengRenAllPo;
import com.lc.ibps.loans.danbaoCompany_All.domain.DanBaoCompany_all;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_danbaocompany_all 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：liato
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 21:33:29
 *</pre>
 */
@Controller
@RequestMapping("/loanp/danbaoCompany_All/danBaoCompany_all/")
public class DanBaoCompany_allController extends GenericController{
	@Resource
	DanBaoCompany_allRepository danBaoCompany_allRepository;
	
	/**
	 * 【t_danbaocompany_all】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String referer = request.getHeader("referer");
		String jdid = referer.split("jdid=")[1];
		
		System.out.println("**********> jdid listjson :"+jdid);
		PageList<DanBaoCompany_allPo> danBaoCompany_allList=(PageList<DanBaoCompany_allPo>)danBaoCompany_allRepository.query(queryFilter);
		PageList<DanBaoCompany_allPo> danBaoCompany_allList1=new PageList<>();
		for(DanBaoCompany_allPo  danBaoCompany_allPo : danBaoCompany_allList){
			//System.out.println(danBaoCompany_allPo.getJdid());
            if(danBaoCompany_allPo.getJdid().equals(jdid)){
            	danBaoCompany_allList1 .add(danBaoCompany_allPo);
            }
}
		return new PageJson(danBaoCompany_allList1);
	}
	
	/**
	 * 请求list界面
	 * lgw
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{  
		String jdid=RequestUtil.getString(request, "jdid");  
		System.out.println("**********> jdid list:"+jdid); 
		return getAutoView().addObject("jdid", jdid);
	}
	
	/**
	 * 编辑【t_danbaocompany_all】信息页面
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
		String jdid=RequestUtil.getString(request, "jdid");
		System.out.println("-------------->edit"+jdid);
		DanBaoCompany_allPo danBaoCompany_all=null;
		if(StringUtil.isNotEmpty(id)){
			danBaoCompany_all=danBaoCompany_allRepository.get(id);
		}
		return getAutoView().addObject("danBaoCompany_all", danBaoCompany_all).addObject("returnUrl", preUrl).addObject("jdid",jdid);
	}
	
	/**
	 * 编辑【t_danbaocompany_all】信息页面
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
		DanBaoCompany_allPo danBaoCompany_all=null;
		if(StringUtil.isNotEmpty(id)){
			danBaoCompany_all=danBaoCompany_allRepository.get(id);
		}
		return getAutoView().addObject("danBaoCompany_all", danBaoCompany_all).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_danbaocompany_all】明细页面
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
		DanBaoCompany_allPo danBaoCompany_all=null;
		if(StringUtil.isNotEmpty(id)){
			danBaoCompany_all=danBaoCompany_allRepository.get(id);
		}
		return getAutoView().addObject("danBaoCompany_all", danBaoCompany_all).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_danbaocompany_all】信息
	 *
	 * @param request
	 * @param response
	 * @param  danBaoCompany_all
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String jdid = RequestUtil.getString(request, "jdid");
		System.out.println("+++++++++++++> save"+jdid);
		try {
			DanBaoCompany_allPo danBaoCompany_allPo = getFromRequest(request);
			danBaoCompany_allPo.setJdid(jdid);
			//构造领域对象和保存数据
			DanBaoCompany_all danBaoCompany_all =danBaoCompany_allRepository.newInstance(danBaoCompany_allPo);
			danBaoCompany_all.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功"+"@"+jdid);
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DanBaoCompany_allPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DanBaoCompany_allPo danBaoCompany_allPo = getDanBaoCompany_allPo(jsonObj);

		return danBaoCompany_allPo;
	}
	
	/** 
	 * 获取t_danbaocompany_all数据
	 *
	 * @param jsonObj
	 */
	private DanBaoCompany_allPo getDanBaoCompany_allPo(JSONObject jsonObj){
		DanBaoCompany_allPo danBaoCompany_allPo = (DanBaoCompany_allPo) JsonUtil.getDTO(jsonObj.toString(), DanBaoCompany_allPo.class);
		return danBaoCompany_allPo;
	}
	
	
	/**
	 *  批量删除【t_danbaocompany_all】记录
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
			DanBaoCompany_all danBaoCompany_all =danBaoCompany_allRepository.newInstance();
			danBaoCompany_all.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除l失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
