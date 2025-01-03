import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { LazyLoadImage } from './EmblaCarouselLoadImage'


type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    play: Boolean
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay(props.play ? { playOnInit: true, delay: 4000 } : { playOnInit: false })
    ])
    const [slidesInView, setSlidesInView] = useState<number[]>([])

    const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
        setSlidesInView((slidesInView) => {
            if (slidesInView.length === emblaApi.slideNodes().length) {
                emblaApi.off('slidesInView', updateSlidesInView)
            }
            const inView = emblaApi
                .slidesInView()
                .filter((index) => !slidesInView.includes(index))
            return slidesInView.concat(inView)
        })
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        updateSlidesInView(emblaApi)
        emblaApi.on('slidesInView', updateSlidesInView)
        emblaApi.on('reInit', updateSlidesInView)
    }, [emblaApi, updateSlidesInView])

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => {
                        let inView = slidesInView.indexOf(index) > -1;
                        return (
                            <LazyLoadImage
                                key={index}
                                index={index}
                                imgSrc={`https://picsum.photos/600/350?v=${index}`}
                                inView={inView}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
