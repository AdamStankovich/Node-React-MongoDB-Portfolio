import { useState } from "react";
import "./works.scss";

export default function Works() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const data = [
        {
            id: "1",
            icon: "./assets2/mobile.png",
            title: "Web Developer",
            desc:
                "Designed and deployed a web application used to manage Georgia Southern University's Networking Enterprise team inventory.",
            img:
                "./assets2/work1.png",
            reference: "https://www.linkedin.com/in/carlton-stewart-90352776",
        },
        {
            id: "2",
            icon: "./assets2/globe.png",
            title: "Example 2",
            desc:
                "Example work 2",
            img:
                "https://i.pinimg.com/originals/e9/c9/2f/e9c92f7869d682a6fa5a97fb8a298f30.jpg",
            reference: "https://www.linkedin.com",
        },
        {
            id: "3",
            icon: "./assets2/writing.png",
            title: "Example 3",
            desc:
                "Example work 3",
            img:
                "https://i.pinimg.com/originals/a9/f6/94/a9f69465d972a004ad581f245d6ad581.jpg",
            reference: "https://www.linkedin.com",
        },
    ];

    const handleClick = (way) => {
        way === "left"
            ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 2)
            : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0);
    };

    return (
        <div className="works" id="works">
            <div
                className="slider"
                style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
            >
                {data.map((d) => (
                    <div className="container">
                        <div className="item">
                            <div className="left">
                                <div className="leftContainer">
                                    <div className="imgContainer">
                                        <img src={d.icon} alt="" />
                                    </div>
                                    <h2>{d.title}</h2>
                                    <p>{d.desc}</p>
                                    <a href={d.reference}><span>Reference</span></a>
                                </div>
                            </div>
                            <div className="right">
                                <img
                                    src={d.img}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <img
                src="assets2/arrow.png"
                className="arrow left"
                alt=""
                onClick={() => handleClick("left")}
            />
            <img
                src="assets2/arrow.png"
                className="arrow right"
                alt=""
                onClick={() => handleClick()}
            />
        </div>
    );
}