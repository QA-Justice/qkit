// QKit Utilities
// Refactored for better maintainability and readability

/**
 * Text Conversion Utilities
 */
class TextConverter {
  /**
   * Convert full-width characters to half-width
   * @param {string} text - Input text
   * @returns {string} Converted text
   */
  static toHalfWidth(text) {
    return text.replace(/[\uFF01-\uFF5E]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
    });
  }

  /**
   * Convert half-width characters to full-width
   * @param {string} text - Input text
   * @returns {string} Converted text
   */
  static toFullWidth(text) {
    return text.replace(/[\u0021-\u007E]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) + 0xFEE0);
    });
  }
}

/**
 * Character and Byte Counting Utilities
 */
class TextCounter {
  /**
   * Count characters including spaces
   * @param {string} text - Input text
   * @returns {number} Character count with spaces
   */
  static countWithSpaces(text) {
    return text.length;
  }

  /**
   * Count characters excluding spaces
   * @param {string} text - Input text
   * @returns {number} Character count without spaces
   */
  static countWithoutSpaces(text) {
    return text.replace(/\s/g, '').length;
  }

  /**
   * Count bytes in UTF-8 encoding
   * @param {string} text - Input text
   * @returns {number} Byte count
   */
  static countBytes(text) {
    return new TextEncoder().encode(text).length;
  }
}

/**
 * Date Calculation Utilities
 */
class DateCalculator {
  /**
   * Calculate date from today with offset
   * @param {number} days - Number of days to add/subtract
   * @param {string} timezone - Timezone for calculation
   * @returns {string} Formatted date string
   */
  static calcFromToday(days, timezone = 'local') {
    const today = this.getTodayInTimezone(timezone);
    const resultDate = new Date(today);
    resultDate.setDate(today.getDate() + days);
    
    return this.formatDate(resultDate);
  }

  /**
   * Calculate difference between two dates
   * @param {string} date1 - First date (YYYY-MM-DD)
   * @param {string} date2 - Second date (YYYY-MM-DD)
   * @returns {string} Formatted difference string
   */
  static dateDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // Ensure d1 is the later date
    if (d1 < d2) {
      [d1, d2] = [d2, d1];
    }
    
    let years = d1.getFullYear() - d2.getFullYear();
    let months = d1.getMonth() - d2.getMonth();
    let days = d1.getDate() - d2.getDate();
    
    // Adjust for negative days
    if (days < 0) {
      const lastMonth = new Date(d1.getFullYear(), d1.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }
    
    // Adjust for negative months
    if (months < 0) {
      months += 12;
      years--;
    }
    
    return this.formatDateDifference(years, months, days);
  }

  /**
   * Get today's date in specified timezone
   * @param {string} timezone - Timezone string
   * @returns {Date} Date object
   */
  static getTodayInTimezone(timezone) {
    const now = new Date();
    
    if (timezone === 'local' || timezone === 'UTC') {
      return now;
    }
    
    // Handle UTC offset
    const offset = parseInt(timezone.replace('UTC', ''));
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return new Date(utcTime.getTime() + offset * 60 * 60 * 1000);
  }

  /**
   * Format date as YYYY-MM-DD
   * @param {Date} date - Date object
   * @returns {string} Formatted date string
   */
  static formatDate(date) {
    const pad = n => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  /**
   * Format date difference as readable string
   * @param {number} years - Number of years
   * @param {number} months - Number of months
   * @param {number} days - Number of days
   * @returns {string} Formatted difference string
   */
  static formatDateDifference(years, months, days) {
    const parts = [];
    
    if (years > 0) {
      parts.push(`${years} year${years !== 1 ? 's' : ''}`);
    }
    if (months > 0) {
      parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    }
    if (days > 0) {
      parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    }
    
    return parts.length > 0 ? parts.join(', ') : '0 days';
  }
}

// Legacy function exports for backward compatibility
// These will be removed in future versions

/**
 * @deprecated Use TextConverter.toHalfWidth instead
 */
function toHalfWidth(text) {
  return TextConverter.toHalfWidth(text);
}

/**
 * @deprecated Use TextConverter.toFullWidth instead
 */
function toFullWidth(text) {
  return TextConverter.toFullWidth(text);
}

/**
 * @deprecated Use TextCounter.countWithSpaces instead
 */
function countCharsWithSpace(text) {
  return TextCounter.countWithSpaces(text);
}

/**
 * @deprecated Use TextCounter.countWithoutSpaces instead
 */
function countCharsNoSpace(text) {
  return TextCounter.countWithoutSpaces(text);
}

/**
 * @deprecated Use TextCounter.countBytes instead
 */
function countBytes(text) {
  return TextCounter.countBytes(text);
}

/**
 * @deprecated Use DateCalculator.calcFromToday instead
 */
function calcDateFromToday(days, timezone) {
  return DateCalculator.calcFromToday(days, timezone);
}

/**
 * @deprecated Use DateCalculator.dateDifference instead
 */
function dateDiff(date1, date2) {
  return DateCalculator.dateDifference(date1, date2);
}

/**
 * @deprecated Use DateCalculator.getTodayInTimezone instead
 */
function getTodayInTimezone(timezone) {
  return DateCalculator.getTodayInTimezone(timezone);
}

/**
 * @deprecated Use DateCalculator.formatDate instead
 */
function formatDate(date) {
  return DateCalculator.formatDate(date);
}
