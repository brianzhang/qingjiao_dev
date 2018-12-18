
package com.lc.ibps.repairp.bxhcb.controller;

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
import com.lc.ibps.repair.bxhcb.repository.BxhcbRepository;
import com.lc.ibps.repair.bxhcb.persistence.entity.BxhcbPo;
import com.lc.ibps.repair.bxhcb.domain.Bxhcb;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_bxhcb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-10 11:33:45
 *</pre>
 */
@Controller
@RequestMapping("/repairp/bxhcb/bxhcb/")
public class BxhcbController extends GenericController{
	@Resource
	private BxhcbRepository bxhcbRepository;
	
	/**
	 * 【t_bxhcb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BxhcbPo> bxhcbList=(PageList<BxhcbPo>)bxhcbRepository.query(queryFilter);
		return new PageJson(bxhcbList);
	}
	
	/**
	 * 编辑【t_bxhcb】信息页面
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
		BxhcbPo bxhcb=null;
		if(StringUtil.isNotEmpty(id)){
			bxhcb=bxhcbRepository.get(id);
		}
		return getAutoView().addObject("bxhcb", bxhcb).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_bxhcb】信息页面
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
		BxhcbPo bxhcb=null;
		if(StringUtil.isNotEmpty(id)){
			bxhcb=bxhcbRepository.get(id);
		}
		return getAutoView().addObject("bxhcb", bxhcb).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_bxhcb】明细页面
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
		BxhcbPo bxhcb=null;
		if(StringUtil.isNotEmpty(id)){
			bxhcb=bxhcbRepository.get(id);
		}
		return getAutoView().addObject("bxhcb", bxhcb).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_bxhcb】信息
	 *
	 * @param request
	 * @param response
	 * @param  bxhcb
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BxhcbPo bxhcbPo = getFromRequest(request);
			//构造领域对象和保存数据
			Bxhcb bxhcb =bxhcbRepository.newInstance(bxhcbPo);
			bxhcb.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_bxhcb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_bxhcb操作失败,"+e.getMessage());
			logger.error("对t_bxhcb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BxhcbPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BxhcbPo bxhcbPo = getBxhcbPo(jsonObj);

		return bxhcbPo;
	}
	
	/** 
	 * 获取t_bxhcb数据
	 *
	 * @param jsonObj
	 */
	private BxhcbPo getBxhcbPo(JSONObject jsonObj){
		BxhcbPo bxhcbPo = (BxhcbPo) JsonUtil.getDTO(jsonObj.toString(), BxhcbPo.class);
		return bxhcbPo;
	}
	
	
	/**
	 *  批量删除【t_bxhcb】记录
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
			Bxhcb bxhcb =bxhcbRepository.newInstance();
			bxhcb.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_bxhcb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_bxhcb失败，" + e.getMessage());
			logger.error("删除t_bxhcb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
