import { useRecoilState } from "recoil";
import { campaignOptionState } from "../../lib/states";

const MaxRedeemableTable = () => {
  const [campaign, setCampaign] = useRecoilState(campaignOptionState);
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th>Item</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <td>T Shirt</td>
          <td>{campaign["TShirt"].maxRedeemableAmount}</td>
        </tr>
        <tr>
          <td>Hat</td>
          <td>{campaign["Hat"].maxRedeemableAmount}</td>
        </tr>
        <tr>
          <td>Jacket</td>
          <td>{campaign["Jacket"].maxRedeemableAmount}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MaxRedeemableTable;
