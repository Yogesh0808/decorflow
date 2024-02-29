import React, { useEffect } from "react";
import Parallax from "parallax-js"; // Assuming Parallax is installed as a dependency

import "../css/404.css";
import favicon from "/favicon.png";

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Parallax initialization
    const scene = document.getElementById("scene");
    if (scene) {
      new Parallax(scene);
    }
  }, []);

  return (
    <div>
      {/* About section */}
      <div className="about">
        <a
          className="bg_links social portfolio"
          href="https://www.rafaelalucas.com"
          target="_blank"
        >
          <span className="icon"></span>
        </a>
        <a
          className="bg_links social dribbble"
          href="https://dribbble.com/rafaelalucas"
          target="_blank"
        >
          <span className="icon"></span>
        </a>
        <a
          className="bg_links social linkedin"
          href="https://www.linkedin.com/in/rafaelalucas/"
          target="_blank"
        >
          <span className="icon"></span>
        </a>
        <a className="bg_links logo"></a>
      </div>

      {/* Navigation */}

      {/* Wrapper section */}
      <section className="wrapper">
        <img src={favicon} className="w-30 h-30 absolute top-4 left-4"></img>
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>
            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>
            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>
            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>
            <p className="p404" data-depth="0.50">
              404
            </p>
            <p className="p404" data-depth="0.10">
              404
            </p>
          </div>

          {/* Text section */}
          <div className="text">
            <article>
              <p>
                Uh oh! Looks like you got lost. <br />
                Go back to the homepage if you dare!
              </p>
              <button>Go back to Dashboard</button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
