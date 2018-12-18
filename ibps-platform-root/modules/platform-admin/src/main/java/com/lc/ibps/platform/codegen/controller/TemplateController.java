package com.lc.ibps.platform.codegen.controller;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.components.codegen.domain.Template;
import com.lc.ibps.components.codegen.persistence.entity.TemplatePo;
import com.lc.ibps.components.codegen.repository.TemplateRepository;
import com.lc.ibps.platform.codegen.builder.TemplateBuilder;

/**
 * 代码模板 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-04 08:38:58
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/template/")
public class TemplateController extends GenericController{
	@Resource
	private TemplateRepository templateRepository;
	
	/**
	 * 【代码模板】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<TemplatePo> templateList=(PageList<TemplatePo>)templateRepository.query(queryFilter);
		return new PageJson(templateList);
	}
	
	/**
	 * 获取模板列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("templateList")
	@ResponseBody
	public List<Map<String, String>> templateList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String templateKey=RequestUtil.getString(request, "key");
		String templateKeys=RequestUtil.getString(request, "keys");
		DefaultQueryFilter queryFilter=new DefaultQueryFilter();
		queryFilter.setPage(null);
		queryFilter.addFilter("KEY_", "%"+templateKey+"%", QueryOP.LIKE);
		List<TemplatePo> templateList = templateRepository.query(queryFilter);
		List<Map<String, String>> rs = TemplateBuilder.build(templateList, templateKeys, templateKey);
		return rs;
	}
	
	/**
	 * 获取模板列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("templateByTypeListJson")
	@ResponseBody
	public List<TemplatePo> templateByTypeListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String typeId=RequestUtil.getString(request, "typeId", "");
		List<TemplatePo> templateList = templateRepository.findByTypeID(typeId);
		return templateList;
	}
	
	/**
	 * 编辑【代码模板】信息页面
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
		TemplatePo template=null;
		if(StringUtil.isNotEmpty(id)){
			template=templateRepository.get(id);
		}else{
			template=new TemplatePo();
			template.setCreator(ContextUtil.getCurrentUserId());
			template.setIsDef(StringPool.N);
			template.setCreateTime(new Date());
		}
		
		return getAutoView().addObject("template", template).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【代码模板】明细页面
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
		TemplatePo template=null;
		if(StringUtil.isNotEmpty(id)){
			template=templateRepository.get(id);
		}
		return getAutoView().addObject("template", template).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【代码模板】信息
	 *
	 * @param request
	 * @param response
	 * @param  template
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,TemplatePo templatePo) throws Exception{
		ResultMessage message=null;
		try {
			//构造领域对象和保存数据
			Template template =templateRepository.newInstance(templatePo);
			template.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存代码模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对代码模板操作失败，"+e.getMessage());
			logger.error("对代码模板操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【代码模板】记录
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
			Template template =templateRepository.newInstance();
			template.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除代码模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除代码模板失败，" + e.getMessage());
			logger.error("删除代码模板失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 初始化【代码模板】信息
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("init")
	public void init(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			Template template =templateRepository.newInstance();
			template.initTemplate(ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "初始化代码模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "初始化代码模板失败，"+ e.getMessage());
			logger.error("初始化代码模板失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 
	 * 设置分类
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setCategory")
	public void setCategory(HttpServletRequest request,HttpServletResponse response) throws Exception {
		PrintWriter writer = response.getWriter();
		String typeId = RequestUtil.getString(request, "typeId");
		String[] templateIds = RequestUtil.getStringAryByStr(request, "templateIds");
		//判断分类是否为空
		if (StringUtil.isEmpty(typeId)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL,"请选择需要设置的分类!"));
			return;
		}
		//判断是否选择
		if (BeanUtils.isEmpty(templateIds)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL,"请选择需要设置的模板"));
			return;
		}
		
		List<String> templateIdList = Arrays.asList(templateIds);
		try {
			Template templateDomain = templateRepository.newInstance();
			templateDomain.updateType(typeId, templateIdList);
			writeResultMessage(writer, new ResultMessage(ResultMessage.SUCCESS, "设置分类成功!"));
		} catch (Exception ex) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "设置分类失败，" + ex.getMessage()));
			logger.error("设置分类失败，" + ex.getMessage(), ex);
		}
	}
	
}
