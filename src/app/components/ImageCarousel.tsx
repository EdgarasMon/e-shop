import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "./../../../styles/carousel.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import Image from "next/image";

export default function ImageCarousel() {
  const [imageIds, setImageIds] = useState([
    "64a66e2973c2621bb760541f",
    "64a67e01c5a8e202d988dd97",
    "64a67f5775115d34687c6245",
  ]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageDataPromises = imageIds.map((id) =>
          axios.get(`http://localhost:3000/items/getImage?id=${id}`, {
            responseType: "arraybuffer",
          })
        );

        const responses = await Promise.all(imageDataPromises);
        const imageBuffers: any = responses.map((response) => response.data);

        setImages(imageBuffers);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [imageIds]);

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        spaceBetween={30}
        centeredSlides={true}
        className='mySwiper'
      >
        {images.map((buffer, index) => (
          <SwiperSlide key={index}>
            {buffer && (
              <Image
                src={`data:image/jpeg;base64,${Buffer.from(buffer).toString(
                  "base64"
                )}`}
                alt='image'
                width={"500"}
                height={"500"}
                style={{ objectFit: "contain" }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
