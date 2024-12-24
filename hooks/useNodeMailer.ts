import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set:{
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
            console.log("updated user", updatedUser)
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set:{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            })
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NEXT_PUBLIC_SMTP_SERVER_USERNAME,
                pass: process.env.NEXT_PUBLIC_SMTP_SERVER_PASSWORD,
            },
        });

        const mailOptions = {
            from: 'jeremy.butin@yahoo.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/api/users/verifyEmail?token=${hashedToken}">here</a> to 
            ${emailType === 'VERIFY' ? "verify your email " : "reset your password "} 
            or copy and past the link below in your browser.
            <br/> ${process.env.DOMAIN}/api/users/verifyEmail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}