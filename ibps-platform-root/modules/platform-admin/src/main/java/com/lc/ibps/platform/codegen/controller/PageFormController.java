
package com.lc.ibps.platform.codegen.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
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
import com.lc.ibps.components.codegen.repository.PageFormRepository;
import com.lc.ibps.components.codegen.persistence.entity.PageFormPo;
import com.lc.ibps.components.codegen.domain.PageForm;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 页面表单管理 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-13 15:30:38
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/pageForm/")
public class PageFormController extends GenericController{
	@Resource
	private PageFormRepository pageFormRepository;
	
	/**
	 * 【页面表单管理】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<PageFormPo> pageFormList=(PageList<PageFormPo>)pageFormRepository.query(queryFilter);
		return new PageJson(pageFormList);
	}
	
	/**
	 * 编辑【页面表单管理】信息页面
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
		PageFormPo pageForm=null;
		if(StringUtil.isNotEmpty(id)){
			pageForm=pageFormRepository.get(id);
		}
		return getAutoView().addObject("pageForm", pageForm).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【页面表单管理】信息页面
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
		PageFormPo pageForm=null;
		if(StringUtil.isNotEmpty(id)){
			pageForm=pageFormRepository.get(id);
		}
		return getAutoView().addObject("pageForm", pageForm).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【页面表单管理】明细页面
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
		PageFormPo pageForm=null;
		if(StringUtil.isNotEmpty(id)){
			pageForm=pageFormRepository.get(id);
		}
		return getAutoView().addObject("pageForm", pageForm).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【页面表单管理】信息
	 *
	 * @param request
	 * @param response
	 * @param  pageForm
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			PageFormPo pageFormPo = getFromRequest(request);
			
			if( pageFormRepository.getByPageKey( pageFormPo.getPageKey() ) == null || StringUtils.isNotEmpty(pageFormPo.getId() )) {
				//构造领域对象和保存数据
				PageForm pageForm =pageFormRepository.newInstance(pageFormPo);
				pageForm.save();
				message=new ResultMessage(ResultMessage.SUCCESS, "保存页面表单管理成功");
			}else {
				message=new ResultMessage(ResultMessage.FAIL, "页面Key已存在");
			}
			
			
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对页面表单管理操作失败,"+e.getMessage());
			logger.error("对页面表单管理操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PageFormPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		PageFormPo pageFormPo = getPageFormPo(jsonObj);

		return pageFormPo;
	}
	
	/** 
	 * 获取页面表单管理数据
	 *
	 * @param jsonObj
	 */
	private PageFormPo getPageFormPo(JSONObject jsonObj){
		PageFormPo pageFormPo = (PageFormPo) JsonUtil.getDTO(jsonObj.toString(), PageFormPo.class);
		return pageFormPo;
	}
	
	
	/**
	 *  批量删除【页面表单管理】记录
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
			PageForm pageForm =pageFormRepository.newInstance();
			pageForm.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除页面表单管理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除页面表单管理失败，" + e.getMessage());
			logger.error("删除页面表单管理失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
