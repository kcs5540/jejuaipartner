/* ==========================================================================
   제주AI파트너스 (Jeju AI Partners) - Interactive JavaScript Application
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollSpy();
  calculateSavings();
  initHeroCarousel();
  updateThemeIcons();
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

/* ==================== 3D IMAGE CAROUSEL HERO ==================== */
function initHeroCarousel() {
  const container = document.getElementById('hero-carousel-container');
  if (!container) return;

  const images = [
    { id: "1", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", alt: "제주 푸른 바다", rotation: -15 },
    { id: "2", src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", alt: "노형동 흑돼지", rotation: -8 },
    { id: "3", src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80", alt: "애월 감성 펜션", rotation: 5 },
    { id: "4", src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80", alt: "서귀포 힐링 스파", rotation: 12 },
    { id: "5", src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80", alt: "승마 & 카트", rotation: -12 },
    { id: "6", src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80", alt: "노형 카페 몽상", rotation: 8 },
    { id: "7", src: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80", alt: "반려동물 동반", rotation: -6 },
    { id: "8", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80", alt: "셀프 데이터 허브", rotation: 10 }
  ];

  let currentAngles = images.map((_, i) => i * (360 / images.length));
  let mousePos = { x: 0, y: 0 };

  // Render Card Elements inside 3D container
  container.innerHTML = images.map((img, idx) => `
    <div id="carousel-card-${idx}" class="carousel-card-item absolute w-28 h-36 sm:w-40 sm:h-52 cursor-pointer group rounded-2xl overflow-hidden shadow-2xl border border-sky-400/40 bg-slate-900 flex flex-col justify-between" onclick="openPortfolioModal('${img.alt}')">
      <img src="${img.src}" alt="${img.alt}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2 sm:p-3 pointer-events-none">
        <span class="bg-sky-500/90 text-white font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-md w-fit shadow">${img.alt}</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  `).join('');

  // Mouse tilt handlers for 3D perspective effect
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mousePos.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mousePos.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const handleMouseLeave = () => {
    mousePos.x = 0;
    mousePos.y = 0;
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  // Continuous rotation animation loop
  const animate = () => {
    const isMobile = window.innerWidth < 640;
    const radius = isMobile ? 120 : 210;

    images.forEach((img, i) => {
      currentAngles[i] = (currentAngles[i] + 0.35) % 360;
      const rad = currentAngles[i] * (Math.PI / 180);
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;

      const perspectiveX = mousePos.x * 16;
      const perspectiveY = mousePos.y * -16;

      const cardEl = document.getElementById(`carousel-card-${i}`);
      if (cardEl) {
        cardEl.style.transform = `translate(${x}px, ${y}px) rotateX(${perspectiveY}deg) rotateY(${perspectiveX}deg) rotateZ(${img.rotation}deg)`;
      }
    });

    requestAnimationFrame(animate);
  };

  animate();
}

function openPortfolioModal(title) {
  const modal = document.getElementById('website-modal');
  if (modal) {
    openWebsiteModal(title + ' 포트폴리오 사례', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', '조회수/예약률 +50% 상승', '100% 모바일 SPA • AI 카피라이팅');
  }
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
/* ==================== RESERVATION FORM SUBMISSION ==================== */
async function handleReservationSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const storeName = document.getElementById('res-store-name')?.value || '';
  const ownerName = document.getElementById('res-owner-name')?.value || '';
  const phone = document.getElementById('res-phone')?.value || '';
  const service = document.getElementById('form-package-select')?.value || '';
  const date = document.getElementById('res-date')?.value || '미정';
  const method = document.getElementById('res-method')?.value || '전화 상담';
  const memo = document.getElementById('res-memo')?.value || '없음';

  // 1. Prepare formatted message for clipboard & email
  const formattedText = `[제주AI파트너스 상담 신청서]\n• 상호명: ${storeName}\n• 성함: ${ownerName}\n• 연락처: ${phone}\n• 희망서비스: ${service}\n• 상담날짜: ${date}\n• 상담방식: ${method}\n• 문의내용: ${memo}`;

  // 2. Copy to clipboard for easy KakaoTalk pasting
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(formattedText);
    }
  } catch (err) {
    console.log('Clipboard copy fallback:', err);
  }

  // 3. Send email to csjeju21@gmail.com via FormSubmit AJAX API
  fetch('https://formsubmit.co/ajax/csjeju21@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: `[제주AI파트너스] ${storeName} 사장님의 신규 상담 신청 접수!`,
      상호명: storeName,
      대표자명: ownerName,
      연락처: phone,
      희망서비스: service,
      희망상담일: date,
      상담방식: method,
      문의내용: memo
    })
  }).catch(e => console.log('Email send notification:', e));

  // 4. Show friendly alert & open Kakao Open Chat
  alert(`🎉 상담 및 방문 예약이 정상 접수되었습니다!\n\n• 신청서가 김철수 대표 이메일(csjeju21@gmail.com)로 즉시 전송되었습니다.\n• 신청 내용이 클립보드에 자동 복사되었습니다. 카카오톡 창이 열리면 [붙여넣기]만 누르시면 바로 1:1 상담도 가능합니다.`);
  window.open('https://open.kakao.com/o/s7J7jYEi', '_blank');
  form.reset();
}

async function handleModalConsultingSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const storeName = document.getElementById('modal-store-name')?.value || '';
  const phone = document.getElementById('modal-phone')?.value || '';
  const issue = document.getElementById('modal-issue')?.value || '';

  // 1. Formatted Text
  const formattedText = `[제주AI파트너스 무료 컨설팅 신청]\n• 상호명: ${storeName}\n• 연락처: ${phone}\n• 고민부분: ${issue}`;

  // 2. Clipboard auto copy
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(formattedText);
    }
  } catch (err) {
    console.log('Clipboard copy fallback:', err);
  }

  // 3. Send email to csjeju21@gmail.com via FormSubmit AJAX API
  fetch('https://formsubmit.co/ajax/csjeju21@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: `[제주AI파트너스 컨설팅] ${storeName} 사장님의 컨설팅 신청!`,
      상호명: storeName,
      연락처: phone,
      고민부분: issue
    })
  }).catch(e => console.log('Email send notification:', e));

  closeConsultingModal();
  alert(`🎉 무료 마케팅 컨설팅 신청이 접수되었습니다!\n\n• 김철수 대표 이메일(csjeju21@gmail.com)로 신청 내용이 전송되었습니다.\n• 신청 내용이 복사되었습니다. 카카오톡 대화창에서 [붙여넣기]를 하시면 더욱 빠른 1:1 상담이 가능합니다.`);
  window.open('https://open.kakao.com/o/s7J7jYEi', '_blank');
  form.reset();
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

/* ==================== THEME MANAGER (DARK / LIGHT MODE) ==================== */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  if (isLight) {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    showToast('밝은 화면 모드로 전환되었습니다.');
  } else {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
    showToast('어두운 화면 모드로 전환되었습니다.');
  }
  updateThemeIcons();
}

function updateThemeIcons() {
  const isLight = document.body.classList.contains('light-theme');
  const desktopIcon = document.getElementById('theme-toggle-icon');
  const mobileIcon = document.getElementById('theme-toggle-icon-mobile');
  
  const iconClass = isLight ? 'fa-solid fa-sun text-amber-500 hover:text-amber-600 text-lg' : 'fa-solid fa-moon text-slate-300 hover:text-amber-400 text-lg';
  
  if (desktopIcon) desktopIcon.className = iconClass;
  if (mobileIcon) mobileIcon.className = iconClass;
}
