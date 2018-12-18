package com.lc.ibps.loans.files.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.files.persistence.dao.FileDao;
import com.lc.ibps.loans.files.persistence.entity.FilePo;

/**
 * t_file Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-26 11:50:51
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class FileDaoImpl extends MyBatisDaoImpl<String, FilePo> implements FileDao{

    @Override
    public String getNamespace() {
        return FilePo.class.getName();
    }
}
