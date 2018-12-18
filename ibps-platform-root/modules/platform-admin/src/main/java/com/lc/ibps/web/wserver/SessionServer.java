package com.lc.ibps.web.wserver;

import java.io.IOException;
import java.io.Serializable;
import java.util.Deque;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.components.im.utils.ImSessionUtil;

import net.sf.json.JSONObject;

/** 
 * 聊天室服务端
 *
 * <pre> 
 * 构建组：ibps-component-im
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年10月29日-上午10:33:45
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@ServerEndpoint(value="/sessionServer/{userId}",configurator=GetHttpSessionConfigurator.class)
public class SessionServer {
	
	private Logger logger = Logger.getLogger(getClass());
	private final String suffix = "_session";
	@Resource
	private CacheManager cacheManager;

	/**
	 * 打开连接时触发
	 * 
	 * @param userId
	 * @param session
	 */
	@OnOpen
	public void onOpen(Session session, @PathParam("userId") String userId) {
		logger.info("connection success: " + userId);
		HttpSession httpSession= (HttpSession) session.getUserProperties().get(HttpSession.class.getName());
		ImSessionUtil.put(httpSession.getId(), session);
	}

	/**
	 * 收到客户端消息时触发
	 * 
	 * @param session
	 * @param message	<pre>
	 * 
	 * 					</pre>
	 * @return
	 */
	@OnMessage
	public void onMessage(Session session, String message) {
		
		if (StringUtil.isEmpty(message)) return;
		HttpSession httpSession= (HttpSession) session.getUserProperties().get(HttpSession.class.getName());
		logger.info( message);
		JSONObject msgJson = JSONObject.fromObject(message);
		String messageType = msgJson.getString("type");

		JSONObject rtnJson =  new JSONObject();
		if( "init".equalsIgnoreCase(messageType)){//初始加载消息,把未读消息读出
			
			String clientId = msgJson.getString("client_id");
			rtnJson.accumulate("message_type", messageType);
			rtnJson.accumulate("client_id", clientId);
			ImSessionUtil.broadcast(httpSession.getId(),JsonUtil.getJSONString(rtnJson));
			ImSessionUtil.put(httpSession.getId(), "online");
			return;
			
		}else if("ping".equalsIgnoreCase(messageType)){//检查是否连接成功
			
			String username = session.getUserPrincipal().toString();
			CacheManager cacheManager = (CacheManager)AppUtil.getBean(CacheManager.class);
			Cache<String, Deque<Serializable>> dequeCache = cacheManager.getCache("shiro-kickout-session");
			Deque<Serializable> deque = dequeCache.get(username);
			String userId = session.getPathParameters().get("userId");

			System.out.println(httpSession.getId());

			boolean isExisted = false;
			for(Serializable sid:deque){
				if(sid.toString().equals(httpSession.getId())){
					isExisted = true;
				}
			}
			
			if(!isExisted){
//				try {
//					session.close();
					rtnJson.accumulate("message_type", "close");
					ImSessionUtil.broadcast(httpSession.getId(),JsonUtil.getJSONString(rtnJson));
					return;
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
			}

		}
	}

	/**
	 * 异常时触发
	 * 
	 * @param session
	 * @param throwable
	 * @param userId
	 */
	@OnError
	public void onError(Session session, Throwable throwable, @PathParam("userId") String userId) {
		logger.error("Websocket Connection Exception:"+ userId);
		logger.error(throwable.getMessage(), throwable);
		HttpSession httpSession= (HttpSession) session.getUserProperties().get(HttpSession.class.getName());
		ImSessionUtil.remove(httpSession.getId());
	}

	/**
	 * 关闭连接时触发
	 * 
	 * @param session
	 * @param userId
	 */
	@OnClose
	public void onClose(Session session, @PathParam("userId") String userId) {
		logger.info("Websocket Close Connection:" + userId);
		HttpSession httpSession= (HttpSession) session.getUserProperties().get(HttpSession.class.getName());
		ImSessionUtil.remove(httpSession.getId());
	}
	
}
