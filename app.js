/* ==========================================================================
   제주AI파트너스 (Jeju AI Partners) - Interactive JavaScript Application
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollSpy();
  calculateSavings();
});

/* ==================== NAVIGATION & HEADER ==================== */
function initNavigation() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Header background scroll threshold
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('py-2', 'shadow-xl');
    } else {
      header.classList.remove('py-2', 'shadow-xl');
    }
  });
}

/* ScrollSpy for GNB Link Highlight */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==================== ROI / PRICE CALCULATOR ==================== */
function calculateSavings() {
  const select = document.getElementById('calc-count');
  const resultElem = document.getElementById('calc-savings-result');
  if (!select || !resultElem) return;

  const count = parseInt(select.value, 10);
  
  // Traditional agency cost per video: approx 350,000 KRW
  // Jeju AI Partners package average cost per video: approx 72,500 KRW (Monthly package)
  const traditionalCost = count * 350000;
  let ourCost = 100000; // Single default
  
  if (count === 4) {
    ourCost = 290000;
  } else if (count === 8) {
    ourCost = 550000;
  } else if (count === 1) {
    ourCost = 100000;
  }

  const savings = traditionalCost - ourCost;
  resultElem.textContent = `월 약 ${savings.toLocaleString()} 원 절감!`;
}

/* ==================== PORTFOLIO DUAL FILTERING ==================== */
let activeDomain = 'all';
let activeSub = 'all';

function filterPortfolioDomain(domain) {
  activeDomain = domain;
  const tabs = document.querySelectorAll('.domain-tab');
  tabs.forEach(tab => {
    tab.classList.remove('bg-gradient-button', 'text-white');
    tab.classList.add('bg-slate-900');
  });

  if (event && event.target) {
    const btn = event.target.closest('.domain-tab');
    if (btn) {
      btn.classList.remove('bg-slate-900');
      btn.classList.add('bg-gradient-button', 'text-white');
    }
  }

  applyPortfolioFilters();
}

function filterPortfolioSub(sub) {
  activeSub = sub;
  const tabs = document.querySelectorAll('.sub-tab');
  tabs.forEach(tab => {
    tab.classList.remove('bg-slate-800', 'text-white');
    tab.classList.add('bg-slate-900', 'text-slate-400');
  });

  if (event && event.target) {
    const btn = event.target.closest('.sub-tab');
    if (btn) {
      btn.classList.remove('bg-slate-900', 'text-slate-400');
      btn.classList.add('bg-slate-800', 'text-white');
    }
  }

  applyPortfolioFilters();
}

