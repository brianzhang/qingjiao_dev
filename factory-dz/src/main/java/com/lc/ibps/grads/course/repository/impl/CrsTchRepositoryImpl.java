package com.lc.ibps.grads.course.repository.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.time.DateUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.grads.course.domain.CrsTch;
import com.lc.ibps.grads.course.persistence.dao.CourseParamModalQueryDao;
import com.lc.ibps.grads.course.persistence.dao.CourseQueryDao;
import com.lc.ibps.grads.course.persistence.dao.CrsJobDao;
import com.lc.ibps.grads.course.persistence.dao.CrsJobQueryDao;
import com.lc.ibps.grads.course.persistence.dao.CrsStdQueryDao;
import com.lc.ibps.grads.course.persistence.dao.CrsTchQueryDao;
import com.lc.ibps.grads.course.persistence.dao.JobStdDao;
import com.lc.ibps.grads.course.persistence.dao.JobStdQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CourseParamPo;
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;
import com.lc.ibps.grads.course.repository.CrsJobRepository;
import com.lc.ibps.grads.course.repository.CrsStdRepository;
import com.lc.ibps.grads.course.repository.CrsTchRepository;
import com.lc.ibps.grads.course.repository.JobStdRepository;
import com.lc.ibps.grads.course.thread.CreateJobStd;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * t_crs_tch 仓库的实现类
 *
 * <pre>
 *  
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 19:11:14
 * </pre>
 */
@Repository
public class CrsTchRepositoryImpl extends AbstractRepository<String, CrsTchPo, CrsTch> implements CrsTchRepository {

	@Resource
	CrsTchQueryDao crsTchQueryDao;
	@Resource
	CourseQueryDao courseQueryDao;
	@Resource
	CrsJobQueryDao crsJobQueryDao;
	@Resource
	JobStdQueryDao jobStdQueryDao;
	@Resource
	CrsStdQueryDao crsStdQueryDao;
	@Resource
	JobStdDao jobStdDao;
	@Resource
	CrsJobDao crsJobDao;
	@Resource
	CourseParamModalQueryDao courseParamModalQueryDao;
	@Resource
	CrsJobRepository crsJobRepository;
	@Resource
	JobStdRepository jobStdRepository;
	@Resource
	CrsStdRepository crsStdRepository;
	@Override
	public CrsTch newInstance() {
		CrsTchPo po = new CrsTchPo();
		CrsTch crsTch = AppUtil.getBean(CrsTch.class);
		crsTch.setData(po);
		return crsTch;
	}

	@Override
	public CrsTch newInstance(CrsTchPo po) {
		CrsTch crsTch = AppUtil.getBean(CrsTch.class);
		crsTch.setData(po);
		return crsTch;
	}

	@Override
	protected IQueryDao<String, CrsTchPo> getQueryDao() {
		return crsTchQueryDao;
	}
	@Override
	public CrsTchPo getByCol(Map args) {
		return crsTchQueryDao.getByKey("getByCol", makeParam(args));
	}

	@Override
	public List<CrsTchPo> findByCol(Map args) {
		return crsTchQueryDao.findByKey("getByCol", makeParam(args));
	}

	@Override
	public Map makeParam(Map args) {
		Map res = new HashMap<String,Map>();
		if(args.containsKey("__mode")){
			res.put("__mode", args.get("__mode"));
			args.remove("__mode");
		}
		res.put("relationMap", args);
		return res;
	}

