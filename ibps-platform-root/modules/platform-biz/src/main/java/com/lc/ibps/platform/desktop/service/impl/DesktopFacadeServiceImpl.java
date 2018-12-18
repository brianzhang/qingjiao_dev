package com.lc.ibps.platform.desktop.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.Direction;
import com.lc.ibps.api.base.query.FieldSort;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.org.service.IPartyEmployeeService;
import com.lc.ibps.api.org.service.IPartyEntityService;
import com.lc.ibps.api.org.service.IPartyUserService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.db.mybatis.domain.DefaultFieldSort;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.bpmn.api.constant.BpmAuthContants;
import com.lc.ibps.bpmn.builder.BpmTaskBuilder;
import com.lc.ibps.bpmn.persistence.entity.BpmDefinePo;
import com.lc.ibps.bpmn.persistence.entity.BpmTaskPo;
import com.lc.ibps.bpmn.repository.BpmDefineRepository;
import com.lc.ibps.bpmn.repository.BpmInstRepository;
import com.lc.ibps.bpmn.repository.BpmTaskRepository;
import com.lc.ibps.bpmn.utils.PartyUtil;
import com.lc.ibps.common.desktop.entity.Infobox;
import com.lc.ibps.common.msg.persistence.entity.InnerMessagePo;
import com.lc.ibps.common.msg.repository.InnerMessageRepository;
import com.lc.ibps.common.system.persistence.entity.NewsPo;
import com.lc.ibps.common.system.repository.NewsRepository;
import com.lc.ibps.common.system.repository.NewsRightsRepository;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.platform.desktop.service.DesktopFacadeService;

