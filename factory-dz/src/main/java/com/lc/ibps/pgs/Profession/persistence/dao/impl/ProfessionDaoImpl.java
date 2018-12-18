package com.lc.ibps.pgs.Profession.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.Profession.persistence.dao.ProfessionDao;
import com.lc.ibps.pgs.Profession.persistence.entity.ProfessionPo;

/**
 * t_zyb Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 13:44:23
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ProfessionDaoImpl extends MyBatisDaoImpl<String, ProfessionPo> implements ProfessionDao{

    @Override
    public String getNamespace() {
        return ProfessionPo.class.getName();
    }
}
