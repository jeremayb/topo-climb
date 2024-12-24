import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/hooks/useNodeMailer'

connect()

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { first_name, last_name, email, password, role } = body;
        console.log(body);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json(
                {
                    message: "User already exist."
                }, { status: 400}
            );
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser.id
        })

        return (NextResponse.json(
            {
                message: "User successfuly created.",
                data: savedUser
            }, {status : 200}
        ))
    } catch (error: any) {
        return (NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }))

    }
}