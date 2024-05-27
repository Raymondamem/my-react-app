import { useEffect, useState } from 'react';
import './App.css'; // Optional if you decide to use an external CSS file

const App = () => {
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    // Generates a random number between 1 and 11
    const randomNum = Math.floor(Math.random() * 11) + 1;
    setRandomNumber(randomNum);
  };

  useEffect(() => {
    let newDuration = 1;
    const scrollers = document.querySelectorAll(".scroller");
    const scrollerInnerLis = document.querySelectorAll(".scroller > .scroller__inner > li");
    const countdown = document.querySelector('.countdown');
    let increaseSpeed = null;
    let decreaseSpeed = null;
    let starter = null;
    let hasRan = false;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      generateRandomNumber();
      console.log("Random Generated num is: ", randomNumber);
      addAnimation();
    }

    setupIntervals();
    starterFunc();

    let options = {
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.5,
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);
        if (entry.isIntersecting) io.unobserve(entry.target);
      });
    }, options);

    scrollerInnerLis.forEach((el) => {
      io.observe(el);
    });

    function setupIntervals() {
      if (starter) clearTimeout(starter);
      const scrollerFast = document.querySelector('.scroller[data-speed="fast"]');
      const scrollerInner = scrollerFast.querySelector('.scroller__inner');
      if (!hasRan) {
        scrollerFast.classList.remove('stopped');
        increaseSpeed = setInterval(() => {
          newDuration *= 0.5;
          if (newDuration < 0.05) newDuration = 0.05;
          if (newDuration >= 0.05) {
            hasRan = true;
            clearInterval(increaseSpeed);
            setupIntervals();
          }
          scrollerInner.style.animationDuration = `${newDuration}s`;
          scrollerFast.classList.toggle('stopped', newDuration >= 60);
          console.log("increaseSpeed: ", newDuration);
        }, 1000);
      } else {
        decreaseSpeed = setInterval(() => {
          newDuration /= 0.5;
          if (newDuration > (0.5 * 150)) newDuration = (0.5 * 150);
          if (decreaseSpeed >= 8 && decreaseSpeed <= 32) {
            // 
          }
          scrollerInner.style.animationDuration = `${newDuration}s`;
          scrollerFast.classList.toggle('stopped', newDuration >= 60);
          console.log("decreaseSpeed", newDuration);
          console.log("Random Generated num is: ", randomNumber);
          if (newDuration >= 60) {
            starter = setTimeout(() => {
              hasRan = false;
              newDuration = 1;
              scrollerFast.classList.remove('stopped');
              clearInterval(decreaseSpeed);
              setupIntervals();
            }, 10000);
          }
        }, 5000);
      }
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }

    function starterFunc() {
      let i = 0;
      const starterCountDown = setInterval(() => {
        countdown.querySelector('.timer').innerHTML = `0${i}`;
        i++;
        if (i >= 10) {
          i = 0;
          clearInterval(starterCountDown);
        }
      }, 1000);
      return i;
    }
  }, []);

  return (
    <div>
      <style>{`
        .scroller {
          max-width: 3000px;
          position: relative;
        }

        .scrollArea {
          position: absolute;
          top: 0;
          bottom: 0;
          background: rgba(255, 0, 0, 0.4);
          width: 200px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        .scroller__inner {
          padding-block: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
        }

        .scroller[data-animated=true] {
          overflow: hidden;
          -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
          mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
        }

        .scroller[data-animated=true] .scroller__inner {
          width: -moz-max-content;
          width: max-content;
          flex-wrap: nowrap;
          animation: scroll var(--_animation-duration, 40s) var(--_animation-direction, forwards) linear infinite;
        }

        .scroller[data-direction=right] {
          --_animation-direction: reverse;
        }

        .scroller[data-direction=left] {
          --_animation-direction: forwards;
        }

        .scroller[data-speed=fast] {
          --_animation-duration: 0s;
        }

        .scroller[data-speed=slow] {
          --_animation-duration: 60s;
        }

        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.5rem));
          }
        }

        .stopped .scroller__inner {
          animation: stop 0s forwards !important;
          animation-play-state: paused !important;
        }

        :root {
          --clr-neutral-100: hsl(0, 0%, 100%);
          --clr-primary-100: hsl(205, 15%, 58%);
          --clr-primary-400: hsl(215, 25%, 27%);
          --clr-primary-800: hsl(217, 33%, 17%);
          --clr-primary-900: hsl(218, 33%, 9%);
        }

        html {
          color-scheme: dark;
        }

        body {
          display: grid;
          min-block-size: 100vh;
          place-content: center;
          font-family: system-ui;
          font-size: 1.125rem;
          background-color: var(--clr-primary-800);
          overflow: hidden;
          position: relative;
        }

        .countdown {
          position: fixed;
          width: -moz-fit-content;
          width: fit-content;
          left: 50%;
          transform: translateX(-50%);
          top: 20%;
          z-index: 5;
        }

        .countdown .timer {
          font-weight: lighter;
          font-size: 2.5rem;
        }

        .tag-list {
          margin: 0;
          padding-inline: 0;
          list-style: none;
        }

        .tag-list li {
          padding: 1rem;
          background: var(--clr-primary-400);
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem -0.25rem var(--clr-primary-900);
        }

        /* for testing purposed to ensure the animation lined up correctly */
        .test {
          background: red !important;
        }

        .speedBtn {
          border: 1px solid white;
          background-color: var(--clr-primary-800);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 5px;
        }

        .tagged,
        .active {
          background: yellow !important;
        }
      `}</style>

      <div className="countdown">
        <span className="timer"></span>
      </div>

      <h1 className="dummyButtonWrapper" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        Infinite Scroll Animation
      </h1>

      <div className="scroller" data-speed="fast" data-direction="right">
        <div className="scrollArea" id="scrollArea"></div>
        <ul className="tag-list scroller__inner" style={{ background: 'white' }}>
          <li>HTML</li>
          <li>CSS</li>
          <li>JS</li>
          <li>SSG</li>
          <li>webdev</li>
          <li>animation</li>
          <li>UI/UX</li>
          <li>Sam</li>
          <li>Yo</li>
          <li>Bright</li>
          <li>Cap</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
