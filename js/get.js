function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function getArticleId() {
	var a = GetRequest();
	var articleIdTemp = a['articleId'];
	mui.ajax({
		url: 'http://news.immnc.com:8888/api/article/details',
		data: {
			articleId: articleIdTemp
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			// 请求成功
			console.log(data)
			giveDetail(data.data.articleDetails.type,data)
		},
		error: function(xhr, type, errorThrown) {
			// 请求失败
		}
	});
}

function giveDetail(type,data){
	if(type==1){
		document.getElementById("articleDetail").appendChild(data.data.articleDetails.content)
	}
	if(type==3){
		document.getElementById("videoSrc").src = "https://p0.cdrysj.com/po" + data.data.articleDetails.content;
		document.getElementById("videoDetail").load();
	}
}
