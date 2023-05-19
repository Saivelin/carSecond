import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller } from 'swiper';
import CatalogTile from './CatalogTile';
import { useRef } from 'react';
import 'swiper/css';

const YourAnnouncement = ({ ads }) => {

    const test = [{
        img: "/test.png",
        images: ["/test.png", "/test1.png", "/test2.png", "/test3.png"],
        title: "BMW M5 Competition, 2020",
        year: 2020,
        complication: "Полный",
        mileage: 15463,
        type: "Седан",
        consumption: "4.4л / 456 л.с.",
        fuel: "Бензин",
        price: 12995000,
        generation: "Поколение: vi (F90) рестайлинг",
        shiftBox: "Автомат",
    }]

    const slider = useRef()

    return (
        <div className='yourAnnouncement'>
            {console.log(ads)}
            <h4>Ваши объявления</h4>
            <div className="yourAnnouncement__sliderWrapper">
                <img src="/prevarrow.webp" alt="" onClick={() => { slider.current.swiper.slidePrev() }} />
                <Swiper
                    ref={slider}
                    loop={true}
                    className='yourAnnouncement__sliderOfMain'
                    spaceBetween={10}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {ads.map((ad) => {
                        return <SwiperSlide key={ad.id} className='yourAnnouncement__slide'><CatalogTile tile={ad} /></SwiperSlide>
                    })}
                </Swiper>
                <img src="/nextarrow.webp" alt="" onClick={() => { slider.current.swiper.slideNext() }} />
            </div>
            <div className="yourAnnouncement__footer">
                <div className="yourAnnouncement__footer-item">
                    <img src="/heart.webp" alt="" />
                    <p>- 14</p>
                </div>
                <div className="yourAnnouncement__footer-item">
                    <img src="/views.webp" alt="" />
                    <p>- 1217</p>
                </div>
            </div>
        </div>
    );
};

export default YourAnnouncement;