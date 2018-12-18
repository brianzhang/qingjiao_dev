package com.lc.ibps.urlZhiYuan.urlZhiYuant.repository;

import java.util.Date;
import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import org.kohsuke.rngom.binary.DataExceptPattern;

/**
 * t_zyurl 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:07
 *</pre>
 */
public interface UrlZhiYuanRepository extends IRepository<String, UrlZhiYuanPo,UrlZhiYuan>{
	List<UrlZhiYuanPo> findByCol(String string, String arg);
	UrlZhiYuanPo getByCol(String string, String arg);
	List<UrlZhiYuanPo> getByFinaltdId(String tdid);
	UrlZhiYuanPo getByBizKey(String bizkey);
	List<UrlZhiYuanPo> getByFinalTchId(String tchId);
	List<UrlZhiYuanPo> getByStuNum(String stunum);
	void compoundLabel(String oldId, String newId, String orgId);
	List<UrlZhiYuanPo> getBySql(String whereSql);
	int getNumByLabel(String labelId);
	UrlZhiYuanPo getByxh(String xh);
	UrlZhiYuanPo getby_xh(String xh);
	List<String> getAllJudgeTchId(String orgId);
	//List<Date> getSbsj(Date sbsj);
}
