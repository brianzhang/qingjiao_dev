package com.lc.ibps.platform.msg.controller;


import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.common.cat.constants.CategoryConstants;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.common.msg.domain.MessageTemplate;
import com.lc.ibps.common.msg.persistence.entity.MessageTemplatePo;
import com.lc.ibps.common.msg.repository.MessageTemplateRepository;

/**
* 消息模版  控制器类。
*
* <pre> 
* 构建组：ibps-bpmn-biz
* 作者：hugh zhuang
* 邮箱：3378340995@qq.com
* 日期：2016-02-24 23:54:56
* 版权：广州流辰信息技术有限公司
* </pre>
*/
@Controller
@RequestMapping("/platform/msg/messageTemplate/")
public class MessageTemplateController extends GenericController{
	@Resource
	private MessageTemplateRepository messageTemplateRepository;
	@Resource
	private TypeRepository typeRepository;
	
	/**
	 * 编辑消息模版信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		List<TypePo> msgTelTypes =	typeRepository.findByCategoryKey(CategoryConstants.CAT_MSG_TEL.key());
		String msgTelTypeJson =  JsonUtil.getJSONString(msgTelTypes);
		
		return getAutoView()
				.addObject("msgTelTypes",msgTelTypes)
				.addObject("msgTelTypeJson",msgTelTypeJson);
	}
	/**
	 * 消息模版列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<MessageTemplatePo> messageTemplateList=(PageList<MessageTemplatePo>)messageTemplateRepository.query(queryFilter);
		return new PageJson(messageTemplateList);
	}
	
	/**
	 * 编辑消息模版信息页面
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
		MessageTemplatePo messageTemplate=null;
		if(StringUtil.isNotEmpty(id)){
			messageTemplate=messageTemplateRepository.get(id);
		}
		List<TypePo> msgTelTypes =	typeRepository.findByCategoryKey(CategoryConstants.CAT_MSG_TEL.key());
		return getAutoView()
				.addObject("messageTemplate", messageTemplate)
				.addObject("msgTelTypes",msgTelTypes)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 消息模版明细页面
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
		MessageTemplatePo messageTemplate=null;
		if(StringUtil.isNotEmpty(id)){
			messageTemplate=messageTemplateRepository.get(id);
		}
		return getAutoView().addObject("messageTemplate", messageTemplate).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存消息模版信息
	 *
	 * @param request
	 * @param response
	 * @param  messageTemplate
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,MessageTemplatePo po) throws Exception{
		String resultMsg=null;
		try {
			MessageTemplate messageTemplate = messageTemplateRepository.newInstance(po);
			messageTemplate.save();
			resultMsg="保存消息模版成功";
		
			writeResultMessage(response.getWriter(),resultMsg,ResultMessage.SUCCESS);
		} catch (Exception e) {
			resultMsg="对消息模版操作失败";
			writeResultMessage(response.getWriter(),resultMsg,e.getMessage(),ResultMessage.FAIL);
		}
	}
	
	/**
	 *  批量删除消息模版记录
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
			MessageTemplate messageTemplate = messageTemplateRepository.newInstance();
			messageTemplate.deleteByIds(aryIds);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除消息模版成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除消息模版失败");
		}
		writeResultMessage(response.getWriter(), message);
	}
}
