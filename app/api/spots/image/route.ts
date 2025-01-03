import { connect } from '@/dbConfig/dbConfig'
import Image from '@/models/imageModel';
import Spot from '@/models/spotModel';
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function GET(request: NextRequest) {
    try {

        const id = request.nextUrl.searchParams.get("_id");

        const spot = await Spot.findById(id)
            .populate({ path: 'image', model: Image })

        console.log(spot);

        return NextResponse.json(
            {
                message: "Success",
                data: {
                    spot_id: spot._id,
                    base64: spot.image.base64
                }
            }, { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
