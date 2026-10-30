import LegalPage from '../components/LegalPage';
import { SITE } from '../config/site';

// REVIEW with a lawyer before you rely on this. It describes what the site really does today:
// if you add a new service or collect something new, update the matching section.
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="29 October 2026"
      intro={`${SITE.legalName} ("we", "us") runs the YasTalk website and app. This page explains what personal information we collect, why, and the choices you have. We follow the Kenya Data Protection Act, 2019.`}
      sections={[
        {
          heading: 'What we collect',
          list: [
            'Account details: your name, email address, optional phone number, and a password that we store only in scrambled (hashed) form.',
            'Plan payments: the plan, amount, date, the phone number used for M-Pesa and the M-Pesa receipt code. We never see your M-Pesa PIN.',
            'Donations: the amount, method and date, plus any name, email, message and phone number you choose to give. For crypto we keep the transaction hash you send us. Crypto transfers are public on the blockchain.',
            'Messages and waitlist: what you write to us and the email you give to join the waitlist.',
            'Security records: login attempts with the time, IP address and browser type, so we can spot and block abuse.',
          ],
        },
        {
          heading: 'Why we use it',
          list: [
            'To run your account and give you the plan you paid for.',
            'To process payments and gifts and send receipts.',
            'To confirm your email, reset forgotten passwords and tell you about important account changes.',
            'To answer your messages and, if you joined the waitlist, tell you when the app opens.',
            'To keep the service secure and prevent fraud.',
          ],
        },
        {
          heading: 'Who we share it with',
          paragraphs: [
            'We do not sell your personal information. We use trusted companies to run the service, and they only receive what they need:',
          ],
          list: [
            'Safaricom (M-Pesa) to take payments and gifts.',
            'Paystack to take card gifts. Your card details go to Paystack, never to us.',
            'Brevo to send our emails.',
            'Neon, Render and Vercel for our database and hosting, and Cloudinary for images.',
          ],
        },
        {
          heading: 'How long we keep it',
          paragraphs: [
            'We keep your account for as long as you have it. We keep payment and donation records for as long as the law requires us to for accounting and tax. When we no longer need information, we delete it or make it anonymous.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            `You can ask us to show you the information we hold about you, correct it, delete it, or stop using it for a purpose. Write to ${SITE.supportEmail} and we will reply promptly. If you are unhappy with how we handled your request, you can complain to the Office of the Data Protection Commissioner in Kenya.`,
          ],
        },
        {
          heading: 'Security',
          paragraphs: [
            'We protect your information with encrypted connections, hashed passwords, limits on login attempts and restricted access. No system is perfectly secure, so please use a strong, unique password.',
          ],
        },
        {
          heading: 'Children',
          paragraphs: ['YasTalk accounts and payments are for people aged 18 and over.'],
        },
        {
          heading: 'Changes to this policy',
          paragraphs: ['If we change this policy we will update the date at the top and, for big changes, tell you by email.'],
        },
        {
          heading: 'Contact',
          paragraphs: [`${SITE.legalName}, ${SITE.address}. Email: ${SITE.supportEmail}`],
        },
      ]}
    />
  );
}
