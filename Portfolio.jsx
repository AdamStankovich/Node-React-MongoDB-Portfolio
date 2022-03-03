import "./portfolio.scss"
import PortfolioList from "../portfolioList/PortfolioList"
import React, { useEffect, useState } from "react";
import {
    latestPortfolio,
    personalPortfolio,
    freelancePortfolio,
    professionalPortfolio,
    otherPortfolio
} from "../../data";

export default function Portfolio() {


    const [selected, setSelected] = useState("latest");
    const [data, setData] = useState([]);

    const list = [
        {
            id: "latest",
            title: "Latest",
        },
        {
            id: "personal",
            title: "Personal Websites",
        },
        {
            id: "freelance",
            title: "Freelance Websites",
        },
        {
            id: "professional",
            title: "Professional Work",
        },
        {
            id: "other",
            title: "Other Projects",
        },
    ];

    useEffect(() => {

        switch (selected) {
            case "latest":
                setData(latestPortfolio);
                break;
            case "personal":
                setData(personalPortfolio);
                break;
            case "freelance":
                setData(freelancePortfolio);
                break;
            case "professional":
                setData(professionalPortfolio);
                break;
            case "other":
                setData(otherPortfolio);
                break;
            default:
                setData(latestPortfolio);

        }

    }, [selected])

    return (
        <div className="portfolio" id="portfolio">
            <div className="header">
                <h1>My Projects</h1>
                <ul>
                    {list.map(item => (
                        <PortfolioList title={item.title} active={selected === item.id} setSelected={setSelected} id={item.id} />
                    ))}
                </ul>
                <div className="container">
                    {data.map((d) => (
                        <div className="item">
                            <img src={d.img} alt="example website" />
                            <h3>
                                <a href={"https://www.google.com"}>{d.title}</a></h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}