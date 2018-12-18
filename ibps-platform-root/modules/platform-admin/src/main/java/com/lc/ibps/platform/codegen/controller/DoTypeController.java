package com.lc.ibps.platform.codegen.controller;

import java.util.Collections;
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
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.components.codegen.domain.DoType;
import com.lc.ibps.components.codegen.persistence.entity.DoTypePo;
import com.lc.ibps.components.codegen.persistence.entity.TemplatePo;
import com.lc.ibps.components.codegen.repository.DoTypeRepository;
import com.lc.ibps.components.codegen.repository.TemplateRepository;
import com.lc.ibps.platform.codegen.builder.DoTypeBuilder;
import com.lc.ibps.platform.codegen.builder.TemplateBuilder;


/**
 * 生成类型 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-05 09:00:32
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/doType/")
public class DoTypeController extends GenericController{
	@Resource
	private DoTypeRepository doTypeRepository;
	@Resource
	private TemplateRepository templateRepository;
	
	/**
	 * 【生成类型】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DoTypePo> doTypeList=(PageList<DoTypePo>)doTypeRepository.query(queryFilter);
		DoTypeBuilder.build(doTypeList);
		return new PageJson(doTypeList);
	}
	
	/**
	 * 获取生成类型列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("doTypeList")
	@ResponseBody
	public List<Map<String, String>> doTypeList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String doTypeKey=RequestUtil.getString(request, "key");
		String doTypeKeys=RequestUtil.getString(request, "keys");
		String subType=RequestUtil.getString(request, "subType");
		DefaultQueryFilter queryFilter=new DefaultQueryFilter();
		queryFilter.setPage(null);
		if(StringUtil.isNotEmpty(subType)){
			queryFilter.addFilter("SUB_TYPE_", subType, QueryOP.EQUAL);
		}
		queryFilter.addFilter("KEY_", "%"+doTypeKey+"%", QueryOP.LIKE);
		List<DoTypePo> doTypeList = doTypeRepository.query(queryFilter);
		List<Map<String, String>> rs = DoTypeBuilder.build(doTypeList, doTypeKeys, doTypeKey);
		return rs;
	}
	
	/**
	 * 获取生成类型列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("doTypeGroupList")
	@ResponseBody
	public List<Map<String, Object>> doTypeGroupList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String doTypeKey=RequestUtil.getString(request, "key");
		String doTypeKeys=RequestUtil.getString(request, "keys");
		DefaultQueryFilter queryFilter=new DefaultQueryFilter();
		queryFilter.setPage(null);
		queryFilter.addFilter("SUB_TYPE_", "doType", QueryOP.EQUAL);
		queryFilter.addFilter("KEY_", "%"+doTypeKey+"%", QueryOP.LIKE);
		List<DoTypePo> doTypeList = doTypeRepository.query(queryFilter);
		List<Map<String, Object>> rs = DoTypeBuilder.build("DoTypeKeys", doTypeList, doTypeKeys, doTypeKey);
		
		queryFilter.addFilter("SUB_TYPE_", "template", QueryOP.EQUAL);
		List<DoTypePo> doTypeTemplateList = doTypeRepository.query(queryFilter);
		List<Map<String, Object>> rsTemplate = DoTypeBuilder.build("DoType", doTypeTemplateList, doTypeKeys, doTypeKey);
		rs.addAll(rsTemplate);
		
		return rs;
	}
	
	/**
	 * 获取生成类型列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("doTypeListJson")
	@ResponseBody
	public List<DoTypePo> doTypeListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String typeId=RequestUtil.getString(request, "typeId","");
		String subType=RequestUtil.getString(request, "subType","");
		
		List<DoTypePo> doTypeList = doTypeRepository.findByTypeID(typeId, subType);
		
		return doTypeList;
	}
	
	/**
	 * 编辑【生成类型】信息页面
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
		DoTypePo doType=null;
		List<TemplatePo> templateList = null;
		List<DoTypePo> doTypeList = null;
		if(StringUtil.isNotEmpty(id)){
			doType=doTypeRepository.get(id);
			if(BeanUtils.isNotEmpty(doType) && "template".equals(doType.getSubType())) {
				templateList = templateRepository.findByTypeID(doType.getTypeId());
			}else if(BeanUtils.isNotEmpty(doType) && "doType".equals(doType.getSubType())) {
				doTypeList = doTypeRepository.findByTypeID(doType.getTypeId(),null);
				doTypeList.remove(doType);
			}
			DoTypeBuilder.build(doType);
		}else{
			doType = new DoTypePo();
			doType.setCreator(ContextUtil.getCurrentUserId());
			doType.setCreateTime(new Date());
			templateList = templateRepository.findByTypeID(null);
		}
			
		return getAutoView().addObject("doType", doType)
				.addObject("templateList", templateList)
				.addObject("doTypeList", doTypeList)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 获取生成类型/模板列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("doTypeOrTemplateListJson")
	@ResponseBody
	public List<Map<String, Object>> doTypeOrTemplateListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String doTypeId=RequestUtil.getString(request, "doTypeId", "");
		String typeId=RequestUtil.getString(request, "typeId", "");
		String subType=RequestUtil.getString(request, "subType", "");
		
		List<TemplatePo> templateList = null;
		List<DoTypePo> doTypeList = null;
		
		DoTypePo doType = null;
		if(StringUtil.isNotEmpty(doTypeId)){
			doType = doTypeRepository.get(doTypeId);
		}
		
		List<Map<String, Object>> rs = null;
		
		if("template".equals(subType)) {
			templateList = templateRepository.findByTypeID(typeId);
			rs = TemplateBuilder.buildMapList(templateList);
		}else if("doType".equals(subType)) {
			doTypeList = doTypeRepository.findByTypeID(typeId, null);
			doTypeList.remove(doType);
			rs = DoTypeBuilder.buildMapList(doTypeList);
		}else{
			rs = Collections.emptyList();
		}
		
		return rs;
	}
	
	/**
	 * 【生成类型】明细页面
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
		DoTypePo doType=null;
		if(StringUtil.isNotEmpty(id)){
			doType=doTypeRepository.get(id);
			DoTypeBuilder.build(doType);
		}
		return getAutoView().addObject("doType", doType).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【生成类型】信息
	 *
	 * @param request
	 * @param response
	 * @param  doType
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,DoTypePo doTypePo) throws Exception{
		ResultMessage message=null;
		try {
			//构造领域对象和保存数据
			DoType doType =doTypeRepository.newInstance(doTypePo);
			doType.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存生成类型成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对生成类型操作失败",e.getMessage());
			logger.error("对生成类型操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【生成类型】记录
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
			DoType doType =doTypeRepository.newInstance();
			doType.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除生成类型成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除生成类型失败");
			logger.error("删除生成类型失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
