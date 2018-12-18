
package com.lc.ibps.bishe.audit.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.audit.domain.LabelDef;
import com.lc.ibps.bishes.audit.domain.TchLabel;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;
import com.lc.ibps.bishes.audit.repository.LabelDefRepository;
import com.lc.ibps.bishes.audit.repository.TchLabelRepository;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;
import com.lc.ibps.bishes.labelType.repository.LabelTypeRepository;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.repository.PartyEmployeeRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;
import com.utils.OrgUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


/**
 * t_label_def 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
@Controller
@RequestMapping("/bishe/audit/labelDef/")
public class LabelDefController extends GenericController{
	@Resource
	private LabelDefRepository labelDefRepository;
	@Resource
	private PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	private TchLabelRepository tchLabelRepository;
	@Resource
	CurrentContext currentContext;	
	@Resource
	PartyEmployeeRepository partyEmployeeRepository;
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;
	@Resource
	LabelTypeRepository labelTypeRepository;
 
	
	@Transactional
	@RequestMapping("savetodb")
	public void savetodb(MultipartHttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		try {
			Map<String, String> tchName = new HashMap<>();  //tchName --> tchId 词典
			Map<String, String> labelName = new HashMap<>(); //labelName --> labelId 词典
			String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
			tchName = getTchName(orgId);
			labelName = getLabelName(orgId);
			MultipartFile file = request.getFile("xlsFile");
			InputStream  is = file.getInputStream();	
			HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
			List<String> labelNames = new ArrayList<>();  //标签名字列表
			HSSFSheet hssfSheet = null;
			HSSFRow hssfRow = null;
			HSSFCell cell = null;
			String cellStr = null;
			Map<String , List<String>> rowList = new HashMap<>();
			hssfSheet = hssfWorkbook.getSheetAt(0);
			hssfRow = hssfSheet.getRow(0);
			System.out.println(hssfRow);
			//解析第一行  得到标签种类
			for(int x = hssfRow.getFirstCellNum() + 1; x < hssfRow.getLastCellNum() ; ++x){
				cell = hssfRow.getCell(x);
				cellStr = getStringVal(cell);
				labelNames.add(cellStr);
			}
			//将未出现的标签写入数据库
			Set<String> existLabel = labelName.keySet();
			Set<String> unExistLabel = new HashSet();
			unExistLabel.clear();
			unExistLabel.addAll(labelNames);
			unExistLabel.removeAll(existLabel);
			for (String es : unExistLabel) {
				if (StringUtils.isNotBlank(es)) {
					LabelDefPo labelDefPo = new LabelDefPo();
					labelDefPo.setLabelName(es);
					labelDefPo.setOrgId(orgId);
					labelDefRepository.newInstance(labelDefPo).save();
				}
			}
			labelName = getLabelName(orgId); //labelName --> labelId 词典
			//遍历xls的行
			for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
				List<String> labelNameList = new ArrayList<>();
	 			hssfRow = hssfSheet.getRow(rowNum);
				int minColIx = hssfRow.getFirstCellNum();
				int maxColIx = hssfRow.getLastCellNum();
//				rowList = new HashMap();
				// 遍历该行，获取每个cell元素
				for (int x = minColIx + 1 ; x < maxColIx ; ++x) {
					cell = hssfRow.getCell( x );
					if (StringUtils.isNotBlank(getStringVal(cell))) {
						labelNameList.add( labelNames.get(x - 1) );
					}		
				}
				rowList.put(getStringVal(hssfRow.getCell(0)), labelNameList);
			}
			//将教师标签写入数据库
			List<String> noBsTch = new ArrayList<>();
			for (String es : rowList.keySet()) {
				String tchId = tchName.get(es);
				if (StringUtils.isNotBlank(tchId)) {
					List<String> labels = rowList.get(es);
					String labelStr = labelList2Str(labels,labelName);
					TchLabelPo tchLabelPo = new TchLabelPo();
					tchLabelPo.setId(tchId);
					tchLabelPo.setLabelId(labelStr);
					tchLabelPo.setOrgId(orgId);
					tchLabelRepository.newInstance(tchLabelPo).save();
				}else {
					noBsTch.add(es);
				}
			}
			jo.put("success", true);
			jo.put("msg", "标签导入成功");
		} catch (Exception e) {
			logger.error(e.getMessage());
			jo.put("success", false);
			jo.put("msg", "标签导入失败，请联系开发者");
		}
		response.getWriter().println(jo);
	}
	
	
	@Transactional
	@RequestMapping("saveStuTodb")
	public void saveStuTodb(MultipartHttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		try {
			Map<String, String> labelName = new HashMap<>(); //labelName --> labelId 词典
			String orgId = OrgUtil.getOrgId(currentContext, partyOrgAuthRepository);
			labelName = getLabelName(orgId);
			MultipartFile file = request.getFile("xlsFile1");
			InputStream  is = file.getInputStream();	
			HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
			List<String> labelNames = new ArrayList<>();  //标签名字列表
			HSSFSheet hssfSheet = null;
			HSSFRow hssfRow = null;
			HSSFCell cell = null;
			String cellStr = null;
			Map<String , List<String>> rowList = new HashMap<>();
			hssfSheet = hssfWorkbook.getSheetAt(0);
			hssfRow = hssfSheet.getRow(0);
			System.out.println(hssfRow);
			//解析第一行  得到标签种类
			for(int x = hssfRow.getFirstCellNum() + 1; x < hssfRow.getLastCellNum() ; ++x){
				cell = hssfRow.getCell(x);
				cellStr = getStringVal(cell);
				labelNames.add(cellStr);
			}
			//将未出现的标签写入数据库
			Set<String> existLabel = labelName.keySet();
			Set<String> unExistLabel = new HashSet();
			unExistLabel.clear();
			unExistLabel.addAll(labelNames);
			unExistLabel.removeAll(existLabel);
			for (String es : unExistLabel) {
				if (StringUtils.isNotBlank(es)) {
					LabelDefPo labelDefPo = new LabelDefPo();
					labelDefPo.setLabelName(es);
					labelDefPo.setOrgId(orgId);
					labelDefRepository.newInstance(labelDefPo).save();
				}
			}
			labelName = getLabelName(orgId); //labelName --> labelId 词典
			//遍历xls的行
			for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
				List<String> labelNameList = new ArrayList<>();
	 			hssfRow = hssfSheet.getRow(rowNum);
				int minColIx = hssfRow.getFirstCellNum();
				int maxColIx = hssfRow.getLastCellNum();
//				rowList = new HashMap();
				// 遍历该行，获取每个cell元素
				for (int x = minColIx + 1 ; x < maxColIx ; ++x) {
					cell = hssfRow.getCell( x );
					if (StringUtils.isNotBlank(getStringVal(cell))) {
						labelNameList.add( labelNames.get(x - 1) );
					}		
				}
				rowList.put(getStringVal(hssfRow.getCell(0)), labelNameList);
			}
			//将教师标签写入数据库
			List<String> noBsTch = new ArrayList<>();
			for (String es : rowList.keySet()) {
				String stuXh = es;
				List<String> labels = rowList.get(es);
				String labelStr = labelList2Str(labels,labelName);
				//得到学生论文
				String whereSql = "xh = " + stuXh;
				List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql);
				UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanPos.get(0);
				urlZhiYuanPo.setLabelId(labelStr);
				urlZhiYuanRepository.newInstance(urlZhiYuanPo).save();
			}
			jo.put("success", true);
			jo.put("msg", "标签导入成功");
		} catch (Exception e) {
			logger.error(e.getMessage());
			jo.put("success", false);
			jo.put("msg", "标签导入失败，请联系开发者");
		}
		response.getWriter().println(jo);
	}
	
	private String labelList2Str(List<String> labels, Map<String, String> labelName) {
		if (labels.size() == 0) {
			return "";
		}else {
			StringBuffer sBuffer = new StringBuffer(); 
			for (String e : labels) {
				sBuffer.append( labelName.get(e) );
				sBuffer.append(",");
			}
			return sBuffer.toString();
		}
	}

	private Map<String, String> getLabelName(String orgId) {
		Map<String, String> labelName = new HashMap<>();
		String whereSql = "org_id_ =" + orgId;
		List<LabelDefPo> labelDefPos = labelDefRepository.getBySql(whereSql);
		for (LabelDefPo es : labelDefPos) {
			labelName.put(es.getLabelName(), es.getId());
		}
		return labelName;
	}

	private Map<String, String> getTchName(String orgId) {
		Map<String, String> tchName = new HashMap<>();
		String whereSql = "org_id_ =" + orgId;
		List<TchLabelPo> tchLabelPos = tchLabelRepository.getBySql(whereSql);
		for (TchLabelPo es : tchLabelPos) {
			PartyEmployeePo tch = partyEmployeeRepository.get(es.getId());
			tchName.put(tch.getName(), es.getId());
		}
		return tchName;
	}

	static String getStringVal(HSSFCell cell) {
		if (cell == null)
			return "";
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
	
	@RequestMapping("selector")
	public ModelAndView selector(HttpServletRequest request,HttpServletResponse reponse) throws Exception {
		return getAutoView();
	}
	
	
	@RequestMapping("select2tch")
	public @ResponseBody JSONArray select2tch(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		//得到登陆教师或者管理员的院系Id
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return null;
			}else {
				orgId = partyOrgAuthPos.get(0).getOrgID();
			}
		}
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="org_id_ ='"+orgId+"'";
//		paramQueryFilter.addParamsFilter("whereSql", whereSql);
//		List<TchLabelPo> tchLabelPos = tchLabelRepository.query(paramQueryFilter);
		List<TchLabelPo> tchLabelPos = tchLabelRepository.getBySql(whereSql);
		JSONArray stuJson =new JSONArray();
		for (TchLabelPo e : tchLabelPos) {
			stuJson.add( JSONObject.fromObject("{\"id\":\"" + e.getId() + "\",\"text\":\"" + partyEmployeeRepository.get(e.getId()).getName() + "\"}") );
		}
		return stuJson;
	}
	
	
	@RequestMapping("select2labelName")
	public @ResponseBody JSONArray select2labelName(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		//得到登陆教师或者管理员的院系Id
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return null;
			}else {
				orgId = partyOrgAuthPos.get(0).getOrgID();
			}
		}
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql="org_id_ ='"+orgId+"'";
//		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		List<LabelDefPo> labelDefPos = labelDefRepository.getBySql(whereSql);
		JSONArray labelNameJson =new JSONArray();
		for (LabelDefPo e : labelDefPos) {
			labelNameJson.add( JSONObject.fromObject("{\"id\":\"" + e.getId() + "\",\"text\":\"" + labelDefRepository.get(e.getId()).getLabelName()+ "\"}") );
		}
		return labelNameJson;
	}
	/**
	 * 【t_label_def】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
			queryFilter.addFilter("org_id_", orgId, QueryOP.EQUAL);       //区分院系
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return null;
			}else {
				List<String> orgIds = new ArrayList<>();
				for (PartyOrgAuthPo e : partyOrgAuthPos) {
					orgIds.add(e.getOrgID());
				}
				queryFilter.addFilter("org_id_", orgIds, QueryOP.IN);
			}
		}
		
		
		PageList<LabelDefPo> labelDefList=(PageList<LabelDefPo>)labelDefRepository.query(queryFilter);
		//查询标签对应的教师和论文人数  
		for (LabelDefPo e : labelDefList) {
			int tchNum = tchLabelRepository.getNumByLabel("%" + e.getId() + "%");
			e.setTchCount(tchNum);
			int paperNum = urlZhiYuanRepository.getNumByLabel("%" + e.getId() + "%");
			e.setPaperCount(paperNum);
			String typeId = e.getTypeId();
			if (StringUtils.isNotBlank(typeId)) {
				e.setType(labelTypeRepository.get(typeId).getType());
			}else {
				e.setType("");
			}
			
		}
		
		
		return new PageJson(labelDefList);
	}
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		List<LabelTypePo> labelTypePos = getLabelType(currentContext);
		if (labelTypePos == null) {
			return null;
		}
		return getAutoView().addObject("labelTypeList", labelTypePos);
	}
	
	@RequestMapping("listForTch")
	public ModelAndView listForTch(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		List<LabelTypePo> labelTypePos = getLabelType(currentContext);
		if (labelTypePos == null) {
			return null;
		}
		return getAutoView().addObject("labelTypeList", labelTypePos);
	}
	
	private List<LabelTypePo> getLabelType(CurrentContext currentContext) {
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
		if (tchLabelPo != null) {
			orgId = tchLabelPo.getOrgId();
		}else {
			List<PartyOrgAuthPo> partyOrgAuthPos = partyOrgAuthRepository.queryByUserId(userId);
			if (partyOrgAuthPos.size() == 0 || partyOrgAuthPos == null) {
				return null;
			}else {
				orgId = partyOrgAuthPos.get(0).getOrgID();
			}
		}
		String whereSql = "org_id_ = " + orgId;
		List<LabelTypePo> labelTypePos = labelTypeRepository.findBySql(whereSql);
			return labelTypePos;
	}


//	@RequestMapping("edit")
//	public ModelAndView edit1(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
//		return getAutoView().addObject("labelTypeList", labelTypePos);
//	}
	
	
	
	/** 
	 * 管理员创建标签
	 *
	 * @param request
	 * @param response
	 * @param  labelDef
	 * @throws Exception
	 */
	@RequestMapping("adminDef")
	public void adminDef(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		try {

			//获取院系orgId
			User user = currentContext.getCurrentUser();
			String userId = user.getUserId();
			String orgId = "";
			List<PartyOrgAuthPo> orgIds = partyOrgAuthRepository.queryByUserId(userId);
			if (orgIds.size() == 1) {
				orgId = orgIds.get(0).getOrgID();
			}else {
				jo.put("isSuccess", false);
				jo.put("msg", "未获取管理员权限或者已成为多个组织管理员，请联系相关人员.");
				response.getWriter().println(jo);
				return;
			}
			
			String labelName = request.getParameter("labelName");
			String typeId = request.getParameter("typeId");
			String id = request.getParameter("id");
			LabelDefPo labelDefPo = new LabelDefPo();
//			LabelDefPo labelDefPo = getFromRequest(request);
			labelDefPo.setLabelName(labelName);
			labelDefPo.setOrgId(orgId);
			labelDefPo.setTypeId(typeId);
			labelDefPo.setId(id);
			//构造领域对象和保存数据
			LabelDef labelDef =labelDefRepository.newInstance(labelDefPo);
			labelDef.save();
//			if (labelDefPo.getId().isEmpty() || labelDefPo.getId() == null) {
//				labelDef.create();
//			}else {
//				labelDef.update();
//			}
			
			jo.put("isSuccess", true);
			jo.put("msg", "添加标签成功");
		} catch (Exception e) {
			jo.put("isSuccess", false);
			jo.put("msg", "添加标签失败");
			logger.error("对t_label_def操作失败，" + e.getMessage(),e);
		}
		response.getWriter().println(jo);
	}
	
	
	/** 
	 * 毕设教师创建标签
	 *
	 * @param request
	 * @param response
	 * @param  labelDef
	 * @throws Exception
	 */
	@RequestMapping("tchDef")
	public void tchDef(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		try {
			User user = currentContext.getCurrentUser();
			String userId = user.getUserId();
			//得到对应的院系orgId
			String orgId = tchLabelRepository.get(userId).getOrgId();;
			String labelName = request.getParameter("labelName");
			String typeId = request.getParameter("typeId");
			LabelDefPo labelDefPo = new LabelDefPo();
			labelDefPo.setOrgId(orgId);
			labelDefPo.setLabelName(labelName);
			labelDefPo.setTypeId(typeId);
			//构造领域对象和保存数据
			LabelDef labelDef =labelDefRepository.newInstance(labelDefPo);
			labelDef.save();
			jo.put("isSuccess", true);
			jo.put("msg", "添加标签成功");
		} catch (Exception e) {
			jo.put("isSuccess", false);
			jo.put("msg", "添加标签失败");
			logger.error("对t_label_def操作失败，" + e.getMessage(),e);
		}
		response.getWriter().println(jo);
	}
	
	
	
	/** 
	 * 清空毕设教师标签
	 *
	 * @param request
	 * @param response
	 * @param  labelDef
	 * @throws Exception
	 */
	@RequestMapping("emptyLabelForTch")
	public void emptyLabelForTch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		try {
			User user = currentContext.getCurrentUser();
			String userId = user.getUserId();
			String type = request.getParameter("type");
			if (("admin").equals(type)) {
				userId = request.getParameter("id");
			}
			TchLabelPo tchLabelPo = tchLabelRepository.get(userId);
			tchLabelPo.setLabelId("");
			//构造领域对象和保存数据
			TchLabel tchLabel =tchLabelRepository.newInstance(tchLabelPo);
			tchLabel.save();
			jo.put("isSuccess", true);
			jo.put("msg", "清空标签成功");
		} catch (Exception e) {
			jo.put("isSuccess", false);
			jo.put("msg", "清空标签失败");
			logger.error("对t_tch_label操作失败，" + e.getMessage(),e);
		}
		response.getWriter().println(jo);
	}
	
	
	/** 
	 * 清空毕设学生标签
	 *
	 * @param request
	 * @param response
	 * @param  labelDef
	 * @throws Exception
	 */
	@RequestMapping("emptyLabelForStu")
	public void emptyLabelForStu(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject jo = new JSONObject();
		String id = RequestUtil.getString(request, "id");
		try {
			UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(id);
			urlZhiYuanPo.setLabelId("");
			//构造领域对象和保存数据
			UrlZhiYuan tchLabel =urlZhiYuanRepository.newInstance(urlZhiYuanPo);
			tchLabel.save();
			jo.put("isSuccess", true);
			jo.put("msg", "清空标签成功");
		} catch (Exception e) {
			jo.put("isSuccess", false);
			jo.put("msg", "清空标签失败");
			logger.error("对UrlZhiYuan操作失败，" + e.getMessage(),e);
		}
		response.getWriter().println(jo);
	}
	
	/** 
	 * 合成标签  只有管理员才有该权限
	 *
	 * @param request
	 * @param response
	 * @param  labelDef
	 * @throws Exception
	 */
	@RequestMapping("compound")
	public void compound(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		//获取院系orgId
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		List<PartyOrgAuthPo> orgIds = partyOrgAuthRepository.queryByUserId(userId);
		if (orgIds.size() == 1) {
			orgId = orgIds.get(0).getOrgID();
		}else {
			message=new ResultMessage(ResultMessage.FAIL, "未获取管理员权限或者已成为多个组织管理员，请联系相关人员.");
			return;
		}
		try {
			String[] ids = RequestUtil.getStringAryByStr(request, "ids");
			String labelName = RequestUtil.getString(request, "labelName");
			String typeId = RequestUtil.getString(request, "typeId");
//			String orgId = RequestUtil.getString(request, "orgId");
			LabelDef labelDef =labelDefRepository.newInstance();
			labelDef.deleteByIds(ids);
			LabelDefPo labelDefPo = new LabelDefPo();
			labelDefPo.setLabelName(labelName);
			labelDefPo.setTypeId(typeId);
			labelDefPo.setOrgId(orgId);
			labelDefRepository.newInstance(labelDefPo).save();
			for (String oldId : ids) {
				tchLabelRepository.compoundLabel(oldId, labelDefPo.getId(), orgId);
				urlZhiYuanRepository.compoundLabel(oldId, labelDefPo.getId(), orgId);
			}	
			//标签去重
			String whereSql="org_id_ ='"+orgId+"'";
			List<TchLabelPo> tchLabelPos = tchLabelRepository.getBySql(whereSql);
			for (TchLabelPo e : tchLabelPos) {
				if (e.getLabelId() != null && !("").equals(e.getLabelId())) {
					e.setLabelId( unique(e.getLabelId().split(",")) );
					tchLabelRepository.newInstance(e).save();
				}
			}
			String whereSql1="orgId ='"+orgId+"'";
			List<UrlZhiYuanPo> urlZhiYuanPos = urlZhiYuanRepository.getBySql(whereSql1);
			for (UrlZhiYuanPo e : urlZhiYuanPos) {
				if (e.getLabelId() != null && !("").equals(e.getLabelId())) {
					e.setLabelId( unique(e.getLabelId().split(",")) );
					urlZhiYuanRepository.newInstance(e).save();
				}
			}
			message=new ResultMessage(ResultMessage.SUCCESS, "合成标签成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "合成标签失败,"+e.getMessage());
			logger.error("合成标签失败" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	private String unique(String[] labelIds) {
		Set<String> set = new java.util.HashSet<String>();
  		for (String e : labelIds) {
			set.add(e);
		}
		StringBuffer sBuffer = new StringBuffer();
		for (String e : set) {
			if (!("").equals(e)) {
				sBuffer.append(e);
				sBuffer.append(",");
			}
		}
		return sBuffer.toString();
	}


	@RequestMapping("compoundLabel")
	public ModelAndView compoundLabel(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String[] ids = RequestUtil.getStringAryByStr(request, "ids");
		StringBuffer sBuffer = new StringBuffer();
//		List<String> sb = new ArrayList<String>();
		for (String id : ids) {
//			sb.add(id);
			sBuffer.append(id);
			sBuffer.append(",");
		}
		List<LabelTypePo> labelTypePos = getLabelType(currentContext);
		if (labelTypePos == null) {
			return null;
		}
		return getAutoView().addObject("ids", sBuffer).addObject("labelTypePoList",labelTypePos);
	}
	/** 
	 * 设置教师标签  tchId, labelIds
	 *
	 * @param request
	 * @param response
	 * @param  labelDef
	 * @throws Exception
	 */
	@RequestMapping("setTchLabel")
	public void setTchLabel(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			User user = currentContext.getCurrentUser();
			String tchId = user.getUserId();
			String[] labelIds = RequestUtil.getStringAryByStr(request, "labelIds");
			TchLabelPo tchLabelPo = tchLabelRepository.get(tchId);
			StringBuffer labelId = new StringBuffer();
			if(tchLabelPo.getLabelId() != null && !("").equals(tchLabelPo.getLabelId()))
				labelId.append( tchLabelPo.getLabelId() );
			for (String e : labelIds) {
				labelId.append(e);
				labelId.append(",");
			}
			tchLabelPo.setLabelId(labelId.toString());
			tchLabelRepository.newInstance(tchLabelPo).save();
			message=new ResultMessage(ResultMessage.SUCCESS, "设置标签成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "设置标签失败,"+e.getMessage());
			logger.error("设置标签失败" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/** 
	 * 设置学生标签  stuId, labelIds
	 *
	 * @param request
	 * @param response
	 * @param  labelDef
	 * @throws Exception
	 */
	@RequestMapping("setStuLabel")
	public void setStuLabel(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			String[] labelIds = RequestUtil.getStringAryByStr(request, "labelIds");
			StringBuffer labelId = new StringBuffer();
			String stuId = RequestUtil.getString(request, "stuId");
			UrlZhiYuanPo urlZhiYuanPo = urlZhiYuanRepository.get(stuId);
			if(urlZhiYuanPo.getLabelId() != null && !("").equals(urlZhiYuanPo.getLabelId()))
				labelId.append( urlZhiYuanPo.getLabelId() );
			for (String e : labelIds) {
				labelId.append(e);
				labelId.append(",");
			}	
			urlZhiYuanPo.setLabelId(labelId.toString());
			urlZhiYuanRepository.newInstance(urlZhiYuanPo).save();
			message=new ResultMessage(ResultMessage.SUCCESS, "设置标签成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "设置标签失败,"+e.getMessage());
			logger.error("设置标签失败" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
	/**
	 * 管理员教师编辑标签信息页面
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
		LabelDefPo labelDef=null;
		String curType = "";
		String curTypeId = "";
		if(StringUtil.isNotEmpty(id)){
			labelDef=labelDefRepository.get(id);
			curTypeId = labelDef.getTypeId();
			if(StringUtil.isNotBlank(curTypeId))
				curType = labelTypeRepository.get(curTypeId).getType();
		}
		List<LabelTypePo> labelTypePos = getLabelType(currentContext);
		if (labelTypePos == null) {
			return null;
		}
		return getAutoView().addObject("labelDef", labelDef).addObject("returnUrl", preUrl).addObject("labelTypePoList",labelTypePos)
				.addObject("curTypeId",curTypeId).addObject("curType",curType);
	}
	
	
	
	/**
	 * 教师编辑标签信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("editForTch")
	public ModelAndView editForTch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		LabelDefPo labelDef=null;
		String curType = "";
		String curTypeId = "";
		if(StringUtil.isNotEmpty(id)){
			labelDef=labelDefRepository.get(id);
			curTypeId = labelDef.getTypeId();
			if(StringUtil.isNotBlank(curTypeId))
				curType = labelTypeRepository.get(curTypeId).getType();
		}
		List<LabelTypePo> labelTypePos = getLabelType(currentContext);
		if (labelTypePos == null) {
			return null;
		}
		return getAutoView().addObject("labelDef", labelDef).addObject("returnUrl", preUrl).addObject("labelTypePoList",labelTypePos)
				.addObject("curTypeId",curTypeId).addObject("curType",curType);
	}
	
	/**
	 * 编辑【t_label_def】信息页面
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
		LabelDefPo labelDef=null;
		if(StringUtil.isNotEmpty(id)){
			labelDef=labelDefRepository.get(id);
		}
		return getAutoView().addObject("labelDef", labelDef).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_label_def】明细页面
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
		LabelDefPo labelDef=null;
		if(StringUtil.isNotEmpty(id)){
			labelDef=labelDefRepository.get(id);
		}
		return getAutoView().addObject("labelDef", labelDef).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_label_def】信息
	 *
	 * @param request
	 * @param response
	 * @param  labelDef
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			LabelDefPo labelDefPo = getFromRequest(request);
			//构造领域对象和保存数据
			LabelDef labelDef =labelDefRepository.newInstance(labelDefPo);
			labelDef.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_label_def成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_label_def操作失败,"+e.getMessage());
			logger.error("对t_label_def操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private LabelDefPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		LabelDefPo labelDefPo = getLabelDefPo(jsonObj);

		return labelDefPo;
	}
	
	/** 
	 * 获取t_label_def数据
	 *
	 * @param jsonObj
	 */
	private LabelDefPo getLabelDefPo(JSONObject jsonObj){
		LabelDefPo labelDefPo = (LabelDefPo) JsonUtil.getDTO(jsonObj.toString(), LabelDefPo.class);
		return labelDefPo;
	}
	
	
	/**
	 *  批量删除【t_label_def】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		User user = currentContext.getCurrentUser();
		String userId = user.getUserId();
		String orgId = "";
		List<PartyOrgAuthPo> orgIds = partyOrgAuthRepository.queryByUserId(userId);
		if (orgIds.size() == 1) {
			orgId = orgIds.get(0).getOrgID();
		}else {
			message=new ResultMessage(ResultMessage.FAIL, "未获取管理员权限或者已成为多个组织管理员，请联系相关人员.");
			return;
		}
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			LabelDef labelDef =labelDefRepository.newInstance();
			labelDef.deleteByIds(ids);
			//处理标签使用
			for (String oldId : ids) {
				tchLabelRepository.compoundLabel(oldId+",", "", orgId);
				urlZhiYuanRepository.compoundLabel(oldId+",", "", orgId);
			}
			message=new ResultMessage(ResultMessage.SUCCESS, "删除标签成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除标签失败，" + e.getMessage());
			logger.error("删除t_label_def失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
