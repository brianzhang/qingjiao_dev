
package com.lc.ibps.loanp.danBaoCompany.controller;

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
import com.lc.ibps.loans.danBaoCompany.repository.DanBaoCompanyInfoRepository;
import com.lc.ibps.loans.danbaoCompany_All.persistence.entity.DanBaoCompany_allPo;
import com.lc.ibps.loans.danbaoCompany_All.repository.DanBaoCompany_allRepository;
import com.lc.ibps.loans.danBaoCompany.persistence.entity.DanBaoCompanyInfoPo;
import com.lc.ibps.loans.danBaoCompany.domain.DanBaoCompanyInfo;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_dbgs 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 21:52:07
 *</pre>
 */
@Controller
@RequestMapping("/loanp/danBaoCompany/danBaoCompanyInfo/")
public class DanBaoCompanyInfoController extends GenericController{
	@Resource
	DanBaoCompanyInfoRepository danBaoCompanyInfoRepository;
	@Resource
	DanBaoCompany_allRepository danBaoCompany_allRepository;
	/**
	 * 【t_dbgs】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DanBaoCompanyInfoPo> danBaoCompanyInfoList=(PageList<DanBaoCompanyInfoPo>)danBaoCompanyInfoRepository.query(queryFilter);
		return new PageJson(danBaoCompanyInfoList);
	}
	
	/**
	 * 编辑【t_dbgs】信息页面
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
		DanBaoCompany_allPo danBaoCompany_all=null;
		DanBaoCompanyInfoPo danBaoCompanyInfo=null;
		if(StringUtil.isNotEmpty(id)){
			 danBaoCompany_all = danBaoCompany_allRepository.get(id);
		}
		String Jdid=danBaoCompany_all.getJdid();
		String Gsmc=danBaoCompany_all.getGsmc();
		String Gsfddbr=danBaoCompany_all.getGsfddbr();
		if(StringUtil.isNotEmpty(id)){
			danBaoCompanyInfo=danBaoCompanyInfoRepository.getByJdidAndGsmc(Jdid,Gsmc);
		}
		if(danBaoCompanyInfo==null){
			danBaoCompanyInfo=new DanBaoCompanyInfoPo();
			danBaoCompanyInfo.setDbgskhmc(Gsmc);
			danBaoCompanyInfo.setFzr(Gsfddbr);
		}
		
		return getAutoView().addObject("danBaoCompanyInfo", danBaoCompanyInfo).addObject("Jdid", Jdid).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_dbgs】信息页面
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
		DanBaoCompanyInfoPo danBaoCompanyInfo=null;
		if(StringUtil.isNotEmpty(id)){
			danBaoCompanyInfo=danBaoCompanyInfoRepository.get(id);
		}
		return getAutoView().addObject("danBaoCompanyInfo", danBaoCompanyInfo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_dbgs】明细页面
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
			 danBaoCompany_all = danBaoCompany_allRepository.get(id);
		}
		String Jdid=danBaoCompany_all.getJdid();
		String Gsmc=danBaoCompany_all.getGsmc();
		DanBaoCompanyInfoPo danBaoCompanyInfo=null;
		if(StringUtil.isNotEmpty(id)){
			danBaoCompanyInfo=danBaoCompanyInfoRepository.getByJdidAndGsmc(Jdid,Gsmc);
		}
		return getAutoView().addObject("danBaoCompanyInfo", danBaoCompanyInfo).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_dbgs】信息
	 *
	 * @param request
	 * @param response
	 * @param  danBaoCompanyInfo
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String Jdid=RequestUtil.getString(request, "Jdid");
		try {
			DanBaoCompanyInfoPo danBaoCompanyInfoPo = getFromRequest(request);
			//构造领域对象和保存数据
			danBaoCompanyInfoPo.setJdid(Jdid);
			DanBaoCompanyInfo danBaoCompanyInfo =danBaoCompanyInfoRepository.newInstance(danBaoCompanyInfoPo);
			danBaoCompanyInfo.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功"+"@"+Jdid);
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
	private DanBaoCompanyInfoPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DanBaoCompanyInfoPo danBaoCompanyInfoPo = getDanBaoCompanyInfoPo(jsonObj);

		return danBaoCompanyInfoPo;
	}
	
	/** 
	 * 获取t_dbgs数据
	 *
	 * @param jsonObj
	 */
	private DanBaoCompanyInfoPo getDanBaoCompanyInfoPo(JSONObject jsonObj){
		DanBaoCompanyInfoPo danBaoCompanyInfoPo = (DanBaoCompanyInfoPo) JsonUtil.getDTO(jsonObj.toString(), DanBaoCompanyInfoPo.class);
		return danBaoCompanyInfoPo;
	}
	
	
	/**
	 *  批量删除【t_dbgs】记录
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
			DanBaoCompanyInfo danBaoCompanyInfo =danBaoCompanyInfoRepository.newInstance();
			danBaoCompanyInfo.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
