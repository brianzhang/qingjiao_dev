
package com.lc.ibps.pg.PingJia.controller;

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
import com.lc.ibps.pgs.PingJia.repository.PingJiaRepository;
import com.lc.ibps.pgs.PingJia.persistence.entity.PingJiaPo;
import com.lc.ibps.pgs.PingJia.domain.PingJia;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_pymbpj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:18:49
 *</pre>
 */
@Controller
@RequestMapping("/pg/PingJia/pingJia/")
public class PingJiaController extends GenericController{
	@Resource
	private PingJiaRepository pingJiaRepository;
	
	/**
	 * 【t_pymbpj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<PingJiaPo> pingJiaList=(PageList<PingJiaPo>)pingJiaRepository.query(queryFilter);
		return new PageJson(pingJiaList);
	}
	
	/**
	 * 编辑【t_pymbpj】信息页面
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
		PingJiaPo pingJia=null;
		if(StringUtil.isNotEmpty(id)){
			pingJia=pingJiaRepository.get(id);
		}
		return getAutoView().addObject("pingJia", pingJia).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_pymbpj】信息页面
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
		PingJiaPo pingJia=null;
		if(StringUtil.isNotEmpty(id)){
			pingJia=pingJiaRepository.get(id);
		}
		return getAutoView().addObject("pingJia", pingJia).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_pymbpj】明细页面
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
		PingJiaPo pingJia=null;
		if(StringUtil.isNotEmpty(id)){
			pingJia=pingJiaRepository.get(id);
		}
		return getAutoView().addObject("pingJia", pingJia).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_pymbpj】信息
	 *
	 * @param request
	 * @param response
	 * @param  pingJia
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			PingJiaPo pingJiaPo = getFromRequest(request);
			//构造领域对象和保存数据
			PingJia pingJia =pingJiaRepository.newInstance(pingJiaPo);
			pingJia.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_pymbpj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_pymbpj操作失败,"+e.getMessage());
			logger.error("对t_pymbpj操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PingJiaPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		PingJiaPo pingJiaPo = getPingJiaPo(jsonObj);

		return pingJiaPo;
	}
	
	/** 
	 * 获取t_pymbpj数据
	 *
	 * @param jsonObj
	 */
	private PingJiaPo getPingJiaPo(JSONObject jsonObj){
		PingJiaPo pingJiaPo = (PingJiaPo) JsonUtil.getDTO(jsonObj.toString(), PingJiaPo.class);
		return pingJiaPo;
	}
	
	
	/**
	 *  批量删除【t_pymbpj】记录
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
			PingJia pingJia =pingJiaRepository.newInstance();
			pingJia.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_pymbpj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_pymbpj失败，" + e.getMessage());
			logger.error("删除t_pymbpj失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
