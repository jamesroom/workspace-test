window.Util = (function () {
	var myFixed = function (number, precision) {
		var multiplier = Math.pow( 10, precision );
    	return Math.round( number * multiplier ) / multiplier;
	}

	var supportCanvas = function () {
		var elem = document.createElement('canvas');
  		return !!(elem.getContext && elem.getContext('2d'));
	}

	return {
		myFixed: myFixed,
		supportCanvas: supportCanvas
	}
})()