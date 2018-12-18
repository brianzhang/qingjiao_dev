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
import com.lc.ibps.common.msg.persistence.entity.MessageReadPo;
import com.lc.ibps.common.msg.repository.MessageReadRepository;

/**
 * 接收人已读 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-16 15:43:56
 *</pre>
 */
@Controller
@RequestMapping("/platform/msg/innerMessageRead/")
public class InnerMessageReadController extends GenericController{
	@Resource
	private MessageReadRepository innerMessageReadRepository;
	
	/**
	 * 【接收人已读】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<MessageReadPo> innerMessageReadList=(PageList<MessageReadPo>)innerMessageReadRepository.query(queryFilter);
		return new PageJson(innerMessageReadList);
	}
}
