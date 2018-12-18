package com.lc.ibps.platform.auth.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.service.ISubSysQueryService;
import com.lc.ibps.api.auth.service.ISubSysService;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.auth.utils.SubSystemUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.exception.BaseException;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.auth.builder.SubSytemBuilder;
import com.lc.ibps.org.auth.persistence.entity.SubSystemPo;

/**
 * 子系统 控制。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-5-上午10:57:22
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/auth/subsystem/")
public class SubsystemController extends GenericController {
	
	@Resource
	private ISubSysQueryService subSysQueryService;
	@Resource
	private ISubSysService subSysService;

	/**
	 * 编辑子系统信息页面
	 * 
	 * @param request
	 * @param response
	 * @return ModelAndView
	 * @throws Exception
	 * 
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception {
		boolean isTree = Boolean.valueOf(AppUtil.getProperty("auth.subsys.display.tree", "false"));
		if(isTree){
			return new ModelAndView("/platform/auth/subsystemManage.jsp");
		}
		
		return getAutoView();
	}
	
	/**
	 * 获取资源
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<SubSystemPo> getTreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<SubSystemPo> result = null;
		String listData = subSysQueryService.findAll();
		if(JacksonUtil.isJsonArray(listData)){
			result = SubSystemPo.fromJsonArrayString(listData);
		}

		SubSystemPo root = SubSystemPo.fromJsonString(subSysQueryService.getRoot("0"));
		if(BeanUtils.isEmpty(result)) 
			result = new ArrayList<SubSystemPo>();
		
		result.add(root);
		SubSytemBuilder.build(result);
		
		return result;
	}
	
	/**
	 * 子系统列表(分页条件查询)数据
	 * 
	 * @param request
	 * @param reponse
	 * @return PageJson
	 * @throws Exception
	 * 
	 */
	@RequestMapping("listJson")
	@ResponseBody
	public PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		
		String listData = subSysQueryService.query(queryFilter);
		PageList<SubSystemPo> subsystemList = null;
		if(JacksonUtil.isJsonObject(listData)){
			List<SubSystemPo> list = SubSystemPo.fromJsonArrayString(JacksonUtil.getString(listData, "data"));
			PageResult pageResult = PageResult.fromJson(JacksonUtil.getString(listData, "pageResult"));
			subsystemList = new PageList<SubSystemPo>(list, pageResult);
		}
		
		return new PageJson(subsystemList);
	}

	/**
	 * 编辑子系统信息页面
	 * 
	 * @param request
	 * @param response
	 * @return ModelAndView
	 * @throws Exception
	 * 
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		String parentId = RequestUtil.getString(request, "parentId");
		String parentName = "无";
		boolean tree = RequestUtil.getBoolean(request, "tree", false);
		
		SubSystemPo subsystem = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = subSysQueryService.get(id);
			subsystem = SubSystemPo.fromJsonString(data);
			SubSytemBuilder.build(subsystem);
		}else{
			subsystem = new SubSystemPo();
			subsystem.setParentId(parentId);
			subsystem.setIsLocal(true);
			subsystem.setLogo("fa fa-cogs");
			String data = subSysQueryService.get(parentId);
			SubSystemPo parent = SubSystemPo.fromJsonString(data);
			if(BeanUtils.isEmpty(parent)){
				subsystem.setParentName(parentName);
			}else{
				subsystem.setParentName(parent.getName());
			}
		}
		
		return getAutoView()
				.addObject("subsystem", subsystem)
				.addObject("tree", tree)
				.addObject("returnUrl", preUrl);
	}

	/**
	 * 系统用户信息明细页面
	 * 
	 * @param request
	 * @param response
	 * @return ModelAndView
	 * @throws Exception
	 * 
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		boolean tree = RequestUtil.getBoolean(request, "tree", false);
		
		SubSystemPo subsystem = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = subSysQueryService.get(id);
			subsystem = SubSystemPo.fromJsonString(data);
			SubSytemBuilder.build(subsystem);
		}
		return getAutoView()
				.addObject("subsystem", subsystem)
				.addObject("tree", tree)
				.addObject("returnUrl", preUrl);
	}

	/**
	 * 保存系统用户信息
	 * 
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, SubSystemPo po) throws Exception {
		String resultMsg = null;
		try {
			if(BeanUtils.isEmpty(po)){
				throw new BaseException("数据为空");
			}else{
				boolean isYes = subSysService.save(po.toJsonString());
				if (isYes) {
					resultMsg = "保存子系统信息成功!";
				} else {
					resultMsg = "系统别名已经存在，请重新输入!";
				}
				SubSystemPo curSubsystem = SubSystemUtil.getCurrentSystem(request);
				if (curSubsystem.getId().equals(po.getId()))// 如果修改是当前的系统
					SubSystemUtil.writeCookie(po, request, response);
				writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
			}
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), "子系统保存失败," + e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除系统用户记录(逻辑删除)
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
			boolean cascade = RequestUtil.getBoolean(request, "cascade", false);
			subSysService.deleteByIds(aryIds, cascade);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除子系统成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除子系统失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
