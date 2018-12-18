
package com.lc.ibps.loanp.zhiyaRInfo.controller;

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
import com.lc.ibps.loans.zhiyaRInfo.repository.ZhiYaPersonRepository;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;
import com.lc.ibps.loans.zhiyarenAll.repository.ZhiYaRenAllRepository;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;
import com.lc.ibps.loans.zhiyaRInfo.domain.ZhiYaPerson;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_zyr 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-21 03:15:29
 *</pre>
 */
@Controller
@RequestMapping("/loanp/zhiyaRInfo/zhiYaPerson/")
public class ZhiYaPersonController extends GenericController{
	@Resource
	ZhiYaPersonRepository zhiYaPersonRepository;
	@Resource
	ZhiYaRenAllRepository zhiYaRenAllPoRepository;
	/**
	 * 【t_zyr】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ZhiYaPersonPo> zhiYaPersonList=(PageList<ZhiYaPersonPo>)zhiYaPersonRepository.query(queryFilter);
		return new PageJson(zhiYaPersonList);
	}
	
	/**
	 * 编辑【t_zyr】信息页面
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
		String jdid=RequestUtil.getString(request, "jdid");
		System.out.println("-------------->edit"+jdid);
		
		ZhiYaPersonPo zhiYaPerson=null;
		ZhiYaRenAllPo zhiYaRenAllPo=null;
		if(StringUtil.isNotEmpty(id)){
			zhiYaRenAllPo=zhiYaRenAllPoRepository.get(id);
		}
		System.out.println(zhiYaRenAllPo);
		String jdxxID=zhiYaRenAllPo.getJdid();
		String zjlx = zhiYaRenAllPo.getZjlx();
		String zjhm = zhiYaRenAllPo.getZjhm();
		String mc = zhiYaRenAllPo.getMc();
		if(StringUtil.isNotEmpty(jdxxID)){
			zhiYaPerson=zhiYaPersonRepository.getByJdId(jdxxID);
		}
		if(StringUtil.isNotEmpty(jdxxID)){
			zhiYaPerson=zhiYaPersonRepository.getByJdIdAndshengfenId(jdxxID,zjhm);
		}
		if(zhiYaPerson==null){
			zhiYaPerson=new ZhiYaPersonPo();
			zhiYaPerson.setZyrzjhm(zjhm);
			zhiYaPerson.setZyrzjlx(zjlx);
			zhiYaPerson.setZywsyrmc(mc);
		}
		
		return getAutoView().addObject("zhiYaPerson", zhiYaPerson).addObject("jdxxID", jdxxID).addObject("returnUrl", preUrl).addObject("jdid", jdid);
	}
	
	/**
	 * 编辑【t_zyr】信息页面
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
		
		ZhiYaPersonPo zhiYaPerson=null;
		if(StringUtil.isNotEmpty(id)){
			zhiYaPerson=zhiYaPersonRepository.get(id);
		}
		return getAutoView().addObject("zhiYaPerson", zhiYaPerson).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_zyr】明细页面
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
		ZhiYaPersonPo zhiYaPerson=null;
		ZhiYaRenAllPo zhiYaRenAllPo=null;
		if(StringUtil.isNotEmpty(id)){
			zhiYaRenAllPo=zhiYaRenAllPoRepository.get(id);
		}
		String jdxxID=zhiYaRenAllPo.getJdid();
		String Zjhm=zhiYaRenAllPo.getZjhm();
		if(StringUtil.isNotEmpty(jdxxID)){
			zhiYaPerson=zhiYaPersonRepository.getByJdIdAndshengfenId(jdxxID,Zjhm);
		}

		return getAutoView().addObject("zhiYaPerson", zhiYaPerson).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_zyr】信息
	 *
	 * @param request
	 * @param response
	 * @param  zhiYaPerson
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String jdxxID=RequestUtil.getString(request, "jdxxID");
		try {
			ZhiYaPersonPo zhiYaPersonPo = getFromRequest(request);
			zhiYaPersonPo.setJdid(jdxxID);
			//构造领域对象和保存数据
			ZhiYaPerson zhiYaPerson =zhiYaPersonRepository.newInstance(zhiYaPersonPo);
			zhiYaPerson.save();
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
	private ZhiYaPersonPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ZhiYaPersonPo zhiYaPersonPo = getZhiYaPersonPo(jsonObj);

		return zhiYaPersonPo;
	}
	
	/** 
	 * 获取t_zyr数据
	 *
	 * @param jsonObj
	 */
	private ZhiYaPersonPo getZhiYaPersonPo(JSONObject jsonObj){
		ZhiYaPersonPo zhiYaPersonPo = (ZhiYaPersonPo) JsonUtil.getDTO(jsonObj.toString(), ZhiYaPersonPo.class);
		return zhiYaPersonPo;
	}
	
	
	/**
	 *  批量删除【t_zyr】记录
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
			ZhiYaPerson zhiYaPerson =zhiYaPersonRepository.newInstance();
			zhiYaPerson.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
