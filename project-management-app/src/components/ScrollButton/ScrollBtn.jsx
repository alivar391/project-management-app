import { useState } from 'react';
import './scrollBtn.css';

export const ScrollButton = () => {
  const [active, setActive] = useState(false);
  function moveAbove() {
    if (window.pageYOffset > document.documentElement.clientHeight) {
      setActive(true);
      return;
    }
    setActive(false);
  }

  function debounceButton(f, ms = 50) {
    let isCooldown = false;
    return function () {
      if (isCooldown) return;
      f.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => (isCooldown = false), ms);
    };
  }

  function toTopMover() {
    scrollTo(0, 0);
  }

  window.addEventListener('scroll', debounceButton(moveAbove));

  return (
    <div className={active ? 'button-above but-active' : 'button-above'} onClick={toTopMover} />
  );
};
