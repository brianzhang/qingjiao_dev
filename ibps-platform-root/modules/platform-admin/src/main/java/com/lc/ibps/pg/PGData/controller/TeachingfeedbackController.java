
package com.lc.ibps.pg.PGData.controller;

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
import com.lc.ibps.pgs.PGData.repository.TeachingfeedbackRepository;
import com.lc.ibps.pgs.PGData.persistence.entity.TeachingfeedbackPo;
import com.lc.ibps.pgs.PGData.domain.Teachingfeedback;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_xxaqzyktjxfkb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:47:02
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/teachingfeedback/")
public class TeachingfeedbackController extends GenericController{
	@Resource
	private TeachingfeedbackRepository teachingfeedbackRepository;
	
	/**
	 * 【t_p_xxaqzyktjxfkb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<TeachingfeedbackPo> teachingfeedbackList=(PageList<TeachingfeedbackPo>)teachingfeedbackRepository.query(queryFilter);
		return new PageJson(teachingfeedbackList);
	}
	
	/**
	 * 编辑【t_p_xxaqzyktjxfkb】信息页面
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
		TeachingfeedbackPo teachingfeedback=null;
		if(StringUtil.isNotEmpty(id)){
			teachingfeedback=teachingfeedbackRepository.get(id);
		}
		return getAutoView().addObject("teachingfeedback", teachingfeedback).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_xxaqzyktjxfkb】信息页面
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
		TeachingfeedbackPo teachingfeedback=null;
		if(StringUtil.isNotEmpty(id)){
			teachingfeedback=teachingfeedbackRepository.get(id);
		}
		return getAutoView().addObject("teachingfeedback", teachingfeedback).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_xxaqzyktjxfkb】明细页面
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
		TeachingfeedbackPo teachingfeedback=null;
		if(StringUtil.isNotEmpty(id)){
			teachingfeedback=teachingfeedbackRepository.get(id);
		}
		return getAutoView().addObject("teachingfeedback", teachingfeedback).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_xxaqzyktjxfkb】信息
	 *
	 * @param request
	 * @param response
	 * @param  teachingfeedback
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			TeachingfeedbackPo teachingfeedbackPo = getFromRequest(request);
			//构造领域对象和保存数据
			Teachingfeedback teachingfeedback =teachingfeedbackRepository.newInstance(teachingfeedbackPo);
			teachingfeedback.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_xxaqzyktjxfkb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_xxaqzyktjxfkb操作失败,"+e.getMessage());
			logger.error("对t_p_xxaqzyktjxfkb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TeachingfeedbackPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TeachingfeedbackPo teachingfeedbackPo = getTeachingfeedbackPo(jsonObj);

		return teachingfeedbackPo;
	}
	
	/** 
	 * 获取t_p_xxaqzyktjxfkb数据
	 *
	 * @param jsonObj
	 */
	private TeachingfeedbackPo getTeachingfeedbackPo(JSONObject jsonObj){
		TeachingfeedbackPo teachingfeedbackPo = (TeachingfeedbackPo) JsonUtil.getDTO(jsonObj.toString(), TeachingfeedbackPo.class);
		return teachingfeedbackPo;
	}
	
	
	/**
	 *  批量删除【t_p_xxaqzyktjxfkb】记录
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
			Teachingfeedback teachingfeedback =teachingfeedbackRepository.newInstance();
			teachingfeedback.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_xxaqzyktjxfkb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_xxaqzyktjxfkb失败，" + e.getMessage());
			logger.error("删除t_p_xxaqzyktjxfkb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
