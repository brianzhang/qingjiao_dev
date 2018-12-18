/*
package com.lc.ibps.xinDai.liucheng.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import com.lc.ibps.loans.apply.persistence.entity.ApplyMoneyPo;
import com.lc.ibps.platform.script.dbOper.UserB;
import com.lc.ibps.platform.script.script.ScriptImpl;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.domain.XinDaiLiuCheng;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


*//**
 * t_xdlc 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-15 03:01:36
 *</pre>
 *//*
@Controller
@RequestMapping("/xinDai/liucheng/xinDaiLiuCheng/")
public class XinDaiLiuChengController extends GenericController{
	@Resource
	XinDaiLiuChengRepository xinDaiLiuChengRepository;
	@Resource
	ScriptImpl  scriptImpl;
	*//**
	 * 【t_xdlc】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 *//*
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<XinDaiLiuChengPo> xinDaiLiuChengList=(PageList<XinDaiLiuChengPo>)xinDaiLiuChengRepository.query(queryFilter);
		return new PageJson(xinDaiLiuChengList);
	}
	
	*//**
	 * 编辑【t_xdlc】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *//*
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");//id为jdid
		if(StringUtil.isEmpty(id)){
			String referer = request.getHeader("referer");
		     id = referer.split("jdid=")[1];
		}
		XinDaiLiuChengPo xinDaiLiuCheng=null;
		if(StringUtil.isNotEmpty(id)){
			xinDaiLiuCheng=xinDaiLiuChengRepository.get(id);
		}
		HashMap<String, String> usersMap = scriptImpl.getBmPUsers();
		 List<UserB> userBs = new ArrayList<>();
		 for(String key : usersMap.keySet()){
			  UserB b = new UserB();
			  b.setUserId(key);
			  b.setUserName(usersMap.get(key));
			  userBs.add(b);
		 }
		//JSONObject usersJson = JSONObject.fromObject(usersMap);
		return getAutoView().addObject("xinDaiLiuCheng", xinDaiLiuCheng).addObject("returnUrl", preUrl).addObject("userBs", userBs);
	}
	
	@RequestMapping("role")
	public ModelAndView role(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		if(StringUtil.isEmpty(id)){
			String referer = request.getHeader("referer");
		     id = referer.split("jdid=")[1];
		}
		XinDaiLiuChengPo xinDaiLiuCheng=null;
		if(StringUtil.isNotEmpty(id)){
			xinDaiLiuCheng=xinDaiLiuChengRepository.get(id);
		}
		return getAutoView().addObject("xinDaiLiuCheng", xinDaiLiuCheng).addObject("returnUrl", preUrl);
	}
	
	@RequestMapping("fuzhuren")
	public ModelAndView fuzhuren(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		if(StringUtil.isEmpty(id)){
			String referer = request.getHeader("referer");
		     id = referer.split("jdid=")[1];
		}
		XinDaiLiuChengPo xinDaiLiuCheng=null;
		if(StringUtil.isNotEmpty(id)){
			xinDaiLiuCheng=xinDaiLiuChengRepository.get(id);
		}
		return getAutoView().addObject("xinDaiLiuCheng", xinDaiLiuCheng).addObject("returnUrl", preUrl);
	}
	@RequestMapping("zhuren")
	public ModelAndView zhuren(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		if(StringUtil.isEmpty(id)){
			String referer = request.getHeader("referer");
		     id = referer.split("jdid=")[1];
		}
		XinDaiLiuChengPo xinDaiLiuCheng=null;
		if(StringUtil.isNotEmpty(id)){
			xinDaiLiuCheng=xinDaiLiuChengRepository.get(id);
		}
		return getAutoView().addObject("xinDaiLiuCheng", xinDaiLiuCheng).addObject("returnUrl", preUrl);
	}
	
	@RequestMapping("upload")
	public ModelAndView upload(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		XinDaiLiuChengPo xinDaiLiuCheng=null;
		if(StringUtil.isNotEmpty(id)){
			xinDaiLiuCheng=xinDaiLiuChengRepository.get(id);
		}
		return getAutoView().addObject("xinDaiLiuCheng", xinDaiLiuCheng).addObject("returnUrl", preUrl);
	}
	
	*//**
	 * 编辑【t_xdlc】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *//*
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		XinDaiLiuChengPo xinDaiLiuCheng=null;
		if(StringUtil.isNotEmpty(id)){
			xinDaiLiuCheng=xinDaiLiuChengRepository.get(id);
		}
		return getAutoView().addObject("xinDaiLiuCheng", xinDaiLiuCheng).addObject("returnUrl", preUrl);
	}
	
	*//**
	 * 【t_xdlc】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *//*
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		XinDaiLiuChengPo xinDaiLiuCheng=null;
		if(StringUtil.isNotEmpty(id)){
			xinDaiLiuCheng=xinDaiLiuChengRepository.get(id);
		}
		return getAutoView().addObject("xinDaiLiuCheng", xinDaiLiuCheng).addObject("returnUrl", preUrl);
	}
	
	*//** 
	 * 保存【t_xdlc】信息
	 *
	 * @param request
	 * @param response
	 * @param  xinDaiLiuCheng
	 * @throws Exception
	 *//*
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			XinDaiLiuChengPo xinDaiLiuChengPo = getFromRequest(request);
			//构造领域对象和保存数据
			XinDaiLiuCheng xinDaiLiuCheng =xinDaiLiuChengRepository.newInstance(xinDaiLiuChengPo);
			xinDaiLiuCheng.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_xdlc成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_xdlc操作失败,"+e.getMessage());
			logger.error("对t_xdlc操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	*//** 
	 * 获取表单数据
	 *
	 * @param request
	 *//*
	private XinDaiLiuChengPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		XinDaiLiuChengPo xinDaiLiuChengPo = getXinDaiLiuChengPo(jsonObj);

		return xinDaiLiuChengPo;
	}
	
	*//** 
	 * 获取t_xdlc数据
	 *
	 * @param jsonObj
	 *//*
	private XinDaiLiuChengPo getXinDaiLiuChengPo(JSONObject jsonObj){
		XinDaiLiuChengPo xinDaiLiuChengPo = (XinDaiLiuChengPo) JsonUtil.getDTO(jsonObj.toString(), XinDaiLiuChengPo.class);
		return xinDaiLiuChengPo;
	}
	
	
	*//**
	 *  批量删除【t_xdlc】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 *//*
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			XinDaiLiuCheng xinDaiLiuCheng =xinDaiLiuChengRepository.newInstance();
			xinDaiLiuCheng.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_xdlc成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_xdlc失败，" + e.getMessage());
			logger.error("删除t_xdlc失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
*/