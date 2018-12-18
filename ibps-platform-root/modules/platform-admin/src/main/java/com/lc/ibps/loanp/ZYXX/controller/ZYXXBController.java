
package com.lc.ibps.loanp.ZYXX.controller;

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
import com.lc.ibps.loans.ZYXX.repository.ZYXXBRepository;
import com.lc.ibps.loans.ZYXX.persistence.entity.ZYXXBPo;
import com.lc.ibps.loans.ZYXX.domain.ZYXXB;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_zyxxb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:55:18
 *</pre>
 */
@Controller
@RequestMapping("/loanp/ZYXX/zYXXB/")
public class ZYXXBController extends GenericController{
	@Resource
	ZYXXBRepository zYXXBRepository;
	
	/**
	 * 【t_zyxxb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("zYXXB---->listJson:sfid:"+sfid);
		PageList<ZYXXBPo> zYXXBList=(PageList<ZYXXBPo>)zYXXBRepository.query(queryFilter);
		PageList<ZYXXBPo> zYXXBList1 = new PageList<>();
		for(ZYXXBPo zYXXBPo : zYXXBList){
			             if(zYXXBPo.getId().equals(sfid)){
			            	 zYXXBList1.add(zYXXBPo);
			             }
		} 
		return new PageJson(zYXXBList1);
	}
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		ZYXXBPo zYXXB=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("zYXXB---->list:sfid:"+sfid);
		
		return getAutoView().addObject("zYXXB", zYXXB).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	/**
	 * 编辑【t_zyxxb】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("gRJKSQ---->get:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		ZYXXBPo zYXXB=null;
		if(StringUtil.isNotEmpty(id)){
			zYXXB=zYXXBRepository.get(id);
		}
		return getAutoView().addObject("zYXXB", zYXXB).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/**
	 * 编辑【t_zyxxb】信息页面
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
		ZYXXBPo zYXXB=null;
		if(StringUtil.isNotEmpty(id)){
			zYXXB=zYXXBRepository.get(id);
		}
		return getAutoView().addObject("zYXXB", zYXXB).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_zyxxb】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("zYXXB---->get:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		ZYXXBPo zYXXB=null;
		if(StringUtil.isNotEmpty(id)){
			zYXXB=zYXXBRepository.get(id);
		}
		return getAutoView().addObject("zYXXB", zYXXB).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/** 
	 * 保存【t_zyxxb】信息
	 *
	 * @param request
	 * @param response
	 * @param  zYXXB
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("zYXXB---->save:sfid:"+sfid);
		try {
			ZYXXBPo zYXXBPo = getFromRequest(request);
			zYXXBPo.setId(sfid);
			//构造领域对象和保存数据
			ZYXXB zYXXB =zYXXBRepository.newInstance(zYXXBPo);
			zYXXB.save();
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
	private ZYXXBPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ZYXXBPo zYXXBPo = getZYXXBPo(jsonObj);

		return zYXXBPo;
	}
	
	/** 
	 * 获取t_zyxxb数据
	 *
	 * @param jsonObj
	 */
	private ZYXXBPo getZYXXBPo(JSONObject jsonObj){
		ZYXXBPo zYXXBPo = (ZYXXBPo) JsonUtil.getDTO(jsonObj.toString(), ZYXXBPo.class);
		return zYXXBPo;
	}
	
	
	/**
	 *  批量删除【t_zyxxb】记录
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
			ZYXXB zYXXB =zYXXBRepository.newInstance();
			zYXXB.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