	@Override
	public CrsTchPo parseCrsTchPoByJson(JSONObject jo) {
		CrsTchPo crsTchPo = new CrsTchPo();
		crsTchPo.setId( get(jo, "id") );
		crsTchPo.setClazz(get(jo, "clazz"));
		crsTchPo.setCrsNum(get(jo, "crsNum"));
		crsTchPo.setLocation(get(jo, "location"));
		crsTchPo.setParamid(get(jo, "paramid"));
		crsTchPo.setTchNum(get(jo, "tchNum"));
		crsTchPo.setTime(get(jo, "time"));
		crsTchPo.setTerm(get(jo, "term"));
		crsTchPo.setStartTime(get(jo, "startTime"));
		return crsTchPo;
	}
	private String get(JSONObject jo , String key) {
		if(jo.containsKey(key))
			return jo.getString(key);
		return "";
	}
	@Override
	public PageList<CrsTchPo> resFromPageList(PageList<CrsTchPo> crsTchList) {
		PageList<CrsTchPo> crsTchListRes = new PageList();
		crsTchListRes.setPageResult(crsTchList.getPageResult());
		Iterator<CrsTchPo> it = crsTchList.iterator();
		while (it.hasNext()) {
			CrsTchPo ctp = it.next();
			// 获取教师姓名添加到记录
		}
		return crsTchListRes;
	}
	@Override
	public void del(String crsTchId){
		Map args = new HashMap();
		args.put("crs_tch_id =", crsTchId);
		List<CrsJobPo> cjps = crsJobRepository.findByCol(args);
		String[] ids = new String[cjps.size()];
		int i = 0;
		for (CrsJobPo cjp : cjps) {
			String jobId = cjp.getId();
			ids[i] = "";
			ids[i] = cjp.getId();
			++i;
		}
		crsJobDao.deleteByIds(ids);
	}
	@Override
	public void updateByParam(String paramid, String crsTchId , boolean reset) throws ParseException {
		Map args = new HashMap();
		if(reset){
			// 判断是否有作业存在，如果有，则清空
			del(crsTchId);
		}

		ExecutorService pool = Executors.newFixedThreadPool(9);
		if (!StringUtils.isEmpty(paramid) && !"null".equals(paramid)) {// -1:请选择
			// 根据modelParam写课程作业、学生作业
			JSONArray paramJson = JSONArray.fromObject(courseParamModalQueryDao.get(paramid).getParam());
			Iterator<JSONObject> joIt = paramJson.iterator();
			while (joIt.hasNext()) {
				JSONObject jo = joIt.next();
				args.clear();
				args.put("crs_tch_id =", crsTchId);
				List<CrsStdPo> csps = crsStdRepository.findByCol(args);

				String crsTchStartTime = crsTchQueryDao.get(crsTchId).getStartTime();
				int count = Integer.parseInt(jo.getString("count"));
				String name = jo.getString("name").equals("") ? "未命名" : jo.getString("name");
				float scorePower = Float.parseFloat(jo.getString("scorePower"));;
				/*try {
					scorePower = (float) jo.get("scorePower");
				} catch (ClassCastException e) {
					String s = jo.getString("scorePower");
					if (s.indexOf('.') != -1) {
						scorePower = Float.parseFloat(s.substring(0, s.indexOf('.') + 4));
					} else {
						scorePower = Float.parseFloat(s);
					}
				}*/
				String startWeek = jo.getString("startWeek");
				String startDay = jo.getString("startDay");
				String startTime = jo.getString("startTime");
				int cycle = jo.getInt("cycle");
				int period = jo.getInt("period");
				for (int j = 1; j <= count; ++j) {
					// crs-job
					CrsJobPo cjp = new CrsJobPo();
					cjp.setTitle(count > 1 ? ("第 " + j + " 次 " + name) : name);
					cjp.setScorePower(scorePower);
					cjp.setStartStopTime(
							makeStartStopTime(startWeek, startDay, startTime, crsTchStartTime, period, cycle, j));
					cjp.setStatus(CrsJobPo.NOTSTART);
					cjp.setCrsTchId(crsTchId);
					cjp.setCreatedTime(DateUtil.getCurrentTime());
					cjp.setCreateBy(ContextUtil.getCurrentUserId());
					cjp.setStdNd(csps.size());
					cjp.setTchNd(csps.size());
					crsJobRepository.newInstance(cjp).save();
					// job-std
					int tt = 0;
					String jobId = cjp.getId();
					for(CrsStdPo csp : csps)
						pool.submit(new CreateJobStd(csp,jobId,jobStdDao));
				}
			}
		}

		pool.shutdown();
	}

	/**
	 * 开始周、周几、时间、课程开课时间、周期、第几周期->作业开始时间-截止时间
	 * 
	 * @param startWeek
	 * @param startDay
	 * @param startTime
	 * @param crsTchStartTime
	 * @param cycle
	 * @param i
	 *            第几个周期
	 * @return
	 * @throws ParseException
	 */
	private String makeStartStopTime(String startWeek, String startDay, String startTime, String crsTchStartTime,
			int period, int cycle, int i) throws ParseException, NullPointerException {
		String res = "";
		int week = Integer.parseInt(startWeek);
		int day = Integer.parseInt(startDay);
		int cycleMap[] = { 30,1, 6, 1, 7, 14, 30, 60 };//半小时 一小时，半天 一天 一周 双周 一个月 双月
		SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat f1 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Calendar calendar = Calendar.getInstance();
		String a = f1.format(calendar.getTime());
		calendar.setTime(f.parse(crsTchStartTime));
		calendar.add(Calendar.HOUR, Integer.parseInt(startTime.split(":")[0]));
		calendar.add(Calendar.MINUTE, Integer.parseInt(startTime.split(":")[1]));
		calendar.add(Calendar.DATE, 7 * week + day + cycleMap[cycle] * (i - 1));// 授课开课日期向后
																				// 7*week + day天即第一个周期作业开始时间，再往后推迟cycleMap[cycle]* ( i -1)天即真正的作业开始时间
		String resStart = f.format(calendar.getTime());
		String endTime = startTime;
		if (period >= CourseParamPo.DAILY) {
			calendar.add(Calendar.DATE, cycleMap[period]);// 作业开始日期向后推迟一个period减一即截止日期
		} else if(period <= CourseParamPo.HALFHOUR) {
			calendar.add(Calendar.MINUTE, cycleMap[period]);
		} else{
			calendar.add(Calendar.HOUR, cycleMap[period]);
			endTime = f1.format(calendar.getTime()).split(" ")[1];
		}
		String resEnd = f.format(calendar.getTime());
		res = resStart + ' ' + startTime + '/' + resEnd + ' ' + endTime;

		return res;
	}

}

