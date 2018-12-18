package com.lc.ibps.patrolp.control.controller

import java.text.SimpleDateFormat
import java.util.Date

import scala.collection.immutable.Map
import scala.collection.JavaConverters._

import org.apache.commons.lang3.StringUtils
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.{ RequestMapping ⇒ ReqMp }
import org.springframework.web.bind.annotation.ResponseBody

import com.lc.ibps.base.core.util.time.DateUtil
import com.lc.ibps.base.framework.page.PageList
import com.lc.ibps.base.web.context.{ ContextUtil ⇒  Ctx }
import com.lc.ibps.base.web.json.PageJson
import com.lc.ibps.base.web.util.RequestUtil
import com.lc.ibps.generic.GenericScalaController
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo
import com.lc.ibps.patrols.data.persistence.entity.PatrolDetailPo

import javax.servlet.http.{ HttpServletRequest ⇒ Req }
import javax.servlet.http.{ HttpServletResponse ⇒ Resp }
import net.sf.json.JSONObject

@Controller
@ReqMp(Array("/patrolp/control/patrolProgram/"))
class PatrolPgScalaController extends GenericScalaController{

  
  @ReqMp(Array("listJson"))
  @ResponseBody def listJson( req : Req , resp : Resp) : PageJson = {
	  val pp = ptrlPrgrmRep query getQuerFilter(req) 
	  
    new PageJson( pp.asInstanceOf[ PageList[PatrolProgramPo] ] )
  }
	
	
	
	
	
	
	
	
	@ReqMp(Array("save"))
	def save (req : Req , resp : Resp) :  Unit = {
	  
	    val course = req.getParameter("course");
	    val data = getCurrentWeekDate + "第"+course+"节"
	  
  	  val ( cwd , uid ) = (Ctx getCurrentUserId , data)
  	  
  	  val ppp = defaultGetByPPR ( Map( "patroller_ =" -> cwd, "start_time_ =" -> uid ) )
  	  
      if( ppp == null ){
        
        val pg = ptrlPrgrmRep.newInstance( new PatrolProgramPo( cwd , uid ) )
        
        val pgId = pg.getIdGenerator.getId
        
        pg.getData.setId( pgId )
        pg.save
        //巡课记录，每个班级分别建立,需要获取所有班级
        (1 to 7) map( i => s"七年${i}班" ) map( new PatrolDetailPo(pgId , _) ) map( ptrlDtlRep newInstance(_) save )
        
      }
	}
	  
	
	
