
package com.lc.ibps.pg.Zbd.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.pgs.Zbd.domain.Zbd;
import com.lc.ibps.pgs.Zbd.persistence.entity.ZbdPo;
import com.lc.ibps.pgs.Zbd.repository.ZbdRepository;

import net.sf.json.JSONObject;


/**
 * t_zbd 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 16:14:53
 *</pre>
 */
@Controller
@RequestMapping("/pg/Zbd/zbd/")
public class ZbdController extends GenericController{
	@Resource
	private ZbdRepository zbdRepository;
	
	/**
	 * 【t_zbd】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String demandId = RequestUtil.getString(request, "demandId");		
		QueryFilter queryFilter=getQuerFilter(request);
		queryFilter.addFilter("demand_id", demandId,QueryOP.EQUAL);
		queryFilter.addFilter("history", 1, QueryOP.EQUAL);
		String orderBySql=" zhi_biao_dian_id_ ASC";
		queryFilter.addParamsFilter("orderBySql", orderBySql);
		PageList<ZbdPo> zbdList=(PageList<ZbdPo>)zbdRepository.query(queryFilter);
		return new PageJson(zbdList);
	}
	
	
	@RequestMapping("list")
	public  ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String id = RequestUtil.getString(request, "id");		
		String majorId = RequestUtil.getString(request, "majorId");		
		String major = RequestUtil.getString(request, "major");		
		return getAutoView().addObject("id", id).addObject("majorId", majorId).addObject("major", major);
	}
	
	/**
	 * 编辑【t_zbd】信息页面
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
		ZbdPo zbd=null;
		if(StringUtil.isNotEmpty(id)){
			zbd=zbdRepository.get(id);
		}
		return getAutoView().addObject("zbd", zbd).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_zbd】信息页面
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
		ZbdPo zbd=null;
		if(StringUtil.isNotEmpty(id)){
			zbd=zbdRepository.get(id);
		}
		return getAutoView().addObject("zbd", zbd).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_zbd】明细页面
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
		ZbdPo zbd=null;
		if(StringUtil.isNotEmpty(id)){
			zbd=zbdRepository.get(id);
		}
		return getAutoView().addObject("zbd", zbd).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_zbd】信息
	 *
	 * @param request
	 * @param response
	 * @param  zbd
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ZbdPo zbdPo = getFromRequest(request);
			//构造领域对象和保存数据
			Zbd zbd =zbdRepository.newInstance(zbdPo);
			zbd.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_zbd成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_zbd操作失败,"+e.getMessage());
			logger.error("对t_zbd操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ZbdPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ZbdPo zbdPo = getZbdPo(jsonObj);

		return zbdPo;
	}
	
	/** 
	 * 获取t_zbd数据
	 *
	 * @param jsonObj
	 */
	private ZbdPo getZbdPo(JSONObject jsonObj){
		ZbdPo zbdPo = (ZbdPo) JsonUtil.getDTO(jsonObj.toString(), ZbdPo.class);
		return zbdPo;
	}
	
	
	/**
	 *  批量删除【t_zbd】记录
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
			Zbd zbd =zbdRepository.newInstance();
			zbd.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_zbd成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_zbd失败，" + e.getMessage());
			logger.error("删除t_zbd失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
