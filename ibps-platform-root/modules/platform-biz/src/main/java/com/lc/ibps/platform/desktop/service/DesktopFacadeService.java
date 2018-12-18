package com.lc.ibps.platform.desktop.service;

import java.util.List;
import java.util.Map;

import com.lc.ibps.common.desktop.entity.Infobox;
import com.lc.ibps.common.msg.persistence.entity.InnerMessagePo;
import com.lc.ibps.common.system.persistence.entity.NewsPo;

/**
 * 桌面管理数据展示门面，对外提供一个高层次的接口。
 *
 * <pre> 
 * 构建组：ibps-common-biz
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年11月22日-下午11:24:25
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public interface DesktopFacadeService {
	/**
	 * 个人信息
	 * 
	 * @return
	 */
	public Object userInfo();

	/**
	 * 待办事宜
	 * 
	 * @return
	 */
	public List<?> pendingMatters();

	/**
	 * 已办事宜
	 * 
	 * @return
	 */
	public List<?> alreadyMatters();

	/**
	 * 办结事宜
	 * 
	 * @return
	 */
	public List<?> completedMatters();

	/**
	 * 我的办结
	 * 
	 * @return
	 */
	public List<?> myCompleted();

	/**
	 * 我的请求
	 * 
	 * @return
	 */
	public List<?> myRequest();

	/**
	 * 新建流程
	 * 
	 * @return
	 */
	public List<?> newProcess();

	/**
	 * 内部消息（未读消息）
	 * 
	 * @return
	 */
	public Map<String,List<InnerMessagePo>> unreadMessage();

	/**
	 * 公告消息
	 * 
	 * @return
	 */
	public List<?> getPubMessage();

	
	/**
	 * 仪表盘
	 * @return
	 */
	List<Infobox> getDashboard();
	
	/**
	 * 获取公告
	 * @author ldx 
	 * @return
	 */
	public List<NewsPo> getNews();

}
