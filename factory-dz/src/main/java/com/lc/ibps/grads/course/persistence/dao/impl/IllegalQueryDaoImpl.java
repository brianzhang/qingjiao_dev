
package com.lc.ibps.grads.course.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.grads.course.persistence.dao.IllegalQueryDao;
import com.lc.ibps.grads.course.persistence.entity.IllegalPo;

/**
 *违规操作表 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：guanxinyu1997@outlook.com
 * 创建时间：2017-07-29 21:42:15
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class IllegalQueryDaoImpl extends MyBatisQueryDaoImpl<String, IllegalPo> implements IllegalQueryDao{

    @Override
    public String getNamespace() {
        return IllegalPo.class.getName();
    }
}
