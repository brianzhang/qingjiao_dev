
package com.lc.ibps.pg.codegen.controller;

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
import com.lc.ibps.pgs.codegen.repository.SjfxRepository;
import com.lc.ibps.pgs.codegen.persistence.entity.SjfxPo;
import com.lc.ibps.pgs.codegen.domain.Sjfx;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 学院试卷分析报告 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-30 09:34:54
 *</pre>
 */
@Controller
@RequestMapping("/pg/codegen/sjfx/")
public class SjfxController extends GenericController{
	@Resource
	private SjfxRepository sjfxRepository;
	
	/**
	 * 【学院试卷分析报告】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<SjfxPo> sjfxList=(PageList<SjfxPo>)sjfxRepository.query(queryFilter);
		return new PageJson(sjfxList);
	}
	
	/**
	 * 编辑【学院试卷分析报告】信息页面
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
		SjfxPo sjfx=null;
		if(StringUtil.isNotEmpty(id)){
			sjfx=sjfxRepository.get(id);
		}
		return getAutoView().addObject("sjfx", sjfx).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【学院试卷分析报告】信息页面
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
		SjfxPo sjfx=null;
		if(StringUtil.isNotEmpty(id)){
			sjfx=sjfxRepository.get(id);
		}
		return getAutoView().addObject("sjfx", sjfx).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【学院试卷分析报告】明细页面
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
		SjfxPo sjfx=null;
		if(StringUtil.isNotEmpty(id)){
			sjfx=sjfxRepository.get(id);
		}
		return getAutoView().addObject("sjfx", sjfx).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【学院试卷分析报告】信息
	 *
	 * @param request
	 * @param response
	 * @param  sjfx
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			SjfxPo sjfxPo = getFromRequest(request);
			//构造领域对象和保存数据
			Sjfx sjfx =sjfxRepository.newInstance(sjfxPo);
			sjfx.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存学院试卷分析报告成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对学院试卷分析报告操作失败,"+e.getMessage());
			logger.error("对学院试卷分析报告操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private SjfxPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		SjfxPo sjfxPo = getSjfxPo(jsonObj);

		return sjfxPo;
	}
	
	/** 
	 * 获取学院试卷分析报告数据
	 *
	 * @param jsonObj
	 */
	private SjfxPo getSjfxPo(JSONObject jsonObj){
		SjfxPo sjfxPo = (SjfxPo) JsonUtil.getDTO(jsonObj.toString(), SjfxPo.class);
		return sjfxPo;
	}
	
	
	/**
	 *  批量删除【学院试卷分析报告】记录
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
			Sjfx sjfx =sjfxRepository.newInstance();
			sjfx.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除学院试卷分析报告成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除学院试卷分析报告失败，" + e.getMessage());
			logger.error("删除学院试卷分析报告失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
