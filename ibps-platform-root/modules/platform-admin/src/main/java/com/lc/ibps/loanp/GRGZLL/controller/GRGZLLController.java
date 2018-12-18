
package com.lc.ibps.loanp.GRGZLL.controller;

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
import com.lc.ibps.loans.GRGZLL.repository.GRGZLLRepository;
import com.lc.ibps.loans.GRGZLL.persistence.entity.GRGZLLPo;
import com.lc.ibps.loans.GRGZLL.domain.GRGZLL;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_grll 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZEHNGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:01
 *</pre>
 */
@Controller
@RequestMapping("/loanp/GRGZLL/gRGZLL/")
public class GRGZLLController extends GenericController{
	@Resource
	GRGZLLRepository gRGZLLRepository;
	
	/**
	 * 【t_grll】列表(分页条件查询)数据
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
		System.out.println("gRGZLL---->listJson:sfid:"+sfid);
		PageList<GRGZLLPo> gRGZLLList=(PageList<GRGZLLPo>)gRGZLLRepository.query(queryFilter);
		
		PageList<GRGZLLPo> gRGZLLList1 = new PageList<>();
		for(GRGZLLPo gRGZLLPo : gRGZLLList){
			             if(gRGZLLPo.getId().equals(sfid)){
			            	 gRGZLLList1.add(gRGZLLPo);
			             }
		} 
		return new PageJson(gRGZLLList1);
	}
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		GRGZLLPo gRGZLL=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("gRGZLL---->list:sfid:"+sfid);
		
		return getAutoView().addObject("gRGZLL", gRGZLL).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	/**
	 * 编辑【t_grll】信息页面
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
		System.out.println("gRJKSQ---->edit:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		GRGZLLPo gRGZLL=null;
		if(StringUtil.isNotEmpty(id)){
			gRGZLL=gRGZLLRepository.get(id);
		}
		return getAutoView().addObject("gRGZLL", gRGZLL).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/**
	 * 编辑【t_grll】信息页面
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
		GRGZLLPo gRGZLL=null;
		if(StringUtil.isNotEmpty(id)){
			gRGZLL=gRGZLLRepository.get(id);
		}
		return getAutoView().addObject("gRGZLL", gRGZLL).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_grll】明细页面
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
		System.out.println("gRGZLL---->get:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		GRGZLLPo gRGZLL=null;
		if(StringUtil.isNotEmpty(id)){
			gRGZLL=gRGZLLRepository.get(id);
		}
		return getAutoView().addObject("gRGZLL", gRGZLL).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/** 
	 * 保存【t_grll】信息
	 *
	 * @param request
	 * @param response
	 * @param  gRGZLL
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("gRGZLL---->save:sfid:"+sfid);
		try {
			GRGZLLPo gRGZLLPo = getFromRequest(request);
			gRGZLLPo.setId(sfid);
			//构造领域对象和保存数据
			GRGZLL gRGZLL =gRGZLLRepository.newInstance(gRGZLLPo);
			gRGZLL.save();
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
	private GRGZLLPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		GRGZLLPo gRGZLLPo = getGRGZLLPo(jsonObj);

		return gRGZLLPo;
	}
	
	/** 
	 * 获取t_grll数据
	 *
	 * @param jsonObj
	 */
	private GRGZLLPo getGRGZLLPo(JSONObject jsonObj){
		GRGZLLPo gRGZLLPo = (GRGZLLPo) JsonUtil.getDTO(jsonObj.toString(), GRGZLLPo.class);
		return gRGZLLPo;
	}
	
	
	/**
	 *  批量删除【t_grll】记录
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
			GRGZLL gRGZLL =gRGZLLRepository.newInstance();
			gRGZLL.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除l失败，" + e.getMessage());
			logger.error("删除l失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
