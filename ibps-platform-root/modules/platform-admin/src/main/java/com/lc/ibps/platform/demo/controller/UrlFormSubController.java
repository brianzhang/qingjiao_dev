
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
import com.lc.ibps.test.demo.repository.UrlFormSubRepository;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSubPo;
import com.lc.ibps.test.demo.domain.UrlFormSub;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 子表例子 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:30
 *</pre>
 */
@Controller
@RequestMapping("/platform/demo/urlFormSub/")
public class UrlFormSubController extends GenericController{
	@Resource
	private UrlFormSubRepository urlFormSubRepository;
	
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
		PageList<UrlFormSubPo> urlFormSubList=(PageList<UrlFormSubPo>)urlFormSubRepository.query(queryFilter);
		return new PageJson(urlFormSubList);
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
		UrlFormSubPo urlFormSub=null;
		if(StringUtil.isNotEmpty(id)){
			urlFormSub=urlFormSubRepository.get(id);
		}
		return getAutoView().addObject("urlFormSub", urlFormSub).addObject("returnUrl", preUrl);
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
		UrlFormSubPo urlFormSub=null;
		if(StringUtil.isNotEmpty(id)){
			urlFormSub=urlFormSubRepository.get(id);
		}
		return getAutoView().addObject("urlFormSub", urlFormSub).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【子表例子】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowUrlEdit")
	public ModelAndView flowUrlEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		UrlFormSubPo urlFormSub=null;
		if(StringUtil.isNotEmpty(id)){
			urlFormSub=urlFormSubRepository.get(id);
		}
		return getAutoView().addObject("urlFormSub", urlFormSub).addObject("returnUrl", preUrl);
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
		UrlFormSubPo urlFormSub=null;
		if(StringUtil.isNotEmpty(id)){
			urlFormSub=urlFormSubRepository.get(id);
		}
		return getAutoView().addObject("urlFormSub", urlFormSub).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【子表例子】信息
	 *
	 * @param request
	 * @param response
	 * @param  urlFormSub
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlFormSubPo urlFormSubPo = getFromRequest(request);
			//构造领域对象和保存数据
			UrlFormSub urlFormSub =urlFormSubRepository.newInstance(urlFormSubPo);
			urlFormSub.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存子表例子成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对子表例子操作失败,"+e.getMessage());
			logger.error("对子表例子操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 保存【子表例子】信息
	 *
	 * @param request
	 * @param response
	 * @param  urlFormSub
	 * @throws Exception
	 */
	@RequestMapping("saveFlow")
	public void saveFlow(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlFormSubPo urlFormSubPo = getFromRequest(request);
			//构造领域对象和保存数据
			UrlFormSub urlFormSub =urlFormSubRepository.newInstance(urlFormSubPo);
			message = urlFormSub.saveFlow();
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "流程操作失败,"+e.getMessage());
			logger.error("流程操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private UrlFormSubPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		UrlFormSubPo urlFormSubPo = getUrlFormSubPo(jsonObj);

		return urlFormSubPo;
	}
	
	/** 
	 * 获取子表例子数据
	 *
	 * @param jsonObj
	 */
	private UrlFormSubPo getUrlFormSubPo(JSONObject jsonObj){
		UrlFormSubPo urlFormSubPo = (UrlFormSubPo) JsonUtil.getDTO(jsonObj.toString(), UrlFormSubPo.class);
		return urlFormSubPo;
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
			UrlFormSub urlFormSub =urlFormSubRepository.newInstance();
			urlFormSub.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除子表例子成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除子表例子失败，" + e.getMessage());
			logger.error("删除子表例子失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
