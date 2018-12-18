
package com.lc.ibps.loanp.POXX.controller;

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
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.loans.POXX.repository.POXXRepository;
import com.lc.ibps.loans.POXX.persistence.entity.POXXPo;
import com.lc.ibps.loans.POXX.domain.POXX;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_poxxb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:49:27
 *</pre>
 */
@Controller
@RequestMapping("/loanp/POXX/pOXX/")
public class POXXController extends GenericController{
	@Resource
	POXXRepository pOXXRepository;
	
	/**
	 * 【t_poxxb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("gRJKSQ---->listJson:sfid:"+sfid);
		PageList<POXXPo> pOXXList=(PageList<POXXPo>)pOXXRepository.query(queryFilter);
		
		PageList<POXXPo> pOXXList1 = new PageList<>();
		for(POXXPo pOXXPo : pOXXList){
			             if(pOXXPo.getId().equals(sfid)){
			            	 pOXXList1.add(pOXXPo);
			             }
		} 
		return new PageJson(pOXXList1);
	}
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		POXXPo pOXX=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("pOXX---->list:sfid:"+sfid);
		
		return getAutoView().addObject("pOXX", pOXX).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	/**
	 * 编辑【t_poxxb】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("gRJKSQ---->get:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		POXXPo pOXX=null;
		if(StringUtil.isNotEmpty(id)){
			pOXX=pOXXRepository.get(id);
		}
		return getAutoView().addObject("pOXX", pOXX).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/**
	 * 编辑【t_poxxb】信息页面
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
		POXXPo pOXX=null;
		if(StringUtil.isNotEmpty(id)){
			pOXX=pOXXRepository.get(id);
		}
		return getAutoView().addObject("pOXX", pOXX).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_poxxb】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("gRJKSQ---->get:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		POXXPo pOXX=null;
		if(StringUtil.isNotEmpty(id)){
			pOXX=pOXXRepository.get(id);
		}
		return getAutoView().addObject("pOXX", pOXX).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/** 
	 * 保存【t_poxxb】信息
	 *
	 * @param request
	 * @param response
	 * @param  pOXX
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("pOXX---->save:sfid:"+sfid);
		try {
			POXXPo pOXXPo = getFromRequest(request);
			pOXXPo.setId(sfid);
			//构造领域对象和保存数据
			POXX pOXX =pOXXRepository.newInstance(pOXXPo);
			pOXX.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private POXXPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		POXXPo pOXXPo = getPOXXPo(jsonObj);

		return pOXXPo;
	}
	
	/** 
	 * 获取t_poxxb数据
	 *
	 * @param jsonObj
	 */
	private POXXPo getPOXXPo(JSONObject jsonObj){
		POXXPo pOXXPo = (POXXPo) JsonUtil.getDTO(jsonObj.toString(), POXXPo.class);
		return pOXXPo;
	}
	
	
	/**
	 *  批量删除【t_poxxb】记录
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
			POXX pOXX =pOXXRepository.newInstance();
			pOXX.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
