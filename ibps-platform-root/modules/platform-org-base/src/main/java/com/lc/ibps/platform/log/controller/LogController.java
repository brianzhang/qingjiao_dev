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
import com.lc.ibps.common.log.repository.LogRepository;
import com.lc.ibps.common.log.persistence.entity.LogPo;
import com.lc.ibps.common.log.domain.Log;

/**
 * 系统操作日志 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2017-03-01 19:33:17
 *</pre>
 */
@Controller
@RequestMapping("/platform/log/log/")
public class LogController extends GenericController{
	@Resource
	private LogRepository logRepository;
	
	/**
	 * 【系统操作日志】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<LogPo> logList=(PageList<LogPo>)logRepository.query(queryFilter);
		return new PageJson(logList);
	}
	
	/**
	 * 编辑【系统操作日志】信息页面
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
		LogPo log=null;
		if(StringUtil.isNotEmpty(id)){
			log=logRepository.get(id);
		}
		return getAutoView().addObject("log", log).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【系统操作日志】明细页面
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
		LogPo log=null;
		if(StringUtil.isNotEmpty(id)){
			log=logRepository.get(id);
		}
		return getAutoView().addObject("log", log).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【系统操作日志】信息
	 *
	 * @param request
	 * @param response
	 * @param  log
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,LogPo logPo) throws Exception{
		ResultMessage message=null;
		try {
			//构造领域对象和保存数据
			Log log =logRepository.newInstance(logPo);
			log.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存系统操作日志成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对系统操作日志操作失败",e.getMessage());
			logger.error("对系统操作日志操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【系统操作日志】记录
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
			Log log =logRepository.newInstance();
			log.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除系统操作日志成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除系统操作日志失败");
			logger.error("删除系统操作日志失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
