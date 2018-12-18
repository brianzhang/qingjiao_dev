
package com.lc.ibps.repairp.HaoCaiGuanLi.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
//import com.lc.ibps.lyzygls.YiJiDiLei1.persistence.entity.YiJiDiLei1Po;
import com.lc.ibps.repair.HaoCaiGuanLi.repository.HaoCaiGuanLiRepository;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.entity.HaoCaiGuanLiPo;
import com.lc.ibps.repair.HCPeiZhi.persistence.entity.HaoCaiPeiZhiPo;
import com.lc.ibps.repair.HCPeiZhi.repository.HaoCaiPeiZhiRepository;
import com.lc.ibps.repair.HaoCaiGuanLi.domain.HaoCaiGuanLi;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_hcglb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:41:59
 *</pre>
 */
@Controller
@RequestMapping("/repairp/HaoCaiGuanLi/haoCaiGuanLi/")
public class HaoCaiGuanLiController extends GenericController{
	@Resource
	private HaoCaiGuanLiRepository haoCaiGuanLiRepository;
	@Resource
	private HaoCaiPeiZhiRepository haoCaiPeiZhiRepository;
	
	/**
	 * 【t_hcglb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		//QueryFilter queryFilter=getQuerFilter(request);
		String V_ID=RequestUtil.getString(request, "v_id");
		System.out.println(V_ID);
		PageList<HaoCaiGuanLiPo> haoCaiGuanLiList = null;
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		if(V_ID.equals("allData") || V_ID.length() == 0){
			QueryFilter queryFilter=getQuerFilter(request);
			haoCaiGuanLiList=(PageList<HaoCaiGuanLiPo>)haoCaiGuanLiRepository.query(queryFilter);
		}else{
			String whereSql = " zhong_lei_=" +"\'"+ V_ID +"\'"; 
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			haoCaiGuanLiList = (PageList<HaoCaiGuanLiPo>)haoCaiGuanLiRepository.query(paramQueryFilter);
		}
		
		//PageList<HaoCaiGuanLiPo> haoCaiGuanLiList=(PageList<HaoCaiGuanLiPo>)haoCaiGuanLiRepository.query(queryFilter);
		return new PageJson(haoCaiGuanLiList);
	}
/**
	 * 【t_hcglb】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String v_id=RequestUtil.getString(request, "v_id");
	  /*String lbh=RequestUtil.getString(request, "lbh");
		String xbh=RequestUtil.getString(request, "xbh");
		System.out.println("feiJingYinHDList---->list:"+idd);
		System.out.println("feiJingYinHDList---->list:"+lbh);
		System.out.println("feiJingYinHDList---->list:"+xbh);*/
		List<HaoCaiPeiZhiPo> haoCaiZLData=haoCaiPeiZhiRepository.findAll();//一级地类
		return getAutoView().addObject("returnUrl", preUrl).addObject("haoCaiZLData", haoCaiZLData).addObject("v_id", v_id);
	}
	/**
	 * 编辑【t_hcglb】信息页面
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
		HaoCaiGuanLiPo haoCaiGuanLi=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiGuanLi=haoCaiGuanLiRepository.get(id);
		}
		return getAutoView().addObject("haoCaiGuanLi", haoCaiGuanLi).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_hcglb】信息页面
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
		HaoCaiGuanLiPo haoCaiGuanLi=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiGuanLi=haoCaiGuanLiRepository.get(id);
		}
		return getAutoView().addObject("haoCaiGuanLi", haoCaiGuanLi).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_hcglb】明细页面
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
		HaoCaiGuanLiPo haoCaiGuanLi=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiGuanLi=haoCaiGuanLiRepository.get(id);
		}
		return getAutoView().addObject("haoCaiGuanLi", haoCaiGuanLi).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_hcglb】信息
	 *
	 * @param request
	 * @param response
	 * @param  haoCaiGuanLi
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			HaoCaiGuanLiPo haoCaiGuanLiPo = getFromRequest(request);
			//构造领域对象和保存数据
			HaoCaiGuanLi haoCaiGuanLi =haoCaiGuanLiRepository.newInstance(haoCaiGuanLiPo);
			haoCaiGuanLi.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_hcglb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_hcglb操作失败,"+e.getMessage());
			logger.error("对t_hcglb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private HaoCaiGuanLiPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		HaoCaiGuanLiPo haoCaiGuanLiPo = getHaoCaiGuanLiPo(jsonObj);

		return haoCaiGuanLiPo;
	}
	
	/** 
	 * 获取t_hcglb数据
	 *
	 * @param jsonObj
	 */
	private HaoCaiGuanLiPo getHaoCaiGuanLiPo(JSONObject jsonObj){
		HaoCaiGuanLiPo haoCaiGuanLiPo = (HaoCaiGuanLiPo) JsonUtil.getDTO(jsonObj.toString(), HaoCaiGuanLiPo.class);
		return haoCaiGuanLiPo;
	}
	
	
	/**
	 *  批量删除【t_hcglb】记录
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
			HaoCaiGuanLi haoCaiGuanLi =haoCaiGuanLiRepository.newInstance();
			haoCaiGuanLi.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_hcglb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_hcglb失败，" + e.getMessage());
			logger.error("删除t_hcglb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
