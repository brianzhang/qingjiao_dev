
package com.lc.ibps.pg.PGData.controller;

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
import com.lc.ibps.pgs.PGData.repository.CrsAchieveRepository;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsAchievePo;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetDataSourcePo;
import com.lc.ibps.pgs.PGData.domain.CrsAchieve;
import com.lc.ibps.pgs.PGData.domain.TargetDataSource;
import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_kcdcdhlxpj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:09:43
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/crsAchieve/")
public class CrsAchieveController extends GenericController{
	@Resource
	private CrsAchieveRepository crsAchieveRepository;
	
	/**
	 * 【t_p_kcdcdhlxpj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<CrsAchievePo> crsAchieveList=(PageList<CrsAchievePo>)crsAchieveRepository.query(queryFilter);
		return new PageJson(crsAchieveList);
	}
	
	/**
	 * 编辑【t_p_kcdcdhlxpj】信息页面
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
		CrsAchievePo crsAchieve=null;
		if(StringUtil.isNotEmpty(id)){
			crsAchieve=crsAchieveRepository.get(id);
		}
		return getAutoView().addObject("crsAchieve", crsAchieve).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_kcdcdhlxpj】信息页面
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
		CrsAchievePo crsAchieve=null;
		if(StringUtil.isNotEmpty(id)){
			crsAchieve=crsAchieveRepository.get(id);
		}
		return getAutoView().addObject("crsAchieve", crsAchieve).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_kcdcdhlxpj】明细页面
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
		CrsAchievePo crsAchieve=null;
		if(StringUtil.isNotEmpty(id)){
			crsAchieve=crsAchieveRepository.get(id);
		}
		return getAutoView().addObject("crsAchieve", crsAchieve).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_kcdcdhlxpj】信息
	 *
	 * @param request
	 * @param response
	 * @param  crsAchieve
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			CrsAchievePo crsAchievePo = getFromRequest(request);
			//构造领域对象和保存数据
			CrsAchieve crsAchieve =crsAchieveRepository.newInstance(crsAchievePo);
			crsAchieve.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_kcdcdhlxpj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_kcdcdhlxpj操作失败,"+e.getMessage());
			logger.error("对t_p_kcdcdhlxpj操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private CrsAchievePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		CrsAchievePo crsAchievePo = getCrsAchievePo(jsonObj);

		return crsAchievePo;
	}
	
	/** 
	 * 获取t_p_kcdcdhlxpj数据
	 *
	 * @param jsonObj
	 */
	private CrsAchievePo getCrsAchievePo(JSONObject jsonObj){
		CrsAchievePo crsAchievePo = (CrsAchievePo) JsonUtil.getDTO(jsonObj.toString(), CrsAchievePo.class);
		return crsAchievePo;
	}
	
	
	/**
	 *  批量删除【t_p_kcdcdhlxpj】记录
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
			CrsAchieve crsAchieve =crsAchieveRepository.newInstance();
			crsAchieve.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_kcdcdhlxpj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_kcdcdhlxpj失败，" + e.getMessage());
			logger.error("删除t_p_kcdcdhlxpj失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	@RequestMapping("CrsAchievedata")
	public void CrsAchievedata (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id= RequestUtil.getString(request, "id");
		CrsAchievePo CrsAchievePo = crsAchieveRepository.get(id);
	    String json_="";
	    JSONObject json = new JSONObject();
	    if(CrsAchievePo!=null){
	    	json_=CrsAchievePo.getJson();
		    json_ = new String (json_.getBytes("ISO8859-1"),"utf-8").trim();
	    	if(json_==null||json_.isEmpty()) {
	    		JSONObject obj = new JSONObject();
	    		json_=obj.toString();
	    	}
	    		
	    
	    	json=JSONObject.fromObject(json_);
	      	
	    } 
	    response.getWriter().print(json); 
	}
	
	
	@RequestMapping("CrsAchievegrad")
	public void CrsAchievegrad (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id= RequestUtil.getString(request, "id");
		String json= RequestUtil.getString(request, "json");
		CrsAchievePo CrsAchievePo = crsAchieveRepository.get(id);
	    if(CrsAchievePo!=null){
	    	CrsAchievePo.setJson(json);	
	    	CrsAchieve CrsAchieve = crsAchieveRepository.newInstance(CrsAchievePo);
	    	CrsAchieve.save();
	    } 
	}	
}
