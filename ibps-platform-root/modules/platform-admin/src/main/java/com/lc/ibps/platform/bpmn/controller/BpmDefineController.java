package com.lc.ibps.platform.bpmn.controller;

import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
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

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.Direction;
import com.lc.ibps.api.base.query.FieldSort;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.bo.exception.BoBaseException;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.ZipUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateFormatUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultFieldSort;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.model.define.IBpmDefine;
import com.lc.ibps.bpmn.api.service.BpmDefineService;
import com.lc.ibps.bpmn.domain.BpmDefine;
import com.lc.ibps.bpmn.persistence.entity.BpmDefinePo;
import com.lc.ibps.bpmn.repository.BpmDefineRepository;
import com.lc.ibps.form.form.persistence.entity.FormBoPo;
import com.lc.ibps.form.form.repository.FormDefRepository;

/**
 * 流程定义 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2016-12-30 16:21:52
 * </pre>
 */
@Controller
@RequestMapping("/platform/bpmn/bpmDefine/")
public class BpmDefineController extends GenericController {
	@Resource
	private BpmDefineRepository bpmDefineRepository;
	@Resource
	private IPartyUserService userService;
	@Resource
	private BpmDefineService bpmDefineService;
	@Resource
	private CurrentContext currentContext;
	@Resource
	private FormDefRepository formDefRepository;
	@Resource
	private BoDefRepository boDefRepository;

