import { WECCA_SOFTWARE_EMAIL } from "../config";
import { MAIL_ACCOUNT } from "../secrets";

export const sendMail = (mailTo, submittedBy, emailBody, setSubmitMessage, formType, successMsg, failureMsg) => {
    window.Email.send({
        Host : "smtp.elasticemail.com",
        Username : MAIL_ACCOUNT.Username,
        Password : MAIL_ACCOUNT.Password,
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