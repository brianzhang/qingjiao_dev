

package com.lc.ibps.platform.codegen.controller;

import java.util.Date;

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
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.components.codegen.domain.Variable;
import com.lc.ibps.components.codegen.persistence.entity.VariablePo;
import com.lc.ibps.components.codegen.repository.VariableRepository;


/**
 * 变量 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-02 16:58:37
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/variable/")
public class VariableController extends GenericController{
	@Resource
	private VariableRepository variableRepository;
	
	/**
	 * 【变量】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<VariablePo> variableList=(PageList<VariablePo>)variableRepository.querySelf(queryFilter, ContextUtil.getCurrentUserId());
		return new PageJson(variableList);
	}
	
	/**
	 * 编辑【变量】信息页面
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
		VariablePo variable=null;
		if(StringUtil.isNotEmpty(id)){
			variable=variableRepository.get(id);
		}else{
			variable = new VariablePo();
			variable.setCreator(ContextUtil.getCurrentUserId());
			variable.setCreateTime(new Date());
		}
		
		return getAutoView().addObject("variable", variable).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【变量】明细页面
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
		VariablePo variable=null;
		if(StringUtil.isNotEmpty(id)){
			variable=variableRepository.get(id);
		}
		
		return getAutoView().addObject("variable", variable).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【变量】信息
	 *
	 * @param request
	 * @param response
	 * @param  variable
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,VariablePo variablePo) throws Exception{
		ResultMessage message=null;
		try {
			if(variableRepository.existKey(variablePo.getId(), variablePo.getKey(), variablePo.getType(), variablePo.getCreator())){
				message=new ResultMessage(ResultMessage.FAIL, "变量key【"+variablePo.getKey()+"】已存在");
			}else{
				//构造领域对象和保存数据
				Variable variable =variableRepository.newInstance(variablePo);
				variable.save();
				message=new ResultMessage(ResultMessage.SUCCESS, "保存变量成功");
			}
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对变量操作失败,"+e.getMessage());
			logger.error("对变量操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【变量】记录
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
			Variable variable =variableRepository.newInstance();
			variable.delete(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除变量成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除变量失败," + e.getMessage());
			logger.error("删除变量失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  变量 初始化
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("refresh")
	public void refresh(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String cuser = ContextUtil.getCurrentUserId();
			//构造领域对象和保存数据
			Variable variable =variableRepository.newInstance();
			variable.refresh(cuser);
			message=new ResultMessage(ResultMessage.SUCCESS, "重置变量成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "重置变量失败," + e.getMessage());
			logger.error("重置变量失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
