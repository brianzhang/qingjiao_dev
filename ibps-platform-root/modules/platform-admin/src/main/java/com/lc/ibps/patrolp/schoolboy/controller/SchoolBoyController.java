
package com.lc.ibps.patrolp.schoolboy.controller;

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
import com.lc.ibps.base.web.util.CookieUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.patrols.schoolboy.repository.SchoolBoyRepository;
import com.lc.ibps.patrols.schoolboy.persistence.entity.SchoolBoyPo;
import com.lc.ibps.patrols.schoolboy.domain.SchoolBoy;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_schoolboy 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 12:03:02
 *</pre>
 */
@Controller
@RequestMapping("/patrolp/schoolboy/schoolBoy/")
public class SchoolBoyController extends GenericController{
	@Resource
	private SchoolBoyRepository schoolBoyRepository;
	
	/**
	 * 【t_schoolboy】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<SchoolBoyPo> schoolBoyList=(PageList<SchoolBoyPo>)schoolBoyRepository.query(queryFilter);
		return new PageJson(schoolBoyList);
	}
	
	/**
	 * 编辑【t_schoolboy】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		
	
		CookieUtil.addCookie("origSwitch", "get1", request, response);
		String id=RequestUtil.getString(request, "id");
		SchoolBoyPo schoolBoy=null;
		if(StringUtil.isNotEmpty(id)){
			schoolBoy=schoolBoyRepository.get(id);
		}
		return getAutoView().addObject("schoolBoy", schoolBoy).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_schoolboy】信息页面
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
		SchoolBoyPo schoolBoy=null;
		if(StringUtil.isNotEmpty(id)){
			schoolBoy=schoolBoyRepository.get(id);
		}
		return getAutoView().addObject("schoolBoy", schoolBoy).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_schoolboy】明细页面
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
		SchoolBoyPo schoolBoy=null;
		if(StringUtil.isNotEmpty(id)){
			schoolBoy=schoolBoyRepository.get(id);
		}
		return getAutoView().addObject("schoolBoy", schoolBoy).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_schoolboy】信息
	 *
	 * @param request
	 * @param response
	 * @param  schoolBoy
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			SchoolBoyPo schoolBoyPo = getFromRequest(request);
			//构造领域对象和保存数据
			SchoolBoy schoolBoy =schoolBoyRepository.newInstance(schoolBoyPo);
			schoolBoy.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "信息录入成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_schoolboy操作失败,"+e.getMessage());
			logger.error("对t_schoolboy操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private SchoolBoyPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		SchoolBoyPo schoolBoyPo = getSchoolBoyPo(jsonObj);

		return schoolBoyPo;
	}
	
	/** 
	 * 获取t_schoolboy数据
	 *
	 * @param jsonObj
	 */
	private SchoolBoyPo getSchoolBoyPo(JSONObject jsonObj){
		SchoolBoyPo schoolBoyPo = (SchoolBoyPo) JsonUtil.getDTO(jsonObj.toString(), SchoolBoyPo.class);
		return schoolBoyPo;
	}
	
	
	/**
	 *  批量删除【t_schoolboy】记录
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
			SchoolBoy schoolBoy =schoolBoyRepository.newInstance();
			schoolBoy.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_schoolboy成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_schoolboy失败，" + e.getMessage());
			logger.error("删除t_schoolboy失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
