
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
import com.lc.ibps.loans.DaiKSSCSP.repository.ShenCRYJRepository;
import com.lc.ibps.platform.script.script.ScriptImpl;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenCRYJPo;
import com.lc.ibps.loans.DaiKSSCSP.domain.ShenCRYJ;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_scryj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:57
 *</pre>
 */
@Controller
@RequestMapping("/loanp/DaiKSSCSP/shenCRYJ/")
public class ShenCRYJController extends GenericController{
	@Resource
	ShenCRYJRepository shenCRYJRepository;
	@Resource
	XinDaiLiuChengRepository xinDaiLiuChengRepository;
	@Resource
	ScriptImpl  scriptImpl;
	
	/**
	 * 【t_scryj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ShenCRYJPo> shenCRYJList=(PageList<ShenCRYJPo>)shenCRYJRepository.query(queryFilter);
		return new PageJson(shenCRYJList);
	}
	
	/**
	 * 编辑【t_scryj】信息页面
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
		ShenCRYJPo shenCRYJ=null;
		if(StringUtil.isNotEmpty(Jdid)){
			shenCRYJ=shenCRYJRepository.getByJdid(Jdid);
		}
		if(shenCRYJ==null){
			shenCRYJ = new ShenCRYJPo();
			shenCRYJ.setJksqr(JieKuanRen);
//			shenCRYJ.setDbfs(DanBaofangShi);
//			shenCRYJ.setDklb(DaikuanFanghi);
//			shenCRYJ.setGhfs(GuihuanFanghi);
			shenCRYJ.setJdid(Jdid);
			shenCRYJ.setScrqz(zdcrqm);
		}
		return getAutoView().addObject("shenCRYJ", shenCRYJ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_scryj】信息页面
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
		ShenCRYJPo shenCRYJ=null;
		if(StringUtil.isNotEmpty(id)){
			shenCRYJ=shenCRYJRepository.get(id);
		}
		return getAutoView().addObject("shenCRYJ", shenCRYJ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_scryj】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String jdid=RequestUtil.getString(request, "jdid");
		//String Jdid = "336565123424452608";
		ShenCRYJPo shenCRYJ=null;
		shenCRYJ=shenCRYJRepository.getByJdid(jdid);
		
		return getAutoView().addObject("shenCRYJ", shenCRYJ).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_scryj】信息
	 *
	 * @param request
	 * @param response
	 * @param  shenCRYJ
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ShenCRYJPo shenCRYJPo = getFromRequest(request);
			//构造领域对象和保存数据
			ShenCRYJ shenCRYJ =shenCRYJRepository.newInstance(shenCRYJPo);
			shenCRYJ.save();
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
	private ShenCRYJPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ShenCRYJPo shenCRYJPo = getShenCRYJPo(jsonObj);

		return shenCRYJPo;
	}
	
	/** 
	 * 获取t_scryj数据
	 *
	 * @param jsonObj
	 */
	private ShenCRYJPo getShenCRYJPo(JSONObject jsonObj){
		ShenCRYJPo shenCRYJPo = (ShenCRYJPo) JsonUtil.getDTO(jsonObj.toString(), ShenCRYJPo.class);
		return shenCRYJPo;
	}
	
	
	/**
	 *  批量删除【t_scryj】记录
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
			ShenCRYJ shenCRYJ =shenCRYJRepository.newInstance();
			shenCRYJ.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
