import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';

import './Testimonials.scss';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const testimonialsQuery = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(testimonialsQuery).then(data => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then(data => {
      setBrands(data);
    });
  }, []);

  const testimonial = testimonials[currentIndex];

  const handleClick = index => setCurrentIndex(index);

  return (
    <>
      {testimonials.length && (
        <>
          <div className='app__testimonials--testimonial'>
            <img
              src={testimonial.imgurl ? urlFor(testimonial.imgurl) : ''}
              alt='testimonial'
            />

            <div className='app__testimonials--testimonial-content'>
              <p className='p-text' style={{ whiteSpace: 'pre-wrap' }}>
                {testimonial.feedback
                  .replaceAll('  ', ' ')
                  .split('. ')
                  .join('.\n')}
              </p>

              <div>
                <h4 className='bold-text'>{testimonial.name}</h4>
                <h5 className='p-text'>{testimonial.company}</h5>
              </div>
            </div>
          </div>

          <div className='app__testimonials--btns app__flex'>
            <div
              className='app__flex'
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className='app__flex'
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>

          <div className='app__testimonials--brands app__flex'>
            {brands.map(brand => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, type: 'tween' }}
                key={brand._id}
              >
                <img src={urlFor(brand.imgUrl)} alt={brand.name} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonials, 'app__testimonials'),
  'testimonials',
  'app__whitebg'
);
