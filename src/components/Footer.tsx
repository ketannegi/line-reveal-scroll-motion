import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="bg-base text-black px-6 py-16 text-sm">
      <div className="max-w-6xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo + Social */}
          <div>
            <img
              src="/assets/logo.png"
              alt="ENRZY Logo"
              className="w-28 mb-4"
            />
            <div className="flex space-x-4 text-lg">
              <a href="#"> <img src="/assets/facebook.png" alt="" /></a>
              <a href="#"> <img src="/assets/youtube.png" alt="" /></a>
              <a href="#"> <img src="/assets/linkdln.png" alt="" /></a>
              <a href="#"> <img src="/assets/instagram.png" alt="" /></a>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div className="text-left md:text-right">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Middle Row with address + contact */}
        <div className="mt-10 border-t border-orange-400 py-10 flex flex-col md:flex-row justify-between gap-6">
        
          <div className="flex items-center gap-3 max-w-md">
             <img src="/assets/gps.png" alt="" />
            <p className="text-start font-medium">
              Office no. - 214, Tower- B, Noida One, B-8, Rasoolpur Nawada,<br />
              Industrial Area, Sector 62, Noida, Uttar Pradesh 201309
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <img src="/assets/phone-icon.png" alt="" />
              <span className="text-bold">+91 1254567890</span>
            </div>
            <div className="flex items-center gap-2">
                <img src="/assets/mail.png" alt="" />
              <span className="text-bold">hello@enrzy.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="text-center font-medium pt-6 mt-6 border-t border-orange-400 ">
          Copyright © 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
