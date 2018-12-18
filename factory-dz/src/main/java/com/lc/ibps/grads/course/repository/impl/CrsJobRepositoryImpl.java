package com.lc.ibps.grads.course.repository.impl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.common.file.persistence.dao.AttachmentQueryDao;
import com.lc.ibps.common.file.persistence.entity.AttachmentPo;
import com.lc.ibps.grads.course.domain.CrsJob;
import com.lc.ibps.grads.course.persistence.dao.CourseQueryDao;
import com.lc.ibps.grads.course.persistence.dao.CrsJobQueryDao;
import com.lc.ibps.grads.course.persistence.dao.CrsTchQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CourseParamPo;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdTbl;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.utils.CheckMSWordUtil;
import com.utils.DateUtil;

import net.sf.json.JSONArray;

/**
 * t_crs_job 仓库的实现类
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-17 01:51:34
 * </pre>
 */
@Repository
public class CrsJobRepositoryImpl extends AbstractRepository<String, CrsJobPo, CrsJob> implements CrsJobRepository {

	@Resource
	private CourseQueryDao courseQueryDao;
	@Resource
	private CrsTchQueryDao crsTchQueryDao;
	@Resource
	private CrsJobQueryDao crsJobQueryDao;
	@Resource
	AttachmentQueryDao attachmentQueryDao;
	private IQueryDao<String, AttachmentPo> crsStdQueryDao;
	@Override
	public CrsJob newInstance() {
		CrsJobPo po = new CrsJobPo();
		CrsJob crsJob = AppUtil.getBean(CrsJob.class);
		crsJob.setData(po);
		return crsJob;
	}

	@Override
	public CrsJob newInstance(CrsJobPo po) {
		CrsJob crsJob = AppUtil.getBean(CrsJob.class);
		crsJob.setData(po);
		return crsJob;
	}

	@Override
	protected IQueryDao<String, CrsJobPo> getQueryDao() {
		return crsJobQueryDao;
	}

	@Override
	public PageList<CrsJobPo> resFromPageList(PageList<CrsJobPo> crsJobList) {
		PageList<CrsJobPo> crsJobListRes = new PageList();
		crsJobListRes.setPageResult(crsJobList.getPageResult());
		for (CrsJobPo cjp : crsJobList) {
			String startTime = cjp.getStartStopTime().split("/")[0];
			String stopTime = cjp.getStartStopTime().split("/")[1];
			startTime += "(" + DateUtil.dayForWeek(startTime) + ")";
			stopTime += "(" + DateUtil.dayForWeek(stopTime) + ")";
			cjp.setStartTime(startTime);
			cjp.setStopTime(stopTime);
			int oldStatus = cjp.getStatus();
			String showStatus = "";
			int cmpr = DateUtil.currentCompareByRange(startTime, stopTime);
			if (cmpr == DateUtil.BEFORE) {
				showStatus = "<span style=\"color:gray\">未开始</span>";
				cjp.setStatus(CrsJobPo.NOTSTART);
			} else if (cmpr == DateUtil.BETWEEN) {
				showStatus = "<span style=\"color:green\">进行中</span>";
				cjp.setStatus(CrsJobPo.STARTING);
			} else if (cmpr == DateUtil.AFTER) {
				showStatus = "<span style=\"color:red\">已结束</span>";
				cjp.setStatus(CrsJobPo.CLOSED);
			}
			if (oldStatus != cjp.getStatus()) {
				CrsJob cj = newInstance(cjp);
				cj.save();
			}
			cjp.setShowStatus(showStatus);
			cjp.setShowCategory(CourseParamPo.CATEGORYLIST[cjp.getCategory()]);
			String sf = cjp.getStdFnsh() + "/" + cjp.getStdNd();
			String tf = cjp.getTchFnsh() + "/" + cjp.getTchNd();
			if (cjp.getStdAllFnsh() == CrsJobPo.ALLFINISH) {
				sf = "<span style=\"color:greed\">" + sf + "</span>";
			}

			if (cjp.getTchAllFnsh() == CrsJobPo.ALLFINISH)
				tf = "<span style=\"color:greed\">" + tf + "</span>";
			cjp.setStdFinished(sf);
			cjp.setReviewPercent(tf);
			CrsTchPo ctp = crsTchQueryDao.get(cjp.getCrsTchId());
			cjp.setClazz(courseQueryDao.getByKey("getBy_num", ctp.getCrsNum()).getName() + "-" + ctp.getClazz());
			crsJobListRes.add(cjp);
		}
		return crsJobListRes;
	}

	@Override
	public JSONArray checkRepeat(List<JobStdPo> jsps) {
		List<String> fileIds = parseFileIds(jsps);
		List<String> filePaths = getPathsByFileIds(fileIds);
		CheckMSWordUtil cru = new CheckMSWordUtil();
		return cru.checkRepeat(filePaths);

	}

