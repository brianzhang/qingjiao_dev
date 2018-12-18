package com.lc.ibps.platform.jms.controller;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.annotation.Resource;
import javax.jms.DeliveryMode;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.QueueBrowser;
import javax.jms.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.activemq.broker.jmx.QueueViewMBean;
import org.apache.activemq.command.ActiveMQObjectMessage;
import org.apache.activemq.web.MessageQuery;
import org.apache.activemq.web.QueueBrowseQuery;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.components.jms.IJmsQueuesService;

import net.sf.json.JSONObject;

/**
 * 消息队列
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年12月3日-下午8:08:44
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/platform/jms/jmsQueues/")
public class JmsQueuesController extends GenericController {
	@Resource
	private IJmsQueuesService jmsQueuesService;

	@RequestMapping("listJson")
	@ResponseBody
	public PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		List<QueueViewMBean> list = (List<QueueViewMBean>) jmsQueuesService.getQueues();
//		sendJMSmsg();
		return new PageJson(list);
	}

	@RequestMapping("browseJson")
	@ResponseBody
	public PageJson browseJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<JSONObject> list = new ArrayList<JSONObject>();
		String name = RequestUtil.getString(request, "name");
		QueueBrowseQuery qbq = jmsQueuesService.getQueueBrowseQuery(name);
		QueueBrowser queueBrowser = null;
		queueBrowser = qbq.getBrowser(); 
		Enumeration<?> iter = queueBrowser.getEnumeration();
		while (iter.hasMoreElements()) {
			ActiveMQObjectMessage message = (ActiveMQObjectMessage) iter.nextElement();
			// logger.info(message.toString());
			// message对象转JSON会报错，因为某个字段JSON解析不了，所以用JSONObject来封装一些页面用到的信息
			JSONObject jo = new JSONObject();
			// jo.accumulate("JMSDestination", "\""+message.getJMSDestination()+"\"");
			jo.accumulate("JMSDestination", name);
			jo.accumulate("JMSMessageID", message.getJMSMessageID() != null ? message.getJMSMessageID() : "");
			jo.accumulate("JMSCorrelationID", message.getJMSCorrelationID() != null ? message.getJMSCorrelationID() : "");
			if (message.getJMSDeliveryMode() == DeliveryMode.PERSISTENT) {
				jo.accumulate("JMSDeliveryMode", "是");
			} else {
				jo.accumulate("JMSDeliveryMode", "否");
			}
			jo.accumulate("JMSPriority", "" + message.getJMSPriority() != null ? message.getJMSPriority() : "");
			jo.accumulate("JMSRedelivered", "" + message.getJMSRedelivered() != null ? message.getJMSRedelivered() : "");
			jo.accumulate("JMSReplyTo", message.getJMSReplyTo() != null ? message.getJMSReplyTo() : "");
			jo.accumulate("JMSTimestamp", message.getJMSTimestamp());
			list.add(jo);
		}
		PageJson pj = new PageJson(list);
		return pj;
	}

	/**
	 * 清空队列
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 *             void
	 * @exception
	 * @since 1.0.0
	 */
	@RequestMapping("purge")
	public void purge(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String name = RequestUtil.getString(request, "name");
		try {
			jmsQueuesService.purgeDestination(name);
			writeResultMessage(response.getWriter(), "清空" + name + "队列成功", ResultMessage.SUCCESS);
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), "清空" + name + "队列失败", ResultMessage.FAIL);
		}
	}

	@RequestMapping("message")
	public ModelAndView message(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String JMSMessageID = RequestUtil.getString(request, "JMSMessageID");
		String JMSDestination = RequestUtil.getString(request, "JMSDestination");

		MessageQuery messageQuery = jmsQueuesService.getMessageQuery(JMSMessageID, JMSDestination);
		ModelAndView mv = this.getAutoView().addObject("messageQuery", messageQuery).addObject("returnUrl", RequestUtil.getPrePage(request));
		return mv;
	}

	@RequestMapping("removeMessage")
	public void removeMessage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String name = RequestUtil.getString(request, "name");
		String msgId = RequestUtil.getString(request, "msgId");
		try {
			jmsQueuesService.removeMessage(name, msgId);
			writeResultMessage(response.getWriter(), "删除" + msgId + "成功", ResultMessage.SUCCESS);
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), "删除" + msgId + "失败", ResultMessage.FAIL);
		}
	}

	@RequestMapping("sendTestMsg")
	public void sendTestMsg(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String name = RequestUtil.getString(request, "name");
		int n = RequestUtil.getInt(request, "n", 10);
		try {
			JmsTemplate jmsTemplate = (JmsTemplate) AppUtil.getBean("jmsTemplate");
			jmsTemplate.setDeliveryPersistent(false);
			jmsTemplate.setDefaultDestinationName(name);
			for(int i=0;i<n;i++){
/*				final int t=i;*/
				jmsTemplate.send(new MessageCreator() {
					
					@Override
					public Message createMessage(Session arg0) throws JMSException {
						return null;
					}
				});
			}
			
			writeResultMessage(response.getWriter(), name+"发送测试信息成功", ResultMessage.SUCCESS);
		} catch (Exception e) {
			writeResultMessage(response.getWriter(), name+"发送测试信息失败", ResultMessage.FAIL);
		}
	}

	@SuppressWarnings("unused")
	private void sendJMSmsg() throws Exception {
		// TEST TODO
//		ConnectionFactory connectionFactory = new ActiveMQConnectionFactory(ActiveMQConnection.DEFAULT_USER, ActiveMQConnection.DEFAULT_PASSWORD, "tcp://localhost:6435");
//		Connection connection = connectionFactory.createConnection();
//		connection.start();
//		Session session = connection.createSession(Boolean.TRUE, Session.AUTO_ACKNOWLEDGE);
//		QueueBrowseQuery queueBrowseQuery = jmsQueuesService.getQueueBrowseQuery("messageQueue");
//		
//		Session session =queueBrowseQuery.getSession();
//		Destination destination = session.createQueue("messageQueue");
//		MessageProducer producer = session.createProducer(destination);
//		producer.setDeliveryMode(DeliveryMode.PERSISTENT);
//		for (int i = 0; i < 10; i++) {
//			TextMessage message = session.createTextMessage("ActiveMq 发送的消息:" + i);
//			producer.send(message);
//		}
//		session.commit();
//		connection.stop();
		// TEST END
	}
}
