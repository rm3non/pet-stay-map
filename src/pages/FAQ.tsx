import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const faqs = [
    {
      category: 'For Pet Parents',
      questions: [
        {
          q: 'What types of pets are allowed?',
          a: 'Most of our listings welcome dogs and cats of all sizes. Some hosts also accommodate small pets like rabbits or birds. Check the listing details for specific pet policies.',
        },
        {
          q: 'Are there any additional fees for pets?',
          a: 'All pricing is transparent and shown upfront. Some hosts may charge a pet deposit (refundable) or cleaning fee. These are clearly displayed before you book.',
        },
        {
          q: 'What if my booking request is declined?',
          a: 'You won\'t be charged if your booking is declined. You can immediately search for alternative properties without any penalty.',
        },
        {
          q: 'Can I bring multiple pets?',
          a: 'Many hosts accept multiple pets. Check the listing\'s "Max Pets" field and discuss your needs with the host before booking.',
        },
        {
          q: 'What happens if there\'s an emergency during my stay?',
          a: 'Our 24/7 support team is available for emergencies. We also recommend discussing emergency procedures with your host during check-in.',
        },
      ],
    },
    {
      category: 'For Hosts',
      questions: [
        {
          q: 'How much does it cost to list my property?',
          a: 'Listing your property is completely free. We only charge a small service fee (5%) when you successfully complete a booking.',
        },
        {
          q: 'How do I get verified?',
          a: 'Our verification process includes identity verification, property photos, and a quick video call. It typically takes 1-2 business days.',
        },
        {
          q: 'Can I set my own house rules?',
          a: 'Absolutely! You have full control over your house rules, pet size limits, and specific requirements for guests.',
        },
        {
          q: 'How do I handle payments?',
          a: 'All payments are processed securely through PawMigos. Funds are released to you 24 hours after the guest checks in.',
        },
        {
          q: 'What if a pet damages my property?',
          a: 'You can require a refundable pet deposit. Our Host Guarantee also provides additional protection for property damage caused by guests or their pets.',
        },
      ],
    },
    {
      category: 'Booking & Payment',
      questions: [
        {
          q: 'When will I be charged?',
          a: 'For instant bookings, payment is charged immediately. For request-to-book listings, you\'re only charged after the host accepts your request.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets popular in India.',
        },
        {
          q: 'What is your cancellation policy?',
          a: 'Cancellation policies vary by listing. Common options include flexible (full refund up to 24 hours before check-in) and moderate (full refund up to 5 days before check-in).',
        },
        {
          q: 'How does the review system work?',
          a: 'Both guests and hosts can leave reviews after a stay. Reviews are published only after both parties submit them or 14 days have passed.',
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header onAuthClick={() => setAuthModalOpen(true)} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent-mint/10 to-accent-coral/10 py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about PawMigos
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqs.map((category, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem key={qIdx} value={`${idx}-${qIdx}`}>
                        <AccordionTrigger className="text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto mt-16 text-center">
              <div className="bg-muted/50 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Our support team is here to help
                </p>
                <a 
                  href="mailto:support@pawmigos.com"
                  className="text-primary hover:underline font-medium"
                >
                  support@pawmigos.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