	private List<String> parseFileIds(List<JobStdPo> jsps) {
		List<String> res = new ArrayList();
		for (JobStdPo jsp : jsps) {
			res.add(JobStdTbl.parseFile(jsp.getFile())[1]);
		}
		return res;
	}

	private List getPathsByFileIds(List<String> fileIds) {
		List<String> res = new ArrayList();
		for (String id : fileIds) {
			AttachmentPo attachmentPo = attachmentQueryDao.get(id);
			String path = AppFileUtil.getBasePath() + attachmentPo.getFilePath().substring(1);
			res.add(path);
		}
		return res;
	}

	@Override
	public long[] getDistanceTimes(String str1, String str2) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date one;
		Date two;
		long day = 0;
		long hour = 0;
		long min = 0;
		long sec = 0;
		try {
			one = df.parse(str1);
			two = df.parse(str2);
			long time1 = one.getTime();
			long time2 = two.getTime();
			long diff = time2 - time1;
			day = diff / (24 * 60 * 60 * 1000);
			hour = (diff / (60 * 60 * 1000) - day * 24);
			min = ((diff / (60 * 1000)) - day * 24 * 60 - hour * 60);
			sec = (diff / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long[] times = { day, hour, min, sec };
		return times;
	}

	@Override
	public List getAfterJobs(String now, String crsTchId) {
		now += "/::::::::::::::::";
		Map<String, String> args = new HashMap();
		args.put("START_STOP_TIME >", now);
		args.put("CRS_TCH_ID =", crsTchId);
		return findByCol(args);
	}

	@Override
	public CrsJobPo getByCol(Map args) {
		return crsJobQueryDao.getByKey("getByCol", makeParam(args));
	}

	@Override
	public List<CrsJobPo> findByCol(Map args) {
		return crsJobQueryDao.findByKey("getByCol", makeParam(args));
	}

	@Override
	public Map makeParam(Map<String, String> args) {
		Map res = new HashMap<String, Map>();
		if (args.containsKey("__mode")) {
			res.put("__mode", args.get("__mode"));
			args.remove("__mode");
		}
		res.put("relationMap", args);
		return res;
	}

	@Override
	public CrsJobPo makeTime(CrsJobPo crsJob) {
		String[] ssTime = crsJob.getStartStopTime().split("/");
		crsJob.setStartTime(ssTime[0] + " ( 周" + DateUtil.dayForWeek(ssTime[0]) + " )");
		crsJob.setStopTime(ssTime[1] + " ( 周" + DateUtil.dayForWeek(ssTime[1]) + " )");

		return crsJob;
	}

	@Override
	public CrsJobPo makeStatus(CrsJobPo crsJob) {
		String[] ssTime = crsJob.getStartStopTime().split("/");
		int comp = DateUtil.currentCompareByRange(ssTime[0], ssTime[1]);
		int s = crsJob.getStatus();
		String showStatus = null;
		switch (comp) {
		case DateUtil.BEFORE:
			if (s != CrsJobPo.NOTSTART) {
				s = CrsJobPo.NOTSTART;
				crsJob.setStatus(s);
				newInstance(crsJob).save();
			}
			showStatus = "<span style=\"color:gray\">未开始</span>";
			break;
		case DateUtil.BETWEEN:
			if (s != CrsJobPo.STARTING) {
				s = CrsJobPo.STARTING;
				crsJob.setStatus(s);
				newInstance(crsJob).save();
			}
			showStatus = "<span style=\"color:green\">进行中</span>";
			break;
		case DateUtil.AFTER:
			if (s != CrsJobPo.CLOSED) {
				s = CrsJobPo.CLOSED;
				crsJob.setStatus(s);
				newInstance(crsJob).save();
			}
			showStatus = "<span style=\"color:red\">已结束</span>";
			break;
		default:
			showStatus = "";
			break;
		}
		crsJob.setShowStatus(showStatus);
		return crsJob;
	}

	@Override
	public List<CrsJobPo> selectSubmitUnSubmitNum(String crs_tch_id) {
		// TODO Auto-generated method stub
		return crsJobQueryDao.findByKey("selectSubmitUnSubmitNum", crs_tch_id);
	}

	@Override
	public List<CrsJobPo> selectVirSub(CrsTchPo crsTchPo) {
		// TODO Auto-generated method stub
		return crsJobQueryDao.findByKey("selectVirSub", crsTchPo);
	}

	@Override
	public List<CrsJobPo> selectVirUnSub(CrsTchPo crsTchPo) {
		// TODO Auto-generated method stub
		return crsJobQueryDao.findByKey("selectVirUnSub", crsTchPo);
	}

	@Override
	public List<CrsJobPo> selectCheck(CrsTchPo crsTchPo) {
		// TODO Auto-generated method stub
		return crsJobQueryDao.findByKey("selectCheck", crsTchPo);
	}

	@Override
	public List<CrsJobPo> selectAllCheck(String crs_tch_id) {
		// TODO Auto-generated method stub
		return crsJobQueryDao.findByKey("selectAllCheck", crs_tch_id);
	}

	

}
