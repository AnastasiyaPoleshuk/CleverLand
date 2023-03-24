import { useState } from 'react';
import { FreeMode, Navigation, Pagination, Swiper as ISwiper, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import altPath from '../../assets/icon_cat.png';
import { IBookImage } from '../../types/apiTypes';
import { CONSTANTS } from '../../utils/constants'

import './ImgSlider.scss';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';


interface Iprops {
    img: IBookImage[],
}

export function ImgSlider(props: Iprops) {
    const { img } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<ISwiper | null>(null);

    return (
        <div className="slider__wrapp">
            <Swiper
                spaceBetween={20}
                navigation={true}
                pagination={{ clickable: true, }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="swiper-main"
                data-test-id='slide-big'
            >
                {
                    img.length === 0 ?
                        <SwiperSlide>
                            <img src={altPath} alt="фото книги" className={img.length > 0 ? 'main-info__img' : 'main-info__img-alt'} />
                        </SwiperSlide>
                        : img.map((item) => <SwiperSlide key={item.url} >
                            <img src={`${CONSTANTS.URL}${item.url}`} alt="фото книги" className="main-info__img" />
                        </SwiperSlide>
                        )
                }
            </Swiper>
            <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                spaceBetween={32}
                slidesPerView={img.length > 5 ? 5 : img.length}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper-mini"
            >
                {
                    img.length <= 1 ?
                        null
                        : img.map((item) => <SwiperSlide key={item.url} data-test-id='slide-mini'>
                            <img src={`${CONSTANTS.URL}${item.url}`} alt="фото книги" className="slide" />
                        </SwiperSlide>
                        )
                }
            </Swiper>
        </div>
    );
}
