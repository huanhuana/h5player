(function ($, root) {
	var AudioManager = function () {
		this.audio = new Audio();
		this.status = 'pause';
	}
	AudioManager.prototype = {
		play: function () {
			this.audio.play();
			this.status = 'play';
		},
		pause: function () {
			this.audio.pause();
			this.status = 'pause';
		},
		//设定资源路径
		setAudioSource: function (musicSrc) {
			this.audio.src = musicSrc;
		},
		//判断是否播放
		judgePlay: function () {
			this.status == 'pause' ? this.play() : this.pause();
		},
		//判断左右键时的播放状态
		judgePlay2: function () {
			this.status == 'play' ? this.play() : this.pause();
		}
	}
	root.AudioManager = AudioManager;
}(window.Zepto, window.player || (window.Player = {})))