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

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.office.domain.OfficeControl;
import com.lc.ibps.common.office.persistence.entity.OfficeControlPo;
import com.lc.ibps.common.office.repository.OfficeControlRepository;
import com.lc.ibps.components.upload.constants.FileParam;
import com.lc.ibps.components.upload.controller.GenericUploadController;
import com.lc.ibps.components.upload.service.IUploadService;
import com.lc.ibps.components.upload.util.UploadUtil;


/**
 * 【Office列表】 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：lium
 * 邮箱地址：1316679699@qq.com
 * 创建时间：2017-08-07 14:23:54
 *</pre>
 */
@Controller
@RequestMapping("/platform/office/officeControl/")
public class OfficeControlController extends GenericUploadController{
	@Resource
	private OfficeControlRepository officeControlRepository;
	
	/**
	 * 【【Office列表】】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<OfficeControlPo> officeControlList=(PageList<OfficeControlPo>)officeControlRepository.query(queryFilter);
		return new PageJson(officeControlList);
	}
	
	/**
	 * 编辑【【Office列表】】信息页面
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
		OfficeControlPo officeControl=null;
		if(StringUtil.isNotEmpty(id)){
			officeControl=officeControlRepository.get(id);
		}
		return getAutoView().addObject("officeControl", officeControl).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【【Office列表】】信息页面
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
		OfficeControlPo officeControl=null;
		if(StringUtil.isNotEmpty(id)){
			officeControl=officeControlRepository.get(id);
		}
		return getAutoView().addObject("officeControl", officeControl).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【【Office列表】】明细页面
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
		OfficeControlPo officeControl=null;
		if(StringUtil.isNotEmpty(id)){
			officeControl=officeControlRepository.get(id);
		}
		return getAutoView().addObject("officeControl", officeControl).addObject("returnUrl", preUrl);
	}
	
	public IUploadService getOfficeUploadService() throws Exception {
		return getUploadService("officeUploadPersistenceService");
	}
	/** 
	 * 保存【【Office列表】】信息
	 *
	 * @param request
	 * @param response
	 * @param  officeControlNew
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
//			OfficeControlPo OfficeControlPo = getFromRequest(request);
//			//构造领域对象和保存数据
//			OfficeControl officeControl =officeControlRepository.newInstance(OfficeControlPo);
//			officeControl.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存【Office列表】成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对【Office列表】操作失败，"+e.getMessage());
			logger.error("对【Office列表】操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 保存office文档信息
	 *
	 * @param request
	 * @param response
	 * @param  officeControl
	 * @throws Exception
	 */
	@RequestMapping("saveOffice")
	public void saveOffice(MultipartHttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String fileFieldName = RequestUtil.getString(request, "fileFieldName");
		//String controlId =  RequestUtil.getString(request, "controlId");//谷歌火狐
		String fileId = RequestUtil.getString(request, "fileId"); //文件ID
		MultipartFile file = request.getFile(fileFieldName);
		try {
			this.getOfficeUploadService();
			Map<String,Object> params = new HashMap<String,Object>();
			params.put(FileParam.ORIGINAL_FILE_NAME, file.getOriginalFilename());
			params.put(FileParam.FILE_SIZE, file.getSize());
			if(StringUtil.isNotEmpty(fileId)){
				params.put(FileParam.FILE_ID, fileId);
			}
			uploadService.uploadFile(file.getInputStream(), params);
	
			message=new ResultMessage(ResultMessage.SUCCESS, "保存office文档成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对office文档操作失败，"+e.getMessage());
			logger.error("对office文档操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/**
	 *  批量删除【【Office列表】】记录
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
			OfficeControl officeControl =officeControlRepository.newInstance();
			officeControl.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除【Office列表】成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除【Office列表】失败，" + e.getMessage());
			logger.error("删除【Office列表】失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 根据文件id取得文件数据。
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getFileById")
	public void getFileById(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String fileId = RequestUtil.getString(request, "fileId");
		OfficeControlPo officeControl=null;
		if(StringUtil.isNotEmpty(fileId)){
			officeControl = officeControlRepository.get(fileId);
		}
		if (BeanUtils.isNotEmpty(officeControl)) {
			String fileName = UploadUtil.getFileName(officeControl.getFileName(), officeControl.getExt());
			String filePath = "d:\\temp\\file\\"+officeControl.getFilePath();
			RequestUtil.downLoadFile(request, response, filePath, fileName);
		}
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	/*private OfficeControlPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		OfficeControlPo OfficeControlPo = getOfficeControlPo(jsonObj);

		return OfficeControlPo;
	}
	
	*//** 
	 * 获取【Office列表】数据
	 *
	 * @param jsonObj
	 *//*
	private OfficeControlPo getOfficeControlPo(JSONObject jsonObj){
		OfficeControlPo OfficeControlPo = (OfficeControlPo) JsonUtil.getDTO(jsonObj.toString(), OfficeControlPo.class);
		return OfficeControlPo;
	}*/

}
