
package com.lc.ibps.pgs.DataSs.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.DataSs.persistence.dao.DataSsQueryDao;
import com.lc.ibps.pgs.DataSs.persistence.entity.DataSsPo;

/**
 *t_sjly 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 17:12:48
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DataSsQueryDaoImpl extends MyBatisQueryDaoImpl<String, DataSsPo> implements DataSsQueryDao{

    @Override
    public String getNamespace() {
        return DataSsPo.class.getName();
    }
}
