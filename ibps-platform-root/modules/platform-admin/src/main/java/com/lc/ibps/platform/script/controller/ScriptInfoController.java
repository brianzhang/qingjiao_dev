
package com.lc.ibps.platform.script.controller;

import java.lang.reflect.Method;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.common.cat.constants.CategoryConstants;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.common.script.domain.ScriptInfo;
import com.lc.ibps.common.script.persistence.entity.ScriptInfoPo;
import com.lc.ibps.common.script.repository.ScriptInfoRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


/**
 * 脚本管理 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-28 16:07:44
 *</pre>
 */
@Controller
@RequestMapping("/platform/script/scriptInfo/")
public class ScriptInfoController extends GenericController{
	@Resource
	private ScriptInfoRepository scriptInfoRepository;
	@Resource
	private TypeRepository typeRepository;
	
	/**
	 * 常用脚本列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		List<TypePo> typeList = typeRepository.findByCategoryKey(CategoryConstants.CAT_SCRIPT.key());
		return getAutoView().addObject("typeList", typeList);
	}
	
	/**
	 * 【脚本管理】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ScriptInfoPo> scriptInfoList=(PageList<ScriptInfoPo>)scriptInfoRepository.query(queryFilter);
		replaceCatTypeName(scriptInfoList);
		return new PageJson(scriptInfoList);
	}
	
	/**
	 * 替换脚本分类typeKey为分类名称
	 *
	 * @param scriptInfoList 
	 */
	private void replaceCatTypeName(PageList<ScriptInfoPo> scriptInfoList){
		List<TypePo> typeList = typeRepository.findByCategoryKey(CategoryConstants.CAT_SCRIPT.key());
		for(ScriptInfoPo scriptInfo : scriptInfoList){
			for(TypePo type : typeList){
				if(type.getTypeKey().equals(scriptInfo.getType())){
					scriptInfo.setType(type.getName());
				}
			}
		}
	}
	
	/**
	 * 编辑【脚本管理】信息页面
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
		ScriptInfoPo scriptInfo=null;
		List<TypePo> typeList = typeRepository.findByCategoryKey(CategoryConstants.CAT_SCRIPT.key());
		if(StringUtil.isNotEmpty(id)){
			scriptInfo=scriptInfoRepository.get(id);
		}
		return getAutoView().addObject("scriptInfo", scriptInfo)
				.addObject("returnUrl", preUrl)
				.addObject("typeList", typeList);
	}
	
	/**
	 * 编辑【脚本管理】信息页面
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
		ScriptInfoPo scriptInfo=null;
		List<TypePo> typeList = typeRepository.findByCategoryKey(CategoryConstants.CAT_SCRIPT.key());
		if(StringUtil.isNotEmpty(id)){
			scriptInfo=scriptInfoRepository.get(id);
		}
		return getAutoView().addObject("scriptInfo", scriptInfo)
				.addObject("returnUrl", preUrl)
				.addObject("typeList", typeList);
	}
	
	/**
	 * 【脚本管理】明细页面
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
		ScriptInfoPo scriptInfo=null;
		if(StringUtil.isNotEmpty(id)){
			scriptInfo=scriptInfoRepository.get(id);
			if(null != scriptInfo){
				TypePo type = typeRepository.getByCategoryKeyAndTypeKey(
						CategoryConstants.CAT_SCRIPT.key(), 
						scriptInfo.getType());
				scriptInfo.setType(type.getName());
			}
		}
		return getAutoView().addObject("scriptInfo", scriptInfo).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【脚本管理】信息
	 *
	 * @param request
	 * @param response
	 * @param  scriptInfo
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ScriptInfoPo scriptInfoPo = getFromRequest(request);
			//构造领域对象和保存数据
			ScriptInfo scriptInfo =scriptInfoRepository.newInstance(scriptInfoPo);
			scriptInfo.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存脚本管理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对脚本管理操作失败,"+e.getMessage());
			logger.error("对脚本管理操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ScriptInfoPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ScriptInfoPo scriptInfoPo = getScriptInfoPo(jsonObj);

		return scriptInfoPo;
	}
	
	/** 
	 * 获取脚本管理数据
	 *
	 * @param jsonObj
	 */
	private ScriptInfoPo getScriptInfoPo(JSONObject jsonObj){
		ScriptInfoPo scriptInfoPo = (ScriptInfoPo) JsonUtil.getDTO(jsonObj.toString(), ScriptInfoPo.class);
		return scriptInfoPo;
	}
	
