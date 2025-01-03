import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel/EmblaCarousel";
import '@/app/components/EmblaCarousel/css/embla.css'

interface SpotInfosProps {
    spot: any;
    spotFocused: String;
}

const SpotInfos: React.FC<SpotInfosProps> = ({ spot, spotFocused }) => {

    const OPTIONS: EmblaOptionsType = { loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    

    console.log("spot in spot view", spot)
    return (
        <div id={spot._id} style={{ height: "30%" }} className={`${spotFocused === spot._id ? 'w-full mb-4 p-2 border-blue-500 border-l-4' : 'w-full mb-4 p-2'}`}>
            <div className="w-full h-full bg-slate-100 drop-shadow-md">
                <div className="h-full w-2/5">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} play={spotFocused === spot._id ? true : false} />
                </div>
            </div>
        </div>
    )
}

export default SpotInfos;