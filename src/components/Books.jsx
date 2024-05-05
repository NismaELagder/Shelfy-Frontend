import React, { useContext } from "react";
import { BooksContext } from "../store/BooksContextProvider.jsx";
import Book from "./Book.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BOOKS_CAROUSEL_RESPONSIVE from '../utils/utils.jsx';
import { findIsFav } from "../composables/toggleFavBook";

const Books = () => {
  const { books } = useContext(BooksContext);
  return (
    <div className="h-[92vh] pt-4 bg-white w-full flex flex-col">
      {
        Object.keys(books).map((key) => (
          <div className="flex flex-col pb-4 border-b border-stone-200" key={`${key}_category`}>

            <div className="capitalize text-xl font-medium pt-4 pb-1" key={`${key}_carousel_wrapper`}>{key}</div>
            {/* <div className="flex flex-wrap  max-[351px]:justify-around overflow-y-auto h-[335px] sm:h-[385px]"> */}
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className="h-[335px] sm:h-[385px] "
              containerClass="container-with-dots pb-8 h-[335px] sm:h-[385px]"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite={true}
              itemClass="mx-auto w-[160px] sm:w-[190px] carousel-item-padding-10-px"
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={BOOKS_CAROUSEL_RESPONSIVE}
              partialVisible={true}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {
                books[key].map(book => (
                  <Book bookInfo={book} isFav={findIsFav(book._id)} key={book._id} />
                ))
              }</Carousel>
            {/* </div> */}
          </div>
        ))
      }
    </div>
  );
};

export default Books;
