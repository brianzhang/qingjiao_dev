
package com.lc.ibps.bishe.groupuser.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.page.PageResult;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.groupuser.repository.GroupUserRepository;
import com.lc.ibps.bishes.labelType.repository.LabelTypeRepository;
import com.lc.ibps.form.form.repository.FormDefRepository;
import com.lc.ibps.org.party.domain.PartyEmployee;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.raq.expression.function.New;
import com.utils.List2SqlList;
import com.utils.OrgUtil;

import ex.scala.utils4j.ExMap;

import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;
import com.lc.ibps.bishes.audit.repository.LabelDefRepository;
import com.lc.ibps.bishes.audit.repository.TchLabelRepository;
import com.lc.ibps.bishes.group.domain.GradGroup;
import com.lc.ibps.bishes.group.persistence.entity.GradGroupPo;
import com.lc.ibps.bishes.group.repository.GradGroupRepository;
import com.lc.ibps.bishes.groupuser.domain.GroupUser;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import scala.util.parsing.combinator.testing.Str;


/**
 * t_group_user 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:42
 *</pre>
 */
@Controller
@RequestMapping("/bishe/groupuser/groupUser/")
public class GroupUserController extends GenericController{
	@Resource
	private GroupUserRepository groupUserRepository;
	@Resource
	private UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	private TchLabelRepository tchLabelRepository;
	@Resource
	private PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	private GradGroupRepository gradGroupRepository;
	@Resource
	PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	CurrentContext currentContext;
	@Resource
	LabelDefRepository labelDefRepository;
//	@Resource
//	private FormFieldRepository FormFiledRepository;
	
	public static HashMap<String, Map<String,Map<String, Integer>>> orgStuTchMap = new  HashMap<>(); //学生候选评审教师
	
	static Map<String, List<String>> groupTypeMap = new HashMap<>(); // 小组类型词典
	
	static Map<String , Map<String, String[]>> orgTchLabelMap = new HashMap<>();  //教师标签情况
	
	static Map<String , Map<String, Map<String, Float>>> orgGroupLabelMap = new HashMap<>(); //小组标签情况
	
	//List<String[]> zqList = new ArrayList<>();   //当前中期分配情况  xx同学是xx组
	
	Map<String, String> zqMap = new HashMap<>(); //当前中期分配情况  xx同学是xx组
	Map<String, String> dbMap = new HashMap<>(); //当前答辩分配情况  xx同学是xx组
	
	//List<String[]> preZqList = new ArrayList<>();   //中期预分配情况
	
	Map<String, String> preZqMap = new HashMap<>(); //中期预分配情况
	Map<String, String> preDbMap = new HashMap<>(); //答辩预分配情况
	
	Map<String, Set<String>> zqBatchMap = new HashMap<>(); // 中期分配批次记录表   xx批次有哪些论文
	Map<String, Set<String>> dbBatchMap = new HashMap<>(); // 答辩分配批次记录表   xx批次有哪些论文
	
	Map<String, Set<String>> zqBatchEnableMap = new HashMap<>(); // 中期分配批次记录表   xx批次有哪些论文可分配
	Map<String, Set<String>> dbBatchEnableMap = new HashMap<>(); // 答辩分配批次记录表   xx批次有哪些论文可分配
	
	List<String[]> dbList = new ArrayList<>();   //答辩分配情况
	
	Map<String, List<String>> groupTchMap = new HashMap<>(); // 小组教师情况   避免指导教师
	
	Map<String, Set<String>> groupStuhMap = new HashMap<>(); // 当前小组学生情况  xx小组有x个学生

	Map<String, Set<String>> groupStuhMapForDb = new HashMap<>(); // 答辩小组第一候选人

	Map<String, Set<String>> groupStuhMapForNo = new HashMap<>(); // 答辩小组教师的指导学生集合

	Set<String> visualStu = new HashSet<>();

	//Map<String,Set<String>> groupAllotStuMapForDb = new HashMap<>();

	Map<String,Map<String,Set<String>>> groupAllotStuMapForDb = new HashMap<>(); //过滤器：当前为完成答辩却已被分配的学生
	//Map<String, Integer> preGroupStuhMap = new HashMap<>(); // 小组学生预分配情况
	
//	Map<String, String> perStuGrouMap = new HashMap<>();  // 学生小组预分配情况
	
	
	
