package com.lc.ibps.gradp.course;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.commons.lang3.StringUtils;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.org.constant.GroupStatus;
import com.lc.ibps.api.org.constant.PartyType;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;
import com.lc.ibps.bishes.audit.repository.TchLabelRepository;
import com.lc.ibps.grads.course.persistence.entity.CoursePo;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.repository.CourseRepository;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsStdRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.org.party.domain.PartyOrg;
import com.lc.ibps.org.party.domain.PartyUserRole;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgPo;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;
import com.lc.ibps.org.party.persistence.entity.PartyUserPo;
import com.lc.ibps.org.party.persistence.entity.PartyUserRolePo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyOrgRepository;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.utils.Constants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Imbort implements Runnable, Constants {
	protected Logger logger = LoggerFactory.getLogger(this.getClass());
	Map<String, String> data;
	int type;
	Map<String, Object> args;

	public Imbort(int type, Map<String, String> data, Map args) {
		this.type = type;
		this.data = data;
		this.args = args;
	}

	@Override
	public void run() {
		switch (type) {
		case COURSE:
			String _crsNum = data.get(__crs_num);

			if( "201406421".equals( _crsNum )){
					System.out.println("==========================================================================haerbinhaerbin");
			}
			try {
				AtomicLong count = new AtomicLong(0);

				CoursePo cp = new CoursePo(data.get(__crs_num), data.get(__crs_name), data.get(__crs_period),
						data.get(__crs_credit), data.get(__crs_category), data.get(__crs_method),
						data.get(__crs_college));
				cp.setOrgId((String) args.get("orgId"));
				Map<String, String> arg = new HashMap();
				arg.put("num =", data.get(__crs_num));
				CoursePo cpt = null;
				cpt = ((CourseRepository) args.get("courseRepository")).getByCol(arg);
				if (cpt == null)
					((CourseRepository) args.get("courseRepository")).newInstance(cp).save();
				else
					count.incrementAndGet();
					System.out.println("已存在：" + arg +"数量："+count);
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
			if( "201406115".equals( _crsNum )){
				System.out.println("==========================================================================");
			}
			break;
		case TEACHER:
			break;
		case STUDENT:
			List<Map<String, String>> datas = new ArrayList<>();
			datas.add(data);
			List<Map<String, String>> ref = new ArrayList();
			partyOrgRepository = (PartyOrgRepository) args.get("partyOrgRepository");
			partyUserRepository = (PartyUserRepository) args.get("partyUserRepository");
			partyEmployeeRepository = (PartyEmployeeRepository) args.get("partyEmployeeRepository");
			partyEntityRepository = (PartyEntityRepository) args.get("partyEntityRepository");
			do {
				for (Map<String, String> data : datas) {
					boolean isStd = data.containsKey(__std_num);
					String account = isStd ? data.get(__std_num) : data.get(__tch_num);
					String name = isStd ? data.get(__std_name) : data.get(__tch_name);
					name = name.replaceAll(" ", "");

					try {
						if (account.contains(",")) {
							String[] astr = account.split(","), nstr = name.split(",");
							Map<String, String> temp = null;
							for (int i = 1; i < astr.length; ++i) {
								temp = new HashMap(data);
								temp.put(__tch_num, astr[i]);
								temp.put(__tch_name, nstr[i]);
								ref.add(temp);
							}
							account = account.split(",")[0];
							name = name.split(",")[0];
						}
						if (partyUserRepository.getByAccount(account) != null)
							continue;
						String role = isStd ? "student" : "teacher";
						PartyUserPo pup = new PartyUserPo();
						pup.setAccount(account);
						pup.setPassword(account.substring(account.length() - 6));
						pup.setDataCheck("1");
						pup.setIsSuper('N');
						pup.setCreateTime(new Date());
						partyUserRepository.newInstance(pup).save();

						String uid = pup.getId();
						PartyRolePo partyRolePo = ((PartyRoleRepository) args.get("partyRoleRepository"))
								.getRoleByRoleAlias(role);
						String roleId = partyRolePo.getId();
						PartyUserRolePo partyUserRolePo = new PartyUserRolePo();
						partyUserRolePo.setRoleID(roleId);
						partyUserRolePo.setUserID(uid);
						((PartyUserRoleRepository) args.get("partyUserRoleRepository")).newInstance(partyUserRolePo)
								.save();

						// Party-Employee
						pemp = new PartyEmployeePo();
						pemp.setId(uid);
						pemp.setName(name);
						pemp.setAlias(account);
						pemp.setStatus("actived");
						pemp.setPositions("");
						pemp.setGender("male");
						pemp.setEmail("0@qq.com");
						pemp.setCreateTime(new Date());
						((PartyEmployeeRepository) args.get("partyEmployeeRepository")).newInstance(pemp).create();
						if (data.containsKey(__std_num)) {
							stdNum = data.get(__std_num);
							stdClass = data.get(__std_class);
							pop = partyOrgRepository.getByAlias(stdClass);
							pemp = partyEmployeeRepository.get(partyUserRepository.getByAccount(stdNum).getId());
						} else {
							pop = partyOrgRepository.getByAlias((String) args.get("alias"));
							pemp = partyEmployeeRepository
									.get(partyUserRepository.getByAccount(data.get(__tch_num)).getId());
						}

						gid = pop.getId();
						pemp.setGroupID(gid);
						partyEmployeeRepository.newInstance(pemp).save();
					} catch (Exception e) {
					}

				}

				datas = ref;
				ref = new ArrayList();
			} while (!datas.isEmpty());
			break;
		case CRSTCH:
			String tchNum = data.get(__tch_num);
			if(tchNum.contains(",")) break;
			if(((PartyUserRepository) args.get("partyUserRepository")).getByAccount(tchNum) == null) break;
			String term = data.get(__crs_term);
			String crsNum = data.get(__crs_num);
			Map<String, String> manageMsg=(Map<String, String>) args.get("manageMsg");
			CrsTchPo po=null;
			//处理如毕业设计一类由管理者统一发布课程--管理者
			if(manageMsg.containsKey(crsNum+term)&&manageMsg.get(crsNum+term)==data.get(__crs_tch_id)) break;
			boolean manageChild=false;
			if(manageMsg.containsKey(crsNum+term)&&manageMsg.get(crsNum+term)!=data.get(__crs_tch_id)) manageChild=true;
			else {
				Map<String, String> temp =new HashMap<>();
				temp.put("term=", term);
				temp.put("crs_num=", crsNum);
				temp.put("uni_manage=", "t_crs_tch.id_crs_tch");
				po = ((CrsTchRepository)args.get("crsTchRepository")).getByCol(temp);
				if(po!=null) {
					manageChild=true;
					manageMsg.put(crsNum+term, po.getId());
				}
			}
			if (((CrsTchRepository) args.get("crsTchRepository")).get(data.get(__crs_tch_id)) == null) {
				try {
					
					String tt[] = term.split("-");
					String startTime = null;
					if (tt[2].equals("1"))
						startTime = tt[0] + "-" + SUMMER;
					else if (tt[2].equals("2"))
						startTime = tt[1] + "-" + WINTER;
					startTime += " 00:00:00";
					CrsTchPo ctp = new CrsTchPo(data.get(__crs_tch_id), tchNum,data.get(__crs_name), crsNum, term,
							data.get(__crs_location), data.get(__crs_time), data.get(__crs_class), startTime);
					if(manageChild) {
						ctp.setUniManage(manageMsg.get(crsNum+term));
					}
					((CrsTchRepository) args.get("crsTchRepository")).newInstance(ctp).save();
				} catch (Exception e) {
					logger.error("1111---" + e.getMessage());
				}
			} else {
				logger.error("已存在：" + data.get(__crs_tch_id));
			}
			break;
			case CRSSTD:
				break;
           // 导入学生上课表，如果该课程已经有作业，则添加至该学生
			case TCH_IMPORT_STD:
				try {
				//String crsTchId = (String) (data.containsKey(__crs_tch_id) ? data.get(__crs_tch_id)
					//	: args.get("crsTchId"));
				String crsTchId = (String)args.get("crsTchId");
				CrsTchPo ctp = ((CrsTchRepository) args.get("crsTchRepository")).get(crsTchId);
				Map<String, String> arg = new HashMap<>();
				arg.put("std_num =", data.get(__std_num));
				arg.put("crs_tch_id =", crsTchId);
				if (((CrsStdRepository) args.get("crsStdRepository")).getByCol(arg) == null) {
					((CrsStdRepository) args.get("crsStdRepository"))
							.newInstance(new CrsStdPo(data.get(__std_num), ctp.getId())).save();

					JobStdPo jsp = null;
					arg.remove("std_num =");
					List<CrsJobPo> cjps = ((CrsJobRepository) args.get("crsJobRepository")).findByCol(arg);
					for (CrsJobPo cjp : cjps)
						((JobStdRepository) args.get("jobStdRepository"))
								.newInstance(new JobStdPo(cjp.getId(), data.get(__std_num))).save();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			break;
		case UDGRAD_STD:
			partyUserRepository = (PartyUserRepository) args.get("partyUserRepository");
			partyUserRoleRepository = (PartyUserRoleRepository) args.get("partyUserRoleRepository");
			partyEntityRepository = (PartyEntityRepository) args.get("partyEntityRepository");
			partyOrgRepository = (PartyOrgRepository) args.get("partyOrgRepository");
			urlZhiYuanRepository = (UrlZhiYuanRepository) args.get("urlZhiYuanRepository");
			partyEmployeeRepository = (PartyEmployeeRepository) args.get("partyEmployeeRepository");
			String account = data.get(__std_num);
			System.out.println(account);
			PartyUserPo partyUserPo = partyUserRepository.getByAccount(account);
			String id = partyUserPo.getId();
			PartyEmployeePo partyEmployeePo = partyEmployeeRepository.get(id);
			String org = partyEmployeePo.getGroupID();
			String name = partyEmployeePo.getName();
			PartyOrgPo partyOrgPo = partyOrgRepository.get(org);
			String classr = partyOrgPo.getOrgAlias();
			UrlZhiYuanPo urlZhiYuanPo = new UrlZhiYuanPo();
			urlZhiYuanPo.setName(name);
			urlZhiYuanPo.setXh(account);
			urlZhiYuanPo.setClassr(classr);
			urlZhiYuanPo.setOrgId((String)args.get("orgId")); //区分院系
			UrlZhiYuan urlzhiyuan = urlZhiYuanRepository.newInstance(urlZhiYuanPo);
			urlzhiyuan.save();
			String userId = partyUserPo.getId();
			PartyUserRolePo partyUserRolePo = new PartyUserRolePo();
			partyUserRolePo.setUserID(userId);
			partyUserRolePo.setRoleID("367325571757113344");
			PartyUserRole partyUserRole = partyUserRoleRepository.newInstance(partyUserRolePo);
			partyUserRolePo.setId(partyUserRole.getIdGenerator().getId());
			partyUserRole.save();
			break;
		case UDGRAD_TCH:
			partyUserRepository = (PartyUserRepository) args.get("partyUserRepository");
			partyUserRoleRepository = (PartyUserRoleRepository) args.get("partyUserRoleRepository");
			String accounts = data.get(__tch_num);
			PartyUserPo partyUserPos = partyUserRepository.getByAccount(accounts);
			String userIds = partyUserPos.getId();
			PartyUserRolePo partyUserRolePos = new PartyUserRolePo();
			partyUserRolePos.setUserID(userIds);
			partyUserRolePos.setRoleID("372033281199177728");
			PartyUserRole partyUserRoles = partyUserRoleRepository.newInstance(partyUserRolePos);
			partyUserRolePos.setId(partyUserRoles.getIdGenerator().getId());
			partyUserRoles.save();
			
			//建立毕设教师标签表 todo
			tchLabelRepository = (TchLabelRepository)args.get("tchLabelRepository");
			TchLabelPo tchLabelPo = new TchLabelPo();
			tchLabelPo.setId(userIds);
			tchLabelPo.setOrgId((String)args.get("orgId"));
			tchLabelRepository.newInstance(tchLabelPo).save();

			break;

		case 12:
			partyUserRepository = (PartyUserRepository) args.get("partyUserRepository");
			partyUserRoleRepository = (PartyUserRoleRepository) args.get("partyUserRoleRepository");
			String accountss = data.get(__tch_num);
			PartyUserPo partyUserPoss = partyUserRepository.getByAccount(accountss);
			String userIdss = partyUserPoss.getId();
			PartyUserRolePo partyUserRolePoss = new PartyUserRolePo();
			partyUserRolePoss.setUserID(userIdss);
			partyUserRolePoss.setRoleID("379636768250527744");
			PartyUserRole partyUserRoless = partyUserRoleRepository.newInstance(partyUserRolePoss);
			partyUserRolePoss.setId(partyUserRoless.getIdGenerator().getId());
			partyUserRoless.create();

			break;

		case MORE_INFO_S:
			break;
		case MORE_INFO_T:
			partyOrgRepository = (PartyOrgRepository) args.get("partyOrgRepository");
			partyUserRepository = (PartyUserRepository) args.get("partyUserRepository");
			partyEmployeeRepository = (PartyEmployeeRepository) args.get("partyEmployeeRepository");
			if (data.containsKey(__std_num)) {
				stdNum = data.get(__std_num);
				stdClass = data.get(__std_class);
				pop = partyOrgRepository.getByAlias(stdClass);
				pemp = partyEmployeeRepository.get(partyUserRepository.getByAccount(stdNum).getId());
			} else {
				pop = partyOrgRepository.getByAlias("qjjs");
				pemp = partyEmployeeRepository.get(partyUserRepository.getByAccount(data.get(__tch_num)).getId());
			}

			gid = pop.getId();
			pemp.setGroupID(gid);
			partyEmployeeRepository.newInstance(pemp).save();
			break;
		case ORG:
			stdClass = data.get(__std_class);
			partyOrgRepository = (PartyOrgRepository) args.get("partyOrgRepository");
			partyEntityRepository = (PartyEntityRepository) args.get("partyEntityRepository");
			pop = partyOrgRepository.getByAlias(stdClass);
			if (pop == null) {
				try {
					year = stdClass.substring(0, 4);
					DefaultQueryFilter filter = new DefaultQueryFilter();
					String whereSql = "NAME_=" +year+" AND PATH_ LIKE '"+(String) args.get("orgId")+"%'";
					filter.addParamsFilter("whereSql", whereSql);
					List<PartyEntityPo> query = partyEntityRepository.query(filter);
					PartyEntityPo po2 = query.get(0);
					/*if (po2 == null) {
						pop = new PartyOrgPo();
						pop.setName(year);
						pop.setOrgAlias(year);
						pid = partyEntityRepository.getByAliasPartyType("qjxs", "org").getId();
						pop.setParentId(pid);
						pop.setDepth(2);
						pop.setPartyType(PartyType.org);
						pop.setStatus(GroupStatus.actived);
						partyOrgRepository.newInstance(pop).save();
					}*/
					if(po2!=null) {
						pop = new PartyOrgPo();
						pop.setName(stdClass);
						pop.setOrgAlias(stdClass);
						pop.setParentId(po2.getId());
						pop.setDepth(3);
						pop.setPartyType(PartyType.ORG.getLabel());
						pop.setStatus(GroupStatus.ACTIVED.getLabel());
						partyOrgRepository.newInstance(pop).save();
					}
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		default:
			break;
		}
	}

	PartyOrg partyOrg;
	PartyEntityPo penp;
	PartyEntityRepository partyEntityRepository;
	PartyOrgRepository partyOrgRepository;
	PartyUserRepository partyUserRepository;
	PartyEmployeeRepository partyEmployeeRepository;
	PartyUserRoleRepository partyUserRoleRepository;
	UrlZhiYuanRepository urlZhiYuanRepository;
	TchLabelRepository tchLabelRepository;
	PartyOrgPo pop;
	PartyEmployeePo pemp;
	String gid;
	String year;
	String stdClass;
	String pid;
	String stdNum;
}
