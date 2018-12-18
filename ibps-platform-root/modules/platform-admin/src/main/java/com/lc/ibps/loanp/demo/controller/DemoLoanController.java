
package com.lc.ibps.loanp.demo.controller;

import java.io.PrintWriter;

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
import com.lc.ibps.loans.demo.repository.DemoLoanRepository;
import com.lc.ibps.loans.diyarenAll.persistence.entity.Dyr_AllPo;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.domain.XinDaiLiuCheng;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.loans.demo.persistence.entity.DemoLoanPo;
import com.lc.ibps.loans.apply.persistence.entity.ApplyMoneyPo;
import com.lc.ibps.loans.apply.repository.ApplyMoneyRepository;
import com.lc.ibps.loans.demo.domain.DemoLoan;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_demo_loan_ 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:00:46
 *</pre>
 */
@Controller
@RequestMapping("/loanp/demo/demoLoan/")
public class DemoLoanController extends GenericController{
	@Resource
	DemoLoanRepository demoLoanRepository;
	@Resource
	XinDaiLiuChengRepository xinDaiLiuChengRepository;
	@Resource
	ApplyMoneyRepository applyMoneyRepository;
	
	/**
	 * 【t_demo_loan_】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		
		String referer = request.getHeader("referer");
		String jdid = referer.split("jdid=")[1];
		
		System.out.println("**********> jdid listjson :"+jdid);
		
		PageList<XinDaiLiuChengPo> xinDaiLiuChengList=(PageList<XinDaiLiuChengPo>)xinDaiLiuChengRepository.query(queryFilter);
		PageList<XinDaiLiuChengPo> xinDaiLiuChengPoList1 = new PageList<>();
		for(XinDaiLiuChengPo  xinDaiLiuChengPo : xinDaiLiuChengList){
			             if(xinDaiLiuChengPo.getId().equals(jdid)){
			            	 xinDaiLiuChengPoList1 .add(xinDaiLiuChengPo);
			             }
		} 
		return new PageJson(xinDaiLiuChengPoList1);
	}
	
	/**
	 * 请求list界面
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{  
		String jdid=RequestUtil.getString(request, "jdid");  
		System.out.println("**********> jdid list:"+jdid); 
		XinDaiLiuChengPo xinDaiLiuCheng = xinDaiLiuChengRepository.get(jdid);
		return getAutoView().addObject("xinDaiLiuCheng", xinDaiLiuCheng).addObject("jdid", jdid);
	}
	
	
	/**
	 * 编辑【t_demo_loan_】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String jdid = RequestUtil.getString(request, "jdid");
		XinDaiLiuChengPo xinDaiLiuCheng = xinDaiLiuChengRepository.get(jdid);
		ApplyMoneyPo   applyMoney = applyMoneyRepository.get(jdid);		
		return getAutoView().addObject("applyMoney", applyMoney)
				                         .addObject("xinDaiLiuCheng", xinDaiLiuCheng)
				                         .addObject("returnUrl", preUrl)
				                         .addObject("jdid",jdid);
	}
	
	/**
	 * 编辑【t_demo_loan_】信息页面
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
		DemoLoanPo demoLoan=null;
		if(StringUtil.isNotEmpty(id)){
			demoLoan=demoLoanRepository.get(id);
		}
		return getAutoView().addObject("demoLoan", demoLoan).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_demo_loan_】明细页面
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
		DemoLoanPo demoLoan=null;
		if(StringUtil.isNotEmpty(id)){
			demoLoan=demoLoanRepository.get(id);
		}
		return getAutoView().addObject("demoLoan", demoLoan).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_demo_loan_】信息
	 *
	 * @param request
	 * @param response
	 * @param  demoLoan
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String jdid = RequestUtil.getString(request, "id");
		XinDaiLiuChengPo xinDaiLiuCheng = xinDaiLiuChengRepository.get(jdid);
		if(xinDaiLiuCheng==null){
			xinDaiLiuCheng =new XinDaiLiuChengPo();
			xinDaiLiuCheng.setId(jdid);
		}
		
		try {
//			String id = RequestUtil.getString(request, "id");
			String modelId = RequestUtil.getString(request, "modelId");
			String name = RequestUtil.getString(request, "name");			
			//构造领域对象和保存数据
			xinDaiLiuCheng.setWj(modelId);
			xinDaiLiuCheng.setCustomer(name);
			XinDaiLiuCheng xindai = xinDaiLiuChengRepository.newInstance(xinDaiLiuCheng);
			xindai.save();
			System.out.println("=============="+jdid+modelId);
			demoLoanRepository.updateByParam(modelId, jdid);		
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功"+"@"+jdid);
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
	private DemoLoanPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DemoLoanPo demoLoanPo = getDemoLoanPo(jsonObj);

		return demoLoanPo;
	}
	
	/** 
	 * 获取t_demo_loan_数据
	 *
	 * @param jsonObj
	 */
	private DemoLoanPo getDemoLoanPo(JSONObject jsonObj){
		DemoLoanPo demoLoanPo = (DemoLoanPo) JsonUtil.getDTO(jsonObj.toString(), DemoLoanPo.class);
		return demoLoanPo;
	}
	
	
	/**
	 *  批量删除【t_demo_loan_】记录
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
			DemoLoan demoLoan =demoLoanRepository.newInstance();
			demoLoan.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_demo_loan_成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_demo_loan_失败，" + e.getMessage());
			logger.error("删除t_demo_loan_失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
