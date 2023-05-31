import image1 from '../assets/img/slider/slider-1.png';
import image2 from '../assets/img/slider/slider-2.png';
import image3 from '../assets/img/slider/slider-3.png';
import image4 from '../assets/img/slider/slider-4.png';
import image5 from '../assets/img/slider/slider-5.png';

export const createSlider = () => {
  const imagesContainer = document.querySelector('.slider-container__images');
  const images = [image1, image2, image3, image4, image5];

  images.forEach(img => {
    const image = new Image();
    image.src = img;
    imagesContainer.append(image);
  });
};

export const handleSliderButtonClick = (e) => {
  const imagesContainer = document.querySelector('.slider-container__images');
  const sliderbuttons = document.querySelectorAll('.slider__buttons__item');
  const width = 550;

  imagesContainer.style.transform = `translateX(-${width * (e.target.value - 1)}px)`;

  sliderbuttons.forEach(button => button.classList.remove('active'));
  e.target.classList.add('active');
};