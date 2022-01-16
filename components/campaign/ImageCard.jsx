import Tilt from 'react-parallax-tilt';

const ImageCard = ({ src, name, description, selected }) => {
	return (
		<Tilt>
			<div
				className={`overflow-hidden shadow-lg rounded-md border border-dark-slate-blue ${
					selected && 'border-4'
				}`}
			>
				{selected && (
					<div className="absolute rounded mx-2 px-2 my-2 text-white bg-green-600">
						Selected
					</div>
				)}
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
		</Tilt>
	);
};

export default ImageCard;
