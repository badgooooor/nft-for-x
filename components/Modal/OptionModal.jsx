import { useEffect, useState } from 'react';
import ImageCard from '../../components/campaign/ImageCard';

function OptionItem({ optionId, setSelectedItem, selectedItem }) {
	const imageData = {
		0: {
			src: '/collection/tshirt.jpg',
			name: 'T Shirt',
			description: 'Shirt engraved with awesomeness',
		},
		1: {
			src: '/collection/hat.jpg',
			name: 'Hat',
			description: 'Hat showing how sultan you are',
		},
		2: {
			src: '/collection/jacket.jpg',
			name: 'Jacket',
			description: 'Jacket that make you drip like rockstar',
		},
	};

	return (
		<div>
			<div
				className="max-w-xs rounded"
				onClick={(e) => {
					setSelectedItem(optionId);
				}}
			>
				<ImageCard
					selected={selectedItem === optionId}
					src={imageData[optionId].src}
					name={imageData[optionId].name}
					description={imageData[optionId].description}
				/>
			</div>
		</div>
	);
}

export default function OptionModal({
	showModal,
	setShowModal,
	tokenId,
	redeem,
	approve,
	isTokenApproved,
	isModalLoading,
}) {
	const [optionItems, setOptionItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState();

	useEffect(() => {
		getOptionItems();
	}, []);

	async function getOptionItems() {
		setOptionItems([0, 1, 2]);
	}

	async function redeemItem() {
		if (!selectedItem) return alert('Please select an item to redeem');

		await redeem(selectedItem);
		setShowModal(false);
		setSelectedItem(null);
	}

	if (!showModal) return '';

	return (
		<>
			<div
				className="fixed z-10 inset-0 overflow-y-auto"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<div
						className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
						aria-hidden="true"
					></div>

					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>

					<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
						<div className="bg-white px-4 pt-5 pb-4">
							<div className="sm:flex sm:items-start">
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									{/* START BODY */}
									<div className="mb-6">
										<h3 className="font-bold text-3xl mb-2" id="modal-title">
											Redeem your token
										</h3>

										<h3 className="font-bold text-2xl mb-2" id="modal-title">
											Your token (#{tokenId})
										</h3>
										<div className="mt-2">
											<img
												className="max-w-xs"
												src="https://gateway.pinata.cloud/ipfs/QmX8AsKPQEtURv9rykLodLXCs9PhsAtGycyZSQXN7TAFa5"
												alt="Historical Item"
											/>
										</div>
									</div>
									<h3 className="font-bold text-2xl mb-2" id="modal-title">
										Select an item to redeem
									</h3>
									<div className="grid grid-cols-3 gap-4">
										{optionItems.map((optionId) => (
											<OptionItem
												key={optionId}
												optionId={optionId}
												selectedItem={selectedItem}
												setSelectedItem={setSelectedItem}
											/>
										))}
									</div>

									{/* END BODY */}
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								className="hover:bg-black-100 text-red-500 font-medium rounded-md px-8 py-2"
								type="button"
								onClick={() => {
									setShowModal(false);
									setSelectedItem(null);
								}}
							>
								Cancel
							</button>
							{isTokenApproved ? (
								<button
									className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-8 py-2"
									type="button"
									onClick={() => {
										if (!isModalLoading) redeemItem();
									}}
								>
									{isModalLoading ? 'Loading...' : 'Redeem'}
								</button>
							) : (
								<button
									className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-8 py-2"
									type="button"
									onClick={() => {
										if (!isModalLoading) approve();
									}}
								>
									{isModalLoading ? 'Loading...' : 'Approve'}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
