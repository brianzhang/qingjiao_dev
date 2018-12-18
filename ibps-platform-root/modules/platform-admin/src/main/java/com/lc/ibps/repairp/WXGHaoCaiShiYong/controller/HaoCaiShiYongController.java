
package com.lc.ibps.repairp.WXGHaoCaiShiYong.controller;

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
import com.lc.ibps.repair.WXGHaoCaiShiYong.repository.HaoCaiShiYongRepository;
import com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.entity.HaoCaiShiYongPo;
import com.lc.ibps.repair.HCPeiZhi.persistence.entity.HaoCaiPeiZhiPo;
import com.lc.ibps.repair.HCPeiZhi.repository.HaoCaiPeiZhiRepository;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.entity.HaoCaiGuanLiPo;
import com.lc.ibps.repair.WXGHaoCaiShiYong.domain.HaoCaiShiYong;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_wxghcsyb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:39:21
 *</pre>
 */
@Controller
@RequestMapping("/repairp/WXGHaoCaiShiYong/haoCaiShiYong/")
public class HaoCaiShiYongController extends GenericController{
	@Resource
	private HaoCaiShiYongRepository haoCaiShiYongRepository;
	@Resource
	private HaoCaiPeiZhiRepository haoCaiPeiZhiRepository;
	
	/**
	 * 【t_wxghcsyb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		//QueryFilter queryFilter=getQuerFilter(request);
		//PageList<HaoCaiShiYongPo> haoCaiShiYongList=(PageList<HaoCaiShiYongPo>)haoCaiShiYongRepository.query(queryFilter);
		String V_ID=RequestUtil.getString(request, "v_id");
		System.out.println(V_ID);
		PageList<HaoCaiShiYongPo> haoCaiShiYongList = null;
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		if(V_ID.equals("allData") || V_ID.length() == 0){
			QueryFilter queryFilter=getQuerFilter(request);
			haoCaiShiYongList=(PageList<HaoCaiShiYongPo>)haoCaiShiYongRepository.query(queryFilter);
		}else{
			String whereSql = " bian_hao_=" +"\'"+ V_ID +"\'"; 
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			haoCaiShiYongList = (PageList<HaoCaiShiYongPo>)haoCaiShiYongRepository.query(paramQueryFilter);
		}
		
		return new PageJson(haoCaiShiYongList);
	}
	/**
	 * 【t_wxghcsyb】信息页面
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
/*		String idd=RequestUtil.getString(request, "idd");
		String lbh=RequestUtil.getString(request, "lbh");
		String xbh=RequestUtil.getString(request, "xbh");
		System.out.println("feiJingYinHDList---->list:"+idd);
		System.out.println("feiJingYinHDList---->list:"+lbh);
		System.out.println("feiJingYinHDList---->list:"+xbh);*/
		List<HaoCaiPeiZhiPo> haoCaiZLData=haoCaiPeiZhiRepository.findAll();//
		return getAutoView().addObject("returnUrl", preUrl).addObject("haoCaiZLData", haoCaiZLData).addObject("v_id", v_id);
	}
	/**
	 * 编辑【t_wxghcsyb】信息页面
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
		HaoCaiShiYongPo haoCaiShiYong=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiShiYong=haoCaiShiYongRepository.get(id);
		}
		return getAutoView().addObject("haoCaiShiYong", haoCaiShiYong).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_wxghcsyb】信息页面
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
		HaoCaiShiYongPo haoCaiShiYong=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiShiYong=haoCaiShiYongRepository.get(id);
		}
		return getAutoView().addObject("haoCaiShiYong", haoCaiShiYong).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_wxghcsyb】明细页面
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
		HaoCaiShiYongPo haoCaiShiYong=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiShiYong=haoCaiShiYongRepository.get(id);
		}
		return getAutoView().addObject("haoCaiShiYong", haoCaiShiYong).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_wxghcsyb】信息
	 *
	 * @param request
	 * @param response
	 * @param  haoCaiShiYong
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			HaoCaiShiYongPo haoCaiShiYongPo = getFromRequest(request);
			//构造领域对象和保存数据
			HaoCaiShiYong haoCaiShiYong =haoCaiShiYongRepository.newInstance(haoCaiShiYongPo);
			haoCaiShiYong.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_wxghcsyb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_wxghcsyb操作失败,"+e.getMessage());
			logger.error("对t_wxghcsyb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private HaoCaiShiYongPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		HaoCaiShiYongPo haoCaiShiYongPo = getHaoCaiShiYongPo(jsonObj);

		return haoCaiShiYongPo;
	}
	
	/** 
	 * 获取t_wxghcsyb数据
	 *
	 * @param jsonObj
	 */
	private HaoCaiShiYongPo getHaoCaiShiYongPo(JSONObject jsonObj){
		HaoCaiShiYongPo haoCaiShiYongPo = (HaoCaiShiYongPo) JsonUtil.getDTO(jsonObj.toString(), HaoCaiShiYongPo.class);
		return haoCaiShiYongPo;
	}
	
	
	/**
	 *  批量删除【t_wxghcsyb】记录
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
			HaoCaiShiYong haoCaiShiYong =haoCaiShiYongRepository.newInstance();
			haoCaiShiYong.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_wxghcsyb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_wxghcsyb失败，" + e.getMessage());
			logger.error("删除t_wxghcsyb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
