package com.lc.ibps.platform.system.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.system.domain.Identity;
import com.lc.ibps.common.system.persistence.entity.IdentityPo;
import com.lc.ibps.common.system.repository.IdentityRepository;

/**
* 流水号 控制器类。
*
* <pre> 
* 构建组：ibps-common-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2015-12-16 10:27:35
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/system/identity/")
public class IdentityController extends GenericController{
	@Resource
	private IdentityRepository identityRepository;
	
	
	/**
	 * 流水号列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,
			HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<IdentityPo> identityList=(PageList<IdentityPo>)identityRepository.query(queryFilter);
		return new PageJson(identityList);
	}
	
	/**
	 * 编辑流水号信息页面
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
		IdentityPo identity=null;
		if(StringUtil.isNotEmpty(id)){
			identity=identityRepository.get(id);
		}
		return getAutoView().addObject("identity", identity).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 流水号明细页面
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
		IdentityPo identity=null;
		if(StringUtil.isNotEmpty(id)){
			identity=identityRepository.get(id);
		}
		return getAutoView().addObject("identity", identity).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存流水号信息
	 *
	 * @param request
	 * @param response
	 * @param  identity
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,IdentityPo po) throws Exception{
		String resultMsg=null;
		try {
			Identity identity = identityRepository.newInstance(po);
			boolean isYes = identity.add();
			if(isYes){
				resultMsg="保存流水号成功";
			}else{
				resultMsg="流水号别名已存在，请重新输入!";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对流水号操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除流水号记录
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
			Identity identity = identityRepository.newInstance();
			identity.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "流水号成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除流水号失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	@RequestMapping("test")
	public @ResponseBody String test(HttpServletRequest request,HttpServletResponse response,IdentityPo identity) throws Exception{
		String always="";
		try {
			always=identityRepository.testAlways(identity);
		} catch (Exception e) {
			always="流水号测试失败，请按照正确的规则填写！";
			return always;
		}
		
		return always;
	}
	

	/**
	 * 
	 * 获取所有流水号信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getSelectorData")
	@ResponseBody
	public Map<String, Object> getSelectorData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String,Object> map =  new HashMap<String,Object>();
		QueryFilter queryFilter = this.getQuerFilter(request,null);
		String queryName = RequestUtil.getString(request, "queryName");
		if(StringUtil.isNotEmpty(queryName))
			queryFilter.addFilter("name_" ,"%"+queryName+"%",QueryOP.LIKE);
		List<IdentityPo> data = identityRepository.query(queryFilter);
		try {
			 map.put("result", true);
			map.put("data",  data);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			 map.put("result", true);
			map.put("msg", e.getMessage());
		}
		
		return  map;
	}
	/**
	 * 获取所有流水号信息
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getAll")
	public @ResponseBody PageJson getAll(HttpServletRequest request,
			HttpServletResponse reponse) throws Exception{
		List<IdentityPo> identityLis=identityRepository.findAll();
		return new PageJson(identityLis);
	}
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getNextIdByAlias") 
	public  @ResponseBody void getNextIdByAlias(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String alias = RequestUtil.getString(request, "alias");
		ResultMessage message=null;
		try {
			if(identityRepository.isAliasExist(alias)>0){
				String nextId = identityRepository.getByAlias(alias);
				message=new ResultMessage(ResultMessage.SUCCESS, nextId);
			}else{
				message=new ResultMessage(ResultMessage.WARN, "别名不存在");
			}
		
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			message=new ResultMessage(ResultMessage.ERROR, "生成编号错误,请联系管理员！");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
