
package com.lc.ibps.pg.Byyq.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.pgs.Byyq.repository.ByyqRepository;
import com.lc.ibps.pgs.Byyq.persistence.entity.ByyqPo;
import com.lc.ibps.pgs.Byyq.domain.Byyq;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_byyq 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 14:51:47
 *</pre>
 */
@Controller
@RequestMapping("/pg/Byyq/byyq/")
public class ByyqController extends GenericController{
	
	@Resource
	private ByyqRepository byyqRepository;
	
	/**
	 * 【t_byyq】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String id = RequestUtil.getString(request, "majorId");
		QueryFilter queryFilter=getQuerFilter(request);
		queryFilter.addFilter("history", "1", QueryOP.EQUAL);
		queryFilter.addFilter("pro_id",id,QueryOP.EQUAL);
		String orderBySql="num ASC";
		queryFilter.addParamsFilter("orderBySql", orderBySql);
		PageList<ByyqPo> byyqList=(PageList<ByyqPo>)byyqRepository.query(queryFilter);
		return new PageJson(byyqList);
	}
	
	
	
	@RequestMapping("list")
	public  ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String id = RequestUtil.getString(request, "majorId");
		String major = RequestUtil.getString(request, "major");
		return getAutoView().addObject("majorId", id).addObject("major", major);
	}
	
	
	
	
	
	
	
	/**
	 * 编辑【t_byyq】信息页面
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
		ByyqPo byyq=null;
		if(StringUtil.isNotEmpty(id)){
			byyq=byyqRepository.get(id);
		}
		return getAutoView().addObject("byyq", byyq).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_byyq】信息页面
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
		ByyqPo byyq=null;
		if(StringUtil.isNotEmpty(id)){
			byyq=byyqRepository.get(id);
		}
		return getAutoView().addObject("byyq", byyq).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_byyq】明细页面
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
		ByyqPo byyq=null;
		if(StringUtil.isNotEmpty(id)){
			byyq=byyqRepository.get(id);
		}
		return getAutoView().addObject("byyq", byyq).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_byyq】信息
	 *
	 * @param request
	 * @param response
	 * @param  byyq
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ByyqPo byyqPo = getFromRequest(request);
//			ByyqPo byyqPo=null;
			//构造领域对象和保存数据
			Byyq byyq =byyqRepository.newInstance(byyqPo);
			byyq.save();
			
//			String bb = byyq.getId();
//			String path = "/ibps/platform/report/raqsoft/preview2.htm";
//			request.setAttribute("cname1", "id");
//			request.setAttribute("cval1", bb);
//			request.setAttribute("reportId","403656672561594368");
//			request.getRequestDispatcher(path).forward(request,response);
			
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_byyq成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_byyq操作失败,"+e.getMessage());
			logger.error("对t_byyq操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ByyqPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ByyqPo byyqPo = getByyqPo(jsonObj);

		return byyqPo;
	}
	
	/** 
	 * 获取t_byyq数据
	 *
	 * @param jsonObj
	 */
	private ByyqPo getByyqPo(JSONObject jsonObj){
		ByyqPo byyqPo = (ByyqPo) JsonUtil.getDTO(jsonObj.toString(), ByyqPo.class);
		return byyqPo;
	}
	
	
	/**
	 *  批量删除【t_byyq】记录
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
			Byyq byyq =byyqRepository.newInstance();
			byyq.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_byyq成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_byyq失败，" + e.getMessage());
			logger.error("删除t_byyq失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
