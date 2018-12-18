
package com.lc.ibps.loanp.bzrAll.controller;

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
import com.lc.ibps.loans.bzrAll.repository.BaoZhengRenAllRepository;
import com.lc.ibps.loans.diyarenAll.persistence.entity.Dyr_AllPo;
import com.lc.ibps.loans.bzrAll.persistence.entity.BaoZhengRenAllPo;
import com.lc.ibps.loans.bzrAll.domain.BaoZhengRenAll;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_bzr_all 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 18:49:52
 *</pre>
 */
@Controller
@RequestMapping("/loanp/bzrAll/baoZhengRenAll/")
public class BaoZhengRenAllController extends GenericController{
	@Resource
	BaoZhengRenAllRepository baoZhengRenAllRepository;
	
	/**
	 * 【t_bzr_all】列表(分页条件查询)数据
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
		PageList<BaoZhengRenAllPo> baoZhengRenAllList=(PageList<BaoZhengRenAllPo>)baoZhengRenAllRepository.query(queryFilter);
		System.out.println(baoZhengRenAllList.size());
		PageList<BaoZhengRenAllPo> baoZhengRenAllList1 = new PageList<>();
		for(BaoZhengRenAllPo  baoZhengRenAllPo : baoZhengRenAllList){
			System.out.println(baoZhengRenAllPo.getJdid());
            if(baoZhengRenAllPo.getJdid().equals(jdid)){
            	baoZhengRenAllList1 .add(baoZhengRenAllPo);
            }
} 
		System.out.println(baoZhengRenAllList1.size());
		return new PageJson(baoZhengRenAllList1);
	}
	
	/**
	 * 请求list界面
	 * lgw
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{  
		String jdid=RequestUtil.getString(request, "jdid");  
		System.out.println("**********> jdid list:"+jdid); 
		return getAutoView().addObject("jdid", jdid);
	}
	
	/**
	 * 编辑【t_bzr_all】信息页面
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
		if(StringUtil.isNotEmpty(id)){
			baoZhengRenAll=baoZhengRenAllRepository.get(id);
		}
		return getAutoView().addObject("baoZhengRenAll", baoZhengRenAll).addObject("returnUrl", preUrl).addObject("jdid",jdid);
	}
	
	/**
	 * 编辑【t_bzr_all】信息页面
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
		BaoZhengRenAllPo baoZhengRenAll=null;
		if(StringUtil.isNotEmpty(id)){
			baoZhengRenAll=baoZhengRenAllRepository.get(id);
		}
		return getAutoView().addObject("baoZhengRenAll", baoZhengRenAll).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_bzr_all】明细页面
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
		if(StringUtil.isNotEmpty(id)){
			baoZhengRenAll=baoZhengRenAllRepository.get(id);
		}
		return getAutoView().addObject("baoZhengRenAll", baoZhengRenAll).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_bzr_all】信息
	 *
	 * @param request
	 * @param response
	 * @param  baoZhengRenAll
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String jdid = RequestUtil.getString(request, "jdid");
		System.out.println("+++++++++++++> save"+jdid);
		ResultMessage message=null;
		try {
			BaoZhengRenAllPo baoZhengRenAllPo = getFromRequest(request);
			baoZhengRenAllPo.setJdid(jdid);
			//构造领域对象和保存数据
			BaoZhengRenAll baoZhengRenAll =baoZhengRenAllRepository.newInstance(baoZhengRenAllPo);
			baoZhengRenAll.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功"+"@"+jdid);
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "l操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BaoZhengRenAllPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BaoZhengRenAllPo baoZhengRenAllPo = getBaoZhengRenAllPo(jsonObj);

		return baoZhengRenAllPo;
	}
	
	/** 
	 * 获取t_bzr_all数据
	 *
	 * @param jsonObj
	 */
	private BaoZhengRenAllPo getBaoZhengRenAllPo(JSONObject jsonObj){
		BaoZhengRenAllPo baoZhengRenAllPo = (BaoZhengRenAllPo) JsonUtil.getDTO(jsonObj.toString(), BaoZhengRenAllPo.class);
		return baoZhengRenAllPo;
	}
	
	
	/**
	 *  批量删除【t_bzr_all】记录
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
			BaoZhengRenAll baoZhengRenAll =baoZhengRenAllRepository.newInstance();
			baoZhengRenAll.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
