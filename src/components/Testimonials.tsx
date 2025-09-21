
import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const testimonials = [
  {
    quote: "Despite following all the lifestyle modifications - high salt, increased fluids, exercises - I still struggle during flare-ups. As a teacher, I need a solution that works with my active lifestyle.",
    name: 'Emma C',
    title: 'POTS Patient and High School Teacher',
  },
  {
    quote: "I often recommend post-surgical abdominal binders to my neurogenic orthostatic hypotension patients because that's what's available, but these products weren't designed for this purpose",
    name: 'Dr. Camille Frazier-Mills',
    title: 'Cardiologist at Duke Health',
  },
  {
    quote: 'Watching my daughter go from competitive athlete to struggling to stand was heartbreaking. We refuse to accept that nothing more can be done',
    name: 'Jennifer G',
    title: 'Mother and Patient Advocate',
  }
];

const Testimonials: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-levita-blue-dark">What People Are Saying</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">We are building Uplift in close collaboration with patients and clinicians.</p>
        </motion.div>
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <div className="text-levita-blue-light mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                </svg>
              </div>
              <p className="text-slate-600 italic flex-grow">"{testimonial.quote}"</p>
              <div className="mt-6">
                <p className="font-bold text-levita-blue-dark">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
