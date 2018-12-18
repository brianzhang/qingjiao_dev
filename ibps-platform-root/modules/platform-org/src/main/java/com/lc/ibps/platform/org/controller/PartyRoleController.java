package com.lc.ibps.platform.org.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.auth.service.ISubSysQueryService;
import com.lc.ibps.api.org.service.IPartyRoleBaseQueryService;
import com.lc.ibps.api.org.service.IPartyRoleBaseService;
import com.lc.ibps.api.org.service.IRoleResourceService;
import com.lc.ibps.api.org.service.IRoleSystemQueryService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.auth.persistence.entity.RoleSystemPo;
import com.lc.ibps.org.auth.persistence.entity.SubSystemPo;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;

/**
* 角色  控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：huangchunyan
* 邮箱：3378340995@qq.com
* 日期：2016-08-08 10:28:09
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/org/partyRole/")
public class PartyRoleController extends GenericController{
	@Resource
	private IPartyRoleBaseQueryService partyRoleBaseQueryService;

	@Resource
	private IPartyRoleBaseService partyRoleBaseService;
	@Resource
	private ISubSysQueryService subSysQueryService;
	@Resource
	private IRoleResourceService roleResourceService;
	@Resource
	private IRoleSystemQueryService roleSystemQueryService;
	
	/**
	 * 编辑角色信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.edit()--->preUrl="+preUrl+",id="+id);
		
		//获取系统信息
		String listData = subSysQueryService.findAll();
		List<SubSystemPo> subSystemList = null;
		if(JsonUtil.isJsonArray(listData)){
			subSystemList = JsonUtil.getDTOList(listData, SubSystemPo.class);
		}
		PartyRolePo partyRole=null;
		RoleSystemPo roleSystem=null;
		
		if(StringUtil.isNotEmpty(id)){
			partyRole = PartyRolePo.fromJsonString(partyRoleBaseQueryService.getJson(id));
			roleSystem = RoleSystemPo.fromJsonString(roleSystemQueryService.getByRoleId(id));
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.edit()--->preUrl="+preUrl+",id="+id
				+",subSystemList="+(subSystemList != null?Arrays.toString(subSystemList.toArray()):"")
				+",partyRole="+(partyRole!= null?partyRole.toString():"")
				+",roleSystem="+(roleSystem!=null?roleSystem.toString():""));
		
		return getAutoView().addObject("partyRole", partyRole)
							.addObject("returnUrl", preUrl)
							.addObject("roleSystem", roleSystem)
							.addObject("subSystemList", subSystemList);
	}
	
	/**
	 * 角色明细页面
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
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.get()--->preUrl="+preUrl+",id="+id);
		
		PartyRolePo partyRole=null;
		if(StringUtil.isNotEmpty(id)){
			partyRole= PartyRolePo.fromJsonString(partyRoleBaseQueryService.getJson(id));
		}
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.edit()--->preUrl="+preUrl+",id="+id
				+",partyRole="+(partyRole!= null?partyRole.toString():""));
		
		return getAutoView().addObject("partyRole", partyRole).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存角色信息
	 *
	 * @param request
	 * @param response
	 * @param  partyRole
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,PartyRolePo po) throws Exception{
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.save()--->partyRole="
						+(po != null?po.toString():""));
		
		String resultMsg=null;
		try {
			resultMsg = partyRoleBaseService.save(po.toJsonString());
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对角色操作失败，";
			writeResultMessage(response.getWriter(),resultMsg+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+e.getMessage(), e);
		}
	}
	
	/**
	 *  批量删除角色记录
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
			
			logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.remove()--->aryIds="
					+(aryIds!=null?Arrays.toString(aryIds):"")
					);
			
			partyRoleBaseService.remove(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除角色成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除角色失败,"+e.getMessage());
			logger.error(message.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * @名称 角色save
	 */
	@RequestMapping("updateResource")
	public void updateResource(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String [] resIds = RequestUtil.getStringAryByStr(request, "resIds");
		String roleId = RequestUtil.getString(request, "roleId");
		String systemId = RequestUtil.getString(request, "systemId");
		
		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.updateResource()--->"
				+"resIds="+(resIds!=null?Arrays.toString(resIds):"")
				+",roleId="+roleId
				+",systemId="+systemId
				);
		
		String resultMsg = "";
		try {
			if(StringUtil.isNotEmpty(roleId)){
				roleResourceService.updateResource(roleId, systemId, resIds);
				resultMsg="更新： 角色资源 成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg = "更新角色资源失败";
			writeResultMessage(response.getWriter(),resultMsg+","+e.getMessage(),ResultMessage.FAIL);
			logger.error(resultMsg+e.getMessage(), e);
		}
	}
	
	/**
	 * 
	 * 角色人员列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("userList")
	public ModelAndView userList(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		String id = RequestUtil.getString(request, "id");

		logger.debug("com.lc.ibps.platform.org.controller.PartyRoleController.userList()" + "--->id=" + id);

		return getAutoView().addObject("roleId", id);
	}
	
}
