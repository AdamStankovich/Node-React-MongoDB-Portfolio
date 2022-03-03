import "./topbar.scss"

export default function Topbar({ menuOpen, setMenuOpen }) { /* pass hambur from app.jsx */
    return (
        <div className={"topbar " + (menuOpen && "active")}>
            <div className="wrapper">
                <div className="left">
                    <a href="/login" className="logo">&gt; Adam Stankovich</a>
                </div>
                <div className="right">
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}> {/* make hamburger menu open */}
                        <span className="line1"></span>
                        <span className="line2"></span>
                        <span className="line3"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}