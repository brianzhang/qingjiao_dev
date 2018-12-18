package com.lc.ibps.platform.feng.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.constants.UserInfoConstants;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.ZipUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateFormatUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.file.domain.Attachment;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.components.upload.controller.GenericUploadController;
import com.lc.ibps.components.upload.model.FileInfo;
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
@RequestMapping("/platform/feng/map/")
public class MapController extends GenericUploadController {
	/*@RequestMapping("control")
	public ModelAndView control(HttpServletRequest request , HttpServletResponse response) throws Exception{
		return getAutoView().addObject("mapId", "10347");
	}*/
	
}