	/**
	 *  批量删除【脚本管理】记录
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
			ScriptInfo scriptInfo =scriptInfoRepository.newInstance();
			scriptInfo.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除脚本管理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除脚本管理失败，" + e.getMessage());
			logger.error("删除脚本管理失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  校验方法一致性
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("validation")
	public void validation(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			validation(request);
			message=new ResultMessage(ResultMessage.SUCCESS, "校验方法一致性成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "校验方法一致性失败，" + e.getMessage());
			logger.error("校验方法一致性失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 校验方法一致性
	 *
	 * @param request 
	 */
	private void validation(HttpServletRequest request){
		String className = RequestUtil.getString(request, "className");
		String methodName = RequestUtil.getString(request, "methodName");
		String classInsName = RequestUtil.getString(request, "classInsName");
		String returnType = RequestUtil.getString(request, "returnType");
		String argument = RequestUtil.getString(request, "argument");
		
		StringBuilder errorMessage = new StringBuilder();
		if(StringUtil.isEmpty(className)){
			errorMessage.append("类名为空").append("|");
		}
		if(StringUtil.isEmpty(methodName)){
			errorMessage.append("方法名为空").append("|");
		}
		if(StringUtil.isEmpty(classInsName)){
			errorMessage.append("对象名为空").append("|");
		}
		if(StringUtil.isEmpty(returnType)){
			errorMessage.append("返回类型为空").append("|");
		}
		
		if(errorMessage.length() > 0){
			errorMessage.setLength(errorMessage.length() - 1);
			throw new RuntimeException(errorMessage.toString());
		}
		
		// 类名校验
		Class<?> cls = null;
		try {
			cls = Class.forName(className);
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("类名【" + className + "】不正确，请填写完整的类路径");
		}
		
		// 对象名校验
		Object classIns = AppUtil.getBean(classInsName);
		if(com.lc.ibps.base.core.util.BeanUtils.isEmpty(classIns)){
			throw new RuntimeException("对象【" + classInsName + "】不存在");
		}
		
		// 返回类型
		Class<?> rtcls = null;
		try {
			rtcls = Class.forName(returnType);
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("返回类型【" + returnType + "】不正确，请填写完整的类路径");
		}
		
		// 参数列表
		Class<?>[] paramTypeArr = null;
		if(JsonUtil.isJsonArray(argument)){
			JSONArray args = JSONArray.fromObject(argument);
			paramTypeArr = new Class<?>[args.size()];
			Class<?> paramType = null;
			for(int i = 0, ln = args.size(); i < ln; i ++){
				JSONObject arg = args.getJSONObject(i);
				String paramClassName = arg.getString("paramType");
				try {
					paramType = Class.forName(paramClassName);
				} catch (ClassNotFoundException e) {
					throw new RuntimeException("参数类型【" + paramClassName + "】不正确，请填写完整的类路径");
				}
				
				paramTypeArr[i] = paramType;
			}
		}
		
		// 方法校验
		Method method = org.springframework.beans.BeanUtils.findMethod(cls, methodName, paramTypeArr);
		if(com.lc.ibps.base.core.util.BeanUtils.isEmpty(method)){
			throw new RuntimeException("方法名【" + methodName + "】返回类型【" + returnType + "】不存在");
		}else{
			// 返回类型是否一致
			Class<?> rtTypeCls = method.getReturnType();
			if(!rtcls.getName().equals(rtTypeCls.getName())){
				throw new RuntimeException("返回类型【" + rtcls.getName() + "】不匹配【" + rtTypeCls.getName() + "】");
			}
		}
	}
	
}
