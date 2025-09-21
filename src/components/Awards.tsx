
import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const awards = [
  { name: 'PDMA Global Student Innovation Challenge', status: 'Winner' },
  { name: 'Stu Clark New Venture Championships', status: 'Graduate Finalist' },
];

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);


const Awards: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

  return (
    <section ref={ref} id="awards" className="py-16 bg-levita-blue-dark">
      <motion.div 
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid md:grid-cols-3 gap-8 items-center">
            <motion.div variants={itemVariants} className="md:col-span-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white">Recognized for Innovation</h2>
            </motion.div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
            {awards.map((award, index) => (
                <motion.div variants={itemVariants} key={index} className="flex items-center">
                    <div className="bg-levita-blue-light/50 p-3 rounded-full mr-4">
                        <TrophyIcon />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white text-lg">{award.name}</h3>
                        <p className="text-levita-blue-light font-medium">{award.status}</p>
                    </div>
                </motion.div>
            ))}
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Awards;
