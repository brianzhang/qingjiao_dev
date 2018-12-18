
package com.lc.ibps.repairp.HCPeiZhi.controller;

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
import com.lc.ibps.repair.HCPeiZhi.repository.HaoCaiPeiZhiRepository;
import com.lc.ibps.repair.HCPeiZhi.persistence.entity.HaoCaiPeiZhiPo;
import com.lc.ibps.repair.HCPeiZhi.domain.HaoCaiPeiZhi;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_hcpz 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:38:59
 *</pre>
 */
@Controller
@RequestMapping("/repairp/HCPeiZhi/haoCaiPeiZhi/")
public class HaoCaiPeiZhiController extends GenericController{
	@Resource
	private HaoCaiPeiZhiRepository haoCaiPeiZhiRepository;
	
	/**
	 * 【t_hcpz】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<HaoCaiPeiZhiPo> haoCaiPeiZhiList=(PageList<HaoCaiPeiZhiPo>)haoCaiPeiZhiRepository.query(queryFilter);
		return new PageJson(haoCaiPeiZhiList);
	}
	
	/**
	 * 编辑【t_hcpz】信息页面
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
		HaoCaiPeiZhiPo haoCaiPeiZhi=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiPeiZhi=haoCaiPeiZhiRepository.get(id);
		}
		return getAutoView().addObject("haoCaiPeiZhi", haoCaiPeiZhi).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_hcpz】信息页面
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
		HaoCaiPeiZhiPo haoCaiPeiZhi=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiPeiZhi=haoCaiPeiZhiRepository.get(id);
		}
		return getAutoView().addObject("haoCaiPeiZhi", haoCaiPeiZhi).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_hcpz】明细页面
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
		HaoCaiPeiZhiPo haoCaiPeiZhi=null;
		if(StringUtil.isNotEmpty(id)){
			haoCaiPeiZhi=haoCaiPeiZhiRepository.get(id);
		}
		return getAutoView().addObject("haoCaiPeiZhi", haoCaiPeiZhi).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_hcpz】信息
	 *
	 * @param request
	 * @param response
	 * @param  haoCaiPeiZhi
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			HaoCaiPeiZhiPo haoCaiPeiZhiPo = getFromRequest(request);
			//构造领域对象和保存数据
			HaoCaiPeiZhi haoCaiPeiZhi =haoCaiPeiZhiRepository.newInstance(haoCaiPeiZhiPo);
			haoCaiPeiZhi.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_hcpz成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_hcpz操作失败,"+e.getMessage());
			logger.error("对t_hcpz操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private HaoCaiPeiZhiPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		HaoCaiPeiZhiPo haoCaiPeiZhiPo = getHaoCaiPeiZhiPo(jsonObj);

		return haoCaiPeiZhiPo;
	}
	
	/** 
	 * 获取t_hcpz数据
	 *
	 * @param jsonObj
	 */
	private HaoCaiPeiZhiPo getHaoCaiPeiZhiPo(JSONObject jsonObj){
		HaoCaiPeiZhiPo haoCaiPeiZhiPo = (HaoCaiPeiZhiPo) JsonUtil.getDTO(jsonObj.toString(), HaoCaiPeiZhiPo.class);
		return haoCaiPeiZhiPo;
	}
	
	
	/**
	 *  批量删除【t_hcpz】记录
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
			HaoCaiPeiZhi haoCaiPeiZhi =haoCaiPeiZhiRepository.newInstance();
			haoCaiPeiZhi.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_hcpz成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_hcpz失败，" + e.getMessage());
			logger.error("删除t_hcpz失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
