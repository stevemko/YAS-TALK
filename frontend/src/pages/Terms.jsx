import LegalPage from '../components/LegalPage';
import { SITE } from '../config/site';

// REVIEW with a lawyer before you rely on this, and EDIT the refund window and anything
// that does not match how you really run the business.
export default function Terms() {
  return (
    <LegalPage
      title="Terms and refund policy"
      updated="29 October 2026"
      intro={`These terms apply when you use the YasTalk website and app, run by ${SITE.legalName}. By creating an account, paying for a plan or giving a gift, you agree to them.`}
      sections={[
        {
          heading: 'Your account',
          paragraphs: [
            'You must be 18 or over. Give us a real email address and keep your password private. You are responsible for what happens under your account. Tell us straight away if you think someone else has used it.',
          ],
        },
        {
          heading: 'Plans and payments',
          list: [
            'Prices are shown in Kenyan shillings (KSh) and are paid through M-Pesa from this website.',
            'Each successful payment gives you 30 days of the plan you chose. Plans do not renew by themselves: you pay again when you want more time. Paying while your plan is still active adds 30 days on top of the time you have left.',
            'Your plan is linked to your account. We may change plan features and prices, and tell you before a change affects a payment you have not made yet.',
            'The YasTalk app is opening in early access. Features described on this site may arrive in stages.',
          ],
        },
        {
          heading: 'Refunds',
          paragraphs: [
            'If you were charged by mistake, charged twice, or paid but did not get your plan, write to us within 14 days with your M-Pesa code. If we find the problem is ours, we will fix it or refund you to the same M-Pesa number. We do not refund time you have already used.',
          ],
        },
        {
          heading: 'Gifts and donations',
          list: [
            'Gifts are voluntary and support the development of YasTalk. A gift is not a purchase and does not give you ownership of, or rights in, YasTalk.',
            'Gifts are not refundable unless you were charged by mistake or twice. Write to us within 14 days.',
            'Crypto transfers cannot be reversed. Send only on the network shown on the donate page. We cannot recover funds sent to us on another network.',
          ],
        },
        {
          heading: 'Using YasTalk fairly',
          paragraphs: [
            'Do not misuse the service: no attempts to break or overload it, no fraud, and no using translations to harass or deceive people.',
          ],
        },
        {
          heading: 'Translations are not perfect',
          paragraphs: [
            'Machine translation can make mistakes. Do not rely on YasTalk alone for medical, legal, financial or safety decisions. Check important things with a qualified person.',
          ],
        },
        {
          heading: 'Our responsibility',
          paragraphs: [
            'We work hard to keep the service running but cannot promise it will always be available or error-free. To the extent the law allows, we are not responsible for indirect losses, and our total responsibility to you for any problem is limited to the amount you paid us in the 3 months before it happened.',
          ],
        },
        {
          heading: 'Ending your account',
          paragraphs: [
            `You can stop using YasTalk at any time, and ask us to delete your account by writing to ${SITE.supportEmail}. We may suspend accounts that break these terms.`,
          ],
        },
        {
          heading: 'Governing law and changes',
          paragraphs: [
            'These terms are governed by the laws of Kenya. We may update them and will change the date above. Using YasTalk after an update means you accept it.',
          ],
        },
        { heading: 'Contact', paragraphs: [`${SITE.legalName}, ${SITE.address}. Email: ${SITE.supportEmail}`] },
      ]}
    />
  );
}
