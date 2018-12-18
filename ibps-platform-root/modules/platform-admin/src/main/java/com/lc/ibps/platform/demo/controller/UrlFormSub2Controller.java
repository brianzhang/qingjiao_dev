
package com.lc.ibps.platform.demo.controller;

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
import com.lc.ibps.test.demo.repository.UrlFormSub2Repository;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;
import com.lc.ibps.test.demo.domain.UrlFormSub2;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 子表例子 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
@Controller
@RequestMapping("/platform/demo/urlFormSub2/")
public class UrlFormSub2Controller extends GenericController{
	@Resource
	private UrlFormSub2Repository urlFormSub2Repository;
	
	/**
	 * 【子表例子】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<UrlFormSub2Po> urlFormSub2List=(PageList<UrlFormSub2Po>)urlFormSub2Repository.query(queryFilter);
		return new PageJson(urlFormSub2List);
	}
	
	/**
	 * 编辑【子表例子】信息页面
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
		UrlFormSub2Po urlFormSub2=null;
		if(StringUtil.isNotEmpty(id)){
			urlFormSub2=urlFormSub2Repository.get(id);
		}
		return getAutoView().addObject("urlFormSub2", urlFormSub2).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【子表例子】信息页面
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
		UrlFormSub2Po urlFormSub2=null;
		if(StringUtil.isNotEmpty(id)){
			urlFormSub2=urlFormSub2Repository.get(id);
		}
		return getAutoView().addObject("urlFormSub2", urlFormSub2).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【子表例子】明细页面
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
		UrlFormSub2Po urlFormSub2=null;
		if(StringUtil.isNotEmpty(id)){
			urlFormSub2=urlFormSub2Repository.get(id);
		}
		return getAutoView().addObject("urlFormSub2", urlFormSub2).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【子表例子】信息
	 *
	 * @param request
	 * @param response
	 * @param  urlFormSub2
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlFormSub2Po urlFormSub2Po = getFromRequest(request);
			//构造领域对象和保存数据
			UrlFormSub2 urlFormSub2 =urlFormSub2Repository.newInstance(urlFormSub2Po);
			urlFormSub2.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存子表例子成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对子表例子操作失败,"+e.getMessage());
			logger.error("对子表例子操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private UrlFormSub2Po getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		UrlFormSub2Po urlFormSub2Po = getUrlFormSub2Po(jsonObj);

		return urlFormSub2Po;
	}
	
	/** 
	 * 获取子表例子数据
	 *
	 * @param jsonObj
	 */
	private UrlFormSub2Po getUrlFormSub2Po(JSONObject jsonObj){
		UrlFormSub2Po urlFormSub2Po = (UrlFormSub2Po) JsonUtil.getDTO(jsonObj.toString(), UrlFormSub2Po.class);
		return urlFormSub2Po;
	}
	
	
	/**
	 *  批量删除【子表例子】记录
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
			UrlFormSub2 urlFormSub2 =urlFormSub2Repository.newInstance();
			urlFormSub2.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除子表例子成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除子表例子失败，" + e.getMessage());
			logger.error("删除子表例子失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
