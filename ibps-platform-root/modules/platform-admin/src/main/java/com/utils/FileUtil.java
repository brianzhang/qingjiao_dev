package com.utils;

import java.awt.Color;
import java.io.*;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;

import com.lc.ibps.base.core.encrypt.Base64;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

import net.lingala.zip4j.core.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import net.lingala.zip4j.model.ZipParameters;
import net.lingala.zip4j.util.Zip4jConstants;

public class FileUtil {
	/**
	 * 压缩文件 （压缩后 删除原有的文件）
	 * 
	 * @param path
	 *            压缩文件\文件夹路径
	 */
	public static void zip(String path) {
		zip(path,true);
	}
	
	/**
	 * 压缩文件
	 * 
	 * @param path
	 *            压缩文件\文件夹路径
	 * @param isDelete
	 *            压缩后是否删除原文件\文件夹
	 */
	public static void zip(String path, Boolean isDelete) {
		ZipFile zipFile = null;
		try {
			ZipParameters parameters = new ZipParameters();
			parameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE);
			parameters.setCompressionLevel(Zip4jConstants.DEFLATE_LEVEL_NORMAL);
			File file = new File(path);
			if (file.isDirectory()) {
				zipFile = new ZipFile(new File(path + ".zip"));
				zipFile.setFileNameCharset("GBK");
				zipFile.addFolder(path, parameters);
			} else {
				zipFile = new ZipFile(new File(path.split(".")[0] + ".zip"));
				zipFile.setFileNameCharset("GBK");
				zipFile.addFile(file, parameters);
			}
			
			if (isDelete)
				FileUtil.deleteDir(file);
		} catch (ZipException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 写入文件
	 * 
	 * @param fileName
	 *            文件名称
	 * @param content
	 *            文件内容
	 */
	public static void writeFile(String fileName, String content) {
		writeFile(fileName,content,"utf-8");
	}
	
	/**
	 * 指定字符集，写入文件。
	 * @param fileName
	 * @param content
	 * @param charset
	 */
	public static void writeFile(String fileName, String content,String charset) {
		Writer out;
		try {
			createFolder(fileName, true);
			out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(fileName), charset));
			out.write(content);
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 写入文件
	 * 
	 * @param fileName
	 * @param is
	 * @throws IOException
	 */
	public static void writeFile(String fileName, InputStream is)
			throws IOException {
		FileOutputStream fos = new FileOutputStream(fileName);
		byte[] bs = new byte[512];
		int n = 0;
		while ((n = is.read(bs)) != -1) {
			fos.write(bs, 0, n);
		}
		is.close();
		fos.close();
	}

	/**
	 * 读取文件
	 * 
	 * @param fileName
	 *            文件名称
	 * @return
	 */
	public static String readFile(String fileName) {
		try {
			File file = new File(fileName);
			String charset = getCharset(file);
			StringBuffer sb = new StringBuffer();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					new FileInputStream(fileName), charset));
			String str;
			while ((str = in.readLine()) != null) {
				sb.append(str + "\r\n");
			}
			in.close();
			return sb.toString();
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
	}
	
	/**
	 * 判断文件是否存在
	 * @param dir
	 * @return
	 */
	public static boolean isExistFile(String dir){
		boolean isExist=false;
		File fileDir=new File(dir);
		if(fileDir.isDirectory()){
			File[] files=fileDir.listFiles();
			if(files!=null&&files.length!=0){
				isExist=true;
			}
		}
		return isExist;
	}
	

