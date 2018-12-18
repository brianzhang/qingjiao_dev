
package com.lc.ibps.lyzygl.DiChuSX.controller;

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
import com.lc.ibps.lyzygls.DiChuSX.repository.DiChuSXRepository;
import com.lc.ibps.lyzygls.DiChuSX.persistence.entity.DiChuSXPo;
import com.lc.ibps.lyzygls.DiChuSX.domain.DiChuSX;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 该表用于单位概况的地处山系数据 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:20:04
 *</pre>
 */
@Controller
@RequestMapping("/lyzygl/DiChuSX/diChuSX/")
public class DiChuSXController extends GenericController{
	@Resource
	private DiChuSXRepository diChuSXRepository;
	
	/**
	 * 【该表用于单位概况的地处山系数据】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DiChuSXPo> diChuSXList=(PageList<DiChuSXPo>)diChuSXRepository.query(queryFilter);
		return new PageJson(diChuSXList);
	}
	
	/**
	 * 编辑【该表用于单位概况的地处山系数据】信息页面
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
		DiChuSXPo diChuSX=null;
		if(StringUtil.isNotEmpty(id)){
			diChuSX=diChuSXRepository.get(id);
		}
		return getAutoView().addObject("diChuSX", diChuSX).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【该表用于单位概况的地处山系数据】信息页面
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
		DiChuSXPo diChuSX=null;
		if(StringUtil.isNotEmpty(id)){
			diChuSX=diChuSXRepository.get(id);
		}
		return getAutoView().addObject("diChuSX", diChuSX).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【该表用于单位概况的地处山系数据】明细页面
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
		DiChuSXPo diChuSX=null;
		if(StringUtil.isNotEmpty(id)){
			diChuSX=diChuSXRepository.get(id);
		}
		return getAutoView().addObject("diChuSX", diChuSX).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【该表用于单位概况的地处山系数据】信息
	 *
	 * @param request
	 * @param response
	 * @param  diChuSX
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			DiChuSXPo diChuSXPo = getFromRequest(request);
			//构造领域对象和保存数据
			DiChuSX diChuSX =diChuSXRepository.newInstance(diChuSXPo);
			diChuSX.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存该表用于单位概况的地处山系数据成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对该表用于单位概况的地处山系数据操作失败,"+e.getMessage());
			logger.error("对该表用于单位概况的地处山系数据操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DiChuSXPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DiChuSXPo diChuSXPo = getDiChuSXPo(jsonObj);

		return diChuSXPo;
	}
	
	/** 
	 * 获取该表用于单位概况的地处山系数据数据
	 *
	 * @param jsonObj
	 */
	private DiChuSXPo getDiChuSXPo(JSONObject jsonObj){
		DiChuSXPo diChuSXPo = (DiChuSXPo) JsonUtil.getDTO(jsonObj.toString(), DiChuSXPo.class);
		return diChuSXPo;
	}
	
	
	/**
	 *  批量删除【该表用于单位概况的地处山系数据】记录
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
			DiChuSX diChuSX =diChuSXRepository.newInstance();
			diChuSX.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除该表用于单位概况的地处山系数据成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除该表用于单位概况的地处山系数据失败，" + e.getMessage());
			logger.error("删除该表用于单位概况的地处山系数据失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
