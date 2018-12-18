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
import com.lc.ibps.demo.codegen.service.Cgqd1Service;
import com.lc.ibps.demo.codegen.service.Cgqd1QueryService;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;
import com.lc.ibps.base.core.util.json.JsonUtil;

import java.util.List;
import net.sf.json.JSONObject;


/**
 * 采购需求表示：1，采购清单：2；1对多关系 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/cgqd1/")
public class Cgqd1Controller extends GenericController{
	@Resource
	private Cgqd1Service cgqd1Service;
	@Resource
	private Cgqd1QueryService cgqd1QueryService;
	
	/**
	 * 【采购需求表示：1，采购清单：2；1对多关系】列表(分页条件查询)数据
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
		
		String listData = cgqd1QueryService.query(queryFilter);
		PageList<Cgqd1Po> cgqd1List = null;
		if(JsonUtil.isJsonObject(listData)){
			JSONObject data = JSONObject.fromObject(listData);
			List<Cgqd1Po> list = Cgqd1Po.fromJsonArrayString(data.getString("data"));
			PageResult pageResult = PageResult.fromJson(data.getString("pageResult"));
			cgqd1List = new PageList<Cgqd1Po>(list, pageResult);
		}
		
		return new PageJson(cgqd1List);
	}
	
	/**
	 * 编辑【采购需求表示：1，采购清单：2；1对多关系】信息页面
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
		Cgqd1Po cgqd1=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgqd1QueryService.get(id);
			cgqd1 = Cgqd1Po.fromJsonString(data);
		}

		return getAutoView().addObject("cgqd1", cgqd1).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【采购需求表示：1，采购清单：2；1对多关系】信息页面
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
		Cgqd1Po cgqd1=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgqd1QueryService.get(id);
			cgqd1 = Cgqd1Po.fromJsonString(data);
		}
		return getAutoView().addObject("cgqd1", cgqd1).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【采购需求表示：1，采购清单：2；1对多关系】明细页面
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
		Cgqd1Po cgqd1=null;
		if(StringUtil.isNotEmpty(id)){
			String data = null;
			data = cgqd1QueryService.get(id);
			cgqd1 = Cgqd1Po.fromJsonString(data);
		}
		return getAutoView().addObject("cgqd1", cgqd1).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【采购需求表示：1，采购清单：2；1对多关系】信息
	 *
	 * @param request
	 * @param response
	 * @param  cgqd1
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String json = RequestUtil.getString(request, "json");
			cgqd1Service.save(json);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存采购需求表示：1，采购清单：2；1对多关系成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对采购需求表示：1，采购清单：2；1对多关系操作失败,"+e.getMessage());
			logger.error("对采购需求表示：1，采购清单：2；1对多关系操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【采购需求表示：1，采购清单：2；1对多关系】记录
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
			cgqd1Service.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除采购需求表示：1，采购清单：2；1对多关系成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除采购需求表示：1，采购清单：2；1对多关系失败，" + e.getMessage());
			logger.error("删除采购需求表示：1，采购清单：2；1对多关系失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	

}