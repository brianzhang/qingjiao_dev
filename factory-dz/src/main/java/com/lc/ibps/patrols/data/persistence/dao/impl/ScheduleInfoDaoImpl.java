package com.lc.ibps.patrols.data.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.patrols.data.persistence.dao.ScheduleInfoDao;
import com.lc.ibps.patrols.data.persistence.entity.ScheduleInfoPo;

/**
 * 课表信息 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:56:44
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ScheduleInfoDaoImpl extends MyBatisDaoImpl<String, ScheduleInfoPo> implements ScheduleInfoDao{

    @Override
    public String getNamespace() {
        return ScheduleInfoPo.class.getName();
    }
}
