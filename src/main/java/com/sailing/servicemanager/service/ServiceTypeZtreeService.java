
/**
 * 项目名称：SNAM_CLOUD_PLATFORM
 * 包名：com.sailing.servicemanager.service
 * 文件名：ServiceTypeZtreeService.java
 * 版本信息：@version 1.0
 * 日期：2017年11月10日-上午9:28:15
 * Copyright (c) 2017 Sailing. All Rights Reserved.
 */
package com.sailing.servicemanager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sailing.servicemanager.dao.ServiceTypeTreeDao;
import com.sailing.servicemanager.entity.BdspServiceBase;

/**
 * 类名称：ServiceTypeZtreeService
 * 类描述：TODO
 * 创建人：Administrator
 * 创建时间：2017年11月10日 上午9:28:15
 * 修改人：Administrator
 * 修改时间：2017年11月10日 上午9:28:15
 * 修改备注：
 */
@Service
@Transactional(readOnly=true)
public class ServiceTypeZtreeService {
    
    @Autowired
    private ServiceTypeTreeDao serviceTypeTreeDao;
    
    public List<Map> getAllService(String searchKey, String enumId, String treeLayer){
        return serviceTypeTreeDao.getAllService(searchKey, enumId, treeLayer);
    }
    
    public Map getServiceBaseById(String id){
        return serviceTypeTreeDao.getServiceBaseById(id);
    }
    
}

