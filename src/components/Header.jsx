// Tools
import { useEffect } from 'react';

// Styles
import '../css/header.css';

export default function Header() {
  useEffect(()=>{
    const body = document.getElementById("body");
    const sun  = document.querySelector(".icon-sun");
    const moon = document.querySelector(".icon-moon");

    document.querySelector(".switch-theme").addEventListener("click",e=>{
        if(body.classList.contains("light")){
          body.classList.remove("light");
          moon.style.opacity = "0";
          sun.style.opacity = "1";
        }
        else{
          body.classList.add("light");
          moon.style.opacity = "1";
          sun.style.opacity = "0";
        }
    });
  });

  return (
    <header className="header">
        <h1>todo</h1>

        <span className="switch-theme">
          <img src="/assets/images/icon-sun.svg" alt="icon-sun" className="icon icon-sun"/>
          <img src="/assets/images/icon-moon.svg" alt="icon-moon" className="icon icon-moon"/>
        </span>
    </header>
  );
};
