
package com.lc.ibps.pg.Report.controller;

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
import com.lc.ibps.pgs.Report.repository.JxjdRepository;
import com.lc.ibps.pgs.Report.persistence.entity.JxjdPo;
import com.lc.ibps.pgs.Report.domain.Jxjd;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_bkkcjxjdb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-26 17:43:14
 *</pre>
 */
@Controller
@RequestMapping("/pg/Report/jxjd/")
public class JxjdController extends GenericController{
	@Resource
	private JxjdRepository jxjdRepository;
	
	/**
	 * 【t_bkkcjxjdb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<JxjdPo> jxjdList=(PageList<JxjdPo>)jxjdRepository.query(queryFilter);
		return new PageJson(jxjdList);
	}
	
	/**
	 * 编辑【t_bkkcjxjdb】信息页面
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
		JxjdPo jxjd=null;
		if(StringUtil.isNotEmpty(id)){
			jxjd=jxjdRepository.get(id);
		}
		return getAutoView().addObject("jxjd", jxjd).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_bkkcjxjdb】信息页面
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
		JxjdPo jxjd=null;
		if(StringUtil.isNotEmpty(id)){
			jxjd=jxjdRepository.get(id);
		}
		return getAutoView().addObject("jxjd", jxjd).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_bkkcjxjdb】明细页面
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
		JxjdPo jxjd=null;
		if(StringUtil.isNotEmpty(id)){
			jxjd=jxjdRepository.get(id);
		}
		return getAutoView().addObject("jxjd", jxjd).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_bkkcjxjdb】信息
	 *
	 * @param request
	 * @param response
	 * @param  jxjd
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			JxjdPo jxjdPo = getFromRequest(request);
			//构造领域对象和保存数据
			Jxjd jxjd =jxjdRepository.newInstance(jxjdPo);
			jxjd.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_bkkcjxjdb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_bkkcjxjdb操作失败,"+e.getMessage());
			logger.error("对t_bkkcjxjdb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private JxjdPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		JxjdPo jxjdPo = getJxjdPo(jsonObj);

		return jxjdPo;
	}
	
	/** 
	 * 获取t_bkkcjxjdb数据
	 *
	 * @param jsonObj
	 */
	private JxjdPo getJxjdPo(JSONObject jsonObj){
		JxjdPo jxjdPo = (JxjdPo) JsonUtil.getDTO(jsonObj.toString(), JxjdPo.class);
		return jxjdPo;
	}
	
	
	/**
	 *  批量删除【t_bkkcjxjdb】记录
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
			Jxjd jxjd =jxjdRepository.newInstance();
			jxjd.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_bkkcjxjdb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_bkkcjxjdb失败，" + e.getMessage());
			logger.error("删除t_bkkcjxjdb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
