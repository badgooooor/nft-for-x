const MyCampaignTable = () => {
  return (
    <div className="flex flex-col max-w-3xl">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Campaign Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Redeem Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    NFT
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {"Ong Ang's Winter Collection"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">100</td>
                  <td className="px-6 py-4 space-x-2 text-sm whitespace-nowrap">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#f4c9e7] rounded-full">
                      T Shirt x 0
                    </span>
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#f4c9e7] rounded-full">
                      Hat x 0
                    </span>
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#f4c9e7] rounded-full">
                      Jacket x 0
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2 text-sm whitespace-nowrap">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#feff79] rounded-full">
                      0x122324325432
                    </span>
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-[#feff79] rounded-full">
                      0x122324325a32
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCampaignTable;
