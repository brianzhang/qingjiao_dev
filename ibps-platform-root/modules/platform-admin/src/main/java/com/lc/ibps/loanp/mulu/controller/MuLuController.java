
package com.lc.ibps.loanp.mulu.controller;

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
import com.lc.ibps.loans.mulu.repository.MuLuRepository;
import com.lc.ibps.loans.mulu.persistence.entity.MuLuPo;
import com.lc.ibps.loans.mulu.domain.MuLu;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_mlsl 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:36:42
 *</pre>
 */
@Controller
@RequestMapping("/loanp/mulu/muLu/")
public class MuLuController extends GenericController{
	@Resource
	MuLuRepository muLuRepository;
	
	/**
	 * 【t_mlsl】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<MuLuPo> muLuList=(PageList<MuLuPo>)muLuRepository.query(queryFilter);
		return new PageJson(muLuList);
	}
	
	/**
	 * 编辑【t_mlsl】信息页面
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
		MuLuPo muLu=null;
		if(StringUtil.isNotEmpty(id)){
			muLu=muLuRepository.get(id);
		}
		return getAutoView().addObject("muLu", muLu).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_mlsl】信息页面
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
		MuLuPo muLu=null;
		if(StringUtil.isNotEmpty(id)){
			muLu=muLuRepository.get(id);
		}
		return getAutoView().addObject("muLu", muLu).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_mlsl】明细页面
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
		MuLuPo muLu=null;
		if(StringUtil.isNotEmpty(id)){
			muLu=muLuRepository.get(id);
		}
		return getAutoView().addObject("muLu", muLu).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_mlsl】信息
	 *
	 * @param request
	 * @param response
	 * @param  muLu
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			MuLuPo muLuPo = getFromRequest(request);
			//构造领域对象和保存数据
			MuLu muLu =muLuRepository.newInstance(muLuPo);
			muLu.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_mlsl成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_mlsl操作失败,"+e.getMessage());
			logger.error("对t_mlsl操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private MuLuPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		MuLuPo muLuPo = getMuLuPo(jsonObj);

		return muLuPo;
	}
	
	/** 
	 * 获取t_mlsl数据
	 *
	 * @param jsonObj
	 */
	private MuLuPo getMuLuPo(JSONObject jsonObj){
		MuLuPo muLuPo = (MuLuPo) JsonUtil.getDTO(jsonObj.toString(), MuLuPo.class);
		return muLuPo;
	}
	
	
	/**
	 *  批量删除【t_mlsl】记录
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
			MuLu muLu =muLuRepository.newInstance();
			muLu.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_mlsl成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_mlsl失败，" + e.getMessage());
			logger.error("删除t_mlsl失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
