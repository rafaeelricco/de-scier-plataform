import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import LikesIllustration from 'public/svgs/modules/statistics/likes.svg'
import StatisticsIllustration from 'public/svgs/modules/statistics/statistics.svg'
import ViewsIllustration from 'public/svgs/modules/statistics/views.svg'
import React from 'react'
import { CaretLeft, CaretRight } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'

const Statistics: React.FC = () => {
   const [currentSlide, setCurrentSlide] = React.useState(0)
   const [sliderRef, instanceRef] = useKeenSlider({
      slides: { perView: 1, spacing: 0 },
      loop: true,
      mode: 'snap',
      breakpoints: {
         '(max-width: 728px)': {}
      },
      slideChanged(s) {
         setCurrentSlide(s.track.details.abs)
      }
   })

   const handlePrevClick = () => {
      if (instanceRef) {
         instanceRef.current?.prev()
      }
   }

   const handleNextClick = () => {
      if (instanceRef) {
         instanceRef.current?.next()
      }
   }

   const carrousel = [
      {
         id: 1,
         component: <TotalArticles total_articles={33} />
      },
      {
         id: 2,
         component: <TotalLikes total_likes={123} />
      },
      {
         id: 3,
         component: <TotalViews total_views={10000000} />
      }
   ]

   return (
      <React.Fragment>
         <div className="grid grid-flow-col items-center gap-4">
            <CaretLeft className="slider-arrow slider-arrow-left" onClick={handlePrevClick} />
            <div ref={sliderRef} className="keen-slider">
               {carrousel.map((c) => (
                  <div
                     key={c.id}
                     className={twMerge(`keen-slider__slide slider-${c.id}`, 'grid gap-4')}
                  >
                     {c.component}
                     <div className="grid grid-flow-col justify-center gap-2">
                        {carrousel.map((_, index) => (
                           <div
                              key={index}
                              className={`w-3 h-3 mx-auto ${
                                 index === currentSlide ? 'bg-primary-main' : 'bg-[#D9D9D9]'
                              } rounded-sm`}
                           />
                        ))}
                     </div>
                  </div>
               ))}
            </div>
            <CaretRight className="slider-arrow slider-arrow-right" onClick={handleNextClick} />
         </div>
      </React.Fragment>
   )
}

const TotalArticles: React.FC<{ total_articles: number }> = ({ total_articles }) => {
   return (
      <div className="grid grid-flow-col justify-center items-center">
         <StatisticsIllustration className="w-full max-w-[14rem] mx-auto my-0" />
         <div className="grid justify-items-center content-center">
            <h3 className="gradient-grad-2 font-bold text-5xl">33</h3>
            <p className="text-lg text-secundary_blue-main max-w-[12ch] text-center">
               Total articles published
            </p>
         </div>
      </div>
   )
}

const TotalLikes: React.FC<{ total_likes: number }> = ({ total_likes }) => {
   return (
      <div className="grid grid-flow-col justify-center items-center">
         <LikesIllustration className="w-full max-w-[14rem] mx-auto my-0" />
         <div className="grid justify-items-center content-center">
            <h3 className="gradient-grad-2 font-bold text-5xl">123k</h3>
            <p className="text-lg text-secundary_blue-main max-w-[12ch] text-center">
               Total likes on articles
            </p>
         </div>
      </div>
   )
}

const TotalViews: React.FC<{ total_views: number }> = ({ total_views }) => {
   return (
      <div className="grid grid-flow-col justify-center items-center">
         <ViewsIllustration className="w-full max-w-[14rem] mx-auto my-0" />
         <div className="grid justify-items-center content-center">
            <h3 className="gradient-grad-2 font-bold text-5xl">10m</h3>
            <p className="text-lg text-secundary_blue-main max-w-[12ch] text-center">
               Total views on articles
            </p>
         </div>
      </div>
   )
}

export default Statistics
