package com.lc.ibps.platform.codegen.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.persistence.entity.DictionaryPo;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.DictionaryRepository;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;
import com.lc.ibps.demo.codegen.service.EmployeeDicQueryService;
import com.lc.ibps.demo.codegen.service.EmployeeDicService;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;
import com.lc.ibps.org.party.persistence.entity.PartyUserRolePo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;

import net.sf.json.JSONObject;


/**
 * 权限配置 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:27
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/employeeDic/")
public class EmployeeDicController extends GenericController{
	@Resource
	private EmployeeDicService employeeDicService;
	@Resource
	private EmployeeDicQueryService employeeDicQueryService;
	@Resource
	private TypeRepository typeRepository;
	@Resource
	private PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	PartyUserRoleRepository partyUserRoleRepository;
	@Resource
	PartyRoleRepository partyRoleRepository;
	@Resource
	DictionaryRepository dictionaryRepository;
	/**
	 * 【权限配置】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		String listData = employeeDicQueryService.query(queryFilter);
		PageList<EmployeeDicPo> employeeDicList = null;
		if(JsonUtil.isJsonObject(listData)){
			JSONObject data = JSONObject.fromObject(listData);
			List<EmployeeDicPo> list = EmployeeDicPo.fromJsonArrayString(data.getString("data"));
			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
			employeeDicList = new PageList<EmployeeDicPo>(list, pageResult);
		}
		
		return new PageJson(employeeDicList);
	}
	
	/**
	 * 编辑【权限配置】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("dicDialog")
	public ModelAndView dicDialog(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		String preUrl= RequestUtil.getPrePage(request);
		String userId=RequestUtil.getString(request, "userId");
		EmployeeDicPo employeeDic=new EmployeeDicPo();
		if(StringUtil.isNotEmpty(userId)){
			PartyEmployeePo user = partyEmployeeRepository.get(userId);
			employeeDic.setUserId(user.getId());
			employeeDic.setUserName(user.getName());
		}

		return getAutoView().addObject("employeeDic", employeeDic);
	}
	
	/**
	 * 编辑【权限配置】信息页面
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
		EmployeeDicPo employeeDic=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = employeeDicQueryService.get(id);
			employeeDic = EmployeeDicPo.fromJsonString(data);
		}
		return getAutoView().addObject("employeeDic", employeeDic).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【权限配置】明细页面
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
		EmployeeDicPo employeeDic=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = employeeDicQueryService.get(id);
			employeeDic = EmployeeDicPo.fromJsonString(data);
		}
		return getAutoView().addObject("employeeDic", employeeDic).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【权限配置】信息
	 *
	 * @param request
	 * @param response
	 //* @param  employeeDic
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			String userId = RequestUtil.getString(request, "userId");
			employeeDicService.save(json,userId);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存权限配置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对权限配置操作失败,"+e.getMessage());
			logger.error("对权限配置操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【权限配置】记录
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
			employeeDicService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除权限配置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除权限配置失败，" + e.getMessage());
			logger.error("删除权限配置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 * 获取资源
	 */
	@RequestMapping("dicTree")
	@ResponseBody
	public List<TypePo> dicTree(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//判断用户角色
		String userId = RequestUtil.getString(request, "userId");		
		//List<TypePo> raw = typeRepository.getDicTree();

		
		//声明需要显示的typeKey
		List<String> typeKeys = new ArrayList();
		String roleName = getRoleName(userId);
		switch(roleName) {
			case "报修审核员": 
				typeKeys.add("bxzt");
				typeKeys.add("bxqy");
				typeKeys.add("bxxm");
				break;
			case "报修维修工":
				typeKeys.add("bxqy");
				typeKeys.add("bxxm");
				break;
			default:break;
		}
		//List<TypePo> types = filtTypes( raw ,request , typeKeys);
		
		//return TypePo.fromJsonArrayString(employeeDicQueryService.dicTree(userId, types));
		return null;
	}
	
	/**
	 * 将固定的几个typeKey需要显示的节点以及其子节点数据
	 * 过滤出来
	 * @param raw
	 * @return
	 */
	List<TypePo> filtTypes(List<TypePo> raw , HttpServletRequest request ,List<String> typeKeys ){
		
		
		//dic表实体类与dicid集合
		List<DictionaryPo> dicPos = new ArrayList();
		List<String> dicIds = new ArrayList();
		
		//将主节点id加入筛选列表
		QueryFilter qf = getQuerFilter(request);
		qf.addFilter("type_key_", typeKeys , QueryOP.IN);
		for(TypePo tp : typeRepository.query(qf) ) dicIds.add(tp.getId());
		
		//根据typeKey，调用findByTypeKey查对应的dic实体，返回的实体list全部添加到dic实体集合中
		for(String typeKey : typeKeys) 
			dicPos.addAll( dictionaryRepository.findByTypeKey( typeKey ) );
			
		//取出所有dic的id
		for(DictionaryPo dicPo : dicPos) 
			dicIds.add( dicPo.getId() );
		
		
		//遍历type表
		Iterator<TypePo> it = raw.iterator();
		List<TypePo> types = new ArrayList();
		
		for(TypePo tp : raw) {
			if( dicIds.contains(tp.getId()) ) 
				types.add(tp);
		}
		
		return types;
	}
	
	//取得当前登录用户的角色类型
	public  String getRoleName(String userId) {
		List<PartyUserRolePo> urList = new ArrayList<PartyUserRolePo>();
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql = " USER_ID_="  +"\'"+userId+"\'";
		
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		
		urList=(PageList<PartyUserRolePo>)partyUserRoleRepository.query(paramQueryFilter);
		String roleName = null;
		if(urList.size()!=0) {
			String roleId = urList.get(0).getRoleID();
			PartyRolePo partyRolePo = partyRoleRepository.get(roleId);
			roleName = partyRolePo.getName();
		}		
		return roleName;
	}
}


























