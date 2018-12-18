
package com.lc.ibps.bishe.teacherAndStudent.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.teacherAndStudent.domain.TeacherAndStudent;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;
import com.lc.ibps.bishes.teacherAndStudent.repository.TeacherAndStudentRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


/**
 * t_tddsxs 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-20 23:31:07
 *</pre>
 */
@Controller
@RequestMapping("/bishe/teacherAndStudent/teacherAndStudent/")
public class TeacherAndStudentController extends GenericController{
	@Resource
	TeacherAndStudentRepository teacherAndStudentRepository;
	@Resource
	CurrentContext currentContext;
	
	/**
	 * 【t_tddsxs】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
QueryFilter queryFilter=getQuerFilter(request);
		
		String referer = request.getHeader("referer");
		String x = referer.split("htm",-1)[1];	
		if(x.isEmpty()){
			PageList<TeacherAndStudentPo> xx=(PageList<TeacherAndStudentPo>)teacherAndStudentRepository.query(queryFilter);
			return new PageJson(xx);
		}else{
		String id = x.split("id=")[1];
		PageList<TeacherAndStudentPo> teacherAndStudentList=(PageList<TeacherAndStudentPo>)teacherAndStudentRepository.query(queryFilter);
		PageList<TeacherAndStudentPo> teacherAndStudentList1 = new PageList<>();
		for(TeacherAndStudentPo  teacherAndStudentPo : teacherAndStudentList){
			             if(teacherAndStudentPo.getId().equals(id)){
			            	 teacherAndStudentList1 .add(teacherAndStudentPo);
			             }
		} 
		return new PageJson(teacherAndStudentList1);
	}
	}
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String id=RequestUtil.getString(request, "id");
		TeacherAndStudentPo teacherAndStudent=teacherAndStudentRepository.get(id);
		return getAutoView().addObject("teacherAndStudent", teacherAndStudent);
	}
	@RequestMapping("listForm")
	public ModelAndView listForm(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		return getAutoView().addObject("returnUrl", preUrl);
	}
	@RequestMapping("listForStudent")
	public ModelAndView listForStudent(HttpServletRequest request,HttpServletResponse response) throws Exception{
		User user = currentContext.getCurrentUser();
		String account = user.getAccount();
		TeacherAndStudentPo po = teacherAndStudentRepository.getByJsid(account);
		String student = po.getXs();
		JSONArray array = JSONArray.fromObject(student);
		 for(int i=0;i<array.size();i++){
			    JSONObject job = array.getJSONObject(i);  // 遍历 jsonarray 数组，把每一个对象转成 json 对象
			    String xh =job.getString("xh");
			    String name =job.getString("name");
			    
			  }
		String id=RequestUtil.getString(request, "id");
		TeacherAndStudentPo teacherAndStudent=teacherAndStudentRepository.get(id);
		return getAutoView().addObject("teacherAndStudent", teacherAndStudent);
	}
	/**
	 * 编辑【t_tddsxs】信息页面
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
		TeacherAndStudentPo teacherAndStudent=null;
		if(StringUtils.isNotEmpty(id)){
			teacherAndStudent=teacherAndStudentRepository.get(id);
		}
		return getAutoView().addObject("teacherAndStudent", teacherAndStudent).addObject("returnUrl", preUrl);
	}
	/**
	 * 编辑【t_tddsxs】信息页面
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
		TeacherAndStudentPo teacherAndStudent=null;
		if(StringUtils.isNotEmpty(id)){
			teacherAndStudent=teacherAndStudentRepository.get(id);
		}
		return getAutoView().addObject("teacherAndStudent", teacherAndStudent).addObject("returnUrl", preUrl);
	}

	@RequestMapping("submit")
	public ModelAndView submit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return null;

	}
	/**
	 * 【t_tddsxs】明细页面
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
		TeacherAndStudentPo teacherAndStudent=null;
		if(StringUtils.isNotEmpty(id)){
			teacherAndStudent=teacherAndStudentRepository.get(id);
		}
		return getAutoView().addObject("teacherAndStudent", teacherAndStudent).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_tddsxs】信息
	 *
	 * @param request
	 * @param response
	 * @param  teacherAndStudent
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			TeacherAndStudentPo teacherAndStudentPo = getFromRequest(request);
			//构造领域对象和保存数据
			TeacherAndStudent teacherAndStudent =teacherAndStudentRepository.newInstance(teacherAndStudentPo);
			teacherAndStudent.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_tddsxs成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_tddsxs操作失败,"+e.getMessage());
			logger.error("对t_tddsxs操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TeacherAndStudentPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		TeacherAndStudentPo teacherAndStudentPo = getTeacherAndStudentPo(jsonObj);

		return teacherAndStudentPo;
	}
	
	/** 
	 * 获取t_tddsxs数据
	 *
	 * @param jsonObj
	 */
	private TeacherAndStudentPo getTeacherAndStudentPo(JSONObject jsonObj){
		TeacherAndStudentPo teacherAndStudentPo = (TeacherAndStudentPo) JsonUtil.getDTO(jsonObj.toString(), TeacherAndStudentPo.class);
		return teacherAndStudentPo;
	}
	
	
	/**
	 *  批量删除【t_tddsxs】记录
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
			TeacherAndStudent teacherAndStudent =teacherAndStudentRepository.newInstance();
			teacherAndStudent.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_tddsxs成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_tddsxs失败，" + e.getMessage());
			logger.error("删除t_tddsxs失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	@RequestMapping("startFlow")
	public void startFlow(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String id = RequestUtil.getString(request, "id");
			String flowKey = RequestUtil.getString(request, "flowKey");
			System.out.println("=============>"+flowKey);
			//构造领域对象和保存数据
			TeacherAndStudent teacherAndStudent=teacherAndStudentRepository.newInstance();
			teacherAndStudent.startFlow(flowKey,id);//启动流程
			message=new ResultMessage(ResultMessage.SUCCESS, "审核流程启动成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "审核流程启动失败，" + e.getMessage());
			logger.error("审核流程启动失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
