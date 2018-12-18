package com.lc.ibps.pgs.Report.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.Report.persistence.dao.TargetAnalyzeReportDao;
import com.lc.ibps.pgs.Report.persistence.entity.TargetAnalyzeReportPo;

/**
 * t_p_fxbg Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:52:06
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class TargetAnalyzeReportDaoImpl extends MyBatisDaoImpl<String, TargetAnalyzeReportPo> implements TargetAnalyzeReportDao{

    @Override
    public String getNamespace() {
        return TargetAnalyzeReportPo.class.getName();
    }
}
