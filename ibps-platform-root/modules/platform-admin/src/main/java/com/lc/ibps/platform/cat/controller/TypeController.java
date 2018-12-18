package com.lc.ibps.platform.cat.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.ExceptionUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringEscaper;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.persistence.entity.TreeType;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.domain.Type;
import com.lc.ibps.common.cat.persistence.entity.CategoryPo;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.persistence.model.TypeVo;
import com.lc.ibps.common.cat.repository.CategoryRepository;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.demo.codegen.service.EmployeeDicQueryService;
import com.lc.ibps.platform.cat.helper.ListToTree;
import com.lc.ibps.platform.cat.helper.ListToTreeConvert;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 分类表。用于显示平级或树层次结构的分类，可以允许任何层次结构。 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2015-11-19 14:17:31
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/cat/type/")
public class TypeController extends GenericController {
	@Resource
	private TypeRepository typeRepository;
	@Resource
	private CategoryRepository categoryRepository;
	@Resource
	private EmployeeDicQueryService employeeDicQueryService;

	@RequestMapping("manage")
	public ModelAndView manage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		List<CategoryPo> categoryList = categoryRepository.query(queryFilter);
		return getAutoView().addObject("categoryList", categoryList);
	}

	/**
	 * 获取资源
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<TypePo> getTreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String categoryKey = RequestUtil.getString(request, "categoryKey", "");
		List<TypePo> list = typeRepository.findByCategoryKey(categoryKey);
		if (BeanUtils.isEmpty(list))
			list = new ArrayList<TypePo>();
		TypePo root = typeRepository.getRootByCategoryKey(categoryKey);
		if(BeanUtils.isNotEmpty(root))
			list.add(root);
		return list;
	}

	/**
	 * 编辑分类表。用于显示平级或树层次结构的分类，可以允许任何层次结构。信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		// 参数过多封装，建议添加vo类处理
		TypeVo typeVo = getTypeVo(request);

		typeRepository.dealTypeVo(typeVo);

		return getAutoView().addObject("typeVo", typeVo).addObject("returnUrl", preUrl);
	}

	private TypeVo getTypeVo(HttpServletRequest request) {
		TypeVo typeVo = new TypeVo();
		String id = RequestUtil.getString(request, "id");
		typeVo.setId(id);
		// 是否是根节点，1=根节点，0=其他节点
		int isRoot = RequestUtil.getInt(request, "isRoot", 0);
		if (isRoot == 1) {
			typeVo.setIsRoot(true);
		}
		// 父节点ID
		String parentId = RequestUtil.getString(request, "parentId");
		typeVo.setParentId(parentId);
		// 是否是私有的节点，1=私有节点，0=普通节点
		int isPriNode = RequestUtil.getInt(request, "isPriNode", 0);
		if (isPriNode == 1) {
			typeVo.setIsPrivate(true);
		}
		return typeVo;
	}

	/**
	 * 分类表。用于显示平级或树层次结构的分类，可以允许任何层次结构。明细页面
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
		TypePo type = null;
		if (StringUtil.isNotEmpty(id)) {
			type = typeRepository.get(id);
		}
		return getAutoView().addObject("type", type).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存分类表。用于显示平级或树层次结构的分类，可以允许任何层次结构。信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, TypeVo typeVo) throws Exception {
		this.saveData(response, typeVo);
	}

	@RequestMapping("saveType")
	public void saveType(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String typeVoJson = RequestUtil.getString(request, "typeVo");
		TypeVo typeVo = (TypeVo) JsonUtil.getDTO(typeVoJson, TypeVo.class);
		this.saveData(response, typeVo);
	}

	@RequestMapping("saveDic")
	public void saveDic(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String typeVoJson = RequestUtil.getString(request, "typeVo");
		TypeVo typeVo = (TypeVo) JsonUtil.getDTO(typeVoJson, TypeVo.class);
		this.saveData(response, typeVo);
	}

	private void saveData(HttpServletResponse response, TypeVo typeVo) throws Exception {
		String resultMsg = null;
		boolean isKeyExist = typeRepository.isKeyExistByVo(typeVo);
		if (isKeyExist) {
			resultMsg = "输入的分类key中已存在!";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.FAIL);
			return;
		} 
		
		try {
			Type type = typeRepository.newInstance();
			resultMsg = type.saveType(typeVo, ContextUtil.getCurrentUserId());
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对分类操作失败:";
			writeResultMessage(response.getWriter(), resultMsg + e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除分类表。用于显示平级或树层次结构的分类，可以允许任何层次结构。记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String id = RequestUtil.getString(request, "id");
			Type type = typeRepository.newInstance();
			type.delCascadeById(id);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除分类成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除分类失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("sortList")
	public ModelAndView sortList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String curUserId = ContextUtil.getCurrentUserId();
		List<TypePo> typeList = typeRepository.getOwnerByParentId(id,curUserId);
		return getAutoView().addObject("typeList", typeList);
	}

	@RequestMapping("sortSave")
	public void sortSave(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String[] typeIds = RequestUtil.getStringAryByStr(request, "typeIds");
			Type type = typeRepository.newInstance();
			type.sortSave(typeIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "分类排序成功!");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "分类排序失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 通过分类标识获取下拉树
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("getByCategoryKey")
	@ResponseBody
	public List<TreeType> getByCategoryKey(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String categoryKey = RequestUtil.getString(request, "categoryKey");
		if (StringUtil.isEmpty(categoryKey))
			return null;
		return typeRepository.findTree(categoryKey);
	}

	@RequestMapping("getEasyByCategoryKey")
	@ResponseBody
	public JSONArray getEasyByCategoryKey(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String categoryKey = RequestUtil.getString(request, "categoryKey");
		List<TypePo> types = null;
		if (StringUtil.isNotEmpty(categoryKey)) {
			types = typeRepository.findByCategoryKey(categoryKey);
		}
		return new ListToTree<TypePo>(getTypeConvert()).toTree(types);
	}

	private ListToTreeConvert<TypePo> getTypeConvert() {
		return new ListToTreeConvert<TypePo>() {
			public JSONObject convert(TypePo po) {
				JSONObject jobject = new JSONObject();
				jobject.accumulate("id", po.getId());
				jobject.accumulate("parentId", po.getParentId());
				jobject.accumulate("text", po.getName());
				jobject.accumulate("name", po.getName());
				jobject.accumulate("key", po.getTypeKey());
				String struType = po.getStruType();
				if (struType != null) {
					jobject.accumulate("struct", struType);
				}
				return jobject;
			}
		};
	}

	/**
	 * 导出自定义表单XML
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("exportXml")
	public void exportXml(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");

		if (BeanUtils.isEmpty(id))
			return;

		try {
			String fileName = "分类导出";

			TypePo type = typeRepository.get(id);
			if (BeanUtils.isNotEmpty(type)) {
				fileName = type.getName();
			} else {
				CategoryPo category = categoryRepository.get(id);
				if (BeanUtils.isNotEmpty(category)) {
					fileName = category.getName();
				}
			}

			String strXml = typeRepository.exportXml(id);
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition",
					"attachment;filename=" + StringEscaper.changeEncode(fileName, "GBK", "ISO-8859-1") + ".xml");
			response.getWriter().write(strXml);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (Exception e) {
			logger.error("分类导出失败，" + e.getMessage(), e);
		}
	}

	/**
	 * 导入系统分类。
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping("importXml")
	public void importXml(MultipartHttpServletRequest request, HttpServletResponse response) throws IOException {
		String typeId = RequestUtil.getString(request, "typeId");
		MultipartFile fileLoad = request.getFile("xmlFile");
		ResultMessage resultMessage = null;
		if (BeanUtils.isEmpty(fileLoad)) {
			resultMessage = new ResultMessage(ResultMessage.FAIL, "导入失败!", "请选择导入文件");
			writeResultMessage(response.getWriter(), resultMessage);
		}
		try {
			String currUserId = ContextUtil.getCurrentUserId();
			Type type = typeRepository.newInstance();
			type.importXml(fileLoad.getInputStream(), typeId, currUserId);
			resultMessage = new ResultMessage(ResultMessage.SUCCESS, "导入成功!");
			writeResultMessage(response.getWriter(), resultMessage);
		} catch (Exception ex) {
			String message = "分类导入失败，" + ExceptionUtil.getStackTraceAsString(ex);
			logger.error(message, ex);
			resultMessage = new ResultMessage(ResultMessage.FAIL, message);
			response.getWriter().print(resultMessage);
		}
	}
	
}
