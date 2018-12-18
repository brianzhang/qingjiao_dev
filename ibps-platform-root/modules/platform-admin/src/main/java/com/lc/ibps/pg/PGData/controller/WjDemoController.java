
package com.lc.ibps.pg.PGData.controller;

import java.util.ArrayList;
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
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.pgs.PGData.repository.WjDemoRepository;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsDegreePo;
import com.lc.ibps.pgs.PGData.persistence.entity.WjDemoPo;
import com.lc.ibps.pgs.PGData.domain.CrsDegree;
import com.lc.ibps.pgs.PGData.domain.WjDemo;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_wjdc_test 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2018-04-18 17:28:15
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/wjDemo/")
public class WjDemoController extends GenericController{
	@Resource
	WjDemoRepository wjDemoRepository;
	
	/**
	 * 【t_p_wjdc_test】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<WjDemoPo> wjDemoList=(PageList<WjDemoPo>)wjDemoRepository.query(queryFilter);
		return new PageJson(wjDemoList);
	}
	@RequestMapping("listJson2")
	public @ResponseBody PageJson listJson2(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String ques_kind = RequestUtil.getString(request, "ques_kind");
		ques_kind = new String (ques_kind.getBytes( "ISO8859-1" ), "utf-8" ).trim();
//		String referer = request.getHeader("referer");
//		String ques_kind = referer.split("ques_kind=")[1];
		System.out.println("*****"+ques_kind);
		String whereSql ="WJTYPE='"+ques_kind+"'";
		queryFilter.addParamsFilter("whereSql", whereSql);
		PageList<WjDemoPo> wjDemoList=(PageList<WjDemoPo>)wjDemoRepository.query(queryFilter);
		return new PageJson(wjDemoList);
	}
//	
//	@RequestMapping("listCeshi")
//	public  ModelAndView listCeshi(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
//		String id = RequestUtil.getString(request, "ques_kind");
//		List<WjDemoPo> wjDemoList = wjDemoRepository.getByWjtype(id);
//		
//		return getAutoView().addObject("wjDemoList", wjDemoList);
//	}
	@RequestMapping("list2")
	public  ModelAndView list2(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String ques_kind = RequestUtil.getString(request, "ques_kind");
		//List<WjDemoPo> wjDemoList = wjDemoRepository.getByWjtype(id);
		ques_kind = new String (ques_kind.getBytes( "ISO8859-1" ), "utf-8" ).trim();
		return getAutoView().addObject("ques_kind", ques_kind);
	}
	/**
	 * 编辑【t_p_wjdc_test】信息页面
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
		WjDemoPo wjDemo=null;
		if(StringUtil.isNotEmpty(id)){
			wjDemo=wjDemoRepository.get(id);
		}
		return getAutoView().addObject("wjDemo", wjDemo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_wjdc_test】信息页面
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
		WjDemoPo wjDemo=null;
		if(StringUtil.isNotEmpty(id)){
			wjDemo=wjDemoRepository.get(id);
		}
		return getAutoView().addObject("wjDemo", wjDemo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_wjdc_test】明细页面
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
		WjDemoPo wjDemo=null;
		if(StringUtil.isNotEmpty(id)){
			wjDemo=wjDemoRepository.get(id);
		}
		return getAutoView().addObject("wjDemo", wjDemo).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_wjdc_test】信息
	 *
	 * @param request
	 * @param response
	 * @param  wjDemo
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			WjDemoPo wjDemoPo = getFromRequest(request);
			//构造领域对象和保存数据
			WjDemo wjDemo =wjDemoRepository.newInstance(wjDemoPo);
			wjDemo.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_wjdc_test成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_wjdc_test操作失败,"+e.getMessage());
			logger.error("对t_p_wjdc_test操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private WjDemoPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		WjDemoPo wjDemoPo = getWjDemoPo(jsonObj);

		return wjDemoPo;
	}
	
	/** 
	 * 获取t_p_wjdc_test数据
	 *
	 * @param jsonObj
	 */
	private WjDemoPo getWjDemoPo(JSONObject jsonObj){
		WjDemoPo wjDemoPo = (WjDemoPo) JsonUtil.getDTO(jsonObj.toString(), WjDemoPo.class);
		return wjDemoPo;
	}
	
	
	/**
	 *  批量删除【t_p_wjdc_test】记录
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
			WjDemo wjDemo =wjDemoRepository.newInstance();
			wjDemo.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_wjdc_test成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_wjdc_test失败，" + e.getMessage());
			logger.error("删除t_p_wjdc_test失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("WjDemoData")
	public void WjDemoData (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id= RequestUtil.getString(request, "id");
		WjDemoPo wjDemoPo = wjDemoRepository.get(id);
	    String json_="";
	    JSONObject json = new JSONObject();
	    if(wjDemoPo!=null){
	    	json_=wjDemoPo.getJson();
	    if(json_!=null&&!json_.isEmpty())
	    	json_ = new String(json_.getBytes("ISO8859-1"),"utf-8").trim();
	    	//System.out.println(json_);
	    if(json_==null||json_.isEmpty()) {
	    		JSONObject obj = new JSONObject(); 
	    		json_=obj.toString();
	    	}
	    		
	    
	    	json=JSONObject.fromObject(json_);
	      	
	    } 
	    response.getWriter().print(json); 
	}
	
	
	@RequestMapping("WjDemograd")
	public void WjDemograd (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id= RequestUtil.getString(request, "id");
		String json= RequestUtil.getString(request, "json");
		//TargetDataSourcePo TargetDataSourcePo = targetDataSourceRepository.get(id);
		WjDemoPo wjDemoPo = wjDemoRepository.get(id);
	    if(wjDemoPo!=null){
	    	wjDemoPo.setJson(json);	
	    	WjDemo wjDemo = wjDemoRepository.newInstance(wjDemoPo);
	    	wjDemo.save();
	    } 
	}
}
