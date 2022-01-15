import Image from "next/image";

const ImageCard = ({ src, name }) => {
  return (
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
          #photography
        </span>
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-black bg-[#feff79] rounded-full">
          #travel
        </span>
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-black bg-[#feff79] rounded-full">
          #winter
        </span>
      </div>
    </div>
  );
};

export default ImageCard;
