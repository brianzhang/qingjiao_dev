package com.lc.ibps.platform.keshes.controller;

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
import com.lc.ibps.demo.keshes.repository.ZengjiaRepository;
import com.lc.ibps.demo.keshes.persistence.entity.ZengjiaPo;
import com.lc.ibps.demo.keshes.domain.Zengjia;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * keshe 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-06-26 22:33:59
 *</pre>
 */
@Controller
@RequestMapping("/platform/keshes/zengjia/")
public class ZengjiaController extends GenericController{
	@Resource
	private ZengjiaRepository zengjiaRepository;
	
	/**
	 * 【keshe】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ZengjiaPo> zengjiaList=(PageList<ZengjiaPo>)zengjiaRepository.query(queryFilter);
		return new PageJson(zengjiaList);
	}
	
	/**
	 * 编辑【keshe】信息页面
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
		ZengjiaPo zengjia=null;
		if(StringUtil.isNotEmpty(id)){
			zengjia=zengjiaRepository.get(id);
		}
		return getAutoView().addObject("zengjia", zengjia).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【keshe】信息页面
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
		ZengjiaPo zengjia=null;
		if(StringUtil.isNotEmpty(id)){
			zengjia=zengjiaRepository.get(id);
		}
		return getAutoView().addObject("zengjia", zengjia).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【keshe】明细页面
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
		ZengjiaPo zengjia=null;
		if(StringUtil.isNotEmpty(id)){
			zengjia=zengjiaRepository.get(id);
		}
		return getAutoView().addObject("zengjia", zengjia).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【keshe】信息
	 *
	 * @param request
	 * @param response
	 * @param
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ZengjiaPo zengjiaPo = getFromRequest(request);
			//构造领域对象和保存数据
			Zengjia zengjia =zengjiaRepository.newInstance(zengjiaPo);
			zengjia.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存keshe成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对keshe操作失败,"+e.getMessage());
			logger.error("对keshe操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ZengjiaPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ZengjiaPo zengjiaPo = getZengjiaPo(jsonObj);

		return zengjiaPo;
	}
	
	/** 
	 * 获取keshe数据
	 *
	 * @param jsonObj
	 */
	private ZengjiaPo getZengjiaPo(JSONObject jsonObj){
		ZengjiaPo zengjiaPo = (ZengjiaPo) JsonUtil.getDTO(jsonObj.toString(), ZengjiaPo.class);
		return zengjiaPo;
	}
	
	
	/**
	 *  批量删除【keshe】记录
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
			Zengjia zengjia =zengjiaRepository.newInstance();
			zengjia.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除keshe成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除keshe失败，" + e.getMessage());
			logger.error("删除keshe失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}