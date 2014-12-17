
function Limits($element) {

    if($element typeof !== 'undefined'){
        this.minlength = $element.attr('minlength');
        this.maxlength = $element.attr('maxlength');
        this.min = $element.attr('min');
        this.max = $element.attr('max');
    }
    //DummyLogger.logInfo($element, 'original limits', this);

    this.isMinMaxCorrect = function(){
       return this.min != null && this.max != null && this.min <= this.max;
    };

    this.isMinlengthMaxlengthCorrect = function(){
       return this.minlength != null && this.maxlength != null && this.minlength <= this.maxlength;
    };

    this.isMinMaxDatesCorrect = function(){
       return this.min != null && this.max != null && (new Date(this.min) <= new Date(this.max));
    };
};

//
//Limits.readLimits = function($element) {
//    var limits = new Limits();
//
//    var minlength = $element.attr('minlength');
//    var maxlength = $element.attr('maxlength');
//    var min = $element.attr('min');
//    var max = $element.attr('max');
//
//    if (minlength) {
//        limits.minlength = minlength;
//    }
//    if (maxlength) {
//        limits.maxlength = maxlength;
//    }
//    if (min) {
//        limits.min = min;
//    }
//    if (max) {
//        limits.max = max;
//    }
//
//    DummyLogger.logInfo($element, 'original limits', limits);
//
//    return limits;
//}
