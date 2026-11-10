import React from "react";
import { withRouter } from "../utils/withRouter";
import PropTypes from "prop-types";
import { isErrorUser, isProblemUser } from "../utils/Credentials";
import { ROUTES } from "../utils/Constants";
import { ShoppingCart } from "../utils/shopping-cart";
import { InventoryData } from "../utils/InventoryData";
import { calculateOrderTotals } from "../utils/orderCalculations";
import CartItem from "../components/CartItem";
import SwagLabsFooter from "../components/Footer";
import HeaderContainer from "../components/HeaderContainer";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "../components/Button";
import "./CheckOutStepTwo.css";
import { useTranslation } from "../i18n/LanguageContext";

const CheckOutStepTwo = ({ history, location }) => {
  const { t } = useTranslation();
  const clearCart = () => {
    /* istanbul ignore else */
    // No cart clear on order complete for the problem user
    if (isProblemUser()) {
      return;
    } else if (isErrorUser()) {
      // An unfortunate typo! This will be reported to Backtrace
      ShoppingCart.cesetRart();
      return;
    }
    // Wipe out our shopping cart
    ShoppingCart.resetCart();
  };
  const personalInfo = location?.state ?? {};
  const contents = ShoppingCart.getCartContents();
  const { orderTotal, orderTax, orderGrandTotal } = calculateOrderTotals(
    contents,
    { doublePrices: isProblemUser() },
  );

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer secondaryTitle={t("checkout.overview")} />
        <div
          id="checkout_summary_container"
          className="checkout_summary_container"
          data-test="checkout-summary-container"
          role="main"
        >
          <div>
            <div className="cart_list" data-test="cart-list">
              <div
                className="cart_quantity_label"
                data-test="cart-quantity-label"
              >
                {t("cart.quantity")}
              </div>
              <div className="cart_desc_label" data-test="cart-desc-label">
                {t("cart.description")}
              </div>
              {contents.map((item, i) => {
                return <CartItem key={i} item={InventoryData[item]} />;
              })}
            </div>
            <div className="summary_info">
              <div
                className="summary_info_label"
                data-test="payment-info-label"
              >
                {t("checkout.payment")}
              </div>
              <div
                className="summary_value_label"
                data-test="payment-info-value"
              >
                SauceCard #31337
              </div>
              <div
                className="summary_info_label"
                data-test="shipping-info-label"
              >
                {t("checkout.shipping")}
              </div>
              <div
                className="summary_value_label"
                data-test="shipping-info-value"
              >
                {t("checkout.delivery")}
              </div>
              <div className="summary_info_label" data-test="total-info-label">
                {t("checkout.priceTotal")}
              </div>
              <div
                className="summary_subtotal_label"
                data-test="subtotal-label"
              >
                {t("checkout.itemTotal", { total: orderTotal })}
              </div>
              <div className="summary_tax_label" data-test="tax-label">
                {t("checkout.tax", { total: orderTax })}
              </div>
              <div className="summary_total_label" data-test="total-label">
                {t("checkout.total", { total: orderGrandTotal })}
              </div>
              <div className="cart_footer">
                <Button
                  // `cart_cancel_link` has no style function
                  // but is there for backwards compatibility
                  customClass="cart_cancel_link"
                  label={t("checkout.cancel")}
                  onClick={(evt) => {
                    evt.preventDefault();
                    history.push(ROUTES.INVENTORY);
                  }}
                  size={BUTTON_SIZES.MEDIUM}
                  testId="cancel"
                  type={BUTTON_TYPES.BACK}
                />
                <Button
                  customClass="cart_button"
                  label={t("checkout.finish")}
                  onClick={(evt) => {
                    evt.preventDefault();
                    const order = {
                      items: contents.map((itemId) => InventoryData[itemId]),
                      personalInfo,
                      orderTotal,
                      orderTax,
                      orderGrandTotal,
                      orderDate: new Date().toISOString(),
                    };
                    clearCart();
                    history.push(ROUTES.CHECKOUT_COMPLETE, {
                      state: { order },
                    });
                  }}
                  size={BUTTON_SIZES.MEDIUM}
                  testId="finish"
                  type={BUTTON_TYPES.ACTION}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};
CheckOutStepTwo.propTypes = {
  /**
   * The history
   */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  /**
   * The router location, carrying the personal info from checkout step one
   */
  location: PropTypes.shape({
    state: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      postalCode: PropTypes.string,
    }),
  }),
};

export default withRouter(CheckOutStepTwo);
