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
import com.lc.ibps.common.msg.domain.MessageReceiver;
import com.lc.ibps.common.msg.persistence.entity.MessageReceiverPo;
import com.lc.ibps.common.msg.repository.MessageReceiverRepository;

/**
* 接收人  控制器类。
*
* <pre> 
* 构建组：ibps-conmmon-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-02-26 15:16:54
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/msg/messageReceiver/")
public class MessageReceiverController extends GenericController{
	@Resource
	private MessageReceiverRepository messageReceiverRepository;
	
	/**
	 * 接收人列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<MessageReceiverPo> messageReceiverList=(PageList<MessageReceiverPo>)messageReceiverRepository.query(queryFilter);
		return new PageJson(messageReceiverList);
	}
	
	/**
	 * 编辑接收人信息页面
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
		MessageReceiverPo messageReceiver=null;
		if(StringUtil.isNotEmpty(id)){
			messageReceiver=messageReceiverRepository.get(id);
		}
		return getAutoView().addObject("messageReceiver", messageReceiver).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 接收人明细页面
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
		MessageReceiverPo messageReceiver=null;
		if(StringUtil.isNotEmpty(id)){
			messageReceiver=messageReceiverRepository.get(id);
		}
		return getAutoView().addObject("messageReceiver", messageReceiver).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存接收人信息
	 *
	 * @param request
	 * @param response
	 * @param  messageReceiver
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,MessageReceiverPo po) throws Exception{
		String resultMsg=null;
		String id=po.getId();
		try {
			MessageReceiver messageReceiver = messageReceiverRepository.newInstance(po);
			if(StringUtil.isEmpty(id)){
				messageReceiver.create();
				resultMsg="添加接收人成功";
			}else{
				messageReceiver.update();
				resultMsg="更新接收人成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对接收人操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除接收人记录
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
			MessageReceiver messageReceiver = messageReceiverRepository.newInstance();
			messageReceiver.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除接收人成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除接收人失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
