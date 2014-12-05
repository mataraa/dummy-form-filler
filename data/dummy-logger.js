var DummyLogger = {};

DummyLogger = (function() {
	var logger = {};

	return logger;
});

DummyLogger.logInfo = function($element, key, value) {
    if ((value && typeof value !== 'object') || (typeof value === 'object' && Object.keys(value).length !== 0)) {
        console.log('Element id=\'' + $element.prop('id') + '\'\t- ' + key + ': ' + JSON.stringify(value, null, 4));
    }
}