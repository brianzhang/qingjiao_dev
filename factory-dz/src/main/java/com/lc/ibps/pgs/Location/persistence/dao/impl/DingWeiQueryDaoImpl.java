
package com.lc.ibps.pgs.Location.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.Location.persistence.dao.DingWeiQueryDao;
import com.lc.ibps.pgs.Location.persistence.entity.DingWeiPo;

/**
 *t_pydwb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 14:51:08
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DingWeiQueryDaoImpl extends MyBatisQueryDaoImpl<String, DingWeiPo> implements DingWeiQueryDao{

    @Override
    public String getNamespace() {
        return DingWeiPo.class.getName();
    }
}
