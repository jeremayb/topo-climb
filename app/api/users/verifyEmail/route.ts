import { connect } from '@/dbConfig/dbConfig'
import { sendEmail } from '@/hooks/useNodeMailer';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function GET(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get("token");
        console.log("token",token);

        const user = await User.findOne({
            verifyToken: token,
        })

        console.log("user", user)

        if (!user) {
            return NextResponse.json(
                { error: "Invalid token." },
                { status: 400 }
            )
        }
        console.log(new Date().toString())
        console.log(user.verifyTokenExpiry < new Date().toString());
        if(user.verifyTokenExpiry < new Date().toString()){            
            await sendEmail({
                        email: user.email,
                        emailType: "VERIFY",
                        userId: user.id
                    })
            
            return NextResponse.json(
                { error: "This validation email has expired, we've just sent you another email. (validity : 1h)" },
                { status: 400 }
            )
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const savedUser = await user.save();
        console.log(savedUser);

        return NextResponse.json(
            {
                message: "Email verified successfuly",
                success: true
            },
        )

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
