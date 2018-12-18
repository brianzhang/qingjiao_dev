package com.utils
import scala.collection.JavaConverters._
object SDateUtil {
  
  def getTermList : java.util.List[String] = {
    val start = (2017 , 1)
    val $ct = DateUtil getCurTerm() split("-") map( _ toInt )
    
    var res = ( start._1 to $ct(0) ).flatMap( 
      i => List((i , 1) , (i , 2)) 
    ).map{
      case( y , n ) => s"${y}-${y+1}-${n}" 
    }.toList
    
    if( $ct(2) == 2 )
      res :+= s"${$ct(1)}-${$ct(1) + 1}-1"
      
    res.reverse.asJava
    
  }
  
}