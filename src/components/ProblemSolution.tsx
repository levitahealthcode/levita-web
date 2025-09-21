
import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-levita-blue-light flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ProblemSolution: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const cardVariants = (from: 'left' | 'right'): Variants => ({
        hidden: { opacity: 0, x: from === 'left' ? -100 : 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
    });

  return (
    

    <section ref={ref} id="problem-solution" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-levita-blue-dark">The Challenge with Compression</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">Millions experience fatigue and dizziness from poor circulation. While abdominal compression helps, current options are often uncomfortable and ineffective.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="bg-red-50 p-8 rounded-lg border border-red-200"
            variants={cardVariants('left')}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h3 className="text-2xl font-bold text-red-800 mb-4">Existing Products Fall Short</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-center">
                <span className="text-red-500 mr-3">&#10007;</span> Fail to deliver adequate pressure.
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-3">&#10007;</span> Uncomfortable for all-day wear.
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-3">&#10007;</span> One-size-fits-all pressure is not dynamic.
              </li>
               <li className="flex items-center">
                <span className="text-red-500 mr-3">&#10007;</span> Bulky and not discreet under clothing.
              </li>
            </ul>
          </motion.div>
          <motion.div 
            className="bg-green-50 p-8 rounded-lg border border-green-200"
            variants={cardVariants('right')}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h3 className="text-2xl font-bold text-levita-blue-dark mb-4">Uplift Solves the Problem</h3>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start">
                <CheckIcon/> Provides significantly higher, targeted pressure.
              </li>
              <li className="flex items-start">
                <CheckIcon/> User-controlled for on-demand comfort.
              </li>
              <li className="flex items-start">
                <CheckIcon/> Dynamic adjustment for any activity.
              </li>
              <li className="flex items-start">
                <CheckIcon/> Sleek, discreet profile for everyday wear.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
    
  );
};

export default ProblemSolution;
