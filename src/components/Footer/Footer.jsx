import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#185C32] text-white py-8 px-4 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1: Logo + Description */}
        <div>
          {/* <div className="text-white text-2xl font-bold mb-3">
            <span className="text-yellow-400">y-</span>balash
          </div> */}
          <Image
            src="/imageBanner.png"
            className="pb-[20px] "
            alt="QR Code" 
            width={115} 
            height={115} 
          />
          <p className="text-sm mb-2 font-poppins font-medium text-[21px] text-[#FAFAFA] ">Order products the easy way</p>
          <div className="font-poppins font-light text-[17px] text-[#FAFAFA] py-3 " >Find out the nearest shops, restaurants and cafes.</div>
          <p className="font-poppins font-light text-[17px] text-[#FAFAFA] py-3  leading-relaxed">
            The best products at the lowest prices, with continuous discounts and exclusive deals.
            You’ll find everything you need here with high quality and affordable costs.
          </p>
        </div>

        {/* Column 2: Account */}
        <div>
          <h3 className="font-semibold font-poppins mb-3 text-[#FAFAFA] text-[26px] ">Account</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline font-poppins font-light text-[#FAFAFA] text-[20px] ">My Account</a></li>
            <li><a href="#" className="hover:underline font-poppins font-light text-[#FAFAFA] text-[20px]">Login / Register</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="font-semibold font-poppins mb-3 text-[#FAFAFA] text-[26px] text-lg">Support</h3>
          <ul className="text-sm space-y-2">
            <li className=" font-poppins font-light text-[#FAFAFA] text-[20px] ">111 Eltahreer street, cairo.</li>
            <li className=" font-poppins font-light text-[#FAFAFA] text-[20px] ">teem-ala-allah@gmail.com</li>
            <li className=" font-poppins font-light text-[#FAFAFA] text-[20px] ">010-1010-000-11</li>
          </ul>
        </div>

        {/* Column 4: Download App + QR + Social */}
        <div>
          <h3 className="font-semibold font-poppins mb-3 text-[#FAFAFA] text-[26px] ">Download App</h3>
          <p className=" font-poppins font-medium text-[17px] text-[#FAFAFA] mb-3">Save $3 with App New User Only</p>
          <div className="flex items-center gap-5 mb-4">
            <Image
             src="/QRCode.jpg" 
             alt="QR Code" 
             width={120} 
             height={120} 
             className="relative b-[30px] "
            />
            <div className="flex flex-col gap-2">
              <Image
               src="/AppStore.png" 
               alt="Google Play" 
               width={120} 
               height={40} 
            //    className="mt-[-46px]"
               />
              <Image 
                src="/GooglePlay.png" 
                alt="App Store" 
                width={120} 
                height={40} 
                className=" mt-[-70px] "
               />
            </div>
          </div>
          <div className="flex gap-16 text-white text-xl">
            <a href="https://www.facebook.com/share/15SRuTT9Wa/?mibextid=wwXIfr"><FaFacebookF /></a>
            <a href="https://www.instagram.com/eslam_elramady?igsh=MXNoc3FneGMwMzF6ZQ%3D%3D&utm_source=qr"><FaInstagram /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="https://www.linkedin.com/in/eslam-mohamed-871180348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
