
import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import ObjViewer from './ObjViewer';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
    ),
    title: 'User-Controlled Adjustment',
    description: 'Our innovative cinching mechanism allows you to adjust compression levels on-demand for personalized comfort and support throughout your day.'
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: 'Targeted, High-Pressure Delivery',
    description: 'Uplift is engineered to deliver significantly higher pressure to the abdomen compared to existing options, effectively improving circulation.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    title: 'Designed for your Daily Life',
    description: 'With a sleek, low-profile design, Uplift is discreet under clothing, allowing you to wear it comfortably and confidently anywhere.'
  }
];

const ProductFeatures: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 1 }, // Parent doesn't fade, just orchestrates children
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="product" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div 
            ref={ref}
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-levita-blue-dark">Compression on Your Terms</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">Uplift is patent-pending technology designed for real-world impact.</p>
        </motion.div>
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform transform hover:-translate-y-2">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-levita-blue-light text-white mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-levita-blue-dark mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
         <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <ObjViewer />
            <p className="text-sm text-slate-500 mt-2 italic">*Product rendering. Not actual device. Dial magnified for detail.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductFeatures;
