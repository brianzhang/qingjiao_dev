
package com.lc.ibps.loanp.diyarenAll.controller;

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
import com.lc.ibps.loans.diyarenAll.repository.Dyr_AllRepository;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;
import com.lc.ibps.loans.diyarenAll.persistence.entity.Dyr_AllPo;
import com.lc.ibps.loans.diyarenAll.domain.Dyr_All;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_dyr_all 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 07:50:38
 *</pre>
 */
@Controller
@RequestMapping("/loanp/diyarenAll/dyr_All/")
public class Dyr_AllController extends GenericController{
	@Resource
	Dyr_AllRepository dyr_AllRepository;
	
	/**
	 * 【t_dyr_all】列表(分页条件查询)数据
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
		PageList<Dyr_AllPo> dyr_AllList=(PageList<Dyr_AllPo>)dyr_AllRepository.query(queryFilter);
		PageList<Dyr_AllPo> dyr_AllPollList1 = new PageList<>();
		for(Dyr_AllPo  dyr_AllPo : dyr_AllList){
			             if(dyr_AllPo.getJdid().equals(jdid)){
			            	 dyr_AllPollList1 .add(dyr_AllPo);
			             }
		} 
		return new PageJson(dyr_AllPollList1);
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
	 * 编辑【t_dyr_all】信息页面
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
		Dyr_AllPo dyr_All=null;
		if(StringUtil.isNotEmpty(id)){
			dyr_All=dyr_AllRepository.get(id);
		}
		return getAutoView().addObject("dyr_All", dyr_All).addObject("returnUrl", preUrl).addObject("jdid",jdid);
	}
	
	/**
	 * 编辑【t_dyr_all】信息页面
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
		Dyr_AllPo dyr_All=null;
		if(StringUtil.isNotEmpty(id)){
			dyr_All=dyr_AllRepository.get(id);
		}
		return getAutoView().addObject("dyr_All", dyr_All).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_dyr_all】明细页面
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
		Dyr_AllPo dyr_All=null;
		if(StringUtil.isNotEmpty(id)){
			dyr_All=dyr_AllRepository.get(id);
		}
		return getAutoView().addObject("dyr_All", dyr_All).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_dyr_all】信息
	 *
	 * @param request
	 * @param response
	 * @param  dyr_All
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String jdid = RequestUtil.getString(request, "jdid");
		System.out.println("+++++++++++++> save"+jdid);
		ResultMessage message=null;
		try {
			Dyr_AllPo dyr_AllPo = getFromRequest(request);
			dyr_AllPo.setJdid(jdid);
			//构造领域对象和保存数据
			Dyr_All dyr_All =dyr_AllRepository.newInstance(dyr_AllPo);
			dyr_All.save();
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
	private Dyr_AllPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		Dyr_AllPo dyr_AllPo = getDyr_AllPo(jsonObj);

		return dyr_AllPo;
	}
	
	/** 
	 * 获取t_dyr_all数据
	 *
	 * @param jsonObj
	 */
	private Dyr_AllPo getDyr_AllPo(JSONObject jsonObj){
		Dyr_AllPo dyr_AllPo = (Dyr_AllPo) JsonUtil.getDTO(jsonObj.toString(), Dyr_AllPo.class);
		return dyr_AllPo;
	}
	
	
	/**
	 *  批量删除【t_dyr_all】记录
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
			Dyr_All dyr_All =dyr_AllRepository.newInstance();
			dyr_All.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
