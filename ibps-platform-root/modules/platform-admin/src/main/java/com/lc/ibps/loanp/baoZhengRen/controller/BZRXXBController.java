
package com.lc.ibps.loanp.baoZhengRen.controller;

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
import com.lc.ibps.loans.baoZhengRen.repository.BZRXXBRepository;
import com.lc.ibps.loans.bzrAll.persistence.entity.BaoZhengRenAllPo;
import com.lc.ibps.loans.bzrAll.repository.BaoZhengRenAllRepository;
import com.lc.ibps.loans.baoZhengRen.persistence.entity.BZRXXBPo;
import com.lc.ibps.loans.baoZhengRen.domain.BZRXXB;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_bzrxxb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 18:54:26
 *</pre>
 */
@Controller
@RequestMapping("/loanp/baoZhengRen/bZRXXB/")
public class BZRXXBController extends GenericController{
	@Resource
	BZRXXBRepository bZRXXBRepository;
	@Resource
	BaoZhengRenAllRepository baoZhengRenAllRepository;
	
	/**
	 * 【t_bzrxxb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BZRXXBPo> bZRXXBList=(PageList<BZRXXBPo>)bZRXXBRepository.query(queryFilter);
		return new PageJson(bZRXXBList);
	}
	
	/**
	 * 编辑【t_bzrxxb】信息页面
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
		
		BaoZhengRenAllPo baoZhengRenAll=null;
		BZRXXBPo bZRXXB=null;
		if(StringUtil.isNotEmpty(id)){
			baoZhengRenAll=baoZhengRenAllRepository.get(id);
		}
		String Jdid = baoZhengRenAll.getJdid();
		String mc = baoZhengRenAll.getMc();
		String zjlx = baoZhengRenAll.getZjlx();
		String zjhm = baoZhengRenAll.getZjhm();
		if(StringUtil.isNotEmpty(id)){
			bZRXXB=bZRXXBRepository.getByJdidAndZjhm(Jdid,zjhm);
		}
		if(bZRXXB==null){
			bZRXXB=new BZRXXBPo();
			bZRXXB.setBzrmc(mc);
			bZRXXB.setZjhm(zjhm);
			bZRXXB.setBzrzjlx(zjlx);
		}
		
		return getAutoView().addObject("bZRXXB", bZRXXB).addObject("Jdid", Jdid).addObject("returnUrl", preUrl).addObject("jdid", jdid);
	}
	
	/**
	 * 编辑【t_bzrxxb】信息页面
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
		BZRXXBPo bZRXXB=null;
		if(StringUtil.isNotEmpty(id)){
			bZRXXB=bZRXXBRepository.get(id);
		}
		return getAutoView().addObject("bZRXXB", bZRXXB).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_bzrxxb】明细页面
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
		BaoZhengRenAllPo baoZhengRenAll=null;
		BZRXXBPo bZRXXB=new BZRXXBPo();
		if(StringUtil.isNotEmpty(id)){
			baoZhengRenAll=baoZhengRenAllRepository.get(id);
		}
		String Jdid = baoZhengRenAll.getJdid();
		String zjhm = baoZhengRenAll.getZjhm();

		if(StringUtil.isNotEmpty(id)){
			bZRXXB=bZRXXBRepository.getByJdidAndZjhm(Jdid,zjhm);
		}
		return getAutoView().addObject("bZRXXB", bZRXXB).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_bzrxxb】信息
	 *
	 * @param request
	 * @param response
	 * @param  bZRXXB
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String Jdid=RequestUtil.getString(request, "Jdid");  
		try {
			BZRXXBPo bZRXXBPo = getFromRequest(request);
			//构造领域对象和保存数据
			bZRXXBPo.setJdid(Jdid);
			BZRXXB bZRXXB =bZRXXBRepository.newInstance(bZRXXBPo);
			bZRXXB.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功"+"@"+Jdid);
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
	private BZRXXBPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BZRXXBPo bZRXXBPo = getBZRXXBPo(jsonObj);

		return bZRXXBPo;
	}
	
	/** 
	 * 获取t_bzrxxb数据
	 *
	 * @param jsonObj
	 */
	private BZRXXBPo getBZRXXBPo(JSONObject jsonObj){
		BZRXXBPo bZRXXBPo = (BZRXXBPo) JsonUtil.getDTO(jsonObj.toString(), BZRXXBPo.class);
		return bZRXXBPo;
	}
	
	
	/**
	 *  批量删除【t_bzrxxb】记录
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
			BZRXXB bZRXXB =bZRXXBRepository.newInstance();
			bZRXXB.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
