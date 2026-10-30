import Hero from '../components/Hero';
import LanguageMarquee from '../components/LanguageMarquee';
import Services from '../components/Services';
import Showcase from '../components/Showcase';
import Languages from '../components/Languages';
import PlansTeaser from '../components/PlansTeaser';
import EventsTeaser from '../components/EventsTeaser';
import DonateBand from '../components/DonateBand';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import CtaWaitlist from '../components/CtaWaitlist';
import ContactForm from '../components/ContactForm';

export default function HomePage({ data }) {
  return (
    <>
      <Hero />
      <LanguageMarquee />
      <Services services={data.services} />
      <Showcase />
      <Languages languages={data.languages} />
      <PlansTeaser />
      <EventsTeaser />
      <DonateBand />
      <Testimonials testimonials={data.testimonials} />
      <Team />
      <Faq />
      <CtaWaitlist />
      <ContactForm />
    </>
  );
}
