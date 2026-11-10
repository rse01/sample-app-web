import React, { useState } from "react";
import { withRouter } from "../utils/withRouter";
import PropTypes from "prop-types";
import { isProblemUser, isErrorUser } from "../utils/Credentials";
import { ROUTES } from "../utils/Constants";
import SwagLabsFooter from "../components/Footer";
import HeaderContainer from "../components/HeaderContainer";
import InputError, { INPUT_TYPES } from "../components/InputError";
import ErrorMessage from "../components/ErrorMessage";
import SubmitButton from "../components/SubmitButton";
import Button, { BUTTON_SIZES, BUTTON_TYPES } from "../components/Button";
import "./CheckOutStepOne.css";
import { useTranslation } from "../i18n/LanguageContext";

const CheckOutStepOne = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const dismissError = () => {
    setError("");
  };
  const handleFirstNameChange = (evt) => {
    setFirstName(evt.target.value);
  };
  const handleLastNameChange = (evt) => {
    if (isProblemUser()) {
      // Overwrite the firstname also
      return setFirstName(evt.target.value);
    } else if (isErrorUser()) {
      // Fail here with TypeError. This will be reported to Backtrace
      return setLastName(evt.totallyUndefined.value);
    }

    setLastName(evt.target.value);
  };
  const handlePostalCodeChange = (evt) => {
    setPostalCode(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!firstName) {
      return setError(t("checkout.firstNameRequired"));
    }

    // Allow to pass for error_user without lastName, as it is impossible to set (errors are thrown)
    if (!lastName && !isErrorUser()) {
      return setError(t("checkout.lastNameRequired"));
    }

    if (!postalCode) {
      return setError(t("checkout.postalCodeRequired"));
    }

    // If we're here, we have our required info. Redirect!
    history.push(ROUTES.CHECKOUT_STEP_TWO, {
      state: { firstName, lastName, postalCode },
    });

    return "";
  };

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer secondaryTitle={t("checkout.information")} />
        <div
          id="checkout_info_container"
          className="checkout_info_container"
          data-test="checkout-info-container"
          role="main"
        >
          <div className="checkout_info_wrapper">
            <form onSubmit={handleSubmit} aria-label={t("checkout.form")}>
              <div className="checkout_info">
                <InputError
                  isError={Boolean(error)}
                  type={INPUT_TYPES.TEXT}
                  value={firstName}
                  onChange={handleFirstNameChange}
                  testId="firstName"
                  placeholder={t("checkout.firstName")}
                  // Custom
                  id="first-name"
                  autoCorrect="off"
                  autoCapitalize="none"
                />
                <InputError
                  isError={Boolean(error)}
                  type={INPUT_TYPES.TEXT}
                  value={lastName}
                  onChange={handleLastNameChange}
                  testId="lastName"
                  placeholder={t("checkout.lastName")}
                  // Custom
                  id="last-name"
                  autoCorrect="off"
                  autoCapitalize="none"
                />
                <InputError
                  isError={Boolean(error)}
                  type={INPUT_TYPES.TEXT}
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  testId="postalCode"
                  placeholder={t("checkout.postalCode")}
                  // Custom
                  id="postal-code"
                  autoCorrect="off"
                  autoCapitalize="none"
                />
                <ErrorMessage
                  isError={Boolean(error)}
                  errorMessage={`Error: ${error}`}
                  onClick={dismissError}
                />
              </div>
              <div className="checkout_buttons">
                <Button
                  // `cart_cancel_link` has no style function
                  // but is there for backwards compatibility
                  customClass="cart_cancel_link"
                  label={t("checkout.cancel")}
                  onClick={(evt) => {
                    evt.preventDefault();
                    history.push(ROUTES.CART);
                  }}
                  size={BUTTON_SIZES.MEDIUM}
                  testId="cancel"
                  type={BUTTON_TYPES.BACK}
                />
                <SubmitButton
                  customClass="btn btn_primary cart_button btn_action"
                  testId="continue"
                  value={t("checkout.continue")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};
CheckOutStepOne.propTypes = {
  /**
   * The history
   */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(CheckOutStepOne);
