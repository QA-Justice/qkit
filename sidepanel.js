/**
 * QKit Side Panel JavaScript
 * 
 * 이 파일은 QKit 확장 프로그램의 사이드 패널 기능을 담당합니다.
 * 주요 기능:
 * - 아코디언 네비게이션
 * - 텍스트 변환 (전각/반각)
 * - 시간 및 타임존 표시
 * - 문자 수 계산
 * - 메모 기능
 * - 날짜 계산기 (날짜 차이, 오늘 기준 계산)
 * 
 * @author QKit Team
 * @version 2.0.0
 */

class QKitSidePanel {
  /**
   * QKit 사이드 패널 클래스 생성자
   * DOM 요소 초기화, 이벤트 리스너 설정, UI 초기화를 수행합니다.
   */
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.initializeUI();
  }

  /**
   * DOM 요소들을 초기화하고 캐시합니다.
   * 성능 향상을 위해 자주 사용되는 요소들을 미리 찾아서 저장합니다.
   */
  initializeElements() {
    this.elements = {
      // 아코디언 버튼과 섹션들
      accordionBtns: [
        { btn: document.getElementById('btn-convert'), section: document.getElementById('section-convert') },
        { btn: document.getElementById('btn-timeurl'), section: document.getElementById('section-timeurl') },
        { btn: document.getElementById('btn-count'), section: document.getElementById('section-count') },
        { btn: document.getElementById('btn-date'), section: document.getElementById('section-date') }
      ],
      
      // 텍스트 변환 관련 요소들
      convertInput: document.getElementById('convert-input'),
      convertResult: document.getElementById('convert-result'),
      fullToHalfBtn: document.getElementById('full-to-half'),
      halfToFullBtn: document.getElementById('half-to-full'),
      
      // 시간 및 타임존 관련 요소들
      timezoneSelect: document.getElementById('timezone-select'),
      currentTime: document.getElementById('current-time'),
      todayTimezoneInfo: document.getElementById('today-timezone-info'),
      
      // 문자 수 계산 관련 요소들
      countInput: document.getElementById('count-input'),
      charsWithSpace: document.getElementById('chars-with-space'),
      charsNoSpace: document.getElementById('chars-no-space'),
      byteCount: document.getElementById('byte-count'),
      
      // 메모 관련 요소들
      memoText: document.getElementById('memo-text'),
      memoCount: document.getElementById('memo-count'),
      
      // 날짜 계산기 관련 요소들
      addDaysInput: document.getElementById('add-days-input'),
      addDaysBtn: document.getElementById('add-days-btn'),
      addDaysResult: document.getElementById('add-days-result'),
      date1: document.getElementById('date1'),
      date2: document.getElementById('date2'),
      dateDiffBtn: document.getElementById('date-diff-btn'),
      dateDiffResult: document.getElementById('date-diff-result')
    };
  }

  /**
   * 모든 이벤트 리스너를 설정합니다.
   * 각 기능별로 분리된 메서드들을 호출하여 코드의 가독성을 높입니다.
   */
  setupEventListeners() {
    this.setupAccordionListeners();
    this.setupTextConversionListeners();
    this.setupTimeListeners();
    this.setupCharacterCountListeners();
    this.setupMemoListeners();
    this.setupDateCalculatorListeners();
  }

  /**
   * UI 초기 상태를 설정합니다.
   * 아코디언, 날짜 입력 필드, 시간 업데이트를 초기화합니다.
   */
  initializeUI() {
    this.initializeAccordion();
    this.initializeDateInputs();
    this.startTimeUpdates();
  }

  // ==================== 아코디언 기능 ====================

  /**
   * 아코디언 버튼들의 클릭 이벤트 리스너를 설정합니다.
   */
  setupAccordionListeners() {
    this.elements.accordionBtns.forEach(({btn, section}) => {
      btn.addEventListener('click', () => this.toggleAccordionSection(btn, section));
    });
  }

  /**
   * 아코디언의 초기 상태를 설정합니다.
   * 첫 번째 탭(Convert)을 기본적으로 활성화합니다.
   */
  initializeAccordion() {
    this.elements.accordionBtns.forEach(({btn, section}, index) => {
      if (index === 0) {
        btn.classList.add('active');
        section.style.display = 'block';
      } else {
        btn.classList.remove('active');
        section.style.display = 'none';
      }
    });
  }

  /**
   * 아코디언 섹션을 토글합니다.
   * @param {HTMLElement} btn - 클릭된 버튼 요소
   * @param {HTMLElement} section - 토글할 섹션 요소
   */
  toggleAccordionSection(btn, section) {
    const isActive = btn.classList.contains('active');
    
    if (isActive) {
      btn.classList.remove('active');
      section.style.display = 'none';
    } else {
      btn.classList.add('active');
      section.style.display = 'block';
    }
  }

  // ==================== 텍스트 변환 기능 ====================

  /**
   * 텍스트 변환 버튼들의 이벤트 리스너를 설정합니다.
   * 전각/반각 변환 기능을 제공합니다.
   */
  setupTextConversionListeners() {
    this.elements.fullToHalfBtn.addEventListener('click', () => {
      const result = toHalfWidth(this.elements.convertInput.value);
      this.elements.convertResult.value = result;
    });

    this.elements.halfToFullBtn.addEventListener('click', () => {
      const result = toFullWidth(this.elements.convertInput.value);
      this.elements.convertResult.value = result;
    });
  }

  // ==================== 시간 및 타임존 기능 ====================

  /**
   * 시간 관련 이벤트 리스너를 설정합니다.
   * 타임존 변경 시 정보를 업데이트합니다.
   */
  setupTimeListeners() {
    this.elements.timezoneSelect.addEventListener('change', () => {
      this.updateTodayTimezoneInfo();
    });
  }

  /**
   * 시간 업데이트를 시작합니다.
   * 1초마다 현재 시간을 업데이트하고 타임존 정보를 표시합니다.
   */
  startTimeUpdates() {
    this.updateTime();
    this.updateTodayTimezoneInfo();
    setInterval(() => this.updateTime(), 1000);
  }

  /**
   * 현재 시간을 업데이트합니다.
   * 선택된 타임존에 따라 시간을 포맷하여 표시합니다.
   */
  updateTime() {
    const timezone = this.elements.timezoneSelect.value;
    const now = new Date();
    const formattedTime = this.formatTimeForTimezone(now, timezone);
    this.elements.currentTime.textContent = formattedTime;
  }

  /**
   * 지정된 타임존에 맞게 시간을 포맷합니다.
   * @param {Date} date - 포맷할 날짜 객체
   * @param {string} timezone - 타임존 문자열
   * @returns {string} 포맷된 시간 문자열
   */
  formatTimeForTimezone(date, timezone) {
    const pad = n => n.toString().padStart(2, '0');
    const format = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

    let displayTime, timezoneLabel = '', utcOffset = '';

    if (timezone === 'local') {
      displayTime = format(date);
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const hours = Math.abs(Math.floor(offset / 60));
      const minutes = Math.abs(offset % 60);
      utcOffset = ` (UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')})`;
    } else if (timezone === 'UTC') {
      const utcTime = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      displayTime = format(utcTime);
      timezoneLabel = ' UTC';
      utcOffset = ' (UTC+00:00)';
    } else {
      const offset = parseInt(timezone.replace('UTC', ''));
      const utcTime = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      const targetTime = new Date(utcTime.getTime() + offset * 60 * 60 * 1000);
      displayTime = format(targetTime);
      timezoneLabel = ` ${timezone}`;
      const sign = offset >= 0 ? '+' : '-';
      const hours = Math.abs(offset);
      utcOffset = ` (UTC${sign}${hours.toString().padStart(2, '0')}:00)`;
    }

    return displayTime + timezoneLabel + utcOffset;
  }

  /**
   * 오늘 날짜의 타임존 정보를 업데이트합니다.
   * 선택된 타임존에 대한 설명을 표시합니다.
   */
  updateTodayTimezoneInfo() {
    const timezone = this.elements.timezoneSelect.value;
    let timezoneText = '';

    if (timezone === 'local') {
      const now = new Date();
      const offset = -now.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const hours = Math.abs(Math.floor(offset / 60));
      const minutes = Math.abs(offset % 60);
      timezoneText = `Today is based on local timezone (UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')})`;
    } else if (timezone === 'UTC') {
      timezoneText = 'Today is based on UTC timezone (UTC+00:00)';
    } else {
      const offset = parseInt(timezone.replace('UTC', ''));
      const sign = offset >= 0 ? '+' : '-';
      const hours = Math.abs(offset);
      timezoneText = `Today is based on ${timezone} timezone (UTC${sign}${hours.toString().padStart(2, '0')}:00)`;
    }

    this.elements.todayTimezoneInfo.textContent = timezoneText;
  }

  // ==================== 문자 수 계산 기능 ====================

  /**
   * 문자 수 계산 입력 필드의 이벤트 리스너를 설정합니다.
   * 실시간으로 문자 수, 바이트 수를 계산하여 표시합니다.
   */
  setupCharacterCountListeners() {
    this.elements.countInput.addEventListener('input', () => {
      const text = this.elements.countInput.value;
      this.elements.charsWithSpace.textContent = countCharsWithSpace(text);
      this.elements.charsNoSpace.textContent = countCharsNoSpace(text);
      this.elements.byteCount.textContent = countBytes(text);
    });
  }

  // ==================== 메모 기능 ====================

  /**
   * 메모 입력 필드의 이벤트 리스너를 설정합니다.
   * 문자 수를 실시간으로 계산하고 색상을 업데이트합니다.
   */
  setupMemoListeners() {
    this.elements.memoText.addEventListener('input', () => {
      const count = this.elements.memoText.value.length;
      this.elements.memoCount.textContent = count;
      this.updateMemoCountColor(count);
    });
  }

  /**
   * 메모 문자 수에 따라 색상을 업데이트합니다.
   * @param {number} count - 현재 문자 수
   */
  updateMemoCountColor(count) {
    const countElement = this.elements.memoCount;
    if (count > 900) {
      countElement.style.color = '#dc2626'; // 빨간색 (1000자 초과)
    } else if (count > 800) {
      countElement.style.color = '#ea580c'; // 주황색 (800자 초과)
    } else {
      countElement.style.color = '#6b7280'; // 회색 (기본)
    }
  }

  // ==================== 날짜 계산기 기능 ====================

  /**
   * 날짜 계산기 관련 이벤트 리스너를 설정합니다.
   * 오늘 기준 날짜 계산과 날짜 차이 계산 기능을 제공합니다.
   */
  setupDateCalculatorListeners() {
    // 오늘 기준 날짜 계산
    this.elements.addDaysBtn.addEventListener('click', () => {
      const days = parseInt(this.elements.addDaysInput.value) || 0;
      const timezone = this.elements.timezoneSelect.value;
      const result = calcDateFromToday(days, timezone);
      this.elements.addDaysResult.textContent = result;
    });

    // 날짜 차이 계산
    this.elements.dateDiffBtn.addEventListener('click', () => {
      const date1 = this.elements.date1.value;
      const date2 = this.elements.date2.value;
      
      if (date1 && date2) {
        const result = dateDiff(date1, date2);
        this.elements.dateDiffResult.textContent = result;
      } else {
        this.elements.dateDiffResult.textContent = 'Please select both dates';
      }
    });
  }

  /**
   * 날짜 입력 필드들을 초기화합니다.
   * localStorage에서 저장된 날짜를 불러오고, 이벤트 리스너를 설정합니다.
   */
  initializeDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    
    // localStorage에서 이전에 선택한 날짜들을 불러오기
    const savedDate1 = localStorage.getItem('qkit_date1');
    const savedDate2 = localStorage.getItem('qkit_date2');
    
    // 저장된 날짜가 있으면 사용하고, 없으면 오늘 날짜 사용
    this.elements.date1.value = savedDate1 || today;
    this.elements.date2.value = savedDate2 || today;
    
    // 날짜 변경 시 localStorage에 저장하고 자동 검증하는 이벤트 리스너 추가
    this.elements.date1.addEventListener('change', () => {
      localStorage.setItem('qkit_date1', this.elements.date1.value);
      this.updateEndDateMinValue(); // end date 최소값 업데이트
      this.validateDateOrder();
    });
    
    this.elements.date2.addEventListener('change', () => {
      localStorage.setItem('qkit_date2', this.elements.date2.value);
      this.validateDateOrder();
    });
    
    // 초기 end date 최소값 설정
    this.updateEndDateMinValue();
    
    // 초기 날짜 차이 계산 실행
    setTimeout(() => {
      this.elements.dateDiffBtn.click();
    }, 100);
  }

  /**
   * 날짜 순서를 자동으로 검증하고 수정합니다.
   * end date가 start date보다 작으면 start date로 자동 설정합니다.
   */
  validateDateOrder() {
    const date1 = this.elements.date1.value;
    const date2 = this.elements.date2.value;
    
    if (date1 && date2) {
      const startDate = new Date(date1);
      const endDate = new Date(date2);
      
      // end date가 start date보다 작으면 start date로 설정
      if (endDate < startDate) {
        this.elements.date2.value = date1;
        localStorage.setItem('qkit_date2', date1);
        
        // 사용자에게 시각적 피드백 제공
        this.showDateOrderNotification();
        
        // 자동으로 날짜 차이 계산 실행
        setTimeout(() => {
          this.elements.dateDiffBtn.click();
        }, 100);
      }
    }
  }

  /**
   * 날짜 순서 변경 시 사용자에게 시각적 피드백을 제공합니다.
   * 빨간색 테두리와 배경으로 1.5초간 표시합니다.
   */
  showDateOrderNotification() {
    const date2Element = this.elements.date2;
    const originalBorder = date2Element.style.border;
    const originalBackground = date2Element.style.backgroundColor;
    
    // 시각적 피드백: 빨간색 테두리와 배경
    date2Element.style.border = '2px solid #dc2626';
    date2Element.style.backgroundColor = '#fef2f2';
    
    // 1.5초 후 원래대로 복원
    setTimeout(() => {
      date2Element.style.border = originalBorder;
      date2Element.style.backgroundColor = originalBackground;
    }, 1500);
  }

  /**
   * start date 변경 시 end date의 최소값을 업데이트합니다.
   * end date가 새로운 최소값보다 작으면 자동으로 수정합니다.
   */
  updateEndDateMinValue() {
    const date1 = this.elements.date1.value;
    if (date1) {
      this.elements.date2.min = date1;
      
      // 현재 end date가 새로운 최소값보다 작으면 업데이트
      const currentEndDate = this.elements.date2.value;
      if (currentEndDate && currentEndDate < date1) {
        this.elements.date2.value = date1;
        localStorage.setItem('qkit_date2', date1);
      }
    }
  }
}

// ==================== 애플리케이션 초기화 ====================

/**
 * DOM이 로드되면 QKit 사이드 패널을 초기화합니다.
 */
document.addEventListener('DOMContentLoaded', () => {
  new QKitSidePanel();
});
