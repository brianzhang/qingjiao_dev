
package com.lc.ibps.lyzygls.DDiChuSX.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.dao.DDiChuSXQueryDao;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.entity.DDiChuSXPo;

/**
 *该表用于单位概况的地处水系数据 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:21:48
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DDiChuSXQueryDaoImpl extends MyBatisQueryDaoImpl<String, DDiChuSXPo> implements DDiChuSXQueryDao{

    @Override
    public String getNamespace() {
        return DDiChuSXPo.class.getName();
    }
}
