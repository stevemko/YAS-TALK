import Hero from '../components/Hero';
import Services from '../components/Services';
import Languages from '../components/Languages';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import CtaWaitlist from '../components/CtaWaitlist';
import ContactForm from '../components/ContactForm';

export default function HomePage({ data }) {
  return (
    <>
      <Hero />
      <Services services={data.services} />
      <Languages languages={data.languages} />
      <Team />
      <Testimonials testimonials={data.testimonials} />
      <CtaWaitlist />
      <ContactForm />
    </>
  );
}