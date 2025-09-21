import React, { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react'; // install with: npm install lucide-react
//calling images
import Joe from '../assets/Team/JoeKnight.jpeg';
import Kishen from '../assets/Team/KishenMitra.jpeg';
import Marat from '../assets/Team/MaratFudim.jpg';
import sue from '../assets/Team/SusanHu.jpeg';

const teamMembers = [//select data from below connected to the team members
  { name: 'Kishen Mitra, BS', role: 'Co-Founder', image: Kishen, bio: 'Med Tech Builder &\nHealth Equity Innovator\nDuke BME alumnus'},
  { name: 'Susan Hu, PhD , MBA', role: 'Co-Founder', image: sue, bio: 'Experienced Life Sciences leader in Product Development, Operations and Strategy' },
  {
    name: 'Joe Knight, PhD, MBA',
    role: 'Business Advisor',
    image: Joe,
    bio: 'CEO, Simpson Interventions\nProfessor, Duke University Biomedical Engineering\nFormer President & CEO, InnAVasc Medical'
  },
  
  {
    name: 'Marat Fudim, MD, MHS',
    role: 'Scientific Advisor',
    image: Marat,
    bio: 'Cardiologist, Duke University\nDuke Health Technology Advisory Group\nMember, AHA'
  },
  
];

const Team: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleBio = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-levita-blue-dark">Meet Our Team</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
            We are a dedicated group of engineers, clinicians, and patient advocates from Duke University.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {teamMembers.map((member, index) => {
  const [transformStyle, setTransformStyle] = useState({});
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    const shadowX = ((x - centerX) / centerX) * 20;
    const shadowY = ((y - centerY) / centerY) * 20;

    setTransformStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      boxShadow: `${-shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`,
      transition: 'transform 0.1s ease, box-shadow 0.1s ease',
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'rotateX(0deg) rotateY(0deg)',
      boxShadow: 'none',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    });
  };

  return (
    <motion.div
      key={index}
      variants={itemVariants}
      className="text-center cursor-pointer"
      onClick={() => toggleBio(index)}
    >
      <div
        className="w-48 h-48 rounded-full mx-auto mb-4"
        style={{
          perspective: '1000px',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={member.image}
          alt={member.name}
          style={transformStyle}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <h3 className="text-xl font-bold text-levita-blue-dark">{member.name}</h3>

      <div className="flex items-center justify-center gap-1 text-levita-blue-light font-medium mt-1">
        <span>{member.role}</span>
        <motion.div
          animate={{ rotate: openIndex === index ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>

      {openIndex === index && (
        <motion.p
          className="text-slate-700 text-sm mt-4 px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {member.bio}
        </motion.p>
      )}
    </motion.div>
  );
})}



        </motion.div>
      </div>
    </section>
  );
};

export default Team;
