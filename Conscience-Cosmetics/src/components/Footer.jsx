import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'transparent', color: 'white' }} className="footer footer-center text-base-content p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Conscience Cosmetics Ltd</p>
      </aside>
    </footer>
  );
}

export default Footer;

