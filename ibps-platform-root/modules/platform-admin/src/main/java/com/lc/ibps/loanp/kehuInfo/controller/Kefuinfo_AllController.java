
package com.lc.ibps.loanp.kehuInfo.controller;

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
import com.lc.ibps.loans.kehuInfo.repository.Kefuinfo_AllRepository;
import com.lc.ibps.loans.kehuInfo.persistence.entity.Kefuinfo_AllPo;
import com.lc.ibps.loans.kehuInfo.domain.Kefuinfo_All;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_kefuinfo_all 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-27 19:57:07
 *</pre>
 */
@Controller
@RequestMapping("/loanp/kehuInfo/kefuinfo_All/")
public class Kefuinfo_AllController extends GenericController{
	@Resource
	Kefuinfo_AllRepository kefuinfo_AllRepository;
	
	/**
	 * 【t_kefuinfo_all】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<Kefuinfo_AllPo> kefuinfo_AllList=(PageList<Kefuinfo_AllPo>)kefuinfo_AllRepository.query(queryFilter);
		return new PageJson(kefuinfo_AllList);
	}
	
	/**
	 * 编辑【t_kefuinfo_all】信息页面
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
		Kefuinfo_AllPo kefuinfo_All=null;
		if(StringUtil.isNotEmpty(id)){
			kefuinfo_All=kefuinfo_AllRepository.get(id);
		}
		return getAutoView().addObject("kefuinfo_All", kefuinfo_All).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_kefuinfo_all】信息页面
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
		Kefuinfo_AllPo kefuinfo_All=null;
		if(StringUtil.isNotEmpty(id)){
			kefuinfo_All=kefuinfo_AllRepository.get(id);
		}
		return getAutoView().addObject("kefuinfo_All", kefuinfo_All).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_kefuinfo_all】明细页面
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
		Kefuinfo_AllPo kefuinfo_All=null;
		if(StringUtil.isNotEmpty(id)){
			kefuinfo_All=kefuinfo_AllRepository.get(id);
		}
		return getAutoView().addObject("kefuinfo_All", kefuinfo_All).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_kefuinfo_all】信息
	 *
	 * @param request
	 * @param response
	 * @param  kefuinfo_All
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			Kefuinfo_AllPo kefuinfo_AllPo = getFromRequest(request);
			//构造领域对象和保存数据
			Kefuinfo_All kefuinfo_All =kefuinfo_AllRepository.newInstance(kefuinfo_AllPo);
			kefuinfo_All.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
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
	private Kefuinfo_AllPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		Kefuinfo_AllPo kefuinfo_AllPo = getKefuinfo_AllPo(jsonObj);

		return kefuinfo_AllPo;
	}
	
	/** 
	 * 获取t_kefuinfo_all数据
	 *
	 * @param jsonObj
	 */
	private Kefuinfo_AllPo getKefuinfo_AllPo(JSONObject jsonObj){
		Kefuinfo_AllPo kefuinfo_AllPo = (Kefuinfo_AllPo) JsonUtil.getDTO(jsonObj.toString(), Kefuinfo_AllPo.class);
		return kefuinfo_AllPo;
	}
	
	
	/**
	 *  批量删除【t_kefuinfo_all】记录
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
			Kefuinfo_All kefuinfo_All =kefuinfo_AllRepository.newInstance();
			kefuinfo_All.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
