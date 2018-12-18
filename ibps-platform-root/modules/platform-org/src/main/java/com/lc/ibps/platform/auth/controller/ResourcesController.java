package com.lc.ibps.platform.auth.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.service.IResourcesQueryService;
import com.lc.ibps.api.auth.service.IResourcesService;
import com.lc.ibps.api.auth.service.ISubSysQueryService;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.FieldSort;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.auth.utils.SubSystemUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.Dom4jUtil;
import com.lc.ibps.base.core.util.ExceptionUtil;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringEscaper;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.db.mybatis.domain.DefaultFieldSort;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.auth.persistence.entity.ResourcesPo;
import com.lc.ibps.org.auth.persistence.entity.SubSystemPo;

/**
 * 系统资源管理。
 * 
 * <pre>
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-5-下午8:02:50
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/auth/resources")
public class ResourcesController extends GenericController {
	
	@Resource
	private ISubSysQueryService subSysQueryService;
	@Resource
	private IResourcesService resourcesService;
	@Resource
	private IResourcesQueryService resourcesQueryService;

	/**
	 * 管理
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("manage")
	public ModelAndView manage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String curSubsysId = SubSystemUtil.getCurrentSystemId(request);
		List<SubSystemPo> result = query(queryFilter);
		return getAutoView().addObject("subSystemList", result).addObject("curSubsysId", curSubsysId);
	}
	
	/**
	 * 在线代码生成器添加菜单资源
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("addResource")
	public ModelAndView addResource(HttpServletRequest request, HttpServletResponse response) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String curSubsysId = SubSystemUtil.getCurrentSystemId(request);
		String menuUrl = RequestUtil.getString(request, "menuUrl", "");
		List<SubSystemPo> result = query(queryFilter);
		return getAutoView()
				.addObject("menuUrl", menuUrl)
				.addObject("subSystemList", result)
				.addObject("curSubsysId", curSubsysId);
	}
	
	/**
	 * 编辑系统资源信息页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("addEdit")
	public ModelAndView addEdit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		ResourcesPo resources = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = resourcesQueryService.get(id);
			resources = ResourcesPo.fromJsonString(data);
		} else {
			String menuUrl = RequestUtil.getString(request, "menuUrl", "");
			resources = new ResourcesPo();
			resources.setIsFolder(true);
			resources.setDisplayInMenu(true);
			resources.setDefaultUrl(menuUrl);
			resources.setIsOpen(false);
			resources.setIcon("fa-cog");// 默认的图标
			resources.setSn(1);// 排序
		}
		return getAutoView().addObject("resources", resources).addObject("returnUrl", preUrl);
	}

	/**
	 * 获取资源
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<ResourcesPo> getTreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String systemId = RequestUtil.getString(request, "systemId", "1");

		QueryFilter queryFilter = new DefaultQueryFilter();
		queryFilter.addFilter("system_id_", systemId, QueryOP.EQUAL);
		((DefaultQueryFilter) queryFilter).setPage(null);
		List<FieldSort> fieldSorts = new ArrayList<FieldSort>();
		fieldSorts.add(new DefaultFieldSort("sn_"));

		String listData = resourcesQueryService.query(queryFilter);
		logger.debug(listData);
		List<ResourcesPo> result = null;
		if(JacksonUtil.isJsonArray(listData)){
			result = ResourcesPo.fromJsonArrayString(listData);
		}else{
			result = new ArrayList<ResourcesPo>();
		}

		String parentStr = resourcesQueryService.getParentResourcesByParentId(systemId, "0");
		ResourcesPo parent = ResourcesPo.fromJsonString(parentStr);
		result.add(parent);
		return result;
	}

	@RequestMapping("getMenuData")
	@ResponseBody
	public List<ResourcesPo> getMenuData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = ContextUtil.getCurrentUser();

		String systemId = SubSystemUtil.getCurrentSystemId(request);
		if (systemId == null)
			return null;
		
		String listData = resourcesQueryService.findByUserIdSystemId(user.getUserId(), user.isSuper(), systemId);
		List<ResourcesPo> result = null;
		if(JacksonUtil.isJsonArray(listData)){
			result = ResourcesPo.fromJsonArrayString(listData);
		}
		
		return result;
	}

	/**
	 * 编辑系统资源信息页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		ResourcesPo resources = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = resourcesQueryService.get(id);
			resources = ResourcesPo.fromJsonString(data);
		} else {
			String systemId = RequestUtil.getString(request, "systemId");
			String parentId = RequestUtil.getString(request, "parentId");
			String menuUrl = RequestUtil.getString(request, "menuUrl", "");
			resources = new ResourcesPo();
			resources.setIsFolder(true);
			resources.setDisplayInMenu(true);
			resources.setDefaultUrl(menuUrl);
			resources.setIsOpen(false);
			resources.setSystemId(systemId);
			resources.setParentId(parentId);
			resources.setIcon("fa-cog");// 默认的图标
			resources.setSn(1);// 排序
		}
		return getAutoView().addObject("resources", resources).addObject("returnUrl", preUrl);
	}

	/**
	 * 系统用户信息明细页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		ResourcesPo resources = null;
		if (StringUtil.isNotEmpty(id)) {
			String data = resourcesQueryService.get(id);
			resources = ResourcesPo.fromJsonString(data);
		}
		return getAutoView().addObject("resources", resources).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存系统用户信息
	 * 
	 * @param request
	 * @param response
	 * @param resources
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String json = RequestUtil.getString(request, "json");
		try {
			resourcesService.save(json);
			resultMsg = "保存资源菜单成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			writeResultMessage(response.getWriter(), "保存资源菜单失败！" + e.getMessage(), ResultMessage.ERROR);
		}
	}

	/**
	 * 批量删除系统用户记录(逻辑删除)
	 * 
	 * @param request
	 * @param response
	 * @exception @throws
	 *                Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] aryIds = RequestUtil.getStringAryByStr(request, "id");
			boolean cascade = RequestUtil.getBoolean(request, "cascade", false);
			resourcesService.deleteByIds(aryIds, cascade);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除资源菜单成功");
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			message = new ResultMessage(ResultMessage.FAIL, "删除资源菜单失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 根据parentId和systemId获取resources数组
	 * 
	 * @param request
	 * @param response
	 * @return List <Resources>
	 * @exception @throws
	 *                Exception
	 */
	@RequestMapping("getByParentIdAndSystemId")
	@ResponseBody
	public List<ResourcesPo> getByParentIdAndSystemId(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String resId = RequestUtil.getString(request, "resId");
		String systemId = RequestUtil.getString(request, "systemId");
		
		String listData = resourcesQueryService.findByParentIdAndSystemId(resId, systemId);
		List<ResourcesPo> result = null;
		if(JacksonUtil.isJsonArray(listData)){
			result = ResourcesPo.fromJsonArrayString(listData);
		}
		
		return result;
	}

	/**
	 * 跳转到排序页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("moveNode")
	public ModelAndView moveNode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String curSubsysId = RequestUtil.getString(request, "systemId");
		
		QueryFilter queryFilter = getQuerFilter(request);
		List<SubSystemPo> result = query(queryFilter);
		
		return getAutoView().addObject("id", id).addObject("subSystemList", result).addObject("curSubsysId", curSubsysId);
	}

	/**
	 * 给资源的图标设置对应的颜色图标。
	 *
	 * @param list
	 * @param color
	 * @param oldColor
	 */
	public static void setIconColor(List<ResourcesPo> list, String color, String oldColor) {
		for (Iterator<ResourcesPo> it = list.iterator(); it.hasNext();) {
			ResourcesPo res = it.next();
			String icon = res.getIcon();
			if (StringUtil.isNotEmpty(icon)) {
				icon = icon.replaceAll(oldColor, color);
				res.setIcon(icon);
			}
		}
	}

	/**
	 * 获取桌面栏目对应模块的更多信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("getByUrl")
	@ResponseBody
	public ResourcesPo getByUrl(HttpServletRequest request, HttpServletResponse response) {
		ResourcesPo po = null;
		try {
			String url = RequestUtil.getString(request, "url");
			
			po = ResourcesPo.fromJsonString(resourcesQueryService.getByUrl(url));
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			return null;
		}
		return po;
	}

	/**
	 * 
	 * 资源排序
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("sortList")
	public ModelAndView sortList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String systemId = RequestUtil.getString(request, "systemId");
		String id = RequestUtil.getString(request, "id");
		
		String listData = resourcesQueryService.findByParentIdAndSystemId(id, systemId);
		List<ResourcesPo> resourcesList = null;
		if(JacksonUtil.isJsonArray(listData)){
			resourcesList = ResourcesPo.fromJsonArrayString(listData);
		}
		
		return getAutoView().addObject("resourcesList", resourcesList);
	}

	/**
	 * 
	 * 保存资源排序
	 *
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("sortSave")
	public void sortSave(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] ids = RequestUtil.getStringAryByStr(request, "ids");
			resourcesService.saveSort(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "排序成功!");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "排序失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 
	 * 保存资源移动
	 *
	 * @param id
	 *            要移动的菜单
	 * @param destinationId
	 *            移动到菜单的位置
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("saveMove")
	public void saveMove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String id = RequestUtil.getString(request, "id");
			String subSystemId = RequestUtil.getString(request, "subSystemId");
			String destinationId = RequestUtil.getString(request, "destinationId");
			resourcesService.move(id, subSystemId, destinationId);
			message = new ResultMessage(ResultMessage.SUCCESS, "移动成功!");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "移动失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 导出菜单资源XML
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("exportXml")
	public void exportXml(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String subSysId = RequestUtil.getString(request, "subSysId");

		if (BeanUtils.isEmpty(subSysId) || BeanUtils.isEmpty(id))
			return;

		try {
			String fileName = "菜单资源";

			String data = resourcesQueryService.get(id);
			ResourcesPo res = ResourcesPo.fromJsonString(data);
			if (BeanUtils.isNotEmpty(res)) {
				fileName = res.getName();
			}

			String strXml = resourcesQueryService.loadXml(subSysId, id);
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition",
					"attachment;filename=" + StringEscaper.changeEncode(fileName, "GBK", "ISO-8859-1") + ".xml");
			response.getWriter().write(strXml);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (Exception e) {
			logger.error("菜单资源导出失败，" + e.getMessage(), e);
		}
	}

	/**
	 * 导入菜单资源
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping("importXml")
	public void importXml(MultipartHttpServletRequest request, HttpServletResponse response) throws IOException {
		String resId = RequestUtil.getString(request, "resId");
		String subSysId = RequestUtil.getString(request, "subSysId");
		boolean cover = RequestUtil.getBoolean(request, "cover", false);
		MultipartFile fileLoad = request.getFile("xmlFile");
		ResultMessage resultMessage = null;
		
		if (BeanUtils.isEmpty(fileLoad)) {
			resultMessage = new ResultMessage(ResultMessage.FAIL, "导入菜单资源失败!", "请选择导入文件");
			writeResultMessage(response.getWriter(), resultMessage);
		}
		
		try {
			Document doc = Dom4jUtil.loadXml(fileLoad.getInputStream());
			resourcesService.importRes(doc.asXML(), subSysId, resId, cover);
			
			resultMessage = new ResultMessage(ResultMessage.SUCCESS, "导入菜单资源成功!");
			writeResultMessage(response.getWriter(), resultMessage);
		} catch (Exception ex) {
			String message = "菜单资源导入失败，" + ExceptionUtil.getStackTraceAsString(ex);
			logger.error(message, ex);
			resultMessage = new ResultMessage(ResultMessage.FAIL, message);
			response.getWriter().print(resultMessage);
		}
	}
	
	/**
	 * 获取子系统列表
	 *
	 * @param queryFilter
	 * @return 
	 */
	private List<SubSystemPo> query(QueryFilter queryFilter){
		((DefaultQueryFilter)queryFilter).setPage(null);
		String listData = subSysQueryService.query(queryFilter);
		List<SubSystemPo> res = null;
		if(JacksonUtil.isJsonArray(listData)){
			res = JacksonUtil.getDTOList(listData, SubSystemPo.class);
		}
		
		return res;
	}
}
