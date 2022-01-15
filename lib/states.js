import { atom } from "recoil";

export const campaignOptionState = atom({
  key: "campaignOptionState", // unique ID (with respect to other atoms/selectors)
  default: {
    TShirt: { maxRedeemableAmount: 0 },
    Hat: { maxRedeemableAmount: 0 },
    Jacket: { maxRedeemableAmount: 0 },
  },
});

export const myCampaignState = atom({
  key: "myCampaignState",
  default: [
    {
      campaignName: "Ong Ang's Winter Collection",
      redeemCount: 100,
      items: { tShirt: 0, hat: 2, jacket: 2 },
      nft: ["0x1234", "0x1223"],
    },
  ],
});
