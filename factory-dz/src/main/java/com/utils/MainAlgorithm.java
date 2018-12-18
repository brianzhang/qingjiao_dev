package com.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class MainAlgorithm {
	public String readWord(String filePath) {

		String text = "";
		// 对DOC文件进行提取
		int i = 0;
		try {
			FileInputStream in = new FileInputStream(new File(filePath));
			// 创建WordExtractor
			WordExtractor extractor = new WordExtractor(in);
			text = extractor.getText();
		} catch (Exception e) {
			XWPFDocument doc;
			try {
				FileInputStream is = new FileInputStream(new File(filePath));
				doc = new XWPFDocument(is);
				XWPFWordExtractor extractor = new XWPFWordExtractor(doc);
				text = extractor.getText();
			} catch (IOException e1) {
				System.out.println(e1.getMessage());
			}
		}
		i++;
		return text;
	}

	public String[] readWord(List<String> filePaths) {

		String[] text = new String[filePaths.size()];

		// 对DOC文件进行提取

		int i = 0;
		for (String filePath : filePaths) {
			String AbsolutePath = filePath;
			try {
				FileInputStream in = new FileInputStream(new File(filePath));
				// 创建WordExtractor
				WordExtractor extractor = new WordExtractor(in);
				text[i] = extractor.getText();
			} catch (Exception e) {
				XWPFDocument doc;
				try {
					FileInputStream is = new FileInputStream(new File(filePath));
					doc = new XWPFDocument(is);
					XWPFWordExtractor extractor = new XWPFWordExtractor(doc);
					text[i] = extractor.getText();
				} catch (IOException e1) {
					System.out.println(e1.getMessage());
				}
			}
			i++;
		}

		return text;
	}

	// 创建输入流读取DOC文件
	public String[] readWord(String path, String name[]) {

		FileInputStream in = null;
		String[] text = new String[name.length];

		// 对DOC文件进行提取
		try {
			for (int i = 0; i < name.length; i++) {
				String AbsolutePath = path + "\\" + name[i];
				in = new FileInputStream(new File(AbsolutePath));

				// 创建WordExtractor
				WordExtractor extractor = new WordExtractor(in);
				text[i] = extractor.getText();
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		return text;
	}

	// 编辑距离算法求相似度
	public Object[] EDcalculate(String text[], String name[]) {
		EditDistance ed = new EditDistance();// 编辑距离算法
		ArrayList TotalNameList = new ArrayList(new ArrayList()), TotalSimilarity = new ArrayList(new ArrayList());

		for (int i = 0; i < text.length; i++) {
			for (int j = 1; j < text.length; j++) {
				if (i >= j)
					continue;
				char a[], b[];
				a = new char[text[i].length()];
				b = new char[text[j].length()];
				text[i].getChars(0, text[i].length(), a, 0);
				text[j].getChars(0, text[j].length(), b, 0);

				int result = ed.edit(a, b, a.length, b.length);
				float maxLength = text[i].length() > text[j].length() ? text[i].length() : text[j].length();
				float similarity = 1 - (result / maxLength);

				if (similarity > 0.60) // 输出相似度超过%60的学生到新的Excel
				{
					java.text.NumberFormat percentFormat = java.text.NumberFormat.getPercentInstance();// 将相似度转化为百分比显示
					percentFormat.setMaximumFractionDigits(3);
					String pesimilarity = percentFormat.format(similarity);
					TotalNameList.add(name[i]);
					TotalNameList.add(name[j]);
					TotalSimilarity.add(pesimilarity);
				}
			}
		}
		Object[] o = { TotalNameList, TotalSimilarity };// 将存储论文相似学生信息的集合存储到Object中
		return o;
	}

	// 保存论文相似的学生信息
	public JSONArray getCheckInfo(Object[] object) {
		// 定义集合的二维数组储存动态生成的学生论文相似的学生信息
		// 从object中取出集合信息，object为从 CalculateSimilarity（Object[]
		// objects）中获得的论文相似的学生信息
		ArrayList<String> _totalNameList = (ArrayList) object[0];
		ArrayList<String> _totalSimilarity = (ArrayList) object[1];
		JSONArray ja = new JSONArray();
		int i = 0;
		for (String similarity : _totalSimilarity) {
			JSONObject jo = new JSONObject();
			jo.put("doc1", _totalNameList.get(i));
			jo.put("doc2", _totalNameList.get(i + 1));
			jo.put("similarity", similarity);
			ja.add(jo);
			i += 2;
		}
		return ja;
	}

}
