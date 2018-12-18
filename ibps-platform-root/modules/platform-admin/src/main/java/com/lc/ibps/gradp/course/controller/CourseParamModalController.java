
package com.lc.ibps.gradp.course.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.grads.course.domain.CourseParamModal;
import com.lc.ibps.grads.course.persistence.entity.CourseParamModalPo;
import com.lc.ibps.grads.course.persistence.entity.CourseParamPo;
import com.lc.ibps.grads.course.repository.CourseParamModalRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


/**
 * 分值模板 控制类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:43:01
 *</pre>
 */
@Controller
@RequestMapping("/gradp/course/courseParamModal/")
public class CourseParamModalController extends GenericController{
	@Resource
	CourseParamModalRepository courseParamModalRepository;
	
	/**
	 * 【分值模板】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse response) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<CourseParamModalPo> courseParamModalList=(PageList<CourseParamModalPo>)courseParamModalRepository.query(queryFilter);
		return new PageJson(courseParamModalList);
	}
	
	/**
	 * 编辑【分值模板】信息页面
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
		CourseParamModalPo courseParamModal=null;
		List courseParamPoList = new ArrayList<>();
		if(StringUtil.isNotEmpty(id)){
			courseParamModal=courseParamModalRepository.get(id);
			String jsonStr = courseParamModal.getParam();
			courseParamPoList = courseParamModalRepository.parseJson(jsonStr);
		}
		
		List weekList = new ArrayList<String>();
		List dayList = new ArrayList<String>();
		for(int i = 1 ; i <= 20 ; ++i )
			weekList.add("第"+i+"周");
		for(int i = 1 ; i <= 7 ; ++i )
			dayList.add("第"+i+"天");
		
		
		
		return getAutoView().addObject("courseParamModal", courseParamModal)//包括名称
										.addObject("returnUrl", preUrl)
										.addObject("courseParamPoList", courseParamPoList)//参数列表
										.addObject("weekList", weekList)//周列表
										.addObject("dayList", dayList)//周几列表
										.addObject("cycleList", CourseParamPo.CYCLELIST)//周期列表
										.addObject("categoryList", CourseParamPo.CATEGORYLIST);//性质列表
	}
	
	/**
	 * 编辑【分值模板】信息页面
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
		CourseParamModalPo courseParamModal=null;
		if(StringUtil.isNotEmpty(id)){
			courseParamModal=courseParamModalRepository.get(id);
		}
		return getAutoView().addObject("courseParamModal", courseParamModal).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【分值模板】明细页面
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
		CourseParamModalPo courseParamModal=null;
		if(StringUtil.isNotEmpty(id)){
			courseParamModal=courseParamModalRepository.get(id);
		}
		return getAutoView().addObject("courseParamModal", courseParamModal).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【分值模板】信息
	 *
	 * @param request
	 * @param response
	 * @param  courseParamModal
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String name = RequestUtil.getString(request, "modelName");
		String param = RequestUtil.getString(request, "param");
		String id = RequestUtil.getString(request, "id");
		ResultMessage message=null;
		try {
			CourseParamModalPo cpmp ;
			if (StringUtil.isNotEmpty(id))
				cpmp = courseParamModalRepository.get(id);
			else
				cpmp = new CourseParamModalPo();
			cpmp.setName(name);
			cpmp.setParam(param);
			//构造领域对象和保存数据
			CourseParamModal courseParamModal =courseParamModalRepository.newInstance(cpmp);
			courseParamModal.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存分值模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对分值模板操作失败,"+e.getMessage());
			logger.error("对分值模板操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private CourseParamModalPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		CourseParamModalPo courseParamModalPo = getCourseParamModalPo(jsonObj);

		return courseParamModalPo;
	}
	
	/** 
	 * 获取分值模板数据
	 *
	 * @param jsonObj
	 */
	private CourseParamModalPo getCourseParamModalPo(JSONObject jsonObj){
		CourseParamModalPo courseParamModalPo = (CourseParamModalPo) JsonUtil.getDTO(jsonObj.toString(), CourseParamModalPo.class);
		return courseParamModalPo;
	}
	
	
	/**
	 *  批量删除【分值模板】记录
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
			CourseParamModal courseParamModal =courseParamModalRepository.newInstance();
			courseParamModal.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除分值模板成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除分值模板失败，" + e.getMessage());
			logger.error("删除分值模板失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	@RequestMapping("copy")
	public void copy(HttpServletRequest request,HttpServletResponse response) throws IOException{
		PrintWriter out = response.getWriter();
		String id = RequestUtil.getString(request, "id");
		CourseParamModalPo r = courseParamModalRepository.get(id);
		r.setName(r.getName()+" - 副本");
		CourseParamModal d = courseParamModalRepository.newInstance(r);
		r.setId(d.getIdGenerator().getId());
		CourseParamModal dd = courseParamModalRepository.newInstance(r);
		dd.save();
		out.print("复制成功！");
	}
}
