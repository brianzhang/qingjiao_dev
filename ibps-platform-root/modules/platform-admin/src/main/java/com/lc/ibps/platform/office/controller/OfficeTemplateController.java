package com.lc.ibps.platform.office.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.office.repository.OfficeTemplateRepository;
import com.lc.ibps.components.upload.constants.FileParam;
import com.lc.ibps.components.upload.controller.GenericUploadController;
import com.lc.ibps.components.upload.service.IUploadService;

import com.lc.ibps.common.office.persistence.entity.OfficeTemplatePo;
import com.lc.ibps.common.office.domain.OfficeTemplate;
import com.lc.ibps.base.core.util.BeanUtils;


/**
 * 套红模板 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：lium
 * 邮箱地址：1316679699@qq.com
 * 创建时间：2017-08-09 10:30:31
 *</pre>
 */
@Controller
@RequestMapping("/platform/office/officeTemplate/")
public class OfficeTemplateController extends GenericUploadController{
	@Resource
	private OfficeTemplateRepository officeTemplateRepository;
	
	/**
	 * 【套红模板】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<OfficeTemplatePo> officeTemplateList=(PageList<OfficeTemplatePo>)officeTemplateRepository.query(queryFilter);
		return new PageJson(officeTemplateList);
	}
	
	/**
	 * 编辑【套红模板】信息页面
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
		OfficeTemplatePo officeTemplate=null;
		if(StringUtil.isNotEmpty(id)){
			officeTemplate=officeTemplateRepository.get(id);
		}
		return getAutoView().addObject("officeTemplate", officeTemplate).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【套红模板】信息页面
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
		OfficeTemplatePo officeTemplate=null;
		if(StringUtil.isNotEmpty(id)){
			officeTemplate=officeTemplateRepository.get(id);
		}
		return getAutoView().addObject("officeTemplate", officeTemplate).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【套红模板】明细页面
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
		OfficeTemplatePo officeTemplate=null;
		if(StringUtil.isNotEmpty(id)){
			officeTemplate=officeTemplateRepository.get(id);
		}
		return getAutoView().addObject("officeTemplate", officeTemplate).addObject("returnUrl", preUrl);
	}
	
	public IUploadService getTemplateUploadService() throws Exception {
		return getUploadService("templateUploadPersistenceService");
	}
	/** 
	 * 保存【套红模板】信息
	 *
	 * @param request
	 * @param response
	 * @param  officeTemplatenew
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			/*OfficeTemplatePo officeTemplatePo = getFromRequest(request);
			//构造领域对象和保存数据
			OfficeTemplate officeTemplate =officeTemplateRepository.newInstance(officeTemplatePo);
			officeTemplate.save();*/
			message=new ResultMessage(ResultMessage.SUCCESS, "保存套红模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对套红模板操作失败，"+e.getMessage());
			logger.error("对套红模板操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	/** 
	 * 保存【套红模板】信息
	 *
	 * @param request
	 * @param response
	 * @param  officeTemplate
	 * @throws Exception
	 */
	@RequestMapping("saveTemplate")
	public void saveTemplate(MultipartHttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String fileFieldName = RequestUtil.getString(request, "fileFieldName");
		String fileId = RequestUtil.getString(request, "fileId"); //文件ID
		String type = RequestUtil.getString(request, "type");//模板类型
		MultipartFile file = request.getFile(fileFieldName);
		try {
			this.getTemplateUploadService();
			Map<String,Object> params = new HashMap<String,Object>();
			params.put(FileParam.ORIGINAL_FILE_NAME, file.getOriginalFilename());
			params.put(FileParam.FILE_SIZE, file.getSize());
			params.put("type", type);
			if(StringUtil.isNotEmpty(fileId)){
				params.put(FileParam.FILE_ID, fileId);
			}
			uploadService.uploadFile(file.getInputStream(), params); 
			message=new ResultMessage(ResultMessage.SUCCESS, "保存套红模板文档成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对套红模板文档操作失败，"+e.getMessage());
			logger.error("对套红模板文档操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【套红模板】记录
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
			OfficeTemplate officeTemplate =officeTemplateRepository.newInstance();
			officeTemplate.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除套红模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除套红模板失败，" + e.getMessage());
			logger.error("删除套红模板失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 根据模板id取得模板数据。
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getFileById")
	public void getFileById(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String fileId = RequestUtil.getString(request, "fileId");
		OfficeTemplatePo officeTemplatePo=null;
		if(StringUtil.isNotEmpty(fileId)){
			officeTemplatePo = officeTemplateRepository.get(fileId);
		}
		if (BeanUtils.isNotEmpty(officeTemplatePo)) {
			String fileName = officeTemplatePo.getFileName() + StringPool.DOT + "doc";
			String filePath = "d:\\temp\\file\\"+officeTemplatePo.getFilePath();
			RequestUtil.downLoadFile(request, response, filePath, fileName);
		}
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	/*private OfficeTemplatePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		OfficeTemplatePo OfficeTemplatePo = getOfficeTemplatePo(jsonObj);

		return OfficeTemplatePo;
	}
	
	*//** 
	 * 获取套红模板数据
	 *
	 * @param jsonObj
	 *//*
	private OfficeTemplatePo getOfficeTemplatePo(JSONObject jsonObj){
		OfficeTemplatePo OfficeTemplatePo = (OfficeTemplatePo) JsonUtil.getDTO(jsonObj.toString(), OfficeTemplatePo.class);
		return OfficeTemplatePo;
	}*/
	
}
