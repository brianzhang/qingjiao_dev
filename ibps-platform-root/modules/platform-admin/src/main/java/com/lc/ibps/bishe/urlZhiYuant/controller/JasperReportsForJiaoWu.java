package com.lc.ibps.bishe.urlZhiYuant.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Map;

import com.lowagie.text.DocumentException;
import com.lowagie.text.Image;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfGState;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfStamper;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;

public class JasperReportsForJiaoWu {

	static Connection con;

	public static Connection getConnection() {
		Connection conn = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url = "jdbc:mysql://202.118.177.98:3306/grad";
			String user = "root";
			String password = "heu530";
			conn = DriverManager.getConnection(url, user, password);
		} catch (SQLException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("数据库连接失败" + e.getMessage());
			e.printStackTrace();
		}
		return conn;

	}

	public static String getPDF(Map<String, Object> rptParameters, String jasperName, String pdfaddr1, String Name)
			throws JRException {
		con = getConnection();
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperName, rptParameters, con);
		// String id = rptParameters.get("ID").toString();
		JasperExportManager.exportReportToPdfFile(jasperPrint, pdfaddr1 + Name + ".pdf");

		/*
		 * if (jasperPrint != null) { JRXlsExporter exporter = new
		 * JRXlsExporter();
		 * 
		 * exporter.setParameter(JRExporterParameter.JASPER_PRINT,jasperPrint);
		 * exporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
		 * pdfaddr1+Name+".xls");
		 * 
		 * exporter.exportReport(); }
		 */
		String PDF1 = pdfaddr1 + Name + ".pdf";

		// Excel JExcelApiExporter 来自JRExporter
		// JExcelApiExporter xlsExporter = new JExcelApiExporter();
		// xlsExporter.setParameter(JRExporterParameter.JASPER_PRINT,
		// jasperPrint);
		// xlsExporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,pdfaddr1+Name+".xls");
		// System.out.println(pdfaddr1+Name+".xls");
		// xlsExporter.exportReport();
		// String PDF1= pdfaddr1+Name+".xls";

		// String PDF1=pdfaddr1+Name+".pdf";
		// 执行结束
		System.out.println("创建excel成功：" + PDF1);
		return PDF1;
	}

	public static String GetShuiYin(String pdf1, String pdfaddr2, String img, String Name)
			throws DocumentException, IOException {
		String PDFFile = pdfaddr2 + Name + ".pdf";
		BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(PDFFile));
		setWatermark(bos, pdf1, 16, img);
		System.out.println("已加完水印:" + PDFFile);
		return PDFFile;

	}

	public static void setWatermark(BufferedOutputStream bos, String input, int permission, String ShuiyinImg)
			throws DocumentException, IOException {
		PdfReader reader = new PdfReader(input);
		Rectangle size = reader.getPageSize(1);
		float pdfY = size.getTop();// PDF页面高度
		float pdfX = size.getRight();// PDF页面宽度
		System.out.println(pdfY + "|" + pdfX);
		PdfStamper stamper = new PdfStamper(reader, bos);
		int total = reader.getNumberOfPages() + 1;
		PdfContentByte content;
		BaseFont base = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.EMBEDDED);
		PdfGState gs = new PdfGState();
		for (int i = 1; i < total; i++) {
			// content = stamper.getOverContent(i);// 在内容上方加水印
			content = stamper.getUnderContent(i);// 在内容下方加水印
			gs.setFillOpacity(0.2f);
			content.setGState(gs);
			content.beginText();
			content.setFontAndSize(base, 50);
			content.setTextMatrix(70, 200);
			Image image = Image.getInstance(ShuiyinImg);
			image.setAlignment(Image.LEFT | Image.TEXTWRAP);
			image.scaleToFit(600, 600);
			if (permission == 1) {
				image.setAbsolutePosition(10, pdfY / 2 - 400);
			} else {
				image.setAbsolutePosition(-15, pdfY / 2 - 250);
			}
			content.addImage(image);
			content.endText();

		}
		stamper.close();
	}

	public static boolean deleteFile(String fileName) {
		File file = new File(fileName);
		// 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
		if (file.exists() && file.isFile()) {
			if (file.delete()) {
				System.out.println("删除单个文件" + fileName + "成功！");
				return true;
			} else {
				System.out.println("删除单个文件" + fileName + "失败！");
				return false;
			}
		} else {
			System.out.println("删除单个文件失败：" + fileName + "不存在！");
			return false;
		}
	}

	/*
	 * 报表里的map jasperName：报表模板位置+名称 pdfaddr1：未加水印的报表的存放位置 pdfaddr2：加水印后的报表存放的位置
	 * img：水印图片（中间那个）
	 */
	public static String dayin(Map<String, Object> rptParameters, String jasperName, String pdfaddr1, String pdfaddr2,
			String img, String Name) throws DocumentException, IOException, JRException {
		String PDF1 = getPDF(rptParameters, jasperName, pdfaddr1, Name);
		String pdf = GetShuiYin(PDF1, pdfaddr2, img, Name);
		boolean del = deleteFile(PDF1);
		if (del == true) {
			return pdf;
		} else {
			return null;
		}

	}

}
