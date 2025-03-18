/**
 * NOIR - モダンバー＆ラウンジ
 * メインJavaScriptファイル
 */

document.addEventListener('DOMContentLoaded', function() {
    // ヘッダースクロール効果
    initHeaderScroll();
    
    // ヒーロースライダー
    initHeroSlider();
    
    // スムーズスクロール
    initSmoothScroll();
    
    // FAQアコーディオン
    initFaqAccordion();
    
    // メニューナビゲーション
    initMenuNavigation();
    
    // フォームバリデーション
    initFormValidation();
    
    // ハンバーガーメニュー
    initHamburgerMenu();
});

/**
 * スクロール時のヘッダー背景変更
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        }
    });
}

/**
 * ヒーロースライダーの初期化と制御
 */
function initHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider');
    
    if (!heroSlider) return;
    
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    let currentSlide = 0;
    let slideInterval;
    
    // 自動スライド切り替え
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // 次のスライドへ
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }
    
    // 前のスライドへ
    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }
    
    // 特定のスライドへ移動
    function goToSlide(n) {
        // 現在のスライドとインジケーターからアクティブクラスを削除
        slides[currentSlide].classList.remove('active');
        if (indicators.length > 0) {
            indicators[currentSlide].classList.remove('active');
        }
        
        // 新しいスライドとインジケーターにアクティブクラスを追加
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        if (indicators.length > 0) {
            indicators[currentSlide].classList.add('active');
        }
    }
    
    // イベントリスナーの設定
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            startSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            startSlideInterval();
        });
    }
    
    // インジケーターのクリックイベント
    indicators.forEach(function(indicator, index) {
        indicator.addEventListener('click', function() {
            clearInterval(slideInterval);
            goToSlide(index);
            startSlideInterval();
        });
    });
    
    // スライダーの初期化
    startSlideInterval();
}

/**
 * スムーズスクロール機能
 */
function initSmoothScroll() {
    // 内部リンクのスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * FAQアコーディオン機能
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // 他のアイテムを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                }
            });
            
            // 現在のアイテムの状態を切り替え
            item.classList.toggle('active');
            
            // アイコンを切り替え
            if (toggle) {
                const icon = toggle.querySelector('i');
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            }
        });
    });
}

/**
 * メニューページのナビゲーション
 */
function initMenuNavigation() {
    const menuNav = document.querySelector('.menu-nav');
    
    if (!menuNav) return;
    
    const menuLinks = menuNav.querySelectorAll('a');
    const sections = document.querySelectorAll('.menu-section');
    
    // スクロール時のアクティブセクション検出
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight + menuNav.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // メニューリンクのクリックイベント
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('header').offsetHeight + menuNav.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * フォームバリデーション
 */
function initFormValidation() {
    const reservationForm = document.querySelector('form[action="#"]');
    const contactForm = document.getElementById('contactForm');
    
    // 予約フォームのバリデーション
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡易的なバリデーション（実際のプロジェクトではより詳細なバリデーションが必要）
            let isValid = true;
            const requiredFields = reservationForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--color-red)';
                } else {
                    field.style.borderColor = 'var(--color-light-gray)';
                }
            });
            
            if (isValid) {
                // 実際のプロジェクトではここでフォームデータを送信
                alert('ご予約ありがとうございます。確認のメールをお送りいたします。');
                reservationForm.reset();
            } else {
                alert('すべての必須項目をご入力ください。');
            }
        });
    }
    
    // お問い合わせフォームのバリデーション
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡易的なバリデーション
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--color-red)';
                } else {
                    field.style.borderColor = 'var(--color-light-gray)';
                }
            });
            
            // メールアドレスの簡易バリデーション
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && !validateEmail(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = 'var(--color-red)';
            }
            
            if (isValid) {
                // 実際のプロジェクトではここでフォームデータを送信
                alert('お問い合わせありがとうございます。2営業日以内にご返信いたします。');
                contactForm.reset();
            } else {
                alert('すべての必須項目を正しくご入力ください。');
            }
        });
    }
    
    // メールアドレスのバリデーション
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ニュースレターフォームのバリデーション
    const newsletterForm = document.querySelector('.newsletter-form form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && validateEmail(emailInput.value)) {
                alert('ニュースレターにご登録いただきありがとうございます。');
                this.reset();
            } else {
                alert('有効なメールアドレスを入力してください。');
            }
        });
    }
}

/**
 * パララックス効果（オプション）
 * 注: モバイルデバイスではパフォーマンスの問題があるため、
 * CSSの background-attachment: fixed を使用しています。
 * より高度なパララックス効果が必要な場合は、
 * 専用のライブラリ（例: rellax.js）の使用を検討してください。
 */
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    if (parallaxSections.length === 0) return;
    
    // モバイルデバイスの検出
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) return; // モバイルデバイスではパララックス効果を無効化
    
    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // セクションが表示領域内にある場合のみ処理
            if (scrollPosition + window.innerHeight > sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                
                const yPos = (scrollPosition - sectionTop) * 0.5;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
}

/**
 * 360度パノラマビュー（オプション）
 * 注: 実際のプロジェクトでは、専用のライブラリ（例: Pannellum）を使用して
 * 360度ビューを実装することをお勧めします。
 */
function init360View() {
    const panoramaButton = document.querySelector('.panorama-button');
    
    if (!panoramaButton) return;
    
    panoramaButton.addEventListener('click', function() {
        // 実際のプロジェクトでは、ここで360度ビューを表示するモーダルを開く
        alert('360度ビューは準備中です。実際のプロジェクトでは、ここでパノラマビューアーを表示します。');
    });
}

/**
 * ハンバーガーメニューの初期化と制御
 */
function initHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (!hamburgerMenu || !nav) return;
    
    // オーバーレイ要素の作成
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);
    
    // ハンバーガーメニューのクリックイベント
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // オーバーレイのクリックイベント
    overlay.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });
    
    // ナビゲーションリンクのクリックイベント
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerMenu.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// ページ読み込み完了時に追加の初期化
window.addEventListener('load', function() {
    // パララックス効果の初期化（オプション）
    initParallax();
    
    // 360度ビューの初期化（オプション）
    init360View();
    
    // ページ読み込み完了時のローディングアニメーション（オプション）
    document.body.classList.add('loaded');
});