	/**
	 * 抽取列表  显示当前批次抽取的学生
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonForNo")
	public @ResponseBody PageJson listJsonForNo(HttpServletRequest request,HttpServletResponse reponse) throws Exception{

		String flag = RequestUtil.getString(request, "flag");
		QueryFilter queryFilter=getQuerFilter(request);

		String type = "";
		String batchSql = "";
		String typeFlag = RequestUtil.getString(request, "typeFlag");

		String curBatch = RequestUtil.getString(request, "curBatch");
		curBatch = new String(curBatch.getBytes("iso-8859-1"), "utf-8");

		if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
			System.out.println("小组类型不对");
			logger.error("小组类型不对");
			//throw new Exception("小组类型不对");
			return new PageJson(null);
		}
		if ("1".equals(typeFlag)) {
			type = "中期";
			batchSql = "zq_batch_ = '" + curBatch +"'";
		}
		if ("2".equals(typeFlag)) {
			type = "答辩";
			batchSql = "db_batch_ = '" + curBatch +"'";
		}

		List<String> groups = groupTypeMap.get(type);

		//初次初始化抽签列表
		if ("1".equals(flag)){
			visualStu.clear();
			//已完成答辩的学生可视化
			String whereSql = "db_batch_ = '" + curBatch +"' and db_result_ = '完成'";
			List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
			if (urlZhiYuanPos == null || urlZhiYuanPos.size() == 0){
				PageJson emptyPageJson = new PageJson();
				return emptyPageJson;
			}else {
				List<String> stulList1 = new ArrayList<>();
				for (UrlZhiYuanPo e : urlZhiYuanPos) {
					stulList1.add(e.getId());
					visualStu.add(e.getId());
				}
				queryFilter.addFilter("user_id_ ", stulList1, QueryOP.IN);
				queryFilter.addFilter("group_id_ ", groups, QueryOP.IN);
				PageList<GroupUserPo> userPos = (PageList<GroupUserPo>) groupUserRepository.query(queryFilter);
				for (GroupUserPo e : userPos) {
					e.setUserName( urlZhiYuanRepository.get(e.getUserId()).getName() );
					e.setGroupName( gradGroupRepository.get(e.getGroupId()).getName()  );
					e.setGroupPlace(gradGroupRepository.get(e.getGroupId()).getPlace());
					if ("2".equals(typeFlag)) {
						e.setDbStatus(  urlZhiYuanRepository.get(e.getUserId()).getDbResult() );
					}else {
						e.setDbStatus(  urlZhiYuanRepository.get(e.getUserId()).getZqResult() );
					}
				}
				return new PageJson(userPos);
			}

		}

		//type = new String(type.getBytes("iso-8859-1"), "utf-8");	

		List<String> stulList = new ArrayList<>();
		if ("2".equals(typeFlag)) {
			for (String e:visualStu){
				stulList.add(e);
			}
		}else {
			List<UrlZhiYuanPo> stus = urlZhiYuanRepository.getBySql(batchSql);
			for (UrlZhiYuanPo e : stus) {
				stulList.add(e.getId());
			}
		}
		if (stulList.size() == 0){
			PageJson emptyPageJson = new PageJson();
			return emptyPageJson;
		}
		queryFilter.addFilter("user_id_ ", stulList, QueryOP.IN);
		queryFilter.addFilter("group_id_ ", groups, QueryOP.IN);
//		String whereSql = "user_id_ in " + List2SqlList.parse(stulList) + "and group_id_ in " + List2SqlList.parse(groups);
//		List<GroupUserPo> userPos = groupUserRepository.getBySql(whereSql);
//		PageList<GroupUserPo> groupUserPos = new PageList<>(new PageResult(1,userPos.size(),userPos.size()));
		PageList<GroupUserPo> userPos = (PageList<GroupUserPo>) groupUserRepository.query(queryFilter);
		// id==>中文    教师是userid 论文是学生的urlId  填充groupName
		for (GroupUserPo e : userPos) {
			e.setUserName( urlZhiYuanRepository.get(e.getUserId()).getName() );
			e.setGroupName( gradGroupRepository.get(e.getGroupId()).getName()  );
			e.setGroupPlace(gradGroupRepository.get(e.getGroupId()).getPlace());
			if ("2".equals(typeFlag)) {
				e.setDbStatus(  urlZhiYuanRepository.get(e.getUserId()).getDbResult() );
			}else {
				e.setDbStatus(  urlZhiYuanRepository.get(e.getUserId()).getZqResult() );
			}
		}
		//将未答辩的登顶显示
		PageList<GroupUserPo> userPos1 = new PageList<>();
		for (GroupUserPo e : userPos){
			if ("未答辩".equals(e.getDbStatus())){
				userPos1.add(0,e);
			}else {
				userPos1.add(e);
			}
		}
		userPos1.setPageResult(userPos.getPageResult());
		return new PageJson(userPos1);
	}
	
	@RequestMapping("drawLots")
	public ModelAndView drawLots(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//1 : 中期   2 : 答辩 
		//String type = RequestUtil.getString(request, "type");  //中期还是答辩
		String orgId = OrgUtil.getOrgId(currentContext,partyOrgAuthRepository);
		int type = RequestUtil.getInt(request, "type");
		String typeStr = "";
		String whereSql = "orgId = '" + orgId + "'";
		List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
		Set<String> batchSet = new HashSet<>();
		if (type == 1) {
			typeStr = "中期";
			for (UrlZhiYuanPo e: urlZhiYuanPos) {
				if (StringUtils.isNotBlank(e.getZqBatch()))
					batchSet.add(e.getZqBatch());
			}
		}
		if (type == 2) {
			typeStr = "答辩";
			for (UrlZhiYuanPo e: urlZhiYuanPos) {
				if (StringUtils.isNotBlank(e.getDbBatch()))
					batchSet.add(e.getDbBatch());
			}
		}
		List<String> batchList = new ArrayList<>(batchSet);
		//type = new String(type.getBytes("iso-8859-1"), "utf-8");

		return getAutoView().addObject("type", typeStr).addObject("typeFlag",type).addObject("batchList",batchList);
	}

	//答辩抽签界面
	@RequestMapping("listForAppoint")
	public ModelAndView listForAppoint(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//1 : 中期   2 : 答辩
		String typeStr = "答辩";
		String userId = RequestUtil.getString(request,"userId");
		return getAutoView().addObject("type", typeStr).addObject("userId",userId);
	}
	
	@RequestMapping("setdbStatus")
	public void setdbStatus(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//data:{"userId":userId, "result":result,"type":type},
		JSONObject jo = new JSONObject();
		String stuId = request.getParameter("userId");
		String result = request.getParameter("result");
		String typeFlag = request.getParameter("typeFlag");
		String curBatch = request.getParameter("curBatch");
		String groupId = request.getParameter("groupId");
		if ("1".equals(typeFlag)) {
			UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(stuId);
			urlZhiYuanPo.setZqResult(result);
			urlZhiYuanRepository.newInstance(urlZhiYuanPo).save(); 
			jo.put("status", true);
			jo.put("msg", urlZhiYuanPo.getName() + result + "答辩");
		}
		if ("2".equals(typeFlag)) {
			UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(stuId);
			urlZhiYuanPo.setDbResult(result);
			//缺席者回归到可分配队列 并且从小组中删除
			if ("缺席".equals(result)){
				visualStu.remove(urlZhiYuanPo.getId());
				dbBatchEnableMap.get(curBatch).add(urlZhiYuanPo.getId());
				String whereSql = "user_id_ = '" + urlZhiYuanPo.getId() + "' and group_id_ = '" + groupId + "'";
				List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(whereSql);
				GroupUser groupUser =groupUserRepository.newInstance();
				for (GroupUserPo e : groupUserPos){
					groupUser.delete(e.getId());
				}
				urlZhiYuanPo.setDbResult("未答辩");
			}
			urlZhiYuanRepository.newInstance(urlZhiYuanPo).save();
			jo.put("status", true);
			jo.put("msg", urlZhiYuanPo.getName() + result + "答辩");
		}
		response.getWriter().println(jo);
	}

	
	/*
	 * 为小组分配学生  并持久化
	 */
	@RequestMapping("allotStuForGroup")
	public void allotStuForGroup(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();

		try {
			// orgId 学院给  type 类型的 groupIds 小组分配第 curBatch 批学生  分numBatch轮   可分配的学生 zqBatchEnableMap.get(curBatch)
			String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
			
			String type = "";
			String typeFlag = request.getParameter("typeFlag");
			if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
		        jo.put("status", false);
		        jo.put("msg", "小组类型错误");
		        response.getWriter().println(jo);
		        return;
			}
			//中期
			if ("1".equals(typeFlag)) {
				String curBatch = request.getParameter("curBatch");
				String numBatch = request.getParameter("numBatch");
				String[] groupIds = request.getParameter("groupId").split(",");
				Set<String> enableAllotStu = zqBatchEnableMap.get(curBatch);
				if (zqBatchEnableMap.get(curBatch).size() == 0) {
					jo.put("status", false);
					jo.put("msg", "人员已被抽取完");
					response.getWriter().println(jo);
					return;
				}
				List<String> groupList = new ArrayList<>();
				for (String e : groupIds) {
					groupList.add(e);
				}
				Map<String, Set<String>>  drawLotsResult = drawLotsForGroup(groupList, numBatch, enableAllotStu,typeFlag);
				if (drawLotsResult == null) {
					jo.put("status", false);
					jo.put("msg", "论数过大，人员不够");
					response.getWriter().println(jo);
					return;
				}
				for (String es : drawLotsResult.keySet()) {
					(zqBatchEnableMap.get(curBatch)).removeAll(drawLotsResult.get(es));
				}
				//持久化抽签结果
			    for (String es : drawLotsResult.keySet()) {
					for (String e : drawLotsResult.get(es)) {
						GroupUserPo groupUserPo = new GroupUserPo();
						groupUserPo.setUserId(e);
						groupUserPo.setGroupId(es);
						groupUserPo.setType("stu");
						groupUserRepository.newInstance(groupUserPo).save();
					}
				}
				JSONObject aa = JSONObject.fromObject(drawLotsResult);
				jo.put("status", true);
				jo.put("msg", (zqBatchEnableMap.get(curBatch)).size());
			}
			//答辩
			if ("2".equals(typeFlag)) {
				String curBatch = request.getParameter("curBatch");
				String numBatch = request.getParameter("numBatch");
				String[] groupIds = request.getParameter("groupId").split(",");
				Set<String> enableAllotStu = dbBatchEnableMap.get(curBatch);

				String totalNumBatch = request.getParameter("totalNumBatch");
				Integer totalNum = Integer.valueOf(totalNumBatch);

				if (totalNum == visualStu.size()){
					jo.put("status", false);
					jo.put("msg", "人员已被抽取完");
					response.getWriter().println(jo);
					return;
				}
//				if (dbBatchEnableMap.get(curBatch).size() == 0) {
//					jo.put("status", false);
//					jo.put("msg", "人员已被抽取完");
//					response.getWriter().println(jo);
//					return;
//				}
				List<String> groupList = new ArrayList<>();
				for (String e : groupIds) {
					groupList.add(e);
				}
				Map<String, Set<String>>  drawLotsResult = drawLotsForGroupForDb(groupList, numBatch, enableAllotStu,totalNumBatch,curBatch);
				if (drawLotsResult == null) {
					jo.put("status", false);
					jo.put("msg", "轮数过大，人员不够");
					response.getWriter().println(jo);
					return;
				}
				for (String es : drawLotsResult.keySet()) {
					(dbBatchEnableMap.get(curBatch)).removeAll(drawLotsResult.get(es));
				}
				//持久化抽签结果
			    for (String es : drawLotsResult.keySet()) {
					if (drawLotsResult.get(es) != null && drawLotsResult.get(es).size() > 0){
						for (String e : drawLotsResult.get(es)) {
							GroupUserPo groupUserPo = new GroupUserPo();
							groupUserPo.setUserId(e);
							groupUserPo.setGroupId(es);
							groupUserPo.setType("stu");
							groupUserRepository.newInstance(groupUserPo).save();
						}
					}
				}
				JSONObject aa = JSONObject.fromObject(drawLotsResult);
				jo.put("status", true);
				jo.put("msg", (dbBatchEnableMap.get(curBatch)).size());
			}

		} catch (Exception e) {
			logger.error(e.getMessage());
			System.out.println(e.getMessage());
			jo.put("status", false);
			jo.put("msg", "抽签失败，联系开发者");
		}
		response.getWriter().println(jo);
	}
	
	
	//基本思路 小组 --> 人    groupList:将要分配的小组   numBatch：每个小组分配的人数  enableAllotStu：可分配的学生
	private Map<String, Set<String>> drawLotsForGroup(List<String> groupList, String numBatch, Set<String> enableAllotStu,String typeFlag) {

		//制作小组显示分数词典
		Map<String,Integer> groupVisualNumMap = new HashMap<>();


		if (groupList.size() * Integer.parseInt(numBatch) > enableAllotStu.size()) {
			return null;
		}
		Map<String, Set<String>> temGroupStuMap = new HashMap<>();  //某下组在n批次下最理想的学生候选人
		Map<String, Set<String>> temGroupNumMap = new HashMap<>();  //该批次下n轮分配情况     xx小组对应xx学生集合 （存储最终分配的结果）
		//得到该批次各个小组合适的人
		Set<String> cjStuSet = new HashSet<>();   //差集  该批次下不适合所选小组的学生
		cjStuSet.clear();
		cjStuSet.addAll(enableAllotStu);
		for (String es : groupList) {
			Set<String> temStuSet = new HashSet<>();			
			Set<String> temStuSet1 = new HashSet<>();
			temStuSet.clear();			
			temStuSet.addAll(enableAllotStu);
			temStuSet.retainAll(groupStuhMap.get(es));
			cjStuSet.removeAll(groupStuhMap.get(es));
			temGroupStuMap.put(es, temStuSet);
			temGroupNumMap.put(es, temStuSet1);
		}


		//得到
		
		while (true) {
			if (enableAllotStu.size() == 0) {
				break;
			}
	        //将map.entrySet()转换成list  
	        List<Map.Entry<String, Set<String>>> list = new ArrayList<Map.Entry<String, Set<String>>>(temGroupStuMap.entrySet());  
	        Collections.sort(list, new Comparator<Map.Entry<String, Set<String>>>() {  
				@Override
				public int compare(Entry<String, Set<String>> o1, Entry<String, Set<String>> o2) {
					return o1.getValue().size() - o2.getValue().size();
				}  
	        });
	        //贪心为小组选人
	        String groupName = list.get(0).getKey();
	        int groupNum = list.get(0).getValue().size();
  	        if (groupNum > 0) {
  	        	//存在候选人
  	        	Set<String> enableStus = temGroupStuMap.get(groupName);
				String tarStu = "";
				if ("2".equals(typeFlag)){
					//优先显示已分配的
					Set<String> enableStusForDb = new HashSet<>();
					if (groupStuhMapForDb.get(groupName) != null && groupStuhMapForDb.get(groupName).size() != 0){
						Set<String> stus = groupStuhMapForDb.get(groupName);
						enableStusForDb.addAll(enableStus);
						enableStusForDb.retainAll(stus);
						if (enableStusForDb.size() != 0){
							tarStu = getAStu(enableStusForDb);
						}
					}
				}
				if (StringUtils.isBlank(tarStu)){
					tarStu = getAStu(enableStus);
				}
  	        	Set<String> curStu = temGroupNumMap.get(groupName);
  	        	curStu.add(tarStu);
  	        	temGroupNumMap.put(groupName, curStu);
  	        	enableAllotStu.remove(tarStu); // 可分配 --1
  	        	//将此人从其他组中出名
  	        	for (Map.Entry<String, Set<String>> es : list) {
					if (es.getValue().contains(tarStu)) {
						es.getValue().remove(tarStu);
					}
				}
			}else {
				//不存在候选人	
				String tarStu ="";
				if (cjStuSet.size() == 0) {
					//若没有不适合的学生   从候选人最多的组中抽取一个
					Set<String> mostStu = list.get( list.size() - 1 ).getValue();
					//避免指导教师
					Set<String> noStuIds = groupStuhMapForNo.get(groupName);
					Set<String> choiceStuIds = new HashSet<>();
					choiceStuIds.addAll(mostStu);
					choiceStuIds.remove(noStuIds);
					if (choiceStuIds.size() == 0){
						//说明候选人最多的小组候选人都不可选
						tarStu = getAStu(mostStu);
					}else {
						tarStu = getAStu(choiceStuIds);
					}
					//tarStu = getAStu(mostStu);
					//将此人从其他组中除名
	  	        	for (Map.Entry<String, Set<String>> es : list) {
						if (es.getValue().contains(tarStu)) {
							es.getValue().remove(tarStu);
						}
					}
				}else {
					//从不合适的学生中任意取一个
					//tarStu = getAStu(cjStuSet);
					//避免指导教师
					Set<String> noStuIds = groupStuhMapForNo.get(groupName);
					Set<String> choiceStuIds = new HashSet<>();
					choiceStuIds.addAll(cjStuSet);
					choiceStuIds.remove(noStuIds);
					if (choiceStuIds.size() == 0){
						//说明候选人最多的小组候选人都不可选
						tarStu = getAStu(cjStuSet);
					}else {
						tarStu = getAStu(choiceStuIds);
					}
					cjStuSet.remove(tarStu);  //不适合 --1
				}
 
  	        	Set<String> curStu = temGroupNumMap.get(groupName);
  	        	curStu.add(tarStu);
  	        	temGroupNumMap.put(groupName, curStu);
  	        	enableAllotStu.remove(tarStu); //可分配 --1
  	        	
			}
	        
  	        //判断小组人数是否达到
  	        int curNum = temGroupNumMap.get(groupName).size();
  	        if (curNum >= Integer.parseInt(numBatch)) {
				list.remove(list.get(0));
				temGroupStuMap.remove(groupName);
			}
  	        if (list.size() == 0) {
				break;
			}
		}
		//为小组选人
		return temGroupNumMap;
	}

	//基本思路 小组 --> 人    groupList:将要分配的小组   numBatch：每个小组分配的人数  enableAllotStu：可分配的学生
	private Map<String, Set<String>> drawLotsForGroupForDb(List<String> groupList, String numBatch, Set<String> enableAllotStu, String totalNumBatch,String batch) {

		Integer totalNum = Integer.valueOf(totalNumBatch);
		if (groupList.size() * Integer.parseInt(numBatch) + visualStu.size() > totalNum) {
			return null;
		}
		//制作小组显示分数词典
		Map<String,Integer> groupVisualNumMap = new HashMap<>();
		for (String e:groupList){
			groupVisualNumMap.put(e,Integer.parseInt(numBatch));
		}


		Map<String, Set<String>> temGroupStuMap = new HashMap<>();  //某下组在n批次下最理想的学生候选人
		Map<String, Set<String>> temGroupNumMap = new HashMap<>();  //该批次下n轮分配情况     xx小组对应xx学生集合 （存储最终分配的结果）
		//得到该批次各个小组合适的人
		Set<String> cjStuSet = new HashSet<>();   //差集  该批次下不适合所选小组的学生
		cjStuSet.clear();
		cjStuSet.addAll(enableAllotStu);
		for (String es : groupList) {
			Set<String> temStuSet = new HashSet<>();
			Set<String> temStuSet1 = new HashSet<>();
			temStuSet.clear();
			temStuSet.addAll(enableAllotStu);
			temStuSet.retainAll(groupStuhMap.get(es));
			cjStuSet.removeAll(groupStuhMap.get(es));
			temGroupStuMap.put(es, temStuSet);
			temGroupNumMap.put(es, temStuSet1);
		}


		while (true) {
//			if (enableAllotStu.size() == 0) {
//				break;
//			}
			//将map.entrySet()转换成list
			List<Map.Entry<String, Set<String>>> list = new ArrayList<Map.Entry<String, Set<String>>>(temGroupStuMap.entrySet());
			Collections.sort(list, new Comparator<Map.Entry<String, Set<String>>>() {
				@Override
				public int compare(Entry<String, Set<String>> o1, Entry<String, Set<String>> o2) {
					return o1.getValue().size() - o2.getValue().size();
				}
			});
			//贪心为小组选人

			//拦截已分配但未可视的学生
			String groupName = list.get(0).getKey();
			if (groupAllotStuMapForDb.get(groupName).get(batch)!=null && groupAllotStuMapForDb.get(groupName).get(batch).size() > 0){
				String visualStue = getAStu(groupAllotStuMapForDb.get(groupName).get(batch));
				Set<String> aa = groupAllotStuMapForDb.get(groupName).get(batch);
				aa.remove(visualStue);
				Map<String, Set<String>> bb = groupAllotStuMapForDb.get(groupName);
				bb.put(batch,aa);
				groupAllotStuMapForDb.put(groupName,bb);
				Integer visualNum = groupVisualNumMap.get(groupName);
				Integer curVisualNum = visualNum - 1;
				visualStu.add(visualStue);
				if (curVisualNum == 0){
					list.remove(list.get(0));
					temGroupStuMap.remove(groupName);
					if (list.size() == 0) {
						break;
					}
				}else {
					groupVisualNumMap.put(groupName,curVisualNum);
				}
				continue;
			}

			int groupNum = list.get(0).getValue().size();
			if (groupNum > 0) {
				//存在候选人
				Set<String> enableStus = temGroupStuMap.get(groupName);
				String tarStu = "";
				Set<String> enableStusForDb = new HashSet<>();
				if (groupStuhMapForDb.get(groupName) != null && groupStuhMapForDb.get(groupName).size() != 0){
					Set<String> stus = groupStuhMapForDb.get(groupName);
					enableStusForDb.addAll(enableStus);
					enableStusForDb.retainAll(stus);
					if (enableStusForDb.size() != 0){
						tarStu = getAStu(enableStusForDb);
					}
				}
				if (StringUtils.isBlank(tarStu)){
					tarStu = getAStu(enableStus);
				}
				Set<String> curStu = temGroupNumMap.get(groupName);
				curStu.add(tarStu);
				temGroupNumMap.put(groupName, curStu);
				enableAllotStu.remove(tarStu); // 可分配 --1
				//将此人从其他组中出名
				for (Map.Entry<String, Set<String>> es : list) {
					if (es.getValue().contains(tarStu)) {
						es.getValue().remove(tarStu);
					}
				}
				visualStu.add(tarStu);
				//更新可分配人数
				Integer visualNum = groupVisualNumMap.get(groupName);
				Integer curVisualNum = visualNum - 1;
				if (curVisualNum == 0){
					list.remove(list.get(0));
					temGroupStuMap.remove(groupName);
					if (list.size() == 0) {
						break;
					}
				}else {
					groupVisualNumMap.put(groupName,curVisualNum);
				}
			}else {
				//不存在候选人
				String tarStu ="";
				if (cjStuSet.size() == 0) {
					//若没有不适合的学生   从候选人最多的组中抽取一个
					Set<String> mostStu = list.get( list.size() - 1 ).getValue();
					//避免指导教师
					Set<String> noStuIds = groupStuhMapForNo.get(groupName);
					Set<String> choiceStuIds = new HashSet<>();
					choiceStuIds.addAll(mostStu);
					choiceStuIds.remove(noStuIds);
					if (choiceStuIds.size() == 0){
						//说明候选人最多的小组候选人都不可选
						tarStu = getAStu(mostStu);
					}else {
						tarStu = getAStu(choiceStuIds);
					}
					//tarStu = getAStu(mostStu);
					//将此人从其他组中除名
					for (Map.Entry<String, Set<String>> es : list) {
						if (es.getValue().contains(tarStu)) {
							es.getValue().remove(tarStu);
						}
					}
					visualStu.add(tarStu);
					//更新可分配人数
					Integer visualNum = groupVisualNumMap.get(groupName);
					Integer curVisualNum = visualNum - 1;
					if (curVisualNum == 0){
						list.remove(list.get(0));
						temGroupStuMap.remove(groupName);
						if (list.size() == 0) {
							break;
						}
					}else {
						groupVisualNumMap.put(groupName,curVisualNum);
					}
				}else {
					//从不合适的学生中任意取一个
					//tarStu = getAStu(cjStuSet);
					//避免指导教师
					Set<String> noStuIds = groupStuhMapForNo.get(groupName);
					Set<String> choiceStuIds = new HashSet<>();
					choiceStuIds.addAll(cjStuSet);
					choiceStuIds.remove(noStuIds);
					if (choiceStuIds.size() == 0){
						//说明候选人最多的小组候选人都不可选
						tarStu = getAStu(cjStuSet);
					}else {
						tarStu = getAStu(choiceStuIds);
					}
					cjStuSet.remove(tarStu);  //不适合 --1
				}

				Set<String> curStu = temGroupNumMap.get(groupName);
				curStu.add(tarStu);
				temGroupNumMap.put(groupName, curStu);
				enableAllotStu.remove(tarStu); //可分配 --1
				visualStu.add(tarStu);
				//更新可分配人数
				Integer visualNum = groupVisualNumMap.get(groupName);
				Integer curVisualNum = visualNum - 1;
				if (curVisualNum == 0){
					list.remove(list.get(0));
					temGroupStuMap.remove(groupName);
					if (list.size() == 0) {
						break;
					}
				}else {
					groupVisualNumMap.put(groupName,curVisualNum);
				}

			}

			//判断小组人数是否达到
//			int curNum = groupVisualNumMap.get(groupName);
//			if (curNum == 0) {
//				list.remove(list.get(0));
//				temGroupStuMap.remove(groupName);
//			}
//			if (list.size() == 0) {
//				break;
//			}
		}
		//为小组选人
		return temGroupNumMap;
	}

	private String getAStu(Set<String> enableStus) {
		Random rand = new Random(); 
		int myRand = rand.nextInt(enableStus.size());
		String stu = new ArrayList<>(enableStus).get(myRand);
		return stu;
	}

	//加载预分配学生列表
	@RequestMapping("listJsonForAllotStu")
	public @ResponseBody PageJson listJsonForAllotStu(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String typeFlag = RequestUtil.getString(request, "typeFlag");
		Set<String> stuIdSet = new HashSet<>();
		if ("1".equals(typeFlag)) {
			stuIdSet = preZqMap.keySet();
		}
		if ("2".equals(typeFlag)) {
			stuIdSet = preDbMap.keySet();
		}
		//String[] stuIds = RequestUtil.getStringAryByStr(request, "stuIds");
		//Set<String> stuIdSet = preZqMap.keySet();
		List<String> stuIdList = new ArrayList<>(stuIdSet);
		queryFilter.addFilter("id_", stuIdList,QueryOP.IN);
		PageList<UrlZhiYuanPo> urlZhiYuanPos = (PageList<UrlZhiYuanPo>) urlZhiYuanRepository.query(queryFilter);
		return new PageJson(urlZhiYuanPos);
	}
	
	//将xx从预分配列表中移除
	@RequestMapping("removeForAllotStu")
	public  void removeForAllotStu(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		JSONObject jo = new JSONObject();
		try {
			String stuId = RequestUtil.getString(request, "stuId");
			String typeFlag = request.getParameter("typeFlag");
			if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
		        jo.put("status", false);
		        jo.put("msg", "小组类型错误");
		        reponse.getWriter().println(jo);
		        return;
			}
			if ("1".equals(typeFlag)) {
				preZqMap.remove(stuId);
			}
			if ("2".equals(typeFlag)) {
				preDbMap.remove(stuId);
			}
			jo.put("status", true);
			jo.put("msg", "删除成功");
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "删除失败");
		}
		reponse.getWriter().println(jo);
	}
	
	//将从预分配列表中持久化 保存在数据库中
	@RequestMapping("saveAllot")
	public  void saveAllot(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		JSONObject jo = new JSONObject();
		String zqBatch = RequestUtil.getString(request, "zqBatch");
		String typeFlag = RequestUtil.getString(request, "typeFlag");
		if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
	        jo.put("status", false);
	        jo.put("msg", "小组类型错误");
	        reponse.getWriter().println(jo);
	        return;
		}
		zqBatch = zqBatch.replaceAll("\\s{1,}"," ");
		try {
			if ("1".equals(typeFlag)) {
				for (String stuId : preZqMap.keySet()) {
					UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(stuId);
					urlZhiYuanPo.setZqBatch(zqBatch);
					urlZhiYuanPo.setZqResult("未答辩");
					urlZhiYuanRepository.newInstance( urlZhiYuanPo ).save();
					zqMap.put(stuId, "");
				}	
				zqBatchMap.put(zqBatch, preZqMap.keySet());
				jo.put("status", true);
				jo.put("msg", "分配成功");
			}
			if ("2".equals(typeFlag)) {
				for (String stuId : preDbMap.keySet()) {
					UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(stuId);
					urlZhiYuanPo.setDbBatch(zqBatch);
					urlZhiYuanPo.setDbResult("未答辩");
					urlZhiYuanRepository.newInstance( urlZhiYuanPo ).save();
					dbMap.put(stuId, "");
				}	
				dbBatchMap.put(zqBatch, preDbMap.keySet());
				jo.put("status", true);
				jo.put("msg", "分配成功");
			}
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "分配失败");
		}
		reponse.getWriter().println(jo);
	}
	
	// 中期、答辩分配批次记录表   xx批次有哪些论文 
	@RequestMapping("zqBatchMap")
	public  void zqBatchMap(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		zqBatchMap.clear();
		dbBatchMap.clear();
		JSONObject jo = new JSONObject();
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		try {
			String whereSql = "orgId = '" + orgId +"'";
			List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
			for (UrlZhiYuanPo e : urlZhiYuanPos) {
				String zqbatch = e.getZqBatch();
				String dbbatch = e.getDbBatch();
				
				if (StringUtils.isNotBlank(zqbatch)) {
					if (zqBatchMap.get(zqbatch) == null) {
						Set<String> zqBatchStu = new HashSet<>();
						zqBatchStu.add(e.getId());
						zqBatchMap.put(zqbatch, zqBatchStu);
					}else {
						Set<String> zqBatchStu = zqBatchMap.get(zqbatch);
						zqBatchStu.add(e.getId());
						zqBatchMap.put(zqbatch, zqBatchStu);
					}
				}
				
				if (StringUtils.isNotBlank(dbbatch)) {
					if (dbBatchMap.get(dbbatch) == null) {
						Set<String> dbBatchStu = new HashSet<>();
						dbBatchStu.add(e.getId());
						dbBatchMap.put(dbbatch, dbBatchStu);
					}else {
						Set<String> dbBatchStu = dbBatchMap.get(dbbatch);
						dbBatchStu.add(e.getId());
						dbBatchMap.put(dbbatch, dbBatchStu);
					}
				}
			}
			jo.put("status", true);
			jo.put("msg", "批次记录表制作成功");
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "批次记录表制作失败");
		}
		reponse.getWriter().println(jo);
	}
	
	/**
	 * 【t_group_user】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String groupId = RequestUtil.getString(request, "groupId");
		queryFilter.addFilter("group_id_", groupId,QueryOP.EQUAL);
		PageList<GroupUserPo> groupUserList=(PageList<GroupUserPo>)groupUserRepository.query(queryFilter);
		String masterId = gradGroupRepository.get(groupId).getLeaderId();
		String secId = gradGroupRepository.get(groupId).getSecId();
		// id==>中文    教师是userid 论文是学生的urlId
		for (GroupUserPo e : groupUserList) {
			UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get( e.getUserId() );
			if ( urlZhiYuanPo == null) {
				e.setUserName( partyEmployeeRepository.get(e.getUserId()).getName() );
			}else {
				e.setUserName( urlZhiYuanPo.getName() );
			}
			e.setMaster(masterId);
			e.setSec(secId);
		}
		return new PageJson(groupUserList);
	}
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String groupId = RequestUtil.getString(request, "groupId");
		String type ="";
		int typeFlag = RequestUtil.getInt(request, "typeFlag");
		if (typeFlag == 1) {
			type = "中期";
		}
		//String type = RequestUtil.getString(request, "type");
		type = new String(type.getBytes("iso-8859-1"), "utf-8");
		return getAutoView().addObject("groupId", groupId).addObject("type", type).addObject("typeFlag",typeFlag);
	}
	
	
	/**
	 * 分配学生 -- 中期和答辩
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("allot")
	public void allot(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		try {
			//String[] groupIds = RequestUtil.getStringAryByStr(request, "groupIds");  //需要分配学生的小组
			String stuNum = RequestUtil.getString(request, "stuNum");
			String typeFlag = RequestUtil.getString(request, "typeFlag");
			if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
		        jo.put("status", false);
		        jo.put("msg", "小组类型错误");
		        response.getWriter().println(jo);
		        return;
			}
			//得到可分配的学生list
			String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
			List<UrlZhiYuanPo> urlZhiYuanPos = null;
			if ("1".equals(typeFlag)){
				String whereSql = "orgId = '" + orgId + "'";
				urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
			}
			if ("2".equals(typeFlag)){
				String whereSql = "orgId = '" + orgId + "' and is_db_ = '同意'";
				urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
			}
//			String stuSql = "orgId = " + orgId;
//			List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(stuSql);
			
			Set<String> totalSet = new HashSet<>();
			for (UrlZhiYuanPo es : urlZhiYuanPos) {
				totalSet.add(es.getId());
			}
			
			Set<String> allotedSet = new HashSet<String>();
			if("1".equals(typeFlag))
				allotedSet = zqMap.keySet();
			if("2".equals(typeFlag))
				allotedSet = dbMap.keySet();
			
			Set<String> unallotedSet = new HashSet<String>();
			unallotedSet.clear();
			unallotedSet.addAll(totalSet);
			unallotedSet.removeAll(allotedSet);
			
			List<String> unallotedList = new ArrayList<>(unallotedSet);
			
			//随机抽取stuNum个学生
			List<String> preAllotList = new ArrayList<>();
	        // 初始化随机数  
	        Random rand = new Random();  
	   
	        // 遍历整个items数组  
	        for (int i = 0; i < Integer.parseInt(stuNum); i++) {  
	            // 任意取一个0~size的整数，注意此处的items.size()是变化的，所以不能用前面的size会发生数组越界的异常  
	            int myRand = rand.nextInt(unallotedList.size());  
	            //将取出的这个元素放到存放结果的集合中  
	            preAllotList.add(unallotedList.get(myRand));  
	            //从原始集合中删除该元素防止重复。注意，items数组大小发生了改变  
	            unallotedList.remove(myRand);  
	        }  
			
	        Set<String> preAllotSet = new HashSet<>(preAllotList);
	        //分配stuNum个学生 --> urlPo
	        List<UrlZhiYuanPo> preAlloturlZhiYuanPos = new ArrayList<>();
	        for (String es : preAllotSet) {
				preAlloturlZhiYuanPos.add( urlZhiYuanRepository.get(es) );
			}
	        preZqMap.clear();
	        preDbMap.clear();
//	        preGroupStuhMap.clear();
	        if("1".equals(typeFlag)) {
	            for (String es : preAllotSet) {
		        	preZqMap.put(es, "");
				}	
	        }
	        if("2".equals(typeFlag)) {
	            for (String es : preAllotSet) {
		        	preDbMap.put(es, "");
				}	
	        }
	        //preAllot(preAlloturlZhiYuanPos,orgId);  //生成 preZqList  perStuGrouMap
	        jo.put("status", true);
	        jo.put("msg", preAllotList);
		} catch (Exception e) {
	        jo.put("status", false);
	        jo.put("msg", "自动分配失败");
		}
		response.getWriter().println(jo);

	}
	
	
	//预分配（根据打分情况得到系统提供的分配方案 ） xx小组可以匹配xx学生  检测小组是否合理
	@RequestMapping("preAllot")
	public void preAllot(HttpServletRequest request,HttpServletResponse response) throws Exception{
		groupStuhMapForDb.clear();
		String typeFlag = request.getParameter("typeFlag");
		JSONObject jo = new JSONObject();
		//得到学生论文
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		try {
			String stuSql = "orgId = " + orgId;
			List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(stuSql);
			//给学生论文和小组匹配度打分 分组  stuId groupid
			String groupSql = null;
			if ("1".equals(typeFlag)) {
				groupSql = "type_ = '中期' and org_id_ = " + orgId;
			}
			if ("2".equals(typeFlag)) {
				groupSql = "type_ = '答辩' and org_id_ = " + orgId;
			}
			Map<String, String[]> stuGroupMap = new HashMap<>();
			List<GradGroupPo> zqGroupPos = gradGroupRepository.getBySql(groupSql);

			if ("2".equals(typeFlag)) {
				//制作答辩小组指导学生集合
				for (GradGroupPo e:zqGroupPos){
					//得到学生集合
					Set<String> stuIds = new HashSet<>();
					List<String> tchIds = groupTchMap.get(e.getId());
					for (String tchId :tchIds){
						String whereSql = "finalteacherId = '"+tchId+"'";
						List<UrlZhiYuanPo> urlZhiYuanPos1 = urlZhiYuanRepository.getBySql(whereSql);
						for (UrlZhiYuanPo urlZhiYuanPo : urlZhiYuanPos1){
							stuIds.add(urlZhiYuanPo.getId());
						}
					}
					groupStuhMapForNo.put(e.getId(),stuIds);
				}
			}
			//int minNum = urlZhiYuanPos.size() / zqGroupPos.size();

			int j = 0;
			for (UrlZhiYuanPo e : urlZhiYuanPos) {
				System.out.println("--------------------学生总数 ：" +urlZhiYuanPos.size() );
				j++;
				System.out.println("--------------------学生 ：" +j + "--------"+ e.getId() + "进入分配队列--------------");
				int allotFlag = 0; //0未分配   1已分配
				List<String> resultList = getGroupByStuLabel((UrlZhiYuanPo) e , zqGroupPos,  orgId); //该学生适合的小组
				//答辩候选人需要将学生加入到评审教师所在小组
				if ("2".equals(typeFlag)) {
					//得到答辩小组id集合
					List<String> dbGroupIds = new ArrayList<>();
					for (GradGroupPo gradGroupPo : zqGroupPos){
						dbGroupIds.add(gradGroupPo.getId());
					}
					//得到评审教师
					String judgeTchId = e.getJudgeTch();
					//得到评审教师所在小组
					String groupIdByjudgeTchId = "";
					String whereSql = "user_id_ = '" + judgeTchId + "'";
					List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(whereSql);//评审教师所在小组
					if (groupUserPos.size() != 0){
						for (GroupUserPo ees : groupUserPos){
							if (dbGroupIds.contains(ees.getGroupId())){
								groupIdByjudgeTchId = ees.getGroupId();
								break;
							}
						}
						//判断该小组有没有该学生的指导教师
						if (StringUtils.isNotBlank(groupIdByjudgeTchId)){
							List<String> groupUserPos1 = groupTchMap.get(groupIdByjudgeTchId);
							if (!groupUserPos1.contains(e.getFinalteacherId())){
								//答辩小组有该学生评审教师并且不包括指导教师
								if (!resultList.contains(groupIdByjudgeTchId)){
									resultList.add(groupIdByjudgeTchId);

								}
								if (groupStuhMapForDb.get(groupIdByjudgeTchId) == null){
									Set<String> stuForDb = new HashSet<>();
									stuForDb.add(e.getId());
									groupStuhMapForDb.put(groupIdByjudgeTchId,stuForDb);
								}else {
									Set<String> stuForDb = groupStuhMapForDb.get(groupIdByjudgeTchId);
									stuForDb.add(e.getId());
									groupStuhMapForDb.put(groupIdByjudgeTchId,stuForDb);
								}
							}
						}
					}
				}
				if (resultList == null) {
					jo.put("status", false);
					jo.put("msg", "分组不合理");
					response.getWriter().println(jo);
					return;
				}
				//到此为止可得到某学生可分配的小组
				for (String suitableGroup : resultList) {
					Set<String> curGroupStuSet = groupStuhMap.get(suitableGroup);
					curGroupStuSet.add(e.getId());
					groupStuhMap.put(suitableGroup, curGroupStuSet);
				}
			}

			jo.put("status", true);
			jo.put("msg", "分组合理");
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "请联系开发人员");
		}

		response.getWriter().println(jo);

	}
	
	
	//根据学生和中期小组得分  返回得分较高的组
	private List<String> getGroupByStuLabel(UrlZhiYuanPo e, List<GradGroupPo> zqGroupPos, String orgId) {
		Map<String, Float> scoreMap = new HashMap<>();
		Map<String, Float> backScoreMap = new HashMap<>();
		float score;
		for (GradGroupPo group : zqGroupPos) { 
			score = 0; //小组得分
			if (groupTchMap.get(group.getId()).contains(e.getFinalteacherId())) {
				continue;
			}
			Map<String, Float> labelStatisMap = orgGroupLabelMap.get(orgId).get(group.getId());   //小组标签情况记录
			java.util.Set<String> groupSet = labelStatisMap.keySet();  //得到小组标签集合
			if (!StringUtils.isBlank(e.getLabelId())) {
				String[] es = e.getLabelId().substring(0, e.getLabelId().length() - 1 ).split(",");
				Set<String> stuSet = new HashSet<>(Arrays.asList( es  ));
				Set<String> result = new HashSet<String>();   //学生和小组共有的标签
		        result.clear();
		        result.addAll(groupSet);
		        result.retainAll(stuSet);
		        System.out.println("交集：" + result);
		        for (String string : result) {
		        	score += labelStatisMap.get(string);
				}
			}
			if ( score > ( 0.5 )) {
				scoreMap.put(group.getId(), score);
			}
	        backScoreMap.put(group.getId(), score);
		}
		
		if (scoreMap.size() ==  0) {
	        //将map.entrySet()转换成list  
	        List<Map.Entry<String, Float>> list = new ArrayList<Map.Entry<String, Float>>(backScoreMap.entrySet());  
	        Collections.sort(list, new Comparator<Map.Entry<String, Float>>() {  
	            //降序排序  
//	            @Override  
//	            public int compare(Entry<String, Float> o1, Entry<String, Float> o2) {  
//	                //return o1.getValue().compareTo(o2.getValue());  
//	                return o2.getValue().compareTo(o1.getValue());  
//	            }

				@Override
				public int compare(Entry<String, Float> o1, Entry<String, Float> o2) {
					return (int) ((o2.getValue()  - (o1.getValue())) * 1000000); //降序
				}  
	        });
	        List<String> resultList = new ArrayList<>();
	        if (list.size() >= 2) {
				for (int i = 0; i < 2; i++) {
					resultList.add(i, list.get(i).getKey());
				}
				return resultList;
			}else {
				return null;
			}

			
		}else {
	        //将map.entrySet()转换成list  
	        List<Map.Entry<String, Float>> list = new ArrayList<Map.Entry<String, Float>>(scoreMap.entrySet());  
//	        Collections.sort(list, new Comparator<Map.Entry<String, Float>>() {  
//				@Override
//				public int compare(Entry<String, Float> o1, Entry<String, Float> o2) {
//					return o1.getValue().compareTo(o2.getValue()); //升序
//				}  
//	        });
	        List<String> resultList = new ArrayList<>();
				for (int i = 0; i < list.size(); i++) {
					resultList.add(i, list.get(i).getKey());
				}
			return resultList;
		}

	}

	//得到小组标签  初始化小组学生
	//权重需要重写
	@RequestMapping("makeOrgGroupLabel")
	public void makeOrgGroupLabel(HttpServletRequest request,HttpServletResponse response) throws Exception{	
		JSONObject jo = new JSONObject();
		orgGroupLabelMap.clear();
		groupStuhMap.clear();
		try {	
			String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
			String orgGroupSql = "type_ in ('中期','答辩') and org_id_ = " + orgId;
			//得到院系中期和答辩的小组
			List<GradGroupPo> gradGroupPos = gradGroupRepository.getBySql(orgGroupSql);
			
			Map<String, Map<String, Float>> grouplabelMap = new HashMap<>();
			for (GradGroupPo gradGroupPo : gradGroupPos) {
				//得到小组的各个老师
				String whereSql = "group_id_ = '" + gradGroupPo.getId() + "' and type_ = 'tch'" ;
				List<GroupUserPo> groupTchPos = groupUserRepository.getBySql(whereSql);	
				
				//得到小组的各个学生
				String whereSql1 = "group_id_ = '" + gradGroupPo.getId() + "' and type_ = 'stu'" ;
				List<GroupUserPo> groupStuPos = groupUserRepository.getBySql(whereSql1);	
				
				Set<String> groupStuSet = new HashSet<>();
				groupStuhMap.put(gradGroupPo.getId(), groupStuSet);
				
				Map<String, Float> labelStatisMap = new HashMap<String, Float>();
				//制作标签map
				//制作权重
				String firstLabelTypeSql = "type_id_ = " + "'426751200533151744'";
				List<String> firstLabelList = new ArrayList<String>();
				List<LabelDefPo> firstLabelType = labelDefRepository.getBySql(firstLabelTypeSql);
				for (LabelDefPo e : firstLabelType) {
					firstLabelList.add(e.getId());
				}
				
				String secondLabelTypeSql = "type_id_ = " + "'426751228609822720'";
				List<String> secondLabelList = new ArrayList<String>();
				List<LabelDefPo> secondLabelType = labelDefRepository.getBySql(secondLabelTypeSql);
				for (LabelDefPo e : secondLabelType) {
					secondLabelList.add(e.getId());
				}
				
				List<String> groupTchList = new ArrayList<>(); 
				//统计小组标签  小组教师
				for (GroupUserPo e : groupTchPos) {
					groupTchList.add(e.getUserId());
					String[] labels = orgTchLabelMap.get(orgId).get(e.getUserId()); //得到教师标签
					if (labels != null) {
						for (String label : labels) {
							double weight = firstLabelList.contains(label) ? 1 : 0.4; //
							if (!label.isEmpty()) {
								if (labelStatisMap.containsKey(label)) {
									labelStatisMap.put(label, (float) (( (labelStatisMap.get(label) + 1)) * weight));
								}else {
									labelStatisMap.put(label, (float) ( 1  * weight) );
								}
							}
						}
					}
				}
				for (String es : labelStatisMap.keySet()) {
					labelStatisMap.put(es,   labelStatisMap.get(es) / groupTchPos.size() );
				}
				groupTchMap.put(gradGroupPo.getId(), groupTchList);
				grouplabelMap.put(gradGroupPo.getId(), labelStatisMap);
			}

			orgGroupLabelMap.put(orgId, grouplabelMap);
			jo.put("status", true);
			jo.put("msg", "小组标签制作成功");
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "小组标签制作失败");
		}
		response.getWriter().println(jo);
	}

	private Map<String, Float> getSpecialList(Map<String, Float> labelStatisMap) {
		Map<String, Float> finalMap = new HashMap<>();
		float total = 0;
		for (String es : labelStatisMap.keySet()) {
			total = labelStatisMap.get(es);
		}
		if (total != 0) {
			for (String es : labelStatisMap.keySet()) {
				finalMap.put(es, labelStatisMap.get(es) / total);
			}
		}else {
			for (String es : labelStatisMap.keySet()) {
				finalMap.put(es, total);
			}
		}
		return finalMap;
	}

	//得到教师标签
	@RequestMapping("makeOrgTchLabel")
	private void makeOrgTchLabel(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		orgTchLabelMap.clear();
		try {
			String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
			String whereSql = "org_id_ = '" + orgId + "'";
			List<TchLabelPo> tchLabelPos = tchLabelRepository.getBySql(whereSql);
			Map<String, String[]> tchLabelMap = new HashMap<>();
			for (TchLabelPo e : tchLabelPos) {
				if (StringUtils.isNotBlank(e.getLabelId())) {
					String labelIds = e.getLabelId().substring(0, e.getLabelId().length() - 1);
					tchLabelMap.put(e.getId(), labelIds.split(","));
				}else {
					tchLabelMap.put(e.getId(), null);
				}
			}
			orgTchLabelMap.put(orgId, tchLabelMap);
			jo.put("status", true);
			jo.put("msg", "教师标签制作成功");
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "教师标签制作失败");
		}
		response.getWriter().println(jo);
	}
	
	//得到小组类型词典
	@RequestMapping("makeGroupTypeMap")
	private void makeGroupTypeMap(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		groupTypeMap.clear();
		try {
			String zqSql = "type_ = '中期'";
			String dbSql = "type_ = '答辩'";
			List<GradGroupPo> zqGroupPos = gradGroupRepository.getBySql(zqSql);
			List<GradGroupPo> dbGroupPos = gradGroupRepository.getBySql(dbSql);
			List<String> zqList = new ArrayList<>();
			if (zqGroupPos !=null || zqGroupPos.size() != 0) {
				for (GradGroupPo es : zqGroupPos) {
					zqList.add(es.getId());
				}
			}
			List<String> dbList = new ArrayList<>();
			if (dbGroupPos !=null || dbGroupPos.size() != 0) {
				for (GradGroupPo es : dbGroupPos) {
					dbList.add(es.getId());
				}
			}
			
			groupTypeMap.put("中期", zqList);
			groupTypeMap.put("答辩", dbList);
			jo.put("status", true);
			jo.put("msg", "小组类型词典制作成功");
		} catch (Exception e) {
			logger.error(e.getMessage());
			System.out.println(e);
			jo.put("status", false);
			jo.put("msg", "小组类型词典制作失败");
		}
		response.getWriter().println(jo);
	}
	
	/**
	 * 分配学生信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("allotStu")
	public ModelAndView allotStu(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String type = "";
		String typeFlag = RequestUtil.getString(request, "typeFlag");
		if ("1".equals(typeFlag)) {
			type = "中期";
		}
		if ("2".equals(typeFlag)) {
			type = "答辩";
		}
		//type = new String(type.getBytes("iso-8859-1"), "utf-8");
		System.out.println(type);
//		type = new String(type.getBytes(),"UTF-8");
//		String type = request.getParameter("type");
//		String[] groupIds = RequestUtil.getStringAryByStr(request, "groupIds");
//		StringBuffer sBuffer = new StringBuffer();
//		for (String id : groupIds) {
//			sBuffer.append(id);
//			sBuffer.append(",");
//		}
//		return getAutoView().addObject("groupIds", sBuffer).addObject("type", type);
		return getAutoView().addObject("type", type).addObject("typeFlag",typeFlag);
	}
	
	/**
	 * 编辑【t_group_user】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		GroupUserPo groupUser=null;
		if(StringUtil.isNotEmpty(id)){
			groupUser=groupUserRepository.get(id);
		}
		return getAutoView().addObject("groupUser", groupUser).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_group_user】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		GroupUserPo groupUser=null;
		if(StringUtil.isNotEmpty(id)){
			groupUser=groupUserRepository.get(id);
		}
		return getAutoView().addObject("groupUser", groupUser).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_group_user】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		GroupUserPo groupUser=null;
		if(StringUtil.isNotEmpty(id)){
			groupUser=groupUserRepository.get(id);
		}
		return getAutoView().addObject("groupUser", groupUser).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_group_user】信息
	 *
	 * @param request
	 * @param response
	 * @param
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			GroupUserPo groupUserPo = getFromRequest(request);
			//构造领域对象和保存数据
			GroupUser groupUser =groupUserRepository.newInstance(groupUserPo);
			groupUser.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_group_user成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_group_user操作失败,"+e.getMessage());
			logger.error("对t_group_user操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 得到已分配的学生人数  并制作已分配学生词典
	 *
	 * @param request
	 * @param response
	 * @param
	 * @throws Exception
	 */
	@RequestMapping("enableNum")
	public void enableNum(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		String typeFlag = request.getParameter("typeFlag");
		if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
	        jo.put("status", false);
	        jo.put("msg", "小组类型错误");
	        response.getWriter().println(jo);
	        return;
		}
