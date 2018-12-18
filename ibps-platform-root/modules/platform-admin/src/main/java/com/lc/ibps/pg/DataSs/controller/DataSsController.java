
package com.lc.ibps.pg.DataSs.controller;

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
import com.lc.ibps.pgs.DataSs.repository.DataSsRepository;
import com.lc.ibps.pgs.DataSs.persistence.entity.DataSsPo;
import com.lc.ibps.pgs.DataSs.domain.DataSs;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_sjly 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 17:12:48
 *</pre>
 */
@Controller
@RequestMapping("/pg/DataSs/dataSs/")
public class DataSsController extends GenericController{
	@Resource
	private DataSsRepository dataSsRepository;
	
	/**
	 * 【t_sjly】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DataSsPo> dataSsList=(PageList<DataSsPo>)dataSsRepository.query(queryFilter);
		return new PageJson(dataSsList);
	}
	
	/**
	 * 编辑【t_sjly】信息页面
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
		DataSsPo dataSs=null;
		if(StringUtil.isNotEmpty(id)){
			dataSs=dataSsRepository.get(id);
		}
		return getAutoView().addObject("dataSs", dataSs).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_sjly】信息页面
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
		DataSsPo dataSs=null;
		if(StringUtil.isNotEmpty(id)){
			dataSs=dataSsRepository.get(id);
		}
		return getAutoView().addObject("dataSs", dataSs).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_sjly】明细页面
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
		DataSsPo dataSs=null;
		if(StringUtil.isNotEmpty(id)){
			dataSs=dataSsRepository.get(id);
		}
		return getAutoView().addObject("dataSs", dataSs).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_sjly】信息
	 *
	 * @param request
	 * @param response
	 * @param  dataSs
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			DataSsPo dataSsPo = getFromRequest(request);
			//构造领域对象和保存数据
			DataSs dataSs =dataSsRepository.newInstance(dataSsPo);
			dataSs.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_sjly成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_sjly操作失败,"+e.getMessage());
			logger.error("对t_sjly操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DataSsPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DataSsPo dataSsPo = getDataSsPo(jsonObj);

		return dataSsPo;
	}
	
	/** 
	 * 获取t_sjly数据
	 *
	 * @param jsonObj
	 */
	private DataSsPo getDataSsPo(JSONObject jsonObj){
		DataSsPo dataSsPo = (DataSsPo) JsonUtil.getDTO(jsonObj.toString(), DataSsPo.class);
		return dataSsPo;
	}
	
	
	/**
	 *  批量删除【t_sjly】记录
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
			DataSs dataSs =dataSsRepository.newInstance();
			dataSs.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_sjly成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_sjly失败，" + e.getMessage());
			logger.error("删除t_sjly失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
