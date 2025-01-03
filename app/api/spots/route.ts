import { connect } from '@/dbConfig/dbConfig'
import Location from '@/models/locationModel';
import Spot from '@/models/spotModel';
import Sector from '@/models/sectorModel'
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function GET() {
    try {
        const spots = await Spot.find()
        .populate({path: 'location', model: Location})
        .populate({path: 'nearest_parking_location', model: Location})
        .populate({path: 'sectors', model: Sector});

        return NextResponse.json(
            {
                message: "Success",
                data: spots
            }, { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