/**
 * 桌面管理数据展示门面实现类。
 *
 * <pre>
 *  
 * 构建组：ibps-common-biz
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年11月22日-下午11:25:22
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Service("desktopFacadeService")
public class DesktopFacadeServiceImpl implements DesktopFacadeService {
	protected Logger logger = LoggerFactory.getLogger(DesktopFacadeServiceImpl.class);
	@Resource
	private CurrentContext currentContext;
	@Resource
	private NewsRepository newsRepository;
	@Resource
	private BpmTaskRepository bpmTaskRepository;
	@Resource
	private BpmInstRepository bpmInstRepository;
	@Resource
	private BpmDefineRepository bpmDefineRepository;
	@Resource
	private InnerMessageRepository innerMessageRepository;
	@Resource
	private IPartyEmployeeService partyEmployeeService;
	@Resource
	private IPartyUserService partyUserService;
	@Resource
	private IPartyEntityService entityService;
	@Resource
	private NewsRightsRepository newsRightsRepository;
	
	/**
	 * 默认的分页
	 * 
	 * @return
	 */
	private DefaultPage getDefaultPage() {
		DefaultPage page = new DefaultPage();
		page.setPage(1);
		page.setLimit(10);
		return page;
	}

	@Override
	public Object userInfo() {
		return currentContext.getCurrentUser();
	}

	@Override
	public List<?> pendingMatters() {
		String userId = currentContext.getCurrentUserId();
		DefaultPage page = this.getDefaultPage();
		try {
			List<PartyEntity> pes = new ArrayList<PartyEntity>();
			String data = entityService.findByUserIdJson(userId);
			if(JacksonUtil.isJsonArray(data)){
				List<PartyEntityPo> peps = JacksonUtil.getDTOList(data, PartyEntityPo.class);
				pes.addAll(peps);
			}
			Map<String, String> groups = PartyUtil.convertGroupList(pes);
			List<BpmTaskPo> list = bpmTaskRepository.queryByUser(userId,groups, page);
			BpmTaskBuilder.build(list);
			return list;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	@Override
	public List<?> alreadyMatters() {
		String userId = currentContext.getCurrentUserId();
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		queryFilter.setPage(this.getDefaultPage());
		try {
			return bpmInstRepository.queryHandled(userId, queryFilter);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	@Override
	public List<?> completedMatters() {
		String userId = currentContext.getCurrentUserId();
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		try {
			return bpmInstRepository.queryCompleted(userId, queryFilter);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	@Override
	public List<?> myCompleted() {
		String userId = currentContext.getCurrentUserId();
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		try {
			return bpmInstRepository.queryCompleted(userId, queryFilter);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	@Override
	public List<?> myRequest() {
		String userId = currentContext.getCurrentUserId();
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		try {
			return  bpmInstRepository.queryRequest(userId, queryFilter);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null; 
	}

	@Override
	public List<?> newProcess() {
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		try {
			User curUser = currentContext.getCurrentUser();
			boolean isSuper = false;
			boolean registerEnabled = Boolean.valueOf(AppUtil.getProperty("register.enabled", "false"));
			if(!registerEnabled){
				isSuper = partyUserService.isSuperUser(curUser.getAccount());
			}
			queryFilter.addFilter("is_main_", "Y", QueryOP.EQUAL);
			queryFilter.addParamsFilter("rightType", BpmAuthContants.START);
			List<FieldSort> fieldSorts = queryFilter.getFieldSortList();
			if(BeanUtils.isEmpty(fieldSorts)){
				fieldSorts = new ArrayList<FieldSort>();
				fieldSorts.add(new DefaultFieldSort("update_time_", Direction.fromString("desc")));
				queryFilter.setFieldSortList(fieldSorts);
			}
			List<BpmDefinePo> list = bpmDefineRepository.query(queryFilter,curUser.getUserId(),isSuper);
			for (BpmDefinePo po : list) {
				if(BeanUtils.isNotEmpty(po.getCreateBy())){
					PartyEmployeePo employee = 
							PartyEmployeePo.fromJsonString(partyEmployeeService.getByIdJson(po.getCreateBy()));
					if(BeanUtils.isNotEmpty(employee)){
						po.setCreateBy(employee.getName());
					}
				}
			}
			return list;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	@Override
	public Map<String,List<InnerMessagePo>> unreadMessage() {
		DefaultPage page = this.getDefaultPage();
		Map<String,Object> params =  new HashMap<String,Object>();							
		params.put("isRead", InnerMessagePo.IS_NOT_READ);
		params.put("messageType", InnerMessagePo.TYPE_NORMAL);
		//内部消息
		List<InnerMessagePo> list1 = innerMessageRepository.queryMsgByUserId(currentContext.getCurrentUserId(),params, page);
		//系统消息
		params.put("messageType", InnerMessagePo.TYPE_SYSTEM);
		List<InnerMessagePo> list2 = innerMessageRepository.queryMsgByUserId(currentContext.getCurrentUserId(),params, page);
	
		//公告消息
		params.put("messageType", InnerMessagePo.TYPE_BULLETIN);
		List<InnerMessagePo> list3 = innerMessageRepository.queryMsgByUserId(currentContext.getCurrentUserId(),params, page);
		
		setDurationTime(list1);
		setDurationTime(list2);
		setDurationTime(list3);
		Map<String,List<InnerMessagePo>> map =  new LinkedHashMap<String,List<InnerMessagePo>>();	
		map.put(InnerMessagePo.TYPE_NORMAL, list1);
		map.put(InnerMessagePo.TYPE_SYSTEM, list2);
		map.put(InnerMessagePo.TYPE_BULLETIN, list3);
		
		return map;
	}
	
	private void setDurationTime(List<InnerMessagePo> list){
		for (InnerMessagePo innerMessageVo : list) {
			innerMessageVo.setDurationTime(DateUtil.timeAgo(innerMessageVo.getCreateTime()));
		}
	}
	

	@Override
	public List<?> getPubMessage() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Infobox> getDashboard() {
		String userId = currentContext.getCurrentUserId();
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		queryFilter.setPage(null);
		List<Infobox> list = new ArrayList<Infobox>();
		try {
			List<PartyEntity> pes = new ArrayList<PartyEntity>();
			String data = entityService.findByUserIdJson(userId);
			if(JacksonUtil.isJsonArray(data)){
				List<PartyEntityPo> peps = JacksonUtil.getDTOList(data, PartyEntityPo.class);
				pes.addAll(peps);
			}
			Map<String, String> groups = PartyUtil.convertGroupList(pes);
			List<?> countlist =bpmTaskRepository.queryByUser(userId,groups,queryFilter);
			int count = countlist.size();
			//int notRead = 0;
			//========== 待办事宜
			Infobox infobox1 = new Infobox();
			infobox1.setIcon("fa-comments");
			infobox1.setColor(Infobox.COLOR_BLUE);
			infobox1.setDataText(count+"");
			infobox1.setDataContent("待办事宜");
			infobox1.setUrl("/platform/office/bpmReceivedProcess/pending.htm");
			list.add(infobox1);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		//========== 已办事宜
		try {
			List<?> list2 = bpmInstRepository.queryHandled(userId, queryFilter);
		
			Infobox infobox2 = new Infobox();
			infobox2.setIcon("fa-flag");
			infobox2.setColor(Infobox.COLOR_RED);
			infobox2.setDataText(list2.size()+"");
			infobox2.setDataContent("已办事宜");
			infobox2.setStatType(Infobox.STAT_TYPE_STAT);
			infobox2.setStatStatus(Infobox.STAT_STATUS_UP);
			infobox2.setStatData((int) (Math.random() * 100)+"%");
			infobox2.setUrl("/platform/office/bpmReceivedProcess/handled.htm");
			list.add(infobox2);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		

		//========== 办结事宜
		try {
			List<?> list3 = bpmInstRepository.queryCompleted(userId, queryFilter);
			Infobox infobox3 = new Infobox();
			infobox3.setIcon("fa-check");
			infobox3.setColor(Infobox.COLOR_GREEN);
			infobox3.setDataText(list3.size()+"");
			infobox3.setDataContent("办结事宜");
			infobox3.setUrl("/platform/office/bpmReceivedProcess/completed.htm");
			list.add(infobox3);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}	
		// TODO ========== 转办代理事宜
		try {
//			List<?> list4 = bpmTaskTurnManager.getMyDelegate(userId,queryFilter);
			Infobox infobox4 = new Infobox();
			infobox4.setIcon("fa-share");
			infobox4.setColor(Infobox.COLOR_PINK);
			infobox4.setDataText("0");
			infobox4.setDataContent("转办代理事宜");
			infobox4.setUrl("/platform/bpmn/bpmTaskChange/list.htm");
			list.add(infobox4);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		
		//========== 新建流程
		try {
			// 获得流程分管授权与用户相关的信息
			User curUser = currentContext.getCurrentUser();
			boolean isSuper = false;
			boolean registerEnabled = Boolean.valueOf(AppUtil.getProperty("register.enabled", "false"));
			if(!registerEnabled){
				isSuper = partyUserService.isSuperUser(curUser.getAccount());
			}
			List<?> list5 = bpmDefineRepository.queryDef(curUser.getUserId(),isSuper);
			Infobox infobox5 = new Infobox();
			infobox5.setIcon("fa-file-o");
			infobox5.setColor(Infobox.COLOR_GREEN2);
			infobox5.setDataText(list5.size()+"");
			infobox5.setDataContent("新建流程");
			infobox5.setUrl("/platform/office/bpmInitiatedProcess/newProcess.htm");
			list.add(infobox5);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		//========== 我的请求
		try {
			List<?> list6 = bpmInstRepository.queryRequest(userId, queryFilter);
			Infobox infobox6 = new Infobox();
			infobox6.setIcon("fa-hand-o-up");
			infobox6.setColor(Infobox.COLOR_BLUE2);
			infobox6.setDataText(list6.size()+"");
			infobox6.setDataContent("我的请求");
			infobox6.setUrl("/platform/office/bpmInitiatedProcess/myRequest.htm");
			list.add(infobox6);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		//========== 我的办结
		try {
			List<?> list7 = bpmInstRepository.queryCompleted(userId, queryFilter);
			Infobox infobox7 = new Infobox();
			infobox7.setIcon("fa-check-square-o");
			infobox7.setColor(Infobox.COLOR_BROWN);
			infobox7.setDataText(list7.size()+"");
			infobox7.setDataContent("我的办结");
			infobox7.setStatType(Infobox.STAT_TYPE_BADGE);
			infobox7.setStatStatus(Infobox.STAT_STATUS_DOWN);
			infobox7.setStatData((int) (Math.random() * 100)+"%");
			infobox7.setUrl("/platform/office/bpmInitiatedProcess/myCompleted.htm");
			list.add(infobox7);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		//========== 我的草稿
		try {
			List<?> list8 =  bpmInstRepository.queryDrafts(userId, queryFilter);
	
			Infobox infobox8 = new Infobox();
			infobox8.setIcon("fa-pencil-square-o");
			infobox8.setColor(Infobox.COLOR_WOOD);
			infobox8.setDataText(list8.size()+"");
			infobox8.setDataContent("我的草稿");
			infobox8.setUrl("/platform/office/bpmInitiatedProcess/myDraft.htm");
			list.add(infobox8);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		
		return list;
	}

	@Override
	public List<NewsPo> getNews() {
		QueryFilter queryFilter = new DefaultQueryFilter();
		try {
			// 无论哪个用户都可以有所属组织或者没有所属组织
			if (BeanUtils.isNotEmpty(currentContext.getCurrentOrg())) {
				String orgId = currentContext.getCurrentOrg().getId();
				String newsIdStr = newsRightsRepository.getNewsIdStr(orgId);
				if (StringUtil.isNotEmpty(newsIdStr)) {
					queryFilter.addFilter("ID_", newsIdStr, QueryOP.IN);
				}
			}
//			queryFilter.addFilter("IS_PUBLIC_", "yes", QueryOP.getByOP(arg0));
			return newsRepository.query(queryFilter);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

}
