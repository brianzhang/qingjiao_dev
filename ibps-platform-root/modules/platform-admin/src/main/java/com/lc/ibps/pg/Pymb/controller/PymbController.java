
package com.lc.ibps.pg.Pymb.controller;

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
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.pgs.Pymb.repository.PymbRepository;
import com.lc.ibps.pgs.Pymb.persistence.entity.PymbPo;
import com.lc.ibps.pgs.Pymb.domain.Pymb;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_pymb 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 15:10:25
 *</pre>
 */
@Controller
@RequestMapping("/pg/Pymb/pymb/")
public class PymbController extends GenericController{
	@Resource
	private PymbRepository pymbRepository;
	
	/**
	 * 【t_pymb】列表(分页条件查询)数据
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
		queryFilter.addFilter("pro_id", id,QueryOP.EQUAL);
		PageList<PymbPo> pymbList=(PageList<PymbPo>)pymbRepository.query(queryFilter);
		return new PageJson(pymbList);
	}
	
	
	@RequestMapping("list")
	public  ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String id = RequestUtil.getString(request, "majorId");
		return getAutoView().addObject("majorId", id);
	}
	@RequestMapping("msg")
	public  ModelAndView msg(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String id = RequestUtil.getString(request, "id");
		PymbPo po = pymbRepository.get(id);
		return getAutoView().addObject("po", po);
	}
	
	
	
	/**
	 * 编辑【t_pymb】信息页面
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
		PymbPo pymb=null;
		if(StringUtil.isNotEmpty(id)){
			pymb=pymbRepository.get(id);
		}
		return getAutoView().addObject("pymb", pymb).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_pymb】信息页面
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
		PymbPo pymb=null;
		if(StringUtil.isNotEmpty(id)){
			pymb=pymbRepository.get(id);
		}
		return getAutoView().addObject("pymb", pymb).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_pymb】明细页面
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
		PymbPo pymb=null;
		if(StringUtil.isNotEmpty(id)){
			pymb=pymbRepository.get(id);
		}
		return getAutoView().addObject("pymb", pymb).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_pymb】信息
	 *
	 * @param request
	 * @param response
	 * @param  pymb
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			PymbPo pymbPo = getFromRequest(request);
			//构造领域对象和保存数据
			Pymb pymb =pymbRepository.newInstance(pymbPo);
			pymb.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_pymb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_pymb操作失败,"+e.getMessage());
			logger.error("对t_pymb操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private PymbPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		PymbPo pymbPo = getPymbPo(jsonObj);

		return pymbPo;
	}
	
	/** 
	 * 获取t_pymb数据
	 *
	 * @param jsonObj
	 */
	private PymbPo getPymbPo(JSONObject jsonObj){
		PymbPo pymbPo = (PymbPo) JsonUtil.getDTO(jsonObj.toString(), PymbPo.class);
		return pymbPo;
	}
	
	
	/**
	 *  批量删除【t_pymb】记录
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
			Pymb pymb =pymbRepository.newInstance();
			pymb.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_pymb成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_pymb失败，" + e.getMessage());
			logger.error("删除t_pymb失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
