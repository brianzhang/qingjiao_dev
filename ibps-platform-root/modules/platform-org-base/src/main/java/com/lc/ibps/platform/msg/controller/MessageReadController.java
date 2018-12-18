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
import com.lc.ibps.common.msg.domain.MessageRead;
import com.lc.ibps.common.msg.persistence.entity.MessageReadPo;
import com.lc.ibps.common.msg.repository.MessageReadRepository;

/**
* 接收人已读  控制器类。
*
* <pre> 
* 构建组：ibps-conmmon-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-02-26 15:16:09
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/msg/messageRead/")
public class MessageReadController extends GenericController{
	@Resource
	private MessageReadRepository messageReadRepository;
	
	/**
	 * 接收人已读列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<MessageReadPo> messageReadList=(PageList<MessageReadPo>)messageReadRepository.query(queryFilter);
		return new PageJson(messageReadList);
	}
	
	/**
	 * 编辑接收人已读信息页面
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
		MessageReadPo messageRead=null;
		if(StringUtil.isNotEmpty(id)){
			messageRead=messageReadRepository.get(id);
		}
		return getAutoView().addObject("messageRead", messageRead).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 接收人已读明细页面
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
		MessageReadPo messageRead=null;
		if(StringUtil.isNotEmpty(id)){
			messageRead=messageReadRepository.get(id);
		}
		return getAutoView().addObject("messageRead", messageRead).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存接收人已读信息
	 *
	 * @param request
	 * @param response
	 * @param  messageRead
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,MessageReadPo po) throws Exception{
		String resultMsg=null;
		String id=po.getId();
		try {
			MessageRead messageRead = messageReadRepository.newInstance(po);
			if(StringUtil.isEmpty(id)){
				messageRead.create();
				resultMsg="添加接收人已读成功";
			}else{
				messageRead.update();
				resultMsg="更新接收人已读成功";
			}
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对接收人已读操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除接收人已读记录
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
			MessageRead messageRead = messageReadRepository.newInstance();
			messageRead.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除接收人已读成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除接收人已读失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
