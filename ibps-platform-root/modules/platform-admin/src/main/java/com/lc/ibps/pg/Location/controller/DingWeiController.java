
package com.lc.ibps.pg.Location.controller;

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
import com.lc.ibps.pgs.Location.repository.DingWeiRepository;
import com.lc.ibps.pgs.Location.persistence.entity.DingWeiPo;
import com.lc.ibps.pgs.Location.domain.DingWei;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_pydwb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 14:51:08
 *</pre>
 */
@Controller
@RequestMapping("/pg/Location/dingWei/")
public class DingWeiController extends GenericController{
	@Resource
	private DingWeiRepository dingWeiRepository;
	
	/**
	 * 【t_pydwb】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DingWeiPo> dingWeiList=(PageList<DingWeiPo>)dingWeiRepository.query(queryFilter);
		return new PageJson(dingWeiList);
	}
	
	/**
	 * 编辑【t_pydwb】信息页面
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
		DingWeiPo dingWei=null;
		if(StringUtil.isNotEmpty(id)){
			dingWei=dingWeiRepository.get(id);
		}
		return getAutoView().addObject("dingWei", dingWei).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_pydwb】信息页面
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
		DingWeiPo dingWei=null;
		if(StringUtil.isNotEmpty(id)){
			dingWei=dingWeiRepository.get(id);
		}
		return getAutoView().addObject("dingWei", dingWei).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_pydwb】明细页面
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
		DingWeiPo dingWei=null;
		if(StringUtil.isNotEmpty(id)){
			dingWei=dingWeiRepository.get(id);
		}
		return getAutoView().addObject("dingWei", dingWei).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_pydwb】信息
	 *
	 * @param request
	 * @param response
	 * @param  dingWei
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			DingWeiPo dingWeiPo = getFromRequest(request);
			//构造领域对象和保存数据
			DingWei dingWei =dingWeiRepository.newInstance(dingWeiPo);
			dingWei.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_pydwb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_pydwb操作失败,"+e.getMessage());
			logger.error("对t_pydwb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DingWeiPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DingWeiPo dingWeiPo = getDingWeiPo(jsonObj);

		return dingWeiPo;
	}
	
	/** 
	 * 获取t_pydwb数据
	 *
	 * @param jsonObj
	 */
	private DingWeiPo getDingWeiPo(JSONObject jsonObj){
		DingWeiPo dingWeiPo = (DingWeiPo) JsonUtil.getDTO(jsonObj.toString(), DingWeiPo.class);
		return dingWeiPo;
	}
	
	
	/**
	 *  批量删除【t_pydwb】记录
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
			DingWei dingWei =dingWeiRepository.newInstance();
			dingWei.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_pydwb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_pydwb失败，" + e.getMessage());
			logger.error("删除t_pydwb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
