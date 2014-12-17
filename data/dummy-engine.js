var DummyFormFiller = {};

DummyFormFiller = (function() {
	var engine = {};
    var _generator;

	engine.populateDummyData = function() {
        _generator = new DummyGenerator();
        _semiotician = new DummySemiotician();

		var $here = $('html');

		$.each($here.find('input, select, textarea'), function() {
			populateElementIfNotSetYet($(this), $here);
		});
	}

	var excludedNames = [];

	/**
	 * Populates given element with a dummy value within parent's scope. Does
	 * not modify already populated element or element's family (that is defined
	 * by the 'name' attribute). Tries to figure out element's purpose, e.g.
	 * age, year. Ensures the value meets element's limitations, e.g. min,
	 * minlength.
	 */
	function populateElementIfNotSetYet($element, $topParent) {
		if ($element.is('[type=text]') && isEmptyVisibleAndEnabled($element)) {
				populateWithRandomTextWisely($element);
		} else if ($element.is('[type=email]') && isEmptyVisibleAndEnabled($element)) {
				$element.val(_generator.getDummyEmail());
		} else if ($element.is('[type=url]') && isEmptyVisibleAndEnabled($element)) {
				$element.val('http://' + _generator.getDummyDomain());
		} else if ($element.is('[type=radio]')) {
			var groupName = $element.prop('name');
			if (isEnabled($element) && !isExcluded(groupName)) {
				var $radioInputs = findVisibleEnabledInputsByTypeAndName($topParent, 'radio', groupName);
				if (!isAnyInputChecked($radioInputs)) {
					clickRandomInput($radioInputs);
				}
				excludedNames.push(groupName);
			}
		} else if ($element.is('[type=checkbox]')) {
			var groupName = $element.prop('name');
			if (isVisible($element) && isEnabled($element) && !isExcluded(groupName)) {
				var $checkboxInputs = findVisibleEnabledInputsByTypeAndName($topParent, 'checkbox', groupName);
				if (!isAnyInputChecked($checkboxInputs)) {
					clickRandomInputs($checkboxInputs);
				}
				excludedNames.push(groupName);
			}
		} else if ($element.is('[type=password]') && isEmptyVisibleAndEnabled($element)) {
            $element.val(_generator.getDummyPassword());
		} else if ($element.is('select') && isEmptyVisibleAndEnabled($element)) {
				clickRandomOptionOrOptions($element);
		} else if ($element.is('[type=number]') && isEmptyVisibleAndEnabled($element)) {
				populateWithRandomNumberWisely($element);
		} else if ($element.is('[type=date]') && isEmptyVisibleAndEnabled($element)) {
                populateWithRandomDateWisely($element);
        } else if ($element.is('[type=tel]') && isEmptyVisibleAndEnabled($element)) {
				$element.val(_generator.getDummyPhone());
		} else if ($element.is('textarea') && isEmptyVisibleAndEnabled($element)) {
				$element.val(chance.paragraph());
		}
	}

	/*
	 * ################ # MANIPULATORS # ################
	 */
	function clickRandomInput($elements) {
		$(chance.pick($elements)).click();
	}

	function clickRandomInputs($elements) {
		var randomBoolean;
		$.each($elements, function() {
			if (chance.bool() && isVisible($(this)) && isEnabled($(this))) {
				$($(this)).click();
			}
		});
	}
	/**
	 * Selects one option or, if 'multiple', random number of options. Does not
	 * select single option if currently selected index higher than 0. Does not
	 * select multiple options if any already selected.
	 */
	function clickRandomOptionOrOptions($select) {
		if ($select.prop('multiple')) {
            $select.find('option').each(function() {
                $(this).prop("selected", chance.bool());
            });
		} else {
			if ($select.prop("selectedIndex") <= 0) {
				$(chance.pick($select.find('option'))).prop("selected", true);
			}
		}
	}

	/**
	 * Populates given input with random text or readdresses the task to more
	 * appropriate populator. Considers: - min and max properties - name and
	 * label to guess input's role, e.g. age, year
	 */
	function populateWithRandomTextWisely($input) {
		var inputPurpose = _semiotician.defineInputPurpose($input);

		switch (inputPurpose) {
		case DummyPurposeEnum.PHONE_PURPOSE:
		case DummyPurposeEnum.AGE_PURPOSE:
		case DummyPurposeEnum.YEAR_PURPOSE:
			populateWithRandomNumberWisely($input, inputPurpose);
			break;
		case DummyPurposeEnum.UNDEFINED_PURPOSE:
		default:
		    var limits = new Limits($input);
			$input.val(_generator.getDummyText(limits));
		}
	}

	/**
	 * Populates given input with random number. Considers: - min and max
	 * properties - name and label to guess input's role, e.g. age, year
	 */
	function populateWithRandomNumberWisely($input, inputPurpose) {
		inputPurpose = (typeof inputPurpose !== 'undefined') ? inputPurpose : _semiotician.defineInputPurpose($input);

		switch (inputPurpose) {
		case DummyPurposeEnum.PHONE_PURPOSE:
			$input.val(_generator.getDummyPhone());
			break;
		case DummyPurposeEnum.AGE_PURPOSE:
			var ageLimits = getOrCreateMinAndMaxLimits(DummyPurposeEnum.AGE_PURPOSE, $input);
			$input.val(_generator.getDummyNumber(ageLimits));
			break;
		case DummyPurposeEnum.YEAR_PURPOSE:
			var yearLimits = getOrCreateMinAndMaxLimits(DummyPurposeEnum.YEAR_PURPOSE, $input);
			//$input.val(_generator.getDummyNumber(yearLimits));
			break;
		case DummyPurposeEnum.UNDEFINED_PURPOSE:
		default:
			$input.val(_generator.getDummyNumber(getOrCreateMinAndMaxLimits(null, $input)));
		}
	}
	
    /**
	 * Populates given input with random date. Considers: - min and max properties
	 */
	function populateWithRandomDateWisely($input, inputPurpose) {
		var limits = getOrCreateMinAndMaxLimits(DummyPurposeEnum.YEAR_PURPOSE, $input);
console.log(limits.isMinMaxDatesCorrect);
		if(limits.isMinMaxDatesCorrect()){
		    $input.val(_generator.getDummyDate(limits));
		}
	}
	
	/*
	 * ################ ### HELPERS #### ################
	 */

	/**
	 * Checks if 'limits' contain min and max values. If yes, they are
	 * returned. Otherwise new values are created for provided purpose.
	 */
	function getOrCreateMinAndMaxLimits(purpose, $input) {
        var limits = new Limits($input);
		if (limits.min != null && limits.max != null) {
			return limits;
		}

		var min = 1;
		var max = 100;
		var limitsToReturn = new Limits(null);

		if (DummyPurposeEnum.AGE_PURPOSE === purpose) {
			min = 21;
			max = 75;
		} else if (DummyPurposeEnum.YEAR_PURPOSE === purpose) {
			min = "1940-01-01";
			max = "2015-12-31";
		}

		if (limits.min == null && limits.max == null) {
			limitsToReturn.min = min;
			limitsToReturn.max = max;
			return limitsToReturn;
		}

		if (limits.min != null) {
			limitsToReturn.min = limits.min;
		} else {
			limitsToReturn.min = min < limits.max ? min : limits.max;
		}

		if (limits.max != null) {
			limitsToReturn.max = limits.max;
		} else {
			limitsToReturn.max = max > limits.min ? max : limits.min;
		}

		return limitsToReturn;
	}
	/**
     * Checks if 'limits' contain minlength and maxlength values. If yes, they are
     * returned.
     */
    function getOrCreateMinlengthAndMaxlengthLimits(purpose, $input) {

        if (limits.minlength == null && limits.maxlength == null) {
            limitsToReturn.minlength = min;
            limitsToReturn.maxlength = max;
            return limitsToReturn;
        }

        if (limits.minlength != null) {
            limitsToReturn.minlength = limits.minlength;
        } else {
            limitsToReturn.minlength = min < limits.maxlength ? min : limits.maxlength;
        }

        if (limits.maxlength != null) {
            limitsToReturn.maxlength = limits.maxlength;
        } else {
            limitsToReturn.maxlength = max > limits.minlength ? max : limits.minlength;
        }

        DummyLogger.logInfo($input, 'read/created limits', limitsToReturn);

        return limitsToReturn;
    }

	function isEmptyVisibleAndEnabled($element) {
		return isEmpty($element) && isVisible($element) && isEnabled($element);
	}

	function isEmpty($element) {
		return !$.trim($element.val());
	}

	function isVisible($element) {
		return $element.is(":visible");
	}

	function isEnabled($element) {
		return $element.is(":enabled");
	}

	function isAnyInputChecked($inputs) {
		var anyInputChecked = false;

		$inputs.each(function() {
			if ($(this).is(':checked')) {
				anyInputChecked = true;
				return false; // breaks the loop
			}
		});

		return anyInputChecked;
	}

	function findInputsByTypeAndName($here, type, name) {
		return $here.find('input[type=' + type + '][name="' + name + '"]');
	}

	function findVisibleEnabledInputsByTypeAndName($here, type, name) {
		return $here.find('input[type=' + type + '][name="' + name + '"]:visible:enabled');
	}

	function isExcluded(groupName) {
		return $.inArray(groupName, excludedNames) !== -1;
	}

	return engine;
}());