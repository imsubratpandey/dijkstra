import React, { useRef, useState } from 'react';
import "../css/Home.css";
import Welcome from '../components/Welcome';

export default function Home() {
  const homeRef = useRef<any>(null);
  const [isStripeVisible, setIsStripeVisible] = useState<boolean>(true);
  return (
    <>
      <div ref={homeRef} className="homeParent">
        <div id="homeContainer">
          <Welcome isStripeVisible={isStripeVisible} setIsStripeVisible={setIsStripeVisible} />
        </div>
      </div>
    </>
  )
}
