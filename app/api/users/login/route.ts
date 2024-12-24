import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    message: "This user does not exist."
                }, { status: 400 }
            );
        }

        console.log(User);

        const validePassword = await bcryptjs.compare(password, user.password)

        if (!validePassword) {
            return NextResponse.json(
                {
                    message: "Wrong password, check your credentials.",
                }, { status: 400 }
            );
        }



        if(!user.isVerified){
            return NextResponse.json(
                {
                    message: "Please, verify your email in order to log in.",
                }, { status: 400 }
            );
        }

        const tokenData = {
            id: user._id,
            username: user.first_name,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET!, { expiresIn: '1h' });

        const response = NextResponse.json({
            message: "Login successfuly.",
            data: user.first_name
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: false,
            sameSite: "none",
            secure: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        )
    }
}