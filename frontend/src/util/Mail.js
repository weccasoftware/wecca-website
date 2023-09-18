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

export const sendSignupEmail = (email, name, url) => {
    window.Email.send({
        Host : "smtp.elasticemail.com",
        Username : MAIL_ACCOUNT.Username,
        Password : MAIL_ACCOUNT.Password,
        To : [WECCA_SOFTWARE_EMAIL],
        From : "wecca.software@gmail.com",
        Subject : `${name} has signed up under username ${email}`,
        Body : `Please verify this user here: ${url}`
    })
}

export const sendConfirmationEmail = (email, name, url) => {
    window.Email.send({
        Host : "smtp.elasticemail.com",
        Username : MAIL_ACCOUNT.Username,
        Password : MAIL_ACCOUNT.Password,
        To : [email],
        From : "wecca.software@gmail.com",
        Subject : `You have signed up for an account on WECCA.org`,
        Body : `<p>Hi ${name}, you were signed up for an account on WECCA.org. 
            <br/><br/>If this was not you, please disregard this email or contact wecca.software@gmail.com.
            <br/><br/>Otherwise, please verify your email by logging in here ${url}`
    })
}