function applyPortfolioFilters() {
  const cards = document.querySelectorAll('.portfolio-card');
  cards.forEach(card => {
    const matchDomain = activeDomain === 'all' || card.classList.contains(activeDomain);
    const matchSub = activeSub === 'all' || card.classList.contains(activeSub);

    if (matchDomain && matchSub) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ==================== SELF DATA HUB FILE UPLOAD ==================== */
function triggerFileUpload() {
  const fileInput = document.getElementById('file-input');
  if (fileInput) fileInput.click();
}

function handleFileSelect(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const fileListContainer = document.getElementById('file-list');
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileElem = document.createElement('div');
    fileElem.className = 'p-3 rounded-xl bg-slate-900/90 border border-sky-500/30 flex items-center justify-between text-xs animate-bounce';
    fileElem.style.animationDuration = '0.5s';
    
    fileElem.innerHTML = `
      <div class="flex items-center gap-3">
        <i class="fa-solid fa-file-image text-sky-400 text-base"></i>
        <div>
          <div class="font-bold text-slate-200">${file.name}</div>
          <div class="text-[10px] text-slate-400">${(file.size / (1024 * 1024)).toFixed(2)} MB • 새로 추가됨</div>
        </div>
      </div>
      <span class="text-emerald-400 font-bold"><i class="fa-solid fa-circle-check"></i> 업로드 완료</span>
    `;

    fileListContainer.appendChild(fileElem);
  }

  showToast('자료가 성공적으로 데이터 허브에 등록되었습니다!');
}

/* ==================== AI ASSISTANT CHATBOT ==================== */
function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');

  if (!input || !input.value.trim() || !chatBox) return;

  const userText = input.value.trim();
  input.value = '';

  // Append user message
  const userMsg = document.createElement('div');
  userMsg.className = 'flex items-start gap-2.5 justify-end';
  userMsg.innerHTML = `
    <div class="bg-sky-600 text-white p-3 rounded-2xl rounded-tr-none leading-relaxed max-w-[85%]">
      ${userText}
    </div>
  `;
  chatBox.appendChild(userMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate AI Response after 700ms
  setTimeout(() => {
    let aiAnswer = '사장님! 문의하신 사항은 제주AI파트너스 AI 엔진이 즉시 대본과 채널 세팅에 반영해 드립니다.';
    
    if (userText.includes('홈페이지') || userText.includes('웹') || userText.includes('사이트')) {
      aiAnswer = '소상공인 전용 홈페이지 제작은 단일 30만 원(VAT 별도)에 100% 모바일 반응형 SPA, SEO 검색등록, 온라인 상담예약, 셀프 데이터 허브까지 일체 포함하여 제작해 드립니다!';
    } else if (userText.includes('샤오홍슈') || userText.includes('중국')) {
      aiAnswer = '중국어 번역 및 샤오홍슈/따종디엔핑 태그 작업은 [월간 숏폼 글로벌 플랜]에서 계정 프로필 세팅부터 100% 자동 대행됩니다!';
    } else if (userText.includes('가격') || userText.includes('비용')) {
      aiAnswer = '소상공인 홈페이지 제작 30만 원(1회), 월간 숏폼 국내 구독 29만 원/월, 글로벌 구독 39만 원/월 등 거품 없는 가격으로 제공됩니다.';
    } else if (userText.includes('시간') || userText.includes('기간')) {
      aiAnswer = '홈페이지 제작은 평균 2~3일 내 완료되며, 숏폼 콘텐츠는 자료 업로드 후 24시간~48시간 이내에 완제품이 채널에 업로드됩니다.';
    }

    const aiMsg = document.createElement('div');
    aiMsg.className = 'flex items-start gap-2.5';
    aiMsg.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs shrink-0">AI</div>
      <div class="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-slate-200 leading-relaxed max-w-[85%]">
        ${aiAnswer}
      </div>
    `;
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 700);
}

/* ==================== MODAL CONTROLLERS ==================== */
function openConsultingModal() {
  document.getElementById('consulting-modal').classList.remove('hidden');
}

function closeConsultingModal() {
  document.getElementById('consulting-modal').classList.add('hidden');
}

function openDiagnosisModal() {
  document.getElementById('diagnosis-modal').classList.remove('hidden');
  document.getElementById('diagnosis-step-1').classList.remove('hidden');
  document.getElementById('diagnosis-step-2').classList.add('hidden');
}

function closeDiagnosisModal() {
  document.getElementById('diagnosis-modal').classList.add('hidden');
}

function nextDiagnosisStep(step) {
  if (step === 2) {
    document.getElementById('diagnosis-step-1').classList.add('hidden');
    document.getElementById('diagnosis-step-2').classList.remove('hidden');
  }
}

function openGuideDownloadModal() {
  document.getElementById('guide-modal').classList.remove('hidden');
}

function closeGuideModal() {
  document.getElementById('guide-modal').classList.add('hidden');
}

function triggerGuideDownload() {
  showToast('서비스 안내서 (Jeju_AI_Partners_Guide.pdf) 다운로드가 시작되었습니다!');
  closeGuideModal();
}

function openVideoModal(title) {
  const modal = document.getElementById('video-modal');
  const modalTitle = document.getElementById('video-modal-title');
  if (modal && modalTitle) {
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
  }
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  if (modal) modal.classList.add('hidden');
}

function openWebsiteModal(title, imgUrl, stats, tech) {
  const modal = document.getElementById('website-modal');
  const modalTitle = document.getElementById('website-modal-title');
  const modalImg = document.getElementById('website-modal-img');
  const modalStats = document.getElementById('website-modal-stats');
  const modalTech = document.getElementById('website-modal-tech');

  if (modal && modalTitle && modalImg) {
    modalTitle.textContent = title;
    modalImg.src = imgUrl;
    if (modalStats) modalStats.textContent = stats;
    if (modalTech) modalTech.textContent = tech;
    modal.classList.remove('hidden');
  }
}

function closeWebsiteModal() {
  const modal = document.getElementById('website-modal');
  if (modal) modal.classList.add('hidden');
}

function selectPackage(packageName) {
  const selectElem = document.getElementById('form-package-select');
  if (selectElem) {
    selectElem.value = packageName;
  }
  // Smooth scroll to reservation form
  document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
  showToast(`'${packageName}' 상품 선택 완료! 아래 Form을 작성해 주세요.`);
}

/* ==================== RESERVATION FORM SUBMISSION ==================== */
function handleReservationSubmit(event) {
  event.preventDefault();
  alert('🎉 상담 및 방문 예약이 정상적으로 접수되었습니다!\n\n제주AI파트너스 (김철수 대표)에서 기재해주신 연락처로 24시간 이내에 친절히 안내드리겠습니다.');
  event.target.reset();
}

function handleModalConsultingSubmit(event) {
  event.preventDefault();
  closeConsultingModal();
  alert('🎉 무료 마케팅 컨설팅 신청이 접수되었습니다! 담당자가 신속히 검토 후 연락드리겠습니다.');
}

/* Helper Toast Notification */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 px-6 py-3 rounded-2xl bg-sky-500 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-sky-300 animate-bounce';
  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

/* ==================== FAQ TOGGLE ==================== */
function toggleFaq(index) {
  const content = document.getElementById(`faq-content-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  
  if (content && icon) {
    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
      content.classList.remove('hidden');
      icon.classList.add('rotate-180');
    } else {
      content.classList.add('hidden');
      icon.classList.remove('rotate-180');
    }
  }
}

/* ==================== FLOATING ACTION HANDLERS ==================== */
function handleKakaoChatClick(event) {
  const kakaoBtn = document.getElementById('btn-kakao-chat');
  const href = kakaoBtn ? kakaoBtn.getAttribute('href') : '';
  if (!href || href === '#' || href === 'javascript:void(0)') {
    event.preventDefault();
    openConsultingModal();
    showToast('카카오톡 1:1 상담 신청 폼이 열렸습니다!');
  }
}

function handlePhoneCallClick(event) {
  const phoneBtn = document.getElementById('btn-phone-call');
  const href = phoneBtn ? phoneBtn.getAttribute('href') : '';
  if (href === 'tel:010-0000-0000' || !href || href === '#') {
    event.preventDefault();
    openConsultingModal();
    showToast('대표 직통 전화 상담 신청 폼으로 연결됩니다.');
  }
}
