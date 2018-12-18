package com.lc.ibps.platform.desktop.controller;


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
import com.lc.ibps.common.desktop.domain.DesktopLayout;
import com.lc.ibps.common.desktop.persistence.entity.DesktopLayoutPo;
import com.lc.ibps.common.desktop.repository.DesktopLayoutRepository;

/**
* 桌面布局  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2015-11-21 21:39:21
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/desktop/desktopLayout/")
public class DesktopLayoutController extends GenericController{
	@Resource
	private DesktopLayoutRepository desktopLayoutRepository;

	
	/**
	 * 桌面布局列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DesktopLayoutPo> desktopLayoutList=(PageList<DesktopLayoutPo>)desktopLayoutRepository.query(queryFilter);
		return new PageJson(desktopLayoutList);
	}
	
	/**
	 * 编辑桌面布局信息页面
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
		DesktopLayoutPo desktopLayout=null;
		if(StringUtil.isNotEmpty(id)){
			desktopLayout=desktopLayoutRepository.get(id);
		}
		return getAutoView().addObject("desktopLayout", desktopLayout).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 桌面布局明细页面
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
		DesktopLayoutPo desktopLayout=null;
		if(StringUtil.isNotEmpty(id)){
			desktopLayout=desktopLayoutRepository.get(id);
		}
		return getAutoView().addObject("desktopLayout", desktopLayout).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存桌面布局信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,DesktopLayoutPo po) throws Exception{
		String resultMsg=null;
		String id=po.getId();
		try {
			
			DesktopLayout desktopLayout= desktopLayoutRepository.newInstance(po);
			if(StringUtil.isEmpty(id)){
				desktopLayout.create();
				resultMsg="添加桌面布局成功";
			}else{
				desktopLayout.update();
				resultMsg="更新桌面布局成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对桌面布局操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除桌面布局记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] aryIds=RequestUtil.getStringAryByStr(request, "id");
			DesktopLayout desktopLayout= desktopLayoutRepository.newInstance();
			desktopLayout.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除桌面布局成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除桌面布局失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
