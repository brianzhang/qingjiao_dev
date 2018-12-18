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
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.desktop.domain.DesktopManage;
import com.lc.ibps.common.desktop.persistence.entity.DesktopColumnPo;
import com.lc.ibps.common.desktop.persistence.entity.DesktopLayoutPo;
import com.lc.ibps.common.desktop.persistence.entity.DesktopManagePo;
import com.lc.ibps.common.desktop.repository.DesktopColumnRepository;
import com.lc.ibps.common.desktop.repository.DesktopLayoutRepository;
import com.lc.ibps.common.desktop.repository.DesktopManageRepository;
import com.lc.ibps.platform.desktop.helper.DesktopManageHelper;
import com.lc.ibps.platform.desktop.helper.DesktopUtil;

/**
* 桌面布局管理  控制器类。
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
@RequestMapping("/platform/desktop/desktopManage/")
public class DesktopManageController extends GenericController{
	@Resource
	private DesktopManageRepository desktopManageRepository;
	@Resource
	private DesktopLayoutRepository desktopLayoutRepository;
	@Resource
	private DesktopColumnRepository desktopColumnRepository;
	
	/**
	 * 桌面布局管理列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DesktopManagePo> desktopManageList=(PageList<DesktopManagePo>)desktopManageRepository.query(queryFilter);
		DesktopManageHelper.fillGroupName(desktopManageList);
		
		return new PageJson(desktopManageList);
	}
	

	/**
	 * 桌面布局管理列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("selectListJson")
	public @ResponseBody PageJson selectListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String userId =  ContextUtil.getCurrentUserId();
		PageList<DesktopManagePo> desktopManageList=(PageList<DesktopManagePo>)desktopManageRepository.queryList(queryFilter,userId);
		Map<String, Object> params = DesktopUtil.getParameterValueMap(request);
		// 首页栏目，取出来需要解析
		List<DesktopColumnPo> columnList = desktopColumnRepository.getDesktopColumnData(params,true,null);
		if(BeanUtils.isNotEmpty(desktopManageList)){
			for (DesktopManagePo desktopManage : desktopManageList) {
				desktopManage.setDesignHtml(desktopColumnRepository.parserDesignHtml(desktopManage.getDesignHtml(), columnList));
			}
		}
		DesktopManageHelper.fillGroupName(desktopManageList);
	
		return new PageJson(desktopManageList);
	}
	
	/**
	 * 编辑桌面布局管理信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id =  RequestUtil.getString(request, "id");
		User user = ContextUtil.getCurrentUser();
		// 首页布局
		List<DesktopLayoutPo> layoutList = desktopLayoutRepository.findAll();
		Map<String, Object> params = DesktopUtil.getParameterValueMap(request);
		// 首页栏目，取出来需要解析
		List<DesktopColumnPo> columnList = desktopColumnRepository
				.getDesktopColumnData(params,user.isSuper(),user.getUserId());
		// 获取展示的布局
		Map<String, List<DesktopColumnPo>> columnMap = desktopColumnRepository.getColumnMap(columnList);
		// 获取当前的布局
		DesktopManagePo  desktopManage = desktopManageRepository.getLayout(id, columnList);

		return getAutoView().addObject("layoutList", layoutList)
				.addObject("columnMap", columnMap)
				.addObject("desktop", desktopManage);
	}
	
	/**
	 * 桌面布局管理明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("data")
	public ModelAndView data(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		DesktopManagePo desktopManage=null;
		if(StringUtil.isNotEmpty(id)){
			desktopManage=desktopManageRepository.get(id);
			DesktopManageHelper.fillGroupName(desktopManage);
		}
		return getAutoView().addObject("desktopManage", desktopManage).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存桌面布局管理信息
	 *
	 * @param request
	 * @param response
	 * @param subsystem
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String resultMsg=null;
		String id=RequestUtil.getString(request, "id");
		String name=RequestUtil.getString(request, "name");
		String memo=RequestUtil.getString(request, "memo");
		String groupId=RequestUtil.getString(request, "groupId");
		String templateHtml=RequestUtil.getString(request, "templateHtml");
		String designHtml=RequestUtil.getString(request, "designHtml");
		String isDef=RequestUtil.getString(request, "isDef", "N");	
		
		try {
			DesktopManagePo po = desktopManageRepository.get(id);
			if(BeanUtils.isEmpty(po))
				po =  new DesktopManagePo();
			po.setName(name);
			po.setGroupId(groupId);
			po.setMemo(memo);
			po.setTemplateHtml(templateHtml);
			po.setDesignHtml(designHtml);
			po.setIsDef(isDef);
			DesktopManage desktopManage = desktopManageRepository.newInstance(po);
			if(StringUtil.isEmpty(id)){
				desktopManage.create();
				resultMsg="添加桌面布局管理成功";
			}else{
				desktopManage.update();
				resultMsg="更新桌面布局管理成功";
			}
			writeResultMessage(response.getWriter(),id,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对桌面布局管理操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除桌面布局管理记录
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
			DesktopManage desktopManage = desktopManageRepository.newInstance();
			desktopManage.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除桌面布局管理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除桌面布局管理失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
