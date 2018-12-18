package com.lc.ibps.platform.msg.controller;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.msg.domain.MessageReply;
import com.lc.ibps.common.msg.persistence.entity.MessageReplyPo;
import com.lc.ibps.common.msg.repository.MessageReplyRepository;

/**
* 消息回复  控制器类。
*
* <pre> 
* 构建组：ibps-conmmon-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-02-26 15:21:53
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/msg/messageReply/")
public class MessageReplyController extends GenericController{
	@Resource
	private MessageReplyRepository messageReplyRepository;
	
	/**
	 * 消息回复列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<MessageReplyPo> messageReplyList=(PageList<MessageReplyPo>)messageReplyRepository.query(queryFilter);
		return new PageJson(messageReplyList);
	}
	
	/**
	 * 编辑消息回复信息页面
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
		MessageReplyPo messageReply=null;
		if(StringUtil.isNotEmpty(id)){
			messageReply=messageReplyRepository.get(id);
		}
		return getAutoView().addObject("messageReply", messageReply).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 消息回复明细页面
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
		MessageReplyPo messageReply=null;
		if(StringUtil.isNotEmpty(id)){
			messageReply=messageReplyRepository.get(id);
		}
		return getAutoView().addObject("messageReply", messageReply).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存消息回复信息
	 *
	 * @param request
	 * @param response
	 * @param  messageReply
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,MessageReplyPo po) throws Exception{
		String resultMsg=null;
		String id=po.getId();
		try {
			MessageReply messageReply = messageReplyRepository.newInstance(po);
			if(StringUtil.isEmpty(id)){
				messageReply.create();
				resultMsg="添加消息回复成功";
			}else{
				messageReply.update();
				resultMsg="更新消息回复成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对消息回复操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除消息回复记录
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
			MessageReply messageReply = messageReplyRepository.newInstance();
			messageReply.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除消息回复成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除消息回复失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
