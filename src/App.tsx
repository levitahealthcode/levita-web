// App.tsx
import React from 'react';
import SEO from './components/SEO';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import ProductFeatures from './components/ProductFeatures';
//import HowItWorks from './components/HowItWorks';
import Awards from './components/Awards';
import AboutUs from './components/AboutUs';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Resources from './components/Resources';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
{ /*import CookieBanner from './components/CookieBanner'; */}

const App: React.FC = () => {
  
  return (
    <div className="bg-white font-raleway text-slate-800">
      <SEO
        title="Levita Health | Smarter Circulation"
        description="Uplift by Levita Health is a patent-pending abdominal compression device that’s comfortable, discreet, and adjustable for everyday wear."
        canonical="https://levitahealth.com/"
        og={{
          type: 'website',
          url: 'https://levitahealth.com/',
          site_name: 'Levita Health',
          image: 'https://levitahealth.com/og/og-home.webp',
          title: 'Levita Health – Uplift Abdominal Compression Device',
          description:
            'Discover Uplift—adjustable abdominal compression for POTS, orthostatic hypotension, and fatigue relief. Comfortable, discreet, clinically informed.',
        }}
        twitter={{
          card: 'summary_large_image',
          image: 'https://levitahealth.com/og/og-home.webp',
          title: 'Levita Health – Uplift Abdominal Compression Device',
          description:
            'User-controlled, comfortable, and discreet abdominal compression for real-world support.',
        }}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Levita Health',
            url: 'https://levitahealth.com',
            logo: 'https://levitahealth.com/logo.png',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Levita Health',
            url: 'https://levitahealth.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://levitahealth.com/search?q={query}',
              'query-input': 'required name=query',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Uplift Adjustable Abdominal Compression',
            brand: { '@type': 'Brand', name: 'Levita Health' },
            description:
              'A user-controlled abdominal compression device delivering targeted, higher-pressure support in a discreet, everyday design.',
            url: 'https://levitahealth.com/',
            image: 'https://levitahealth.com/og/og-home.webp',
            additionalProperty: [
              { '@type': 'PropertyValue', name: 'Adjustment', value: 'On-demand, user-controlled compression' },
              { '@type': 'PropertyValue', name: 'Pressure', value: 'Targeted, higher-pressure delivery to the abdomen' },
              { '@type': 'PropertyValue', name: 'Design', value: 'Low-profile, discreet under clothing' },
            ],
          },
        ]}
      />

      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <ProductFeatures />
       { /* <HowItWorks /> */ }
        <Awards />
        <AboutUs />
        <Team />
        <Testimonials />
        <Resources />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      { /* <CookieBanner /> */}
    </div>
  );
};

export default App;
