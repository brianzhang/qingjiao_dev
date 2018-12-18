
package com.lc.ibps.loanp.files.controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.components.upload.UploadStrategySelector;
import com.lc.ibps.components.upload.model.FileInfo;
import com.lc.ibps.components.upload.service.IUploadService;
import com.lc.ibps.loans.files.repository.FileRepository;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;

import sun.misc.BASE64Decoder;

import com.lc.ibps.loans.files.persistence.entity.FilePo;
import com.lc.ibps.loans.demo.domain.DemoFile;
import com.lc.ibps.loans.demo.persistence.entity.DemoFilePo;
import com.lc.ibps.loans.files.domain.File;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_file 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-26 11:50:51
 *</pre>
 */
@Controller
@RequestMapping("/loanp/files/file/")
public class FileController extends GenericController{
	private IUploadService uploadService;
	@Resource
	private UploadStrategySelector uploadStrategySelector;
	public IUploadService getUploadService() {
		if (uploadService == null) {
			uploadService = uploadStrategySelector.getIUploadService();
		}
		return uploadService;
	}
	@Resource
	FileRepository fileRepository;
	
	/**
	 * 【t_file】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String loanId = RequestUtil.getString(request, "loanId");
		queryFilter.addFilter("jdid", loanId, QueryOP.EQUAL);
		PageList<FilePo> fileList=(PageList<FilePo>)fileRepository.query(queryFilter);
		return new PageJson(fileList);
	}
	
	@RequestMapping("listss")
	public ModelAndView listss(HttpServletRequest request,HttpServletResponse reponse) throws Exception{  
		String jdid=RequestUtil.getString(request, "loanId");  
		FilePo file = fileRepository.getByJdid(jdid);
		return getAutoView().addObject("file", file).addObject("jdid", jdid);
	}
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{  
		String jdid=RequestUtil.getString(request, "loanId");  
		FilePo file = fileRepository.getByJdid(jdid);
		return getAutoView().addObject("file", file).addObject("jdid", jdid);
	}
	
	@RequestMapping("reciever")
	public void reciever(HttpServletRequest request,HttpServletResponse response) throws Exception{
		// 设置数据传输单元大小为1KB  
	    int unit_size = 1024;  
	    // 初始化xml文件大小（以字节为单位）  
	    int xmlfilesize = 0;  
	    // 初始化上传文件名称（完整文件名）  
	    String xmlfilename = "";  
	    // 初始化上传文件保存路径（绝对物理路径）  
	    String id = "";  
	    this.getUploadService();
	    // 声明文件存储字节数组  
	    byte[] xmlfilebytes = null;  
	    try {  
	        // 初始化 SAX 串行xml文件解析器  
	        SAXBuilder builder = new SAXBuilder();  
	        Document doc = builder.build(request.getInputStream());  
	        Element eroot = doc.getRootElement();  
	        // 获取上传文件的完整名称  
	        Iterator it_name = eroot.getChildren("uploadfilename").iterator();  
	        if (it_name.hasNext()) {  
	            xmlfilename = ((Element) it_name.next()).getText();  
	        }  
	        // 获取上传文件的完整名称  
	        Iterator it_procId = eroot.getChildren("procid").iterator();  
	        if (it_procId.hasNext()) {  
	        }  
	        // 获取签发人  
	        Iterator it_qfPerson = eroot.getChildren("qfPerson").iterator();  
	        if (it_qfPerson.hasNext()) {  
	        }  
	        // 获取上传文件保存的绝对物理路径  
	        Iterator it_id = eroot.getChildren("id").iterator();  
	        if (it_id.hasNext()) {  
	            id = ((Element) it_id.next()).getText();  
	        }  
	        // 获取上传文件的大小  
	        Iterator it_size = eroot.getChildren("uploadfilesize").iterator();  
	        if (it_size.hasNext()) {  
	            xmlfilesize = Integer.parseInt(((Element) it_size.next())  
	                    .getText());  
	            if (xmlfilesize > 0) {  
	                int unit_count = 0;  
	                // 为存储文件内容的字节数组分配存储空间  
	                xmlfilebytes = new byte[xmlfilesize];  
	                // 循环读取文件内容，并保存到字节数组中  
	                Iterator it_content = eroot.getChildren("uploadcontent")  
	                        .iterator();  
	                while (it_content.hasNext()) {  
	                    // 初始化Base64编码解码器  
	                    BASE64Decoder base64 = new BASE64Decoder();  
	                    byte[] xmlnodebytearray = base64  
	                            .decodeBuffer(((Element) it_content.next())  
	                                    .getText());  
	                    if (xmlnodebytearray.length >= unit_size) {  
	                        // 读取一个完整数据单元的数据  
	                        System.arraycopy(xmlnodebytearray, 0, xmlfilebytes,  
	                                unit_count * unit_size, unit_size);  
	                    } else {  
	                        // 读取小于一个数据单元的所有数据  
	                        System.arraycopy(xmlnodebytearray, 0, xmlfilebytes,  
	                                unit_count * unit_size, xmlfilesize  
	                                        % unit_size);  
	                    }  
	                    // 继续向下读取文件内容  
	                    unit_count++;  
	                }  
	            }  
	        }
	        Map<String, Object> params = new HashMap<String, Object>();
	        InputStream input = new ByteArrayInputStream(xmlfilebytes);
	        params.put("uploadType", "disk");
	        params.put("originalFilename", xmlfilename);
			params.put("fileSize", Long.parseLong(xmlfilesize+""));
			@SuppressWarnings("unused")
			FileInfo fileInfo = uploadService.uploadFile(input,params);
			String fileStr =fileInfo.getFilePath();
			FilePo fp = fileRepository.get(id);
			fp.setFilePath('/'+fileStr.substring(2));
			fp.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
			File f = fileRepository.newInstance(fp);
			f.save();
	    } catch (Exception e) {  
	    e.printStackTrace();  
	    }  
	}
	/**
	 * 编辑【t_file】信息页面
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
		FilePo file=null;
		if(StringUtil.isNotEmpty(id)){
			file=fileRepository.get(id);
		}
		return getAutoView().addObject("file", file).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_file】信息页面
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
		FilePo file=null;
		if(StringUtil.isNotEmpty(id)){
			file=fileRepository.get(id);
		}
		return getAutoView().addObject("file", file).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_file】明细页面
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
		FilePo file=null;
		if(StringUtil.isNotEmpty(id)){
			file=fileRepository.get(id);
		}
		return getAutoView().addObject("file", file).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_file】信息
	 *
	 * @param request
	 * @param response
	 * @param  file
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			FilePo filePo = getFromRequest(request);
			//构造领域对象和保存数据
			File file =fileRepository.newInstance(filePo);
			file.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_file成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_file操作失败,"+e.getMessage());
			logger.error("对t_file操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private FilePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		FilePo filePo = getFilePo(jsonObj);

		return filePo;
	}
	
	/** 
	 * 获取t_file数据
	 *
	 * @param jsonObj
	 */
	private FilePo getFilePo(JSONObject jsonObj){
		FilePo filePo = (FilePo) JsonUtil.getDTO(jsonObj.toString(), FilePo.class);
		return filePo;
	}
	
	
	/**
	 *  批量删除【t_file】记录
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
			File file =fileRepository.newInstance();
			file.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_file成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_file失败，" + e.getMessage());
			logger.error("删除t_file失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
