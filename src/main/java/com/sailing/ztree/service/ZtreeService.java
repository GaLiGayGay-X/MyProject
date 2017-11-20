
/**
 * 项目名称：SNAM_CLOUD_PLATFORM
 * 包名：com.sailing.ztree.service
 * 文件名：ZtreeService.java
 * 版本信息：@version 1.0
 * 日期：2017年11月15日-下午3:00:19
 * Copyright (c) 2017 Sailing. All Rights Reserved.
 */
package com.sailing.ztree.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sailing.ztree.dao.ZtreeDao;
import com.sailing.ztree.entity.EnumTypeZtree;

/**
 * 类名称：ZtreeService
 * 类描述：TODO
 * 创建人：zhangkai
 * 创建时间：2017年11月15日 下午3:00:19
 * 修改人：zhangkai
 * 修改时间：2017年11月15日 下午3:00:19
 * 修改备注：
 */
@Service
@Transactional(readOnly=true)
public class ZtreeService {
    
    @Autowired
    private ZtreeDao ztreeDao;
    
    public List<EnumTypeZtree> getServiceTypeTree(String id, String name, String level){
        List<EnumTypeZtree> list = new ArrayList<>();
        if (StringUtils.isBlank(id)) {
            List<EnumTypeZtree> rootServiceType = ztreeDao.getRootServiceType();
            for (EnumTypeZtree enumTypeZtree : rootServiceType) {
                enumTypeZtree.setIsParent(true);
                enumTypeZtree.setOpen(true);
            }
            list.addAll(rootServiceType);
        } else if (StringUtils.isNotBlank(id) && "0".equals(level)) {
            List<EnumTypeZtree> levelOneServiceType = ztreeDao.getLevelOneServiceType(id);
            for (EnumTypeZtree enumTypeZtree : levelOneServiceType) {
                List<EnumTypeZtree> levelZeroServiceType = ztreeDao.getLevelZeroServiceType(enumTypeZtree.getId());
                if (levelZeroServiceType.size() !=0 && levelZeroServiceType != null) {
                    enumTypeZtree.setIsParent(true);
                }
            }
            list.addAll(levelOneServiceType);
        } else if (StringUtils.isNotBlank(id) && "1".equals(level)) {
            List<EnumTypeZtree> list2 = ztreeDao.getLevelZeroServiceType(id);
            list.addAll(list2);
        }
        return list;
    }
}

