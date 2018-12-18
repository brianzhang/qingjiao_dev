package JSONObjectTest;

import com.lc.ibps.common.system.persistence.entity.NewsPo;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

/**
 * JSONObject关于日期的转换错误解决方法
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年8月15日-下午7:36:28
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class JsonTest {
	
	public static void main(String[] args) {
		String json = "{\"pk\":\"\",\"name\":null,\"createBy\":null,\"createTime\":null,\"updateBy\":null,\"updateTime\":null,\"createOrgId\":null,\"id\":\"347031089790844928\",\"title\":\"这是草稿1222344\",\"userName\":\"\",\"userId\":\"\",\"publicDate\":\"2017-08-15\",\"loseDate\":\"2017-08-17\",\"key\":\"\",\"author\":\"zhong\",\"depName\":\"\",\"depId\":\"\",\"isPublic\":\"yes\",\"type\":\"\",\"typeId\":\"\",\"picture\":\"\",\"fileAttach\":\"\",\"status\":\"drafts\",\"publicItem\":\"important\",\"content\":\"\"}";
		JSONObject po = JSONObject.fromObject(json);
		System.out.println(po);
		String[] dateFormats = new String[] {"yyyy-MM-dd"};    
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));  
		NewsPo p = (NewsPo) JSONObject.toBean(po, NewsPo.class);
		System.out.println(p);
		String json2 = "{\"aTime\":\"2017-08-15\",\"bTime\":\"2017-08-17\"}";
		JSONObject obj = JSONObject.fromObject(json2);
		System.out.println(obj);
		demo demo = (demo) JSONObject.toBean(obj, demo.class);
		System.out.println(demo);
		
	}

}
