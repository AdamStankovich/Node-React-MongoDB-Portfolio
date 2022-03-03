import { useRef, useState } from "react";
import "./contact.scss";

export default function Contact() {

    const [sent, setMessage] = useState(false);
    const email = useRef(null);
    const message = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(true);
        fetch('https://adamstankovich.herokuapp.com/', {
            method: 'POST',
            body: JSON.stringify({
                email: email.current.value,
                message: message.current.value
            })
        })
    };

    return (
        <div className="contact" id="contact">
            <div className="left">
                <img src="assets2/shake.svg" alt="" />
            </div>
            <div className="right">
                <h2>Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input ref={email} type="text" placeholder="Email" />
                    <textarea ref={message} placeholder="Message"></textarea>
                    <button type="submit">Send</button>
                    {sent && <span>Sent!</span>}
                </form>
            </div>
        </div>
    );
}