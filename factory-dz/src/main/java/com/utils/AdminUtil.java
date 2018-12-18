package com.utils;

import java.util.List;

import javax.annotation.Resource;

import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;

public class AdminUtil {
	/**
	 * 判断是否是管理员,包括平台管理员,以及院系管理员
	 * @return
	 */
	public static boolean isAdmin(PartyOrgAuthRepository partyOrgAuthRepository, PartyEntityRepository partyEntityRepository) {
		String userId = ContextUtil.getCurrentUserId();
		List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
		if(list.size()!=0) return true;
		else {
			PartyEntityPo entityPo = partyEntityRepository.get(userId);
			if(entityPo.getAlias().contains("admin")) return true;
			else return false;
		}
	}
	/**
	 * 判断是否是平台超级管理员
	 * @return
	 */
	public static boolean isSuperAdmin(PartyOrgAuthRepository partyOrgAuthRepository, PartyEntityRepository partyEntityRepository) {
		String userId = ContextUtil.getCurrentUserId();
		PartyEntityPo entityPo = partyEntityRepository.get(userId);
		if(entityPo.getAlias().contains("admin")) return true;
		else return false;
		
	}
	/**
	 * 判断是否是院系管理员
	 * @return
	 */
	public static boolean isOrgAdmin(PartyOrgAuthRepository partyOrgAuthRepository, PartyEntityRepository partyEntityRepository) {
		String userId = ContextUtil.getCurrentUserId();
		List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
		if(list.size()!=0) return true;
		else return false;
	}
	
	
	
}
