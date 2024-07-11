"use client";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>Stay connected with Linkink on social media for the latest updates, style inspiration, and more.</p>
        <div className="social-icons">
          <Link href="#"><img src="/facebook-icon.png" alt="Facebook" /></Link>
          <Link href="#"><img src="/instagram-icon.png" alt="Instagram" /></Link>
          <Link href="#"><img src="/twitter-icon.png" alt="Twitter" /></Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
