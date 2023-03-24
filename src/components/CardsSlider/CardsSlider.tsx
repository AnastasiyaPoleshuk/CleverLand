import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './CardsSlider.scss';

export const CardsSlider = ({ cards }: { cards: JSX.Element[] }) => (
    <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={true}
        modules={[Pagination]}
        className="cards-swiper"
        data-test-id='history'

    >
        {
            cards && cards.map(card => <SwiperSlide className="cards-swiper__item" key={card.key} data-test-id='history-slide'>{card}</SwiperSlide>)
        }
    </Swiper>
)
