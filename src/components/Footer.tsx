import Image from "next/image";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { logo } from "@/assets";
const Footer = () => {
  return (
      <div className=" bg-[#0e101b] w-full py-4">
        <div className="container">
        <footer className="flex items-center justify-between bg-[#0e101b] text-white">
        <div className="flex items-center text-white  ">
        <Image src={logo} alt="Logo" height={50} width={50} />
        <h2 className="text-sm md:text-lg font-bold">SPIDER ACADEMY</h2>
      </div>
        
          <div className="flex items-center g-4">
            <a
              href="https://www.youtube.com/@SPIDERS5667"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#13171c] border-[#ffffff1a] rounded-full ml-4 block"
            >
              <FaYoutube size={21} color="#fff" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61552356623053&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#13171c] border-[#ffffff1a] rounded-full ml-4 block"

            >
              <FaFacebook size={21} color="#fff" />
            </a>
            <a
              href="https://www.linkedin.com/company/spiders-for-cyber-security/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#13171c] border-[#ffffff1a] rounded-full ml-4 block"

            >
              <FaLinkedin size={21} color="#fff" />
            </a>
            <a
              href="https://wa.me/201061440936"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#13171c] border-[#ffffff1a] rounded-full ml-4 block"

            >
              <FaWhatsapp size={21} color="#fff" />
            </a>
          </div>
        </footer>
        <hr className="text-white my-4"></hr>
        <div className="text-center">
          <p className="text-white text-sm  ">© 2025 Spider CTF. All rights reserved. </p>
        </div>
        </div>
    </div>
  );
};

export default Footer;
