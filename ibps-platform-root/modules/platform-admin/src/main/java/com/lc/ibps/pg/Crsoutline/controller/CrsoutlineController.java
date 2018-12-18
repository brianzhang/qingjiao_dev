
package com.lc.ibps.pg.Crsoutline.controller;

import java.util.HashMap;
import java.util.Map;

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
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.pgs.Crsoutline.repository.CrsoutlineRepository;
import com.lc.ibps.pgs.Crsoutline.persistence.entity.CrsoutlinePo;
import com.lc.ibps.pgs.Crsoutline.domain.Crsoutline;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_t_crs_outline 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-17 16:56:32
 *</pre>
 */
@Controller
@RequestMapping("/pg/Crsoutline/crsoutline/")
public class CrsoutlineController extends GenericController{
	@Resource
	private CrsoutlineRepository crsoutlineRepository;
	
	/**
	 * 【t_t_crs_outline】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<CrsoutlinePo> crsoutlineList=(PageList<CrsoutlinePo>)crsoutlineRepository.query(queryFilter);
		return new PageJson(crsoutlineList);
	}
	@RequestMapping("listJson2")
	public @ResponseBody PageJson listJson2(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<CrsoutlinePo> crsoutlineList=(PageList<CrsoutlinePo>)crsoutlineRepository.query(queryFilter);
		return new PageJson(crsoutlineList);
	}
	/**
	 * 编辑【t_t_crs_outline】信息页面
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
		CrsoutlinePo crsoutline=null;
		if(StringUtil.isNotEmpty(id)){
			crsoutline=crsoutlineRepository.get(id);
		}
		return getAutoView().addObject("crsoutline", crsoutline).addObject("returnUrl", preUrl);
	}
	@RequestMapping("edit2")
	public ModelAndView edit2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		String admin = RequestUtil.getString(request, "admin", "");
		String crsName = RequestUtil.getString(request, "crsName");
		crsName = new String (crsName.getBytes("ISO8859-1"),"utf-8").trim();
		String copy = RequestUtil.getString(request, "copy");// 从其他课程复制
		CrsTchPo crsTch = null;
	

		return getAutoView().addObject("crsTch", crsTch).addObject("returnUrl", preUrl).addObject("crsName", crsName)
				.addObject("admin", (Boolean) StringUtil.isNotEmpty(admin));
	}
	/**
	 * 编辑【t_t_crs_outline】信息页面
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
		CrsoutlinePo crsoutline=null;
		if(StringUtil.isNotEmpty(id)){
			crsoutline=crsoutlineRepository.get(id);
		}
		return getAutoView().addObject("crsoutline", crsoutline).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_t_crs_outline】明细页面
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
		CrsoutlinePo crsoutline=null;
		if(StringUtil.isNotEmpty(id)){
			crsoutline=crsoutlineRepository.get(id);
		}
		return getAutoView().addObject("crsoutline", crsoutline).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_t_crs_outline】信息
	 *
	 * @param request
	 * @param response
	 * @param  crsoutline
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			CrsoutlinePo crsoutlinePo = getFromRequest(request);
			//构造领域对象和保存数据
			Crsoutline crsoutline =crsoutlineRepository.newInstance(crsoutlinePo);
			crsoutline.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_t_crs_outline成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_t_crs_outline操作失败,"+e.getMessage());
			logger.error("对t_t_crs_outline操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private CrsoutlinePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		CrsoutlinePo crsoutlinePo = getCrsoutlinePo(jsonObj);

		return crsoutlinePo;
	}
	
	/** 
	 * 获取t_t_crs_outline数据
	 *
	 * @param jsonObj
	 */
	private CrsoutlinePo getCrsoutlinePo(JSONObject jsonObj){
		CrsoutlinePo crsoutlinePo = (CrsoutlinePo) JsonUtil.getDTO(jsonObj.toString(), CrsoutlinePo.class);
		return crsoutlinePo;
	}
	
	
	/**
	 *  批量删除【t_t_crs_outline】记录
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
			Crsoutline crsoutline =crsoutlineRepository.newInstance();
			crsoutline.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_t_crs_outline成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_t_crs_outline失败，" + e.getMessage());
			logger.error("删除t_t_crs_outline失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
