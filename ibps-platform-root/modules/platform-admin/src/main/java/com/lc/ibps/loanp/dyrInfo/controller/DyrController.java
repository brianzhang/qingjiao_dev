
package com.lc.ibps.loanp.dyrInfo.controller;

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
import com.lc.ibps.loans.dyrInfo.repository.DyrRepository;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;
import com.lc.ibps.loans.dyrInfo.persistence.entity.DyrPo;
import com.lc.ibps.loans.diyarenAll.persistence.entity.Dyr_AllPo;
import com.lc.ibps.loans.diyarenAll.repository.Dyr_AllRepository;
import com.lc.ibps.loans.dyrInfo.domain.Dyr;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_dyr 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:52:05
 *</pre>
 */
@Controller
@RequestMapping("/loanp/dyrInfo/dyr/")
public class DyrController extends GenericController{
	@Resource
	DyrRepository dyrRepository;
	@Resource
	Dyr_AllRepository dyr_AllPoRepository;
	
	/**
	 * 【t_dyr】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DyrPo> dyrList=(PageList<DyrPo>)dyrRepository.query(queryFilter);
		return new PageJson(dyrList);
	}
	
	/**
	 * 编辑【t_dyr】信息页面
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
	 
		DyrPo dyr=null;
		Dyr_AllPo dyr_AllPo=null;
		if(StringUtil.isNotEmpty(id)){
			dyr_AllPo=dyr_AllPoRepository.get(id);
		}
		String jdid=dyr_AllPo.getJdid();
		String dyrzjlx = dyr_AllPo.getZjlx();
		String zjhm = dyr_AllPo.getZjhm();
		String mc = dyr_AllPo.getMc();
		if(StringUtil.isNotEmpty(jdid)){
			dyr=dyrRepository.getByJdIdAndshengfenId(jdid,zjhm);
		}
		if(dyr==null){
			dyr=new DyrPo();
			dyr.setDyrzjlx(dyrzjlx);
			dyr.setDyr(mc);
			dyr.setDyrzjhm(zjhm);
		}
		
		return getAutoView().addObject("dyr", dyr).addObject("jdid", jdid).addObject("returnUrl", preUrl).addObject("jdid", jdid);
	}
	
	/**
	 * 编辑【t_dyr】信息页面
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
		DyrPo dyr=null;
		if(StringUtil.isNotEmpty(id)){
			dyr=dyrRepository.get(id);
		}
		return getAutoView().addObject("dyr", dyr).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_dyr】明细页面
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
		Dyr_AllPo dyr_AllPo=null;
		DyrPo dyr=null;
		if(StringUtil.isNotEmpty(id)){
			dyr_AllPo=dyr_AllPoRepository.get(id);
		}
		String jdid=dyr_AllPo.getJdid();
		String Zjhm=dyr_AllPo.getZjhm();
		if(StringUtil.isNotEmpty(jdid)){
			dyr=dyrRepository.getByJdIdAndshengfenId(jdid,Zjhm);
		}
		return getAutoView().addObject("dyr", dyr).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_dyr】信息
	 *
	 * @param request
	 * @param response
	 * @param  dyr
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String jdid=RequestUtil.getString(request, "jdid");
		try {
			DyrPo dyrPo = getFromRequest(request);
			//构造领域对象和保存数据
			dyrPo.setJdid(jdid);
			Dyr dyr =dyrRepository.newInstance(dyrPo);
			dyr.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功"+"@"+jdid);
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
	private DyrPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DyrPo dyrPo = getDyrPo(jsonObj);

		return dyrPo;
	}
	
	/** 
	 * 获取t_dyr数据
	 *
	 * @param jsonObj
	 */
	private DyrPo getDyrPo(JSONObject jsonObj){
		DyrPo dyrPo = (DyrPo) JsonUtil.getDTO(jsonObj.toString(), DyrPo.class);
		return dyrPo;
	}
	
	
	/**
	 *  批量删除【t_dyr】记录
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
			Dyr dyr =dyrRepository.newInstance();
			dyr.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除失败，" + e.getMessage());
			logger.error("删除失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
