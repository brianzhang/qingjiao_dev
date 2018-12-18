
package com.lc.ibps.pg.PGData.controller;

import java.util.Map;

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
import com.lc.ibps.grads.course.domain.JobStd;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.pgs.PGData.repository.TargetDataSourceRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

import ex.scala.utils4j.ExMap;

import com.lc.ibps.pgs.PGData.persistence.entity.TargetDataSourcePo;
import com.lc.ibps.pgs.PGData.domain.TargetDataSource;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_pymbhlxpjsjly 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:16:11
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/targetDataSource/")
public class TargetDataSourceController extends GenericController{
	@Resource
	private TargetDataSourceRepository targetDataSourceRepository;
	
	/**
	 * 【t_p_pymbhlxpjsjly】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<TargetDataSourcePo> targetDataSourceList=(PageList<TargetDataSourcePo>)targetDataSourceRepository.query(queryFilter);
		return new PageJson(targetDataSourceList);
	}
	
	/**
	 * 编辑【t_p_pymbhlxpjsjly】信息页面
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
		TargetDataSourcePo targetDataSource=null;
		if(StringUtil.isNotEmpty(id)){
			targetDataSource=targetDataSourceRepository.get(id);
		}
		return getAutoView().addObject("targetDataSource", targetDataSource).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_pymbhlxpjsjly】信息页面
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
		TargetDataSourcePo targetDataSource=null;
		if(StringUtil.isNotEmpty(id)){
			targetDataSource=targetDataSourceRepository.get(id);
		}
		return getAutoView().addObject("targetDataSource", targetDataSource).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_pymbhlxpjsjly】明细页面
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
		TargetDataSourcePo targetDataSource=null;
		if(StringUtil.isNotEmpty(id)){
			targetDataSource=targetDataSourceRepository.get(id);
		}
		return getAutoView().addObject("targetDataSource", targetDataSource).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_pymbhlxpjsjly】信息
	 *
	 * @param request
	 * @param response
	 * @param  targetDataSource
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			TargetDataSourcePo targetDataSourcePo = getFromRequest(request);
			//构造领域对象和保存数据
			TargetDataSource targetDataSource =targetDataSourceRepository.newInstance(targetDataSourcePo);
			targetDataSource.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_pymbhlxpjsjly成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_pymbhlxpjsjly操作失败,"+e.getMessage());
			logger.error("对t_p_pymbhlxpjsjly操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TargetDataSourcePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TargetDataSourcePo targetDataSourcePo = getTargetDataSourcePo(jsonObj);

		return targetDataSourcePo;
	}
	
	/** 
	 * 获取t_p_pymbhlxpjsjly数据
	 *
	 * @param jsonObj
	 */
	private TargetDataSourcePo getTargetDataSourcePo(JSONObject jsonObj){
		TargetDataSourcePo targetDataSourcePo = (TargetDataSourcePo) JsonUtil.getDTO(jsonObj.toString(), TargetDataSourcePo.class);
		return targetDataSourcePo;
	}
	
	
	/**
	 *  批量删除【t_p_pymbhlxpjsjly】记录
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
			TargetDataSource targetDataSource =targetDataSourceRepository.newInstance();
			targetDataSource.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_pymbhlxpjsjly成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_pymbhlxpjsjly失败，" + e.getMessage());
			logger.error("删除t_p_pymbhlxpjsjly失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	@RequestMapping("targetdata")
	public void targetdata (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id= RequestUtil.getString(request, "id");
		TargetDataSourcePo TargetDataSourcePo = targetDataSourceRepository.get(id);
	    String json_="";
	    JSONObject json = new JSONObject();
	    if(TargetDataSourcePo!=null){
	    	json_=TargetDataSourcePo.getJson();
	    	if(json_!=null)
	    	json_ = new String (json_.getBytes("ISO8859-1"),"utf-8").trim();
	    	else if(json_==null||json_.isEmpty()) {
	    		JSONObject obj = new JSONObject();
	    		json_=obj.toString();
	    	}
	    		
	    
	    	json=JSONObject.fromObject(json_);
	      	
	    } 
	    response.getWriter().print(json); 
	}
	
	
	@RequestMapping("targetgrad")
	public void targetgrad (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id= RequestUtil.getString(request, "id");
		String json= RequestUtil.getString(request, "json");
		TargetDataSourcePo TargetDataSourcePo = targetDataSourceRepository.get(id);
	    if(TargetDataSourcePo!=null){
	    	TargetDataSourcePo.setJson(json);	
	    	TargetDataSource TargetDataSource = targetDataSourceRepository.newInstance(TargetDataSourcePo);
	    	TargetDataSource.save();
	    } 
	}
	
}
