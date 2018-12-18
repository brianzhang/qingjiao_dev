package ex.scala.utils4j

import java.io.{File, InputStream}
import java.util

import org.apache.poi.hssf.usermodel.HSSFWorkbook
import org.apache.poi.ss.usermodel._

import com.lc.ibps.patrols.control.persistence.entity._

import scala.collection.JavaConverters._
import scala.io.Source
import scala.util.parsing.json.{JSONArray, JSONObject}
import com.utils.freemarker.TemplateParseUtil

private class Entity(val day: String, val time: String, val clazz: String, val tch: String, val crs: String, val year: String) {
  override def toString = {
    (s"{day:'$day',time:'$time',clazz:'$clazz',tch:'$tch',crs:'$crs',year:'$year'}")
  }
}
private class Course(val index:String="",val days:Array[String]=new Array[String](7)){
  def setDays(i : Int , data : String): Unit ={
    this.days( i - 1 ) = data
  }
  def getDays = days
  override def toString = {
    (s"{index:'$index',days:'${days.mkString(",")}'}")
  }
}
class XunUtil

object XunUtil {

  def trans(src:InputStream , name : String):String={
    val data = List((src,name)).map(x=>DataUtil.readExcel(x._1,x._2))
      .map(parseData)
      .reduce(List.concat(_, _)).mkString(",")
    "[".concat(data).concat("]")
  }

  private def lower(str : String): String ={
    (Array("一","二","三","四","五","六","日").map("周".concat).indexOf( str ) + 1) + ""
  }

  private def parseData(raw_datas_path: (List[List[String]], String)): List[Entity] = {
    val raw_datas = raw_datas_path._1
    val path = raw_datas_path._2
    var res: List[Entity] = List()
    val colNum = 2
    val daySite = raw_datas(0).map( lower )
    val timeSite = raw_datas(1)
    val data = raw_datas.drop(2)
    data.foreach {
      records =>
        val crs = records(1)
        val tch = records(5)
        (6 to 45).foreach {
          rowNum =>
            try {
              var clazz = records(rowNum)
              if(clazz.equals("班会"))
                throw new Exception
              if (clazz.contains("教") && clazz.contains("研")) clazz = "教研"
              if (!"".equals(clazz)) {
                val time = timeSite(rowNum)
                val day = daySite(rowNum)
                val entity = new Entity(day, time, clazz, tch, crs, path)
                res :+= entity
              }
            } catch {
              case e: Exception =>
            }
        }
    }
    res
  }

  def export4Tch(javaData : util.List[util.Map[String,String]]): util.Map[String,Array[Byte]] = {
    val rawData = javaData.asScala.map(_.asScala.toMap)


    var datatd : Array[List[Map[String,String]]] = new Array(rawData.size)
    var temp : Map[String,Int] = Map()
    var i = 0
    rawData.foreach{
      x=>
        if( ! temp.contains(x("year"))){
          temp += (x("year") -> i)
          datatd( i ) = List(x)
          i += 1
        }else{
          datatd( temp(x("year")) ) :+= x
        }
    }

    val datas = datatd.filter(_!=null).flatMap{
      data=>
        var res = new Array[List[Map[String,String]]](data.size)
        var temp: Map[String,Int] = Map()
        var i = 0
        data.foreach(
          x=>
            if( ! temp.contains(x("tch"))){
              temp += ( x("tch") -> i )
              res( i ) = List(x)
              i += 1
            }else{
              res( temp ( x("tch") ) ) :+= x
            }
        )
        res
    }

    var fileBytesList : Map[String,Array[Byte]] = Map()
    datas.filter(_!=null).foreach{
      data=>
        val tch = data(0)("tch")
        val crs = data(0)("crs")
        val fileName = s"$tch-${data(0)("year")}$crs.xls"
          tch + "_" + data(0)("year") + crs + ".xls"
        var res = (1 to 8).map(x => ( x -> new CourseEntity(x + "" , 7) ))
        data.foreach{
          src=>
            val index = src("time").toInt
            val day = src("day").toInt
            val data = src("clazz")
            res(index-1)._2.setDays( day , data )
        }
        val map = new util.HashMap[String,Object]
        map.put("dataList",res.map(_._2).asJava)
        fileBytesList += ( fileName -> TemplateParseUtil.parse("D:\\","template.ftl", map) )
    }
    fileBytesList.asJava
  }

  def export4Cls(javaData : util.List[util.Map[String,String]]): util.Map[String,Array[Byte]] ={
    val rawData = javaData.asScala.map(_.asScala.toMap)
    var dataCls : Array[List[Map[String,String]]] = new Array(rawData.size)
    var temp : Map[String,Int] = Map()
    var i = 0
    rawData.foreach {
      m =>
        val rc = m("year") + m("clazz")
        if ( ! temp.contains( rc )){
            temp += (rc -> i)
            dataCls( i ) = List(m)
            i += 1
        }else{
          dataCls( temp(rc) ) :+= m
        }
    }
    var fileBytesList : Map[String,Array[Byte]] = Map()
    dataCls.filter(_!=null).filter(x=>(1 to 50).mkString("").contains(x(0)("clazz"))).foreach{
      data=>
        try{
            val rc = s"${data(0)("year")}${data(0)("clazz")}班"
            val fileName = s"$rc.xls"
            println(fileName)
            var res = (1 to 8).map(x => ( x -> new CourseEntity(x + "" , 7) ))
            data.foreach{
              src=>
                val index = src("time").toInt
                val day = src("day").toInt
                val data = src("crs")
                res(index-1)._2.setDays( day , data )
            }
            val map = new util.HashMap[String,Object]
            map.put("dataList",res.map(_._2).asJava)
            fileBytesList += ( fileName -> TemplateParseUtil.parse("D:\\","template.ftl", map) )
        }catch {
          case ex:Exception=>println(ex.getMessage)
        }

    }
    fileBytesList.asJava
  }

}

