import Image from "next/image";
import Tilt from "react-parallax-tilt";

const ImageCard = ({ src, name }) => {
  return (
    <Tilt>
      <div className="overflow-hidden text-center rounded shadow-lg">
        <Image className="m-2" width={200} height={200} src={src} alt={name} />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold text-black bg-[#f6afca]">
            {name}
          </div>
          <p className="text-base text-gray-700">อ๋องแอ๋ง Go inter</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-black bg-[#feff79] rounded-full">
            #fashion
          </span>
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-black bg-[#feff79] rounded-full">
            #lifestyle
          </span>
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-black bg-[#feff79] rounded-full">
            #nft
          </span>
        </div>
      </div>
    </Tilt>
  );
};

export default ImageCard;
