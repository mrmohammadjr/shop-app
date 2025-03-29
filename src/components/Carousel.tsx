import React from 'react'
import 'keen-slider/keen-slider.min.css' 
import { useKeenSlider } from 'keen-slider/react'
// import from 'keen-slider/react.es' for to get an ES module 
type CarouselType = {
  images : string[]
}
const CarouselComponent = ({images}:CarouselType) => {
  const [sliderRef, instanceRef] = useKeenSlider(
    { slideChanged() {
      console.log('slide changed')
      }, 
    }, [ 
      // add plugins here
      ] 
    ) 
  return (
    <div ref={sliderRef} className="keen-slider"> 
      {images.map((item)=>(
        <div className="keen-slider__slide">
          <img src={item} className="lg:ml-[22%]" />
        </div>
      ))}
    </div> 
    )
  } 
export default CarouselComponent