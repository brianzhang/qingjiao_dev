package com.lc.ibps.grads.course.repository;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.grads.course.domain.CrsTch;
import com.lc.ibps.grads.course.persistence.entity.CrsStdPo;
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo;

import net.sf.json.JSONObject;

/**
 * t_crs_tch 仓库接口
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 19:11:14
 *</pre>
 */
public interface CrsTchRepository extends IRepository<String, CrsTchPo,CrsTch>{
	CrsTchPo getByCol(Map args);
	List<CrsTchPo> findByCol(Map args);
	Map makeParam(Map args);
	CrsTchPo parseCrsTchPoByJson(JSONObject jo);
	PageList<CrsTchPo> resFromPageList(PageList<CrsTchPo> crsTchList);
	void updateByParam(String paramid, String id , boolean reset) throws ParseException;
	void del(String crsTchId);
}
