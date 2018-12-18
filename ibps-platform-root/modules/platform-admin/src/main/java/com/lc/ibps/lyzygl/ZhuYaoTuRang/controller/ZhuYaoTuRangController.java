
package com.lc.ibps.lyzygl.ZhuYaoTuRang.controller;

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
import com.lc.ibps.lyzygls.ZhuYaoTuRang.repository.ZhuYaoTuRangRepository;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.entity.ZhuYaoTuRangPo;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.domain.ZhuYaoTuRang;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_zytr 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 12:55:08
 *</pre>
 */
@Controller
@RequestMapping("/lyzygl/ZhuYaoTuRang/zhuYaoTuRang/")
public class ZhuYaoTuRangController extends GenericController{
	@Resource
	private ZhuYaoTuRangRepository zhuYaoTuRangRepository;
	
	/**
	 * 【t_zytr】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ZhuYaoTuRangPo> zhuYaoTuRangList=(PageList<ZhuYaoTuRangPo>)zhuYaoTuRangRepository.query(queryFilter);
		return new PageJson(zhuYaoTuRangList);
	}
	
	/**
	 * 编辑【t_zytr】信息页面
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
		ZhuYaoTuRangPo zhuYaoTuRang=null;
		if(StringUtil.isNotEmpty(id)){
			zhuYaoTuRang=zhuYaoTuRangRepository.get(id);
		}
		return getAutoView().addObject("zhuYaoTuRang", zhuYaoTuRang).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_zytr】信息页面
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
		ZhuYaoTuRangPo zhuYaoTuRang=null;
		if(StringUtil.isNotEmpty(id)){
			zhuYaoTuRang=zhuYaoTuRangRepository.get(id);
		}
		return getAutoView().addObject("zhuYaoTuRang", zhuYaoTuRang).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_zytr】明细页面
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
		ZhuYaoTuRangPo zhuYaoTuRang=null;
		if(StringUtil.isNotEmpty(id)){
			zhuYaoTuRang=zhuYaoTuRangRepository.get(id);
		}
		return getAutoView().addObject("zhuYaoTuRang", zhuYaoTuRang).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_zytr】信息
	 *
	 * @param request
	 * @param response
	 * @param  zhuYaoTuRang
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ZhuYaoTuRangPo zhuYaoTuRangPo = getFromRequest(request);
			//构造领域对象和保存数据
			ZhuYaoTuRang zhuYaoTuRang =zhuYaoTuRangRepository.newInstance(zhuYaoTuRangPo);
			zhuYaoTuRang.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_zytr成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_zytr操作失败,"+e.getMessage());
			logger.error("对t_zytr操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ZhuYaoTuRangPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ZhuYaoTuRangPo zhuYaoTuRangPo = getZhuYaoTuRangPo(jsonObj);

		return zhuYaoTuRangPo;
	}
	
	/** 
	 * 获取t_zytr数据
	 *
	 * @param jsonObj
	 */
	private ZhuYaoTuRangPo getZhuYaoTuRangPo(JSONObject jsonObj){
		ZhuYaoTuRangPo zhuYaoTuRangPo = (ZhuYaoTuRangPo) JsonUtil.getDTO(jsonObj.toString(), ZhuYaoTuRangPo.class);
		return zhuYaoTuRangPo;
	}
	
	
	/**
	 *  批量删除【t_zytr】记录
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
			ZhuYaoTuRang zhuYaoTuRang =zhuYaoTuRangRepository.newInstance();
			zhuYaoTuRang.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_zytr成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_zytr失败，" + e.getMessage());
			logger.error("删除t_zytr失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
