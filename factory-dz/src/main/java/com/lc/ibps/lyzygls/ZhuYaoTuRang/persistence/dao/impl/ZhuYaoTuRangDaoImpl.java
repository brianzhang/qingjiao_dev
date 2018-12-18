package com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.dao.ZhuYaoTuRangDao;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.entity.ZhuYaoTuRangPo;

/**
 * t_zytr Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 12:55:08
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ZhuYaoTuRangDaoImpl extends MyBatisDaoImpl<String, ZhuYaoTuRangPo> implements ZhuYaoTuRangDao{

    @Override
    public String getNamespace() {
        return ZhuYaoTuRangPo.class.getName();
    }
}
