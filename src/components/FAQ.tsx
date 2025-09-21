import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "How is Uplift different from currently available abdominal binders?",
    answer:"Uplift differs from traditional abdominal binders in its ability to provide on demand, adjustable abdominal support at therapeutic pressures when you need it.  The pressure can be easily and discreetly be reduced or removed no longer required. The adjustable therapeutic pressure provides symptom relief coupled with all day comfort."  },
  {
    question: "What conditions can Uplift help with?",
    answer: "Uplift can help with any condition where enhanced venous return is required.  For example, some people with dysautonomia  may suffer from poor venous return. Compression in the abdomen area can improve venous return.",
  },
  {
    question: "Is Uplift comfortable to wear all day?",
    answer: "Yes. The ability to apply therapeutic pressure only when needed enhances the all day comfort of Uplift.",
  },
  {
    question: "When will Uplift be available for purchase?",
    answer: "Uplift is targeted for launch in 1H2027.",
  },
  {
    question: "Is Uplift meant to be worn under or over clothing?",
    answer: "While Uplift may be worn under or over clothing;  the comfortable fabric and low profile dial may be worn discreetly under normal fitting clothing such as a tee shirt, sweater or blouse.  It may be somewhat noticeable under tight (e.g. spandex) knitwear.",
  },
  {
    question: "Do I need a prescription for Uplift?",
    answer:"No. Uplift will be a direct to consumer product.",
  }
];

const FaqItem: React.FC<{ item: typeof faqData[0], isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200">
      <button
        className="w-full flex justify-between items-center text-left py-5 px-6"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-levita-blue-dark">{item.question}</span>
        <motion.span 
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl text-levita-blue-light"
        >
            {isOpen ? '−' : '+'}
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <p className="p-6 pt-0 text-slate-600 leading-relaxed">{item.answer}</p>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-levita-blue-dark">Frequently Asked Questions</h2>
        </motion.div>
        <motion.div 
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;