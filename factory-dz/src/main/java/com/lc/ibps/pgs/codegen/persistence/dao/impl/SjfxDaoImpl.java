package com.lc.ibps.pgs.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.codegen.persistence.dao.SjfxDao;
import com.lc.ibps.pgs.codegen.persistence.entity.SjfxPo;

/**
 * 学院试卷分析报告 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-30 09:34:53
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class SjfxDaoImpl extends MyBatisDaoImpl<String, SjfxPo> implements SjfxDao{

    @Override
    public String getNamespace() {
        return SjfxPo.class.getName();
    }
}
