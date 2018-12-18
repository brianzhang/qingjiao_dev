package com.lc.ibps.grads.paper.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.grads.paper.domain.MyPaper;
import com.lc.ibps.grads.paper.persistence.entity.MyPaperPo;
public interface MyPaperRepository extends IRepository<String, MyPaperPo,MyPaper>{
}
