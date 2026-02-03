import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import { Link, useNavigate } from 'react-router-dom';
import MessageSend from './MessageSend';
import './styles/ask.css';

import boyLookingToBeAcceptedFile from './assets/animations/boy-looking-to-accept.json';
import cryingBoyAnimationFile_1 from './assets/animations/crying_boy_1.json';
import cryingBoyAnimationFile_2 from './assets/animations/crying_boy_2.json';
import acceptAnimationFile from './assets/animations/love_animation.json';

const lottieConfig = (data) => ({
  loop: true,
  autoplay: true,
  animationData: data,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
});

export default function Ask(props) {
  const navigate = useNavigate();
  const buttonAreaRef = useRef(null);

  const [askText, setAskText] = useState("Olivia, will you be my Valentine?");
  const [emojiAsk, setEmojiAsk] = useState('💗');
  const [yesOrNow, setYesOrNow] = useState(null);

  const [noPos, setNoPos] = useState({ x: 120, y: 0 });

  useEffect(() => {
    props.setProgress(100);
  }, [props]);

  const moveNoButton = () => {
    const area = buttonAreaRef.current;
    if (!area) return;

    const areaRect = area.getBoundingClientRect();

    const buttonWidth = 110;
    const buttonHeight = 55;

    const maxX = areaRect.width - buttonWidth;
    const maxY = areaRect.height - buttonHeight;

    let x, y;
    let safe = false;

    while (!safe) {
      x = Math.random() * maxX;
      y = Math.random() * maxY;

      // keep away from center (Yes button zone)
      const centerX = areaRect.width / 2;
      const centerY = areaRect.height / 2;

      const distance = Math.hypot(x - centerX, y - centerY);
      if (distance > 90) safe = true;
    }

    setNoPos({ x, y });
  };

  const handleYesClick = (e) => {
    e.preventDefault();
    setAskText("Yayy..! That made my day 😍");
    setEmojiAsk('');
    setYesOrNow("Yes");
  };

  return (
    <div className='message-sending-body flex items-center flex-col w-full min-h-screen bg-gradient-to-tr from-[#F56217] to-[#0B486B] gap-10'>

      <Lottie options={lottieConfig(boyLookingToBeAcceptedFile)} height={300} width={300} />

      <div className='convey text-center text-transparent bg-clip-text bg-gradient-to-t from-[#962820] to-[#111125] text-2xl sm:text-4xl px-4'>
        Out of everyone I know, you’re the one I wanted to ask this, Olivia.
      </div>

      <div className='ask text-2xl sm:text-4xl text-center'>
        {askText} <span>{emojiAsk}</span>
      </div>

      {/* BUTTON AREA */}
      <div
        ref={buttonAreaRef}
        className="relative w-full max-w-md h-40 flex items-center justify-center"
      >
        {/* YES BUTTON */}
        <button
          onClick={handleYesClick}
          className="z-10 px-7 py-3 border-2 rounded-xl text-xl bg-gradient-to-tr from-[#3a6186] to-[#89253e] text-gray-200 shadow-xl shadow-pink-500 hover:scale-110 active:scale-90 duration-200"
        >
          Yes
        </button>

        {/* NO BUTTON */}
        <button
          onMouseEnter={moveNoButton}
          onMouseMove={moveNoButton}
          style={{
            position: 'absolute',
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
            pointerEvents: 'none',
            transition: 'all 0.25s ease'
          }}
          className="px-7 py-3 border-2 rounded-xl text-xl bg-gradient-to-tr from-[#3a6186] to-[#89253e] text-gray-200 shadow-xl shadow-pink-500"
        >
          No
        </button>
      </div>

      {yesOrNow === "Yes" && <MessageSend />}

      <Link to="/destroy" className="hidden"></Link>
    </div>
  );
}
