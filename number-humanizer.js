// Generated by CoffeeScript 1.3.1
var NumberHumanizer;

(typeof exports !== "undefined" && exports !== null ? exports : this).NumberHumanizer = NumberHumanizer = (function() {

  NumberHumanizer.name = 'NumberHumanizer';

  function NumberHumanizer() {}

  NumberHumanizer.defaults = {
    suffixes: ['', 'k', 'M', 'B', 'T'],
    unsupportedSuffix: 'UNSUPPORTED UNIT',
    precision: 3,
    currencyDecimals: 2,
    stripLastZeros: true,
    zeroPadding: '00000000000000000000000000000000'
  };

  NumberHumanizer.formatNumber = function(number, options) {
    var beforePrecisionIdx, decimal, digits, formatted, group, integerPart, precision, suffix, _ref, _ref1, _ref2, _ref3;
    if (options == null) {
      options = {};
    }
    precision = (_ref = options.precision) != null ? _ref : NumberHumanizer.defaults.precision;
    number = number.toFixed(precision);
    integerPart = number.replace(/\..*/, '');
    group = Math.floor((integerPart.length - 1) / 3);
    suffix = (_ref1 = NumberHumanizer.defaults.suffixes[group]) != null ? _ref1 : NumberHumanizer.defaults.unsupportedSuffix;
    digits = number.replace('.', '');
    digits += (_ref2 = options.zeroPadding) != null ? _ref2 : NumberHumanizer.defaults.zeroPadding;
    beforePrecisionIdx = integerPart.length - 1 - group * 3;
    formatted = "" + digits.slice(0, beforePrecisionIdx + 1 || 9e9);
    decimal = "." + (digits.substr(beforePrecisionIdx + 1, precision - formatted.length));
    if ((_ref3 = options.stripLastZeros) != null ? _ref3 : NumberHumanizer.defaults.stripLastZeros) {
      decimal = decimal.replace(/0+$/, '');
    }
    formatted += decimal;
    return "" + (formatted.replace(/\.0*$/, '')) + suffix;
  };

  NumberHumanizer.formatCurrency = function(number, options) {
    var decimals, _ref;
    if (options == null) {
      options = {};
    }
    decimals = (_ref = options.currencyDecimals) != null ? _ref : NumberHumanizer.defaults.currencyDecimals;
    if (number < 1000) {
      return "$" + (number.toFixed(decimals).replace('.00', ''));
    }
    return "$" + (NumberHumanizer.formatNumber(number, options));
  };

  return NumberHumanizer;

}).call(this);
