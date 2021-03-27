import React from "react";
import { useAuth } from "../contexts/AuthContext";

function DeleteInfo() {
    const { currentUser } = useAuth();
    let userID=currentUser.uid;
    let emailBody= `Delete all data associated with user ID: ${userID}`;
    let emailLink= `mailto:SmokingGunJournals@gmail.com?subject=Delete%20User%20Info%20${userID}&body=${emailBody}`;
    return(
        <div>
            <h1>Delete User Info</h1>
            <p>To request your information is deleted please <a href={emailLink}>click here</a>. This will populate an email from you with all of the information we need. Simply hit send. Our team will send a confirmation email when we recieve your request, and we will update you when the request is completed.</p>
        </div>
    );
}

export default DeleteInfo;