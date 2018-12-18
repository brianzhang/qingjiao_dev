
package com.lc.ibps.bishe.audit.controller;

import java.util.ArrayList;
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

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.audit.repository.LabelDefRepository;
import com.lc.ibps.bishes.audit.repository.TchLabelRepository;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;
import com.lc.ibps.bishes.audit.domain.TchLabel;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 教师标签表 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 12:50:32
 *</pre>
 */
@Controller
@RequestMapping("/bishe/audit/tchLabel/")
public class TchLabelController extends GenericController{
	@Resource
	private TchLabelRepository tchLabelRepository;
	@Resource
	private PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	CurrentContext currentContext;	
	@Resource
	LabelDefRepository labelDefRepository;
	
	
	private Map<String, String> makeLableMap(String userId) {
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return null;
			}else {
				orgId = partyOrgAuthPos.get(0).getOrgID();
			}
		}
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="org_id_ ='"+orgId+"'";
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		List<LabelDefPo> labelDefPos = labelDefRepository.query(paramQueryFilter);
		Map<String, String> labelMap = new HashMap<>();
		for (LabelDefPo labelDefPo : labelDefPos) {
			labelMap.put(labelDefPo.getId(), labelDefPo.getLabelName());
		}
		return labelMap;
	}
	
	/**
	 * 【教师标签表】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		//得到登陆教师或者管理员的院系Id
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return null;
			}else {
				orgId = partyOrgAuthPos.get(0).getOrgID();
			}
		}
		QueryFilter queryFilter=getQuerFilter(request);
		queryFilter.addFilter("org_id_", orgId, QueryOP.EQUAL);       //区分院系
		PageList<TchLabelPo> tchLabelList=(PageList<TchLabelPo>)tchLabelRepository.query(queryFilter);
		//id --> 中文
		Map<String, String> labelMap = makeLableMap(userId);	
		StringBuffer sBuffer = new StringBuffer();
		for (TchLabelPo e : tchLabelList) {
			e.setOrgId( partyEmployeeRepository.get(e.getId()).getName());
			String labelId = e.getLabelId();
			if (labelId != null && !("").equals(labelId)) {
				String[] labelIds = labelId.split(",");
				for (String es : labelIds) {
					if (!("").equals(es)) {
						String labelName = labelMap.get(es);
						sBuffer.append( labelName );
						sBuffer.append(",");
					}
				}
				if (sBuffer.length() > 0) {
					sBuffer.deleteCharAt(sBuffer.length() - 1);
				}
			}
			e.setLabelId(sBuffer.toString());
			sBuffer.delete(0, sBuffer.length());
		}
		return new PageJson(tchLabelList);
	}
	
	
	/**
	 * 毕设教师人员选择框数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonForTchBox")
	public @ResponseBody PageJson listJsonForTchBox(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";

		List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
		if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
			return null;
		}else {
			List<String> orgIds = new ArrayList<>();
			for (PartyOrgAuthPo e : partyOrgAuthPos) {
				orgIds.add(e.getOrgID());
			}
			queryFilter.addFilter("org_id_", orgIds, QueryOP.IN);
		}
		
		PageList<TchLabelPo> tchLabelList=(PageList<TchLabelPo>)tchLabelRepository.query(queryFilter);
		//orgid --> 姓名
		Map<String, String> labelMap = makeLableMap(userId);	
		StringBuffer sBuffer = new StringBuffer();
		for (TchLabelPo e : tchLabelList) {
			e.setOrgId( partyEmployeeRepository.get(e.getId()).getName());
			String labelId = e.getLabelId();
			if (labelId != null && !("").equals(labelId)) {
				String[] labelIds = labelId.split(",");
				for (String es : labelIds) {
					if (!("").equals(es)) {
						String labelName = labelMap.get(es);
						sBuffer.append( labelName );
						sBuffer.append(",");
					}
				}
				if (sBuffer.length() > 0) {
					sBuffer.deleteCharAt(sBuffer.length() - 1);
				}
			}
			e.setLabelId(sBuffer.toString());
			sBuffer.delete(0, sBuffer.length());
		}
		return new PageJson(tchLabelList);
	}
	
	/**
	 * 编辑【教师标签表】信息页面
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
		TchLabelPo tchLabel=null;
		if(StringUtil.isNotEmpty(id)){
			tchLabel=tchLabelRepository.get(id);
		}
		return getAutoView().addObject("tchLabel", tchLabel).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【教师标签表】信息页面
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
		TchLabelPo tchLabel=null;
		if(StringUtil.isNotEmpty(id)){
			tchLabel=tchLabelRepository.get(id);
		}
		return getAutoView().addObject("tchLabel", tchLabel).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【教师标签表】明细页面
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
		TchLabelPo tchLabel=null;
		if(StringUtil.isNotEmpty(id)){
			tchLabel=tchLabelRepository.get(id);
		}
		return getAutoView().addObject("tchLabel", tchLabel).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【教师标签表】信息
	 *
	 * @param request
	 * @param response
	 * @param  tchLabel
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			TchLabelPo tchLabelPo = getFromRequest(request);
			//构造领域对象和保存数据
			TchLabel tchLabel =tchLabelRepository.newInstance(tchLabelPo);
			tchLabel.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存教师标签表成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对教师标签表操作失败,"+e.getMessage());
			logger.error("对教师标签表操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TchLabelPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TchLabelPo tchLabelPo = getTchLabelPo(jsonObj);

		return tchLabelPo;
	}
	
	/** 
	 * 获取教师标签表数据
	 *
	 * @param jsonObj
	 */
	private TchLabelPo getTchLabelPo(JSONObject jsonObj){
		TchLabelPo tchLabelPo = (TchLabelPo) JsonUtil.getDTO(jsonObj.toString(), TchLabelPo.class);
		return tchLabelPo;
	}
	
	
	/**
	 *  批量删除【教师标签表】记录
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
			TchLabel tchLabel =tchLabelRepository.newInstance();
			tchLabel.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除教师标签表成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除教师标签表失败，" + e.getMessage());
			logger.error("删除教师标签表失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
