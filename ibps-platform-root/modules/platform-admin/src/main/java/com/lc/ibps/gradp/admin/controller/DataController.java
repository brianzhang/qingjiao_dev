
package com.lc.ibps.gradp.admin.controller;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lc.ibps.grads.course.domain.CrsTch;
import com.lc.ibps.org.party.domain.PartyUserRole;
import com.lc.ibps.org.party.persistence.entity.*;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.utils.StringUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.audit.repository.TchLabelRepository;
import com.lc.ibps.gradp.course.Imbort;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.repository.CourseRepository;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsStdRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyLevelRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;
import com.utils.Constants;
import com.utils.FileUtil;

import net.sf.json.JSONObject;

/**
 * 管理员操作 控制类
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
@RequestMapping("/gradp/admin/data/")
public class DataController extends GenericController implements Constants {
	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepository;

    @RequestMapping("listEntityJson")
	public @ResponseBody PageJson listEntityJson(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		int eType = RequestUtil.getInt(request, "eType");
		List<PartyUserRolePo> purps = partyUserRoleRepository.findUserRolesByRoleId(__role_id[eType]);
		List<String> ids = new ArrayList();
		for (PartyUserRolePo purp : purps) {
			String uid = purp.getUserID();
			ids.add(uid);
		}
		
		QueryFilter qf = getQuerFilter(request);
		qf.addFilter("id_", ids, QueryOP.IN);
		PageList<PartyEntityPo> pes = (PageList) partyEntityRepository.query(qf);
		PageList<EntityPo> res = new PageList();
		res.setPageResult(pes.getPageResult());
		EntityPo ep = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for (PartyEntityPo pe : pes) {
			String status = partyEmployeeRepository.get(pe.getId()).getStatus();
			status = "<span style='color:" + ("actived".equals(status) ? "green" : "gray") + "'>" + status + "</span>";
			res.add(new EntityPo(pe.getId(), pe.getAlias(), pe.getName(), status , sdf.format(pe.getCreateTime())));
		}

		return new PageJson(res);
	}

	/**
	 * 返回上传文件页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("imbort")
	public ModelAndView imbort(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// type详见Constants.java
		int type = RequestUtil.getInt(request, "type");
		ModelAndView mv = getAutoView().addObject("dataType", __in_ty[type]).addObject("fields", __in_fields[type])
				.addObject("type", type);
		if(type == TCH_IMPORT_STD){
			String crsTchId	= RequestUtil.getString(request, "crsTchId");
			mv.addObject("crsTchId", crsTchId);
		}
		return mv;
	}

	/**
	 * 导入数据
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("imbortXls")
	public void imbortXls(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		int type = RequestUtil.getInt(request, "type");
		List<Map<String, String>> datas = null;
		JSONObject jo = new JSONObject();
		MultipartFile file = request.getFile("xlsFile");
		InputStream is = file.getInputStream();
		// 根据导入数据类型应用不同字段数组
		String[] fields = __in_fields[type].split(",");
		try {
			datas = FileUtil.parseExcel( is, fields);
		} catch (IllegalArgumentException e) {
			jo.put("success", false);
			jo.put("msg", "请检查xls文件是否符合提示项！");
			response.getWriter().println(jo);
			return;
		}
		String userId = ContextUtil.getCurrentUserId();
		List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
		String orgId="";
		if(list.size()!=0)
		 orgId=list.get(0).getOrgID();
		String tchAlias="";
		
		Map<String,String> manageMsg=new HashMap<>();
		if(type==CRSTCH) {
			for (Map<String,String> data : datas) {
				if(data.get(__crs_manage).equals("管理员")) {
					String term = data.get(__crs_term);
					String tt[] = term.split("-");
					String startTime = null;
					if (tt[2].equals("1"))
						startTime = tt[0] + "-" + SUMMER;
					else if (tt[2].equals("2"))
						startTime = tt[1] + "-" + WINTER;
					startTime += " 00:00:00";
					String mon = data.get(_crs_mon);
					String section = data.get(_crs_section);
					CrsTchPo ctpPo = new CrsTchPo(data.get(__crs_tch_id), data.get(__tch_num),data.get(__crs_name), data.get(__crs_num), term,
							data.get(__crs_time)+"周"+data.get(_crs_mon)+data.get(_crs_section)+"节",data.get(__crs_location), data.get(__crs_class), startTime);//+"周"+data.get(_crs_mon)+data.get(_crs_section)+"节"
					ctpPo.setUniManage(data.get(__crs_tch_id));
					ctpPo.setParamid("");
					manageMsg.put(data.get(__crs_num)+term, data.get(__crs_tch_id));
					//crsTchRepository.newInstance(ctp).save();
					CrsTch ctp = crsTchRepository.newInstance(ctpPo);
					ctp.save();
					
				}
			}
		}
		
		if(type==TEACHER) {
			QueryFilter queryFilter=getQuerFilter(request);
			queryFilter.addFilter("DEPTH_", "2", QueryOP.EQUAL);
			queryFilter.addFilter("PARENT_ID_", orgId,QueryOP.EQUAL);
			queryFilter.addFilter("NAME_", "所有教师", QueryOP.EQUAL);
			List<PartyEntityPo> queryList = partyEntityRepository.query(queryFilter);
			tchAlias=queryList.get(0).getAlias();
		}
		
		Map<String, Object> args = new HashMap();
		args.put("courseRepository" , courseRepository );
		args.put("crsTchRepository" ,crsTchRepository  );
		args.put("crsJobRepository" ,crsJobRepository  );
		args.put("crsStdRepository" ,  crsStdRepository);
		args.put("jobStdRepository" ,jobStdRepository  );
		args.put("partyOrgRepository" ,partyOrgRepository  );
		args.put("partyUserRepository" ,  partyUserRepository);
		args.put("partyRoleRepository" , partyRoleRepository );
		args.put("partyUserRoleRepository" , partyUserRoleRepository);
		args.put("partyEntityRepository" , partyEntityRepository );
		args.put("partyEmployeeRepository" , partyEmployeeRepository );
		args.put("crsTchId" , RequestUtil.getString(request, "crsTchId") );
		args.put("orgId" , orgId);
		args.put("alias", tchAlias);
		args.put("manageMsg",manageMsg);
		args.put("urlZhiYuanRepository",urlZhiYuanRepository);
		
		ExecutorService pool = Executors.newFixedThreadPool(9);
		for(Map data : datas)
			pool.submit(new Imbort(type,data , args));


		jo.put("success", true);
		jo.put("msg", "上传成功！");
		response.getWriter().println(jo);
}

	@RequestMapping("removeEntity")
	public void removeEntity(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String type = RequestUtil.getString(request, "type");
		try {
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			for (String id : ids) {
				PartyEmployeePo pep = partyEmployeeRepository.get(id);
				pep.setStatus(type);
				partyEmployeeRepository.newInstance(pep).save();
			}
			message = new ResultMessage(ResultMessage.SUCCESS, "操作成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "操作成功，" + e.getMessage());
			logger.error("操作成功，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	@RequestMapping("addBisheRole")
	public void addBisheRole(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.findAll();
		if(urlZhiYuanPos.size()!=0){
			for(UrlZhiYuanPo urlZhiYuanPo : urlZhiYuanPos){
				String xh = urlZhiYuanPo.getXh();
				if(StringUtils.isNotEmpty(xh)){
					PartyUserPo partyUserPo = partyUserRepository.getByAccount(xh);
					PartyUserRolePo partyUserRolePo = new PartyUserRolePo();
					partyUserRolePo.setUserID(partyUserPo.getUserId());
					partyUserRolePo.setRoleID("367325571757113344");
					PartyUserRole partyUserRole = partyUserRoleRepository.newInstance(partyUserRolePo);
					partyUserRole.create();
				}

			}
			message = new ResultMessage(ResultMessage.SUCCESS, "操作成功");
			writeResultMessage(response.getWriter(), message);
		}
	}
	
	

	@Resource
	CourseRepository courseRepository;
	@Resource
	CrsTchRepository crsTchRepository;
	@Resource
	CrsStdRepository crsStdRepository;
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	PartyUserRepository partyUserRepository;
	@Resource
	PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;
	@Resource
	PartyRoleRepository partyRoleRepository;
	@Resource
	PartyUserRoleRepository partyUserRoleRepository;
	@Resource
	PartyOrgRepository partyOrgRepository;
	@Resource
	PartyLevelRepository partyLevelRepository;
	@Resource
	PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	TchLabelRepository tchLabelRepository;

}

class EntityPo {
	public EntityPo(String id, String num, String name, String status, String createTime) {
		setId(id);
		setNum(num);
		setName(name);
		setStatus(status);
		setCreateTime(createTime);
	}

	String id;
	String num;
	String name;
	String status;
	String createTime;

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	

}