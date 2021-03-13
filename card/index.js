import '../styles/card.css';
import React from 'react';
import CardTop from './frontface/top';
import CardBottom from './frontface/bottom';
import CardBottomNumber from './frontface/bottom/number';
import CardBrand from './frontface/bottom/lowest/card.brand';
import CardBottomLowest from './frontface/bottom/lowest/';
import CardBottomLowestOwner from './frontface/bottom/lowest/owner';
import CardBottomLowestValidThruLeft from './frontface/bottom/lowest/valid-thru/left';
import CardBottomLowestValidThruRight from './frontface/bottom/lowest/valid-thru/right';
import CardBottomLowestValidThru from './frontface/bottom/lowest/valid-thru';
import CardFrontFace from './frontface';
import { useContext, useRef, useState } from 'react';
import hunelContext from '../utils/HunelContext';
import CardBackFace from './backface';
import BackFaceRibbon from './backface/ribbon';
import SecurityCode from './backface/securityCode';

export default function Card({ cardClass = '', fixClass = '' }) {
  const {
    setVirtualCardStates,
    setContextStateValue,
    _validThruMonth,
    _validThruYear,
    _owner,
    _config,
  } = useContext(hunelContext);
  const [cardNumber, setCardNumber] = useState('');
  const [cardOwner, setCardOwner] = useState(_owner);
  const [cardValidThruMonth, setCardValidThruMonth] = useState(_validThruMonth);
  const [cardValidThruYear, setCardValidThruYear] = useState(_validThruYear);
  const [cardSecurityCode, setCardSecurityCode] = useState('');
  const [cardFace, setCardFace] = useState(2);
  const frontFaceRef = useRef(null);
  const backFaceRef = useRef(null);

  function _handleCard(type, value) {
    switch (type) {
      case 1:
        setCardNumber(value);
        break;
      case 2:
        setCardOwner(value);
        break;
      case 3:
        setCardValidThruMonth(value);
        break;
      case 4:
        setCardValidThruYear(value);
        break;
      case 5:
        setCardSecurityCode(value);
        break;
      case 6:
        setCardFace(value);
        break;
      default:
    }
    setContextStateValue(type, value);
  }

  function handleAnimationStart(e) {
    const { animationName } = e;
    if (animationName === 'backToFront') {
      frontFaceRef.current.classList.add('card-face-show');
    }
    if (animationName === 'frontToBack') {
      backFaceRef.current.classList.add('card-face-show');
    }
  }

  setVirtualCardStates(_handleCard);

  let face = (
    <CardFrontFace ref={frontFaceRef} cardFace={cardFace}>
      <CardTop />
      <CardBottom>
        <CardBottomNumber
          cardNumber={cardNumber}
          middlePartHide={_config.middlePartHide}
        />
        <CardBottomLowest>
          <CardBottomLowestValidThru>
            <CardBottomLowestValidThruLeft />
            <CardBottomLowestValidThruRight
              cardValidMonth={cardValidThruMonth}
              cardValidYear={cardValidThruYear}
            />
          </CardBottomLowestValidThru>
          <CardBottomLowestOwner cardOwner={cardOwner} />
          <CardBrand cardNumber={cardNumber} />
        </CardBottomLowest>
      </CardBottom>
    </CardFrontFace>
  );

  if (cardFace === 1)
    face = (
      <CardBackFace ref={backFaceRef}>
        <BackFaceRibbon />
        <SecurityCode securityCode={cardSecurityCode} />
      </CardBackFace>
    );

  const sideAnimation = [' frontside', ' backside', ''];

  return (
    <div className={`card-fix${fixClass ? ` ${fixClass}` : ''}`}>
      <div
        className={`card${sideAnimation[cardFace]}${
          cardClass ? ` ${cardClass}` : ''
        }`}
        onAnimationStart={handleAnimationStart}
      >
        {face}
      </div>
    </div>
  );
}
