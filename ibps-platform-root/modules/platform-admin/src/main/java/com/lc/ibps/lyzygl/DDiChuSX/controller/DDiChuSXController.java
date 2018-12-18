
package com.lc.ibps.lyzygl.DDiChuSX.controller;

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
import com.lc.ibps.lyzygls.DDiChuSX.repository.DDiChuSXRepository;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.entity.DDiChuSXPo;
import com.lc.ibps.lyzygls.DDiChuSX.domain.DDiChuSX;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 该表用于单位概况的地处水系数据 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:21:48
 *</pre>
 */
@Controller
@RequestMapping("/lyzygl/DDiChuSX/dDiChuSX/")
public class DDiChuSXController extends GenericController{
	@Resource
	private DDiChuSXRepository dDiChuSXRepository;
	
	/**
	 * 【该表用于单位概况的地处水系数据】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DDiChuSXPo> dDiChuSXList=(PageList<DDiChuSXPo>)dDiChuSXRepository.query(queryFilter);
		return new PageJson(dDiChuSXList);
	}
	
	/**
	 * 编辑【该表用于单位概况的地处水系数据】信息页面
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
		DDiChuSXPo dDiChuSX=null;
		if(StringUtil.isNotEmpty(id)){
			dDiChuSX=dDiChuSXRepository.get(id);
		}
		return getAutoView().addObject("dDiChuSX", dDiChuSX).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【该表用于单位概况的地处水系数据】信息页面
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
		DDiChuSXPo dDiChuSX=null;
		if(StringUtil.isNotEmpty(id)){
			dDiChuSX=dDiChuSXRepository.get(id);
		}
		return getAutoView().addObject("dDiChuSX", dDiChuSX).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【该表用于单位概况的地处水系数据】明细页面
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
		DDiChuSXPo dDiChuSX=null;
		if(StringUtil.isNotEmpty(id)){
			dDiChuSX=dDiChuSXRepository.get(id);
		}
		return getAutoView().addObject("dDiChuSX", dDiChuSX).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【该表用于单位概况的地处水系数据】信息
	 *
	 * @param request
	 * @param response
	 * @param  dDiChuSX
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			DDiChuSXPo dDiChuSXPo = getFromRequest(request);
			//构造领域对象和保存数据
			DDiChuSX dDiChuSX =dDiChuSXRepository.newInstance(dDiChuSXPo);
			dDiChuSX.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存该表用于单位概况的地处水系数据成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对该表用于单位概况的地处水系数据操作失败,"+e.getMessage());
			logger.error("对该表用于单位概况的地处水系数据操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DDiChuSXPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DDiChuSXPo dDiChuSXPo = getDDiChuSXPo(jsonObj);

		return dDiChuSXPo;
	}
	
	/** 
	 * 获取该表用于单位概况的地处水系数据数据
	 *
	 * @param jsonObj
	 */
	private DDiChuSXPo getDDiChuSXPo(JSONObject jsonObj){
		DDiChuSXPo dDiChuSXPo = (DDiChuSXPo) JsonUtil.getDTO(jsonObj.toString(), DDiChuSXPo.class);
		return dDiChuSXPo;
	}
	
	
	/**
	 *  批量删除【该表用于单位概况的地处水系数据】记录
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
			DDiChuSX dDiChuSX =dDiChuSXRepository.newInstance();
			dDiChuSX.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除该表用于单位概况的地处水系数据成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除该表用于单位概况的地处水系数据失败，" + e.getMessage());
			logger.error("删除该表用于单位概况的地处水系数据失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
