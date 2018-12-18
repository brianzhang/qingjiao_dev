
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
import com.lc.ibps.test.demo.repository.UrlFormRepository;
import com.lc.ibps.test.demo.persistence.entity.UrlFormPo;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;
import com.lc.ibps.test.demo.domain.UrlForm;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;

import java.util.List;

/**
 * url表单例子 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
@Controller
@RequestMapping("/platform/demo/urlForm/")
public class UrlFormController extends GenericController{
	@Resource
	private UrlFormRepository urlFormRepository;
	
	/**
	 * 【url表单例子】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<UrlFormPo> urlFormList=(PageList<UrlFormPo>)urlFormRepository.query(queryFilter);
		return new PageJson(urlFormList);
	}
	
	/**
	 * 编辑【url表单例子】信息页面
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
		UrlFormPo urlForm=null;
		if(StringUtil.isNotEmpty(id)){
			urlForm=urlFormRepository.loadCascade(id);
		}
		return getAutoView().addObject("urlForm", urlForm).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【url表单例子】信息页面
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
		UrlFormPo urlForm=null;
		if(StringUtil.isNotEmpty(id)){
			urlForm=urlFormRepository.loadCascade(id);
		}
		return getAutoView().addObject("urlForm", urlForm).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【url表单例子】明细页面
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
		UrlFormPo urlForm=null;
		if(StringUtil.isNotEmpty(id)){
			urlForm=urlFormRepository.loadCascade(id);
		}
		return getAutoView().addObject("urlForm", urlForm).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【url表单例子】信息
	 *
	 * @param request
	 * @param response
	 * @param  urlForm
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			UrlFormPo urlFormPo = getFromRequest(request);
			//构造领域对象和保存数据
			UrlForm urlForm =urlFormRepository.newInstance(urlFormPo);
			urlForm.saveCascade();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存url表单例子成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对url表单例子操作失败,"+e.getMessage());
			logger.error("对url表单例子操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private UrlFormPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		List<UrlFormSub2Po> urlFormSub2PoList = getUrlFormSub2PoList(jsonObj);
		UrlFormPo urlFormPo = getUrlFormPo(jsonObj);
		urlFormPo.setUrlFormSub2PoList(urlFormSub2PoList);

		return urlFormPo;
	}
	
	/** 
	 * 获取url表单例子数据
	 *
	 * @param jsonObj
	 */
	private UrlFormPo getUrlFormPo(JSONObject jsonObj){
		UrlFormPo urlFormPo = (UrlFormPo) JsonUtil.getDTO(jsonObj.toString(), UrlFormPo.class);
		return urlFormPo;
	}
	
	/** 
	 * 获取子表例子数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<UrlFormSub2Po> getUrlFormSub2PoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("urlFormSub2PoList")){
			return null;
		}
		
		List<UrlFormSub2Po> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("urlFormSub2PoList").toString(), 
													UrlFormSub2Po.class);
		jsonObj.discard("urlFormSub2PoList");
		return rs;
	}
	
	/**
	 *  批量删除【url表单例子】记录
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
			UrlForm urlForm =urlFormRepository.newInstance();
			urlForm.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除url表单例子成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除url表单例子失败，" + e.getMessage());
			logger.error("删除url表单例子失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  启动流程
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("startFlow")
	public void startFlow(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			String defKey = RequestUtil.getString(request, "defKey");
			String destination = RequestUtil.getString(request, "destination");
			//构造领域对象和保存数据
			UrlForm urlForm =urlFormRepository.newInstance();
			urlForm.startFlow(defKey, destination, ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "url表单例子流程启动成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "url表单例子流程启动失败，" + e.getMessage());
			logger.error("url表单例子流程启动失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
