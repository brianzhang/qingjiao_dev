
package com.lc.ibps.platform.model.controller;

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
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.components.model.domain.BusinessModel;
import com.lc.ibps.components.model.persistence.entity.BusinessModelPo;
import com.lc.ibps.components.model.persistence.entity.PropModelParam;
import com.lc.ibps.components.model.repository.BusinessModelRepository;
import com.lc.ibps.components.model.repository.PropModelRepository;
import com.utils.CollectionUtil;

import net.sf.json.JSONObject;


/**
 * 业务模板 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-07-21 10:16:51
 *</pre>
 */
@Controller
@RequestMapping("/platform/model/businessModel/")
public class BusinessModelController extends GenericController{
	@Resource
	BusinessModelRepository businessModelRepository;
	@Resource
	PropModelRepository propModelRepository;
	/**
	 * 【业务模板】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse response) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BusinessModelPo> businessModelList=(PageList<BusinessModelPo>)businessModelRepository.query(queryFilter);
		return new PageJson(businessModelList);
	}
	/**
	 * 【模板属性模板】列表
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("propModelList")
	public @ResponseBody List<Map<String, String>> propModelList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String propModelName = RequestUtil.getString(request, "propModelName", "");
		Map<String, String> propModelDataMap = propModelRepository.getPropModelByName(propModelName);
		List<Map<String, String>> rs = CollectionUtil.buildData(propModelDataMap);
		return rs;
	}
	/**
	 * 编辑【业务模板】信息页面
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
		BusinessModelPo businessModel=null;
		List<PropModelParam> propModelParamList = null;
		String modelName = "";
		String propModelId = "";
		if(StringUtil.isNotEmpty(id)){
			businessModel=businessModelRepository.get(id);
			modelName = businessModel.getName();
			propModelId = businessModel.getPropModelId();
		}else{
			propModelId = request.getParameter("propModelId");
			modelName = request.getParameter("name");
			modelName = new String(modelName.getBytes("iso-8859-1"), "UTF-8");
		}
		propModelParamList = businessModelRepository.parsePropModelId(propModelId);
		return getAutoView().addObject("businessModel", businessModel).addObject("returnUrl", preUrl)
				.addObject("propModelParamList", propModelParamList)
				.addObject("modelName", modelName)
				.addObject("propModelId", propModelId);
	}
	
	/**
	 * 编辑【业务模板】信息页面
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
		BusinessModelPo businessModel=null;
		if(StringUtil.isNotEmpty(id)){
			businessModel=businessModelRepository.get(id);
		}
		return getAutoView().addObject("businessModel", businessModel).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【业务模板】明细页面
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
		BusinessModelPo businessModel=null;
		if(StringUtil.isNotEmpty(id)){
			businessModel=businessModelRepository.get(id);
		}
		return getAutoView().addObject("businessModel", businessModel).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【业务模板】信息
	 *
	 * @param request
	 * @param response
	 * @param  businessModel
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BusinessModelPo businessModelPo = getFromRequest(request);
			//构造领域对象和保存数据
			BusinessModel businessModel =businessModelRepository.newInstance(businessModelPo);
			businessModel.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存业务模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对业务模板操作失败,"+e.getMessage());
			logger.error("对业务模板操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BusinessModelPo getFromRequest(HttpServletRequest request){
		BusinessModelPo businessModelPo = new BusinessModelPo();
		String json = RequestUtil.getString(request, "param");
		String modelName = RequestUtil.getString(request, "modelName");
		String propModelId = RequestUtil.getString(request, "propModelId");
		String id = RequestUtil.getString(request, "id");
		if(StringUtil.isNotEmpty(id)){
			businessModelPo.setId(id);
		}
		businessModelPo.setParam(json);
		businessModelPo.setName(modelName);
		businessModelPo.setPropModelId(propModelId);
		
		return businessModelPo;
	}
	
	/** 
	 * 获取业务模板数据
	 *
	 * @param jsonObj
	 */
	private BusinessModelPo getBusinessModelPo(JSONObject jsonObj){
		BusinessModelPo businessModelPo = (BusinessModelPo) JsonUtil.getDTO(jsonObj.toString(), BusinessModelPo.class);
		return businessModelPo;
	}
	
	
	/**
	 *  批量删除【业务模板】记录
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
			BusinessModel businessModel =businessModelRepository.newInstance();
			businessModel.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除业务模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除业务模板失败，" + e.getMessage());
			logger.error("删除业务模板失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
