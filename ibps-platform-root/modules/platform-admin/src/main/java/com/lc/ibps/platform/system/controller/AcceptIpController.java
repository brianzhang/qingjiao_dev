package com.lc.ibps.platform.system.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.system.domain.AcceptIp;
import com.lc.ibps.common.system.persistence.entity.AcceptIpPo;
import com.lc.ibps.common.system.repository.AcceptIpRepository;

/**
 * IP地址管理 控制器类。
 *
 * <pre>
 *  
* 构建组：ibps-conmmon-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-03-03 16:56:31
* 版权：广州流辰信息技术有限公司
 * </pre>
 */
@Controller
@RequestMapping("/platform/system/acceptIp/")
public class AcceptIpController extends GenericController {
	@Resource
	private AcceptIpRepository acceptIpRepository;

	/**
	 * IP地址管理列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<AcceptIpPo> acceptIpList = (PageList<AcceptIpPo>) acceptIpRepository.query(queryFilter);
		return new PageJson(acceptIpList);
	}

	/**
	 * 编辑IP地址管理信息页面
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
		AcceptIpPo acceptIp = null;
		if (StringUtil.isNotEmpty(id)) {
			acceptIp = acceptIpRepository.get(id);
		}
		return getAutoView().addObject("acceptIp", acceptIp).addObject("returnUrl", preUrl);
	}

	/**
	 * IP地址管理明细页面
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
		AcceptIpPo acceptIp = null;
		if (StringUtil.isNotEmpty(id)) {
			acceptIp = acceptIpRepository.get(id);
		}
		return getAutoView().addObject("acceptIp", acceptIp).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存IP地址管理信息
	 *
	 * @param request
	 * @param response
	 * @param acceptIp
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, AcceptIpPo po) throws Exception {
		String resultMsg = null;
		String id = po.getId();
		try {
			AcceptIp acceptIp = acceptIpRepository.newInstance(po);
			if (StringUtil.isEmpty(id)) {
				acceptIp.create();
				resultMsg = "添加IP地址管理成功";
			} else {
				acceptIp.update();
				resultMsg = "更新IP地址管理成功";
			}
			writeResultMessage(response.getWriter(), resultMsg, ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "对IP地址管理操作失败";
			writeResultMessage(response.getWriter(), resultMsg, e.getMessage(), ResultMessage.FAIL);
		}
	}

	/**
	 * 批量删除IP地址管理记录
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
			AcceptIp acceptIp = acceptIpRepository.newInstance();
			acceptIp.deleteByIds(aryIds);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除IP地址管理成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除IP地址管理失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
