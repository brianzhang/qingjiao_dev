
package com.lc.ibps.pgs.PGData.persistence.dao.impl;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.DcwjxjQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.DcwjxjPo;

/**
 *t_dcwjxj 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DcwjxjQueryDaoImpl extends MyBatisQueryDaoImpl<String, DcwjxjPo> implements DcwjxjQueryDao{

    @Override
    public String getNamespace() {
        return DcwjxjPo.class.getName();
    }

	@Override
	public List<DcwjxjPo> queryByType(String type) {
		return findByKey("queryByType", type);
	}
}
