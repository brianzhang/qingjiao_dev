
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
import com.lc.ibps.pgs.PGData.repository.QualityMonRepository;
import com.lc.ibps.pgs.PGData.persistence.entity.QualityMonPo;
import com.lc.ibps.pgs.PGData.domain.QualityMon;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_mxdcddzljktx 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 14:08:24
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/qualityMon/")
public class QualityMonController extends GenericController{
	@Resource
	private QualityMonRepository qualityMonRepository;
	
	/**
	 * 【t_p_mxdcddzljktx】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<QualityMonPo> qualityMonList=(PageList<QualityMonPo>)qualityMonRepository.query(queryFilter);
		return new PageJson(qualityMonList);
	}
	
	/**
	 * 编辑【t_p_mxdcddzljktx】信息页面
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
		QualityMonPo qualityMon=null;
		if(StringUtil.isNotEmpty(id)){
			qualityMon=qualityMonRepository.get(id);
		}
		return getAutoView().addObject("qualityMon", qualityMon).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_mxdcddzljktx】信息页面
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
		QualityMonPo qualityMon=null;
		if(StringUtil.isNotEmpty(id)){
			qualityMon=qualityMonRepository.get(id);
		}
		return getAutoView().addObject("qualityMon", qualityMon).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_mxdcddzljktx】明细页面
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
		QualityMonPo qualityMon=null;
		if(StringUtil.isNotEmpty(id)){
			qualityMon=qualityMonRepository.get(id);
		}
		return getAutoView().addObject("qualityMon", qualityMon).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_mxdcddzljktx】信息
	 *
	 * @param request
	 * @param response
	 * @param  qualityMon
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			QualityMonPo qualityMonPo = getFromRequest(request);
			//构造领域对象和保存数据
			QualityMon qualityMon =qualityMonRepository.newInstance(qualityMonPo);
			qualityMon.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_mxdcddzljktx成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_mxdcddzljktx操作失败,"+e.getMessage());
			logger.error("对t_p_mxdcddzljktx操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private QualityMonPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		QualityMonPo qualityMonPo = getQualityMonPo(jsonObj);

		return qualityMonPo;
	}
	
	/** 
	 * 获取t_p_mxdcddzljktx数据
	 *
	 * @param jsonObj
	 */
	private QualityMonPo getQualityMonPo(JSONObject jsonObj){
		QualityMonPo qualityMonPo = (QualityMonPo) JsonUtil.getDTO(jsonObj.toString(), QualityMonPo.class);
		return qualityMonPo;
	}
	
	
	/**
	 *  批量删除【t_p_mxdcddzljktx】记录
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
			QualityMon qualityMon =qualityMonRepository.newInstance();
			qualityMon.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_mxdcddzljktx成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_mxdcddzljktx失败，" + e.getMessage());
			logger.error("删除t_p_mxdcddzljktx失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
