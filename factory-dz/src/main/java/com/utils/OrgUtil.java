package com.utils;

import java.util.List;

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;
import com.lc.ibps.bishes.audit.repository.TchLabelRepository;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;

public class OrgUtil {

	public static String getOrgId(CurrentContext currentContext,TchLabelRepository tchLabelRepository, PartyOrgAuthRepository partyOrgAuthRepository) {
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return "";
			}else {
				orgId = partyOrgAuthPos.get(0).getOrgID();
			}
		}
		return orgId;
	}
	
	public static String getOrgId(CurrentContext currentContext, PartyOrgAuthRepository partyOrgAuthRepository) {
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
		if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
			return "";
		}else {
			orgId = partyOrgAuthPos.get(0).getOrgID();
		}
		return orgId;
	}
}
