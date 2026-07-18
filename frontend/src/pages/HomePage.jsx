import Hero from '../components/Hero';
import Services from '../components/Services';
import Languages from '../components/Languages';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import CtaWaitlist from '../components/CtaWaitlist';
import ContactForm from '../components/ContactForm';

export default function HomePage({ data }) {
  return (
    <>
      <Hero />
      <Services services={data.services} />
      <Languages languages={data.languages} />
      <About />
      <Testimonials testimonials={data.testimonials} />
      <CtaWaitlist />
      <ContactForm />
    </>
  );
}
