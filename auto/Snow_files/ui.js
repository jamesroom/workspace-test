$(function () {
	$('.bg-item').each(function (index, el) {
		var index = $(this).attr('data-index'), distance;
		if (index) {
			$(this).css('left', (index - 1) * 1000 + "px");	
			distance = (index - 1) * 1000;
			// img
			$(this).css({
				'background-image': 'url("css/images/bg/00' + index + '.jpg")',
				'background-position-y': "50%",
				'background-position-x': "100%"
			})					
		}

	})

	

	var config = {
		win: $(window),
		person: $('.person'),
		light: $('.light'),
		total: parseInt($('.bg').css('width'))
	}

	Parallax.init(config);

	Snow.init('canvas');

	// 上帝模式
	$('.btn-god').click(function () {
		var swh = $(this).attr('data-switch');
		if (swh === "off") {
			$(this).attr('data-switch', 'on');
			$(this).text('关闭上帝模式');
			$('.panel-control').css('width', '280px');

		} else {
			$(this).attr('data-switch', 'off');
			$(this).text('开启上帝模式');
			$('.panel-control').css('width', '130px');
		}
		$('.panel-control .modal-body').toggle();
	})

	// 风俗
	$('.btn-group-speed .btn').click(function () {
		var val = parseInt($(this).attr('data-value'));
		Snow.setSpeed(val);
	})

	// 雪的大小
	$('.btn-group-mp .btn').click(function () {
		var val = parseInt($(this).attr('data-value'));
		Snow.setMP(val);
	})

	// 雪的重量
	$('.btn-group-weight .btn').click(function () {
		var val = parseInt($(this).attr('data-value'));
		Snow.setWeight(val);
	})
})