//		type = new String(type.getBytes("iso-8859-1"), "utf-8");
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		
		if (StringUtils.isBlank(orgId)) {
			jo.put("status", false);
			jo.put("msg", "找不到院系");
		}
		String whereSql = "" ;
		if ("1".equals(typeFlag))
			whereSql = "orgId = '" + orgId + "' and zq_batch_ is not null and zq_batch_  != '' " ;
		if ("2".equals(typeFlag))
			whereSql = "orgId = '" + orgId + "' and db_batch_ is not null and db_batch_  != '' " ;
		try {
			List<UrlZhiYuanPo> allotList = urlZhiYuanRepository.getBySql(whereSql);
			if ("1".equals(typeFlag)) {
				zqMap.clear();
				for (UrlZhiYuanPo es : allotList) {
					zqMap.put(es.getId(), "");
				}
			}
			if ("2".equals(typeFlag)) {
				dbMap.clear();
				for (UrlZhiYuanPo es : allotList) {
					dbMap.put(es.getId(), "");
				}
			}						
			jo.put("status", true);
			jo.put("msg", allotList.size());
		} catch (Exception e) {
			System.out.println(e.getMessage());
			jo.put("status", false);
			jo.put("msg", "联系开发人员");
		}
		
/*		String groupSql = "type_ = '" + type + "'  and org_id_ = " + orgId;
		List<GradGroupPo> gradGroupPos = gradGroupRepository.getBySql(groupSql);
		StringBuffer sBuffer = new StringBuffer(); 
		sBuffer.append("(");
		for (GradGroupPo e : gradGroupPos) {
			sBuffer.append(e.getId());
			sBuffer.append(",");
		}
		sBuffer.deleteCharAt(sBuffer.length() - 1);
		sBuffer.append(")");
		String groupUserSql = "group_id_  in " + sBuffer.toString() + " and type_ = 'stu'";
		try {
			List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(groupUserSql);
			jo.put("status", true);
			jo.put("msg", groupUserPos.size());
			if ("中期".equals(type)) {
//				zqList.clear();
				zqMap.clear();
				for (GroupUserPo es : groupUserPos) {
//					zqList.add( new String[] {es.getUserId(), es.getGroupId()});
					zqMap.put(es.getUserId(), es.getGroupId());
				}
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			jo.put("status", false);
			jo.put("msg", "联系开发人员");
		}*/
		response.getWriter().println(jo);
		
	}
	
	
	
	/** 
	 * 得到当前批次已分配的学生人数
	 *
	 * @param request
	 * @param response
	 * @param
	 * @throws Exception
	 */
	@RequestMapping("curBatchEnableNum")
	public void curBatchEnableNum(HttpServletRequest request,HttpServletResponse response) throws Exception{
		zqBatchEnableMap.clear();
		dbBatchEnableMap.clear();
		String type = "";
		JSONObject jo = new JSONObject();
		String typeFlag = request.getParameter("typeFlag");
		String curBatch = request.getParameter("curBatch");
		if( !"1".equals(typeFlag) && !"2".equals(typeFlag)) {
	        jo.put("status", false);
	        jo.put("msg", "小组类型错误");
	        response.getWriter().println(jo);
	        return;
		}
		
		
		
//		type = new String(type.getBytes("iso-8859-1"), "utf-8");
		String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
		
		
		if (StringUtils.isBlank(curBatch)) {
			jo.put("status", false);
			jo.put("msg", "请选择参数");
			response.getWriter().println(jo);
			return ;
		}
		
		if (StringUtils.isBlank(orgId)) {
			jo.put("status", false);
			jo.put("msg", "找不到院系");
		}
		try {
			//得到中期确定答辩小组的学生数量
			if ("1".equals(typeFlag)) {
				List<String> allotList = new ArrayList<String>( zqBatchMap.get(curBatch) );
				List<String> zqGroupList = groupTypeMap.get("中期");
				String whereSql = "user_id_ in " + List2SqlList.parse(allotList) + "and group_id_ in " + List2SqlList.parse(zqGroupList);
				List<GroupUserPo> stusInZqGroup = groupUserRepository.getBySql(whereSql); 
				Set<String> stusNotIn = new HashSet();
				Set<String> stusIn = new HashSet();
				for (GroupUserPo e : stusInZqGroup) {
					stusIn.add(e.getUserId());
				}
				stusNotIn.clear();
				stusNotIn.addAll(  zqBatchMap.get(curBatch) );
				stusNotIn.removeAll(stusIn);
				
				zqBatchEnableMap.put(curBatch, stusNotIn);
				
				jo.put("status", true);
				jo.put("msg", stusIn.size());
			}
			

			//得到中期确定答辩小组的学生数量
			if ("2".equals(typeFlag)) {
				List<String> allotList = new ArrayList<String>( dbBatchMap.get(curBatch) );
				List<String> dbGroupList = groupTypeMap.get("答辩");
				String whereSql = "user_id_ in " + List2SqlList.parse(allotList) + "and group_id_ in " + List2SqlList.parse(dbGroupList);
				List<GroupUserPo> stusIndbGroup = groupUserRepository.getBySql(whereSql); 
				Set<String> stusNotIn = new HashSet();
				Set<String> stusIn = new HashSet();
				for (GroupUserPo e : stusIndbGroup) {
					stusIn.add(e.getUserId());
				}
				stusNotIn.clear();
				stusNotIn.addAll(  dbBatchMap.get(curBatch) );
				stusNotIn.removeAll(stusIn);
				
				dbBatchEnableMap.put(curBatch, stusNotIn);
				
				jo.put("status", true);
				jo.put("msg", stusIn.size());
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			jo.put("status", false);
			jo.put("msg", "联系开发人员");
		}
		
/*		String groupSql = "type_ = '" + type + "'  and org_id_ = " + orgId;
		List<GradGroupPo> gradGroupPos = gradGroupRepository.getBySql(groupSql);
		StringBuffer sBuffer = new StringBuffer(); 
		sBuffer.append("(");
		for (GradGroupPo e : gradGroupPos) {
			sBuffer.append(e.getId());
			sBuffer.append(",");
		}
		sBuffer.deleteCharAt(sBuffer.length() - 1);
		sBuffer.append(")");
		String groupUserSql = "group_id_  in " + sBuffer.toString() + " and type_ = 'stu'";
		try {
			List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(groupUserSql);
			jo.put("status", true);
			jo.put("msg", groupUserPos.size());
			if ("中期".equals(type)) {
//				zqList.clear();
				zqMap.clear();
				for (GroupUserPo es : groupUserPos) {
//					zqList.add( new String[] {es.getUserId(), es.getGroupId()});
					zqMap.put(es.getUserId(), es.getGroupId());
				}
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			jo.put("status", false);
			jo.put("msg", "联系开发人员");
		}*/
		response.getWriter().println(jo);
		
	}
	
	/**
	 * 保存小组成员
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	//@Transactional
	@RequestMapping("saveUser")
	public void saveUser(HttpServletRequest request,HttpServletResponse response) throws Exception{	
		ResultMessage message=null;
		String groupId=RequestUtil.getString(request, "groupId");
		String groupTypeFlage =RequestUtil.getString(request, "grouptypeFlag");
		String groupType ="";
		if ("1".equals(groupTypeFlage)) {
			groupType = "中期";
		}else {
			groupType = "答辩";
		}
		
		//groupType = new String(groupType.getBytes("iso-8859-1"), "utf-8");
		String[] userIds = RequestUtil.getString(request, "userIds").split(",");
		String type = RequestUtil.getString(request, "type");
 		for (String userId : userIds) {
 			GroupUserPo groupUserPo = new GroupUserPo();
 			groupUserPo.setUserId(userId);
 			groupUserPo.setGroupId(groupId);
 			groupUserPo.setType(type);
 			String whereSql = "user_id_ ='" + userId +"' and group_id_ in " + List2SqlList.parse( groupTypeMap.get(groupType) );
 			List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(whereSql);
 			if (groupUserPos == null || groupUserPos.size() == 0) {
 				try {
 					groupUserRepository.newInstance(groupUserPo).save();
 					if ("stu".equals(type)  && "中期".equals(groupType)) {
						UrlZhiYuanPo stuPo = urlZhiYuanRepository.get(userId);
						stuPo.setZqBatch("手动分配");
						urlZhiYuanRepository.newInstance(stuPo).save();
					}
					if ("stu".equals(type)  && "答辩".equals(groupType)) {
						UrlZhiYuanPo stuPo = urlZhiYuanRepository.get(userId);
						stuPo.setDbBatch("手动分配");
						urlZhiYuanRepository.newInstance(stuPo).save();
					}
 					message=new ResultMessage(ResultMessage.SUCCESS, "添加成员成功");
 				} catch (Exception e) {
 					
 					message=new ResultMessage(ResultMessage.FAIL, "添加成员失败,"+e.getMessage());
 					logger.error("对用户组操作失败，" + e.getMessage(),e);
 				}
			}else {
				message=new ResultMessage(ResultMessage.FAIL, "成员已在同类型小组");
			}

		}
		writeResultMessage(response.getWriter(), message);
	}
	

	/**
	 * 设置小组组长
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("setMaster")
	public void setMaster(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		String userId = request.getParameter("userId");
		String groupId = request.getParameter("groupId");
		GradGroupPo groupPo = gradGroupRepository.get(groupId);
		groupPo.setLeaderId(userId);
		groupPo.setLeader(  partyEmployeeRepository.get(userId).getName() );
		try {
			gradGroupRepository.newInstance(groupPo).save();
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "设置组长失败，请联系开发者");
			response.getWriter().println(jo);
			return;
		}
		jo.put("status", true);
		jo.put("msg", "设置组长成功");
		response.getWriter().println(jo);
	}
	
	/**
	 * 设置小组秘书
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("setSEC")
	public void setSEC(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		String userId = request.getParameter("userId");
		String groupId = request.getParameter("groupId");
		GradGroupPo groupPo = gradGroupRepository.get(groupId);
		
		groupPo.setSecId(userId);
		groupPo.setSec(  partyEmployeeRepository.get(userId).getName() );
		try {
			gradGroupRepository.newInstance(groupPo).save();
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "设置秘书失败，请联系开发者");
			logger.error("撤销秘书失败，" + e.getMessage(),e);
			response.getWriter().println(jo);
			return;
		}
		jo.put("status", true);
		jo.put("msg", "设置mishu 成功");
		response.getWriter().println(jo);
	}
	
	/**
	 * 撤销小组组长
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("revoke")
	public void revoke(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		String userId = request.getParameter("userId");
		String groupId = request.getParameter("groupId");
		GradGroupPo groupPo = gradGroupRepository.get(groupId);
		groupPo.setLeaderId("");
		groupPo.setLeader( "" );
		try {
			gradGroupRepository.newInstance(groupPo).save();
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "撤销组长失败，请联系开发者");
			response.getWriter().println(jo);
			logger.error("撤销组长失败，" + e.getMessage(),e);
			return;
		}
		jo.put("status", true);
		jo.put("msg", "撤销组长成功");
		response.getWriter().println(jo);
	}
	
	/**
	 * 撤销小组秘书
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("revokeSEC")
	public void revokeSEC(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		String userId = request.getParameter("userId");
		String groupId = request.getParameter("groupId");
		GradGroupPo groupPo = gradGroupRepository.get(groupId);
		groupPo.setSecId("");
		groupPo.setSec( "" );
		try {
			gradGroupRepository.newInstance(groupPo).save();
		} catch (Exception e) {
			jo.put("status", false);
			jo.put("msg", "撤销秘书失败，请联系开发者");
			response.getWriter().println(jo);
			logger.error("撤销秘书失败，" + e.getMessage(),e);
			return;
		}
		jo.put("status", true);
		jo.put("msg", "撤销秘书成功");
		response.getWriter().println(jo);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private GroupUserPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		GroupUserPo groupUserPo = getGroupUserPo(jsonObj);

		return groupUserPo;
	}
	
	/** 
	 * 获取t_group_user数据
	 *
	 * @param jsonObj
	 */
	private GroupUserPo getGroupUserPo(JSONObject jsonObj){
		GroupUserPo groupUserPo = (GroupUserPo) JsonUtil.getDTO(jsonObj.toString(), GroupUserPo.class);
		return groupUserPo;
	}
	
	
	/**
	 *  批量删除【t_group_user】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");			
			
			//将学生的批次清空
			List<GroupUserPo> groupUserPos = groupUserRepository.findByIds(Arrays.asList(ids));
			for (GroupUserPo es : groupUserPos) {
				if ( "stu".equals(es.getType()) ) {
					UrlZhiYuanPo stu = urlZhiYuanRepository.get(es.getUserId());
					stu.setZqBatch("");
					urlZhiYuanRepository.newInstance(stu).save();
				}
			}			
			
			//构造领域对象和保存数据
			GroupUser groupUser =groupUserRepository.newInstance();
			groupUser.deleteByIds(ids);
						
			message=new ResultMessage(ResultMessage.SUCCESS, "删除小组成员成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除小组成员失败，" + e.getMessage());
			logger.error("删除t_group_user失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/**
	 * 小组组长管理学生  数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJsonForLeaderManageStu")
	public @ResponseBody PageJson listJsonForLeaderManageStu(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String groupId = RequestUtil.getString(request, "groupId");
		groupId = new String(groupId.getBytes("iso-8859-1"), "utf-8");
		//得到该小组下的学生Id集合
		String whereSql = "group_id_ = '" + groupId + "' and type_ = 'stu'";
		List<GroupUserPo> stus = groupUserRepository.getBySql(whereSql);
		List<String> stuIds = new ArrayList<>();
		for (GroupUserPo es : stus) {
			stuIds.add(es.getUserId());
		} 		
		queryFilter.addFilter("id_ ", stuIds, QueryOP.IN);
		PageList<UrlZhiYuanPo> userPos = (PageList<UrlZhiYuanPo>) urlZhiYuanRepository.query(queryFilter);
		return new PageJson(userPos);
	}



	/**
	 *  中期小组组长管理学生  页面
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("leaderManageStu")
	public ModelAndView leaderManageStu(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//得到小组类型
		String groupType = "";
		int typeFlag = RequestUtil.getInt(request, "type");
		if (typeFlag == 1) {
			groupType = "中期";
		}
		//判断该教师在该小组类型中是否为组长 
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String whereSql = "type_ = '" + groupType + "' and leader_id_ = '" + userId +"'";
		List<GradGroupPo> gradGroupPos = gradGroupRepository.getBySql(whereSql);
		String role = "";
		String groupId = "";
		if (gradGroupPos != null && gradGroupPos.size() > 0) {
			role = "leader";
			groupId = gradGroupPos.get(0).getId();
		}
		
		return getAutoView().addObject("role", role).addObject("groupId",groupId).addObject("type",groupType);
	}


	/**
	 *  答辩小组组长管理学生  页面
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("leaderManageStuForDb")
	public ModelAndView leaderManageStuForDb(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//得到小组类型
		String groupType = "";
		int typeFlag = RequestUtil.getInt(request, "type");
		if (typeFlag == 2) {
			groupType = "答辩";
		}
		//判断该教师在该小组类型中是否为组长
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String whereSql = "type_ = '" + groupType + "' and leader_id_ = '" + userId +"'";
		List<GradGroupPo> gradGroupPos = gradGroupRepository.getBySql(whereSql);
		String role = "";
		String groupId = "";
		if (gradGroupPos != null && gradGroupPos.size() > 0) {
			role = "leader";
			groupId = gradGroupPos.get(0).getId();
		}

		return getAutoView().addObject("role", role).addObject("groupId",groupId).addObject("type",groupType);
	}

	//保存中期或者答辩成绩
	@RequestMapping("grad")
	public void ktgrad (HttpServletRequest request,HttpServletResponse response) throws Exception{
		String stuId = RequestUtil.getString(request, "id");
		String gradeJson= RequestUtil.getString(request, "json");
		byte[] blobJson = gradeJson.getBytes();
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(stuId);
		urlZhiYuanPo.setZqGrade(blobJson);
		urlZhiYuanRepository.newInstance(urlZhiYuanPo).save();
	}
	
	//得到该学生的中期或者答辩成绩
	@RequestMapping("data")
	public void ktdata (HttpServletRequest request,HttpServletResponse response) throws Exception{
		//public JSONArray getFields(String var1); formKey
		//public String getFormData(String var1); id
		String stuId = RequestUtil.getString(request, "id");
		UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(stuId);
		byte[] blobJson; 
	    String gradeJson ="";
	    JSONObject json = new JSONObject();
	    blobJson = urlZhiYuanPo.getZqGrade();
    	if(blobJson==null||blobJson.length == 0) {
    		JSONObject obj = new JSONObject();
    		obj.put("xh", urlZhiYuanPo.getXh());
    		gradeJson=obj.toString();
    		json = JSONObject.fromObject(gradeJson);
    	}else {
    		json=JSONObject.fromObject(new String(blobJson));
		}		  	
	    response.getWriter().print(json); 
	}
	
    //创建 xx学院 所有学生的候选评审教师
	@RequestMapping("getAllStuTch")
    private void getAllStuTch(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	JSONObject jo = new JSONObject();
		try {
			orgStuTchMap.clear();
			String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
			//得到该学院所有毕设学生
			String getStuSql = " orgId = '" + orgId + "'";
			List<UrlZhiYuanPo> stuList = urlZhiYuanRepository.getBySql(getStuSql);
	    	Map<String, String[]> judgeTchMap = new HashMap<>();
	    	List<String> tchIds = urlZhiYuanRepository.getAllJudgeTchId(orgId);
	    	for (String es : tchIds) {
	    		TchLabelPo e = tchLabelRepository.get(es);
				if (StringUtils.isNotBlank(e.getLabelId())) {
					String labelIds = e.getLabelId().substring(0, e.getLabelId().length() - 1);
					judgeTchMap.put(e.getId(), labelIds.split(","));
				}else {
					judgeTchMap.put(e.getId(), null);
				}
			}
	    	String stuIdString = "";
			for (UrlZhiYuanPo es : stuList) {
				System.out.println(stuIdString);
				getStuTch(es, judgeTchMap);
			}
			jo.put("status", true);
			jo.put("msg", "候选评审教师词典制作完成");
		} catch (Exception e) {
			System.out.println("异常 : " + e);
			logger.error(e.toString());
			jo.put("status", false);
			jo.put("msg", "候选评审教师词典制作失败");
		}finally {
			response.getWriter().println(jo);
		}
	}
    
    //得到xx学生的评审候选教师集合以及其匹配度
    private void getStuTch(UrlZhiYuanPo es, Map<String, String[]> judgeTchMap) {
    	String finalTchId = es.getFinalteacherId();
    	//得到学生标签情况
    	String labelString = es.getLabelId();
    	Map<String, Integer> tchMap = new HashMap<>();
    	if (labelString != null && StringUtils.isNotBlank(labelString)) {
        	labelString = labelString.substring(0, labelString.length() - 1 );
        	String[] labels = labelString.split(",");
    		Set<String> result = new HashSet<String>();   //学生和教师共有的标签
    		for (Map.Entry<String, String[]> entry : judgeTchMap.entrySet()) { 
    			String tchId = entry.getKey();
    			if (!tchId.equals( finalTchId )) {
    				result.clear();
    				String[] tchLabel = judgeTchMap.get(entry.getKey());
    				if (tchLabel == null) {
						continue;
					}else {
	    				result.addAll(new HashSet<>(Arrays.asList(labels)));
	    				result.retainAll( new HashSet<>(Arrays.asList(tchLabel)) );
	    				if (result.size() > 0) {
	    					tchMap.put(entry.getKey(), result.size());
	    				}
					}
    			}
    		}
    		if (tchMap.size() == 0) {
    			tchMap = null;
    		}
		}else {
			tchMap = null;
		}

    	if (orgStuTchMap.get(es.getOrgId()) == null) {
    		Map<String, Map<String, Integer>> stuTchMap = new HashMap<>();
    		stuTchMap.put(es.getId(), tchMap);
			orgStuTchMap.put(es.getOrgId(), stuTchMap);
		}else {
			orgStuTchMap.get(es.getOrgId()).put(es.getId(), tchMap);
		}
		
//		stuTchMap.put(es.getId(), tchMap);
//		orgStuTchMap.put(es.getOrgId(), stuTchMap);  
	}
	
    //分配评审教师
    @RequestMapping("allotJudgeTch")
    public void allotJudgeTch(HttpServletRequest request,HttpServletResponse response) throws Exception{
    	JSONObject jo = new JSONObject();
    	try {
        	String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
        	//得到xx老师评审xx份论文
    		Map<String, Integer> tchNumMap = getTchNumMap(orgId);
    		//得到当前xx老师评审xx份论文
    		Map<String, Integer> curTchNumMap = new HashMap<>();
    		for (String es : tchNumMap.keySet()) {
    			curTchNumMap.put(es, 0);
    		}
    		
    		//备分orgStuTchMap 深拷贝
    		Map<String, Map<String,Map<String, Integer>>> backOrgStuTchMap = new HashMap<>();
    		backOrgStuTchMap.clear();
//    		backOrgStuTchMap = (Map<String, Map<String, Map<String, Integer>>>) orgStuTchMap.clone();
    		for (Map.Entry<String, Map<String,Map<String, Integer>>> entry : orgStuTchMap.entrySet()) {
    			Map<String,Map<String, Integer>> aMap = new HashMap<>();
    			for (Map.Entry<String, Map<String, Integer>> es : entry.getValue().entrySet()) {
    				//Map<String, Integer> bMap = new HashMap<>();
    				if (es == null) {
						aMap = null;
					}else {
						Map<String, Integer> cMap = new HashMap<>();
						if (es.getValue() != null) {
							for (Map.Entry<String, Integer> es1 : es.getValue().entrySet()) {
								cMap.put(es1.getKey(), es1.getValue());	
							}
						}else {
							cMap = null;
						}
						aMap.put(es.getKey(), cMap);
					}
				}
    			backOrgStuTchMap.put(entry.getKey(), aMap);
			}
    		
    		String getStuSql = " orgId = '" + orgId + "'";
    		List<UrlZhiYuanPo> stuList = urlZhiYuanRepository.getBySql(getStuSql);
    		//存放没有候选教师的学生
    		List<String> noTchStu = new ArrayList<>();
 			//得到orgid学院的学生候选教师词典
 			Map<String, Map<String, Integer>> stuTchMap = backOrgStuTchMap.get(orgId);

    		for (int i = 0; i < stuList.size(); i++) {
     			//贪心  先为候选教师少的学生分配
     			//将map.entrySet()转换成list  
     	        List<Map.Entry<String, Map<String, Integer>>> list = new ArrayList<Map.Entry<String, Map<String, Integer>>>(stuTchMap.entrySet());   
    	        if (list.size() == 0) {
					break;
				}
     	        Collections.sort(list, new Comparator<Map.Entry<String, Map<String, Integer>>>() {  
    				@Override
    				public int compare(Entry<String, Map<String, Integer>> o1, Entry<String, Map<String, Integer>> o2) {
    					if(o1.getValue() == null)
    						return -1;
    					if (o2.getValue() == null) {
							return 1;
						}
    					return o1.getValue().size() - o2.getValue().size(); //升序
    				}  
					});
    	        String stu = list.get(0).getKey(); //需要分配盲审教师的学生
    			//得到候选教师集合
    			//Map<String, Integer> tchIdsMap = orgStuTchMap.get(orgId).get(stu);
    	        Map<String, Integer> tchIdsMap = list.get(0).getValue();
    			if (tchIdsMap!=null && tchIdsMap.size() > 0) {
    				String tch = allotJudge(tchIdsMap);
    				//todo 持久化到数据库
					UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(stu);
                    urlZhiYuanPo.setJudgeTchName( partyEmployeeRepository.get(tch).getName() );
					urlZhiYuanPo.setJudgeTch(tch);
					urlZhiYuanRepository.newInstance(urlZhiYuanPo).save();
    				
    				
    				curTchNumMap.put(tch,  curTchNumMap.get(tch) + 1 );
    				//如果教师评审论文数达到指定数量 则把教师从候选教师中除名
    				if (curTchNumMap.get(tch) == tchNumMap.get(tch)) {
    					for(Entry<String, Map<String, Integer>> entry : stuTchMap.entrySet()) {
    						backOrgStuTchMap.get(orgId).get(entry.getKey()).remove(tch);
    					}
    				}
    			}else {
    				noTchStu.add(stu);
    			}  
    			stuTchMap.remove(stu);
    		}
    		//为候选教师为空的学生分配一位教师
    		if (noTchStu.size() > 0) {
    			for (String es : noTchStu) {
    				System.out.print("现在为" + es + "分配教师");
    				Map<String, Integer> tchIdsMap = orgStuTchMap.get(orgId).get(es);
    				while(true) {
    					String tchString = allotJudge(tchIdsMap);
    					if ("null".equals(tchString)) {
    						//随机分配一位还有名额的教师
    						List<String> temList = new ArrayList<>();
    						for(String tchEs : curTchNumMap.keySet()) {
    							if (curTchNumMap.get(tchEs) <= tchNumMap.get(tchEs) ) {
    								temList.add(tchEs);
    							}
    						}
    						Random random = new Random();
    						int key = random.nextInt(temList.size());
    						tchString = temList.get(key);
    						//todo 持久化到数据库
    						UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(es);
    						urlZhiYuanPo.setJudgeTch(tchString);
    						urlZhiYuanPo.setJudgeTchName( partyEmployeeRepository.get(tchString).getName() );
    						urlZhiYuanRepository.newInstance(urlZhiYuanPo).save();
    						curTchNumMap.put(tchString, curTchNumMap.get(tchString) + 1);
    						break;
    						
    					}else {
    						if (curTchNumMap.get(tchString) > tchNumMap.get(tchString)) {
    							//该教师分数已满
    							tchIdsMap.remove(tchString);
    						}else {
    							//todo 持久化到数据库
        						UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(es);
        						urlZhiYuanPo.setJudgeTch(tchString);
                                urlZhiYuanPo.setJudgeTchName( partyEmployeeRepository.get(tchString).getName() );
        						urlZhiYuanRepository.newInstance(urlZhiYuanPo).save();
        						curTchNumMap.put(tchString, curTchNumMap.get(tchString) + 1);
    							break;
    						}
    					}
    				}		
    			}
    		}
			jo.put("status", true);
			jo.put("msg", "评审教师分配完成");
		} catch (Exception e) {
			System.out.println("异常 : " + e);
			logger.error(e.toString());
			jo.put("status", false);
			jo.put("msg", "分配评审教师抛出异常");
		}finally {
			response.getWriter().println(jo);
		}
    			
	}

    //分配当前最合适的教师为评审教师
	private String allotJudge(Map<String, Integer> tchIdsMap) {
		if (tchIdsMap == null ) {
			return "null";
		}
		if (tchIdsMap.size() == 0 ) {
			return "null";
		}
        List< Map.Entry<String, Integer> > list = new ArrayList< Map.Entry<String, Integer> >(tchIdsMap.entrySet());  
		if (list.size() == 1) {
			return list.get(0).getKey();
		}
		//降序排序
        Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {  
			@Override
			public int compare(Entry<String, Integer> o1, Entry<String, Integer> o2) {
				return o2.getValue() - o1.getValue(); //降序
			}  
        });
		return list.get(0).getKey();
	}

	//得到教务处需要的评审教师评审论文数量词典
	private Map<String, Integer> getTchNumMap(String orgId) {
		Map<String, Integer> tchNumMap = new HashMap<>();
		//得到评审教师的数量
		List<String> tchIds = urlZhiYuanRepository.getAllJudgeTchId(orgId);	
		int flag = 0;
		if (flag == 0) {		
			String getStuSql = " orgId = '" + orgId + "'";
			List<UrlZhiYuanPo> stuList = urlZhiYuanRepository.getBySql(getStuSql);
			int tchNum = stuList.size() / tchIds.size() ;
			for (String es : tchIds) {
				tchNumMap.put(es, tchNum);
			}
		}else {
			for (String es : tchIds) {
				String whereSql = "finalteacherId = '" + es +"'";
				List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
				tchNumMap.put(es, urlZhiYuanPos.size());
			}		
			
		}	
		return tchNumMap;
	}

	//为学生指定答辩小组
	@RequestMapping("appointGroup")
	private void appointGroup(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();

		try {
			String userId = request.getParameter("userId");
			String[] groupIds = request.getParameter("groupId").split(",");

			GroupUserPo groupUserPo = new GroupUserPo();
			groupUserPo.setUserId(userId);
			groupUserPo.setGroupId(groupIds[0]);
			groupUserPo.setType("stu");
			//
			String whereSql = "user_id_ ='" + userId +"' and group_id_ in " + List2SqlList.parse( groupTypeMap.get("答辩") );
			List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(whereSql);
			if (groupUserPos == null || groupUserPos.size() == 0) {
				//保存人员到小组中
				groupUserRepository.newInstance(groupUserPo).save();
				jo.put("status", true);
				jo.put("msg", "指定答辩小组成功");
			}else {
				jo.put("status", false);
				jo.put("msg", "该学生已分配到一个小组");
			}
		}catch (Exception e){
			jo.put("status", false);
			jo.put("msg", "指定小组抛出异常");
			response.getWriter().println(jo);
			return;
		}
		response.getWriter().println(jo);
	}

	//得到答辩小组已分配关系
	@RequestMapping("groupAllotStuMapForDb")
	private void groupAllotStuMapForDb(HttpServletRequest request,HttpServletResponse response) throws Exception{

		JSONObject jo = new JSONObject();
		groupAllotStuMapForDb.clear();
		//得到答辩小组
		List<String> gradGroupPos = groupTypeMap.get("答辩");
		try{
			for (String e : gradGroupPos){
				String whereSql = "group_id_ = '" + e + "' and type_ = 'stu'";
				List<GroupUserPo> groupUserPos = groupUserRepository.getBySql(whereSql);
				Map<String, Set<String>> allotBatchStu = new HashMap<>();

				if (gradGroupPos != null && groupUserPos.size() > 0){
					for (GroupUserPo es : groupUserPos){
						if(!"完成".equals(urlZhiYuanRepository.get(es.getUserId()).getDbResult())){
							String dbBatch = urlZhiYuanRepository.get(es.getUserId()).getDbBatch();
							if (allotBatchStu.get(dbBatch) == null){
								Set<String> allotStu = new HashSet<>();
								allotStu.add(es.getUserId());
								allotBatchStu.put(dbBatch,allotStu);
							}else {
								Set<String> allotStu1 = allotBatchStu.get(dbBatch);
								allotStu1.add(es.getUserId());
								allotBatchStu.put(dbBatch,allotStu1);
							}
						}
					}
				}
				groupAllotStuMapForDb.put(e,allotBatchStu);
			}
			jo.put("status", true);
			jo.put("msg", "答辩小组已分配学生列表制作成功");
		}catch (Exception e){
			jo.put("status", false);
			jo.put("msg", "答辩小组已分配学生列表异常");
			response.getWriter().println(jo);
			return;
		}
		response.getWriter().println(jo);
	}
}
