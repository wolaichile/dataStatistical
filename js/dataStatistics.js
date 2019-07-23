$.fn.dataStatistics = function(options, flag) {
	options = $.extend({
		min: 100,
		max: 150,
		time: 60000,
		len: 6
	}, options || {});

	var ths = this;

	var el = ths.find('.set_last');
	if(flag) {
		ths.find('.digit_set').each(function(index) {
			$(this).empty()
		});
		var nowNums = zfill(options.min, options.len).toString().split("");
		var html = '<div class="digit">' +
			'  <div class="digit_top">' +
			'    <span class="digit_wrap"></span>' +
			'  </div>' +
			'  <div class="shadow_top"></div>' +
			'  <div class="digit_bottom">' +
			'    <span class="digit_wrap"></span>' +
			'  </div>' +
			'  <div class="shadow_bottom"></div>' +
			'</div>'
		ths.find('.digit_set').each(function(index) {
			for(i = 0; i < 10; i++) {
				$(this).append(html);
				var currentDigit = $(this).find('.digit')[i];
				$(currentDigit).find('.digit_wrap').text(i);
			}
		});
		$.each(nowNums, function(index, val) {
			var set = ths.find('.digit_set').eq(index);
			var i = parseInt(val)
			set.find('.digit').eq(i).addClass('active');
			set.find('.digit').eq(i + 1).addClass('previous');
		});
	}

	function zfill(num, size) {
		var s = "000000000000" + num;
		return s.substr(s.length - size);
	}

	function run() {
		var maxNumArr = zfill(options.max, options.len).toString().split("")
		var minNumArr = zfill(options.min, options.len).toString().split("")
		var timerArr = new Array(maxNumArr.length)
		var numArr = new Array(maxNumArr.length)

		$.each(maxNumArr, function(index, val) {
			if(val != minNumArr[index]) {
				var max = parseInt(val)
				var min = parseInt(minNumArr[index])
				var t = 0
				if(max > min) {
					numArr[index] = max - min
					t = options.time / (max - min)
				} else {
					numArr[index] = max + 10 - min
					t = options.time / (max + 10 - min)
				}
				timerArr[index] = setInterval(function() {
					increase(index)
				}, t);
			}
		});

		function increase(inx) {
			var dom = ths.find('.digit_set').eq(inx)
			if(numArr[inx] < 1) {
				clearInterval(timerArr[inx]);
				return false;
			}
			numArr[inx]--;
			var current = dom.find('.active'),
				previous = dom.find('.previous');
			previous.removeClass('previous');
			current.removeClass('active').addClass('previous');
			if(current.next().length == 0) {
				dom.find('.digit:first-child').addClass('active');
			} else {
				current.next().addClass('active');
			}
		}
	}

	run();
};