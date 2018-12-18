
package com.lc.ibps.loanp.daikuanInfo.controller;

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
import com.lc.ibps.loans.daikuanInfo.repository.DaiKuanShenQingInfoRepository;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;
import com.lc.ibps.loans.apply.persistence.entity.ApplyMoneyPo;
import com.lc.ibps.loans.apply.repository.ApplyMoneyRepository;
import com.lc.ibps.loans.daikuanInfo.domain.DaiKuanShenQingInfo;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_sxsq 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-22 00:28:41
 *</pre>
 */
@Controller
@RequestMapping("/loanp/daikuanInfo/daiKuanShenQingInfo/")
public class DaiKuanShenQingInfoController extends GenericController{
	@Resource
	DaiKuanShenQingInfoRepository daiKuanShenQingInfoRepository;
	@Resource
	ApplyMoneyRepository  applyMoneyRepository;
	
	/**
	 * 【t_sxsq】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DaiKuanShenQingInfoPo> daiKuanShenQingInfoList=(PageList<DaiKuanShenQingInfoPo>)daiKuanShenQingInfoRepository.query(queryFilter);
		return new PageJson(daiKuanShenQingInfoList);
	}
	
	/**
	 * 编辑【t_sxsq】信息页面
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
		DaiKuanShenQingInfoPo daiKuanShenQingInfo=null;
		ApplyMoneyPo applyMoney=null;
		if(StringUtil.isNotEmpty(id)){
			applyMoney=applyMoneyRepository.get(id);				
		}
		String customer = applyMoney.getCustomer();	
		String cpmc = applyMoney.getDklb();
		String jdid=applyMoney.getId();		
		if(StringUtil.isNotEmpty(jdid)){
			daiKuanShenQingInfo=daiKuanShenQingInfoRepository.getByJdId(jdid);
		}
		if(daiKuanShenQingInfo==null){
			daiKuanShenQingInfo =new DaiKuanShenQingInfoPo();
			daiKuanShenQingInfo.setKhmc(customer);
			daiKuanShenQingInfo.setCpmc(cpmc);
		}
		return getAutoView().addObject("daiKuanShenQingInfo", daiKuanShenQingInfo).addObject("jdid", jdid).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_sxsq】信息页面
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
		DaiKuanShenQingInfoPo daiKuanShenQingInfo=null;
		if(StringUtil.isNotEmpty(id)){
			daiKuanShenQingInfo=daiKuanShenQingInfoRepository.get(id);
		}
		return getAutoView().addObject("daiKuanShenQingInfo", daiKuanShenQingInfo).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_sxsq】明细页面
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
		DaiKuanShenQingInfoPo daiKuanShenQingInfo=null;
		if(StringUtil.isNotEmpty(id)){
			daiKuanShenQingInfo=daiKuanShenQingInfoRepository.get(id);
		}
		return getAutoView().addObject("daiKuanShenQingInfo", daiKuanShenQingInfo).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_sxsq】信息
	 *
	 * @param request
	 * @param response
	 * @param  daiKuanShenQingInfo
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String jdid=RequestUtil.getString(request, "jdid");
		try {
			DaiKuanShenQingInfoPo daiKuanShenQingInfoPo = getFromRequest(request);
			daiKuanShenQingInfoPo.setJdid(jdid);
			//构造领域对象和保存数据
			DaiKuanShenQingInfo daiKuanShenQingInfo =daiKuanShenQingInfoRepository.newInstance(daiKuanShenQingInfoPo);
			daiKuanShenQingInfo.save();
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
	private DaiKuanShenQingInfoPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DaiKuanShenQingInfoPo daiKuanShenQingInfoPo = getDaiKuanShenQingInfoPo(jsonObj);

		return daiKuanShenQingInfoPo;
	}
	
	/** 
	 * 获取t_sxsq数据
	 *
	 * @param jsonObj
	 */
	private DaiKuanShenQingInfoPo getDaiKuanShenQingInfoPo(JSONObject jsonObj){
		DaiKuanShenQingInfoPo daiKuanShenQingInfoPo = (DaiKuanShenQingInfoPo) JsonUtil.getDTO(jsonObj.toString(), DaiKuanShenQingInfoPo.class);
		return daiKuanShenQingInfoPo;
	}
	
	
	/**
	 *  批量删除【t_sxsq】记录
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
			DaiKuanShenQingInfo daiKuanShenQingInfo =daiKuanShenQingInfoRepository.newInstance();
			daiKuanShenQingInfo.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
