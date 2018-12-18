package com.lc.ibps.web.context;

import java.util.Locale;

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.PartyEntity;
import com.lc.ibps.api.base.model.User;

public class ApiContext implements CurrentContext {

	@Override
	public User getCurrentUser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getCurrentUserIp() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getCurrentUserId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getCurrentUserAccount() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getCurrentUserFullName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PartyEntity getCurrentOrg() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PartyEntity getCurrentPosition() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void clearCurrentUser() {
		// TODO Auto-generated method stub

	}

	@Override
	public void setCurrentUser(User user) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setCurrentUserIp(String ip) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setCurrentOrg(PartyEntity org) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setCurrentPosition(PartyEntity position) {
		// TODO Auto-generated method stub

	}

	@Override
	public Locale getLocale() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setLocale(Locale local) {
		// TODO Auto-generated method stub

	}

	@Override
	public void clearLocale() {
		// TODO Auto-generated method stub

	}

	@Override
	public String getCurrentAccessToken() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setCurrentAccessToken(String accessToken) {
		// TODO Auto-generated method stub
		
	}

}
