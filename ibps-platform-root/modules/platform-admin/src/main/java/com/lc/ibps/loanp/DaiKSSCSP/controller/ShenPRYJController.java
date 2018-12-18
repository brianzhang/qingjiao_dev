
package com.lc.ibps.loanp.DaiKSSCSP.controller;

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
import com.lc.ibps.loans.DaiKSSCSP.repository.ShenPRYJRepository;
import com.lc.ibps.platform.script.script.ScriptImpl;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenPRYJPo;
import com.lc.ibps.loans.DaiKSSCSP.domain.ShenPRYJ;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_spryj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:35:04
 *</pre>
 */
@Controller
@RequestMapping("/loanp/DaiKSSCSP/shenPRYJ/")
public class ShenPRYJController extends GenericController{
	@Resource
	ShenPRYJRepository shenPRYJRepository;
	@Resource
	XinDaiLiuChengRepository xinDaiLiuChengRepository;
	@Resource
	ScriptImpl  scriptImpl;
	/**
	 * 【t_spryj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ShenPRYJPo> shenPRYJList=(PageList<ShenPRYJPo>)shenPRYJRepository.query(queryFilter);
		return new PageJson(shenPRYJList);
	}
	
	/**
	 * 编辑【t_spryj】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String Jdid=RequestUtil.getString(request, "jdid");
		XinDaiLiuChengPo po =xinDaiLiuChengRepository.get(Jdid);
		String JieKuanRen = po.getCustomer();
		String zdcrqm = scriptImpl.getCurrentName();
//		String Jdid = "336565123424452608";
//		String JieKuanRen = "徐红洋";
//		String DanBaofangShi = "方式1";
//		String DaikuanFanghi = "个人";
//		String GuihuanFanghi = "现金";
//		String zdcrqm = "李敏";
//		String id=RequestUtil.getString(request, "id");
		ShenPRYJPo shenPRYJ=null;
		if(StringUtil.isNotEmpty(Jdid)){
			shenPRYJ=shenPRYJRepository.getByJdid(Jdid);
		}
		if(shenPRYJ==null){
			shenPRYJ = new ShenPRYJPo();
			shenPRYJ.setJksqr(JieKuanRen);
			shenPRYJ.setJdid(Jdid);
			shenPRYJ.setSprqm(zdcrqm);
		}
		return getAutoView().addObject("shenPRYJ", shenPRYJ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_spryj】信息页面
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
		ShenPRYJPo shenPRYJ=null;
		if(StringUtil.isNotEmpty(id)){
			shenPRYJ=shenPRYJRepository.get(id);
		}
		return getAutoView().addObject("shenPRYJ", shenPRYJ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_spryj】明细页面
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
		ShenPRYJPo shenPRYJ=null;
		if(StringUtil.isNotEmpty(id)){
			shenPRYJ=shenPRYJRepository.get(id);
		}
		return getAutoView().addObject("shenPRYJ", shenPRYJ).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_spryj】信息
	 *
	 * @param request
	 * @param response
	 * @param  shenPRYJ
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ShenPRYJPo shenPRYJPo = getFromRequest(request);
			//构造领域对象和保存数据
			ShenPRYJ shenPRYJ =shenPRYJRepository.newInstance(shenPRYJPo);
			shenPRYJ.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ShenPRYJPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ShenPRYJPo shenPRYJPo = getShenPRYJPo(jsonObj);

		return shenPRYJPo;
	}
	
	/** 
	 * 获取t_spryj数据
	 *
	 * @param jsonObj
	 */
	private ShenPRYJPo getShenPRYJPo(JSONObject jsonObj){
		ShenPRYJPo shenPRYJPo = (ShenPRYJPo) JsonUtil.getDTO(jsonObj.toString(), ShenPRYJPo.class);
		return shenPRYJPo;
	}
	
	
	/**
	 *  批量删除【t_spryj】记录
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
			ShenPRYJ shenPRYJ =shenPRYJRepository.newInstance();
			shenPRYJ.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
