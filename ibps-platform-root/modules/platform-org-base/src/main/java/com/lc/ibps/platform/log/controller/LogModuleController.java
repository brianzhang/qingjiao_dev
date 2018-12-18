

package com.lc.ibps.platform.log.controller;

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
import com.lc.ibps.common.log.repository.LogModuleRepository;
import com.lc.ibps.common.log.persistence.entity.LogModulePo;
import com.lc.ibps.common.log.domain.LogModule;


/**
 * 日志模块管理 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2017-03-01 19:31:23
 *</pre>
 */
@Controller
@RequestMapping("/platform/log/logModule/")
public class LogModuleController extends GenericController{
	@Resource
	private LogModuleRepository logModuleRepository;
	
	/**
	 * 【日志模块管理】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<LogModulePo> logModuleList=(PageList<LogModulePo>)logModuleRepository.query(queryFilter);
		return new PageJson(logModuleList);
	}
	
	/**
	 * 编辑【日志模块管理】信息页面
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
		LogModulePo logModule=null;
		if(StringUtil.isNotEmpty(id)){
			logModule=logModuleRepository.get(id);
		}
		return getAutoView().addObject("logModule", logModule).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【日志模块管理】明细页面
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
		LogModulePo logModule=null;
		if(StringUtil.isNotEmpty(id)){
			logModule=logModuleRepository.get(id);
		}
		return getAutoView().addObject("logModule", logModule).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【日志模块管理】信息
	 *
	 * @param request
	 * @param response
	 * @param  logModule
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,LogModulePo logModulePo) throws Exception{
		ResultMessage message=null;
		try {
			//构造领域对象和保存数据
			LogModule logModule =logModuleRepository.newInstance(logModulePo);
			logModule.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存日志模块管理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对日志模块管理操作失败",e.getMessage());
			logger.error("对日志模块管理操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【日志模块管理】记录
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
			LogModule logModule =logModuleRepository.newInstance();
			logModule.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除日志模块管理成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除日志模块管理失败");
			logger.error("删除日志模块管理失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
