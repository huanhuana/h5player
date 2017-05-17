(function ($, root) {
	//计算时间
	function calcTime(time) {
		var minites = Math.floor(time / 60);
		var seconds = Math.round(time - minites * 60);
		if(minites < 10) {
			minites = '0' + minites;
		}
		if(seconds < 10) {
			seconds = '0' + seconds;
		}
		return minites + ':' + seconds;
	}
	//当前时间
	function renderCurrentTimes(current) {
		var cur = calcTime(current);
		$('.current-time').text(cur);
	}
	//总时间
	function renderAllTimes(allTime) {
		$('.all-time').text(allTime);
	}
	//渲染进度条
	function proBar(cur, duration) {
		var percent = (cur / duration - 1) * 100 + '%';
		var str = 'translateX(' + percent + ')';
		$('.pro-top').css('transform', str);
	}
	//总时间渲染
	root.renderTimeDom = function (data) {
		var allTimes = calcTime(data.duration);
		renderAllTimes(allTimes);
	}
	//拖动进度条
	function dragSlider(target, duration) {
		var preLang = $('.current-time').offset().width;
		var allLang = $('.pro-bottom').offset().width;
		var nowTime = (Math.round(target) - preLang) / allLang * duration;
		var timeStr = calcTime(nowTime);
		if(target > preLang && target < (preLang + allLang)) {
			$('.current-time').text(timeStr);
			proBar((target - preLang), allLang);
		}
		return nowTime;
	}
	root.renderCurrentTimes = renderCurrentTimes;
	root.proBar = proBar;
	root.dragSlider = dragSlider;
}(window.Zepto, window.player || (window.player = {})))