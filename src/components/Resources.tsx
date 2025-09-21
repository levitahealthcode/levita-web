
import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

const resources = [
  {
    type: 'Podcast Interview',
    title: 'The POTScast: Innovating Compression with Levita Health',
    description: 'Listen to our founders discuss the journey of creating Uplift and our mission to help the POTS community.',
    link: 'https://www.standinguptopots.org/potscast/e238xxx/',
    linkText: 'Listen Now'
  },
  {
    type: 'Community Event',
    title: 'Dysautonomia International Conference',
    description: 'We were honored to present our initial findings and connect with patients and families at the annual DI Conference.',
    link: 'https://www.dysconf.org/',
    linkText: 'Learn More'
  },
  {
    type: 'Awareness Campaign',
    title: 'Sears Tower Lighting for POTS Awareness',
    description: 'We joined the community in celebrating POTS Awareness Month by participating in the iconic Chicago landmark lighting event.',
    link: 'https://dysautonomiainternational.org/page.php?ID=223', //this is temp link add real link when ready
    linkText: 'See Highlights'
  }
];

const Resources: React.FC = () => {
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
    <section id="resources" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-levita-blue-dark">In the Community</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">From publications to patient advocacy, we are committed to advancing the conversation around circulatory health.</p>
        </motion.div>
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {resources.map((resource, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-levita-blue-light flex flex-col">
              <span className="text-sm font-bold text-levita-blue-light mb-2">{resource.type}</span>
              <h3 className="text-xl font-bold text-levita-blue-dark mb-3 flex-grow">{resource.title}</h3>
              <p className="text-slate-600 mb-4">{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-levita-blue-dark font-bold hover:text-levita-blue-light self-start">
                {resource.linkText} &rarr;
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;
