
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
import com.lc.ibps.loans.DaiKSSCSP.repository.JingBRYJRepository;
import com.lc.ibps.platform.script.script.ScriptImpl;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.JingBRYJPo;
import com.lc.ibps.loans.DaiKSSCSP.domain.JingBRYJ;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_jbdcryj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin1996@163.com
 * 创建时间：2017-07-31 22:34:51
 *</pre>
 */
@Controller
@RequestMapping("/loanp/DaiKSSCSP/jingBRYJ/")
public class JingBRYJController extends GenericController{
	@Resource
	JingBRYJRepository jingBRYJRepository;
	@Resource
	XinDaiLiuChengRepository xinDaiLiuChengRepository;
	@Resource
	ScriptImpl  scriptImpl;
	
	/**
	 * 【t_jbdcryj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<JingBRYJPo> jingBRYJList=(PageList<JingBRYJPo>)jingBRYJRepository.query(queryFilter);
		return new PageJson(jingBRYJList);
	}
	
	/**
	 * 编辑【t_jbdcryj】信息页面
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
//		String Mc = "李敏";
		JingBRYJPo jingBRYJ=null;
		if(StringUtil.isNotEmpty(Jdid)){
			jingBRYJ=jingBRYJRepository.getByJdid(Jdid);
		}
		if(jingBRYJ==null){
			jingBRYJ=new JingBRYJPo();
			jingBRYJ.setJksqr(JieKuanRen);
			jingBRYJ.setJbrqz(zdcrqm);
			jingBRYJ.setJdid(Jdid);
		}
		return getAutoView().addObject("jingBRYJ", jingBRYJ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_jbdcryj】信息页面
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
		JingBRYJPo jingBRYJ=null;
		if(StringUtil.isNotEmpty(id)){
			jingBRYJ=jingBRYJRepository.get(id);
		}
		return getAutoView().addObject("jingBRYJ", jingBRYJ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_jbdcryj】明细页面
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
		JingBRYJPo jingBRYJ=null;
		jingBRYJ=jingBRYJRepository.getByJdid(jdid);
		
		return getAutoView().addObject("jingBRYJ", jingBRYJ).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_jbdcryj】信息
	 *
	 * @param request
	 * @param response
	 * @param  jingBRYJ
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			JingBRYJPo jingBRYJPo = getFromRequest(request);
			//构造领域对象和保存数据
			JingBRYJ jingBRYJ =jingBRYJRepository.newInstance(jingBRYJPo);
			jingBRYJ.save();
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
	private JingBRYJPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		JingBRYJPo jingBRYJPo = getJingBRYJPo(jsonObj);

		return jingBRYJPo;
	}
	
	/** 
	 * 获取t_jbdcryj数据
	 *
	 * @param jsonObj
	 */
	private JingBRYJPo getJingBRYJPo(JSONObject jsonObj){
		JingBRYJPo jingBRYJPo = (JingBRYJPo) JsonUtil.getDTO(jsonObj.toString(), JingBRYJPo.class);
		return jingBRYJPo;
	}
	
	
	/**
	 *  批量删除【t_jbdcryj】记录
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
			JingBRYJ jingBRYJ =jingBRYJRepository.newInstance();
			jingBRYJ.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除j失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
