import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/app/utils/getDataFromToken'

connect();

export async function POST(request: NextRequest) {

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("first_name");

        if (user) {
            return NextResponse.json({
                message: "User found",
                data: user
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: "User not found",
            }, {status: 400})
        }


    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },
            { status: 500 })
    }


}