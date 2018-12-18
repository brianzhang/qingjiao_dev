package com.lc.ibps.platform.msg.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.common.msg.persistence.entity.MessageReplyPo;
import com.lc.ibps.common.msg.repository.MessageReplyRepository;

/**
 * 消息回复 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-16 15:43:42
 *</pre>
 */
@Controller
@RequestMapping("/platform/msg/innerMessageReply/")
public class innerMessageReplyController extends GenericController{
	@Resource
	private MessageReplyRepository innerMessageReplyRepository;
	
	/**
	 * 【消息回复】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<MessageReplyPo> innerMessageReplyList=(PageList<MessageReplyPo>)innerMessageReplyRepository.query(queryFilter);
		return new PageJson(innerMessageReplyList);
	}
}
