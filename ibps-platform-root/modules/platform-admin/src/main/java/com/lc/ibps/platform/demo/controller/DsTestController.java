

package com.lc.ibps.platform.demo.controller;

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
import com.lc.ibps.base.datasource.dynamic.DataSourceUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.test.demo.domain.DsTest;
import com.lc.ibps.test.demo.persistence.entity.DsTestPo;
import com.lc.ibps.test.demo.repository.DsTestRepository;
import com.lc.ibps.test.demo.service.DsTestService;

import net.sf.json.JSONObject;


/**
 * TEST 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-07-03 15:14:35
 *</pre>
 */
@Controller
@RequestMapping("/platform/demo/dsTest/")
public class DsTestController extends GenericController{
	
	@Resource
	private DsTestRepository testRepository;
	@Resource
	private DsTestService testService;
	
	/**
	 * 【TEST】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		
		// domain 测试
		DsTest test =testRepository.newInstance();
//		test.dbTest();
		test.testTemp();
		
		// service 测试
//		testService.dbTest();
//		testService.tempTest();
		
		// 取得数据源
	//	Map<Object, Object> ds = 
				DataSourceUtil.getDataSources();
		
		
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DsTestPo> testList=(PageList<DsTestPo>)testRepository.query(queryFilter);
		return new PageJson(testList);
	}
	
	/**
	 * 编辑【TEST】信息页面
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
		DsTestPo test=null;
		if(StringUtil.isNotEmpty(id)){
			test=testRepository.get(id);
		}
		return getAutoView().addObject("test", test).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【TEST】信息页面
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
		DsTestPo test=null;
		if(StringUtil.isNotEmpty(id)){
			test=testRepository.get(id);
		}
		return getAutoView().addObject("test", test).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【TEST】明细页面
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
		DsTestPo test=null;
		if(StringUtil.isNotEmpty(id)){
			test=testRepository.get(id);
		}
		return getAutoView().addObject("test", test).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【TEST】信息
	 *
	 * @param request
	 * @param response
	 * @param  test
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			DsTestPo testPo = getFromRequest(request);
			//构造领域对象和保存数据
			DsTest test =testRepository.newInstance(testPo);
			test.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存TEST成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对TEST操作失败，"+e.getMessage());
			logger.error("对TEST操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DsTestPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DsTestPo testPo = getDsTestPo(jsonObj);

		return testPo;
	}
	
	/** 
	 * 获取TEST数据
	 *
	 * @param jsonObj
	 */
	private DsTestPo getDsTestPo(JSONObject jsonObj){
		DsTestPo testPo = (DsTestPo) JsonUtil.getDTO(jsonObj.toString(), DsTestPo.class);
		return testPo;
	}
	
	
	/**
	 *  批量删除【TEST】记录
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
			DsTest test =testRepository.newInstance();
			test.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除TEST成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除TEST失败，" + e.getMessage());
			logger.error("删除TEST失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
