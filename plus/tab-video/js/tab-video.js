$(function() {
	//滚动
	$(".tab-list").mCustomScrollbar({
		axis: "y", // horizontal scrollbar
		theme: "rounded-dark"
	});
	//side 侧栏切换显示
	$(".tab-side-btn").on("click", function() {
		$(".tab-side").toggleClass("active");

	})

	var video = document.querySelector("#video"); //视频对象 
	//video
	$(".tab-show").on("click", function() {
		if($(this).hasClass("play")) {
			video.pause();
		} else {
			video.play();
		}
	});
	//播放开始
	video.addEventListener("play", function() {
		document.querySelector(".tab-show").className = 'tab-show play';
	}, false);
	//结束获停止
	function playStop() {
		$(".tab-show").removeClass('play');
	}
	video.addEventListener("pause", playStop, false);
	video.addEventListener("ended", playStop, false);
	//video tab
	$(".tab-list a").on("click", function() {
		var src = $(this).attr("data-video");
		var title = $(this).find("h4").text();
		$(".tab-title").text(title);
		video.src = src;

	})

})