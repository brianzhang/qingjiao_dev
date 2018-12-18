package com.lc.ibps.platform.msg.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.msg.domain.InnerMessage;
import com.lc.ibps.common.msg.entity.InnerMessageVo;
import com.lc.ibps.common.msg.persistence.entity.InnerMessagePo;
import com.lc.ibps.common.msg.persistence.entity.MessageReplyPo;
import com.lc.ibps.common.msg.repository.InnerMessageRepository;
import com.lc.ibps.common.msg.repository.MessageReplyRepository;

/**
* 内部消息  控制器类。
*
* <pre> 
* 构建组：ibps-conmmon-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-02-26 15:07:33
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/msg/innerMessage/")
public class InnerMessageController extends GenericController{
	@Resource
	private InnerMessageRepository innerMessageRepository;
	@Resource
	private MessageReplyRepository messageReplyRepository;
	
	/**
	 * 收到的内部消息列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("receiveJson")
	public @ResponseBody PageJson receiveJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		queryFilter.addFilter("receiverId", userId, QueryOP.EQUAL);
		PageList<InnerMessagePo> innerMessageList = (PageList<InnerMessagePo>) innerMessageRepository.queryReceiveMsgByUserId(queryFilter);
		return new PageJson(innerMessageList);
	}
	
	/**
	 * 发送的内部消息列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("sentJson")
	public @ResponseBody PageJson sentJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String userId = ContextUtil.getCurrentUserId();
		queryFilter.addFilter("OWNER_ID_", userId, QueryOP.EQUAL);
		queryFilter.addFilter("IS_PUBLIC_", InnerMessagePo.IS_PUBLIC_NO, QueryOP.EQUAL);
		PageList<InnerMessagePo> innerMessageList = (PageList<InnerMessagePo>) innerMessageRepository.query(queryFilter);
		return new PageJson(innerMessageList);
	}
	
	/**
	 * 编辑内部消息信息页面
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
		InnerMessagePo innerMessage=null;
		if(StringUtil.isNotEmpty(id)){
			innerMessage=innerMessageRepository.get(id);
		}
		return getAutoView().addObject("innerMessage", innerMessage).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 内部消息明细页面
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
		boolean receive = RequestUtil.getBoolean(request, "receive",false);
		InnerMessagePo po=null;
		if(StringUtil.isNotEmpty(id)){
			InnerMessage innerMessage = innerMessageRepository.newInstance();
			innerMessage.markRead(new String[] {id},ContextUtil.getCurrentUser());
			po=innerMessageRepository.get(id);
		}
		return getAutoView().addObject("receive",receive).addObject("innerMessage", po).addObject("returnUrl", preUrl);
	}
	
	
	/**
	 * 内部消息明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("readMsg")
	public ModelAndView readMsg(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		InnerMessagePo po=null;
		if(StringUtil.isNotEmpty(id)){
			InnerMessage innerMessage = innerMessageRepository.newInstance();
			innerMessage.markRead(id,ContextUtil.getCurrentUser());
			po=innerMessageRepository.get(id);
		}
		return getAutoView().addObject("innerMessage", po).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 
	 * 未读消息列表
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("msgList")
	public @ResponseBody PageJson   msgList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		DefaultPage page = new DefaultPage();
		page.setPage(1);
		page.setLimit(10);
		Map<String,Object> params =  new HashMap<String,Object>();		
		params.put("isRead", InnerMessagePo.IS_NOT_READ);
		List<InnerMessagePo> messageList = innerMessageRepository.queryMsgByUserId( ContextUtil.getCurrentUserId(),params, page);
		for (InnerMessagePo po : messageList) {
			po.setDurationTime(	DateUtil.timeAgo(po.getCreateTime()));
		}
		return new PageJson(messageList);
	}
	/** 
	 * 保存内部消息信息
	 *
	 * @param request
	 * @param response
	 * @param  innerMessage
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,InnerMessageVo vo) throws Exception{
		String resultMsg=null;
		try {
			vo.setIsPublic(InnerMessagePo.IS_PUBLIC_NO);
			vo.setMessageType(InnerMessagePo.TYPE_NORMAL);
			InnerMessage innerMessage = innerMessageRepository.newInstance();
			innerMessage.send(vo,ContextUtil.getCurrentUser());
			resultMsg="发送成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			resultMsg="对内部消息操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除内部消息记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] aryIds=RequestUtil.getStringAryByStr(request, "id");
			InnerMessage innerMessage = innerMessageRepository.newInstance();
			innerMessage.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除内部消息成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除内部消息失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/**
	 * 标记为已读
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("markRead")
	public void markRead(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		String[] ids =RequestUtil.getStringAryByStr(request, "ids");
		try{
			InnerMessage innerMessage = innerMessageRepository.newInstance();
			innerMessage.markRead(ids,ContextUtil.getCurrentUser());
			message=new ResultMessage(ResultMessage.SUCCESS, "成功标记为已读!");
		}catch(Exception e){
			logger.error(e.getMessage(),e);
			message=new ResultMessage(ResultMessage.FAIL, e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}
	/**
	 * 回复页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("reply")
	public ModelAndView reply(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		InnerMessagePo po=null;
		
		//初始化消息内容信息
		List<MessageReplyPo> replyList = new ArrayList<MessageReplyPo>();
		if(StringUtil.isNotEmpty(id)){
			InnerMessage innerMessage = innerMessageRepository.newInstance();
			innerMessage.markRead(new String[] {id},ContextUtil.getCurrentUser());
			po=innerMessageRepository.get(id);
			replyList = messageReplyRepository.findByMsgId(id);
		}
		return getAutoView().addObject("innerMessage", po)
							.addObject("replyList", replyList)
							.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存回复内部消息信息
	 *
	 * @param request
	 * @param response
	 * @param  innerMessage
	 * @throws Exception
	 */
	@RequestMapping("saveReply")
	public void saveReply(HttpServletRequest request,HttpServletResponse response,MessageReplyPo messageReply) throws Exception{
		String resultMsg=null;
		try {
			InnerMessage innerMessage = innerMessageRepository.newInstance();
			innerMessage.reply(messageReply,ContextUtil.getCurrentUser());
			resultMsg="回复成功";
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			resultMsg="对内部消息操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	

}
