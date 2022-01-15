import { atom } from "recoil";

export const campaignOptionState = atom({
  key: "campaignOptionState", // unique ID (with respect to other atoms/selectors)
  default: {
    TShirt: { maxRedeemableAmount: 0 },
    Hat: { maxRedeemableAmount: 0 },
    Jacket: { maxRedeemableAmount: 0 },
  },
});
