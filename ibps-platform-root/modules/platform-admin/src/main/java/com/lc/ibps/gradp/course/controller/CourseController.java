
package com.lc.ibps.gradp.course.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

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
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.common.file.repository.AttachmentRepository;
import com.lc.ibps.grads.course.domain.Course;
import com.lc.ibps.grads.course.domain.CrsStd;
import com.lc.ibps.grads.course.persistence.entity.CoursePo;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.repository.CourseRepository;
import com.lc.ibps.grads.course.repository.CrsStdRepository;
import com.lc.ibps.org.party.persistence.entity.PartyEntityPo;
import com.lc.ibps.org.party.persistence.entity.PartyOrgAuthPo;
import com.lc.ibps.org.party.persistence.entity.PartyUserPo;
import com.lc.ibps.org.party.repository.PartyEntityRepository;
import com.lc.ibps.org.party.repository.PartyOrgAuthRepository;
import com.lc.ibps.org.party.repository.PartyUserRepository;
import com.utils.AdminUtil;

import net.sf.json.JSONObject;

/**
 * 课程 控制类
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 19:48:30
 * </pre>
 */
@Controller
@RequestMapping("/gradp/course/course/")
public class CourseController extends GenericController {
	@Resource
	CourseRepository courseRepository;
	@Resource
	PartyUserRepository partyUserRepository;
	@Resource
	AttachmentRepository attachmentRepository;
	@Resource
	CrsStdRepository crsStdRepository;
	@Resource
	PartyOrgAuthRepository partyOrgAuthRepository;
	@Resource
	PartyEntityRepository partyEntityRepository;

	/**
	 * 【课程】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		if (!AdminUtil.isSuperAdmin(partyOrgAuthRepository, partyEntityRepository)) {
			String userId = ContextUtil.getCurrentUserId();
			List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
			queryFilter.addFilter("orgId", list.get(0).getOrgID(), QueryOP.EQUAL);
		}
		PageList<CoursePo> courseList = (PageList<CoursePo>) courseRepository.query(queryFilter);
		return new PageJson(courseList);
	}

	/**
	 * 编辑【课程】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		CoursePo course = null;
		QueryFilter queryFilter = getQuerFilter(request);
		queryFilter.addFilter("DEPTH_", 2, QueryOP.EQUAL);
		queryFilter.addFilter("NAME_", "学院", QueryOP.LIKE);
		String userId = ContextUtil.getCurrentUserId();
		List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
		String orgId = list.get(0).getOrgID();
		queryFilter.addFilter("PATH_", orgId + "%", QueryOP.LIKE);

		List<PartyEntityPo> xueyuan = partyEntityRepository.query(queryFilter);
		queryFilter = getQuerFilter(request);
		queryFilter.addFilter("DEPTH_", 3, QueryOP.EQUAL);
		queryFilter.addFilter("PATH_", xueyuan.get(0).getPath() + "%", QueryOP.LIKE);
		List<PartyEntityPo> realXueyuan = partyEntityRepository.query(queryFilter);
		Map<String, String> map = new HashMap<String, String>();
		for (PartyEntityPo partyEntityPo : realXueyuan) {
			String org = partyEntityPo.getPath().substring(0, partyEntityPo.getPath().indexOf("."));
			map.put(partyEntityPo.getName(), org);
		}
		if (StringUtil.isNotEmpty(id)) {
			course = courseRepository.get(id);
		}
		return getAutoView().addObject("course", course).addObject("returnUrl", preUrl).addObject("orgmap", map);
	}

	/**
	 * 编辑【课程】信息页面
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
		CoursePo course = null;
		if (StringUtil.isNotEmpty(id)) {
			course = courseRepository.get(id);
		}
		return getAutoView().addObject("course", course).addObject("returnUrl", preUrl);
	}

	/**
	 * 【课程】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		CoursePo course = null;
		if (StringUtil.isNotEmpty(id)) {
			course = courseRepository.get(id);
		}
		return getAutoView().addObject("course", course).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存【课程】信息
	 *
	 * @param request
	 * @param response
	 * @param course
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			CoursePo coursePo = getFromRequest(request);
			if (coursePo.getCollege().equals("")) {
				String userId = ContextUtil.getCurrentUserId();
				List<PartyOrgAuthPo> list = partyOrgAuthRepository.queryByUserId(userId);
				String orgId = list.get(0).getOrgID();
				coursePo.setOrgId(orgId);
			} else {
				String[] strings = coursePo.getCollege().split("@");
				coursePo.setCollege(strings[0]);
				coursePo.setOrgId(strings[1]);
			}
			// 构造领域对象和保存数据
			Course course = courseRepository.newInstance(coursePo);
			course.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存课程成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "对课程操作失败," + e.getMessage());
			logger.error("对课程操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取表单数据
	 *
	 * @param request
	 */
	private CoursePo getFromRequest(HttpServletRequest request) {
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);

