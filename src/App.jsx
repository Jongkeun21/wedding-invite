import { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Sparkles } from 'lucide-react';

import cloudBg from './assets/cloud1.jpeg';
import cursorImg from './assets/sunny_sonny.png';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [currentPage, setCurrentPage] = useState(0);
  
  const totalPages = 4;

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  // 포스트잇 느낌을 위해 짧은 스와이프로도 잘 넘어가도록 설정
  const minSwipeDistance = 30;

  // 전체 뒷배경으로 깔릴 구름 이미지
  const toyStoryCloudBgUrl = cloudBg; 
  const cursorImageUrl = cursorImg; 

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 마우스 휠 스크롤 감지
  useEffect(() => {
    let timeoutId;
    const handleWheel = (e) => {
      if (timeoutId) return;
      // 휠을 내리면(양수) 다음장(뜯어짐), 올리면(음수) 이전장(돌아옴)
      if (e.deltaY > 30 && currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1);
        timeoutId = setTimeout(() => { timeoutId = null; }, 500);
      } else if (e.deltaY < -30 && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
        timeoutId = setTimeout(() => { timeoutId = null; }, 500);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPage]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    
    // distance > 0 이면 손가락을 위로 쓸어올림 (스크롤 다운 -> 다음 장)
    const isUpSwipe = distance > minSwipeDistance;
    // distance < 0 이면 손가락을 아래로 쓸어내림 (스크롤 업 -> 이전 장)
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
    if (isDownSwipe && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // 포스트잇의 색상과 비스듬한 각도를 데이터로 관리
  const pages = [
    {
      id: 0,
      rotation: -1.5,
      bg: '#fdfbfb', 
      content: (
        <section className={`invitation-card animate-fade-in`}>
          <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>
            <Heart size={32} fill="currentColor" strokeWidth={1} />
          </div>
          <h2 className="names-title">이종근 & 김현선</h2>
          <div className="divider"></div>
          <p className="wedding-date">2026. 07. 19. SUN 13:00 PM</p>
          <p className="wedding-date" style={{ fontSize: '0.95rem' }}>서울대학교 연구공원 웨딩홀</p>
        </section>
      )
    },
    {
      id: 1,
      rotation: 2,
      bg: '#fff0f5', // soft pink
      content: (
        <section className={`invitation-card`}>
          <h3 className="section-title">초대합니다</h3>
          <p className="greeting-text">
            안녕안녕
          </p>
        </section>
      )
    },
    {
      id: 2,
      rotation: -2,
      bg: '#e0ffff', // soft blue
      content: (
        <section className={`invitation-card`}>
          <h3 className="section-title">오시는 길</h3>
          <div className="info-item">
            <Calendar size={24} color="var(--accent-color)" />
            <strong>일시</strong>
            <span>2026년 7월 19일 일요일, 오후 13시</span>
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--surface-border)', margin: '16px 0' }}></div>
          <div className="info-item">
            <MapPin size={24} color="var(--accent-color)" />
            <strong>장소</strong>
            <span>서울대학교 연구공원 웨딩홀</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>서울시 강남구 테헤란로 123</span>
          </div>
        </section>
      )
    },
    {
      id: 3,
      rotation: 1.5,
      bg: '#fcfce3', // soft yellow (post-it)
      content: (
        <section className={`invitation-card`}>
          <h3 className="section-title">약도</h3>
          <div style={{ 
            marginTop: '10px', 
            width: '100%', 
            height: '300px', 
            backgroundColor: 'rgba(0,0,0,0.05)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            fontWeight: 500
          }}>
            지도 영역
          </div>
        </section>
      )
    }
  ];

  return (
    <div 
      className="mobile-app-container" 
      style={{ backgroundImage: toyStoryCloudBgUrl ? `url(${toyStoryCloudBgUrl})` : 'none' }}
    >
      <div 
        className="cursor-follower" 
        style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }}
      >
        {cursorImageUrl ? (
          <img src={cursorImageUrl} alt="custom cursor" />
        ) : (
          <Sparkles size={24} color="var(--accent-color)" fill="white" />
        )}
      </div>

      {/* 포스트잇 더미 영역 */}
      <div 
        className="postit-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        {pages.map((page, index) => {
          let pageClass = 'postit-card';
          if (index < currentPage) pageClass += ' torn-off';
          else if (index === currentPage) pageClass += ' active-page';
          else pageClass += ' next-page';

          const zIndex = totalPages - index;

          return (
            <div 
              key={page.id} 
              className={pageClass} 
              style={{ 
                backgroundColor: page.bg,
                zIndex: zIndex,
                '--page-rot': `${page.rotation}deg`
              }}
            >
              {/* 3D CSS 압정 디테일 */}
              <div className="postit-pin">
                <div className="postit-pin-shadow"></div>
                <div className="postit-pin-head"></div>
                <div className="postit-pin-base"></div>
                <div className="postit-pin-needle"></div>
              </div>
              
              <div className="page-content-wrapper">
                {page.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
