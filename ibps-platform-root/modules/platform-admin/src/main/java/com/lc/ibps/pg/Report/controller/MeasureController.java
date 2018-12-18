
package com.lc.ibps.pg.Report.controller;

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
import com.lc.ibps.pgs.Report.repository.MeasureRepository;
import com.lc.ibps.pgs.Report.persistence.entity.MeasurePo;
import com.lc.ibps.pgs.Report.domain.Measure;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_khhlxjxpjbyyqpj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:07:41
 *</pre>
 */
@Controller
@RequestMapping("/pg/Report/measure/")
public class MeasureController extends GenericController{
	@Resource
	private MeasureRepository measureRepository;
	
	/**
	 * 【t_p_khhlxjxpjbyyqpj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<MeasurePo> measureList=(PageList<MeasurePo>)measureRepository.query(queryFilter);
		return new PageJson(measureList);
	}
	
	/**
	 * 编辑【t_p_khhlxjxpjbyyqpj】信息页面
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
		MeasurePo measure=null;
		if(StringUtil.isNotEmpty(id)){
			measure=measureRepository.get(id);
		}
		return getAutoView().addObject("measure", measure).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_khhlxjxpjbyyqpj】信息页面
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
		MeasurePo measure=null;
		if(StringUtil.isNotEmpty(id)){
			measure=measureRepository.get(id);
		}
		return getAutoView().addObject("measure", measure).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_khhlxjxpjbyyqpj】明细页面
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
		MeasurePo measure=null;
		if(StringUtil.isNotEmpty(id)){
			measure=measureRepository.get(id);
		}
		return getAutoView().addObject("measure", measure).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_khhlxjxpjbyyqpj】信息
	 *
	 * @param request
	 * @param response
	 * @param  measure
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			MeasurePo measurePo = getFromRequest(request);
			//构造领域对象和保存数据
			Measure measure =measureRepository.newInstance(measurePo);
			measure.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_khhlxjxpjbyyqpj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_khhlxjxpjbyyqpj操作失败,"+e.getMessage());
			logger.error("对t_p_khhlxjxpjbyyqpj操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private MeasurePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		MeasurePo measurePo = getMeasurePo(jsonObj);

		return measurePo;
	}
	
	/** 
	 * 获取t_p_khhlxjxpjbyyqpj数据
	 *
	 * @param jsonObj
	 */
	private MeasurePo getMeasurePo(JSONObject jsonObj){
		MeasurePo measurePo = (MeasurePo) JsonUtil.getDTO(jsonObj.toString(), MeasurePo.class);
		return measurePo;
	}
	
	
	/**
	 *  批量删除【t_p_khhlxjxpjbyyqpj】记录
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
			Measure measure =measureRepository.newInstance();
			measure.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_khhlxjxpjbyyqpj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_khhlxjxpjbyyqpj失败，" + e.getMessage());
			logger.error("删除t_p_khhlxjxpjbyyqpj失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
