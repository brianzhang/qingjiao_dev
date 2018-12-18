package ex.scala.utils4j

import scala.collection.JavaConverters._
import scala.reflect.ClassTag
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo
import java.util
import com.utils.freemarker.TemplateParseUtil

/**
  * 自定义列表
  * @tparam U
  */
class ExList[U] extends Seq[U]{
  private var _li : List[U] = Nil
  def list = _li
  //base :
  def clear : ExList[U] = {
    _li = Nil
    this
  }
  def append (elem : U) : ExList[U] = {
    _li :+= elem
    this
  }
  def remove (elem : U) : ExList[U] = {
    if(_li.contains(elem))
      _li = (_li take _li.indexOf(elem) ) ++ (_li drop _li.indexOf( elem ) + 1)
    this
  }
  def removeAll(elem : U) : ExList[U] = {
    if(_li.contains(elem))
      _li = _li.filter(_ != elem)
    this
  }
  def addFrom(li : List[U]): ExList[U] ={
    _li ++= li
    this
  }
  def union(that : ExList[U]) : ExList[U] = new ExList().addFrom(that._li)
  def union(that : Array[U]) : ExList[U] = new ExList().addFrom(that.toList)
  def union(li : java.util.List[U]): ExList[U] = addFrom(li.asScala.toList)
  def containsElem(elem : U):Boolean = _li.contains(elem)
  def indexOfElem(elem : U):Int = _li.indexOf(elem)
  def get(n : Int) : U = _li(n)
  def getHead(n : Int) : ExList[U] =new ExList().addFrom(_li take n)
  def getTail(n : Int) : ExList[U] =new ExList().addFrom(_li takeRight n)
  def exFilter(func : Function[U,Boolean]): ExList[U] = new ExList().addFrom(_li filter func.run)
  def exReverse: ExList[U] = new ExList().addFrom(_li.reverse)
  def exDistinct: ExList[U] = new ExList().addFrom(_li.distinct)

  def max : U = sort(false).head
  def min : U = sort(true).head
  def sum : Double = _li.map(x=>java.lang.Double.parseDouble(x.toString)).reduce(_+_)
  //sort :
  def sort(bl : Boolean) : ExList[U] ={
    val v =  _li(0).getClass.getSimpleName
    var res : List[U] = Nil
    v match {
      case "Integer"|"Double"|"Byte"|"Short"|"Long"|"Char"|"Float" =>
        res = _li.sortWith{(a,b)=>
          val f = java.lang.Double.parseDouble(a.toString) > java.lang.Double.parseDouble(b.toString)
          !f && bl || !bl && f
        }
      case "String"=>
        res = _li.sortWith{(a,b)=>
          val f = a.toString > b.toString
          !f && bl || !bl && f
        }
      case _ =>
    }
    1 + 2
    val a = 1
    List(1) map (_+1)
    new ExList().addFrom(res)
  }

  //transform :
  def map[B](body : Function[U,B]) : ExList[B] = new ExList().addFrom(list.map(body.run))
  def flatMap[B](body : Function[U,Seq[B]]) : ExList[B] = new ExList().addFrom(list.flatMap(body.run))
  def sortBy(body : Function[(U,U),Boolean]) : ExList[U] = new ExList().addFrom(list.sortWith( (a,b)=>body.run((a,b)) ))
  def groupBy(p: Function[U,Boolean]): ExList[ExList[U]] = {
    val t = super.partition(p.run)
    new ExList().addFrom(List(new ExList().addFrom(t._1.toList) , new ExList().addFrom(t._2.toList)))
  }
  //string
  override def mkString(str : String):String = _li.mkString(str)
  override def toString: String = _li.toString()


  //to other
  def mapWithIndex: ExMap[Int,U] = new ExMap[Int,U].addFrom(_li.zipWithIndex.map{case(k,v)=>(v,k)})
  def zip[T] (other : ExList[T]) : ExMap[U,T] = new ExMap().addFrom(_li zip other._li)
  def asJava = _li.asJava

  def print = {
    println(_li)
    this
  }

  override def length: Int = list.size
  override def apply(idx: Int): U = list.apply(idx)
  override def iterator: Iterator[U] = list.iterator

  override def clone(): ExList[U] = new ExList[U]().addFrom(list)
}

object ExList{
  def append[U](elem : U) = new ExList[U]().append(elem)
  def numList(min : Int , max : Int, step : Int) : ExList[Int] = new ExList[Int].addFrom((min to max).by(step).toList)
  def numList(min : Int , max : Int ) : ExList[Int] = numList(min , max , 1)
  def numList(max : Int ) : ExList[Int] = numList( 0 , max )
  def newInstance[U] = new ExList[U]
  def fill[U](n : Int,elem : U) : ExList[U] = new ExList().addFrom(List.fill(n)(elem))
}


