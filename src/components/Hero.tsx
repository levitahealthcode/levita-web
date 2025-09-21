
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import heroimage from '../assets/heroimage.jpg';
const Hero: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
  
    <section ref={sectionRef} id="home" className="pt-32 pb-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center md:text-left">
            <motion.span variants={itemVariants} className="block text-sm font-bold tracking-widest text-levita-blue-light uppercase mb-2">Uplift, a Levita Health Innovation</motion.span>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-levita-blue-dark mb-4 leading-tight">
              On-demand compression, all-day comfort.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-8">
              Introducing Uplift, a user-controlled abdominal compression device that provides dynamic support when you need it most. Redefining compression therapy.
            </motion.p>
            <motion.div variants={itemVariants} className="flex justify-center md:justify-start space-x-4">
            {/* <a href="#contact" className="bg-levita-blue-light text-white font-bold py-3 px-8 rounded-full hover:bg-levita-blue-dark transition-transform transform hover:scale-105 shadow-lg">
                Join the Waitlist
              </a>  */}
              <a href="#product" className="bg-transparent text-levita-blue-dark font-bold py-3 px-8 rounded-full border-2 border-levita-blue-dark hover:bg-levita-blue-dark hover:text-white transition-colors">
                Learn More about Uplift

              </a>
            </motion.div>
          </div>
          <motion.div variants={imageVariants} className="overflow-hidden rounded-lg">
            <motion.img style={{ y }} src={heroimage} alt="Uplift Compression Device" className="rounded-lg shadow-2xl mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
    
  );
};

export default Hero;
