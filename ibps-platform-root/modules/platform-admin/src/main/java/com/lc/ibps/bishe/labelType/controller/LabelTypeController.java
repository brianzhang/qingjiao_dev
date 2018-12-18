
package com.lc.ibps.bishe.labelType.controller;

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
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.labelType.repository.LabelTypeRepository;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;
import com.lc.ibps.bishes.labelType.domain.LabelType;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_label_type 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 16:57:08
 *</pre>
 */
@Controller
@RequestMapping("/bishe/labelType/labelType/")
public class LabelTypeController extends GenericController{
	@Resource
	private LabelTypeRepository labelTypeRepository;
	@Resource
	private PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	CurrentContext currentContext;
	
	/**
	 * 【t_label_type】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		ResultMessage message=null;
		//获取院系orgId
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		List<PartyOrgAuthPo> orgIds = partyOrgAuthRepository.queryByUserId(userId);
		if (orgIds.size() == 1) {
			orgId = orgIds.get(0).getOrgID();
		}else {
			message=new ResultMessage(ResultMessage.FAIL, "未获得管理员权限,");
			return null;
		}
		QueryFilter queryFilter=getQuerFilter(request);
		queryFilter.addFilter("org_id_", orgId, QueryOP.EQUAL);
		PageList<LabelTypePo> labelTypeList=(PageList<LabelTypePo>)labelTypeRepository.query(queryFilter);
		return new PageJson(labelTypeList);
	}
	
	/**
	 * 编辑【t_label_type】信息页面
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
		LabelTypePo labelType=null;
		if(StringUtil.isNotEmpty(id)){
			labelType=labelTypeRepository.get(id);
		}
		return getAutoView().addObject("labelType", labelType).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_label_type】信息页面
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
		LabelTypePo labelType=null;
		if(StringUtil.isNotEmpty(id)){
			labelType=labelTypeRepository.get(id);
		}
		return getAutoView().addObject("labelType", labelType).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_label_type】明细页面
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
		LabelTypePo labelType=null;
		if(StringUtil.isNotEmpty(id)){
			labelType=labelTypeRepository.get(id);
		}
		return getAutoView().addObject("labelType", labelType).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_label_type】信息
	 *
	 * @param request
	 * @param response
	 * @param  labelType
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		//获取院系orgId
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		List<PartyOrgAuthPo> orgIds = partyOrgAuthRepository.queryByUserId(userId);
		if (orgIds.size() == 1) {
			orgId = orgIds.get(0).getOrgID();
		}else {
			message=new ResultMessage(ResultMessage.FAIL, "未获得管理员权限,");
			return;
		}
		try {
			LabelTypePo labelTypePo = getFromRequest(request);
			labelTypePo.setOrgId(orgId);
			//构造领域对象和保存数据
			LabelType labelType =labelTypeRepository.newInstance(labelTypePo);
			labelType.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_label_type成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_label_type操作失败,"+e.getMessage());
			logger.error("对t_label_type操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private LabelTypePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		LabelTypePo labelTypePo = getLabelTypePo(jsonObj);

		return labelTypePo;
	}
	
	/** 
	 * 获取t_label_type数据
	 *
	 * @param jsonObj
	 */
	private LabelTypePo getLabelTypePo(JSONObject jsonObj){
		LabelTypePo labelTypePo = (LabelTypePo) JsonUtil.getDTO(jsonObj.toString(), LabelTypePo.class);
		return labelTypePo;
	}
	
	
	/**
	 *  批量删除【t_label_type】记录
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
			LabelType labelType =labelTypeRepository.newInstance();
			labelType.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_label_type成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_label_type失败，" + e.getMessage());
			logger.error("删除t_label_type失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
