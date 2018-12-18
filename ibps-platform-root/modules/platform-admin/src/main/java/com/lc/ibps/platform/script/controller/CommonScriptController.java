package com.lc.ibps.platform.script.controller;


import java.util.ArrayList;
import java.util.HashMap;
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
import com.lc.ibps.api.common.cat.constants.CategoryConstants;
import com.lc.ibps.base.core.engine.script.GroovyScriptEngine;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.common.script.domain.CommonScript;
import com.lc.ibps.common.script.helper.CommonScriptVoBuilder;
import com.lc.ibps.common.script.persistence.entity.CommonScriptPo;
import com.lc.ibps.common.script.persistence.model.CommonScriptVo;
import com.lc.ibps.common.script.repository.CommonScriptRepository;

/**
* 常用脚本  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：xu qiang
* 邮箱：819842974@qq.com
* 日期：2015-12-16 09:29:20
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/script/commonScript/")
public class CommonScriptController extends GenericController{
	@Resource
	private CommonScriptRepository commonScriptRepository;
	@Resource
	private TypeRepository typeRepository;
	
	/**
	 * 验证expression中的脚本
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("validateScript")
	@ResponseBody
	public Object validateScript(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String script = RequestUtil.getString(request, "script");
		GroovyScriptEngine engine = (GroovyScriptEngine) AppUtil.getBean(GroovyScriptEngine.class);

		Map<String, Object> reObj = new HashMap<String, Object>();
		try {
			Object result = engine.executeObject(script, null);
			reObj.put("hasError", false);
			reObj.put("errorMsg", "");

			if (result != null) {
				reObj.put("result", result);
				reObj.put("resultType", result.getClass().getName());
			}
		} catch (Exception ex) {
			reObj.put("hasError", true);
			reObj.put("errorMsg", ex.getMessage());
		}
		return reObj;
	}
	
	/**
	 * 常用脚本列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<CommonScriptPo> commonScriptList=(PageList<CommonScriptPo>)commonScriptRepository.query(queryFilter);
		replaceCatTypeName(commonScriptList);
		return new PageJson(commonScriptList);
	}
	
	
	/**
	 * 替换脚本分类typeKey为分类名称
	 *
	 * @param commonScriptList 
	 */
	private void replaceCatTypeName(PageList<CommonScriptPo> commonScriptList){
		List<TypePo> typeList = typeRepository.findByCategoryKey(CategoryConstants.CAT_SCRIPT.key());
		for(CommonScriptPo commonScript : commonScriptList){
			for(TypePo type : typeList){
				if(type.getTypeKey().equals(commonScript.getCategory())){
					commonScript.setCategory(type.getName());
				}
			}
		}
	}
	
	/**
	 * 常用脚本列表树结构数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("genTreeJson")
	public @ResponseBody List<CommonScriptVo> genTreeJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		List<CommonScriptPo> commonScriptList = commonScriptRepository.query(queryFilter);
		return genCommonScriptVo(commonScriptList);
	}
	
	/**
	 * 生成常用脚本Vo集合
	 *
	 * @param commonScriptList
	 * @return 
	 */
	private List<CommonScriptVo> genCommonScriptVo(List<CommonScriptPo> commonScriptList){
		List<CommonScriptVo> commonScriptVoList = new ArrayList<CommonScriptVo>();
		if(null != commonScriptList){
			List<TypePo> typeList = typeRepository.findByCategoryKey(CategoryConstants.CAT_SCRIPT.key());
			Map<String, TypePo> map = new HashMap<String,TypePo>();
			for (TypePo type : typeList) {
				CommonScriptVo tmpVo = CommonScriptVoBuilder.buildByType(type);
				commonScriptVoList.add(tmpVo);
				map.put(type.getTypeKey(), type);
			}
			for (CommonScriptPo commonScript : commonScriptList) {
				CommonScriptVo tmpVo = CommonScriptVoBuilder.buildByCommonScript(commonScript, map);
				commonScriptVoList.add(tmpVo);
			}
			return commonScriptVoList;
		}
		return null;
	}
	
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
	 * 编辑常用脚本信息页面
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
		List<TypePo> typeList = typeRepository.findByCategoryKey(CategoryConstants.CAT_SCRIPT.key());
		CommonScriptPo commonScript=null;
		if(StringUtil.isNotEmpty(id)){
			commonScript=commonScriptRepository.get(id);
		}
		return getAutoView().addObject("commonScript", commonScript)
				.addObject("returnUrl", preUrl)
				.addObject("typeList", typeList);
	}
	
	/**
	 * 常用脚本明细页面
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
		CommonScriptPo commonScript=null;
		if(StringUtil.isNotEmpty(id)){
			commonScript=commonScriptRepository.get(id);
			if(null != commonScript){
				TypePo type = typeRepository.getByCategoryKeyAndTypeKey(
						CategoryConstants.CAT_SCRIPT.key(), 
						commonScript.getCategory());
				commonScript.setCategory(type.getName());
			}
		}
		return getAutoView().addObject("commonScript", commonScript)
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存常用脚本信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,CommonScriptPo po) throws Exception{
		String resultMsg=null;
		String id=po.getId();
		try {
			CommonScript commonScript = commonScriptRepository.newInstance(po);
			if(StringUtil.isEmpty(id)){
				commonScript.create();
				resultMsg="添加常用脚本成功";
			}else{
				commonScript.update();
				resultMsg="更新常用脚本成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对常用脚本操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除常用脚本记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] aryIds=RequestUtil.getStringAryByStr(request, "id");
			CommonScript commonScript = commonScriptRepository.newInstance();
			commonScript.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除常用脚本成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除常用脚本失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("selectorDialog")
	public ModelAndView selectorDialog(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		List<TypePo> typeList = typeRepository.findByCategoryKey(CategoryConstants.CAT_SCRIPT.key());
		return getAutoView().addObject("typeList", typeList);
	}
	
}
