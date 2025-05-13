"use client";

import VideoPlayer from "./UI/VideoPlayer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function VideosVelemenyekInner() {
  return (
    <section className="">
      <Swiper
        className=""
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={32}
        slidesPerView={3}
        navigation
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide>
          <VideoPlayer src="/videok/visszajelzes1.mp4" poster="/videos/poster.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <VideoPlayer src="/videok/visszajelzes2.mp4" poster="/videos/poster.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <VideoPlayer src="/videok/visszajelzes3.mp4" poster="/videos/poster.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <VideoPlayer src="/videok/visszajelzes4.mp4" poster="/videos/poster.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <VideoPlayer src="/videok/visszajelzes5.mp4" poster="/videos/poster.jpg" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
