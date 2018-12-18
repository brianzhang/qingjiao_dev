
package com.lc.ibps.lyzygls.XiaoBan.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.lyzygls.XiaoBan.persistence.dao.XiaoBanQueryDao;
import com.lc.ibps.lyzygls.XiaoBan.persistence.entity.XiaoBanPo;

/**
 *t_xb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 16:05:58
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class XiaoBanQueryDaoImpl extends MyBatisQueryDaoImpl<String, XiaoBanPo> implements XiaoBanQueryDao{

    @Override
    public String getNamespace() {
        return XiaoBanPo.class.getName();
    }
}
