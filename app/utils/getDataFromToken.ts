import { connect } from '@/dbConfig/dbConfig'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

connect();

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken: any = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET!)
        return decodedToken.id
    } catch (error: any) {
        console.log(error.message)
    }
}