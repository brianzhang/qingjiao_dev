
package com.lc.ibps.lyzygl.JingYQ.controller;

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
import com.lc.ibps.lyzygls.JingYQ.repository.JingYQRepository;
import com.lc.ibps.lyzygls.JingYQ.persistence.entity.JingYQPo;
import com.lc.ibps.lyzygls.JingYQ.domain.JingYQ;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_jyq 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:16:30
 *</pre>
 */
@Controller
@RequestMapping("/lyzygl/JingYQ/jingYQ/")
public class JingYQController extends GenericController{
	@Resource
	private JingYQRepository jingYQRepository;
	
	/**
	 * 【t_jyq】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<JingYQPo> jingYQList=(PageList<JingYQPo>)jingYQRepository.query(queryFilter);
		return new PageJson(jingYQList);
	}
	
	/**
	 * 编辑【t_jyq】信息页面
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
		JingYQPo jingYQ=null;
		if(StringUtil.isNotEmpty(id)){
			jingYQ=jingYQRepository.get(id);
		}
		return getAutoView().addObject("jingYQ", jingYQ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_jyq】信息页面
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
		JingYQPo jingYQ=null;
		if(StringUtil.isNotEmpty(id)){
			jingYQ=jingYQRepository.get(id);
		}
		return getAutoView().addObject("jingYQ", jingYQ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_jyq】明细页面
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
		JingYQPo jingYQ=null;
		if(StringUtil.isNotEmpty(id)){
			jingYQ=jingYQRepository.get(id);
		}
		return getAutoView().addObject("jingYQ", jingYQ).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_jyq】信息
	 *
	 * @param request
	 * @param response
	 * @param  jingYQ
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			JingYQPo jingYQPo = getFromRequest(request);
			//构造领域对象和保存数据
			JingYQ jingYQ =jingYQRepository.newInstance(jingYQPo);
			jingYQ.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_jyq成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_jyq操作失败,"+e.getMessage());
			logger.error("对t_jyq操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private JingYQPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		JingYQPo jingYQPo = getJingYQPo(jsonObj);

		return jingYQPo;
	}
	
	/** 
	 * 获取t_jyq数据
	 *
	 * @param jsonObj
	 */
	private JingYQPo getJingYQPo(JSONObject jsonObj){
		JingYQPo jingYQPo = (JingYQPo) JsonUtil.getDTO(jsonObj.toString(), JingYQPo.class);
		return jingYQPo;
	}
	
	
	/**
	 *  批量删除【t_jyq】记录
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
			JingYQ jingYQ =jingYQRepository.newInstance();
			jingYQ.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_jyq成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_jyq失败，" + e.getMessage());
			logger.error("删除t_jyq失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
