
package com.lc.ibps.pg.PGData.controller;

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
import com.lc.ibps.pgs.PGData.repository.PJObjectRepository;
import com.lc.ibps.pgs.PGData.persistence.entity.PJObjectPo;
import com.lc.ibps.pgs.PGData.domain.PJObject;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_p_pjdx 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:55:18
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/pJObject/")
public class PJObjectController extends GenericController{
	@Resource
	private PJObjectRepository pJObjectRepository;
	
	/**
	 * 【t_p_pjdx】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<PJObjectPo> pJObjectList=(PageList<PJObjectPo>)pJObjectRepository.query(queryFilter);
		return new PageJson(pJObjectList);
	}
	
	/**
	 * 编辑【t_p_pjdx】信息页面
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
		PJObjectPo pJObject=null;
		if(StringUtil.isNotEmpty(id)){
			pJObject=pJObjectRepository.get(id);
		}
		return getAutoView().addObject("pJObject", pJObject).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_p_pjdx】信息页面
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
		PJObjectPo pJObject=null;
		if(StringUtil.isNotEmpty(id)){
			pJObject=pJObjectRepository.get(id);
		}
		return getAutoView().addObject("pJObject", pJObject).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_p_pjdx】明细页面
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
		PJObjectPo pJObject=null;
		if(StringUtil.isNotEmpty(id)){
			pJObject=pJObjectRepository.get(id);
		}
		return getAutoView().addObject("pJObject", pJObject).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_p_pjdx】信息
	 *
	 * @param request
	 * @param response
	 * @param  pJObject
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			PJObjectPo pJObjectPo = getFromRequest(request);
			//构造领域对象和保存数据
			PJObject pJObject =pJObjectRepository.newInstance(pJObjectPo);
			pJObject.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_p_pjdx成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_p_pjdx操作失败,"+e.getMessage());
			logger.error("对t_p_pjdx操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PJObjectPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		PJObjectPo pJObjectPo = getPJObjectPo(jsonObj);

		return pJObjectPo;
	}
	
	/** 
	 * 获取t_p_pjdx数据
	 *
	 * @param jsonObj
	 */
	private PJObjectPo getPJObjectPo(JSONObject jsonObj){
		PJObjectPo pJObjectPo = (PJObjectPo) JsonUtil.getDTO(jsonObj.toString(), PJObjectPo.class);
		return pJObjectPo;
	}
	
	
	/**
	 *  批量删除【t_p_pjdx】记录
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
			PJObject pJObject =pJObjectRepository.newInstance();
			pJObject.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_p_pjdx成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_p_pjdx失败，" + e.getMessage());
			logger.error("删除t_p_pjdx失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
