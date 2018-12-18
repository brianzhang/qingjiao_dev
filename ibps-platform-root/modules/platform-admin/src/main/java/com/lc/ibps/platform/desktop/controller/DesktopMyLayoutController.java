package com.lc.ibps.platform.desktop.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.auth.utils.SubSystemUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.desktop.domain.DesktopMyLayout;
import com.lc.ibps.common.desktop.persistence.entity.DesktopColumnPo;
import com.lc.ibps.common.desktop.persistence.entity.DesktopLayoutPo;
import com.lc.ibps.common.desktop.persistence.entity.DesktopMyLayoutPo;
import com.lc.ibps.common.desktop.repository.DesktopColumnRepository;
import com.lc.ibps.common.desktop.repository.DesktopLayoutRepository;
import com.lc.ibps.common.desktop.repository.DesktopMyLayoutRepository;
import com.lc.ibps.platform.desktop.helper.DesktopUtil;

/**
 * 我的桌面布局 控制器类。
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
@RequestMapping("/platform/desktop/desktopMyLayout/")
public class DesktopMyLayoutController extends GenericController {
	@Resource
	private DesktopMyLayoutRepository desktopMyLayoutRepository;
	@Resource
	private DesktopLayoutRepository desktopLayoutRepository;
	@Resource
	private DesktopColumnRepository desktopColumnRepository;

	/**
	 * 我的桌面布局列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<DesktopMyLayoutPo> desktopMyLayoutList = (PageList<DesktopMyLayoutPo>) desktopMyLayoutRepository
				.query(queryFilter);
		return new PageJson(desktopMyLayoutList);
	}

	/**
	 * 编辑我的桌面布局信息页面
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
		DesktopMyLayoutPo desktopMyLayout = null;
		if (StringUtil.isNotEmpty(id)) {
			desktopMyLayout = desktopMyLayoutRepository.get(id);
		}
		return getAutoView().addObject("desktopMyLayout", desktopMyLayout).addObject("returnUrl", preUrl);
	}

	/**
	 * 我的桌面布局明细页面
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
		DesktopMyLayoutPo desktopMyLayout = null;
		if (StringUtil.isNotEmpty(id)) {
			desktopMyLayout = desktopMyLayoutRepository.get(id);
		}
		return getAutoView().addObject("desktopMyLayout", desktopMyLayout).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存我的桌面布局信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, DesktopMyLayoutPo po) throws Exception {
		String resultMsg = null;
		String id = po.getId();
		try {
			DesktopMyLayout desktopMyLayout = desktopMyLayoutRepository.newInstance(po);
			if (StringUtil.isEmpty(id)) {
				desktopMyLayout.create();
				resultMsg = "添加我的桌面布局成功";
			} else {
				desktopMyLayout.update();
				resultMsg = "更新我的桌面布局成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对我的桌面布局操作失败";
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除我的桌面布局记录
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
			DesktopMyLayout desktopMyLayout = desktopMyLayoutRepository.newInstance();
			desktopMyLayout.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除我的桌面布局成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除我的桌面布局失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 设计我的首页布局
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("design")
	public ModelAndView design(HttpServletRequest request, HttpServletResponse response) throws Exception {
		User user = ContextUtil.getCurrentUser();
		String systemAlias = SubSystemUtil.getCurrentSystemAlias(request);
		// 首页布局
		List<DesktopLayoutPo> layoutList = desktopLayoutRepository.findAll();
		Map<String, Object> params = DesktopUtil.getParameterValueMap(request);
		// 首页栏目，取出来需要解析
		List<DesktopColumnPo> columnList = desktopColumnRepository.getDesktopColumnData(params, user.isSuper(),
				user.getUserId());
		// 获取展示的布局
		Map<String, List<DesktopColumnPo>> columnMap = desktopColumnRepository.getColumnMap(columnList);
		// 获取当前的布局
		DesktopMyLayoutPo desktopMyLayout = desktopMyLayoutRepository.getLayout(systemAlias, user.getUserId(),
				columnList);

		return getAutoView().addObject("layoutList", layoutList).addObject("columnMap", columnMap)
				.addObject("desktopMyLayout", desktopMyLayout);
	}

	/**
	 * 保存首页布局
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("saveLayout")
	public void saveLayout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String html = RequestUtil.getString(request, "html");
		String designHtml = RequestUtil.getString(request, "designHtml");
		String systemAlias = SubSystemUtil.getCurrentSystemAlias(request);
		ResultMessage resultObj = null;
		try {
			DesktopMyLayoutPo po = new DesktopMyLayoutPo();
			po.setSysAlias(systemAlias);
			po.setDesignHtml(designHtml);
			po.setTemplateHtml(html);
			DesktopMyLayout desktopMyLayout = desktopMyLayoutRepository.newInstance(po);
			desktopMyLayout.save();
			resultObj = new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			resultObj = new ResultMessage(ResultMessage.FAIL, e.getMessage());
		}
		response.getWriter().print(resultObj);
	}

	/**
	 * 删除桌面布局
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("deleteLayout")
	public void deleteLayout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		ResultMessage resultObj = null;
		try {
			DesktopMyLayout desktopMyLayout = desktopMyLayoutRepository.newInstance();
			desktopMyLayout.delete(id);
			resultObj = new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			resultObj = new ResultMessage(ResultMessage.FAIL, e.getMessage());
		}
		response.getWriter().print(resultObj);
	}
}
