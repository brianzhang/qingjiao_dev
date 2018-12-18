
package com.lc.ibps.pg.PGData.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.pgs.PGData.repository.DcwjxjRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.DcwjxjDao;
import com.lc.ibps.pgs.PGData.persistence.entity.DcwjxjPo;
import com.lc.ibps.pgs.PGData.domain.Dcwjxj;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_dcwjxj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/dcwjxj/")
public class DcwjxjController extends GenericController{
	@Resource
	private DcwjxjRepository dcwjxjRepository;
	@Resource
	PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;
	/**
	 * 【t_dcwjxj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String ques_kind = new String (request.getParameter("ques_kind").getBytes( "ISO8859-1" ), "utf-8" ).trim();
		queryFilter.addFilter("WEN_JUAN_MING_", ques_kind, QueryOP.EQUAL);
		PageList<DcwjxjPo> dcwjxjList=(PageList<DcwjxjPo>)dcwjxjRepository.query(queryFilter);
		System.out.println(dcwjxjList);
		return new PageJson(dcwjxjList);
	}
	
	@RequestMapping("listJson2")
	public @ResponseBody PageJson listJson2(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
//		String ques_kind = new String (request.getParameter("ques_kind").getBytes( "ISO8859-1" ), "utf-8" ).trim();
//		queryFilter.addFilter("WEN_JUAN_MING_", ques_kind, QueryOP.EQUAL);
		PageList<DcwjxjPo> dcwjxjList=(PageList<DcwjxjPo>)dcwjxjRepository.query(queryFilter);
//		System.out.println(dcwjxjList);
		return new PageJson(dcwjxjList);
	}
	
	/**
	 * 编辑【t_dcwjxj】信息页面
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
		DcwjxjPo dcwjxj=null;
		if(StringUtil.isNotEmpty(id)){
			dcwjxj=dcwjxjRepository.get(id);
		}
		return getAutoView().addObject("dcwjxj", dcwjxj).addObject("returnUrl", preUrl);
	}
	@RequestMapping("edit2")
	public ModelAndView edit2(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		DcwjxjPo dcwjxj=null;
		if(StringUtil.isNotEmpty(id)){
			dcwjxj=dcwjxjRepository.get(id);
		}
		return getAutoView().addObject("dcwjxj", dcwjxj).addObject("returnUrl", preUrl);
	}
	/**
	 * 编辑【t_dcwjxj】信息页面
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
		DcwjxjPo dcwjxj=null;
		if(StringUtil.isNotEmpty(id)){
			dcwjxj=dcwjxjRepository.get(id);
		}
		return getAutoView().addObject("dcwjxj", dcwjxj).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_dcwjxj】明细页面
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
		DcwjxjPo dcwjxj=null;
		if(StringUtil.isNotEmpty(id)){
			dcwjxj=dcwjxjRepository.get(id);
		}
		return getAutoView().addObject("dcwjxj", dcwjxj).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_dcwjxj】信息
	 *
	 * @param request
	 * @param response
	 * @param  dcwjxj
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			DcwjxjPo dcwjxjPo = getFromRequest(request);
			//构造领域对象和保存数据
			Dcwjxj dcwjxj =dcwjxjRepository.newInstance(dcwjxjPo);
			dcwjxj.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_dcwjxj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_dcwjxj操作失败,"+e.getMessage());
			logger.error("对t_dcwjxj操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DcwjxjPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DcwjxjPo dcwjxjPo = getDcwjxjPo(jsonObj);

		return dcwjxjPo;
	}
	
	/** 
	 * 获取t_dcwjxj数据
	 *
	 * @param jsonObj
	 */
	private DcwjxjPo getDcwjxjPo(JSONObject jsonObj){
		DcwjxjPo dcwjxjPo = (DcwjxjPo) JsonUtil.getDTO(jsonObj.toString(), DcwjxjPo.class);
		return dcwjxjPo;
	}
	
	
	/**
	 *  批量删除【t_dcwjxj】记录
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
			Dcwjxj dcwjxj =dcwjxjRepository.newInstance();
			dcwjxj.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_dcwjxj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_dcwjxj失败，" + e.getMessage());
			logger.error("删除t_dcwjxj失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("list")
	public  ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String ques_kind = RequestUtil.getString(request, "ques_kind");
		//List<WjDemoPo> wjDemoList = wjDemoRepository.getByWjtype(id);
		ques_kind = new String (ques_kind.getBytes( "ISO8859-1" ), "utf-8" ).trim();
		return getAutoView().addObject("ques_kind", ques_kind);
	}
	@RequestMapping("list2")
	public  ModelAndView list2(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String ques_kind = RequestUtil.getString(request, "ques_kind");
		//List<WjDemoPo> wjDemoList = wjDemoRepository.getByWjtype(id);
		ques_kind = new String (ques_kind.getBytes( "ISO8859-1" ), "utf-8" ).trim();
		return getAutoView().addObject("ques_kind", ques_kind);
	}
	/**
	 * 团队负责人分配学生
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("fenpei")
	public ModelAndView fenpei(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		DcwjxjPo Dcwjxj=null;
		List<PartyEmployeePo> partyEmployeePo =null;
		if(StringUtils.isNotEmpty(id)){
			Dcwjxj=dcwjxjRepository.get(id);
			String tdid=Dcwjxj.getFinaltdId();
			DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
			String whereSql="GROUP_ID_='"+tdid+"'";
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
		    partyEmployeePo=partyEmployeeRepository.query(paramQueryFilter);
		}
		return getAutoView().addObject("dcwjxj", Dcwjxj).addObject("returnUrl", preUrl).addObject("partyEmployeePo", partyEmployeePo);
	}
	/**
	 *  启动流程
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("startFlow")
	public void startFlow(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
//			String id = RequestUtil.getString(request, "id");
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			String flowKey = RequestUtil.getString(request, "flowKey");
			//构造领域对象和保存数据
			Dcwjxj dcwjxj=dcwjxjRepository.newInstance();
			dcwjxj.startFlow(flowKey,ids);
			for(String id:ids){
				UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
				//js为立题书标记位
				//js1id为任务书标记位
				String js1=urlZhiYuanPo.getJs1();
				String js1id =urlZhiYuanPo.getJs1id();
				String js2=urlZhiYuanPo.getJs2();
				if(js1==null||js1.isEmpty())
				    urlZhiYuanPo.setJs1("是");
				if(js1id==null||js1id.isEmpty())
					urlZhiYuanPo.setJs1id("是");
				if(js2==null||js2.isEmpty())
				    urlZhiYuanPo.setJs2("是");
				UrlZhiYuan urlZhiYuan2=urlZhiYuanRepository.newInstance(urlZhiYuanPo);
				urlZhiYuan2.save();
			}
			message=new ResultMessage(ResultMessage.SUCCESS, "流程启动成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "流程启动失败，" + e.getMessage());
			logger.error("流程启动失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
