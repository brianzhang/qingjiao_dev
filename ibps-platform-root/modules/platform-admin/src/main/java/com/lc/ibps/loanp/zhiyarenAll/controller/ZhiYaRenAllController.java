
package com.lc.ibps.loanp.zhiyarenAll.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
import com.lc.ibps.loans.zhiyarenAll.domain.ZhiYaRenAll;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;
import com.lc.ibps.loans.zhiyarenAll.repository.ZhiYaRenAllRepository;

import net.sf.json.JSONObject;


/**
 * t_zyr_all 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 05:58:41
 *</pre>
 */
@Controller
@RequestMapping("/loanp/zhiyarenAll/zhiYaRenAll/")
public class ZhiYaRenAllController extends GenericController{
	@Resource
	ZhiYaRenAllRepository zhiYaRenAllRepository;
	
	/**
	 * 【t_zyr_all】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 * lgw
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse ) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		 
	    String referer = request.getHeader("referer");
		String jdid = referer.split("jdid=")[1];  
		/*String jdid  = request.getParameter("jdid");
		System.out.println("==========>jdid: "+jdid);*/
  
		PageList<ZhiYaRenAllPo> zhiYaRenAllList=(PageList<ZhiYaRenAllPo>)zhiYaRenAllRepository.query(queryFilter);
		PageList<ZhiYaRenAllPo> zhiYaRenAllList1 = new PageList<>();
		for(ZhiYaRenAllPo zhiYaRenAllPo : zhiYaRenAllList){
			             if(zhiYaRenAllPo.getJdid().equals(jdid)){
			            	 zhiYaRenAllList1.add(zhiYaRenAllPo);
			             }
		} 
		
		return new PageJson(zhiYaRenAllList1);
	}
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{  
		String jdid=RequestUtil.getString(request, "jdid");  
		System.out.println("**********> jdid list:"+jdid); 
		return getAutoView().addObject("jdid", jdid);
	}
	
	/**
	 * 编辑【t_zyr_all】信息页面
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
		String jdid=RequestUtil.getString(request, "jdid");
		System.out.println("-------------->edit"+jdid);
		ZhiYaRenAllPo zhiYaRenAll=null;
		if(StringUtil.isNotEmpty(id)){
			zhiYaRenAll=zhiYaRenAllRepository.get(id);
		}
		return getAutoView().addObject("zhiYaRenAll", zhiYaRenAll).addObject("returnUrl", preUrl).addObject("jdid",jdid);
	}
	
	/**
	 * 编辑【t_zyr_all】信息页面
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
		ZhiYaRenAllPo zhiYaRenAll=null;
		if(StringUtil.isNotEmpty(id)){
			zhiYaRenAll=zhiYaRenAllRepository.get(id);
		}
		return getAutoView().addObject("zhiYaRenAll", zhiYaRenAll).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_zyr_all】明细页面
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
		String jdid=RequestUtil.getString(request, "jdid");
		System.out.println("-------------->get"+jdid);
		
		ZhiYaRenAllPo zhiYaRenAll=null;
		if(StringUtil.isNotEmpty(id)){
			zhiYaRenAll=zhiYaRenAllRepository.get(id);
		}
		return getAutoView().addObject("zhiYaRenAll", zhiYaRenAll).addObject("returnUrl", preUrl).addObject("jdid",jdid);
	}
	
	/** 
	 * 保存【t_zyr_all】信息
	 *
	 * @param request
	 * @param response
	 * @param  zhiYaRenAll
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String jdid = RequestUtil.getString(request, "jdid");
		System.out.println("+++++++++++++> save"+jdid);
		ResultMessage message=null;
		try {
			ZhiYaRenAllPo zhiYaRenAllPo = getFromRequest(request);
			zhiYaRenAllPo.setJdid(jdid);
			//构造领域对象和保存数据
			ZhiYaRenAll zhiYaRenAll =zhiYaRenAllRepository.newInstance(zhiYaRenAllPo);
			zhiYaRenAll.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功"+"@"+jdid);
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
	private ZhiYaRenAllPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ZhiYaRenAllPo zhiYaRenAllPo = getZhiYaRenAllPo(jsonObj);

		return zhiYaRenAllPo;
	}
	
	/** 
	 * 获取t_zyr_all数据
	 *
	 * @param jsonObj
	 */
	private ZhiYaRenAllPo getZhiYaRenAllPo(JSONObject jsonObj){
		ZhiYaRenAllPo zhiYaRenAllPo = (ZhiYaRenAllPo) JsonUtil.getDTO(jsonObj.toString(), ZhiYaRenAllPo.class);
		return zhiYaRenAllPo;
	}
	
	
	/**
	 *  批量删除【t_zyr_all】记录
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
			ZhiYaRenAll zhiYaRenAll =zhiYaRenAllRepository.newInstance();
			zhiYaRenAll.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