/**
  * 自定义映射
  * @tparam U
  * @tparam T
  */
class ExMap[U,T]{
  private var _map : Map[U,T] = Map()
  //base :
  def clear :ExMap[U,T]={
    _map = Map()
    this
  }
  def add (k:U,v:T):ExMap[U,T]={
    _map += (k -> v)
    this
  }
  def union(that : ExMap[U,T]) :ExMap[U,T]= new ExMap().addFrom(that._map)
  def union(that : ExList[(U,T)]) : ExMap[U,T] = new ExMap().addFrom(that.list)
  def delete(k : U) :ExMap[U,T]={
    _map -= k
    this
  }
  def get(k : U,dflt : T) : T = _map.getOrElse(k , dflt)
  def containsKey(k : U) : Boolean = _map.contains(k)
  def keys = new ExList().addFrom(_map.keys.toList)
  def values = new ExList().addFrom(_map.values.toList)
  def addFrom(li : List[(U,T)]) : ExMap[U,T] = addFrom(li.toMap)
  def addFrom(map : Map[U,T]) : ExMap[U,T] = {
    _map ++= map
    this
  }
  //to others :
  def toList : ExList[(U,T)]=new ExList().addFrom(_map.toList)

  //transform :
  def changeKV :ExMap[T,U]=new ExMap().addFrom(_map.map{case(k,v)=>(v,k)}.toList)
  def map[B](body : Function[(U,T),B]) : ExList[B] = new ExList().addFrom(_map.toList).map(body)
  def flatMap[B](body : Function[(U,T),Seq[B]]) : ExList[B] = new ExList().addFrom(_map.toList).flatMap(body)

  def print : ExMap[U,T] = {
    println(_map)
    this
  }
  def asJava = _map.asJava

  override def toString: String = _map.toString()
  override def clone(): ExMap[U,T] = new ExMap[U,T]().union(this)
}
object ExMap{
  def asMap[U,T](list : ExList[(U,T)])= new ExMap().union(list)
  def newInstance[U,T] = new ExMap[U,T]

}
trait Function[U , B]{ self =>
  def run(elem : U) : B
}

class DoubleAddFunction(n : Double) extends Function[Double,Double]{
  override def run(elem: Double): Double = elem + n
}
class IntAddFunction(n : Int) extends Function[Int,Int]{
  override def run(elem: Int): Int = elem + n
}
class MultiplicationFunction[U](n : Double) extends Function[U,Double]{
  override def run(elem: U): Double = java.lang.Double.parseDouble(elem.toString) * n
}
class StringAddFunction(str : String) extends Function[String,String]{
  override def run(elem: String): String = elem + str
}
class ToStringFunction[U] extends Function[U,String]{
  override def run(elem: U): String = elem.toString
}
class RunMethodFunction[U](var method : String , var params : ExList[Object] ) extends Function[U,Any] {
  def this (method : String) = this(method , null)
  override def run(elem: U) = {
    var res : Object = null
    if(params != null && params.length != 0){
      val classes:List[Class[_]] = params.list.map(_.getClass)
      res = elem.getClass.getMethod(method , classes:_*).invoke(elem,params.list.toArray:_*)
    }else{
      res = elem.getClass.getMethod(method).invoke(elem)
    }
    if(res != null) res else elem
  }
}

class NotNullFilterFunction[U] extends Function[U,Boolean]{
  override def run(elem: U): Boolean = elem != null
}
class EqualsOtherFilterFunction[U,T](other : T,equal : Boolean) extends Function[U,Boolean]{
  override def run(elem: U): Boolean = if(equal) elem.equals(other) else !elem.equals(other)
}
class CompareFilterFunction[U](other : U,moreThan : Boolean) extends Function[U, Boolean]{
  override def run(elem: U): Boolean = {
    val v =  elem.getClass.getSimpleName
    v match {
      case "Integer"|"Double"|"Byte"|"Short"|"Long"|"Char"|"Float" =>
          val f = java.lang.Double.parseDouble(elem.toString) <= java.lang.Double.parseDouble(other.toString)
          !f && moreThan || !moreThan && f
      case "String"=>
          val f = elem.toString <= other.toString
          !f && moreThan || !moreThan && f
      case _ => throw new IllegalArgumentException("Can not compare!")
    }
  }
}
object WordUtil {
  def fmWord( po : UrlZhiYuanPo , tPath : String , tName : String ) : Array[Byte]={
    val map : util.HashMap[String,Object]= new util.HashMap[String,Object]
    map.put("po",po)
    TemplateParseUtil.parse(tPath,tName,map)
  }
}
