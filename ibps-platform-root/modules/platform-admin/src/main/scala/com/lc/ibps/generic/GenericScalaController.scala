package com.lc.ibps.generic

import java.util

import scala.collection.JavaConverters._

import org.springframework.stereotype.Controller

import com.lc.ibps.base.web.controller.GenericController
import com.lc.ibps.base.web.util.RequestUtil
import com.lc.ibps.grads.course.repository.CrsJobRepository
import com.lc.ibps.grads.course.repository.CrsTchRepository
import com.lc.ibps.grads.course.repository.JobStdRepository
import com.lc.ibps.org.party.repository.PartyEmployeeRepository
import com.lc.ibps.org.party.repository.PartyEntityRepository
import com.lc.ibps.org.party.repository.PartyUserRoleRepository
import com.lc.ibps.org.party.repository.PartyOrgRepository;

import javax.annotation.{ Resource ⇒ Rsc }
import javax.servlet.http.{ HttpServletRequest ⇒ Req }
import com.lc.ibps.patrols.data.repository.PatrolDetailRepository
import com.lc.ibps.patrols.data.repository.TeachInfoRepository
import com.lc.ibps.patrols.control.repository.PatrolProgramRepository
import com.lc.ibps.org.party.repository.PartyOrgRepository
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository
import com.lc.ibps.patrols.data.repository.TchInfoRepository
import com.lc.ibps.form.form.repository.FormDefRepository
import com.lc.ibps.components.codegen.repository.PageFormRepository
import com.lc.ibps.grads.course.repository.CrsStdRepository

@Controller
class GenericScalaController extends GenericController{

  //form
  @Rsc var fdRep : FormDefRepository = _
  @Rsc var pfRep : PageFormRepository = _
  
  
  //gradp
  @Rsc var crsTchRep : CrsTchRepository = _
  @Rsc var crsJobRep : CrsJobRepository = _
  @Rsc var jobStdRep : JobStdRepository = _
  @Rsc var crsStdRep : CrsStdRepository = _
  
  //patrolp
  @Rsc var ptrlDtlRep : PatrolDetailRepository = _
  @Rsc var ptrlPrgrmRep : PatrolProgramRepository = _
	@Rsc var clssInfRep : ClassxxInfoRepository = _
	@Rsc var tchInfRep : TchInfoRepository = _
	@Rsc var teachRep : TeachInfoRepository = _
	
	
  //ibps base
	@Rsc var orgRep : PartyOrgRepository = _
  @Rsc var entityRep : PartyEntityRepository = _
  @Rsc var userRoleRep : PartyUserRoleRepository = _
  @Rsc var employeeRep : PartyEmployeeRepository = _
  @Rsc var partyOrgRep : PartyOrgRepository = _
  
  
	//AUTO code...
	implicit def conJavaMap[U,T] (scalaMap : Map[U,T]) : util.Map[U,T] = scalaMap asJava
	implicit def conJavaList[U] (scalaList : List[U]) : util.List[U] = scalaList asJava
	def getParam( req : Req , args : String* ) : Array[String]  
	  = args map ( RequestUtil getString ( req , _ )  ) toArray
}