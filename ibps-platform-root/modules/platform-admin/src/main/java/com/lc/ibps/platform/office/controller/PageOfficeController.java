package com.lc.ibps.platform.office.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.components.upload.controller.GenericUploadController;


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
@RequestMapping("/platform/office/pageOffice/")
public class PageOfficeController extends GenericUploadController{
	@Resource
	AttachmentRepository attachmentRepository;
	@RequestMapping("dialog")
	public ModelAndView dialog(HttpServletRequest request , HttpServletResponse response) throws Exception{
		String fileId = RequestUtil.getString(request, "fileId");
		String docUrl = "";
		if(StringUtil.isNotEmpty( fileId) ){
			AttachmentPo ap = attachmentRepository.get( fileId ) ;
			docUrl = AppFileUtil.getBasePath() +"\\"+ ap.getFilePath();
			request.setAttribute("docUrl", docUrl );
		}
		return getAutoView();
	}
}
