
package com.lc.ibps.patrols.data.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.patrols.data.persistence.dao.ScheduleInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.ScheduleInfoPo;

/**
 *课表信息 查询Dao的实现类
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
public class ScheduleInfoQueryDaoImpl extends MyBatisQueryDaoImpl<String, ScheduleInfoPo> implements ScheduleInfoQueryDao{

    @Override
    public String getNamespace() {
        return ScheduleInfoPo.class.getName();
    }
}
