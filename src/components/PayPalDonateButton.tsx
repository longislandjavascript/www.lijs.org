/* eslint-disable @next/next/no-img-element */
import { FaPaypal } from "react-icons/fa";

export const PayPalDonateButton = () => {
  return (
    <div className="text-center mb-12 p-2 inline-block border-2 border-yellow-500 rounded-lg border-dashed px-12">
      <div className="flex items-center justify-center my-2 gap-2 text-xl font-medium">
        <FaPaypal /> <p>PayPal</p>
      </div>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="2XUNZPV794NGW" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </div>
  );
};
