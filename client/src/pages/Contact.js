import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src="/images/contact-us.png" alt="contactus" />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">We're here to help, wherever you are!</p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceshop.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012.3456.789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-000
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
