package com.lc.ibps.platform.common.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.FileUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;

import net.sf.json.JSONArray;

/**
 * 图标。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017年3月21日-下午7:50:51
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/common/icon")
public class IconController extends GenericController {
	// ICON路径
	public final static String ICON_PATH = "/styles/commons/fonts/fonts.json";
	// ICON路径
	public final static String LOGO_PATH = "/styles/commons/images/logo/";
	// 获取项目的根路径
	public static String classPath = IconController.class.getClassLoader().getResource("/").getPath();

	/**
	 * 
	 * 获取图标
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("fonts")
	public ModelAndView fonts(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String path = RequestUtil.getString(request, "path");
		String iconTypeStr = StringUtil.isEmpty(path) ? ICON_PATH : path;
		String iconPath = getRootPath() + (iconTypeStr.replace("/", File.separator));
		Object[] iconList = this.getIconList(iconPath);
		return getAutoView().addObject("iconList", iconList).addObject("iconPath", iconTypeStr);
	}

	public static String getRootPath() {
		String rootPath = classPath;
		// windows下
		if ("\\".equals(File.separator)) {
			rootPath = classPath.substring(1, classPath.indexOf("/WEB-INF/classes"));
			rootPath = rootPath.replace("/", "\\");
		}
		// linux下
		if ("/".equals(File.separator)) {
			rootPath = classPath.substring(0, classPath.indexOf("/WEB-INF/classes"));
			rootPath = rootPath.replace("\\", "/");
		}
		return rootPath;
	}

	/**
	 * 图标文件列表。
	 * 
	 * @return
	 */
	private Object[] getIconList(String iconPath) {
		String json = "";
		try {
			// 文件绝对路径改成你自己的文件路径
			json = FileUtil.readFile(iconPath, StringPool.UTF_8, false);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
		}
		json = json.replaceAll("[\\t\\n\\r]", "");

		return JSONArray.fromObject(json).toArray();
	}
	
	
	/**
	 * 
	 * 获取图标
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("logo")
	public ModelAndView logo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String path = RequestUtil.getString(request, "path");
		String 	logoPathStr = StringUtil.isEmpty(path) ? LOGO_PATH : path;
		String iconPath = getRootPath() + (logoPathStr.replace("/", File.separator));
		 File f = new File(iconPath);
		 List<String> logoList =  new ArrayList<String>();
		 File fa[] = f.listFiles();
		 if(BeanUtils.isNotEmpty(fa)){
			 for (int i = 0; i < fa.length; i++) {
				 File fs = fa[i];
				 logoList.add(fs.getName());
			 }
		 }

		return getAutoView().addObject("logoList", logoList).addObject("logoPath", logoPathStr);
	}
}
