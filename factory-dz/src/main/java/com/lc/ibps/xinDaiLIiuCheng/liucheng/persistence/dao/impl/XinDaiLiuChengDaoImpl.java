package com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.dao.XinDaiLiuChengDao;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;

/**
 * t_xdlc Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-15 03:01:36
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class XinDaiLiuChengDaoImpl extends MyBatisDaoImpl<String, XinDaiLiuChengPo> implements XinDaiLiuChengDao{

    @Override
    public String getNamespace() {
        return XinDaiLiuChengPo.class.getName();
    }
}
