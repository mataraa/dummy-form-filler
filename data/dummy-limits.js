var Limits = {};

Limits = (function() {
	var limits = {};

	limits.minlength = null;
	limits.maxlength = null;
	limits.min = null;
	limits.max = null;

	return limits;
});

Limits.readLimits = function($element) {
    var limits = new Limits();
    var minlength = $element.attr('minlength');
    var maxlength = $element.attr('maxlength');
    var min = $element.attr('min');
    var max = $element.attr('max');

    if (minlength) {
        limits.minlength = minlength;
    }
    if (maxlength) {
        limits.maxlength = maxlength;
    }
    if (min) {
        limits.min = min;
    }
    if (max) {
        limits.max = max;
    }

    DummyLogger.logInfo($element, 'original limits', limits);

    return limits;
}
