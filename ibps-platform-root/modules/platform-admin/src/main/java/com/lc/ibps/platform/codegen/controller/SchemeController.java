package com.lc.ibps.platform.codegen.controller;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.form.constants.FormMode;
import com.lc.ibps.api.form.model.IFormDef;
import com.lc.ibps.api.form.service.IFormDefService;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.components.codegen.domain.Scheme;
import com.lc.ibps.components.codegen.persistence.entity.DoTypePo;
import com.lc.ibps.components.codegen.persistence.entity.SchemeParamPo;
import com.lc.ibps.components.codegen.persistence.entity.SchemePo;
import com.lc.ibps.components.codegen.persistence.entity.TableConfigPo;
import com.lc.ibps.components.codegen.persistence.entity.VariablePo;
import com.lc.ibps.components.codegen.repository.DoTypeRepository;
import com.lc.ibps.components.codegen.repository.SchemeRepository;
import com.lc.ibps.components.codegen.repository.TableConfigRepository;
import com.lc.ibps.components.codegen.repository.VariableRepository;
import com.lc.ibps.form.form.strategy.form.FormbuilderStrategyFactory;
import com.lc.ibps.platform.codegen.builder.SchemeBuilder;

import net.sf.json.JSONObject;


/**
 * 生成方案 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-06 08:39:34
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/scheme/")
public class SchemeController extends GenericController{
	@Resource
	private SchemeRepository schemeRepository;
	@Resource
	private VariableRepository variableRepository;
	@Resource
	private TableConfigRepository tableConfigRepository;
	@Resource
	private BoDefRepository boDefRepository;
	@Resource
	private DoTypeRepository doTypeRepository;
	@Resource
	private TypeRepository typeRepository;
	
	/**
	 * 【生成方案】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<SchemePo> schemeList=(PageList<SchemePo>)schemeRepository.query(queryFilter);
		return new PageJson(schemeList);
	}
	
	/**
	 * 获取表单
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("formList")
	@ResponseBody
	public List<Map<String, String>> formList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String tableName = RequestUtil.getString(request, "tableName", "");
		if(StringUtil.isEmpty(tableName)){
			return Collections.emptyList();
		}
		
		String mode = FormMode.CODE_GEN.key();
		TableConfigPo tableConfigPo = tableConfigRepository.getByTableName(tableName);
		if(BeanUtils.isNotEmpty(tableConfigPo) && StringUtils.isNotEmpty(tableConfigPo.getBoId())){
			BoDefPo bindBoDefPo = boDefRepository.get(tableConfigPo.getBoId());
			mode = FormMode.BO.key();
			if(BeanUtils.isEmpty(bindBoDefPo)){
				tableName = "";
			}else{
				tableName = bindBoDefPo.getCode();
			}
		}
		
		List<IFormDef> formDefs = FormbuilderStrategyFactory.get(mode).findByCode(tableName);
		
		String formName = RequestUtil.getString(request, "formName", "");
		List<Map<String, String>> rs = SchemeBuilder.build(formDefs, formName);
		
		return rs;
	}
	
	/**
	 * 编辑【生成方案】信息页面
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
		String typeId=RequestUtil.getString(request, "typeId", "");
		SchemePo scheme=null;
		
		if(StringUtil.isNotEmpty(id)){
			scheme=schemeRepository.loadCascade(id);
			setLabel(scheme);
		}else{
			scheme = new SchemePo();
			String cuser = ContextUtil.getCurrentUserId();
			
			scheme.setCreator(cuser);
			scheme.setCreateTime(new Date());
			
			setVariables(scheme);
		}
		
		List<DoTypePo> doTypeList = doTypeRepository.findByTypeID(typeId, "doType");
		List<DoTypePo> templateList = doTypeRepository.findByTypeID(typeId, "template");
		
		return getAutoView().addObject("scheme", scheme)
				.addObject("doTypeList", doTypeList)
				.addObject("templateList", templateList)
				.addObject("returnUrl", preUrl)
				;
	}
	
	/**
	 * 设置表单展示名称
	 *
	 * @param scheme 
	 */
	private void setLabel(SchemePo scheme){
		if(BeanUtils.isNotEmpty(scheme) 
				&& BeanUtils.isNotEmpty(scheme.getFormIdentity())){
			IFormDefService formService = AppUtil.getBean(IFormDefService.class);
			IFormDef formDef = formService.getById(scheme.getFormIdentity());
			if(BeanUtils.isNotEmpty(formDef)){
				scheme.setFormLabel(formDef.getName());
			}
		}
		
		if(BeanUtils.isNotEmpty(scheme) 
				&& BeanUtils.isNotEmpty(scheme.getTableName())){
			TableConfigPo tableConfigPo = tableConfigRepository.getByTableName(scheme.getTableName());
			if(BeanUtils.isNotEmpty(tableConfigPo)){
				scheme.setClassVar(StringUtil.lowerFirst(tableConfigPo.getClassName()));
			}
		}
		
		if(BeanUtils.isNotEmpty(scheme) 
				&& BeanUtils.isNotEmpty(scheme.getTypeId())){
			TypePo type = typeRepository.get(scheme.getTypeId());
			if(BeanUtils.isNotEmpty(type)){
				scheme.setTypeName(type.getName());
			}
		}
	}
	
	private void setVariables(SchemePo scheme){
		String cuser = scheme.getCreator();
		VariablePo var = null;

		scheme.setDoType("default");
		
		var = variableRepository.getByKey("sys", cuser);
		if(BeanUtils.isNotEmpty(var) && BeanUtils.isNotEmpty(var.getValue())){
			scheme.setSys(var.getValue());
		}
		var = variableRepository.getByKey("app", cuser);
		if(BeanUtils.isNotEmpty(var) && BeanUtils.isNotEmpty(var.getValue())){
			scheme.setPlatform(var.getValue());
			scheme.setMenuUrl("/" + var.getValue());
		}
		
		var = variableRepository.getByKey("module", cuser);
		if(BeanUtils.isNotEmpty(var) && BeanUtils.isNotEmpty(var.getValue())){
			scheme.setModule(var.getValue());
			scheme.setMenuUrl(scheme.getMenuUrl() + "/" + var.getValue());
		}
		
		var = variableRepository.getByKey("developer", cuser);
		if(BeanUtils.isNotEmpty(var) && BeanUtils.isNotEmpty(var.getValue())){
			scheme.setDeveloper(var.getValue());
		}else{
			scheme.setDeveloper(ContextUtil.getCurrentUser().getFullname());
		}
		var = variableRepository.getByKey("email", cuser);
		if(BeanUtils.isNotEmpty(var) && BeanUtils.isNotEmpty(var.getValue())){
			scheme.setEmail(var.getValue());
		}else{
			scheme.setEmail(ContextUtil.getCurrentUser().getEmail());
		}
		
		var = variableRepository.getByKey("cAlias", cuser);
		if(BeanUtils.isNotEmpty(var) && BeanUtils.isNotEmpty(var.getValue())){
			scheme.setPackageUrl("com."+var.getValue());
		}
		var = variableRepository.getByKey("cPlatform", cuser);
		if(BeanUtils.isNotEmpty(var) && BeanUtils.isNotEmpty(var.getValue())){
			scheme.setPackageUrl(scheme.getPackageUrl() + "." + var.getValue() + "." + scheme.getSys());
		}
	}
	
	/**
	 * 【生成方案】明细页面
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
		SchemePo scheme=null;
		if(StringUtil.isNotEmpty(id)){
			scheme=schemeRepository.loadCascade(id);
			setLabel(scheme);
		}
		return getAutoView().addObject("scheme", scheme).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【生成方案】信息
	 *
	 * @param request
	 * @param response
	 * @param  scheme
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			SchemePo schemePo = getFromRequest(request);
			//构造领域对象和保存数据
			Scheme scheme =schemeRepository.newInstance(schemePo);
			scheme.saveCascade();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存生成方案成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对生成方案操作失败",e.getMessage());
			logger.error("对生成方案操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private SchemePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		List<SchemeParamPo> schemeParamPoList = getSchemeParamPoList(jsonObj);
		SchemePo schemePo = getSchemePo(jsonObj);
		schemePo.setSchemeParamPoList(schemeParamPoList);

		return schemePo;
	}
	
	/** 
	 * 获取表配置数据
	 *
	 * @param jsonObj
	 */
	private SchemePo getSchemePo(JSONObject jsonObj){
		SchemePo schemePo = (SchemePo) JsonUtil.getDTO(jsonObj.toString(), SchemePo.class);
		return schemePo;
	}
	
	/** 
	 * 获取字段配置数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<SchemeParamPo> getSchemeParamPoList(JSONObject jsonObj){
		List<SchemeParamPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("schemeParamPoList").toString(), 
													SchemeParamPo.class);
		jsonObj.discard("schemeParamPoList");
		return rs;
	}
	
	/** 
	 * 保存【生成方案】信息
	 *
	 * @param request
	 * @param response
	 * @param  scheme
	 * @throws Exception
	 */
	@RequestMapping("saveGen")
	public void saveGen(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			SchemePo schemePo = getFromRequest(request);
			//构造领域对象和保存数据
			Scheme scheme =schemeRepository.newInstance(schemePo);
			scheme.saveCascade();
			Map<String, String> rsMap = scheme.gen(new String[]{scheme.getId()}, ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "保存并生成代码成功");
			message.addVariable("filePath", rsMap.get("filePath"));
			message.addVariable("fileName", rsMap.get("fileName"));
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对生成方案操作失败，" + e.getMessage());
			logger.error("对生成方案操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  生成代码
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("gen")
	public void gen(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			// 获得id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			// 构造领域对象和保存数据
			Scheme scheme =schemeRepository.newInstance();
			Map<String, String> rsMap = scheme.gen(ids, ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "生成代码成功");
			message.addVariable("filePath", rsMap.get("filePath"));
			message.addVariable("fileName", rsMap.get("fileName"));
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "生成代码失败，" + e.getMessage());
			logger.error("生成代码失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  发布代码到容器
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("deploy")
	public void deploy(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			// 获得id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			// 构造领域对象和保存数据
			Scheme scheme =schemeRepository.newInstance();
			scheme.deploy(ids, ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "发布代码成功，请重启容器");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "发布代码失败，" + e.getMessage());
			logger.error("发布代码失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 保存【生成方案】信息
	 *
	 * @param request
	 * @param response
	 * @param  scheme
	 * @throws Exception
	 */
	@RequestMapping("saveGenWorkspace")
	public void saveGenWorkspace(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			SchemePo schemePo = getFromRequest(request);
			//构造领域对象和保存数据
			Scheme scheme =schemeRepository.newInstance(schemePo);
			scheme.saveCascade();
			scheme.genWorkspace(new String[]{scheme.getId()}, ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "保存并生成代码成功,请刷新工作目录");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对生成方案操作失败，" + e.getMessage());
			logger.error("对生成方案操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  生成代码
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("genWorkspace")
	public void genWorkspace(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			// 获得id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			// 构造领域对象和保存数据
			Scheme scheme =schemeRepository.newInstance();
			scheme.genWorkspace(ids, ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "生成代码成功,请刷新工作目录");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "生成代码失败，" + e.getMessage());
			logger.error("生成代码失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量复制【生成方案】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("copy")
	public void copy(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待复制的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			Scheme scheme =schemeRepository.newInstance();
			scheme.copy(ids, ContextUtil.getCurrentUserId());
			message=new ResultMessage(ResultMessage.SUCCESS, "复制生成方案成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "复制生成方案失败，" + e.getMessage());
			logger.error("复制生成方案失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【生成方案】记录
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
			Scheme scheme =schemeRepository.newInstance();
			scheme.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除生成方案成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除生成方案失败，" + e.getMessage());
			logger.error("删除生成方案失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
}
