/**
 * QKit Utilities
 * 
 * 이 파일은 QKit 확장 프로그램의 유틸리티 함수들을 제공합니다.
 * 주요 기능:
 * - 텍스트 변환 (전각/반각)
 * - 문자 및 바이트 수 계산
 * - 날짜 계산 및 포맷팅
 * 
 * @author QKit Team
 * @version 2.0.0
 */

// ==================== 텍스트 변환 유틸리티 ====================

/**
 * 텍스트 변환 관련 유틸리티 클래스
 * 전각/반각 문자 변환 기능을 제공합니다.
 */
class TextConverter {
  /**
   * 전각 문자를 반각 문자로 변환합니다.
   * 
   * @param {string} text - 변환할 텍스트
   * @returns {string} 반각으로 변환된 텍스트
   * 
   * @example
   * TextConverter.toHalfWidth('１２３ＡＢＣ') // returns '123ABC'
   */
  static toHalfWidth(text) {
    if (!text) return '';
    
    return text.replace(/[\uFF01-\uFF5E]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
    });
  }

  /**
   * 반각 문자를 전각 문자로 변환합니다.
   * 
   * @param {string} text - 변환할 텍스트
   * @returns {string} 전각으로 변환된 텍스트
   * 
   * @example
   * TextConverter.toFullWidth('123ABC') // returns '１２３ＡＢＣ'
   */
  static toFullWidth(text) {
    if (!text) return '';
    
    return text.replace(/[\u0021-\u007E]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) + 0xFEE0);
    });
  }
}

// ==================== 문자 및 바이트 수 계산 유틸리티 ====================

/**
 * 문자 및 바이트 수 계산 관련 유틸리티 클래스
 * 텍스트의 문자 수, 바이트 수를 계산하는 기능을 제공합니다.
 */
class TextCounter {
  /**
   * 공백을 포함한 문자 수를 계산합니다.
   * 
   * @param {string} text - 계산할 텍스트
   * @returns {number} 공백을 포함한 문자 수
   * 
   * @example
   * TextCounter.countWithSpaces('Hello World') // returns 11
   */
  static countWithSpaces(text) {
    if (!text) return 0;
    return text.length;
  }

  /**
   * 공백을 제외한 문자 수를 계산합니다.
   * 
   * @param {string} text - 계산할 텍스트
   * @returns {number} 공백을 제외한 문자 수
   * 
   * @example
   * TextCounter.countWithoutSpaces('Hello World') // returns 10
   */
  static countWithoutSpaces(text) {
    if (!text) return 0;
    return text.replace(/\s/g, '').length;
  }

  /**
   * UTF-8 인코딩에서의 바이트 수를 계산합니다.
   * 
   * @param {string} text - 계산할 텍스트
   * @returns {number} UTF-8 바이트 수
   * 
   * @example
   * TextCounter.countBytes('Hello') // returns 5
   * TextCounter.countBytes('안녕') // returns 6 (한글은 3바이트)
   */
  static countBytes(text) {
    if (!text) return 0;
    return new TextEncoder().encode(text).length;
  }
}

// ==================== 날짜 계산 유틸리티 ====================

/**
 * 날짜 계산 관련 유틸리티 클래스
 * 날짜 차이 계산, 타임존 변환, 날짜 포맷팅 기능을 제공합니다.
 */
class DateCalculator {
  /**
   * 오늘 날짜를 기준으로 지정된 일수만큼 더하거나 뺀 날짜를 계산합니다.
   * 
   * @param {number} days - 더하거나 뺄 일수 (음수면 빼기)
   * @param {string} timezone - 타임존 ('local', 'UTC', 'UTC+9' 등)
   * @returns {string} 계산된 날짜 (YYYY-MM-DD 형식)
   * 
   * @example
   * DateCalculator.calcFromToday(7, 'local') // returns '2024-01-08' (예시)
   * DateCalculator.calcFromToday(-3, 'UTC') // returns '2024-01-01' (예시)
   */
  static calcFromToday(days, timezone = 'local') {
    const today = this.getTodayInTimezone(timezone);
    const resultDate = new Date(today);
    resultDate.setDate(today.getDate() + days);
    
    return this.formatDate(resultDate);
  }

  /**
   * 두 날짜 간의 차이를 계산합니다.
   * 31일 이하: 일수만 표시, 31일 초과: 년/월/일로 표시
   * 
   * @param {string} date1 - 첫 번째 날짜 (YYYY-MM-DD)
   * @param {string} date2 - 두 번째 날짜 (YYYY-MM-DD)
   * @returns {string} 날짜 차이 문자열
   * 
   * @example
   * DateCalculator.dateDifference('2024-01-01', '2024-01-15') // returns '14 days'
   * DateCalculator.dateDifference('2024-01-01', '2024-12-31') // returns '11 months, 30 days'
   */
  static dateDifference(date1, date2) {
    // 입력 검증
    if (!date1 || !date2) {
      throw new Error('Both dates are required');
    }

    const d1 = new Date(date1 + 'T00:00:00');
    const d2 = new Date(date2 + 'T00:00:00');
    
    // 유효한 날짜인지 확인
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      throw new Error('Invalid date format');
    }
    
    // 같은 날짜인 경우
    if (d1.getTime() === d2.getTime()) {
      return '0 days';
    }
    
    // 날짜 순서 정렬 (startDate <= endDate)
    let startDate, endDate;
    if (d1 < d2) {
      startDate = d1;
      endDate = d2;
    } else {
      startDate = d2;
      endDate = d1;
    }
    
