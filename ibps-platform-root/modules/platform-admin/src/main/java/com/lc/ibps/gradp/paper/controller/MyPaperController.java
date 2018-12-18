
package com.lc.ibps.gradp.paper.controller;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.grads.paper.domain.MyPaper;
import com.lc.ibps.grads.paper.persistence.entity.MyPaperPo;
import com.lc.ibps.grads.paper.repository.MyPaperRepository;
import com.lc.ibps.org.party.domain.PartyUserRole;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
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

import net.sf.json.JSONObject;

/**
 * 我的论文表单 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：xubaocheng
 * 邮箱地址：100000000000@qq.com
 * 创建时间：2017-05-19 12:27:00
 * </pre>
 */
@Controller
@RequestMapping("/gradp/paper/myPaper/")
public class MyPaperController extends GenericController {
	@Resource
	MyPaperRepository myPaperRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;
	@Resource
	PartyRoleRepository partyRoleRepository;
	@Resource
	PartyUserRoleRepository partyUserRoleRepository;
	@Resource
	PartyUserRepository partyUserRepository;
	@Resource
	PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	PartyOrgRepository partyOrgRepository;
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;
	/**
	 * 【我的论文表单】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		HttpSession session = request.getSession();
		boolean onYs = session.getAttribute("onYs").toString().equals("y");
		boolean onMs = session.getAttribute("onMs").toString().equals("y");
		String tchNum = getAccount();
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter(onMs ? "ptidea" : "ttidea", "", onYs ? QueryOP.NOTNULL : QueryOP.IS_NULL);
		queryFilter.addFilter(onMs ? "ptnum" : "ttnum", tchNum, QueryOP.EQUAL);
		List<MyPaperPo> temp = myPaperRepository.query(queryFilter);
		for (MyPaperPo po : temp) {
			String num = po.getStunum();
			po.setName(getName(num));
		}
		PageList<MyPaperPo> myPaperList = (PageList<MyPaperPo>) temp;
		return new PageJson(myPaperList);
	}

	private String getAccount() {
		return ContextUtil.getCurrentUser().getAccount();
	}

	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		HttpSession session = request.getSession();
		boolean onYs = request.getParameter("ys").toString().equals("y");
		boolean onMs = request.getParameter("ms").toString().equals("y");
		session.setAttribute("onYs", request.getParameter("ys"));
		session.setAttribute("onMs", request.getParameter("ms"));
		String hidden = "style='display:none'";
		return getAutoView().addObject("showSearch2Tutor", onMs ? hidden : "")
				.addObject("showSearch2PR", onMs ? "" : hidden).addObject("showSearch2Admin", hidden)
				.addObject("showCol", onMs ? "true" : "false");
	}

	/**
	 * 编辑【我的论文表单】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		MyPaperPo myPaper = myPaperRepository.get(request.getParameter("num"));
		return getAutoView().addObject("myPaper", myPaper);
	}

	/**
	 * 编辑【我的论文表单】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		MyPaperPo myPaper = null;
		if (StringUtil.isNotEmpty(id)) {
			myPaper = myPaperRepository.get(id);
		}
		return getAutoView().addObject("myPaper", myPaper).addObject("returnUrl", preUrl);
	}

	/**
	 * 【我的论文表单】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String stuNum = getAccount();
		MyPaperPo myPaperPo = myPaperRepository.get(stuNum);
		String ttName = getName(myPaperPo.getTtnum());
		myPaperPo.setStuname(getName(stuNum));
		return getAutoView().addObject("myPaper", myPaperPo).addObject("ttName", ttName);
	}

	@RequestMapping("getMyInfo")
	public ModelAndView getMyInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String stuNum = getAccount();
		MyPaperPo myPaperPo = myPaperRepository.get(stuNum);
		myPaperPo.setStunum(myPaperPo.getStunum().substring(3));
		myPaperPo.setStuname(getName(stuNum));
		return getAutoView().addObject("myPaper", myPaperPo);
	}

	@RequestMapping("getTutorInfo")
	public ModelAndView getTutorInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String stuNum = getAccount();
		MyPaperPo myPaperPo = myPaperRepository.get(stuNum);
		String ttName = getName(myPaperPo.getTtnum());
		myPaperPo.setTtnum(myPaperPo.getTtnum().substring(3));
		return getAutoView().addObject("myPaper", myPaperPo).addObject("ttName", ttName);
	}

	@RequestMapping("getPRInfo")
	public ModelAndView getPRInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String stuNum = getAccount();
		MyPaperPo myPaperPo = myPaperRepository.get(stuNum);
		return getAutoView().addObject("myPaper", myPaperPo);
	}

	@RequestMapping("upload")
	public ModelAndView upload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String num = getAccount();
		MyPaperPo myPaperPo = myPaperRepository.get(num);
		String tchName = "";
		if (myPaperPo != null)
			tchName = getName(myPaperPo.getTtnum());
		return getAutoView().addObject("myPaper", myPaperPo).addObject("ttName", tchName);
	}

	private String getName(String num) {
		PartyEntityPo partyEntityPo = partyEntityRepository.getByAliasPartyType(num, "");
		return partyEntityPo.getName();
	}

	/**
	 * 保存【我的论文表单】信息
	 *
	 * @param request
	 * @param response
	 * @param myPaper
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			
			String dateTime = getDateString();
			String stuNum = getAccount();
			MyPaperPo oldInfo = myPaperRepository.get(stuNum);
			MyPaperPo myPaperPo = getFromRequest(request);
			// 如果上传了论文，更新上传论文时间
			if (myPaperPo.getStuppfid().length() > 2 && !myPaperPo.getStuppfid().equals(oldInfo.getStuppfid())) {
				oldInfo.setStuppfid(myPaperPo.getStuppfid());
				oldInfo.setStupptime(dateTime);
			}
			// 如果上传了盲审论文，则自动分配一位盲审教师
			if (myPaperPo.getStupppfid().length() > 2 && !myPaperPo.getStupppfid().equals(oldInfo.getStupppfid())) {
				oldInfo.setPtnum(getRandomPTnum(oldInfo.getTtnum(), request));
				oldInfo.setStupppfid(myPaperPo.getStupppfid());
				oldInfo.setPfileuptime(dateTime);
			}

			if (myPaperPo.getStupptfid().length() > 2 && !myPaperPo.getStupptfid().equals(oldInfo.getStupptfid())) {
				oldInfo.setStupptfid(myPaperPo.getStupptfid());
				oldInfo.setStupptuptime(dateTime);
			}
			// 构造领域对象和保存数据
			MyPaper myPaper = myPaperRepository.newInstance(oldInfo);
			myPaper.update();
			message = new ResultMessage(ResultMessage.SUCCESS, "上传成功！");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "上传操作失败," + e.getMessage());
			logger.error("上传操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	private String getDateString() {
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(date);
	}

	private String getRandomPTnum(String ttnum, HttpServletRequest request) {
		// 获取指导教师uid
		String ttuid = partyUserRepository.getByAccount(ttnum).getId();
		// 获取所有的教师
		String tchAlias = "gr_tch";
		String roleId_tch = partyRoleRepository.getRoleByRoleAlias(tchAlias).getId();
		List<PartyUserRolePo> userRolePos = partyUserRoleRepository.findAll();
		List<String> tchNums = new ArrayList();
		int i=0;
		for (PartyUserRolePo po : userRolePos) {
			if( !po.getRoleID().equals(roleId_tch) || po.getUserID().equals(ttuid) )
				continue;
			System.out.println(po.getUserID());
			String num = partyUserRepository.get(po.getUserID()).getAccount();
			tchNums.add(num);
		}

		List<MyPaperPo> myPaperPoList = myPaperRepository.queryAll();

		HashMap<String, Integer> tchBlindCountsMap = countTchBlind(tchNums, myPaperPoList);
		return getMinCountTch(tchBlindCountsMap);
	}

	private String getMinCountTch(HashMap<String, Integer> tchBlindCountsMap) {
		int minValue = 10000000;
		ArrayList<String> minEqualList = new ArrayList<String>();
		Iterator iter = tchBlindCountsMap.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry entry = (Map.Entry) iter.next();
			String key = (String) entry.getKey();
			int val = (int) entry.getValue();

			if (val < minValue) {
				minValue = val;
				minEqualList.clear();
				minEqualList.add(key);
			} else if (val == minValue) {
				minEqualList.add(key);
			}
		}
		if (minEqualList.size() > 1) {
			Random r = new Random();
			int randIndex = Math.abs(r.nextInt()) % minEqualList.size();
			return minEqualList.get(randIndex);
		}
		return minEqualList.get(0);
	}

	private HashMap<String, Integer> countTchBlind(List<String> tchNums, List<MyPaperPo> myPaperPoList) {
		HashMap<String, Integer> map = new HashMap();
		for (String tchNum : tchNums)
			map.put(tchNum, 0);
		for (MyPaperPo myPaperPo : myPaperPoList) {
			String blindTchNum = myPaperPo.getPtnum();
			if (blindTchNum != null)
				map.put(blindTchNum, map.get(blindTchNum) + 1);
		}
		return map;
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 */
	private MyPaperPo getFromRequest(HttpServletRequest request) {
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);

