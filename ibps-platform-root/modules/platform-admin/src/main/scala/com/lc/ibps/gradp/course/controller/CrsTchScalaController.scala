package com.lc.ibps.gradp.course.controller

import org.springframework.web.bind.annotation.{RequestMapping ⇒ ReqMp}
import com.lc.ibps.base.web.controller.GenericController
import org.springframework.stereotype.Controller
import javax.servlet.http.{HttpServletRequest ⇒ Req , HttpServletResponse ⇒ Resp}
import com.lc.ibps.base.web.util.RequestUtil
import javax.annotation.{Resource ⇒ Rsc}
import scala.collection.JavaConverters._
import org.springframework.web.servlet.{ModelAndView ⇒ MAV}
import com.lc.ibps.base.framework.page.PageList
import org.springframework.web.bind.annotation.ResponseBody
import com.lc.ibps.base.web.json.PageJson
import com.lc.ibps.base.web.context.{ContextUtil ⇒ Ctx}
import net.sf.json._
import java.util
import com.lc.ibps.generic.GenericScalaController
import com.utils.DateUtil
import com.lc.ibps.api.base.query.QueryOP
import com.lc.ibps.base.db.model.DefaultQueryFilter
import com.lc.ibps.base.db.model.DefaultQueryField
import com.lc.ibps.api.base.query.QueryFilter
import com.lc.ibps.base.db.model.DefaultFieldLogic
import org.apache.commons.lang3.StringUtils
import com.lc.ibps.grads.course.persistence.entity.CrsTchPo
import com.lc.ibps.grads.course.persistence.entity.JobStdPo

@Controller
@ReqMp(Array("/gradp/course/crsTch/"))
class CrsTchScalaController extends GenericScalaController{

  
  
  
  
  
  /*@ReqMp(Array("listJson")) @ResponseBody def listJson(req : Req) : PageJson = {
    val (tch_num , rtn_qf , qf) 
      = (myNum ,
         req.getSession.getAttribute("qf").asInstanceOf[QueryFilter] , 
         getQuerFilter(req).asInstanceOf[DefaultQueryFilter]) 
    
    if( !(tch_num contains "admin") ){
      //如果当前没有查询条件，并且session中也没有 , 查询默认的项
      if( qf.getParams.size == 0 && rtn_qf == null ) 
        qf addFilter( "term", DateUtil getCurTerm, QueryOP EQUAL)
      
      //如果主界面进行筛选
      else if( qf.getParams.size > 0 )
        req getSession() setAttribute("qf", qf)
        
      //处理其他界面返回按钮返回此界面
      else{
        
        val ws 
        = rtn_qf.getFieldLogic
                .getWhereClauses.asScala
                .filter(e ⇒  !e.asInstanceOf[DefaultQueryField].getField.equals("tch_num") )
        
                
                
        qf.getFieldLogic
          .asInstanceOf[DefaultFieldLogic]
          .setWhereClauses( ws asJava )      
        
      }
      
      qf addFilter("tch_num", "%"+tch_num+"%", QueryOP LIKE)
    }
    
    val res = crsTchRep.query(qf).asInstanceOf[ PageList[CrsTchPo] ]
    
    res.asScala
    .foreach{ ctp⇒
        val names = ctp.getTchNum.split(",").map( entityRep getByAliasPartyType( _ , "employee") getName ) 
        ctp setTchName( names mkString(",") )
    }
      
        
    new PageJson( res )
  }*/
 
  
  
  
  
  
  
  
  
  @ReqMp(Array("getNew")) def getNew(req : Req , resp : Resp) : Unit ={
    
    val crs_tch_id$std_nums = getParam(req, "crsTchId" , "stdNums")
    
    val jobIds = crsJobRep.findByCol( Map("crs_tch_id =" -> crs_tch_id$std_nums(0)) )
                       .asScala
                       .map( _ getId )
                       .mkString("','")
                       
    val std_nums = crs_tch_id$std_nums(1).replace('[', '(')
                                         .replace(']', ')')
                                         .replace('"', '\'')
                                         
    val args = Map(s"jobId in ('${jobIds}')" -> "",
                    s"std_num in ${std_nums}" -> "",
                    "t_job_std.status =" -> JobStdPo.SUBMITTED,
                    "review_status = " -> "0")
    
    val in = jobStdRep.findByCol( args ).asScala
                                .map{jsp⇒ ( jsp getStdNum , jsp getStdName )}
                                .toMap.unzip
    
    resp getWriter() println( JSONObject fromObject( Map("id" -> in._1.toList.asJava , "name" -> in._2.toList.asJava ) asJava ))
   
    
  }
  
  def getMe = entityRep get( Ctx getCurrentUserId )
  def myName = getMe getName
  def myNum = getMe getAlias

}