
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
import com.lc.ibps.pgs.PGData.repository.TargetFBSourceRepository;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetFBSourcePo;
import com.lc.ibps.pgs.PGData.domain.TargetFBSource;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_fkyjsjly 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:06:24
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/targetFBSource/")
public class TargetFBSourceController extends GenericController{
	@Resource
	private TargetFBSourceRepository targetFBSourceRepository;
	
	/**
	 * 【t_p_fkyjsjly】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<TargetFBSourcePo> targetFBSourceList=(PageList<TargetFBSourcePo>)targetFBSourceRepository.query(queryFilter);
		return new PageJson(targetFBSourceList);
	}
	
	/**
	 * 编辑【t_p_fkyjsjly】信息页面
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
		TargetFBSourcePo targetFBSource=null;
		if(StringUtil.isNotEmpty(id)){
			targetFBSource=targetFBSourceRepository.get(id);
		}
		return getAutoView().addObject("targetFBSource", targetFBSource).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_fkyjsjly】信息页面
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
		TargetFBSourcePo targetFBSource=null;
		if(StringUtil.isNotEmpty(id)){
			targetFBSource=targetFBSourceRepository.get(id);
		}
		return getAutoView().addObject("targetFBSource", targetFBSource).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_fkyjsjly】明细页面
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
		TargetFBSourcePo targetFBSource=null;
		if(StringUtil.isNotEmpty(id)){
			targetFBSource=targetFBSourceRepository.get(id);
		}
		return getAutoView().addObject("targetFBSource", targetFBSource).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_fkyjsjly】信息
	 *
	 * @param request
	 * @param response
	 * @param  targetFBSource
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			TargetFBSourcePo targetFBSourcePo = getFromRequest(request);
			//构造领域对象和保存数据
			TargetFBSource targetFBSource =targetFBSourceRepository.newInstance(targetFBSourcePo);
			targetFBSource.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_fkyjsjly成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_fkyjsjly操作失败,"+e.getMessage());
			logger.error("对t_p_fkyjsjly操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TargetFBSourcePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TargetFBSourcePo targetFBSourcePo = getTargetFBSourcePo(jsonObj);

		return targetFBSourcePo;
	}
	
	/** 
	 * 获取t_p_fkyjsjly数据
	 *
	 * @param jsonObj
	 */
	private TargetFBSourcePo getTargetFBSourcePo(JSONObject jsonObj){
		TargetFBSourcePo targetFBSourcePo = (TargetFBSourcePo) JsonUtil.getDTO(jsonObj.toString(), TargetFBSourcePo.class);
		return targetFBSourcePo;
	}
	
	
	/**
	 *  批量删除【t_p_fkyjsjly】记录
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
			TargetFBSource targetFBSource =targetFBSourceRepository.newInstance();
			targetFBSource.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_fkyjsjly成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_fkyjsjly失败，" + e.getMessage());
			logger.error("删除t_p_fkyjsjly失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
