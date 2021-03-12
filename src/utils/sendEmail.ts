import nodemailer from "nodemailer";

export const sendEmail = async (newUserEmail: string, newUserName: string) => {
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Alberto González" <alberto@example.com>',
        to: newUserEmail,
        subject: `Welcome ${newUserName}!`,
        html: `
            <p>We are very happy you've registered in our app, feel free to check other tech samples and source code at:</p>
            <a href="https://github.com/BetoGlez">Alberto's Github account</a>
        `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
