/**
 * Sweet Cake Shop - スイートケーキショップ スクリプト
 */

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの制御
    initMobileMenu();
    
    // スライドショーの制御（トップページのみ）
    if (document.querySelector('.slideshow-container')) {
        initSlideshow();
    }
    
    // お問い合わせフォームの制御（お問い合わせページのみ）
    if (document.getElementById('contact-form')) {
        initContactForm();
    }
    
    // スクロールアニメーション
    initScrollAnimation();
});

/**
 * ハンバーガーメニューの初期化
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (!hamburger || !nav) return;
    
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // ハンバーガーアイコンのアニメーション
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // ナビゲーションリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // ウィンドウサイズが変更されたときの処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

/**
 * スライドショーの初期化
 */
function initSlideshow() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (!slides.length) return;
    
    // 最初のスライドを表示
    showSlide(slideIndex);
    
    // 自動スライドショー
    let slideInterval = setInterval(() => {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide(slideIndex);
    }, 5000);
    
    // 前へボタン
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            slideIndex--;
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            showSlide(slideIndex);
            
            // 自動スライドショーを再開
            slideInterval = setInterval(() => {
                slideIndex++;
                if (slideIndex >= slides.length) {
                    slideIndex = 0;
                }
                showSlide(slideIndex);
            }, 5000);
        });
    }
    
    // 次へボタン
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            showSlide(slideIndex);
            
            // 自動スライドショーを再開
            slideInterval = setInterval(() => {
                slideIndex++;
                if (slideIndex >= slides.length) {
                    slideIndex = 0;
                }
                showSlide(slideIndex);
            }, 5000);
        });
    }
    
    // ドットボタン
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(slideInterval);
                slideIndex = index;
                showSlide(slideIndex);
                
                // 自動スライドショーを再開
                slideInterval = setInterval(() => {
                    slideIndex++;
                    if (slideIndex >= slides.length) {
                        slideIndex = 0;
                    }
                    showSlide(slideIndex);
                }, 5000);
            });
        });
    }
    
    // スライドを表示する関数
    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        
        if (dots.length) {
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
        }
        
        slides[n].classList.add('active');
        slides[n].style.opacity = '1';
        
        if (dots.length) {
            dots[n].classList.add('active');
        }
    }
    
    // グローバル関数として公開（HTML内のonclick属性から呼び出せるように）
    window.currentSlide = function(n) {
        clearInterval(slideInterval);
        showSlide(n - 1);
        slideIndex = n - 1;
        
        // 自動スライドショーを再開
        slideInterval = setInterval(() => {
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            showSlide(slideIndex);
        }, 5000);
    };
    
    window.plusSlides = function(n) {
        clearInterval(slideInterval);
        slideIndex += n;
        
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        
        showSlide(slideIndex);
        
        // 自動スライドショーを再開
        slideInterval = setInterval(() => {
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            showSlide(slideIndex);
        }, 5000);
    };
}

/**
 * お問い合わせフォームの初期化
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inquiryType = document.getElementById('inquiry-type');
    const reservationDetails = document.getElementById('reservation-details');
    
    if (!form || !inquiryType || !reservationDetails) return;
    
    // 問い合わせ種別が変更されたときの処理
    inquiryType.addEventListener('change', function() {
        if (this.value === 'cake-order') {
            reservationDetails.style.display = 'block';
            
            // 予約詳細の入力欄を必須にする
            const inputs = reservationDetails.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.setAttribute('required', '');
            });
        } else {
            reservationDetails.style.display = 'none';
            
            // 予約詳細の入力欄を必須から外す
            const inputs = reservationDetails.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.removeAttribute('required');
            });
        }
    });
    
    // フォーム送信時の処理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 実際のフォーム送信処理はサーバーサイドで行うため、ここではデモとしてアラートを表示
        alert('お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。');
        form.reset();
        reservationDetails.style.display = 'none';
    });
}

/**
 * スクロールアニメーションの初期化
 */
function initScrollAnimation() {
    // ヘッダーのスクロール制御
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 要素のフェードインアニメーション
    const fadeElements = document.querySelectorAll('.section-title, .about-content, .gallery-item, .menu-item, .access-content, .contact-content');
    
    // Intersection Observerの設定
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // 監視対象の要素にスタイルを適用し、Observerに登録
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}