
package com.lc.ibps.lyzygl.Shengzhanglv.controller;

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
import com.lc.ibps.lyzygls.Shengzhanglv.repository.ShangzhanglvRepository;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.entity.ShangzhanglvPo;
import com.lc.ibps.lyzygls.Shengzhanglv.domain.Shangzhanglv;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * 该表用于生长率的设置 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:14:02
 *</pre>
 */
@Controller
@RequestMapping("/lyzygl/Shengzhanglv/shangzhanglv/")
public class ShangzhanglvController extends GenericController{
	@Resource
	private ShangzhanglvRepository shangzhanglvRepository;
	
	/**
	 * 【该表用于生长率的设置】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ShangzhanglvPo> shangzhanglvList=(PageList<ShangzhanglvPo>)shangzhanglvRepository.query(queryFilter);
		return new PageJson(shangzhanglvList);
	}
	
	/**
	 * 编辑【该表用于生长率的设置】信息页面
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
		ShangzhanglvPo shangzhanglv=null;
		if(StringUtil.isNotEmpty(id)){
			shangzhanglv=shangzhanglvRepository.get(id);
		}
		return getAutoView().addObject("shangzhanglv", shangzhanglv).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【该表用于生长率的设置】信息页面
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
		ShangzhanglvPo shangzhanglv=null;
		if(StringUtil.isNotEmpty(id)){
			shangzhanglv=shangzhanglvRepository.get(id);
		}
		return getAutoView().addObject("shangzhanglv", shangzhanglv).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【该表用于生长率的设置】明细页面
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
		ShangzhanglvPo shangzhanglv=null;
		if(StringUtil.isNotEmpty(id)){
			shangzhanglv=shangzhanglvRepository.get(id);
		}
		return getAutoView().addObject("shangzhanglv", shangzhanglv).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【该表用于生长率的设置】信息
	 *
	 * @param request
	 * @param response
	 * @param  shangzhanglv
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ShangzhanglvPo shangzhanglvPo = getFromRequest(request);
			//构造领域对象和保存数据
			Shangzhanglv shangzhanglv =shangzhanglvRepository.newInstance(shangzhanglvPo);
			shangzhanglv.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存该表用于生长率的设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对该表用于生长率的设置操作失败,"+e.getMessage());
			logger.error("对该表用于生长率的设置操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ShangzhanglvPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ShangzhanglvPo shangzhanglvPo = getShangzhanglvPo(jsonObj);

		return shangzhanglvPo;
	}
	
	/** 
	 * 获取该表用于生长率的设置数据
	 *
	 * @param jsonObj
	 */
	private ShangzhanglvPo getShangzhanglvPo(JSONObject jsonObj){
		ShangzhanglvPo shangzhanglvPo = (ShangzhanglvPo) JsonUtil.getDTO(jsonObj.toString(), ShangzhanglvPo.class);
		return shangzhanglvPo;
	}
	
	
	/**
	 *  批量删除【该表用于生长率的设置】记录
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
			Shangzhanglv shangzhanglv =shangzhanglvRepository.newInstance();
			shangzhanglv.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除该表用于生长率的设置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除该表用于生长率的设置失败，" + e.getMessage());
			logger.error("删除该表用于生长率的设置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
