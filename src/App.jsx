import { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Sparkles } from 'lucide-react';

// import cloudBg from './assets/cloud1.jpeg';
import cloudBg from './assets/cloud2.png';
import cursorImg from './assets/sunny_sonny.png';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Background image URL for the Toy Story clouds
  const toyStoryCloudBgUrl = cloudBg; 
  
  // Custom cursor image URL (.png, .gif, .jpg)
  // 비워두시면 기본 반짝이 아이콘이 표시되고, 이미지 URL이나 import한 변수를 넣으면 해당 이미지로 교체됩니다.
  const cursorImageUrl = cursorImg; 
  // e.g., 'https://example.com/custom-cursor.gif' or import myIcon from './assets/icon.png'

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // 모바일(터치 기기)에서는 방해되지 않도록 마우스(포인터)가 있는 기기에서만 작동
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerStyle = {
    backgroundImage: toyStoryCloudBgUrl ? `url(${toyStoryCloudBgUrl})` : 'none',
  };

  return (
    <div className="mobile-app-container" style={containerStyle}>
      {/* 마우스 커서를 쫓아다니는 아이콘 (커스텀 이미지 또는 기본 반짝이) */}
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

      {/* Decorative background clouds if no image is present (just for cute placeholder effect) */}
      {!toyStoryCloudBgUrl && (
        <>
          <div className="cloud-decorator" style={{ width: 120, height: 40, top: '10%', left: '10%' }}></div>
          <div className="cloud-decorator" style={{ width: 180, height: 60, top: '25%', right: '-10%' }}></div>
          <div className="cloud-decorator" style={{ width: 100, height: 35, top: '45%', left: '5%' }}></div>
          <div className="cloud-decorator" style={{ width: 150, height: 50, top: '70%', right: '15%' }}></div>
        </>
      )}

      {/* Main Scrollable Content */}
      <main className="content-area">
        
        {/* Cover Section */}
        <section className={`invitation-card glass-panel animate-fade-in`}>
          <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>
            <Heart size={32} fill="currentColor" strokeWidth={1} />
          </div>
          <h2 className="names-title">이종근 & 김현선</h2>
          <div className="divider"></div>
          <p className="wedding-date">2026. 07. 19. SUN 13:00 PM</p>
          <p className="wedding-date" style={{ fontSize: '0.95rem' }}>서울대학교 연구공원 웨딩홀</p>
        </section>

        {/* Greeting Section */}
        <section className={`invitation-card glass-panel animate-fade-in delay-1`}>
          <h3 className="section-title">초대합니다</h3>
          <p className="greeting-text">
            안녕안녕
          </p>
        </section>

        {/* Details Section */}
        <section className={`invitation-card glass-panel animate-fade-in delay-2`}>
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
          
          {/* Map placeholder */}
          <div style={{ 
            marginTop: '20px', 
            width: '100%', 
            height: '200px', 
            backgroundColor: 'rgba(255,255,255,0.25)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)'
          }}>
            지도 영역
          </div>
        </section>

      </main>
    </div>
  );
}
