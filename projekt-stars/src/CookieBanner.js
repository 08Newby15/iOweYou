import posthog from "posthog-js";
import { useState } from "react";
import './App.css';
import { Flip, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CookieBanner() {
    const [cookiesAccepted, setCookiesAccepted] = useState(true);
    let counter = 0;

    const acceptCookies = () => {
        toast.success("Yay! You accepted the cookies 🍪!", { autoClose: 2000, theme: 'colored', transition: Flip, position: "top-center" })
        posthog.opt_in_capturing();
        setCookiesAccepted(false);
    }

    const declineCookies = () => {
        if (counter >= 2) {
            toast.error("Fine! You don't want the cookies 🍪!", { autoClose: 2000, theme: 'colored', transition: Slide, position: "top-center" });

            posthog.opt_out_capturing();
            setCookiesAccepted(false);
        } else if (counter === 0) {
            toast.info("Come oooon you want those cookies 🍪!", { autoClose: 2000, theme: 'colored', transition: Slide, position: "top-center" });
            counter++;
        }
        
        else {
            toast.warning("Pleeeeease accept the cookies 🍪!", { autoClose: 2000, theme: 'colored', transition: Slide, position: "top-center" });
            counter++;
        }

    }

    return (
        <div>
            {cookiesAccepted && (<div className="cookieBanner"> 
                <p>We use cookies to track you.</p>
                <button className="btn btn-success me-5" onClick={acceptCookies}>Accept</button>
                <button className="btn btn-danger" onClick={declineCookies}>Decline</button>
            </div>)}

        </div>
    )
}

export default CookieBanner;