	@ReqMp(Array("saveDetail"))
	def saveDetail( req : Req , resp : Resp ){
	  val course = req.getParameter("course");
	  val data = getCurrentWeekDate + "第"+course+"节"
	  val Array(class_name , act_tch , reason ) = getParam(req, "className" , "actTch" , "reason")
	  val normal = RequestUtil getBoolean(req, "normal")
	  
	  lazy val res = new JSONObject
	  
	  //根据巡课人和当前时间，获取方案id
	  lazy val pgId = defaultGetByPPR( Map( "patroller_ =" -> (Ctx getCurrentUserId) , "start_time_ =" -> data ) ) getId
	  
	  //根据方案id与当前班级，获取巡课记录
	  lazy val pdp = defaultGetByPDR( Map("pg_id_ =" -> pgId , "class_name_ =" -> class_name ) )
	  
	  pdp setActTch act_tch
	  pdp setReason reason
	  pdp setStatus (if( normal) "1" else "0")
	  if( normal ){
	    pdp setStatus "0"
	    pdp setActTch ""
	    pdp setReason ""
	  }else{
	    pdp setActTch act_tch
	    pdp setReason reason
	    pdp setStatus "1"
	  }
	  
	  ptrlDtlRep newInstance( pdp ) save
	  
	  res.put("success", true)
	  res.put("msg", "保存成功")
	  
	  resp getWriter() println res
	  
	}
	
	
	
	
	@ReqMp(Array("getInf"))
	def getInf( req : Req , resp : Resp) : Unit = {
	    val course = req.getParameter("course")
	    val data1 = getCurrentWeekDate + "第"+course+"节"
	    var (Array(pgId , class_name) , uid , tch , curTime ) 
	    = (getParam( req , "id" , "className" ) , Ctx getCurrentUserId  , "" ,  data1)
	    
	    
                          	 
	    
	    if( StringUtils isNotEmpty pgId ) {
	      curTime = ptrlPrgrmRep get( pgId ) getStartTime
      }   
	    else {
        pgId = defaultGetByPPR( Map( "patroller_ =" -> uid , "start_time_ =" -> curTime ) ) getId
      }
	      
	    //2018-03-27 星期二第1节
	    var curTime1 = ( curTime split("星") )(1) split("第") 
	    curTime = "星" + curTime1(0) + " " + "第" + curTime1(1) 
	      
//	    curTime = "星期二 第3节";

	    //通过班级名称、当前节次获取授课教师
	    try{
	      tch = getTchByDetail( class_name , curTime )
	    }catch{
	      case e : Exception => tch = "none"
	    }
	    
	    
	    
	    //通过pgid ， className 获得巡课记录，提取实际教师以及原因、状态
	    val pdp = defaultGetByPDR( Map( "PG_ID_ =" -> pgId , "CLASS_NAME_ =" -> class_name ) )
	    
	    val data = List("tch" , "curTime" , "detailPo" ) 
                 .zip( List( tch , data1 , pdp ) ) 
                 .toMap.filter(_._2 != null)
                 
	    resp getWriter() println( JSONObject fromObject (data asJava) )
	    
	  }
	  
	
	
	
	
	
	
	
	
	
  @throws(classOf[Exception]) def getTchByDetail( className : String , date : String ):String = {
	  val schoolName = getSchoolName
	  if( StringUtils isNotEmpty schoolName ){
	    
	    val classxx = className 
	    val classId = defaultGetByCIR ( Map("classxx_ =" -> classxx ,"school_ =" -> schoolName )) getId
	    
	    
	    
	    val chinese2Num = "一二三四五六七八".toList.zip (1 to 8) 
	                      .map{ case( k , v ) ⇒ ( k toString , v toString ) }
	                      .toMap
	    //2017-12-11 星期一 第n节
	    val cd = date.split(" ")(0).split("期")(1)
	    val sc = date.split("第")(1).split("节")(0) //n
	    
	    val day = chinese2Num( cd )//1
	    
	    val tch = defaultGetByTIR (Map("classxx_id_ =" -> classId , "day_ =" ->day , "section_ =" ->sc ) )
	    
	    if( tch != null ){
	      var tchName = tchInfRep get(tch getTchId) getTchName()
	      tchName
	    }
	         
	    else ""
	  }else {
	    ""
	  }
	}
  
  
  
  
  
	def getSchoolName () : String = {
	  //val orgId = employeeRep.get( Ctx getCurrentUserId ).getGroupID
	  var orgId : String = employeeRep get(Ctx getCurrentUserId) getGroupID()
	  if (StringUtils isNotEmpty orgId) {
	    partyOrgRep get(orgId) getName
	  }else {
	    ""
	  }
	}

	
	
	
	
	
	
	def getCurrentWeekDate = {
	  val date = new SimpleDateFormat("yyyy-MM-dd").format( new Date )
	  val weekDay = com.utils.DateUtil.dayForWeek( DateUtil getCurrentTime )
	  //s s"${date} 星期${weekDay} 第"+getCurjieci+"节"
	  s"${date} 星期${weekDay}"
	  
	}
	def getCurJieci = "n"
	
	
	def defaultGetByPPR = ptrlPrgrmRep exGetBy(null, null, _ : java.util.Map[String , String], null)
	
  def defaultGetByCIR = clssInfRep exGetBy( null , null , _ : java.util.Map[String,String] , null)
	
  def defaultGetByTIR = teachRep exGetBy(null, null, _ : java.util.Map[String,String], null)
	
	def defaultGetByPDR = ptrlDtlRep exGetBy(null, null, _ : java.util.Map[String,String], null)
}

