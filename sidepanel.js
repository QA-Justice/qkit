// QKit Side Panel JavaScript
// Refactored for better maintainability and readability

class QKitSidePanel {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.initializeUI();
  }

  // Initialize DOM elements
  initializeElements() {
    this.elements = {
      // Accordion buttons and sections
      accordionBtns: [
        { btn: document.getElementById('btn-convert'), section: document.getElementById('section-convert') },
        { btn: document.getElementById('btn-timeurl'), section: document.getElementById('section-timeurl') },
        { btn: document.getElementById('btn-count'), section: document.getElementById('section-count') },
        { btn: document.getElementById('btn-date'), section: document.getElementById('section-date') }
      ],
      
      // Text conversion
      convertInput: document.getElementById('convert-input'),
      convertResult: document.getElementById('convert-result'),
      fullToHalfBtn: document.getElementById('full-to-half'),
      halfToFullBtn: document.getElementById('half-to-full'),
      
      // Time and timezone
      timezoneSelect: document.getElementById('timezone-select'),
      currentTime: document.getElementById('current-time'),
      todayTimezoneInfo: document.getElementById('today-timezone-info'),
      
      // Character count
      countInput: document.getElementById('count-input'),
      charsWithSpace: document.getElementById('chars-with-space'),
      charsNoSpace: document.getElementById('chars-no-space'),
      byteCount: document.getElementById('byte-count'),
      
      // Memo
      memoText: document.getElementById('memo-text'),
      memoCount: document.getElementById('memo-count'),
      
      // Date calculator
      addDaysInput: document.getElementById('add-days-input'),
      addDaysBtn: document.getElementById('add-days-btn'),
      addDaysResult: document.getElementById('add-days-result'),
      date1: document.getElementById('date1'),
      date2: document.getElementById('date2'),
      dateDiffBtn: document.getElementById('date-diff-btn'),
      dateDiffResult: document.getElementById('date-diff-result')
    };
  }

  // Setup all event listeners
  setupEventListeners() {
    this.setupAccordionListeners();
    this.setupTextConversionListeners();
    this.setupTimeListeners();
    this.setupCharacterCountListeners();
    this.setupMemoListeners();
    this.setupDateCalculatorListeners();
  }

  // Initialize UI state
  initializeUI() {
    this.initializeAccordion();
    this.initializeDateInputs();
    this.startTimeUpdates();
  }

  // Accordion functionality
  setupAccordionListeners() {
    this.elements.accordionBtns.forEach(({btn, section}) => {
      btn.addEventListener('click', () => this.toggleAccordionSection(btn, section));
    });
  }

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

  // Text conversion functionality
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

  // Time functionality
  setupTimeListeners() {
    this.elements.timezoneSelect.addEventListener('change', () => {
      this.updateTodayTimezoneInfo();
    });
  }

  startTimeUpdates() {
    this.updateTime();
    this.updateTodayTimezoneInfo();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const timezone = this.elements.timezoneSelect.value;
    const now = new Date();
    const formattedTime = this.formatTimeForTimezone(now, timezone);
    this.elements.currentTime.textContent = formattedTime;
  }

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

  // Character count functionality
  setupCharacterCountListeners() {
    this.elements.countInput.addEventListener('input', () => {
      const text = this.elements.countInput.value;
      this.elements.charsWithSpace.textContent = countCharsWithSpace(text);
      this.elements.charsNoSpace.textContent = countCharsNoSpace(text);
      this.elements.byteCount.textContent = countBytes(text);
    });
  }

  // Memo functionality
  setupMemoListeners() {
    this.elements.memoText.addEventListener('input', () => {
      const count = this.elements.memoText.value.length;
      this.elements.memoCount.textContent = count;
      this.updateMemoCountColor(count);
    });
  }

  updateMemoCountColor(count) {
    const countElement = this.elements.memoCount;
    if (count > 900) {
      countElement.style.color = '#dc2626'; // Red
    } else if (count > 800) {
      countElement.style.color = '#ea580c'; // Orange
    } else {
      countElement.style.color = '#6b7280'; // Gray
    }
  }

  // Date calculator functionality
  setupDateCalculatorListeners() {
    this.elements.addDaysBtn.addEventListener('click', () => {
      const days = parseInt(this.elements.addDaysInput.value) || 0;
      const timezone = this.elements.timezoneSelect.value;
      const result = calcDateFromToday(days, timezone);
      this.elements.addDaysResult.textContent = result;
    });

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

  initializeDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    this.elements.date1.value = today;
    this.elements.date2.value = today;
    
    // Trigger initial date calculation
    setTimeout(() => {
      this.elements.dateDiffBtn.click();
    }, 100);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QKitSidePanel();
});
