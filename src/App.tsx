import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
import { IPeople } from "./models";
function App() {
  const [people, setPeople] = useState<IPeople[]>(data);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [press, setPress] = useState<boolean>(false);
  // timer id need to put out on top to clear interval on next or prev slide press
  let timerId: NodeJS.Timer;
  //next slide
  const nextSlide = () => {
    if (currentIndex >= people.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((oldIndex) => oldIndex + 1);
    }
    // disable autoslide on press
    setPress(true);
  };
  //prev slide
  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(people.length - 1);
    } else {
      setCurrentIndex((oldIndex) => oldIndex - 1);
    }
    // disable autoslide on press
    setPress(true);
  };
  // Auto Play, add press value to extensions to disable autoplay on prev or next click
  useEffect(() => {
    timerId = setInterval(() => {
      if (press) {
        clearInterval(timerId);
      } else {
        setCurrentIndex((oldIndex) => {
          if (oldIndex >= people.length - 1) {
            return 0;
          } else {
            return oldIndex + 1;
          }
        });
      }
    }, 3000);
    return () => clearInterval(timerId);
  }, [press]);
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((item, index) => {
          const { id, name, image, title, quote } = item;
          // position of slide
          let position = "nextSlide";
          // if position of index equals current slide index get it class of active
          // to display in center, activeSlide - center, nextSlide-right, prevSlide-left
          if (index === currentIndex) {
            position = "activeSlide";
          }
          if (
            currentIndex === index - 1 ||
            (index === 0 && currentIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button onClick={prevSlide} className="prev">
          <FiChevronLeft />
        </button>
        <button onClick={nextSlide} className="next">
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
