// QKit Background Script
// Refactored for better maintainability and readability

/**
 * QKit Chrome 확장 프로그램의 백그라운드 서비스 워커
 */
class QKitBackground {
  constructor() {
    this.initializeEventListeners();
  }

  /**
   * 모든 이벤트 리스너 초기화
   */
  initializeEventListeners() {
    // 확장 프로그램 아이콘 클릭 처리
    chrome.action.onClicked.addListener(this.handleIconClick.bind(this));
    
    // 확장 프로그램 설치 처리
    chrome.runtime.onInstalled.addListener(this.handleInstallation.bind(this));
  }

  /**
   * 확장 프로그램 아이콘 클릭 처리
   * @param {chrome.tabs.Tab} tab - 활성 탭
   */
  async handleIconClick(tab) {
    try {
      await this.openSidePanel(tab);
      await this.configureSidePanel(tab);
    } catch (error) {
      console.error('Failed to open side panel:', error);
    }
  }

  /**
   * 확장 프로그램 설치 처리
   */
  async handleInstallation() {
    try {
      await this.setupSidePanelBehavior();
    } catch (error) {
      console.error('Failed to setup side panel behavior:', error);
    }
  }

  /**
   * 사이드 패널 열기
   * @param {chrome.tabs.Tab} tab - 활성 탭
   */
  async openSidePanel(tab) {
    await chrome.sidePanel.open({ windowId: tab.windowId });
  }

  /**
   * 사이드 패널 옵션 설정
   * @param {chrome.tabs.Tab} tab - 활성 탭
   */
  async configureSidePanel(tab) {
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: 'sidepanel.html',
      enabled: true
    });
  }

  /**
   * 모든 탭에 대한 사이드 패널 동작 설정
   */
  async setupSidePanelBehavior() {
    await chrome.sidePanel.setPanelBehavior({ 
      openPanelOnActionClick: true 
    });
  }
}

// 백그라운드 서비스 워커 초기화
new QKitBackground(); 