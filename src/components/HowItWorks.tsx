import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-levita-blue-dark">See Uplift in Action</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">Watch our short demo to see how easy it is to get on-demand compression and all-day comfort.</p>
        </motion.div>
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
             <iframe 
                className="w-full h-full"
                src="" // add video here 
                title="UpLift compression device demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
             </iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;