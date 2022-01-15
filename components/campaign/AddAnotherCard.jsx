import { motion } from "framer-motion";
import Image from "next/image";

const AddAnotherCard = ({ src, name }) => {
  return (
    <div className="flex">
      <div className="m-auto">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Image
            className="m-2 animate-pulse"
            width={100}
            height={100}
            src="/plus.png"
            alt="add new"
          />
        </motion.button>
      </div>
    </div>
  );
};

export default AddAnotherCard;
