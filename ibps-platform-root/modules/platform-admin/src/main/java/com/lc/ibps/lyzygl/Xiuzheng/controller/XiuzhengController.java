
package com.lc.ibps.lyzygl.Xiuzheng.controller;

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
import com.lc.ibps.lyzygls.Xiuzheng.repository.XiuzhengRepository;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.entity.XiuzhengPo;
import com.lc.ibps.lyzygls.Xiuzheng.domain.Xiuzheng;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 森林资源变化统计表（去年实有和修正值） 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 13:55:35
 *</pre>
 */
@Controller
@RequestMapping("/lyzygl/Xiuzheng/xiuzheng/")
public class XiuzhengController extends GenericController{
	@Resource
	private XiuzhengRepository xiuzhengRepository;
	
	/**
	 * 【森林资源变化统计表（去年实有和修正值）】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<XiuzhengPo> xiuzhengList=(PageList<XiuzhengPo>)xiuzhengRepository.query(queryFilter);
		return new PageJson(xiuzhengList);
	}
	
	/**
	 * 编辑【森林资源变化统计表（去年实有和修正值）】信息页面
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
		XiuzhengPo xiuzheng=null;
		if(StringUtil.isNotEmpty(id)){
			xiuzheng=xiuzhengRepository.get(id);
		}
		return getAutoView().addObject("xiuzheng", xiuzheng).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【森林资源变化统计表（去年实有和修正值）】信息页面
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
		XiuzhengPo xiuzheng=null;
		if(StringUtil.isNotEmpty(id)){
			xiuzheng=xiuzhengRepository.get(id);
		}
		return getAutoView().addObject("xiuzheng", xiuzheng).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【森林资源变化统计表（去年实有和修正值）】明细页面
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
		XiuzhengPo xiuzheng=null;
		if(StringUtil.isNotEmpty(id)){
			xiuzheng=xiuzhengRepository.get(id);
		}
		return getAutoView().addObject("xiuzheng", xiuzheng).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【森林资源变化统计表（去年实有和修正值）】信息
	 *
	 * @param request
	 * @param response
	 * @param  xiuzheng
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			XiuzhengPo xiuzhengPo = getFromRequest(request);
			//构造领域对象和保存数据
			Xiuzheng xiuzheng =xiuzhengRepository.newInstance(xiuzhengPo);
			xiuzheng.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存森林资源变化统计表（去年实有和修正值）成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对森林资源变化统计表（去年实有和修正值）操作失败,"+e.getMessage());
			logger.error("对森林资源变化统计表（去年实有和修正值）操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private XiuzhengPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		XiuzhengPo xiuzhengPo = getXiuzhengPo(jsonObj);

		return xiuzhengPo;
	}
	
	/** 
	 * 获取森林资源变化统计表（去年实有和修正值）数据
	 *
	 * @param jsonObj
	 */
	private XiuzhengPo getXiuzhengPo(JSONObject jsonObj){
		XiuzhengPo xiuzhengPo = (XiuzhengPo) JsonUtil.getDTO(jsonObj.toString(), XiuzhengPo.class);
		return xiuzhengPo;
	}
	
	
	/**
	 *  批量删除【森林资源变化统计表（去年实有和修正值）】记录
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
			Xiuzheng xiuzheng =xiuzhengRepository.newInstance();
			xiuzheng.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除森林资源变化统计表（去年实有和修正值）成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除森林资源变化统计表（去年实有和修正值）失败，" + e.getMessage());
			logger.error("删除森林资源变化统计表（去年实有和修正值）失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
