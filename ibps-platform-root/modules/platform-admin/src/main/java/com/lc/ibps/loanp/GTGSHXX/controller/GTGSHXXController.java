
package com.lc.ibps.loanp.GTGSHXX.controller;

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
import com.lc.ibps.loans.GTGSHXX.repository.GTGSHXXRepository;
import com.lc.ibps.loans.GTGSHXX.persistence.entity.GTGSHXXPo;
import com.lc.ibps.loans.GTGSHXX.domain.GTGSHXX;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_gtgshxxb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:47
 *</pre>
 */
@Controller
@RequestMapping("/loanp/GTGSHXX/gTGSHXX/")
public class GTGSHXXController extends GenericController{
	@Resource
	GTGSHXXRepository gTGSHXXRepository;
	
	/**
	 * 【t_gtgshxxb】列表(分页条件查询)数据
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
		System.out.println("zYXXB---->listJson:sfid:"+sfid);
		PageList<GTGSHXXPo> gTGSHXXList=(PageList<GTGSHXXPo>)gTGSHXXRepository.query(queryFilter);
		PageList<GTGSHXXPo> gTGSHXXList1 = new PageList<>();
		for(GTGSHXXPo gTGSHXXPo : gTGSHXXList){
			             if(gTGSHXXPo.getId().equals(sfid)){
			            	 gTGSHXXList1.add(gTGSHXXPo);
			             }
		} 
		return new PageJson(gTGSHXXList1);
	}
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		GTGSHXXPo gTGSHXX=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("zYXXB---->list:sfid:"+sfid);
		
		return getAutoView().addObject("gTGSHXX", gTGSHXX).addObject("returnUrl", preUrl);
	}
	/**
	 * 编辑【t_gtgshxxb】信息页面
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
		GTGSHXXPo gTGSHXX=null;
		if(StringUtil.isNotEmpty(id)){
			gTGSHXX=gTGSHXXRepository.get(id);
		}
		return getAutoView().addObject("gTGSHXX", gTGSHXX).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/**
	 * 编辑【t_gtgshxxb】信息页面
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
		GTGSHXXPo gTGSHXX=null;
		if(StringUtil.isNotEmpty(id)){
			gTGSHXX=gTGSHXXRepository.get(id);
		}
		return getAutoView().addObject("gTGSHXX", gTGSHXX).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_gtgshxxb】明细页面
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
		System.out.println("gTGSHXX---->get:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		GTGSHXXPo gTGSHXX=null;
		if(StringUtil.isNotEmpty(id)){
			gTGSHXX=gTGSHXXRepository.get(id);
		}
		return getAutoView().addObject("gTGSHXX", gTGSHXX).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/** 
	 * 保存【t_gtgshxxb】信息
	 *
	 * @param request
	 * @param response
	 * @param  gTGSHXX
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("zYXXB---->save:sfid:"+sfid);
		try {
			GTGSHXXPo gTGSHXXPo = getFromRequest(request);
			gTGSHXXPo.setId(sfid);
			//构造领域对象和保存数据
			GTGSHXX gTGSHXX =gTGSHXXRepository.newInstance(gTGSHXXPo);
			gTGSHXX.save();
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
	private GTGSHXXPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		GTGSHXXPo gTGSHXXPo = getGTGSHXXPo(jsonObj);

		return gTGSHXXPo;
	}
	
	/** 
	 * 获取t_gtgshxxb数据
	 *
	 * @param jsonObj
	 */
	private GTGSHXXPo getGTGSHXXPo(JSONObject jsonObj){
		GTGSHXXPo gTGSHXXPo = (GTGSHXXPo) JsonUtil.getDTO(jsonObj.toString(), GTGSHXXPo.class);
		return gTGSHXXPo;
	}
	
	
	/**
	 *  批量删除【t_gtgshxxb】记录
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
			GTGSHXX gTGSHXX =gTGSHXXRepository.newInstance();
			gTGSHXX.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
