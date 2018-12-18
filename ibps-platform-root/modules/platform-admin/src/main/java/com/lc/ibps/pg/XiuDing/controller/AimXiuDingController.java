
package com.lc.ibps.pg.XiuDing.controller;

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
import com.lc.ibps.pgs.XiuDing.repository.AimXiuDingRepository;
import com.lc.ibps.pgs.XiuDing.persistence.entity.AimXiuDingPo;
import com.lc.ibps.pgs.XiuDing.domain.AimXiuDing;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_pymbxd 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:22:10
 *</pre>
 */
@Controller
@RequestMapping("/pg/XiuDing/aimXiuDing/")
public class AimXiuDingController extends GenericController{
	@Resource
	private AimXiuDingRepository aimXiuDingRepository;
	
	/**
	 * 【t_pymbxd】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<AimXiuDingPo> aimXiuDingList=(PageList<AimXiuDingPo>)aimXiuDingRepository.query(queryFilter);
		return new PageJson(aimXiuDingList);
	}
	
	/**
	 * 编辑【t_pymbxd】信息页面
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
		AimXiuDingPo aimXiuDing=null;
		if(StringUtil.isNotEmpty(id)){
			aimXiuDing=aimXiuDingRepository.get(id);
		}
		return getAutoView().addObject("aimXiuDing", aimXiuDing).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_pymbxd】信息页面
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
		AimXiuDingPo aimXiuDing=null;
		if(StringUtil.isNotEmpty(id)){
			aimXiuDing=aimXiuDingRepository.get(id);
		}
		return getAutoView().addObject("aimXiuDing", aimXiuDing).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_pymbxd】明细页面
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
		AimXiuDingPo aimXiuDing=null;
		if(StringUtil.isNotEmpty(id)){
			aimXiuDing=aimXiuDingRepository.get(id);
		}
		return getAutoView().addObject("aimXiuDing", aimXiuDing).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_pymbxd】信息
	 *
	 * @param request
	 * @param response
	 * @param  aimXiuDing
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			AimXiuDingPo aimXiuDingPo = getFromRequest(request);
			//构造领域对象和保存数据
			AimXiuDing aimXiuDing =aimXiuDingRepository.newInstance(aimXiuDingPo);
			aimXiuDing.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_pymbxd成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_pymbxd操作失败,"+e.getMessage());
			logger.error("对t_pymbxd操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private AimXiuDingPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		AimXiuDingPo aimXiuDingPo = getAimXiuDingPo(jsonObj);

		return aimXiuDingPo;
	}
	
	/** 
	 * 获取t_pymbxd数据
	 *
	 * @param jsonObj
	 */
	private AimXiuDingPo getAimXiuDingPo(JSONObject jsonObj){
		AimXiuDingPo aimXiuDingPo = (AimXiuDingPo) JsonUtil.getDTO(jsonObj.toString(), AimXiuDingPo.class);
		return aimXiuDingPo;
	}
	
	
	/**
	 *  批量删除【t_pymbxd】记录
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
			AimXiuDing aimXiuDing =aimXiuDingRepository.newInstance();
			aimXiuDing.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_pymbxd成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_pymbxd失败，" + e.getMessage());
			logger.error("删除t_pymbxd失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
