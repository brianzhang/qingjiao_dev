package com.lc.ibps.gradp.admin.controller

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
import com.lc.ibps.base.web.context.ContextUtil
import net.sf.json._
import java.util
import com.lc.ibps.base.framework.page.PageList
import com.lc.ibps.org.party.repository.{ PartyUserRoleRepository ⇒ UserRole,
                                          PartyEntityRepository ⇒ Entity,
                                          PartyEmployeeRepository ⇒ Employee}
import com.lc.ibps.org.party.persistence.entity.{ PartyUserRolePo ⇒ UserRolePo,
                                                  PartyEntityPo ⇒ EntityPo}
import com.lc.ibps.api.base.query.{QueryFilter , QueryOP}
import java.text.SimpleDateFormat
import com.lc.ibps.generic.GenericScalaController

@Controller
@ReqMp(Array("/gradp/admin/data/"))
class DataScalaController extends GenericScalaController{
  
  
  
  
  
}