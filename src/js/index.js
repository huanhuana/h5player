var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var dataUrl = '/mock/data.json';
var render = root.render;
var songList;
var controlManager;
var audioManager = new root.AudioManager();
var interval;
var duration;
var curTime;
var ratio;
$('.prev-btn').on('click', function () {
	var index = controlManager.prev();
	renderAll(index, songList);
});
$('.next-btn').on('click', function () {
	var index = controlManager.next();
	renderAll(index, songList);
});
$('.play-btn').on('click', function () {
	audioManager.judgePlay();
	$(this).toggleClass('play-state');
	frame();
})
//注册喜欢按钮事件
$('.like-btn').on('click', function () {
	$(this).toggleClass('liked');
})
//拖动
$('.slide-point').on('touchstart', function () {
	cancelAnimationFrame(interval);
	$(this).on('touchmove', function (e) {
		ratio = root.dragSlider(e.touches[0].pageX, duration);
	}).on('touchend', function () {
		audioManager.audio.currentTime = ratio;
		frame()
	})
})
//播放结束
$(audioManager.audio).on('ended', function () {
	$('.next-btn').trigger('click');

});
//歌曲及界面渲染
function renderAll(index, data) {
	render(data[index], data, index);
	manueEvent(data);
	audioManager.setAudioSource(data[index].audio);
	root.renderTimeDom(data[index]);
	audioManager.judgePlay2();
}
//时间和进度条动画效果
function frame() {
	cancelAnimationFrame(interval);
	curTime = audioManager.audio.currentTime;
	duration = audioManager.audio.duration; 
	root.renderCurrentTimes(curTime);
	root.proBar(curTime, duration);
	interval = requestAnimationFrame(frame);
}
//注册菜单点击事件
function manueClick() {
	$('.list-btn').on('click', function () {
		$('.manue-list').css({
			'transform': 'translateY(0)'
		});
		$('.list-closed').on('click', function () {
			$('.manue-list').css({
			'transform': 'translateY(100%)'
			});
		});
	})
}
//注册菜单列表点击事件
function manueList(data) {
	for(var i = 0; i < data.length; i ++) {
		$('.list-item')[i].onclick = (function (j) {
			return function() {
				renderAll(j, data);
				$('.manue-list').css({
					'transform': 'translateY(100%)'
				});
			}
		}(i))
	}
}
//菜单总事件
function manueEvent(data) {
	manueClick();
	manueList(data);
}
//ajax成功回调函数
function successBack(data) {
	console.log(data);
	songList = data;
	controlManager = new root.ControlManager(data.length);
	renderAll(0, data);
	duration = data[0].duration;
}
function getData(url, successBack) {
	$.ajax({
		url: url,
		type: 'GET',
		success: successBack,
		error: function () {
			console.log('error');
		}
	})
}
getData(dataUrl, successBack);