    // 정확한 일수 차이 계산
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // 31일 이하: 일수만 표시
    if (diffDays <= 31) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    }
    
    // 31일 초과: 년/월/일로 계산
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    
    // 음수 일수 조정
    if (days < 0) {
      const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }
    
    // 음수 월수 조정
    if (months < 0) {
      months += 12;
      years--;
    }
    
    return this.formatDateDifference(years, months, days);
  }

  /**
   * 지정된 타임존에서의 오늘 날짜를 가져옵니다.
   * 
   * @param {string} timezone - 타임존 문자열
   * @returns {Date} 해당 타임존의 오늘 날짜 객체
   * 
   * @example
   * DateCalculator.getTodayInTimezone('local') // returns local today
   * DateCalculator.getTodayInTimezone('UTC+9') // returns KST today
   */
  static getTodayInTimezone(timezone) {
    const now = new Date();
    
    if (timezone === 'local' || timezone === 'UTC') {
      return now;
    }
    
    // UTC 오프셋 처리
    const offset = parseInt(timezone.replace('UTC', ''));
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return new Date(utcTime.getTime() + offset * 60 * 60 * 1000);
  }

  /**
   * 날짜 객체를 YYYY-MM-DD 형식의 문자열로 포맷합니다.
   * 
   * @param {Date} date - 포맷할 날짜 객체
   * @returns {string} 포맷된 날짜 문자열
   * 
   * @example
   * DateCalculator.formatDate(new Date('2024-01-15')) // returns '2024-01-15'
   */
  static formatDate(date) {
    if (!date || isNaN(date.getTime())) {
      throw new Error('Invalid date object');
    }
    
    const pad = n => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  /**
   * 년/월/일 차이를 읽기 쉬운 문자열로 포맷합니다.
   * 
   * @param {number} years - 년수
   * @param {number} months - 월수
   * @param {number} days - 일수
   * @returns {string} 포맷된 차이 문자열
   * 
   * @example
   * DateCalculator.formatDateDifference(1, 2, 15) // returns '1 year, 2 months, 15 days'
   * DateCalculator.formatDateDifference(0, 0, 0) // returns '0 days'
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

// ==================== 레거시 함수 (하위 호환성) ====================

/**
 * @deprecated TextConverter.toHalfWidth를 사용하세요
 * @param {string} text - 변환할 텍스트
 * @returns {string} 반각으로 변환된 텍스트
 */
function toHalfWidth(text) {
  console.warn('toHalfWidth is deprecated. Use TextConverter.toHalfWidth instead.');
  return TextConverter.toHalfWidth(text);
}

/**
 * @deprecated TextConverter.toFullWidth를 사용하세요
 * @param {string} text - 변환할 텍스트
 * @returns {string} 전각으로 변환된 텍스트
 */
function toFullWidth(text) {
  console.warn('toFullWidth is deprecated. Use TextConverter.toFullWidth instead.');
  return TextConverter.toFullWidth(text);
}

/**
 * @deprecated TextCounter.countWithSpaces를 사용하세요
 * @param {string} text - 계산할 텍스트
 * @returns {number} 공백을 포함한 문자 수
 */
function countCharsWithSpace(text) {
  console.warn('countCharsWithSpace is deprecated. Use TextCounter.countWithSpaces instead.');
  return TextCounter.countWithSpaces(text);
}

/**
 * @deprecated TextCounter.countWithoutSpaces를 사용하세요
 * @param {string} text - 계산할 텍스트
 * @returns {number} 공백을 제외한 문자 수
 */
function countCharsNoSpace(text) {
  console.warn('countCharsNoSpace is deprecated. Use TextCounter.countWithoutSpaces instead.');
  return TextCounter.countWithoutSpaces(text);
}

/**
 * @deprecated TextCounter.countBytes를 사용하세요
 * @param {string} text - 계산할 텍스트
 * @returns {number} UTF-8 바이트 수
 */
function countBytes(text) {
  console.warn('countBytes is deprecated. Use TextCounter.countBytes instead.');
  return TextCounter.countBytes(text);
}

/**
 * @deprecated DateCalculator.calcFromToday를 사용하세요
 * @param {number} days - 더하거나 뺄 일수
 * @param {string} timezone - 타임존
 * @returns {string} 계산된 날짜
 */
function calcDateFromToday(days, timezone) {
  console.warn('calcDateFromToday is deprecated. Use DateCalculator.calcFromToday instead.');
  return DateCalculator.calcFromToday(days, timezone);
}

/**
 * @deprecated DateCalculator.dateDifference를 사용하세요
 * @param {string} date1 - 첫 번째 날짜
 * @param {string} date2 - 두 번째 날짜
 * @returns {string} 날짜 차이 문자열
 */
function dateDiff(date1, date2) {
  console.warn('dateDiff is deprecated. Use DateCalculator.dateDifference instead.');
  return DateCalculator.dateDifference(date1, date2);
}

/**
 * @deprecated DateCalculator.getTodayInTimezone를 사용하세요
 * @param {string} timezone - 타임존
 * @returns {Date} 해당 타임존의 오늘 날짜
 */
function getTodayInTimezone(timezone) {
  console.warn('getTodayInTimezone is deprecated. Use DateCalculator.getTodayInTimezone instead.');
  return DateCalculator.getTodayInTimezone(timezone);
}

/**
 * @deprecated DateCalculator.formatDate를 사용하세요
 * @param {Date} date - 포맷할 날짜 객체
 * @returns {string} 포맷된 날짜 문자열
 */
function formatDate(date) {
  console.warn('formatDate is deprecated. Use DateCalculator.formatDate instead.');
  return DateCalculator.formatDate(date);
}
