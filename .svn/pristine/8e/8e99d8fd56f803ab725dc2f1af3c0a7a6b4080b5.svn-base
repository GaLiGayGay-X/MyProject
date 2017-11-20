<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>indexPage</title>
<script type="text/javascript"
	src="${ctx }/staticSource/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${ctx }/staticSource/js/jquery.ztree.all.js"></script>
<script type="text/javascript"
	src="${ctx }/staticSource/js/bootstrap.js"></script>
<script type="text/javascript"
	src="${ctx }/staticSource/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticSource/js/global.js"></script>
<link rel="stylesheet" href="${ctx }/staticSource/css/bootstrap.css">
<link rel="stylesheet"
	href="${ctx }/staticSource/css/zTreeStyle/zTreeStyle.css">
<link rel="stylesheet" href="${ctx }/staticSource/css/easyui.css">

</head>
<body>
	<div class="row-fluid">
		<div class="col-md-3" style="width: 15%">
			<ul id="ztreeDemo" class="ztree"
				style="height: 480px; font-size: 12px; padding-bottom: 30px; overflow: auto;"></ul>
		</div>
		<div class="col-md-12" style="height: 480px; width: 85%">
			<form class="form-horizontal form-bordered" action="#">
				<form class="form-horizontal form-bordered" action="#">
					<div class="form-body">
						<div class="form-group">
							<div class="col-md-12"
								style="padding-left: 1px; margin-left: 15px;">
								<div class="col-md-3" style="padding-left: 0px;">
									<input type="text" placeholder="请输入服务资源编号或服务名称" id="searchKey"
										class="form-control searchBarFom">
								</div>
								<div class="col-md-2">
									<button class="btn btn-success rounded" type="button"
										id="btn-4" onclick="ServiceBaseTree.query()">
										<i class="fa fa-search"></i>查询
									</button>
									&nbsp;
									<button id="btn-1" class="btn btn-primary rounded" type="reset">
										<i class="fa fa-eraser"></i> 清空
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
				<table id="dataGrid" style="height: 600px;"></table>
		</div>
	</div>

</body>
<script type="text/javascript"
	src="${ctx }/js/servicebasetree/ServiceBaseTree.js"></script>
</html>
