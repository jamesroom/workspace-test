window.Parallax = (function () {
	var progress = 0.0, total, innerWidth, person, person_w, win, offsetx, light;
	var level = 0;
	var memory = 1000;

	var timeline = {
		0.1: {
			sayWord:"It's cold here, and it's going to dark, I need move on."
		},
		0.2: {
			skyColor: "#032435",
			light: 0.2
		},
		0.3: {
			skyColor: "#032435",
			light: 0.7,
			sayWord: "It remind me ofsomething...the first time I met her."
		},
		0.4: {
			skyColor: "#032435",
			light: 1
		},
		0.5: {
			skyColor: "#032435",
			light: 1,
			sayWord: "However...everything is gone."
		},
		0.6: {
			skyColor: "#032435",
			light: 1
		},
		0.7: {
			skyColor: "#41677a",
			light: 0.7,
			sayWord: "......"
		},
		0.8: {
			skyColor: "#5e879b",
			light: 0.2
		}							

	}

	var scrollInit = function () {
		setTimeout (function () {
			scrollTo(0,0);
		}, 100);
	}	

	var initSetting = function (cfg) {
		win = cfg.win;
		person = cfg.person;
		light = cfg.light;
		person_w = parseInt(person.css('width'));
		total = cfg.total;
		innerWidth = $(window).innerWidth();
	}

	var init = function (cfg) {

		scrollInit();
		initSetting(cfg)
		walk();

		win.scroll(function () {
			onProgress();
		}).resize(function () {
			innerWidth = win.innerWidth();
			onProgress();
		})
	}


	var walk = function () {
		person.css('left', (innerWidth - person_w) * (1 - progress) + "px");
		light.css('left', innerWidth * progress + "px");
	}

	var speak = function (word) {
		$('.speech').slideDown(300);
		$('.speech-content').text(word);		
	}

	var shutup = function () {
		$('.speech').slideUp(300);
	}

	var skyColorChange = function (color) {
		if (!color) var color = '#5e879b';
		$('body').css('background-color', color);
	}

	var bgPull = function () {
		var percent;
	    // 回忆是否进入
	    if (offsetx > 3000) {

	    } else if (2000 - offsetx - innerWidth < 0) {
	    	// 在其中时
	    	// 2000 - offsetx: 在 part3 中出现在屏幕中的区域
	    	percent = 2000 - offsetx - innerWidth;
	    	percent = Math.abs(percent);
	    	percent = percent / innerWidth;
			
	    } else {
	    	// 即将接近时
 	    	percent = (offsetx + innerWidth) / 2000;
 	    	percent = 1 - percent
 	    }	

 	    $('.bg-parallax').css('background-position-x', percent * 100 + "%");	    		
	}

	var lighting = function (bright) {
		$('.light-bulb').css('background-color', 'rgba(255, 255, 0, ' + bright + ')');
	}

	var onProgress = function () {
	    offsetx = win.scrollLeft();
	    var origin = progress;
	    progress = offsetx / (total - win.innerWidth());

	    bgPull();

	    // Jimmy walk
	    walk(); 

	    // Weather
	    var percent = Util.myFixed(progress, 1);
	    // console.log(percent);
	    if (timeline[percent]) {
	    	var cfg = timeline[percent];
	    	// sky color
	    	if (cfg.skyColor) {
	    		$('body').css('background-color', cfg.skyColor);
	    	}

	    	// say something
	    	if (cfg.sayWord) {
	    		speak(cfg.sayWord);
	    	} else {
	    		shutup();
	    	}

	    	// change the street light
	    	if (cfg.light) {
	    		lighting(cfg.light);
	    	}

	    } else {
	    	shutup();
	    	skyColorChange();
	    }

	}

	return {
		init: init,
		scrollInit: scrollInit
	}
})()