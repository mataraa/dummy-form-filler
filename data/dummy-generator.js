/*
 * ################ ## GENERATORS ## ################
 */

var DummyGenerator = {};

DummyGenerator = (function() {
    var generator = {};

	var DEI_KOBOL = 'Dei Kobol una apita uthoukarana ' + 'Ukthea mavatha gaman kerimuta '
			+ 'Obe satharane mua osavathamanabanta ' + 'Api obata yagnya karama'
			+ 'ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn';

	var LETTERS = "abcdefghijklmnopqrstuvwxyz";

	var DUMMY_EMAIL = chance.email();

	generator.getDummyNumber = function(limits) {
		if (limits == null) {
			return chance.natural({
				max : 500
			});
		}

		if (limits.min > limits.max) {
			return -1
		}
		return chance.natural({
			min : limits.min,
			max : limits.max
		});
	}

	 generator.getDummyText = function(limits) {
	    var text = '';
		    console.log("ff: " + limits);

		if (limits == null) {
            text = $.trim(chance.string({
                length : chance.natural({
                    min : 5,
                    max : 10
                }),
                pool : DEI_KOBOL
            }));
		} else {
		    text = $.trim(chance.string({
                length : chance.natural({
                    min : parseFloat(limits.minlength),
                    max : parseFloat(limits.maxlength)
                }),
                pool : DEI_KOBOL
            }));
        }

		return chance.capitalize(text);
	}

	generator.getDummyPhone = function(limits) {
		return chance.phone({
			formatted : false
		});
	}

	generator.getDummyEmail = function() {
		return DUMMY_EMAIL;
	}

	generator.getDummyDomain = function() {
		return chance.domain();
	}

	return generator;
});