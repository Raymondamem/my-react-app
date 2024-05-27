import { useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    const logosSlide = document.querySelector('.logos-slide');
    const copy = logosSlide.cloneNode(true);
    document.querySelector('.logos').appendChild(copy);
    // If additional setup is needed, it can be done here
  }, []);

  return (
    <div className="logos">
      <div className="logos-slide" data-animSpeed="1">
        <img src="/logos/3m.svg" alt="3M Logo" />
        <img src="/logos/barstool-store.svg" alt="Barstool Store Logo" />
        <img src="/logos/budweiser.svg" alt="Budweiser Logo" />
        <img src="/logos/buzzfeed.svg" alt="BuzzFeed Logo" />
        <img src="/logos/forbes.svg" alt="Forbes Logo" />
        <img src="/logos/macys.svg" alt="Macy's Logo" />
        <img src="/logos/menshealth.svg" alt="Men's Health Logo" />
        <img src="/logos/mrbeast.svg" alt="MrBeast Logo" />
      </div>
    </div>
  );
};

export default App;

/* App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #dd7171;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.logos {
  overflow: hidden;
  padding: 60px 0;
  background: white;
  white-space: nowrap;
  position: relative;
}

.logos:before,
.logos:after {
  position: absolute;
  top: 0;
  width: 250px;
  height: 100%;
  content: '';
  z-index: 2;
}

.logos:before {
  left: 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
}

.logos:after {
  right: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
}

.logos:hover .logos-slide {
  animation-play-state: paused;
}

.logos .logos-slide {
  display: inline-block;
  animation: 0.6s slide infinite linear;
}

.logos .logos-slide img {
  height: 50px;
  margin: 0 40px;
}
