
package com.lc.ibps.pg.Profession.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.pgs.Profession.repository.ProfessionRepository;
import com.utils.AdminUtil;
import com.lc.ibps.pgs.Profession.persistence.entity.ProfessionPo;
import com.lc.ibps.pgs.Profession.domain.Profession;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_zyb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 13:44:23
 *</pre>
 */
@Controller
@RequestMapping("/pg/Profession/profession/")
public class ProfessionController extends GenericController{
	@Resource
	private ProfessionRepository professionRepository;
	@Resource
	private PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	private PartyEntityRepository partyEntityRepository;
	
	/**
	 * 【t_zyb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		if(!AdminUtil.isSuperAdmin(partyOrgAuthRepository, partyEntityRepository)) {
			String userId = ContextUtil.getCurrentUserId();
			List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
			String orgId=list.get(0).getOrgID();
			queryFilter.addFilter("orgId", orgId, QueryOP.EQUAL);
		}
		PageList<ProfessionPo> professionList=(PageList<ProfessionPo>)professionRepository.query(queryFilter);
		return new PageJson(professionList);
	}
	
	
	

	/**
	 * 编辑【t_zyb】信息页面
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
		ProfessionPo profession=null;
		if(StringUtil.isNotEmpty(id)){
			profession=professionRepository.get(id);
		}
		return getAutoView().addObject("profession", profession).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_zyb】信息页面
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
		ProfessionPo profession=null;
		if(StringUtil.isNotEmpty(id)){
			profession=professionRepository.get(id);
		}
		return getAutoView().addObject("profession", profession).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_zyb】明细页面
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
		ProfessionPo profession=null;
		if(StringUtil.isNotEmpty(id)){
			profession=professionRepository.get(id);
		}
		return getAutoView().addObject("profession", profession).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_zyb】信息
	 *
	 * @param request
	 * @param response
	 * @param  profession
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ProfessionPo professionPo = getFromRequest(request);
			String userId = ContextUtil.getCurrentUserId();
			List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
			String orgId=list.get(0).getOrgID();
			professionPo.setOrgId(orgId);
			//构造领域对象和保存数据
			Profession profession =professionRepository.newInstance(professionPo);
			profession.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_zyb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_zyb操作失败,"+e.getMessage());
			logger.error("对t_zyb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ProfessionPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ProfessionPo professionPo = getProfessionPo(jsonObj);

		return professionPo;
	}
	
	/** 
	 * 获取t_zyb数据
	 *
	 * @param jsonObj
	 */
	private ProfessionPo getProfessionPo(JSONObject jsonObj){
		ProfessionPo professionPo = (ProfessionPo) JsonUtil.getDTO(jsonObj.toString(), ProfessionPo.class);
		return professionPo;
	}
	
	
	/**
	 *  批量删除【t_zyb】记录
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
			//构造领域对象和保存数据
			Profession profession =professionRepository.newInstance();
			profession.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_zyb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_zyb失败，" + e.getMessage());
			logger.error("删除t_zyb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