object DataUtil {
  def toExcel(datas: List[Map[String, String]], fd: Array[String], path: String): Unit = {
    val hwb = new HSSFWorkbook()
    hwb.setSheetName(0, "学生上课表")
    val hs = hwb.getSheetAt(0)
    val title = hs.createRow(0)
    (0 until fd.length).map(x => title.createCell(x).setCellValue(fd(x)))

  }

  def parseExcel(is: InputStream, fields: Array[String], n: Int): List[Map[String, String]] = {
    val res: List[Map[String, String]] = List()
    val fl = fields.toList
    var fs = Array(fl.length)
    val hssfWorkbook = new HSSFWorkbook(is)
    val hssfSheet = hssfWorkbook.getSheetAt(0)
    var hssfRow = hssfSheet.getRow(n)

    val cells = (hssfRow.getFirstCellNum to hssfRow.getLastCellNum).map(hssfRow.getCell(_).getStringCellValue).filter(fl.contains(_))
    cells.indices.foreach {
      i =>
        val index = fl.indexOf(cells(i))
        fs(index) = i
    }
    null
  }

//  def readExcel(path: String): (List[List[String]], String) = {
//    var wb: Workbook = null
//    wb = WorkbookFactory.create
//    (rotate(read(wb, 0, 0, 0)), path.substring(path.lastIndexOf('\\'), path.lastIndexOf('.')))
//  }
  def readExcel(file: InputStream , name : String): (List[List[String]], String) = {
    var wb: Workbook = null
    wb = WorkbookFactory.create(file)
    ( rotate( read(wb, 0, 0, 0) ), name.substring(0, name.lastIndexOf('.')))
  }
  def rotate(arr: List[List[String]]): List[List[String]] = {
    var res: List[List[String]] = Nil
    (0 until arr(0).size).foreach {
      index =>
        var temp: List[String] = List()
        arr.filter(li => li.size == arr(0).size).foreach { li => temp :+= li(index) }
        res :+= temp
    }
    res
  }

  private def read(wb: Workbook, sheetIndex: Int, startReadLine: Int, tailLine: Int): List[List[String]] = {
    val sheet: Sheet = wb.getSheetAt(sheetIndex)
    var res: List[List[String]] = List()
    (startReadLine until 46).map(rowNum => (rowNum, sheet.getRow(rowNum).iterator)).foreach {
      case (rowNum, it) =>
        var cellList: List[String] = List()
        var colNum = 0
        var c: Cell = null
        var inde = 0
        while (it.hasNext) {
          inde += 1
          c = it.next
          var str = ""
          val isMerge: Boolean = isMergedRegion(sheet, rowNum, c.getColumnIndex())
          if (isMerge) {
            str = getMergedRegionValue(sheet, rowNum, c.getColumnIndex()) + ""
          } else {
            c.setCellType(Cell.CELL_TYPE_STRING)
            if (c == null || c.getCellType == 3)
              str = ""
            else str = getCellValue(c) + ""
          }
          cellList :+= (str.replaceAll(" ", ""))

        }
        res :+= cellList

    }
    res
  }

  private def isMergedRegion(sheet: Sheet, row: Int, column: Int): Boolean = {
    val sheetMergeCount = sheet.getNumMergedRegions()
    val flag = (0 until sheetMergeCount).map(sheet.getMergedRegion).filter(_ != null).filter(range => row >= range.getFirstRow && row <= range.getLastRow && column >= range.getFirstColumn && column <= range.getLastColumn)
    flag != null && flag.size != 0
  }

  private def getMergedRegionValue(sheet: Sheet, row: Int, column: Int): String = {

    (0 until sheet.getNumMergedRegions).map(sheet.getMergedRegion).filter(_ != null).map {
      range =>
        var cellStr = ""
        if (row >= range.getFirstRow && row <= range.getLastRow && column >= range.getFirstColumn && column <= range.getLastColumn) {
          return getCellValue(sheet.getRow(range.getFirstRow).getCell(range.getFirstColumn))
        }
    }
    ""
  }

  private def getCellValue(cell: Cell): String = {

    if (cell == null)
      ""
    else if (cell.getCellType() == Cell.CELL_TYPE_STRING) {

      cell.getStringCellValue()

    } else if (cell.getCellType() == Cell.CELL_TYPE_BOOLEAN) {

      String.valueOf(cell.getBooleanCellValue())

    } else if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {

      cell.getCellFormula()

    } else if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {

      String.valueOf(cell.getNumericCellValue())

    } else ""

  }
}
