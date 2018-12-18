package com.lc.ibps.platform.file.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jodconverter.OfficeDocumentConverter;
import org.jodconverter.office.DefaultOfficeManagerBuilder;
import org.jodconverter.office.OfficeException;
import org.jodconverter.office.OfficeManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.constants.UserInfoConstants;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.ArrayUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.ZipUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.model.UrlOption;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.file.domain.Attachment;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.components.upload.constants.FileParam;
import com.lc.ibps.components.upload.controller.GenericUploadController;
import com.lc.ibps.components.upload.model.FileInfo;
import com.lc.ibps.components.upload.model.LocalUploadResult;
import com.lc.ibps.components.upload.util.UploadUtil;

/**
 * 【附件】 控制器类。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-4-下午2:47:27
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/file/attachment/")
public class AttachmentController extends GenericUploadController {
	
	@Resource
	private AttachmentRepository attachmentRepository;

	/**
	 * 【附件】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		if(!ContextUtil.isSuper()){
			queryFilter.addFilter("CREATOR_", ContextUtil.getCurrentUserId(), QueryOP.EQUAL);
		}
		PageList<AttachmentPo> attachmentList = (PageList<AttachmentPo>) attachmentRepository.query(queryFilter);
		return new PageJson(attachmentList);
	}

	/**
	 * 【附件】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonByUser")
	public @ResponseBody PageJson listJsonByUser(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("CREATOR_", ContextUtil.getCurrentUserId(), QueryOP.EQUAL);
		PageList<AttachmentPo> attachmentList = (PageList<AttachmentPo>) attachmentRepository.query(queryFilter);
		return new PageJson(attachmentList);
	}

	/**
	 * 编辑【附件】信息页面
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
		AttachmentPo attachment = null;
		if (StringUtil.isNotEmpty(id)) {
			attachment = attachmentRepository.get(id);
		}
		return getAutoView().addObject("attachment", attachment).addObject("returnUrl", preUrl);
	}

	/**
	 * 【附件】明细页面
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
		AttachmentPo attachment = null;
		if (StringUtil.isNotEmpty(id)) {
			attachment = attachmentRepository.get(id);
		}
		return getAutoView().addObject("attachment", attachment).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存【附件】信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, AttachmentPo po) throws Exception {
		String resultMsg = null;
		String id = po.getId();
		try {
			Attachment attachment = attachmentRepository.newInstance(po);
			if (StringUtil.isEmpty(id)) {
				attachment.create();
				resultMsg = "添加【附件】成功";
			} else {
				attachment.update();
				resultMsg = "更新【附件】成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对【附件】操作失败";
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}
	
	/**
	 * 修改名字
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("modifyName")
	public void modifyName(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String resultMsg = null;
		String id =  RequestUtil.getString(request, "id");
		String name =  RequestUtil.getString(request, "name");
		try {
			AttachmentPo po = attachmentRepository.get(id);
			po.setFileName(name);
			Attachment attachment = attachmentRepository.newInstance(po);
			attachment.update();
			resultMsg = "修改文件名称成功";
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对修改文件名称操作失败";
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}
	

	/**
	 * 批量删除【附件】记录
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
			Attachment attachment = attachmentRepository.newInstance();
			attachment.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除【附件】成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除【附件】失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 附件下载
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws ServletException
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("download")
	public void downloadFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 附件保存路径
		String id = RequestUtil.getString(request, "id", "");
		this.getUploadService();
		FileInfo fileInfo = uploadService.downloadFile(id);
		if (BeanUtils.isNotEmpty(fileInfo)) {
			byte[] fileBlob = fileInfo.getFileBytes();
			String fileName = UploadUtil.getFileName(fileInfo.getFileName(), fileInfo.getExt());
			RequestUtil.downLoadFileByByte(request, response, fileBlob, fileName);
		}
	}

	/**
	 * 附件下载
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("downloadByPath")
	public void downloadByPath(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 附件保存路径
		String filePath = RequestUtil.getString(request, "filePath", "");
		String filename = RequestUtil.getString(request, "fileName", "");
		boolean delete = RequestUtil.getBoolean(request, "delete", false);
		if (StringUtil.isEmpty(filePath) || StringUtil.isEmpty(filename)) {
			return;
		}
		String fullPath = StringUtil.trimSuffix(AppFileUtil.ATTACH_PATH, File.separator) + File.separator
				+ filePath.replace("/", File.separator);
		// 压缩文件
		ZipUtil.zip(fullPath, delete);
		// 下载文件
		RequestUtil.downLoadFile(request, response, fullPath + ".zip", filename + ".zip");
		// 删除文件
		if (delete) {
			FileUtil.deleteFile(fullPath + ".zip");
		}
	}

	/**
	 * 
	 * 获取头像
	 *
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getAvatar")
	public void getAvatar(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String fileId = RequestUtil.getString(request, "fileId", "");
		// String type = RequestUtil.getString(request, "type");
		AttachmentPo file = attachmentRepository.get(fileId);
		if (file == null){
			UrlOption urlOption = (UrlOption) AppUtil.getBean("urlOption");
			if(UrlOption.TYPE_PLATFORM.equals(urlOption.getType())){
				String url = urlOption.getPlatformUrl()+"/platform/file/attachment/getAvatar?fileId="+fileId;
				response.sendRedirect(url);
			}
			return;
		}
		try {
			this.getUploadService();
			byte[] fileBlob = uploadService.getFile(fileId);
			response.getOutputStream().write(fileBlob);
		} catch (Exception e) {
			// 出错了输出默认的
			String fullPath = AppFileUtil.getRealPath(UserInfoConstants.DEFAULT_USER_IMAGE);
			try {
				byte[] bytes = FileUtil.readByte(fullPath);
				response.getOutputStream().write(bytes);
			} catch (Exception e2) {
				logger.warn(e.getMessage(), e);
			}
		}
	}

	/**
	 * 根据文件id取得附件数据。
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getFileById")
	public void getFileById(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String fileId = RequestUtil.getString(request, "fileId", "");
		// String type = RequestUtil.getString(request, "type");//类型
		this.getUploadService();
		FileInfo fileInfo = uploadService.downloadFile(fileId);
		if (BeanUtils.isNotEmpty(fileInfo)) {
			byte[] fileBlob = fileInfo.getFileBytes();
			String fileName = UploadUtil.getFileName(fileInfo.getFileName(), fileInfo.getExt());
			RequestUtil.downLoadFileByByte(request, response, fileBlob, fileName);
		}else{
			UrlOption urlOption = (UrlOption) AppUtil.getBean("urlOption");
			if(UrlOption.TYPE_PLATFORM.equals(urlOption.getType())){
				String url = urlOption.getPlatformUrl()+"/platform/file/attachment/getFileById?fileId="+fileId;
				response.sendRedirect(url);
			}
		}
	}

	/**
	 * 获取office控件
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("office")
	public ModelAndView office(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String path = this.getOfficOutputDir();
		String downloadId = RequestUtil.getString(request, "downloadId");
		this.getUploadService();
		FileInfo fileInfo = uploadService.downloadFile(downloadId);
		if (BeanUtils.isNotEmpty(fileInfo)) {
			String ext = fileInfo.getExt();
			String[] office = { "doc", "docx", "ppt", "pptx", "xls", "xlsx" };
			if (ArrayUtil.contains(office, ext)) {
				String filePath = UploadUtil.mergeAbsolutePath(path, new String[] { "openOffice" });
				String sourceFile = filePath + File.separator + downloadId + "." + ext;
				String destFile = filePath + File.separator + downloadId + ".pdf";
				if (!FileUtil.isExistFile(sourceFile)) {
					FileUtil.createFolderFile(sourceFile);
					FileUtil.writeByte(sourceFile, fileInfo.getFileBytes());
				}
				if (!FileUtil.isExistFile(destFile)) {
					office2PDF(sourceFile, destFile);
				}
			} else {

			}
		}

		return getAutoView().addObject("id", downloadId);
	}

	/**
	 * pdf 输入
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("pdf")
	public void pdf(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String path = getOfficOutputDir();
		String id = RequestUtil.getString(request, "id");
		String filePath = UploadUtil.mergeAbsolutePath(path, new String[] { "openOffice" });
		String destFile = filePath + File.separator + id + ".pdf";
		RequestUtil.downLoadFile(request, response, destFile, id);
	}

	/**
	 * 将Office文档转换为PDF. 运行该函数需要用到OpenOffice, OpenOffice下载地址为
	 * http://www.openoffice.org/
	 * 
	 * <pre>
	 *  
	 * 方法示例: 
	 * String sourcePath = "F:\\office\\source.doc"; 
	 * String destFile = "F:\\pdf\\dest.pdf"; 
	 * Converter.office2PDF(sourcePath, destFile);
	 * </pre>
	 * 
	 * @param sourceFile
	 *            源文件, 绝对路径. 可以是Office2003-2007全部格式的文档, Office2010的没测试. 包括.doc,
	 *            .docx, .xls, .xlsx, .ppt, .pptx等. 示例: F:\\office\\source.doc
	 * @param destFile
	 *            目标文件. 绝对路径. 示例: F:\\pdf\\dest.pdf
	 * @return 操作成功与否的提示信息. 如果返回 -1, 表示找不到源文件, 或url.properties配置错误; 如果返回 0,
	 *         则表示操作成功; 返回1, 则表示转换失败
	 */
	public static int office2PDF(String sourceFile, String destFile) {
		OfficeManager officeManager = null;
		try {
			File inputFile = new File(sourceFile);

			// 如果目标路径不存在, 则新建该路径
			File outputFile = new File(destFile);
			if (!outputFile.getParentFile().exists()) {
				outputFile.getParentFile().mkdirs();
			}
			String officeHome = getOfficeHome();

			DefaultOfficeManagerBuilder config = new DefaultOfficeManagerBuilder();

			config.setOfficeHome(officeHome);
			config.setPortNumber(Integer.parseInt(AppUtil.getProperty("office.port", "2002")));

			officeManager = config.build();
			officeManager.start();

			OfficeDocumentConverter converter = new OfficeDocumentConverter(officeManager);

			converter.convert(inputFile, outputFile);
			officeManager.stop();

			return 0;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (officeManager != null) {
				try {
					officeManager.stop();
				} catch (OfficeException e) {
					e.printStackTrace();
				}
			}
		}

		return 1;
	}

	private String getOfficOutputDir() {
		String dir = AppUtil.getProperty("office.outputDir");
		if (BeanUtils.isEmpty(dir))
			return AppFileUtil.getBasePath();
		return dir;
	}

	private static String getOfficeHome() {
		String OFFICE_HOME = AppUtil.getProperty("office.home");// 这里是OpenOffice的安装目录
		// 如果从文件中读取的URL地址最后一个字符不是 '\'，则添加'\'
		if (OFFICE_HOME.charAt(OFFICE_HOME.length() - 1) != File.separatorChar) {
			OFFICE_HOME += File.separatorChar;
		}
		return OFFICE_HOME;
	}

	/**
	 * 上传文件入口
	 * 
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("uploadOffice")
	@ResponseBody
	public LocalUploadResult uploadOffice(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		// 初始化上传Service
		this.getUploadService();
		Map<String, Object> params = getUploadParams(request);
		LocalUploadResult localUploadResult = new LocalUploadResult();
		FileInfo fileInfo = null;
		try {
			MultipartFile file = (MultipartFile) params.get(FileParam.FILE);
			params.put(FileParam.ORIGINAL_FILE_NAME, file.getOriginalFilename());
			params.put(FileParam.FILE_SIZE, file.getSize());
			fileInfo = uploadService.uploadFile(file.getInputStream(), params);

			localUploadResult.setResult(ResultMessage.SUCCESS);
		} catch (Exception e) {
			localUploadResult.setResult(ResultMessage.ERROR);
			logger.error(e.getMessage(), e);
		}
		// 删除大文件，回填
		if (fileInfo != null)
			fileInfo.setFileBytes(null);
		localUploadResult.setFileInfo(fileInfo);

		return localUploadResult;
	}
	
	/**
	 * 
	 * 获取页面上传的参数
	 *
	 * @param request
	 * @return
	 */
	private Map<String, Object> getUploadParams(MultipartHttpServletRequest request) {
		String uploadType = RequestUtil.getString(request, "uploadType", "file"); // 控件的类型
		String paramJson = RequestUtil.getString(request, "paramJson"); // 自定义参数
		String fileMd5 = RequestUtil.getString(request, "fileMd5");// 文件唯一标记 MD5
		Boolean isChunk = RequestUtil.getBoolean(request, "isChunk", true);// 是否分片存储
		// 当前分块下标
		String chunk = RequestUtil.getString(request, "chunk");
		// 当前分块大小
		String chunkSize = RequestUtil.getString(request, "chunkSize");
		
		String fileId = RequestUtil.getString(request, FileParam.FILE_ID);
		String fileFieldName = RequestUtil.getString(request, FileParam.FILE_FIELD_NAME);
		MultipartFile multipartFile = request.getFile(fileFieldName);
		
		Map<String, Object> params = new HashMap<String, Object>();

		params.put(FileParam.FILE, multipartFile);
		params.put(FileParam.FILE_ID, fileId);
		params.put(FileParam.FILE_FIELD_NAME, fileFieldName);
		
		params.put(FileParam.UPLOAD_TYPE, uploadType);
		params.put(FileParam.FILE_MD5, fileMd5);
		params.put(FileParam.IS_CHUNK, isChunk);
		params.put(FileParam.CHUNK, chunk);
		params.put(FileParam.CHUNK_SIZE, chunkSize);
		
		params.put(FileParam.CUR_USER_ID, ContextUtil.getCurrentUser().getUserId());
		params.put(FileParam.CUR_USER_ACCOUNT, ContextUtil.getCurrentUser().getAccount());
		params.put(FileParam.CUR_USER_NAME, ContextUtil.getCurrentUser().getFullname());
		
		if (StringUtil.isNotEmpty(paramJson)) {
			try {
				Map<String, Object> m = JsonUtil.getMapFromJson(paramJson);
				if (BeanUtils.isNotEmpty(m))
					params.putAll(m);
			} catch (Exception e) {
			}
		}
		return params;
	}
	
}
