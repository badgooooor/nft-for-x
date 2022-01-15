const ImageCard = ({ src, name, description }) => {
  return (
    <div className="overflow-hidden rounded-md border border-dark-slate-blue">
      <img className="w-full mb-4" src={src} alt={name} />
      <div className="mx-4 flex justify-between items-center">
        <div className="text-gray-600">Name</div>
        <div>{name}</div>
      </div>
      <div className="mx-4 mb-4">
        <div className="text-gray-600">Description</div>
        <div className="mb-2 text-sm">{description}</div>
      </div>
    </div>
  );
};

export default ImageCard;
