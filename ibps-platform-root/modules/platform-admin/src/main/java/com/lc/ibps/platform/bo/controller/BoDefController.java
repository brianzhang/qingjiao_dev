package com.lc.ibps.platform.bo.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Date;
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
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.bo.constants.BoState;
import com.lc.ibps.base.bo.constants.BoTableConstants;
import com.lc.ibps.base.bo.constants.DataFormat;
import com.lc.ibps.base.bo.domain.BoDef;
import com.lc.ibps.base.bo.exception.BoBaseException;
import com.lc.ibps.base.bo.persistence.builder.BoDefBuilder;
import com.lc.ibps.base.bo.persistence.entity.BoAttributePo;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.persistence.vo.TreeVo;
import com.lc.ibps.base.bo.repository.BoAttrColumnRepository;
import com.lc.ibps.base.bo.repository.BoAttributeRepository;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.bo.strategy.BoDefStrategy;
import com.lc.ibps.base.bo.strategy.BoDefStrategyFactory;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.ZipUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateFormatUtil;
import com.lc.ibps.base.datasource.dynamic.DbContextHolder;
import com.lc.ibps.base.db.table.base.BaseTableMeta;
import com.lc.ibps.base.db.util.TableMetaUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.table.model.Table;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.ds.persistence.entity.DataSourcePo;
import com.lc.ibps.common.ds.persistence.service.DataSourceSetService;

import net.sf.json.JSONArray;

/**
 * 业务对象定义 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-09-10 11:14:45
 * </pre>
 */
@Controller
@RequestMapping("/platform/bo/boDef/")
public class BoDefController extends GenericController {

	@Resource
	private BoDefRepository boDefRepository;
	@Resource
	private BoAttributeRepository boAttributeRepository;
	@Resource
	private DataSourceSetService dataSourceSetService;
	@Resource
	private BaseTableMeta tableMeta;
	@Resource
	private BoAttrColumnRepository boAttrColumnRepository;
	
