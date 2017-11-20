
/**
 * 项目名称：SNAM_CLOUD_PLATFORM
 * 包名：com.sailing.servicemanager.dao
 * 文件名：ServiceBaseTree.java
 * 版本信息：@version 1.0
 * 日期：2017年11月10日-上午9:24:23
 * Copyright (c) 2017 Sailing. All Rights Reserved.
 */
package com.sailing.servicemanager.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.sailing.sdp.orm.hibernate.HibernateRepository;
import com.sailing.sdp.orm.hibernate.transformers.QueryResultTransformer;
import com.sailing.servicemanager.entity.BdspServiceBase;

/**
 * 类名称：ServiceBaseTree
 * 类描述：TODO
 * 创建人：Administrator
 * 创建时间：2017年11月10日 上午9:24:23
 * 修改人：Administrator
 * 修改时间：2017年11月10日 上午9:24:23
 * 修改备注：
 */
@Repository
public class ServiceTypeTreeDao extends HibernateRepository<BdspServiceBase> {

    public List<Map> getAllService(String searchKey, String enumId, String treeLayer) {
        StringBuffer sb = new StringBuffer();
        List<String> list = new ArrayList<>();
        sb.append("SELECT t.*, t2.DIC_NAME AS dicname FROM bdsp_service_base t, bdsp_conf_enum_type t1, bdsp_conf_data_dictionary t2, bdsp_service_enum_relation t3"+ 
                " WHERE t.SERVICE_ID = t3.SERVICE_ID AND t1.ID = t3.ENUM_ID AND t2.ID = t3.DIC_ID");
        if (StringUtils.isNotBlank(enumId) && "1".equals(treeLayer)) {
            sb.append(" AND t1.ID = ?");
            list.add(enumId);

        }
        if (StringUtils.isNotBlank(enumId) && "2".equals(treeLayer)) {
            sb.append(" AND t2.ID = ?");
            list.add(enumId);
        }
        if (StringUtils.isNotBlank(searchKey)) {
            sb.append(" AND (t.SERVICE_NAME LIKE ? OR t.SERVICE_CODE LIKE ?)");
            list.add("%" + searchKey.trim() + "%");
            list.add("%" + searchKey.trim() + "%");
        }
        if ("0".equals(treeLayer) || StringUtils.isBlank(treeLayer)) {
            sb.append(" GROUP BY t.SERVICE_ID");
        }
        sb.append(" ORDER BY t.OPERATE_TIME DESC");
        return this.findBySql(sb.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class, list.toArray());
    }
}
