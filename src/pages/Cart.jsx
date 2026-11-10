import React from "react";
import { withRouter } from "../utils/withRouter";
import { ROUTES } from "../utils/Constants";
import { ShoppingCart } from "../utils/shopping-cart";
import { InventoryData } from "../utils/InventoryData";
import CartItem from "../components/CartItem";
import SwagLabsFooter from "../components/Footer";
import HeaderContainer from "../components/HeaderContainer";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "../components/Button";
import "./Cart.css";
import { isVisualUser } from "../utils/Credentials";
import { useTranslation } from "../i18n/LanguageContext";

const Cart = ({ history }) => {
  const contents = ShoppingCart.getCartContents();
  const buttonClass = `checkout_button ${
    isVisualUser() ? "btn_visual_failure" : ""
  }`;
  const { t } = useTranslation();

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer secondaryTitle={t("cart.title")} />
        <div
          id="cart_contents_container"
          className="cart_contents_container"
          data-test="cart-contents-container"
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
              {contents.map((item, i) => (
                <CartItem key={i} item={InventoryData[item]} showButton />
              ))}
            </div>
            <div className="cart_footer">
              <Button
                label={t("cart.continue")}
                onClick={(evt) => {
                  evt.preventDefault();
                  history.push(ROUTES.INVENTORY);
                }}
                size={BUTTON_SIZES.MEDIUM}
                testId="continue-shopping"
                type={BUTTON_TYPES.BACK}
              />
              <Button
                label={t("cart.checkout")}
                // `checkout_button` has no style function
                // but is there for backwards compatibility
                customClass={buttonClass}
                onClick={(evt) => {
                  evt.preventDefault();
                  history.push(ROUTES.CHECKOUT_STEP_ONE);
                }}
                size={BUTTON_SIZES.MEDIUM}
                testId="checkout"
                type={BUTTON_TYPES.ACTION}
              />
            </div>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};

export default withRouter(Cart);
