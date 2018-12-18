
package com.lc.ibps.loanp.GRJKSQSP.controller;

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
import com.lc.ibps.loans.GRJKSQSP.repository.GRJKSQRepository;
import com.lc.ibps.loans.GRJKSQSP.persistence.entity.GRJKSQPo;
import com.lc.ibps.loans.GRJKSQSP.domain.GRJKSQ;
import com.lc.ibps.loans.kehuInfo.repository.Kefuinfo_AllRepository;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.loans.kehuInfo.persistence.entity.Kefuinfo_AllPo;
import net.sf.json.JSONObject;


/**
 * t_grjksqspb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:47:43
 *</pre>
 */
@Controller
@RequestMapping("/loanp/GRJKSQSP/gRJKSQ/")
public class GRJKSQController extends GenericController{
	@Resource
	GRJKSQRepository gRJKSQRepository;
	@Resource
	Kefuinfo_AllRepository kefuinfo_AllRepository;
	/**
	 * 【t_grjksqspb】列表(分页条件查询)数据
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
		System.out.println("gRJKSQ---->listJson:sfid:"+sfid);
		PageList<GRJKSQPo> gRJKSQList=(PageList<GRJKSQPo>)gRJKSQRepository.query(queryFilter);
		
		PageList<GRJKSQPo> gRJKSQList1 = new PageList<>();
		for(GRJKSQPo gRJKSQPo : gRJKSQList){
			             if(gRJKSQPo.getId().equals(sfid)){
			            	 gRJKSQList1.add(gRJKSQPo);
			             }
		} 
		
		
		return new PageJson(gRJKSQList1);
	}
	/**
	 * 编辑【t_grjksqspb】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("gRJKSQ---->list:sfid:"+sfid);
		//GRJKSQPo gRJKSQ=null;
		return getAutoView().addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/**
	 * 编辑【t_grjksqspb】信息页面
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
		System.out.println("gRJKSQ---->edit111111111:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		GRJKSQPo gRJKSQ=null;
		if(StringUtil.isNotEmpty(id)){
			gRJKSQ=gRJKSQRepository.get(id);
//			if(gRJKSQ.getZjlb().equals("身份证")){
//				String srcId = gRJKSQ.getId().substring(6, 14);
//			     StringBuilder  res = new StringBuilder(srcId);
//			     res.insert(4, "-");
//			     res.insert(7, "-");
//			     gRJKSQ.setCsrq(res.toString());
//			}else if(gRJKSQ.getZjlb().equals("军官证")){
//				//gRJKSQ.setCsrq(gRJKSQ.getId().substring(6, 14));
//			}else if(gRJKSQ.getZjlb().equals("护照")){
//				//gRJKSQ.setCsrq(gRJKSQ.getId().substring(6, 14));
//			}
		}
		return getAutoView().addObject("gRJKSQ", gRJKSQ).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
/*	@RequestMapping("editGeR")
	public ModelAndView editGeR(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		
		String id = RequestUtil.getString(request, "id");

		Kefuinfo_AllPo kefuinfo_All=null;
		if(StringUtil.isNotEmpty(id)){
			kefuinfo_All=kefuinfo_AllRepository.get(id);
		}
		String zjhm = kefuinfo_All.getZjhm();
		GRJKSQPo gRJKSQ=null;
		if(StringUtil.isNotEmpty(zjhm)){
			gRJKSQ=gRJKSQRepository.get(zjhm);
		}
		return getAutoView().addObject("gRJKSQ", gRJKSQ).addObject("returnUrl", preUrl).addObject("sfid", zjhm);
	}*/
	/**
	 * 编辑【t_grjksqspb】信息页面
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
		GRJKSQPo gRJKSQ=null;
		if(StringUtil.isNotEmpty(id)){
			gRJKSQ=gRJKSQRepository.get(id);
		}
		return getAutoView().addObject("gRJKSQ", gRJKSQ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_grjksqspb】明细页面
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
		System.out.println("gRJKSQ---->get22222222222:sfid:"+sfid);
		String id=sfid;//RequestUtil.getString(request, "id");
		GRJKSQPo gRJKSQ=null;
		if(StringUtil.isNotEmpty(id)){
			gRJKSQ=gRJKSQRepository.get(id);
		}
		return getAutoView().addObject("gRJKSQ", gRJKSQ).addObject("returnUrl", preUrl).addObject("sfid", sfid);
	}
	
	/** 
	 * 保存【t_grjksqspb】信息
	 *
	 * @param request
	 * @param response
	 * @param  gRJKSQ
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String sfid=RequestUtil.getString(request, "sfid");
		System.out.println("gRJKSQ---->save:sfid:"+sfid);
		try {
			GRJKSQPo gRJKSQPo = getFromRequest(request);
			gRJKSQPo.setId(sfid);
			//构造领域对象和保存数据
			GRJKSQ gRJKSQ =gRJKSQRepository.newInstance(gRJKSQPo);
			gRJKSQ.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_grjksqspb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_grjksqspb操作失败,"+e.getMessage());
			logger.error("对t_grjksqspb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private GRJKSQPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		GRJKSQPo gRJKSQPo = getGRJKSQPo(jsonObj);

		return gRJKSQPo;
	}
	
	/** 
	 * 获取t_grjksqspb数据
	 *
	 * @param jsonObj
	 */
	private GRJKSQPo getGRJKSQPo(JSONObject jsonObj){
		GRJKSQPo gRJKSQPo = (GRJKSQPo) JsonUtil.getDTO(jsonObj.toString(), GRJKSQPo.class);
		return gRJKSQPo;
	}
	
	
	/**
	 *  批量删除【t_grjksqspb】记录
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
			GRJKSQ gRJKSQ =gRJKSQRepository.newInstance();
			gRJKSQ.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_grjksqspb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_grjksqspb失败，" + e.getMessage());
			logger.error("删除t_grjksqspb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