	/**
	 * 管理业务对象定义信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String profix = AppUtil.getProperty("business.table.profix", BoTableConstants.BUSINESS_TABLE, true);
		ModelAndView mv = getAutoView();
		return mv.addObject("profix", profix);
	}
	
	/**
	 * 管理业务对象定义信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("versions")
	public ModelAndView versions(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String profix = AppUtil.getProperty("business.table.profix", BoTableConstants.BUSINESS_TABLE, true);
		String code = RequestUtil.getString(request, "code");
		ModelAndView mv = getAutoView();
		return mv
				.addObject("profix", profix)
				.addObject("code", code)
				;
	}

	/**
	 * 【业务对象定义】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("is_main_", "Y", QueryOP.EQUAL);
		PageList<BoDefPo> boDefList = (PageList<BoDefPo>) boDefRepository.query(queryFilter);
		boDefList = BoDefBuilder.buildList(boDefList);
		return new PageJson(boDefList);
	}

	/**
	 * 更多版本
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonByCode")
	public @ResponseBody PageJson listJsonByCode(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String code = RequestUtil.getString(request, "code");
		QueryFilter queryFilter = getQuerFilter(request);
		// 有code参数，添加过滤
		queryFilter.addFilter("code_", code, QueryOP.EQUAL);
		PageList<BoDefPo> boDefList = (PageList<BoDefPo>) boDefRepository.query(queryFilter);
		return new PageJson(boDefList);
	}

	/**
	 * 管理业务对象定义信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("manage")
	public ModelAndView manage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String defId = RequestUtil.getString(request, "id");
		String isMain = RequestUtil.getString(request, "isMain", "Y");
		String action = RequestUtil.getString(request, "action", "get");
		String profix = AppUtil.getProperty("business.table.profix", BoTableConstants.BUSINESS_TABLE, true);
		ModelAndView mv = getAutoView();
		BoDefPo po = null;
		if (StringUtil.isNotEmpty(defId)) {
			po = boDefRepository.getByDefId(defId);
			fillDsName(po);
			BoDefStrategy boDefStrategy = BoDefStrategyFactory.get(DataFormat.JSON);
			String json = boDefStrategy.load(po);
			if (StringUtil.isNotEmpty(json)) {
				mv.addObject("boDefJson", json);
			}
		}
		return mv.addObject("defId", defId).addObject("isMain", isMain).addObject("action", action)
				.addObject("profix", profix).addObject("returnUrl", preUrl);
	}

	/**
	 * 编辑【业务对象定义】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Integer level = RequestUtil.getInt(request, "level", 0);
		String isMain = RequestUtil.getString(request, "isMain", "Y");
		String pid = RequestUtil.getString(request, "pid", "0");
		String profix = AppUtil.getProperty("business.table.profix", BoTableConstants.BUSINESS_TABLE, true);
		String version = RequestUtil.getString(request, "version", "");
		String action = RequestUtil.getString(request, "action", "get");
		String mattrs = RequestUtil.getString(request, "mattrs", "[]");
		
		return getAutoView()
				.addObject("level", level)
				.addObject("isMain", isMain)
				.addObject("pid", pid)
				.addObject("mattrs", JSONArray.fromObject(mattrs))
				.addObject("action", action)
				.addObject("profix", profix)
				.addObject("version", version);
	}

	/**
	 * 【业务对象定义】明细页面
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
		BoDefPo boDef = null;
		if (StringUtil.isNotEmpty(id)) {
			boDef = boDefRepository.get(id);
		}
		return getAutoView().addObject("boDef", boDef).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 是否新对象
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("isNew")
	public void isNew(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String id = RequestUtil.getString(request, "id");
		try {
			BoDefPo boDef = null;
			if (StringUtil.isNotEmpty(id)) {
				boDef = boDefRepository.getByDefId(id);
				if(BoState.NEW.getValue().equals(boDef.getState())){
					message = new ResultMessage(ResultMessage.WARN, "新对象不能直接引用，需要进入编辑也重新保存才能正常引用！");
				}else{
					message = new ResultMessage(ResultMessage.SUCCESS, "查询是否新对象成功");
				}
			}else{
				message = new ResultMessage(ResultMessage.WARN, "业务对象ID为空！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "查询是否新对象失败:" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 【业务对象定义】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getJson")
	@ResponseBody
	public BoDefPo getJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		BoDefPo boDef = null;
		if (StringUtil.isNotEmpty(id)) {
			boDef = boDefRepository.getByDefId(id);
			fillDsName(boDef);
		}

		return boDef;
	}
	
	private void fillDsName(BoDefPo boDef) throws Exception{
		if(BeanUtils.isEmpty(boDef)){
			return;
		}
		
		DataSourcePo ds = dataSourceSetService.getByAlias(boDef.getDsAlias());
		if (BeanUtils.isNotEmpty(ds)) {
			boDef.setDsName(ds.getName());
		}
		List<BoDefPo> subList = boDef.getSubDefList();
		if (BeanUtils.isNotEmpty(subList)) {
			for (BoDefPo sub : subList) {
				fillDsName(sub);
			}
		}
	}

	/**
	 * 【业务对象定义】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getJsonByTbl")
	@ResponseBody
	public BoDefPo getJsonByTbl(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String boDefs = RequestUtil.getString(request, "boDefs");
		String saveType = RequestUtil.getString(request, "saveType", "save");

		BoDefPo boDef = null;
		if (StringUtil.isNotEmpty(boDefs)) {
			boDef = BoDefBuilder.buildFromDB(boDefs, saveType);
		}

		return boDef;
	}

	/**
	 * 设置主版本
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setMainVersion")
	public void setMainVersion(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String id = RequestUtil.getString(request, "id");
		try {
			BoDef boDef = boDefRepository.newInstance();
			boDef.setMainVersion(id);
			message = new ResultMessage(ResultMessage.SUCCESS, "设置主版本成功");
			message.addVariable("id", id);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "设置主版本操作失败:" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 保存【业务对象定义】信息
	 *
	 * @param request
	 * @param response
	 * @param boDef
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String boDefs = RequestUtil.getString(request, "boDefs");
		String saveType = RequestUtil.getString(request, "saveType");

		ResultMessage message = null;
		try {
			// 构造领域对象和保存数据
			BoDefPo po = BoDefBuilder.build(boDefs, saveType);
			BoDef boDef = boDefRepository.newInstance(po);
			boDef.save();
			po = boDef.getData();
			logger.debug("--->" + po.toString());
			message = new ResultMessage(ResultMessage.SUCCESS, "保存业务对象定义成功");
			message.addVariable("id", po.getId());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对业务对象定义操作失败:" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【业务对象定义】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			// 获得待删除的id
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			String rmType = RequestUtil.getString(request, "rmType");
			// 构造领域对象和保存数据
			BoDef boDef = boDefRepository.newInstance();
			boDef.deleteByIds(rmType, ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除业务对象定义成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "删除业务对象定义失败:" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 检查有没有重复的标识
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("checkCode")
	public void checkCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String code = RequestUtil.getString(request, "code", "");
		String isMain = RequestUtil.getString(request, "isMain", "Y");
		//String isMaster = RequestUtil.getString(request, "isMaster", "Y");
		//String pid = RequestUtil.getString(request, "pid", "");
		String id = RequestUtil.getString(request, "id", "");
		ResultMessage message = new ResultMessage(ResultMessage.SUCCESS);
		try {
			boolean isExists = boDefRepository.isExistsCode(code, isMain, id);
			if (isMain.equalsIgnoreCase(StringPool.Y) && isExists) {
				message.setResult(ResultMessage.FAIL);
			}
			
			/*
			if (isMaster.equalsIgnoreCase(StringPool.Y)) {// 主业务对象校验
				boolean isExists = boDefRepository.isExistsCode(code, isMain, id);
				if (isMain.equalsIgnoreCase(StringPool.Y) && isExists) {
					message.setResult(ResultMessage.FAIL);
				}
			} else {// 子业务对象校验
				boolean isExists = boDefRepository.isExistsCode(code, isMain, pid, id);
				if (isExists) {
					message.setResult(ResultMessage.FAIL);
				}
			}
			*/
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
			message.setResult(ResultMessage.ERROR);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 检查有没有重复的标识
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("checkAttrCode")
	public void checkAttrCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String id = RequestUtil.getString(request, "id", "");
		ResultMessage message = new ResultMessage(ResultMessage.SUCCESS);
		try {
			if(StringUtil.isNotEmpty(id)){
				BoAttributePo po = boAttributeRepository.get(id);
				if(BeanUtils.isNotEmpty(po)){
					message.setResult(ResultMessage.FAIL);
				}
			}
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
			message.setResult(ResultMessage.ERROR);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 创建业务对象的物理表和相应信息记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("genBoTable")
	public void genBoTable(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			String id = RequestUtil.getString(request, "id");
			BoDefPo po = boDefRepository.getByDefId(id);
			// 创建表和物理映射信息
			BoDef boDef = boDefRepository.newInstance(po);
			boDef.genBoTable();
			message = new ResultMessage(ResultMessage.SUCCESS, "生成表成功！");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "生成表失败:" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取bo树
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getBoTree")
	@ResponseBody
	public List<TreeVo> getBoTree(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String code = RequestUtil.getString(request, "code");
		BoDefPo po = null;
		if (StringUtil.isNotEmpty(id)) {
			po = boDefRepository.getByDefId(id);
		} else if (StringUtil.isNotEmpty(code)) {
			po = boDefRepository.getByCode(code);
		}
		return BoDefBuilder.buildBoTree(po, "0");
	}

	/**
	 * 【业务对象定义】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("export")
	public ModelAndView export(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String ids = RequestUtil.getString(request, "ids");
		return getAutoView().addObject("ids", ids);
	}

	/**
	 * 【业务对象定义】列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonByIds")
	@ResponseBody
	public List<BoDefPo> listJsonByIds(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String[] ids = RequestUtil.getStringAryByStr(request, "ids");
		List<BoDefPo> boDefList = boDefRepository.findByIds(Arrays.asList(ids));
		return boDefList;
	}

	/**
	 * 【业务对象定义】列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonBySid")
	@ResponseBody
	public List<BoDefPo> listJsonBySid(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		return boDefRepository.findById(id, "sub");
	}

	/**
	 * 【业务对象定义】列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonByPid")
	@ResponseBody
	public List<BoDefPo> listJsonByPid(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		return boDefRepository.findById(id, "up");
	}

	/**
	 * <pre>
	 * 导出格式为*.zip的BO对象，zip文件包含多个xml文件，每一个xml文件都是一个bo业务对象;
	 * <br>
	 * zip文件命名为：boDef_yyyyMMddHHmmss.zip;
	 * <br>
	 * 每个xml文件命名规则为:name_id.xml;
	 * <br>
	 * 完成后，相关生成的文件都会删除.
	 * </pre>
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("exportBo")
	public void exportBo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String realFilePath = null;
		String zipFilePath = null;
		try {
			String idsStr = RequestUtil.getString(request, "ids");
			if (BeanUtils.isEmpty(idsStr))
				return;

			String[] ids = idsStr.split(StringPool.SEMICOLON);
			List<String> idList = Arrays.asList(ids);
			String rootRealPath = AppFileUtil.getRealPath("/"+AppFileUtil.TEMP_PATH); // 操作的根目录
			String nowDate = DateFormatUtil.format(new Date(), "yyyyMMddHHmmss");
			String fileName = "boDef_" + nowDate;
			realFilePath = rootRealPath + File.separator + fileName; // 专属于在某个时刻导出bo对象的操作文件目录，完成后删除
			boDefRepository.exportBo(idList, realFilePath); // 输出xml
			ZipUtil.zip(realFilePath, true); // 打包
			String zipFileName = fileName + ".zip";
			zipFilePath = rootRealPath + File.separator + zipFileName;
			RequestUtil.downLoadFile(request, response, zipFilePath, zipFileName);// 导出
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			ResultMessage message = new ResultMessage(ResultMessage.FAIL, "导入失败:" + e.getMessage());
			writeResultMessage(response.getWriter(), message);
		} finally {
			if (realFilePath != null) {
				File boDir = new File(realFilePath);
				if (boDir.exists()) {
					FileUtil.deleteDir(boDir); // 删除操作文件目录
				}
				File boZip = new File(zipFilePath);
				if (boZip.exists()) {
					FileUtil.deleteFile(zipFilePath); // 删除解压文件
				}
			}
		}
	}

	/**
	 * 导入BO对象
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("importBo")
	public void importBo(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartFile fileLoad = request.getFile("xmlFile");
		ResultMessage message = null;
		String unZipFilePath = null;
		try {
			String rootRealPath = AppFileUtil.getRealPath("/"+AppFileUtil.TEMP_PATH); // 操作的根目录
			File dir = new File(rootRealPath);
			if (!dir.exists() || (dir.exists() && dir.isFile())) {
				dir.mkdirs();
			}
			String name = fileLoad.getOriginalFilename();
			String fileDir = StringUtil.substringBeforeLast(name, ".");
			// 导入的文件名
			AppFileUtil.unZipFile(fileLoad, rootRealPath); // 解压文件
			unZipFilePath = rootRealPath + File.separator + fileDir; // 解压后文件的真正路径
			// 导入xml
			BoDef boDef = boDefRepository.newInstance();
			boDef.importBo(unZipFilePath);
			message = new ResultMessage(ResultMessage.SUCCESS, "导入成功!");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			if (e instanceof BoBaseException) {
				message = new ResultMessage(ResultMessage.WARN, "导入失败:" + e.getMessage());
			} else {
				message = new ResultMessage(ResultMessage.FAIL, "导入失败:", e.getMessage());
			}
		} finally {
			try {
				File boDir = new File(unZipFilePath);
				if (boDir.exists()) {
					FileUtil.deleteDir(boDir); // 删除解压后的目录
				}
			} catch (Exception ignore) {
			}
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取已经存在的表信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("externalTable")
	public ModelAndView externalTable(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<DataSourcePo> dataSourceList = dataSourceSetService.query(getQuerFilter(request));
		return this.getAutoView().addObject("dataSourceList", dataSourceList);
	}

	/**
	 * 获取表信息
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 *             PageJson
	 */
	@RequestMapping("tableListJson")
	@ResponseBody
	public PageJson tableListJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String tableName = RequestUtil.getString(request, "tableName", "");
		String dsAlias = RequestUtil.getString(request, "dsAlias", "");
		BaseTableMeta meta = tableMeta;
		if (StringUtil.isNotEmpty(dsAlias)) {
			meta = TableMetaUtil.getTableMetaByDsAlias(dsAlias);
		}
		List<Table> list = meta.getTableModelByName(tableName);
		DbContextHolder.clearDataSource();
		return new PageJson(list);
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
	public void setCategory(HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter writer = response.getWriter();
		String typeId = RequestUtil.getString(request, "typeId");
		String[] defIds = RequestUtil.getStringAryByStr(request, "defIds");
		// 判断分类是否为空
		if (StringUtil.isEmpty(typeId)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "请选择需要设置的分类!"));
			return;
		}
		// 判断是否选择业务对象
		if (BeanUtils.isEmpty(defIds)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "请选择需要设置的业务对象"));
			return;
		}

		List<String> defIdList = Arrays.asList(defIds);
		try {
			BoDef boDefDomain = boDefRepository.newInstance();
			boDefDomain.updateDefineType(typeId, defIdList);
			writeResultMessage(writer, new ResultMessage(ResultMessage.SUCCESS, "设置分类成功!"));
		} catch (Exception ex) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "设置分类失败，" + ex.getMessage()));
			logger.error("设置分类失败，" + ex.getMessage(), ex);
		}
	}

	/**
	 * 
	 * 复制
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("copy")
	public void copy(HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter writer = response.getWriter();
		boolean cascade = RequestUtil.getBoolean(request, "cascade", false);
		String defId = RequestUtil.getString(request, "defId");
		String defCode = RequestUtil.getString(request, "defCode");
		String defName = RequestUtil.getString(request, "defName");

		// 判断是否选择业务对象
		if (StringUtil.isEmpty(defId) || StringUtil.isEmpty(defCode) || StringUtil.isEmpty(defName)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "请选择需要设置的业务对象"));
			return;
		}

		try {
			BoDef boDefDomain = boDefRepository.newInstance();
			boDefDomain.copy(defId, defCode, defName, cascade,ContextUtil.getCurrentUserId());
			writeResultMessage(writer, new ResultMessage(ResultMessage.SUCCESS, "复制业务对象成功!"));
		} catch (Exception ex) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "复制业务对象失败，" + ex.getMessage()));
			logger.error("复制业务对象失败，" + ex.getMessage(), ex);
		}
	}

}
