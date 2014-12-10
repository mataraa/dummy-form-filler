var Limits = {};

Limits = (function() {

	minlength = null;
	maxlength = null;
	min = null;
	max = null;

	return this;
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
