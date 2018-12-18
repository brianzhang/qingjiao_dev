package com.lc.ibps.platform.script.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.engine.script.IScript;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.script.domain.ConditionScript;
import com.lc.ibps.common.script.persistence.entity.ConditionScriptPo;
import com.lc.ibps.common.script.repository.ConditionScriptRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 条件脚本 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-org-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-01-09 14:59:46
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/script/conditionScript/")
public class ConditionScriptController extends GenericController {
	@Resource
	private ConditionScriptRepository conditionScriptRepository;

	/**
	 * 条件脚本列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<ConditionScriptPo> conditionScriptList = (PageList<ConditionScriptPo>) conditionScriptRepository
				.query(queryFilter);
		return new PageJson(conditionScriptList);
	}

	/**
	 * 编辑条件脚本信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		ConditionScriptPo conditionScript = null;
		if (StringUtil.isNotEmpty(id)) {
			conditionScript = conditionScriptRepository.get(id);
		} else {
			conditionScript = new ConditionScriptPo();
		}
		// 获取接口类的所以实现类
		List<Class<?>> implClasses = FileUtil.getAllClassesByInterface(IScript.class, false);

	//	List<SelectorPo> selectors = selectorRepository.findAll();// 获取所有的控件
		return getAutoView().addObject("conditionScript", conditionScript).addObject("implClasses", implClasses)
				.addObject("selectors", "").addObject("returnUrl", preUrl);
	}

	/**
	 * 条件脚本明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		ConditionScriptPo conditionScript = null;
		if (StringUtil.isNotEmpty(id)) {
			conditionScript = conditionScriptRepository.get(id);
		}
//		List<SelectorPo> selectors = selectorRepository.findAll();// 获取所有的控件
		return getAutoView().addObject("conditionScript", conditionScript).addObject("returnUrl", preUrl)
				.addObject("selectors",  "");
	}

	/**
	 * 保存条件脚本信息
	 *
	 * @param request
	 * @param response
	 * @param conditionScript
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, ConditionScriptPo po)
			throws Exception {
		String resultMsg = null;
		String id = po.getId();
		try {
			ConditionScript conditionScript = conditionScriptRepository.newInstance(po);
			if (StringUtil.isEmpty(id)) {
				conditionScript.create();
				resultMsg = "添加条件脚本成功";
			} else {
				conditionScript.update();
				resultMsg = "更新条件脚本成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对条件脚本操作失败";
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除条件脚本记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] aryIds = RequestUtil.getStringAryByStr(request, "id");
			ConditionScript conditionScript = conditionScriptRepository.newInstance();
			conditionScript.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除【条件脚本】成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除【条件脚本】失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 根据属性获取对象
	 * 
	 * @author hugh zhuang
	 * @date 2016年1月18日-下午3:12:46
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getObject")
	@ResponseBody
	public ConditionScriptPo getObject(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		ConditionScriptPo ConditionScript = null;
		if (StringUtil.isNotEmpty(id)) {
			ConditionScript = conditionScriptRepository.get(id);
		}
		return ConditionScript;
	}

	/**
	 * 通过类名获取类的所有方法
	 * 
	 * @author hugh zhuang
	 * @date 2016年1月18日-下午3:14:35
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getMethodsByClassName")
	@ResponseBody
	public String getMethodsByName(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String className = RequestUtil.getString(request, "className");
		String id = RequestUtil.getString(request, "id");
		JSONObject jobject = new JSONObject();
		try {
			ConditionScriptPo conditionScript = null;
			if (StringUtil.isNotEmpty(id)) {
				conditionScript = conditionScriptRepository.get(id);
			}
			JSONArray jarray = conditionScriptRepository.getMethodsByClassName(className, conditionScript);
			jobject.accumulate("result", true).accumulate("methods", jarray);
		} catch (Exception ex) {
			jobject.accumulate("result", false).accumulate("message", ex.getMessage());
		}
		return jobject.toString();
	}
	
	/**
	 * 条件脚本测试页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("execMethod")
	@ResponseBody
	public JSONObject test(String id,String args[]) throws Exception {
		Boolean flag = conditionScriptRepository.execMethod(id, args);
		JSONObject jObject = new JSONObject();
		jObject.put("flag", flag);
		return jObject;
	}
}
