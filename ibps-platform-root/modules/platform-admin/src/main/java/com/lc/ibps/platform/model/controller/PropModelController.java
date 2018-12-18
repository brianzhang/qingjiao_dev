
package com.lc.ibps.platform.model.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.lc.ibps.components.model.domain.PropModel;
import com.lc.ibps.components.model.persistence.entity.PropModelParam;
import com.lc.ibps.components.model.persistence.entity.PropModelPo;
import com.lc.ibps.components.model.repository.PropModelRepository;
import com.utils.Json2Po;

import net.sf.json.JSONArray;


/**
 * 模板属性设置 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-07-21 02:16:57
 *</pre>
 */
@Controller
@RequestMapping("/platform/model/propModel/")
public class PropModelController extends GenericController{
	@Resource
	PropModelRepository propModelRepository;
	
	/**
	 * 【模板属性设置】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse response) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<PropModelPo> propModelList=(PageList<PropModelPo>)propModelRepository.query(queryFilter);
		return new PageJson(propModelList);
	}
	
	/**
	 * 编辑【模板属性设置】信息页面
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
		PropModelPo propModel=null;
		List<PropModelParam> mppp = null;
		if(StringUtil.isNotEmpty(id)){
			propModel=propModelRepository.get(id);
			mppp = new ArrayList();
			
			JSONArray ja = JSONArray.fromObject(propModel.getParam());
			mppp = Json2Po.parse(ja, PropModelParam.class);
				
		}
		return getAutoView().addObject("propModel", propModel).addObject("returnUrl", preUrl).addObject("propModelParamList", mppp);
	}
	
	/**
	 * 编辑【模板属性设置】信息页面
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
		PropModelPo propModel=null;
		if(StringUtil.isNotEmpty(id)){
			propModel=propModelRepository.get(id);
		}
		return getAutoView().addObject("propModel", propModel).addObject("returnUrl", preUrl);
	}
	/** 
	 * 保存【模板属性设置】信息
	 *
	 * @param request
	 * @param response
	 * @param  PropModel
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			PropModelPo propModelPo = getFromRequest(request);
			//构造领域对象和保存数据
			PropModel propModel =propModelRepository.newInstance(propModelPo);
			propModel.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存模板属性设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对模板属性设置操作失败,"+e.getMessage());
			logger.error("对模板属性设置操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PropModelPo getFromRequest(HttpServletRequest request){
		String id = RequestUtil.getString(request, "id");
		String name = RequestUtil.getString(request, "modelName");
		String param = RequestUtil.getString(request, "param");
		String auth = RequestUtil.getString(request, "auth");
		PropModelPo propModelPo = new PropModelPo();
		if(StringUtil.isNotEmpty(id))
			propModelPo.setId(id);
		propModelPo.setName(name);
		propModelPo.setParam(param);
		propModelPo.setAuth(auth);
		return propModelPo;
	}
	

	
	
	/**
	 *  批量删除【模板属性设置】记录
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
			PropModel propModel =propModelRepository.newInstance();
			propModel.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除模板属性设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除模板属性设置失败，" + e.getMessage());
			logger.error("删除模板属性设置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
