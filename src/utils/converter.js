/**
 * Convert from Celsius to Fahrenheit
 * @param {number} temp - temperature in Celsius
 * @return {number} - temperature in Fahrenheit
 */
function convertCtoF(temp) {
  return temp * 1.8 + 32;
}

/**
 * Convert from Celsius to Fahrenheit
 * @param {number} temp - temperature in Celsius
 * @return {number} - temperature in Fahrenheit
 */
function convertFtoC(temp) {
  return (temp - 32) / 1.8;
}

/**
 * Convert date to string
 * @param {Date} date - date to convert
 */
function convertDateToString(date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
}
