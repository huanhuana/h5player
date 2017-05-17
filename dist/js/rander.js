(function ($, root) {
	function renderInfo(info) {
		var html = '<h1 class="song-name">' + info.song + '</h1>' +
				   '<h3 class="singer-name">' + info.singer + '</h3>' + 
				   '<h3 class="album-name">' + info.album + '</h3>';
		$('.song-info').html(html);
	}
	function renderImage(src) {
		var img = new Image();
		img.src = src;
		img.onload = function () {
			$('.song-img img').attr('src', src);
			root.blurImg(img, $('body'));
		}
	}	
	function renderIsLike(isLike) {
		if(isLike) {
			$('.like-btn').addClass('liked');
		}else{
			$('.like-btn').removeClass('liked');
		}
	}
	function renderMenue(data, index) {
		var str = '';
		for(var i = 0; i < data.length; i ++) {
			str += '<li class="list-item"><h2>' + data[i].song + '</h2><h4>' + data[i].singer + '</h4></li>';
		}
		str += '<li class="list-closed"><p>关闭</p></li>'
		$('.data-list').html(str);
		$('.list-item').eq(index).addClass('regin');
	}
	root.render = function (data, dataAll, index) {
		renderInfo(data);
		renderImage(data.image);
		renderIsLike(data.isLike);
		renderMenue(dataAll, index);
	}
}(window.Zepto, window.player || (window.player = {})))