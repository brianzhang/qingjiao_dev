package com.lc.ibps.platform.cat.controller;

import java.io.IOException;
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
import com.lc.ibps.api.common.cat.constants.CategoryConstants;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.ExceptionUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringEscaper;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.domain.Dictionary;
import com.lc.ibps.common.cat.helper.DictionaryBuilder;
import com.lc.ibps.common.cat.persistence.entity.DictionaryPo;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.persistence.model.DictionaryVo;
import com.lc.ibps.common.cat.repository.DictionaryRepository;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.platform.cat.helper.ListToTree;
import com.lc.ibps.platform.cat.helper.ListToTreeConvert;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 数据字典 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2015-11-19 14:17:32
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/cat/dictionary/")
public class DictionaryController extends GenericController {
	@Resource
	private DictionaryRepository dictionaryRepository;
	@Resource
	private TypeRepository typeRepository;

	/**
	 * 编辑数据字典列表页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String typeId = RequestUtil.getString(request, "id");

		TypePo typePo = typeRepository.get(typeId);
		String struType = "0";
		if (BeanUtils.isNotEmpty(typePo)) {
			struType = typePo.getStruType();
		}

		return getAutoView().addObject("struType", struType).addObject("returnUrl", preUrl);
	}

	/**
	 * 【数据字典】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		String typeId = RequestUtil.getString(request, "Q^TYPE_ID_^S");
		List<DictionaryVo> attachmentList = dictionaryRepository.queryStruType(queryFilter, typeId);
		return new PageJson(attachmentList);
	}

	/**
	 * 获取数据字典
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<DictionaryVo> getTreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		List<DictionaryVo> dictionaries = dictionaryRepository.getByTypeId(id, true);
		return dictionaries;
	}

	/**
	 * 获取数据字典
	 */
	@RequestMapping("getByTypeKey")
	@ResponseBody
	public String getByTypeKey(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String typeKey = RequestUtil.getString(request, "typeKey");
		String key = RequestUtil.getString(request, "key");
		DictionaryPo po = dictionaryRepository.getByTypeKey(typeKey, key);
		if(BeanUtils.isEmpty(po))
			return "";
		return po.getName();
	}

