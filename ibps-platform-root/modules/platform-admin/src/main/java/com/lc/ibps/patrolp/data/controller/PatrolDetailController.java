
package com.lc.ibps.patrolp.data.controller;

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
import com.lc.ibps.patrols.data.repository.PatrolDetailRepository;
import com.lc.ibps.patrols.data.persistence.entity.PatrolDetailPo;
import com.lc.ibps.patrols.data.domain.PatrolDetail;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_patrol_detail 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-01 21:22:24
 *</pre>
 */
@Controller
@RequestMapping("/patrolp/data/patrolDetail/")
public class PatrolDetailController extends GenericController{
	@Resource
	private PatrolDetailRepository patrolDetailRepository;
	
	/**
	 * 【t_patrol_detail】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<PatrolDetailPo> patrolDetailList=(PageList<PatrolDetailPo>)patrolDetailRepository.query(queryFilter);
		return new PageJson(patrolDetailList);
	}
	
	/**
	 * 编辑【t_patrol_detail】信息页面
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
		PatrolDetailPo patrolDetail=null;
		if(StringUtil.isNotEmpty(id)){
			patrolDetail=patrolDetailRepository.get(id);
		}
		return getAutoView().addObject("patrolDetail", patrolDetail).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_patrol_detail】信息页面
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
		PatrolDetailPo patrolDetail=null;
		if(StringUtil.isNotEmpty(id)){
			patrolDetail=patrolDetailRepository.get(id);
		}
		return getAutoView().addObject("patrolDetail", patrolDetail).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_patrol_detail】明细页面
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
		PatrolDetailPo patrolDetail=null;
		if(StringUtil.isNotEmpty(id)){
			patrolDetail=patrolDetailRepository.get(id);
		}
		return getAutoView().addObject("patrolDetail", patrolDetail).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_patrol_detail】信息
	 *
	 * @param request
	 * @param response
	 * @param  patrolDetail
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			PatrolDetailPo patrolDetailPo = getFromRequest(request);
			//构造领域对象和保存数据
			PatrolDetail patrolDetail =patrolDetailRepository.newInstance(patrolDetailPo);
			patrolDetail.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_patrol_detail成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_patrol_detail操作失败,"+e.getMessage());
			logger.error("对t_patrol_detail操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PatrolDetailPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		PatrolDetailPo patrolDetailPo = getPatrolDetailPo(jsonObj);

		return patrolDetailPo;
	}
	
	/** 
	 * 获取t_patrol_detail数据
	 *
	 * @param jsonObj
	 */
	private PatrolDetailPo getPatrolDetailPo(JSONObject jsonObj){
		PatrolDetailPo patrolDetailPo = (PatrolDetailPo) JsonUtil.getDTO(jsonObj.toString(), PatrolDetailPo.class);
		return patrolDetailPo;
	}
	
	
	/**
	 *  批量删除【t_patrol_detail】记录
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
			PatrolDetail patrolDetail =patrolDetailRepository.newInstance();
			patrolDetail.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_patrol_detail成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_patrol_detail失败，" + e.getMessage());
			logger.error("删除t_patrol_detail失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
