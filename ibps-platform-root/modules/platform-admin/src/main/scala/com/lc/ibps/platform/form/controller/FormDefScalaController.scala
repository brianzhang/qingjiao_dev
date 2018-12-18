package com.lc.ibps.platform.form.controller

import org.springframework.web.bind.annotation.{ RequestMapping ⇒ ReqMp }
import com.lc.ibps.base.web.controller.GenericController
import org.springframework.stereotype.Controller
import javax.servlet.http.{ HttpServletRequest ⇒ Req, HttpServletResponse ⇒ Resp }
import com.lc.ibps.base.web.util.RequestUtil
import javax.annotation.{ Resource ⇒ Rsc }
import scala.collection.JavaConverters._
import org.springframework.web.servlet.{ ModelAndView ⇒ MAV }
import com.lc.ibps.base.framework.page.PageList
import org.springframework.web.bind.annotation.ResponseBody
import com.lc.ibps.base.web.json.PageJson
import com.lc.ibps.base.web.context.ContextUtil
import net.sf.json._
import java.util
import com.lc.ibps.generic.GenericScalaController
import org.apache.commons.lang.StringUtils
import org.junit.Test
import com.lc.ibps.grads.course.persistence.entity.CrsJobPo
import com.lc.ibps.grads.course.persistence.entity.JobStdPo
import com.lc.ibps.grads.course.domain.CrsJob

@Controller
@ReqMp(Array("/platform/form/formDef/"))
class FormDefScalaController extends GenericScalaController {

  /**
   * 在线表单
   */
  @ReqMp(Array("getFormData"))
  @ResponseBody def online(req: Req, resp: Resp): String = {

    lazy val Array(fk, md) = getParam(req, "formKey", "mode")

    val id = fdRep getMainByFormKey (fk) getId

    val data = fdRep getFormData id

    data

  }
  
  @ReqMp(Array("test"))
  def test(req: Req, resp: Resp){
    
    /*crsTchRep.findByCol( Map("crs_num =" -> "2014bysj") asJava ).asScala
    .map{ ctp =>
      
        val jobIds 
        = newInstance( ctp getId )
          .map( crsJobRep newInstance _ )
          .map( saveThenReturnId )
        
        val stdNums 
        = crsStdRep .findByCol( Map("crs_tch_id =" -> ctp.getId ) asJava)
          .asScala
          .map( _ getStdNum )
        
        for( jobId <- jobIds ;  
             stdNum <- stdNums ) 
        jobStdRep newInstance( new JobStdPo( jobId , stdNum ) ) save
    }*/
     
  }

  def newInstance (id : String ) : Array[CrsJobPo] = {
    Array(new CrsJobPo(id , "第一次 周记" , "2017-12-15 00:00/2017-12-31 00:00" , 1.0f) , new CrsJobPo(id , "开题答辩ppt" , "2017-12-15 00:00/2017-12-31 00:00" , 1.0f))
  }
  /**
   *
   */
  @ReqMp(Array("pageForm"))
  @ResponseBody def pageForm(req: Req, resp: Resp): util.Map[String, String] = {
    val pageK = RequestUtil getString (req, "pageKey")
    try {
      val pf = pfRep getByPageKey (pageK) 
      val formK: String =  pf getFormKey
      
      Map("success" -> "true", "formKey" -> formK) asJava
    } catch {
      case e: NullPointerException => Map("msg" -> s"无效的pageKey：${pageK}") asJava
    }
  }

  def saveThenReturnId(cj: CrsJob) = {
     val id = cj.getIdGenerator.getId
     cj.getData.setId(id)
     cj.save
     id
  }

}