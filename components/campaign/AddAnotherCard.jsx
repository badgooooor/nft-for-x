import Image from "next/image";

const AddAnotherCard = ({ src, name }) => {
  return (
    <div className="flex overflow-hidden rounded shadow-lg">
      <div className="m-auto">
        <Image
          className="m-2"
          width={150}
          height={150}
          src="/plus.png"
          alt="add new"
        />
      </div>
    </div>
  );
};

export default AddAnotherCard;
