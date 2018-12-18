
package com.lc.ibps.pg.ZFJD.controller;

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
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.pgs.ZFJD.repository.FenjiedianRepository;
import com.lc.ibps.pgs.ZFJD.persistence.entity.FenjiedianPo;
import com.lc.ibps.pgs.ZFJD.domain.Fenjiedian;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_fenjiedian 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 17:03:02
 *</pre>
 */
@Controller
@RequestMapping("/pg/ZFJD/fenjiedian/")
public class FenjiedianController extends GenericController{
	@Resource
	private FenjiedianRepository fenjiedianRepository;
	
	/**
	 * 【t_fenjiedian】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String id = RequestUtil.getString(request, "id");
		queryFilter.addFilter("pymb_id", id, QueryOP.EQUAL);
		PageList<FenjiedianPo> fenjiedianList=(PageList<FenjiedianPo>)fenjiedianRepository.query(queryFilter);
		return new PageJson(fenjiedianList);
	}
	
	@RequestMapping("list")
	public  ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String id = RequestUtil.getString(request, "id");
		return getAutoView().addObject("fenjieId", id);
	}
	
	
	/**
	 * 编辑【t_fenjiedian】信息页面
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
		FenjiedianPo fenjiedian=null;
		if(StringUtil.isNotEmpty(id)){
			fenjiedian=fenjiedianRepository.get(id);
		}
		return getAutoView().addObject("fenjiedian", fenjiedian).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_fenjiedian】信息页面
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
		FenjiedianPo fenjiedian=null;
		if(StringUtil.isNotEmpty(id)){
			fenjiedian=fenjiedianRepository.get(id);
		}
		return getAutoView().addObject("fenjiedian", fenjiedian).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_fenjiedian】明细页面
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
		FenjiedianPo fenjiedian=null;
		if(StringUtil.isNotEmpty(id)){
			fenjiedian=fenjiedianRepository.get(id);
		}
		return getAutoView().addObject("fenjiedian", fenjiedian).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_fenjiedian】信息
	 *
	 * @param request
	 * @param response
	 * @param  fenjiedian
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			FenjiedianPo fenjiedianPo = getFromRequest(request);
			//构造领域对象和保存数据
			Fenjiedian fenjiedian =fenjiedianRepository.newInstance(fenjiedianPo);
			fenjiedian.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_fenjiedian成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_fenjiedian操作失败,"+e.getMessage());
			logger.error("对t_fenjiedian操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private FenjiedianPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		FenjiedianPo fenjiedianPo = getFenjiedianPo(jsonObj);

		return fenjiedianPo;
	}
	
	/** 
	 * 获取t_fenjiedian数据
	 *
	 * @param jsonObj
	 */
	private FenjiedianPo getFenjiedianPo(JSONObject jsonObj){
		FenjiedianPo fenjiedianPo = (FenjiedianPo) JsonUtil.getDTO(jsonObj.toString(), FenjiedianPo.class);
		return fenjiedianPo;
	}
	
	
	/**
	 *  批量删除【t_fenjiedian】记录
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
			Fenjiedian fenjiedian =fenjiedianRepository.newInstance();
			fenjiedian.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_fenjiedian成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_fenjiedian失败，" + e.getMessage());
			logger.error("删除t_fenjiedian失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
