
package com.lc.ibps.pgs.codegen.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.codegen.persistence.dao.SjfxQueryDao;
import com.lc.ibps.pgs.codegen.persistence.entity.SjfxPo;

/**
 *学院试卷分析报告 查询Dao的实现类
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
public class SjfxQueryDaoImpl extends MyBatisQueryDaoImpl<String, SjfxPo> implements SjfxQueryDao{

    @Override
    public String getNamespace() {
        return SjfxPo.class.getName();
    }
}
