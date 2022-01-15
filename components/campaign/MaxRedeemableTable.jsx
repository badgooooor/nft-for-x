import { useRecoilState } from "recoil";
import { campaignOptionState } from "../../lib/states";

const OptionAmountInput = ({ name }) => {
  const [campaign, setCampaign] = useRecoilState(campaignOptionState);

  return (
    <input
      onChange={(e) => {
        let newCampaign = { ...campaign };
        newCampaign[name] = { maxRedeemableAmount: e.target.value };
        setCampaign(newCampaign);
      }}
      value={campaign[name].maxRedeemableAmount}
      type="number"
      id="t_shirt_max_amount"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required
    />
  );
};

const MaxRedeemableTable = () => {
  return (
    <table className="max-w-sm table-fixed">
      <thead>
        <tr>
          <th>Item</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <td>T Shirt</td>
          <OptionAmountInput name="TShirt" />
        </tr>
        <tr>
          <td>Hat</td>
          <OptionAmountInput name="Hat" />
        </tr>
        <tr>
          <td>Jacket</td>
          <OptionAmountInput name="Jacket" />
        </tr>
      </tbody>
    </table>
  );
};

export default MaxRedeemableTable;
