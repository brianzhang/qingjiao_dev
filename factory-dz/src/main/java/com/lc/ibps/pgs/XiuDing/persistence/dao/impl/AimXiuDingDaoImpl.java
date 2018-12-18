package com.lc.ibps.pgs.XiuDing.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.XiuDing.persistence.dao.AimXiuDingDao;
import com.lc.ibps.pgs.XiuDing.persistence.entity.AimXiuDingPo;

/**
 * t_pymbxd Dao接口的实现类
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
public class AimXiuDingDaoImpl extends MyBatisDaoImpl<String, AimXiuDingPo> implements AimXiuDingDao{

    @Override
    public String getNamespace() {
        return AimXiuDingPo.class.getName();
    }
}
