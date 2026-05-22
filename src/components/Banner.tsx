import React from "react";

export default function Banner() {
  const text = "CLB FITWAN – Học thật! Làm thật!";
  return (
    <div className="site-banner bg-teal-600 text-white font-semibold">
      <div className="site-banner__mask">
        <div className="site-banner__track" aria-hidden>
          <div className="site-banner__item">{text}</div>
          <div className="site-banner__item">{text}</div>
        </div>
      </div>
    </div>
  );
}
