
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
import com.lc.ibps.pgs.PGData.repository.QuestionareRepository;
import com.lc.ibps.pgs.PGData.persistence.entity.QuestionarePo;
import com.lc.ibps.pgs.PGData.domain.Questionare;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_dcwj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 10:38:45
 *</pre>
 */
@Controller
@RequestMapping("/pg/PGData/questionare/")
public class QuestionareController extends GenericController{
	@Resource
	private QuestionareRepository questionareRepository;
	
	/**
	 * 【t_dcwj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<QuestionarePo> questionareList=(PageList<QuestionarePo>)questionareRepository.query(queryFilter);
		return new PageJson(questionareList);
	}
	
	/**
	 * 编辑【t_dcwj】信息页面
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
		QuestionarePo questionare=null;
		if(StringUtil.isNotEmpty(id)){
			questionare=questionareRepository.get(id);
		}
		return getAutoView().addObject("questionare", questionare).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_dcwj】信息页面
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
		QuestionarePo questionare=null;
		if(StringUtil.isNotEmpty(id)){
			questionare=questionareRepository.get(id);
		}
		return getAutoView().addObject("questionare", questionare).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_dcwj】明细页面
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
		QuestionarePo questionare=null;
		if(StringUtil.isNotEmpty(id)){
			questionare=questionareRepository.get(id);
		}
		return getAutoView().addObject("questionare", questionare).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_dcwj】信息
	 *
	 * @param request
	 * @param response
	 * @param  questionare
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			QuestionarePo questionarePo = getFromRequest(request);
			//构造领域对象和保存数据
			Questionare questionare =questionareRepository.newInstance(questionarePo);
			questionare.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_dcwj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_dcwj操作失败,"+e.getMessage());
			logger.error("对t_dcwj操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private QuestionarePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		QuestionarePo questionarePo = getQuestionarePo(jsonObj);

		return questionarePo;
	}
	
	/** 
	 * 获取t_dcwj数据
	 *
	 * @param jsonObj
	 */
	private QuestionarePo getQuestionarePo(JSONObject jsonObj){
		QuestionarePo questionarePo = (QuestionarePo) JsonUtil.getDTO(jsonObj.toString(), QuestionarePo.class);
		return questionarePo;
	}
	
	
	/**
	 *  批量删除【t_dcwj】记录
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
			Questionare questionare =questionareRepository.newInstance();
			questionare.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_dcwj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_dcwj失败，" + e.getMessage());
			logger.error("删除t_dcwj失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
