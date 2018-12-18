package com.lc.ibps.platform.system.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.system.domain.News;
import com.lc.ibps.common.system.persistence.entity.NewsPo;
import com.lc.ibps.common.system.repository.NewsRepository;
import com.lc.ibps.common.system.repository.NewsRightsRepository;
import com.lc.ibps.common.system.service.INewsRightsService;

/**
 * 公告 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：chunyan huang
 * 邮箱地址：370653110@qq.com
 * 创建时间：2016-11-22 17:19:54
 *</pre>
 */
@Controller
@RequestMapping("/platform/system/news/")
public class NewsController extends GenericController{
	@Resource
	private NewsRepository newsRepository;
	@Resource
	private NewsRightsRepository newsRightsRepository;
	@Resource
	private INewsRightsService iNewsRightsService;
	@Resource
	private IPartyUserService userService;
	/**
	 * 【公告】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		// 更新状态
		newsRepository.newInstance().updateStatus();
		QueryFilter queryFilter = getQuerFilter(request);
		
		boolean isSuper = userService.isSuperUser(ContextUtil.getCurrentUser().getAccount());
		if(!isSuper){
			// 无论哪个用户都可以有所属组织或者没有所属组织
			if (BeanUtils.isNotEmpty(ContextUtil.getCurrentOrg())) {
				String orgId = ContextUtil.getCurrentOrg().getId();
				String newsIdStr = newsRightsRepository.getNewsIdStr(orgId);
				if (StringUtil.isNotEmpty(newsIdStr)) {
					queryFilter.addParamsFilter("ID_", newsIdStr);
				}else{
					queryFilter.addFilter("IS_PUBLIC_", "yes",QueryOP.EQUAL);
				}
			}else{
				queryFilter.addFilter("IS_PUBLIC_", "yes",QueryOP.EQUAL);
			}
		}
		
		PageList<NewsPo> newsList = (PageList<NewsPo>)newsRepository.query(queryFilter);
		return new PageJson(newsList);
	}
	
	/**
	 * 编辑【公告】信息页面
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
		NewsPo news=null;
		if(StringUtil.isNotEmpty(id)){
			news=newsRepository.get(id);
		}else{
			news = new NewsPo();
			news.setPublicDate(new Date());
			User user = ContextUtil.getCurrentUser();
			news.setUserId(user.getUserId());
			news.setUserName(user.getFullname());
		}
		return getAutoView().addObject("news", news).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【公告】明细页面
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
		NewsPo news=null;
		if(StringUtil.isNotEmpty(id)){
			news=newsRepository.get(id);
		}
		return getAutoView().addObject("news", news).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【公告】信息
	 *
	 * @param request
	 * @param response
	 * @param  news
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,NewsPo newsPo) throws Exception{
		ResultMessage message=null;
		try {
			//构造领域对象和保存数据
			News news = newsRepository.newInstance(newsPo);
			news.save();
			String newsId = news.getId();
			String deptIdStr = newsPo.getDepId();
			iNewsRightsService.saveNewsRights(deptIdStr, newsId);
			message=new ResultMessage(ResultMessage.SUCCESS, "保存公告成功");
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			message=new ResultMessage(ResultMessage.FAIL, "对公告操作失败",e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【公告】记录
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
			// 该id有可能为空，应该提示错误信息，如果不判断，会导致前台提示'删除公告成功'
			if (ids != null) {
				//构造领域对象和保存数据
				News news =newsRepository.newInstance();
				news .deleteByIds(ids);
				message=new ResultMessage(ResultMessage.SUCCESS, "删除公告成功");
			}
			else {// 前台公告传过来的ids为空（公告管理列表点击顶部的删除按钮导致ids为空，实际在该记录的'管理'列是没有显示删除按钮的）
				message=new ResultMessage(ResultMessage.FAIL, "该公告不能删除");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			message=new ResultMessage(ResultMessage.FAIL, "删除公告失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