		CoursePo coursePo = getCoursePo(jsonObj);

		return coursePo;
	}

	/**
	 * 获取课程数据
	 *
	 * @param jsonObj
	 */
	private CoursePo getCoursePo(JSONObject jsonObj) {
		CoursePo coursePo = (CoursePo) JsonUtil.getDTO(jsonObj.toString(), CoursePo.class);
		return coursePo;
	}

	/**
	 * 批量删除【课程】记录
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
			Course course = courseRepository.newInstance();
			course.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除课程成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除课程失败，" + e.getMessage());
			logger.error("删除课程失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 导入界面
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("dataImport")
	public ModelAndView dataImport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		int type = RequestUtil.getInt(request, "type");
		if (type == 4) {
			request.getSession().setAttribute("crs_tch_id", RequestUtil.getString(request, "crs_tch_id"));
		}
		String dataTypes[] = { "课程大纲", "教师名单", "学生名单", "教师授课", "我的学生" };
		String dataType = dataTypes[type];
		List<AttachmentPo> aps = attachmentRepository.findAll();
		String fid = courseRepository.getFileIdByFileName(aps, dataType + "-模板");
		return getAutoView().addObject("dataType", dataType).addObject("fid", fid);
	}

	@RequestMapping("imbortXls")
	public void imbortXls(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		int type = RequestUtil.getInt(request, "type");// type 0-4 : { "课程大纲", "教师名单", "学生名单", "教师授课" ,"我的学生"}

		MultipartFile file = request.getFile("xlsFile");
		InputStream is = file.getInputStream();
		realImportInfo(is, type, request);
	}

	private void realImportInfo(InputStream is, int type, MultipartHttpServletRequest request) throws IOException {
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
			// type:0~4:{ "课程大纲", "教师名单", "学生名单", "教师授课" ,"我的学生"}
			/* 表结构发生变化时，需要改变 */
			if (type == 0) {

			} else if (type == 1) {

			} else if (type == 2) {

			} else if (type == 3) {

			} else if (type == 4) {
				// 导入学生：查询学号姓名在user表中是否存在，存在即可写入crs_std,不存在则不写
				// excel:0~1：学号 姓名
				String std_num = rowList.get(0);
				String std_account = "heu" + std_num;
				PartyUserPo user = partyUserRepository.getByAccount(std_account);
				if (user != null) {
					String crs_tch_id = request.getSession().getAttribute("crs_tch_id").toString();
					CrsStdPo csp = new CrsStdPo();
					csp.setStdNum(std_num);
					csp.setCrsTchId(crs_tch_id);
					CrsStd crsStd = crsStdRepository.newInstance(csp);
					crsStd.save();
				}
			}
		}
	}

	String getStringVal(HSSFCell cell) {
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

	/**
	 * 课程下拉框搜索器
	 * 
	 * 
	 */
	@RequestMapping("courseList")
	@ResponseBody
	public List<Map<String, String>> courseList(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// hi
		return null;
	}
}
