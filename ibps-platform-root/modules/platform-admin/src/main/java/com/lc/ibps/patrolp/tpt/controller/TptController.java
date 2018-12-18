
package com.lc.ibps.patrolp.tpt.controller;

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
import com.lc.ibps.patrols.tpt.repository.TptRepository;
import com.lc.ibps.patrols.tpt.persistence.entity.TptPo;
import com.lc.ibps.patrols.tpt.domain.Tpt;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_tpt 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 11:39:03
 *</pre>
 */
@Controller
@RequestMapping("/patrolp/tpt/tpt/")
public class TptController extends GenericController{
	@Resource
	private TptRepository tptRepository;
	
	/**
	 * 【t_tpt】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<TptPo> tptList=(PageList<TptPo>)tptRepository.query(queryFilter);
		return new PageJson(tptList);
	}
	
	/**
	 * 编辑【t_tpt】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String course = request.getParameter("course");
		String markid =request.getParameter("markid");
		String pgId = request.getParameter("pgId");
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		TptPo tpt=null;
		if(StringUtil.isNotEmpty(id)){
			tpt=tptRepository.get(id);
		}
		
		//String markid = "-2";
		
		
		return getAutoView().addObject("tpt", tpt).addObject("returnUrl", preUrl).addObject("markid", markid).addObject("tptId", id).addObject("pgId", pgId).addObject("course", course);
	}
	
	/**    
	 * 编辑【t_tpt】信息页面
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
		TptPo tpt=null;
		if(StringUtil.isNotEmpty(id)){
			tpt=tptRepository.get(id);
		}
		return getAutoView().addObject("tpt", tpt).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_tpt】明细页面
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
		TptPo tpt=null;
		if(StringUtil.isNotEmpty(id)){
			tpt=tptRepository.get(id);
		}
		return getAutoView().addObject("tpt", tpt).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_tpt】信息
	 *
	 * @param request
	 * @param response
	 * @param  tpt
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String id =  RequestUtil.getString(request, "id",null); //IS
			String tptName = RequestUtil.getString(request, "tptName"); // 名称
			//String tptbh = RequestUtil.getString(request, "tptbh"); // key
			//String tptlx	= RequestUtil.getString(request, "tptlx");   //类型
			//String descp = RequestUtil.getString(request, "descp"); // description
			String json = RequestUtil.getString(request,"json");    //json串
			//String istemplate = RequestUtil.getString(request, "istemplate");
			if(StringUtil.isEmpty(id)){
				TptPo tptPo = new TptPo();
				tptPo.setId(id);
				//tptPo.setTptbh(tptbh);
				tptPo.setTptName(tptName);
				//tptPo.setTptlx(tptlx);
				tptPo.setJson(json);
				//tptPo.setIstemplate(istemplate);
				Tpt tpt =tptRepository.newInstance(tptPo);
				tpt.create();
			}else{
				TptPo tptPo=tptRepository.get(id);			
				tptPo.setTptName(tptName);			
				tptPo.setJson(json);
				
				Tpt tpt =tptRepository.newInstance(tptPo);
				tpt.update();
			}
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_tpt成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_tpt操作失败,"+e.getMessage());
			logger.error("对t_tpt操作失败，" + e.getMessage(),e);
		}
		//writeResultMessage(response.getWriter(), message);
		response.getWriter().print("success");
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TptPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TptPo tptPo = getTptPo(jsonObj);

		return tptPo;
	}
	
	/** 
	 * 获取t_tpt数据
	 *
	 * @param jsonObj
	 */
	private TptPo getTptPo(JSONObject jsonObj){
		TptPo tptPo = (TptPo) JsonUtil.getDTO(jsonObj.toString(), TptPo.class);
		return tptPo;
	}
	
	
	/**
	 *  批量删除【t_tpt】记录
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
			Tpt tpt =tptRepository.newInstance();
			tpt.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_tpt成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_tpt失败，" + e.getMessage());
			logger.error("删除t_tpt失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