	/**
	 * 编辑数据字典信息页面
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
		String parentId = RequestUtil.getString(request, "parentId");
		String typeId = RequestUtil.getString(request, "typeId");
		DictionaryPo dictionary = null;
		if (StringUtil.isNotEmpty(id)) {
			dictionary = dictionaryRepository.get(id);
			parentId = dictionary.getParentId();
		}
		
		String parentName = dictionaryRepository.getParentName(parentId);
		if(StringUtil.isEmpty(parentName)){
			parentId = null;
		}
		
		DictionaryVo dictionaryVo = DictionaryBuilder.buildVoByParam(dictionary, parentId, parentName, typeId);
		return getAutoView().addObject("dictionaryVo", dictionaryVo).addObject("parentName", parentName)
				.addObject("returnUrl", preUrl);
	}

	/**
	 * 数据字典明细页面
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
		DictionaryPo dictionary = null;
		if (StringUtil.isNotEmpty(id)) {
			dictionary = dictionaryRepository.get(id);
		}
		return getAutoView().addObject("dictionary", dictionary).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存数据字典信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String dictionaryJson = RequestUtil.getString(request, "dictionary");
		DictionaryPo po = (DictionaryPo) JsonUtil.getDTO(dictionaryJson, DictionaryPo.class);

		String id = po.getId();
		if (StringUtil.isEmpty(id)) {
			id = null;
		}
		boolean isKeyExist = dictionaryRepository.isKeyExist(id, po.getTypeId(), po.getKey());
		if (isKeyExist) {
			resultMsg = "输入的key中已存在!";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.FAIL);
		} else {
			try {
				Dictionary dictionary = dictionaryRepository.newInstance(po);
				dictionary.save();
				resultMsg = "保存数据字典成功！";
				writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
			} catch (Exception e) {
				resultMsg = "对数据字典操作失败，";
				writeResultMessage(response.getWriter(), resultMsg+ e.getMessage(), ResultMessage.FAIL);
			}
		}
	}

	/**
	 * 批量删除数据字典记录
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
			Dictionary dictionary = dictionaryRepository.newInstance();
			dictionary.delCascadeById(id);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除数据字典成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除数据字典失败，"+e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 通过typeKey获取数据字典
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getByTypeKeyForDic")
	@ResponseBody
	public List<DictionaryVo> getByTypeKeyForDic(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String typeKey = RequestUtil.getString(request, "typeKey");
		String displayMode = RequestUtil.getString(request, "displayMode", "path");
		String split = RequestUtil.getString(request, "split", "/");
		boolean isRoot = RequestUtil.getBoolean(request,"isRoot",false);
		if (StringUtil.isEmpty(typeKey))
			return null;
		TypePo dictType = typeRepository.getByCategoryKeyAndTypeKey(CategoryConstants.CAT_DIC.key(), typeKey);
		if(BeanUtils.isEmpty(dictType))
			return null;

		List<DictionaryVo> result = dictionaryRepository.getByTypeId(dictType.getId(), isRoot);
		
		if("path".equalsIgnoreCase(displayMode)){
			DictionaryBuilder.setPathName(result, split);
		}
		
		return 	result;
	}
	
	/**
	 * 通过typeKey获取数据字典
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getByTypeKeyForComBo")
	@ResponseBody
	public JSONArray getByTypeKeyForComBo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String typeKey = RequestUtil.getString(request, "typeKey");
		if (StringUtil.isEmpty(typeKey))
			return null;
		TypePo dictType = typeRepository.getByCategoryKeyAndTypeKey(CategoryConstants.CAT_DIC.key(), typeKey);
		if(BeanUtils.isEmpty(dictType))
			return null;
		JSONArray tree = new ListToTree<DictionaryVo>(getDictionaryConvert())
				.toTree(dictionaryRepository.getByTypeId(dictType.getId(), false));
		return tree;
	}

	/**
	 * 导出数据字典XML
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("exportXml")
	public void exportXml(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		boolean isRoot = RequestUtil.getBoolean(request, "isRoot", false);

		if (BeanUtils.isEmpty(id))
			return;

		try {
			String fileName = "数据字典";

			TypePo dict = typeRepository.get(id);
			if (BeanUtils.isNotEmpty(dict)) {
				fileName = dict.getName();
			}

			String strXml = dictionaryRepository.loadXml(id, isRoot);
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition",
					"attachment;filename=" + StringEscaper.changeEncode(fileName, "GBK", "ISO-8859-1") + ".xml");
			response.getWriter().write(strXml);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (Exception e) {
			logger.error("数据字典导出失败，" + e.getMessage(), e);
		}
	}

	/**
	 * 导入数据字典
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping("importXml")
	public void importXml(MultipartHttpServletRequest request, HttpServletResponse response) throws IOException {
		String pid = RequestUtil.getString(request, "id");
		boolean cover = RequestUtil.getBoolean(request, "cover", false);
		MultipartFile fileLoad = request.getFile("xmlFile");
		ResultMessage resultMessage = null;
		if (BeanUtils.isEmpty(fileLoad)) {
			resultMessage = new ResultMessage(ResultMessage.FAIL, "导入数据字典失败!", "请选择导入文件");
			writeResultMessage(response.getWriter(), resultMessage);
		}
		try {
			Dictionary dictDomain = dictionaryRepository.newInstance();
			dictDomain.importDict(fileLoad.getInputStream(), pid, cover);
			resultMessage = new ResultMessage(ResultMessage.SUCCESS, "导入数据字典成功!");
			writeResultMessage(response.getWriter(), resultMessage);
		} catch (Exception ex) {
			String message = "数据字典导入失败，" + ExceptionUtil.getStackTraceAsString(ex);
			logger.error(message, ex);
			resultMessage = new ResultMessage(ResultMessage.FAIL, message);
			response.getWriter().print(resultMessage);
		}
	}
	
	private ListToTreeConvert<DictionaryVo> getDictionaryConvert() {
		return new ListToTreeConvert<DictionaryVo>() {
			public JSONObject convert(DictionaryVo obj) {
				JSONObject jobject = new JSONObject();
				jobject.accumulate("id", obj.getId());
				jobject.accumulate("parentId", obj.getParentId());
				jobject.accumulate("name", obj.getName());
				String key = obj.getKey();
				if (StringUtil.isNotEmpty(key)) {
					jobject.accumulate("key", key);
				}
				return jobject;
			}
		};
	}
}
