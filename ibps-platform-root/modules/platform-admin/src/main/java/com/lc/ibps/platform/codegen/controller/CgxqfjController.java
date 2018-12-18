package com.lc.ibps.platform.codegen.controller;

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
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.demo.codegen.service.CgxqfjService;
import com.lc.ibps.demo.codegen.service.CgxqfjQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;
import com.lc.ibps.base.core.util.json.JsonUtil;

import java.util.List;
import net.sf.json.JSONObject;


/**
 * 采购需求附件 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/cgxqfj/")
public class CgxqfjController extends GenericController{
	@Resource
	private CgxqfjService cgxqfjService;
	@Resource
	private CgxqfjQueryService cgxqfjQueryService;
	
	/**
	 * 【采购需求附件】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter = getQuerFilter(request);
		
		String listData = cgxqfjQueryService.query(queryFilter);
		PageList<CgxqfjPo> cgxqfjList = null;
		if(JsonUtil.isJsonObject(listData)){
			JSONObject data = JSONObject.fromObject(listData);
			List<CgxqfjPo> list = CgxqfjPo.fromJsonArrayString(data.getString("data"));
			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
			cgxqfjList = new PageList<CgxqfjPo>(list, pageResult);
		}
		
		return new PageJson(cgxqfjList);
	}
	
	/**
	 * 编辑【采购需求附件】信息页面
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
		CgxqfjPo cgxqfj=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgxqfjQueryService.get(id);
			cgxqfj = CgxqfjPo.fromJsonString(data);
		}

		return getAutoView().addObject("cgxqfj", cgxqfj).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【采购需求附件】信息页面
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
		CgxqfjPo cgxqfj=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgxqfjQueryService.get(id);
			cgxqfj = CgxqfjPo.fromJsonString(data);
		}
		return getAutoView().addObject("cgxqfj", cgxqfj).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【采购需求附件】明细页面
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
		CgxqfjPo cgxqfj=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgxqfjQueryService.get(id);
			cgxqfj = CgxqfjPo.fromJsonString(data);
		}
		return getAutoView().addObject("cgxqfj", cgxqfj).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【采购需求附件】信息
	 *
	 * @param request
	 * @param response
	 * @param  cgxqfj
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			cgxqfjService.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存采购需求附件成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对采购需求附件操作失败,"+e.getMessage());
			logger.error("对采购需求附件操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【采购需求附件】记录
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
			cgxqfjService.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除采购需求附件成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除采购需求附件失败，" + e.getMessage());
			logger.error("删除采购需求附件失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	

}