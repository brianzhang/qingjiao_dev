package com.lc.ibps.platform.desktop.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.common.desktop.domain.DesktopColumn;
import com.lc.ibps.common.desktop.persistence.entity.DesktopColumnPo;
import com.lc.ibps.common.desktop.repository.DesktopColumnRepository;
import com.lc.ibps.platform.desktop.helper.DesktopUtil;

/**
 * 桌面栏目 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2015-11-21 21:39:21
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/desktop/desktopColumn/")
public class DesktopColumnController extends GenericController {
	@Resource
	private DesktopColumnRepository desktopColumnRepository;
	@Resource
	private TypeRepository typeRepository;

	/**
	 * 桌面栏目列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<DesktopColumnPo> desktopColumnList = (PageList<DesktopColumnPo>) desktopColumnRepository
				.query(queryFilter);
		return new PageJson(desktopColumnList);
	}

	/**
	 * 编辑桌面栏目信息页面
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
		DesktopColumnPo desktopColumn = null;
		if (StringUtil.isNotEmpty(id)) {
			desktopColumn = desktopColumnRepository.get(id);
			if (BeanUtils.isNotEmpty(desktopColumn) && StringUtil.isNotEmpty(desktopColumn.getTypeId())) {
				TypePo type = typeRepository.get(desktopColumn.getTypeId());
				if (BeanUtils.isNotEmpty(type)) {
					desktopColumn.setTypeName(type.getName());
				}
			}
		}
		return getAutoView().addObject("desktopColumn", desktopColumn).addObject("returnUrl", preUrl);
	}

	/**
	 * 桌面栏目明细页面
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
		DesktopColumnPo desktopColumn = null;
		if (StringUtil.isNotEmpty(id)) {
			desktopColumn = desktopColumnRepository.get(id);
		}
		return getAutoView().addObject("desktopColumn", desktopColumn).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存桌面栏目信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, DesktopColumnPo po)
			throws Exception {
		String resultMsg = null;
		String id = po.getId();
		try {
			DesktopColumn desktopColumn= desktopColumnRepository.newInstance(po);
			if (StringUtil.isEmpty(id)) {
				desktopColumn.create();
				resultMsg = "添加桌面栏目成功";
			} else {
				desktopColumn.update();
				resultMsg = "更新桌面栏目成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			resultMsg = "对桌面栏目操作失败";
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除桌面栏目记录
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
			DesktopColumn desktopColumn = desktopColumnRepository.newInstance();
			desktopColumn.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除桌面栏目成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除桌面栏目失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 初始化模版
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("initTemplate")
	public void initTemplate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			DesktopColumn desktopColumn = desktopColumnRepository.newInstance();
			desktopColumn.initDesktopColumn(true);
			message = new ResultMessage(ResultMessage.SUCCESS, "初始化桌面栏目成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "初始化桌面栏目失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 预览模版
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("preview")
	public ModelAndView preview(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		Map<String, Object> params = DesktopUtil.getParameterValueMap(request);
		String html = "";
		try {
			html = desktopColumnRepository.getHtmlById(id, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return getAutoView().addObject("html", html);
	}

	/**
	 * 首页栏目明细页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getData")
	@ResponseBody
	public String getData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String alias = RequestUtil.getString(request, "alias");
		Map<String, Object> params = DesktopUtil.getParameterValueMap(request);
		String data = "";
		try {
			data = desktopColumnRepository.getDataByAlias(alias, params);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return data;
	}

	/**
	 * 首页栏目选项的值
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getOptionData")
	@ResponseBody
	public String getOptionData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String alias = RequestUtil.getString(request, "alias");
		Map<String, Object> params = DesktopUtil.getParameterValueMap(request);
		String data = "";
		try {
			 Object o = desktopColumnRepository.getOptionDataByAlias(alias, params);
			 data = o instanceof String? (String) o: JsonUtil.getJSONString(o);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return data;
	}
	
	/**
	 *  设置 流程代理 启用/禁用
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setEnable")
	public void setEnable(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String prfix = "启用";
		try {
			String id=RequestUtil.getString(request, "id");
			String isEnabled=RequestUtil.getString(request, "isEnabled");
			if(StringPool.N.equals(isEnabled)){
				prfix = "禁用";
			}
			//构造领域对象和保存数据
			DesktopColumn desktopColumn = desktopColumnRepository.newInstance();
			desktopColumn.setEnable(id, isEnabled);
			message=new ResultMessage(ResultMessage.SUCCESS, prfix+"桌面栏目成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, prfix+"桌面栏目失败，" + e.getMessage());
			logger.error(prfix+"桌面栏目失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}

}
