import { connect } from '@/dbConfig/dbConfig'
import Image from '@/models/imageModel';
import Sector from '@/models/sectorModel';
import Spot from '@/models/spotModel';
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function GET(request: NextRequest) {
    try {

        const id = request.nextUrl.searchParams.get("_id");

        const spot = await Spot.findById(id)
            .populate({ path: 'image', model: Image })
            .populate({
                path: 'sectors', model: Sector,
                populate: { path: 'images', model: Image }
            })

        console.log(spot);

        let listImages: any[] = [];

        spot.sectors.forEach((sector: any) => {
            listImages = listImages.concat(sector.images);
        });

        return NextResponse.json(
            {
                message: "Success",
                data: {
                    spot_id: spot._id,
                    images: listImages
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
