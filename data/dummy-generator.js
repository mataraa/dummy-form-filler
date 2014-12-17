/*
 * ################ ## GENERATORS ## ################
 */

var DummyGenerator = {};

DummyGenerator = (function() {

	var DEI_KOBOL = 'Dei Kobol una apita uthoukarana ' + 'Ukthea mavatha gaman kerimuta '
			+ 'Obe satharane mua osavathamanabanta ' + 'Api obata yagnya karama'
			+ 'ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn';

	var LETTERS = "abcdefghijklmnopqrstuvwxyz";

	var DUMMY_EMAIL = chance.email();

	this.getDummyNumber = function(limits) {
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

	 this.getDummyText = function(limits) {
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

	this.getDummyPhone = function(limits) {
		return chance.phone({
			formatted : false
		});
	}

	this.getDummyEmail = function() {
		return DUMMY_EMAIL;
	}

	this.getDummyDomain = function() {
		return chance.domain();
	}

	this.getDummyPassword = function() {
		return "0Pa$$4uM^t3";
	}

	this.getDummyDate = function(limits) {

	if (typeof purposeByLabel !== undefined) {

    }
		var date = chance.date({
		    min: new Date(limits.min),
		    max: new Date(limits.max)
		});
		return date.toISOString().split('T')[0];
	}

	return this;
});