	/**
	 * 【流程定义】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		
		QueryFilter queryFilter = getQuerFilter(request);
		
		String formKey = RequestUtil.getString(request, "formKey","");
		String boId = RequestUtil.getString(request, "boId","");
		if(StringUtil.isNotEmpty(formKey)){
			FormBoPo formBo = formDefRepository.getFormBoByFormKey(formKey);
			boId = formBo.getBoId();
		}
		if(StringUtil.isNotEmpty(boId)){
			BoDefPo boDefPo = boDefRepository.get(boId);
			queryFilter.addFilter("defxml.BPMN_XML_", "%"+boDefPo.getCode()+"%", QueryOP.LIKE);
		}
		
		// 获取最新主版本的信息列表
		queryFilter.addFilter("is_main_", "Y", QueryOP.EQUAL);
		List<FieldSort> fieldSorts = queryFilter.getFieldSortList();
		if(BeanUtils.isEmpty(fieldSorts)){
			fieldSorts = new ArrayList<FieldSort>();
			fieldSorts.add(new DefaultFieldSort("update_time_", Direction.fromString("desc")));
			queryFilter.setFieldSortList(fieldSorts);
		}
		User curUser = ContextUtil.getCurrentUser();
		boolean isSuper = curUser.isSuper();
		PageList<BpmDefinePo> bpmDefineList = (PageList<BpmDefinePo>) bpmDefineRepository.query(queryFilter, curUser.getUserId(), isSuper);
		return new PageJson(bpmDefineList);
	}

	/**
	 * 编辑【流程定义】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String defId = RequestUtil.getString(request, "defId");
		BpmDefinePo bpmDefine = null;
		if (StringUtil.isNotEmpty(defId)) {
			bpmDefine = bpmDefineRepository.get(defId);
		}
		return getAutoView().addObject("bpmDefine", bpmDefine).addObject("returnUrl", preUrl);
	}

	/**
	 * 【流程定义】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String defId = RequestUtil.getString(request, "defId");
		BpmDefinePo bpmDefine = null;
		if (StringUtil.isNotEmpty(defId)) {
			bpmDefine = bpmDefineRepository.get(defId);
		}
		return getAutoView().addObject("bpmDefine", bpmDefine).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存【流程定义】信息
	 *
	 * @param request
	 * @param response
	 * @param bpmDefine
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, BpmDefinePo bpmDefinePo)
			throws Exception {
		ResultMessage message = null;
		try {
			// 构造领域对象和保存数据
			BpmDefine bpmDefine = bpmDefineRepository.newInstance(bpmDefinePo);
			bpmDefine.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存流程定义成功");
		} catch (Exception e) {
			logger.error("对流程定义操作失败，" + e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对流程定义操作失败，" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 复制【流程定义】信息
	 *
	 * @param request
	 * @param response
	 * @param bpmDefine
	 * @throws Exception
	 */
	@RequestMapping("copy")
	public void copy(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ResultMessage message = null;
		try {
			String oldDefId = RequestUtil.getString(request, "defId");
			String newDefKey = RequestUtil.getString(request, "newDefKey");
			// 构造领域对象和保存数据
			BpmDefine bpmDefine = bpmDefineRepository.newInstance();
			bpmDefine.copy(oldDefId, newDefKey);
			message = new ResultMessage(ResultMessage.SUCCESS, "复制流程定义成功");
		} catch (Exception e) {
			logger.error("对流程定义操作失败，" + e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对流程定义操作失败，" + e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 *  批量删除【流程定义】记录
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
			String[] ids=RequestUtil.getStringAryByStr(request, "defId");
			QueryFilter queryFilter = getQuerFilter(request);
			User curUser = ContextUtil.getCurrentUser();
			boolean isSuper = curUser.isSuper();
			// 超级管理员及有删除权限人员可删除流程定义
			bpmDefineRepository.cannotDelete(queryFilter, curUser.getUserId(), isSuper, ids);
			//构造领域对象和保存数据
			BpmDefine bpmDefine =bpmDefineRepository.newInstance();
			bpmDefine.removeByDefIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除流程定义成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, e.getMessage());
			logger.error(e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 流程定义对话框。
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             ModelAndView
	 */
	@RequestMapping("dialog")
	public ModelAndView dialog(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String type = RequestUtil.getString(request, "type", "single");
		ModelAndView mv = getAutoView();
		mv.addObject("type", type);
		return mv;
	}
	
	/**
	 * 清除测试状态流程的测试数据
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("cleanData")
	public void cleanData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId");
		try {
			bpmDefineService.cleanData(defId);
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.SUCCESS, "清除数据成功"));
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.FAIL, "清除数据失败，" + e.getMessage()));
			logger.error("清除数据失败，" + e.getMessage(), e);
		}
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
	public void setCategory(HttpServletRequest request,HttpServletResponse response) throws Exception {
		PrintWriter writer = response.getWriter();
		String typeId = RequestUtil.getString(request, "typeId");
		String[] defIds = RequestUtil.getStringAryByStr(request, "defIds");
		//判断分类是否为空
		if (StringUtil.isEmpty(typeId)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL,"请选择需要设置的分类!"));
			return;
		}
		//判断是否选择流程定义
		if (BeanUtils.isEmpty(defIds)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL,"请选择需要设置的流程"));
			return;
		}
		
		List<String> list = Arrays.asList(defIds);
		try {
			BpmDefine bpmDefine =bpmDefineRepository.newInstance();
			bpmDefine.updateDefineType(typeId, list);
			writeResultMessage(writer, new ResultMessage(ResultMessage.SUCCESS, "设置分类成功!"));
		} catch (Exception ex) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "设置分类失败，" + ex.getMessage()));
			logger.error("设置分类失败，" + ex.getMessage(), ex);
		}
	}
	
	/**
	 * 返回流程设计生成的
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getXml")
	public void bpmnXml(HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType("text/xml;charset=utf-8");
		String defId = request.getParameter("defId");
		String type = request.getParameter("type");
		PrintWriter writer = response.getWriter();
		if (StringUtil.isEmpty(defId)) {
			writer.print("no def input");
			return;
		}

		BpmDefinePo po = bpmDefineRepository.getByDefId(defId,true);
		String xml ="";
		if(type.equalsIgnoreCase("bpmn")){
			xml = po.getBpmnXml();
		}else{
			xml = po.getDefXml();
		}
		
		writer.print(xml);
	}
	
	/**
	 * 发布流程定义
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 *             void
	 */
	@RequestMapping("deploy")
	public void deploy(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String resultMsg = null;
		String defId = RequestUtil.getString(request, "defId");
		IBpmDefine bpmDefinition = bpmDefineRepository.get(defId);
		try {
			bpmDefineService.deploy(bpmDefinition);
			resultMsg = "发布流程定义成功！";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), " 发布失败：" + e.getMessage(), ResultMessage.FAIL);
			logger.error(" 发布失败：" + e.getMessage(), e);
		}
	}
	
	/**
	 * <pre>
	 * 导出格式为*.zip的流程定义对象，zip文件包含多个xml文件，每一个xml文件都是一个流程定义对象;
	 * <br>
	 * zip文件命名为：bpmDef_yyyyMMddHHmmss.zip;
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
	@RequestMapping("export")
	public void export(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String realFilePath = null;
		String zipFilePath = null;
		try {
			String[] ids = RequestUtil.getStringAryByStr(request, "ids");
			if (BeanUtils.isEmpty(ids))
				return;
			List<String> idList = Arrays.asList(ids);
			String rootRealPath = AppFileUtil.getRealPath("/"+AppFileUtil.TEMP_PATH); // 操作的根目录
			String nowDate = DateFormatUtil.format(new Date(), "yyyyMMddHHmmss");
			String fileName = "bpmDef_" + nowDate;
			realFilePath = rootRealPath + File.separator + fileName; // 专属于在某个时刻导出流程定义的操作文件目录，完成后删除
			bpmDefineRepository.export(idList, realFilePath); // 输出xml
			ZipUtil.zip(realFilePath, true); // 打包
			String zipFileName = fileName + ".zip";
			zipFilePath = rootRealPath + File.separator + zipFileName;
			RequestUtil.downLoadFile(request, response, zipFilePath, zipFileName);// 导出
		} catch (Exception e) {
			ResultMessage message = new ResultMessage(ResultMessage.FAIL, "导入失败!");
			writeResultMessage(response.getWriter(), message);
		} finally {
			if(realFilePath !=  null){
				File dir = new File(realFilePath);
				if (dir.exists()) {
					FileUtil.deleteDir(dir); // 删除操作文件目录
				}
				File zip = new File(zipFilePath);
				if (zip.exists()) {
					FileUtil.deleteFile(zipFilePath); // 删除解压文件
				}
			}
		}
	}
	
	/**
	 * 导入流程定义
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("importBpm")
	public void importBpm(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartFile fileLoad = request.getFile("xmlFile");
		ResultMessage message = null;
		String unZipFilePath = null;
		try {
			String rootRealPath = AppFileUtil.getRealPath("/"+AppFileUtil.TEMP_PATH); // 操作的根目录
			File dir = new File(rootRealPath);
			if(!dir.exists() || (dir.exists() && dir.isFile())){
				dir.mkdirs();
			}
			String name = fileLoad.getOriginalFilename();
			String fileDir = StringUtil.substringBeforeLast(name, ".");
			// 导入的文件名
			AppFileUtil.unZipFile(fileLoad, rootRealPath); // 解压文件
			unZipFilePath = rootRealPath + File.separator + fileDir; // 解压后文件的真正路径
			// 导入xml
			bpmDefineService.importBpm(unZipFilePath,ContextUtil.getCurrentUserId());
			message = new ResultMessage(ResultMessage.SUCCESS, "导入成功!");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			if (e instanceof BoBaseException) {
				message = new ResultMessage(ResultMessage.WARN, "导入失败! " + e.getMessage());
			} else {
				message = new ResultMessage(ResultMessage.FAIL, "导入失败! ", e.getMessage());
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
	 * 挂起流程定义
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("suspend")
	public void suspend(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId");
		boolean cascade = RequestUtil.getBoolean(request, "cascade", false);
		try {
			bpmDefineService.suspendProcDefById(defId, cascade, null);
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.SUCCESS, "挂起流程定义成功"));
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.FAIL, "挂起流程定义失败，" + e.getMessage()));
			logger.error("挂起流程定义失败，" + e.getMessage(), e);
		}
	}
	
	/**
	 * 恢复流程定义
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("recover")
	public void recover(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defId = RequestUtil.getString(request, "defId");
		boolean cascade = RequestUtil.getBoolean(request, "cascade", false);
		try {
			bpmDefineService.recoverProcDefById(defId, cascade, null);
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.SUCCESS, "恢复流程定义成功"));
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.FAIL, "恢复流程定义失败，" + e.getMessage()));
			logger.error("恢复流程定义失败，" + e.getMessage(), e);
		}
	}
	
	/**
	 * 批量挂起流程定义
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("batchSuspend")
	public void batchSuspend(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defIds = RequestUtil.getString(request, "defIds");
		boolean cascade = RequestUtil.getBoolean(request, "cascade", false);
		try {
			bpmDefineService.batchSuspendProcDefById(defIds, cascade, null);
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.SUCCESS, "挂起流程定义成功"));
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.FAIL, "挂起流程定义失败，" + e.getMessage()));
			logger.error("挂起流程定义失败，" + e.getMessage(), e);
		}
	}
	
	/**
	 * 批量恢复流程定义
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("batchRecover")
	public void batchRecover(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defIds = RequestUtil.getString(request, "defIds");
		boolean cascade = RequestUtil.getBoolean(request, "cascade", false);
		try {
			bpmDefineService.batchRecoverProcDefById(defIds, cascade, null);
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.SUCCESS, "恢复流程定义成功"));
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), new ResultMessage(ResultMessage.FAIL, "恢复流程定义失败，" + e.getMessage()));
			logger.error("恢复流程定义失败，" + e.getMessage(), e);
		}
	}

}