		MyPaperPo myPaperPo = getMyPaperPo(jsonObj);

		return myPaperPo;
	}

	/**
	 * 获取我的论文表单数据
	 *
	 * @param jsonObj
	 */
	private MyPaperPo getMyPaperPo(JSONObject jsonObj) {
		MyPaperPo myPaperPo = (MyPaperPo) JsonUtil.getDTO(jsonObj.toString(), MyPaperPo.class);
		return myPaperPo;
	}

	/**
	 * 批量删除【我的论文表单】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			// 获得待删除的id
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			// 构造领域对象和保存数据
			MyPaper myPaper = myPaperRepository.newInstance();
			myPaper.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除我的论文表单成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除我的论文表单失败，" + e.getMessage());
			logger.error("删除我的论文表单失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	@RequestMapping("role")
	public void role(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			List<PartyUserRolePo> partyUserRolePoList = partyUserRoleRepository.findUserRolesByRoleId("367325571757113344");
			for(int i=0;i<partyUserRolePoList.size();i++){
				PartyUserRolePo partyUserRolePo = partyUserRolePoList.get(i);
				String id = partyUserRolePo.getId();
				partyUserRolePo.setRoleID("357966595638689792");
				PartyUserRole x = partyUserRoleRepository.newInstance(partyUserRolePo);
				x.update();
			}
			message = new ResultMessage(ResultMessage.SUCCESS, "成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "失败，" + e.getMessage());
			logger.error("失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	
	@RequestMapping("review")
	public ModelAndView review(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String num = RequestUtil.getString(request, "num");
		MyPaperPo po = myPaperRepository.get(num);
		return getAutoView().addObject("myPaper", po);
	}
	@RequestMapping("blindReview")
	public ModelAndView blindReview(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String num = RequestUtil.getString(request, "num");
		MyPaperPo po = myPaperRepository.get(num);
		return getAutoView().addObject("myPaper", po);
	}

	@RequestMapping("saveReview")
	public void saveReview(HttpServletRequest request, HttpServletResponse response) throws Exception {
		boolean isMs = RequestUtil.getBoolean(request, "isMs");
		String baseStr = "m:myPaper:";
		String stuNum = RequestUtil.getString(request, "stuNum");
		MyPaperPo po = myPaperRepository.get(stuNum);
		if (isMs) {
			String ptcomment = RequestUtil.getString(request, baseStr + "ptcomment");
			Long ptidea = RequestUtil.getLong(request, baseStr + "ptidea");
			String ptreviewfid = RequestUtil.getString(request, baseStr + "ptreviewfid");
			po.setPtcomment(ptcomment);
			po.setPtidea(ptidea);
			po.setPtreviewfid(ptreviewfid);
			po.setPtreviewuptime(getDateString());
			po.setPtptime(getDateString());
			po.setPtdowntime(getDateString());
		}else{
			String ttcomment = RequestUtil.getString(request, baseStr + "ttcomment");
			Long ttidea = RequestUtil.getLong(request, baseStr + "ttidea");
			String ttreviewfid = RequestUtil.getString(request, baseStr + "ttreviewfid");
			po.setTtcomment(ttcomment);
			po.setTtidea(ttidea);
			po.setTtreviewfid(ttreviewfid);
			po.setTtreviewuptime(getDateString());
			po.setTtdowntime(getDateString());
			po.setTtreviewtime(getDateString());
		}
		MyPaper mp = myPaperRepository.newInstance(po);
		mp.update();
		response.getWriter().print("保存成功!");
	}
	
	@RequestMapping("imbort")
	public ModelAndView imbort(HttpServletRequest request, HttpServletResponse response) throws Exception{
		int type = RequestUtil.getInt(request, "type");
		String pos="学生";
		if(type==1)
			pos="教师";
		return getAutoView().addObject("pos", pos).addObject("type", type);
	}
	@RequestMapping("imbortXls")
	public void imbortXls(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception{
		ResultMessage message = null;
		try{
		int type = RequestUtil.getInt(request, "type");//0：学生 1：教师
		MultipartFile file = request.getFile("xlsFile");//获取上传文件
		InputStream is = file.getInputStream();//将file对象转换为文件流
		realImportInfo(is,type,request);//解析
		message = new ResultMessage(ResultMessage.SUCCESS, "导入成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "导入失败" + e.getMessage());
			logger.error("导入失败" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	private void realImportInfo(InputStream is, int type,MultipartHttpServletRequest request) throws IOException {
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
		int len = 0;
		HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(0);
		
		for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
			len = 0;
			HSSFRow hssfRow = hssfSheet.getRow(rowNum);

			int minColIx = hssfRow.getFirstCellNum();
			int maxColIx = hssfRow.getLastCellNum();
			List<String> rowList = new ArrayList<String>();
			// 遍历该行，获取每个cell元素
			for (int colIx = minColIx; colIx < maxColIx; colIx++) {
				HSSFCell cell = hssfRow.getCell(colIx);
				len = len + 1;
				rowList.add(getStringVal(cell));
			}
			
			/*表结构发生变化时，需要改变*/
			String account = "heu"+rowList.get(1);
			String classr = rowList.get(0);
