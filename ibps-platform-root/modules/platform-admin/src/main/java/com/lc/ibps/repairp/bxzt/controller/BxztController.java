
package com.lc.ibps.repairp.bxzt.controller;

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
import com.lc.ibps.repair.bxzt.repository.BxztRepository;
import com.lc.ibps.repair.bxzt.persistence.entity.BxztPo;
import com.lc.ibps.repair.bxzt.domain.Bxzt;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_bxzt 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-04 16:08:49
 *</pre>
 */
@Controller
@RequestMapping("/repairp/bxzt/bxzt/")
public class BxztController extends GenericController{
	@Resource
	private BxztRepository bxztRepository;
	
	/**
	 * 【t_bxzt】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<BxztPo> bxztList=(PageList<BxztPo>)bxztRepository.query(queryFilter);
		return new PageJson(bxztList);
	}
	
	/**
	 * 编辑【t_bxzt】信息页面
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
		BxztPo bxzt=null;
		if(StringUtil.isNotEmpty(id)){
			bxzt=bxztRepository.get(id);
		}
		return getAutoView().addObject("bxzt", bxzt).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_bxzt】信息页面
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
		BxztPo bxzt=null;
		if(StringUtil.isNotEmpty(id)){
			bxzt=bxztRepository.get(id);
		}
		return getAutoView().addObject("bxzt", bxzt).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_bxzt】明细页面
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
		BxztPo bxzt=null;
		if(StringUtil.isNotEmpty(id)){
			bxzt=bxztRepository.get(id);
		}
		return getAutoView().addObject("bxzt", bxzt).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_bxzt】信息
	 *
	 * @param request
	 * @param response
	 * @param  bxzt
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			BxztPo bxztPo = getFromRequest(request);
			//构造领域对象和保存数据
			Bxzt bxzt =bxztRepository.newInstance(bxztPo);
			bxzt.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_bxzt成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_bxzt操作失败,"+e.getMessage());
			logger.error("对t_bxzt操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BxztPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BxztPo bxztPo = getBxztPo(jsonObj);

		return bxztPo;
	}
	
	/** 
	 * 获取t_bxzt数据
	 *
	 * @param jsonObj
	 */
	private BxztPo getBxztPo(JSONObject jsonObj){
		BxztPo bxztPo = (BxztPo) JsonUtil.getDTO(jsonObj.toString(), BxztPo.class);
		return bxztPo;
	}
	
	
	/**
	 *  批量删除【t_bxzt】记录
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
			Bxzt bxzt =bxztRepository.newInstance();
			bxzt.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_bxzt成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_bxzt失败，" + e.getMessage());
			logger.error("删除t_bxzt失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