	/**
	 * 获取文件的字符集
	 * 
	 * @param file
	 * @return
	 */
	public static String getCharset(File file) {
		String charset = "GBK";
		byte[] first3Bytes = new byte[3];
		try {
			boolean checked = false;
			BufferedInputStream bis = new BufferedInputStream(
					new FileInputStream(file));
			bis.mark(0);
			int read = bis.read(first3Bytes, 0, 3);
			if (read == -1)
				return charset;
			if (first3Bytes[0] == (byte) 0xFF && first3Bytes[1] == (byte) 0xFE) {
				charset = "UTF-16LE";
				checked = true;
			} else if (first3Bytes[0] == (byte) 0xFE
					&& first3Bytes[1] == (byte) 0xFF) {
				charset = "UTF-16BE";
				checked = true;
			} else if (first3Bytes[0] == (byte) 0xEF
					&& first3Bytes[1] == (byte) 0xBB
					&& first3Bytes[2] == (byte) 0xBF) {
				charset = "UTF-8";
				checked = true;
			}
			bis.reset();

			if (!checked) {
				int loc = 0;
				while ((read = bis.read()) != -1) {
					loc++;
					if (read >= 0xF0)
						break;
					// 单独出现BF以下的，也算是GBK
					if (0x80 <= read && read <= 0xBF)
						break;
					if (0xC0 <= read && read <= 0xDF) {
						read = bis.read();
						if (0x80 <= read && read <= 0xBF)// 双字节 (0xC0 - 0xDF)
							// (0x80 -
							// 0xBF),也可能在GB编码内
							continue;
						else
							break;
						// 也有可能出错，但是几率较小
					} else if (0xE0 <= read && read <= 0xEF) {
						read = bis.read();
						if (0x80 <= read && read <= 0xBF) {
							read = bis.read();
							if (0x80 <= read && read <= 0xBF) {
								charset = "UTF-8";
								break;
							} else
								break;
						} else
							break;
					}
				}

			}
			bis.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return charset;
	}

	/**
	 * 读取流到字节数组
	 * 
	 * @param is
	 * @return
	 */
	public static byte[] readByte(InputStream is) {
		try {
			byte[] r = new byte[is.available()];
			is.read(r);
			return r;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 读取文件到字节数组
	 * 
	 * @param fileName
	 * @return
	 */
	public static byte[] readByte(String fileName) {
		try {
			FileInputStream fis = new FileInputStream(fileName);
			byte[] r = new byte[fis.available()];
			fis.read(r);
			fis.close();
			return r;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 写字节数组到文件
	 * @param fileName
	 * @param b
	 * @return
	 */
	public static boolean writeByte(String fileName, byte[] b) {
		try {
			BufferedOutputStream fos = new BufferedOutputStream(
					new FileOutputStream(fileName));
			fos.write(b);
			fos.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 删除目录
	 * 
	 * @param dir
	 * @return
	 */
	public static boolean deleteDir(File dir) {
		if (dir.isDirectory()) {
			String[] children = dir.list();
			for (int i = 0; i < children.length; i++) {
				boolean success = deleteDir(new File(dir, children[i]));
				if (!success) {
					return false;
				}
			}
		}
		return dir.delete();
	}

	/**
	 * 序列化对象到文件
	 * 
	 * @param obj
	 * @param fileName
	 */
	public static void serializeToFile(Object obj, String fileName) {
		try {
			ObjectOutput out = new ObjectOutputStream(new FileOutputStream(
					fileName));
			out.writeObject(obj);
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 从文件反序列化出对象
	 * 
	 * @param fileName
	 * @return
	 */
	public static Object deserializeFromFile(String fileName) {
		try {
			File file = new File(fileName);
			ObjectInputStream in = new ObjectInputStream(new FileInputStream(
					file));
			Object obj = in.readObject();
			in.close();
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * stream 转为字符串
	 * 
	 * @param input
	 * @param charset
	 * @return
	 * @throws IOException
	 */
	public static String inputStream2String(InputStream input, String charset)
			throws IOException {
		BufferedReader in = new BufferedReader(new InputStreamReader(input,
				charset));
		StringBuffer buffer = new StringBuffer();
		String line = "";
		while ((line = in.readLine()) != null) {
			buffer.append(line + "\n");
		}
		return buffer.toString();

	}
	
	/**
	 * 将stream按照utf-8编码转换为字符串。
	 * @param input
	 * @return
	 * @throws IOException
	 */
	public static String inputStream2String(InputStream input)
			throws IOException {
		return inputStream2String(input,"utf-8");

	}

	/**
	 * 根据目录取得文件列表
	 * 
	 * @param path
	 * @return
	 */
	public static File[] getFiles(String path) {
		File file = new File(path);
		return file.listFiles();
	}

	/**
	 * 根据文件路径创建文件夹,如果路径不存在则创建.
	 * 
	 * @param path
	 */
	public static void createFolderFile(String path) {
		createFolder(path, true);
	}

	/**
	 * 创建文件夹
	 * 
	 * @param path
	 * @param isFile
	 */
	public static void createFolder(String path, boolean isFile) {
		if (isFile) {
			path = path.substring(0, path.lastIndexOf(File.separator));
		}
		File file = new File(path);
		if (!file.exists())
			file.mkdirs();
	}

	/**
	 * 创建文件目录
	 * 
	 * @param dirstr
	 *            根目录
	 * @param name
	 *            子目录名称
	 * @return
	 */
	public static void createFolder(String dirstr, String name) {
		dirstr = StringUtil.trimSufffix(dirstr, File.separator)
				+ File.separator + name;
		File dir = new File(dirstr);
		dir.mkdir();
	}

	/**
	 * 复制文件来新路径上
	 * 
	 * @param path
	 *            原路径
	 * @param newPath
	 *            新路径
	 */
	public static void renameFolder(String path, String newName) {
		File file = new File(path);
		if (file.exists())
			file.renameTo(new File(newName));
	}

	/**
	 * 仅取得文件目录下的子目录。
	 * 
	 * @param dir
	 *            目录
	 * @return 子目录列表
	 */
	public static ArrayList<File> getDiretoryOnly(File dir) {
		ArrayList<File> dirs = new ArrayList<File>();
		if (dir != null && dir.exists() && dir.isDirectory()) {
			File[] files = dir.listFiles(new FileFilter() {
				
				@Override
				public boolean accept(File file) {
					if(file.isDirectory())
						return true;
					return false;
				}
			});
			for (int i = 0; i < files.length; i++) {
				dirs.add(files[i]);
			}
		}
		return dirs;
	}

	/**
	 * 列出子文件列表
	 * 
	 * @param dir
	 *            指定目录
	 * @return 子文件列表
	 */
	public ArrayList<File> getFileOnly(File dir) {
		ArrayList<File> dirs = new ArrayList<File>();
		File[] files = dir.listFiles(new FileFilter() {
			@Override
			public boolean accept(File file) {
				if(file.isFile())
					return true;
				return false;
			}
		});
		for (int i = 0; i < files.length; i++) {
			dirs.add(files[i]);
		}
		return dirs;
	}

	/**
	 * 删除文件
	 * 
	 * @param path
	 * @return
	 */
	public static boolean deleteFile(String path) {
		File file = new File(path);
		return file.delete();
	}

	/**
	 * 文件拷贝
	 * 
	 * @param from
	 * @param to
	 * @return
	 */
	public static boolean copyFile(String from, String to) {
		File fromFile = new File(from);
		File toFile = new File(to);
		FileInputStream fis = null;
		FileOutputStream fos = null;

		try {
			fis = new FileInputStream(fromFile);
			fos = new FileOutputStream(toFile);
			int bytesRead;
			byte[] buf = new byte[4 * 1024]; // 4K buffer
			while ((bytesRead = fis.read(buf)) != -1) {
				fos.write(buf, 0, bytesRead);
			}
			
			fos.flush();
			fos.close();
			fis.close();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}

	/**
	 * 备份文件。 如果有备份文件，先删除。
	 * 
	 * @param filePath
	 */
	public static void backupFile(String filePath) {
		String backupName = filePath + ".bak";
		File file = new File(backupName);
		if (file.exists())
			file.delete();

		copyFile(filePath, backupName);

	}

	/**
	 * 取得文件扩展名
	 * 
	 * @return
	 */
	public static String getFileExt(File file) {
		if (file.isFile()) {
			return getFileExt(file.getName());
		}
		return "";
	}
	
	/**
	 * 根据文件名获取扩展名称。
	 * @param fileName
	 * @return
	 */
	public static String getFileExt(String fileName){
		int pos=fileName.lastIndexOf(".");
		if(pos>-1){
			return fileName.substring(pos + 1).toLowerCase();
		}
		return "";
	}
	
	
	/**
	 * copy目录
	 * 
	 * @param fromDir
	 *            源目录
	 * @param toDir
	 *            目标目录
	 * @throws IOException
	 */
	public static void copyDir(String fromDir, String toDir) throws IOException {
		(new File(toDir)).mkdirs();
		File[] file = (new File(fromDir)).listFiles();
		for (int i = 0; i < file.length; i++) {
			if (file[i].isFile()) {
				String fromFile = file[i].getAbsolutePath();
				String toFile = toDir + "/" + file[i].getName();

				copyFile(fromFile, toFile);
			}
			if (file[i].isDirectory())
				copyDirectiory(fromDir + "/" + file[i].getName(), toDir + "/"
						+ file[i].getName());
		}
	}

	/**
	 * 递规调用目录拷贝。
	 * 
	 * @param fromDir
	 *            源目录
	 * @param toDir
	 *            目标目录
	 * @throws IOException
	 */
	private static void copyDirectiory(String fromDir, String toDir)
			throws IOException {
		(new File(toDir)).mkdirs();
		File[] file = (new File(fromDir)).listFiles();
		for (int i = 0; i < file.length; i++) {
			if (file[i].isFile()) {
				String fromName = file[i].getAbsolutePath();
				String toFile = toDir + "/" + file[i].getName();
				copyFile(fromName, toFile);
			}
			if (file[i].isDirectory())
				copyDirectiory(fromDir + "/" + file[i].getName(), toDir + "/"
						+ file[i].getName());
		}
	}

	/**
	 * 取得文件大小
	 * 
	 * @return 返回文件大小
	 * @throws IOException
	 */
	public static String getFileSize(File file) throws IOException {
		if (file.isFile()) {
			FileInputStream fis = new FileInputStream(file);
			int size = fis.available();
			fis.close();
			return getSize((double) size);
		}
		return "";
	}
	
	/**
	 * 根据字节大小获取带单位的大小。
	 * @param size
	 * @return
	 */
	public static String getSize(double size) {
		DecimalFormat df = new DecimalFormat("0.00");
		if (size > 1024 * 1024) {
			double ss = size / (1024 * 1024);
			return df.format(ss) + " M";
		} else if (size > 1024) {
			double ss = size / 1024;
			return df.format(ss) + " KB";
		} else {
			return size + " bytes";
		}
	}

	/**
	 * 下载文件。
	 * @param response
	 * @param fullPath		文件的全路径
	 * @param fileName		文件名称。
	 * @throws IOException
	 */
	public static void downLoadFile(HttpServletRequest request,HttpServletResponse response,String fullPath,String fileName) throws IOException {
		OutputStream outp = response.getOutputStream();
		File file = new File(fullPath);
		if (file.exists()) {
			response.setContentType("APPLICATION/OCTET-STREAM");
			String filedisplay = fileName;
			String agent = (String)request.getHeader("USER-AGENT");  
			//firefox，谷歌            Trident是标识是ie浏览器 特别处理ie11 的问题
//			if(agent != null && agent.indexOf("MSIE") == -1 && agent.indexOf("Trident") == -1) {   
//				String enableFileName = "=?UTF-8?B?" + (new String(Base64.decodeBase64(filedisplay))) + "?=";     
//			    response.setHeader("Content-Disposition", "attachment; filename=" + enableFileName);    
//			}
//			else{
				//ie
				filedisplay=URLEncoder.encode(filedisplay,"utf-8");
				response.addHeader("Content-Disposition", "attachment;filename=" + filedisplay);
//			}	
			FileInputStream in = null;
			try {
				outp = response.getOutputStream();
				in = new FileInputStream(fullPath);
				byte[] b = new byte[1024];
				int i = 0;
				while ((i = in.read(b)) > 0) {
					outp.write(b, 0, i);
				}
				outp.flush();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (in != null) {
					in.close();
					in = null;
				}
				if (outp != null) {
					outp.close();
					outp = null;
					response.flushBuffer();
				}
			}
		} else {
			outp.write("文件不存在!".getBytes("utf-8"));
		}
	}
	
	/**
	 * 指定下载内容和指定的文件名进行文件下载。
	 * @param request
	 * @param response
	 * @param content
	 * @param fileName
	 * @throws IOException
	 */
	public static void downLoad(HttpServletRequest request,HttpServletResponse response,String content,String fileName) throws IOException {
		response.setContentType("APPLICATION/OCTET-STREAM");
		String filedisplay = fileName;
		String agent = (String)request.getHeader("USER-AGENT");  
		//firefox，谷歌            Trident是标识是ie浏览器 特别处理ie11 的问题
		if(agent != null && agent.indexOf("MSIE") == -1 && agent.indexOf("Trident") == -1) {   
			String enableFileName = "=?UTF-8?B?" + (new String(Base64.decodeBase64(filedisplay))) + "?=";     
		    response.setHeader("Content-Disposition", "attachment; filename=" + enableFileName);    
		}
		else{
			//ie
			filedisplay=URLEncoder.encode(filedisplay,"utf-8");
			response.addHeader("Content-Disposition", "attachment;filename=" + filedisplay);
		}	
		
		PrintWriter out= response.getWriter();
		out.write(content);
		out.flush();
		out.close();
	}

	

	/**
	 * 取得文件的相对父目录
	 * 
	 * @param baseDir
	 *            基准目录
	 * @param currentFile
	 *            当前文件
	 * @return 相对基准目录路径
	 */
	public static String getParentDir(String baseDir, String currentFile) {
		File f = new File(currentFile);
		String parentPath = f.getParent();
		String path = parentPath.replace(baseDir, "");
		return path.replace(File.separator, "/");
	}
	
	

	
	/**
	 * 根据键在属性文件中获取数据。
	 * @param fileName		属性文件名称。
	 * @param key			属性的键值。
	 * @return
	 */
	public static String readFromProperties(String fileName,String key){
		String value="";
		InputStream stream = null;
		try {
			stream = new BufferedInputStream(new FileInputStream(fileName));
			Properties prop = new Properties();
			prop.load(stream);
			value=prop.getProperty(key);
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		finally{
			if(stream!=null){
				try {
					stream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return value;	
	}
	
	/**
	 * 保存属性文件。
	 * @param fileName	文件名
	 * @param key		键名
	 * @param value		键值
	 * @return			保存是否成功。
	 */
	public static boolean saveProperties(String fileName,String key,String value){
		StringBuffer sb=new StringBuffer();
		boolean isFound=false;
		BufferedReader in=null;
		try {
			in = new BufferedReader(new InputStreamReader(new FileInputStream(fileName), "utf-8"));
			String str;
			while ((str = in.readLine()) != null) {
				if (str.startsWith(key)) {
					sb.append(key +"=" +value +"\r\n");
					isFound=true;
				}
				else{
					sb.append(str + "\r\n");
				}
			}
			//添加新的键值。
			if(!isFound){
				sb.append(key +"=" +value +"\r\n");
			}
			FileUtil.writeFile(fileName, sb.toString(), "utf-8");
			return true;
		}
		catch(Exception ex){
			ex.printStackTrace();
			return false;
		}
		finally{
			if(in!=null){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 删除属性key。
	 * @param fileName
	 * @param key
	 * @return
	 */
	public static boolean delProperties(String fileName,String key){
		StringBuffer sb=new StringBuffer();
	
		BufferedReader in=null;
		try {
			in = new BufferedReader(new InputStreamReader(new FileInputStream(fileName), "utf-8"));
			String str;
			while ((str = in.readLine()) != null) {
				if (!str.startsWith(key)) {
					sb.append(str + "\r\n");
				}
			}
			FileUtil.writeFile(fileName, sb.toString(), "utf-8");
			return true;
		}
		catch(Exception ex){
			ex.printStackTrace();
			return false;
		}
		finally{
			if(in!=null){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/** 
     * 获取接口的所有实现类 
     * @param interfaceClass 接口类 
     * @param samePackage    是否为同一包路径下 
     * @return 
     * @throws ClassNotFoundException  
     * @throws IOException  
     */  
    public static List<Class<?>> getAllClassesByInterface(Class<?> interfaceClass, boolean samePackage)   
        throws IOException, ClassNotFoundException, IllegalStateException {  
          
        if (!interfaceClass.isInterface()) {  
            throw new IllegalStateException("Class not a interface.");  
        }  
          
        ClassLoader $loader = interfaceClass.getClassLoader();  
        /** 获取包名称 */  
        String packageName = samePackage ? interfaceClass.getPackage().getName() : "/";  
        return findClasses(interfaceClass, $loader, packageName);  
    }
    
    /** 
     * 获取实现接口的实现类文件 
     * @param interfaceClass 
     * @param loader 
     * @param packageName 
     * @return 
     * @throws IOException 
     * @throws ClassNotFoundException 
     */  
    private static List<Class<?>> findClasses(Class<?> interfaceClass, ClassLoader loader, String packageName)   
        throws IOException, ClassNotFoundException {  
          
        List<Class<?>> allClasses = new ArrayList<Class<?>>();  
        /** 获取包路径 */  
        String packagePath = packageName.replace(".", "/");  
        if (!packagePath.equals("/")) {  
            Enumeration<URL> resources = loader.getResources(packagePath);  
            while (resources.hasMoreElements()) {  
                URL $url = resources.nextElement();  
                allClasses.addAll(findResources(interfaceClass, new File($url.getFile()), packageName));      
            }     
        } else {  
            String path = loader.getResource("").getPath();  
            allClasses.addAll(findResources(interfaceClass, new File(path), packageName));  
        }  
        return allClasses;  
    }
    
    /** 
     * 获取文件资源信息 
     * @param interfaceClass 
     * @param directory 
     * @param packageName 
     * @return 
     * @throws ClassNotFoundException 
     */  
    @SuppressWarnings("unchecked")  
    private static List<Class<?>> findResources(Class<?> interfaceClass, File directory, String packageName)   
        throws ClassNotFoundException {  
          
        List<Class<?>> $results = new ArrayList<Class<?>>();  
        if (!directory.exists()) return Collections.EMPTY_LIST;  
        File[] files = directory.listFiles();  
        for (File file : files) {  
            if (file.isDirectory()) {  
                // 文件夹-->继续遍历  
                if (!file.getName().contains(".")) {  
                    if (!packageName.equals("/")) {  
                        $results.addAll(findResources(interfaceClass, file, packageName + "." + file.getName()));  
                    } else {  
                        $results.addAll(findResources(interfaceClass, file, file.getName()));  
                    }                         
                }                 
            } else if (file.getName().endsWith(".class")){  
                Class<?> clazz = null;  
                if (!packageName.equals("/")) {  
                    clazz = Class.forName(packageName + "." + file.getName().substring(0, file.getName().length() - 6));  
                } else {  
                    clazz = Class.forName(file.getName().substring(0, file.getName().length() - 6));  
                }                 
                if (interfaceClass.isAssignableFrom(clazz) && !interfaceClass.equals(clazz)) {  
                    $results.add(clazz);  
                }                 
            }  
        }  
        return $results;  
    }
    
    /**
     * 克隆对象。
     * @param obj
     * @return
     * @throws Exception
     */
    public static Object cloneObject(Object obj) throws Exception{
		 ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
		 ObjectOutputStream out = new ObjectOutputStream(byteOut);
		 out.writeObject(obj); 

		 ByteArrayInputStream byteIn = new ByteArrayInputStream(byteOut.toByteArray());
		 ObjectInputStream in =new ObjectInputStream(byteIn);

		 return in.readObject();
	}

    /**
	 * 下载文件。
	 * @param response
	 * @param b		文件的二进制流
	 * @param fileName		文件名称。
	 * @throws IOException
	 */
	public static void downLoadFileByByte(HttpServletRequest request,HttpServletResponse response,byte[] b,String fileName) throws IOException {
		OutputStream outp = response.getOutputStream();
		if (b.length>0) {
			response.setContentType("APPLICATION/OCTET-STREAM");
			String filedisplay = fileName;
			String agent = (String)request.getHeader("USER-AGENT");  
			//firefox
//			if(agent != null && agent.indexOf("MSIE") == -1) {   
//				String enableFileName = "=?UTF-8?B?" + (new String(Base64.decodeBase64(filedisplay))) + "?=";     
//			    response.setHeader("Content-Disposition", "attachment; filename=" + enableFileName);    
//			}
//			else{
				filedisplay=URLEncoder.encode(filedisplay,"utf-8");
				response.addHeader("Content-Disposition", "attachment;filename=" + filedisplay);
//			}	
			outp.write(b);
		} else {
			outp.write("文件不存在!".getBytes("utf-8"));
		}
		if (outp != null) {
			outp.close();
			outp = null;
			response.flushBuffer();
		}
	}

	
	public static void downLoadExcel(HttpServletRequest request,HttpServletResponse response,List<Map<String,String>> datas,String titleRow[],String fileName){
		try {
			downLoadFileByByte(request, response, toExcel(datas, titleRow), fileName);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static byte[] toExcel(List<Map<String,String>> datas,String titleRow[]) throws IOException {
        Workbook wb = new HSSFWorkbook();
        Sheet sheet = (Sheet) wb.createSheet("sheet1");
      //添加表头
        Row row = sheet.createRow(0);
        Cell cell = null;
        CellStyle style = wb.createCellStyle(); // 样式对象

        Font font = wb.createFont();
        font.setFontName("微软雅黑");
        font.setFontHeight((short) 280);
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style.setFont(font);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        for(int i = 0;i < titleRow.length;i++){
            cell = row.createCell(i);
            cell.setCellValue(titleRow[i]);
            cell.setCellStyle(style); // 样式，居中
            sheet.setColumnWidth(i, 40 * 256);
        }
        row.setHeight((short) 540);

        style = wb.createCellStyle();
        font = wb.createFont();
        font.setFontName("宋体");
        font.setFontHeight((short) 250);
        style.setFont(font);
        style.setAlignment(CellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        //循环写入行数据
        for (int i = 0; i < datas.size(); i++) {
            Map<String,String> data = datas.get(i);
            row = (Row) sheet.createRow(i+1);
            row.setHeight((short) 400);
            for(int j = 0 ; j < data.size() ; ++j){
                cell = row.createCell(j);
                cell.setCellStyle(style);
                cell.setCellValue(data.get(titleRow[j]));
            }
        }
        //创建文件流
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        //写入数据
        wb.write(stream);
        return stream.toByteArray();
    }
	
	/**
	 * 
	 * @param xlsFileStream 传入xls文件的输入流
	 * @param fields 需要获取的字段数组
	 * @return res 按照传入字段顺序返回行数据列表
	 * @throws Exception IllegalArgumentException：所需字段在文件中没有的时候抛异常
	 */
	public static List<Map<String , String>> parseExcel(InputStream xlsFileStream ,String[] fields ) throws Exception{
		//res : 返回结果，存行数据rowList
		//rowList ：按照传入字段顺序排序
		List<Map<String , String>> res = new ArrayList();
		Map<String , String> rowList = null;
		
		HSSFCell cell = null;
		String cellStr = null;
		HSSFSheet hssfSheet = null;
		HSSFRow hssfRow = null;
		
		List<String> fList = Arrays.asList(fields);
		
		//存传入字段在xls中位置
		int[] fieldSites = new int[fields.length];
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(xlsFileStream);
		hssfSheet = hssfWorkbook.getSheetAt(0);
		hssfRow = hssfSheet.getRow(0);
		int length = 0;
		for(int x = hssfRow.getFirstCellNum() ; x < hssfRow.getLastCellNum() ; ++x){
			cell = hssfRow.getCell(x);
			cellStr = getStringVal(cell);
			if( fList.contains(cellStr) ){
				fieldSites[fList.indexOf(cellStr)] = x;
				length++;
			}
				
		}
		if(length < fields.length )
			throw new IllegalArgumentException();
		//遍历xls的行
		for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
			hssfRow = hssfSheet.getRow(rowNum);
			int minColIx = hssfRow.getFirstCellNum();
			int maxColIx = hssfRow.getLastCellNum();
			rowList = new HashMap();
			// 遍历该行，获取每个cell元素
			for (int x = 0 ; x < fieldSites.length ; ++x) {
				cell = hssfRow.getCell( fieldSites[x] );
				rowList.put( fields[x] , getStringVal(cell));
			}
			
			res.add( rowList );
		}
		
		return res;
	}
	static String getStringVal(HSSFCell cell) {
		if (cell == null)
			return "";
		switch (cell.getCellType()) {
		case HSSFCell.CELL_TYPE_BOOLEAN:
			return cell.getBooleanCellValue() ? "TRUE" : "FALSE";
		case HSSFCell.CELL_TYPE_FORMULA:
			return cell.getCellFormula();
		case HSSFCell.CELL_TYPE_NUMERIC:
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			return cell.getStringCellValue();
		case HSSFCell.CELL_TYPE_STRING:
			return cell.getStringCellValue();
		default:
			return "";
		}
	}
}
