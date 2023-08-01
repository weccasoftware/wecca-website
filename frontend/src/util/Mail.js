import { WECCA_SOFTWARE_EMAIL } from "../config";

export const sendMail = (mailTo, submittedBy, emailBody, setSubmitMessage, formType, successMsg, failureMsg) => {
    window.Email.send({
        Host : "smtp.elasticemail.com",
        Username : "",
        Password : "",
        To : [mailTo, WECCA_SOFTWARE_EMAIL],
        From : "wecca.software@gmail.com",
        Subject : `The ${formType} form has been submitted by ${submittedBy}`,
        Body : emailBody
    }).then((message) => {
        if (message === 'OK') {
            setSubmitMessage(successMsg)
        } else {
            setSubmitMessage(failureMsg)
        }
    });
}