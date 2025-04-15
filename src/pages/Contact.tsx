
import React from 'react';
import {
  ContactHeader,
  ContactInfo,
  LocationMap,
  ContactForm,
  FAQ
} from '@/components/contact';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <ContactHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left sidebar with contact info */}
        <div className="lg:col-span-2 space-y-6">
          <ContactInfo />
          <LocationMap />
        </div>
        
        {/* Right side with contact form */}
        <ContactForm />
      </div>
      
      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default ContactPage;
