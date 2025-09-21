import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
// add useScroll and useTransform back when image is given
// import hero from '../assets/hero.png';
const AboutUs: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ['start end', 'end start']
  // });
  // const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };
  
  // const imageVariants: Variants = {
  //   hidden: { opacity: 0, x: 50 },
  //   visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  // };

  return (
    
    

      <section ref={sectionRef} id="about" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <span className="font-bold text-levita-blue-light">OUR STORY</span>
              <h1 className="text-3xl md:text-4xl font-bold text-levita-blue-dark mt-2 mb-6">
                Born from a Clinical Need
              </h1>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                                      Levita Health emerged from years of
                      research and development through
                      Duke University's Design Health
                      program. In 2021, a cardiologist
                      approached our team about
                      inadequate compression solutions
                      for patients experiencing
                      circulation-related symptoms.
                </p>
                <p>
                  This conversation revealed a broad market gap: existing products often fail to
                  deliver meaningful pressure while remaining comfortable enough for daily life.
                  After extensive prototype development and clinical validation at Duke, Levita
                  Health was founded to bring Uplift, our breakthrough compression technology, to
                  market.
                </p>
                <p className="font-semibold text-levita-blue-dark">
                  Our mission is to be your trusted partner, offering a data-driven solution you
                  can rely on for a better quality of life.
                </p>
              </div>
            </motion.div>

            {/* <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="rounded-lg shadow-xl overflow-hidden">
                <motion.img
                  style={{ y }}
                  src={hero}
                  alt="Duke University engineers behind Uplift adjustable abdominal compression"
                  className="object-cover"
                />
              </div>
            </motion.div> */}
          </div>
        </div>
      </section>
    
  );
};

export default AboutUs;
