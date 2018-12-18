
package com.lc.ibps.pgs.XiuDing.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.XiuDing.persistence.dao.AimXiuDingQueryDao;
import com.lc.ibps.pgs.XiuDing.persistence.entity.AimXiuDingPo;

/**
 *t_pymbxd 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:22:10
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class AimXiuDingQueryDaoImpl extends MyBatisQueryDaoImpl<String, AimXiuDingPo> implements AimXiuDingQueryDao{

    @Override
    public String getNamespace() {
        return AimXiuDingPo.class.getName();
    }
}