//			if(myPaperRepository.get(account)!=null)continue;
			String name = rowList.get(2).replaceAll(" ", "");
			
			//urlZhiYuan
			if(type==0){
				UrlZhiYuanPo urlzhiyuan = new UrlZhiYuanPo();
				urlzhiyuan.setName(name);
				urlzhiyuan.setXh(rowList.get(1));
				urlzhiyuan.setClassr(classr);
				UrlZhiYuan x =urlZhiYuanRepository.newInstance(urlzhiyuan);
				x.save();
				
			}
			//导入到教师-立题论证书表
//			//Party-User
//			if (partyUserRepository.getByAccount(rowList.get(0)) != null)
//				continue;
//			PartyUserPo partyUserPo = new PartyUserPo();
//			partyUserPo.setAccount(account);
//			partyUserPo.setName(name);
//			partyUserPo.setPassword(account.substring(account.length()-6));
//			partyUserPo.setDataCheck("1");
//			partyUserPo.setIsSuper('N');
//			partyUserPo.setCreateTime(new Date());
//			PartyUser partyUser = partyUserRepository.newInstance(partyUserPo);
//			partyUserPo.setId(partyUser.getIdGenerator().getId());
//			partyUser.create();
//			
//
//			//Party-User-Role
//			String uid = partyUserPo.getId();
//			String role = type==1 ? "js" : "xs";
//			PartyRolePo partyRolePo = partyRoleRepository.getRoleByRoleAlias(role);
//
//			String roleId = partyRolePo.getId();
//			PartyUserRolePo partyUserRolePo = new PartyUserRolePo();
//			partyUserRolePo.setRoleID(roleId);
//			partyUserRolePo.setUserID(uid);
//			PartyUserRole partyUserRole = partyUserRoleRepository.newInstance(partyUserRolePo);
//			partyUserRolePo.setId(partyUserRole.getIdGenerator().getId());
//			partyUserRole.create();
//
//			//Party-Employee
//			PartyEmployeePo partyEmployeePo = new PartyEmployeePo();
//			partyEmployeePo.setId(uid);
//			partyEmployeePo.setName(name);
//			partyEmployeePo.setStatus("actived");
//			partyEmployeePo.setGender("male");
//			partyEmployeePo.setEmail("0@qq.com");
//			partyEmployeePo.setPositions("0");
//			partyEmployeePo.setCreateTime(new Date());
//			PartyEmployee partyEmployee = partyEmployeeRepository.newInstance(partyEmployeePo);
//			partyEmployee.create();
//			
//			//Party_entity
//			PartyEntityPo partyEntityPo = new PartyEntityPo();
//			partyEntityPo.setId(uid);
//			partyEntityPo.setPartyType(PartyType.employee);
//			partyEntityPo.setAlias(account);
//			partyEntityPo.setName(name);
//			partyEntityPo.setParentId("0");
//			partyEntityPo.setPath(uid+".");
//			partyEntityPo.setDepth(1);
//			partyEntityPo.setCreateBy("1");
//			partyEntityPo.setCreateTime(new Date());
//			PartyEntity pe = partyEntityRepository.newInstance(partyEntityPo);
//			pe.update();
//			
//			
		}
	}
	String getStringVal(HSSFCell cell) {
		if(cell==null)return "";
		switch (cell.getCellType()) {
		case HSSFCell.CELL_TYPE_BOOLEAN:
			return cell.getBooleanCellValue() ? "TRUE" : "FALSE";
		case HSSFCell.CELL_TYPE_FORMULA:
			return cell.getCellFormula();
		case HSSFCell.CELL_TYPE_NUMERIC:
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			return cell.getStringCellValue();
		case HSSFCell.CELL_TYPE_STRING:
			return cell.getStringCellValue();
		default:
			return "";
		}
	}
}
