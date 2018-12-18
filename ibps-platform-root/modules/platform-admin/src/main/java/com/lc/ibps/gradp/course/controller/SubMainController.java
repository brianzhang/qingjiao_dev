
package com.lc.ibps.gradp.course.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;
import com.utils.Constants;

/**
 * 学生作业 控制类
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:00:48
 * </pre>
 */
@Controller
@RequestMapping("/gradp/course/subMain/")
public class SubMainController extends GenericController implements Constants{
	@Resource
	PartyEntityRepository partyEntityRepository;
	@Resource
	PartyUserRoleRepository partyUserRoleRepository;
	@Resource
	PartyRoleRepository partyRoleRepository;
	@RequestMapping("redirect")
	public void redirect(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String uid = ContextUtil.getCurrentUserId();
		String url = null;
		if(uid.equals("1")){
			url = __admin_url;
		}else{
			QueryFilter qf = getQuerFilter(request);
			qf.addFilter("user_id_", uid, QueryOP.EQUAL);
			String roleId= partyUserRoleRepository.query(qf).get(0).getRoleID();
			String alias = partyRoleRepository.get(roleId).getRoleAlias();
			switch (alias) {
			case "xs":
			case "student":
				url = __std_url;
				break;
			case "grad_admin":
			case "bs_admin":
				url = __admin_url;
				break;
			default : 
				url = __tch_url; 
			}
		}
		
		String baseUrl = request.getContextPath() + "/gradp/course";
		
		response.sendRedirect(baseUrl+url);
	}
	
}
