import React, { useState } from "react";
import { withRouter } from "../utils/withRouter";
import PropTypes from "prop-types";
import { slide as Menu } from "react-burger-menu";
import { ShoppingCart } from "../utils/shopping-cart";
import { ROUTES } from "../utils/Constants";
import { isVisualUser, removeCredentials } from "../utils/Credentials";
import menuClosePng from "../assets/img/close.png";
import menuCloseSvg from "../assets/svg/close@3x.svg";
import menuIconPng from "../assets/img/menu.png";
import menuIconSvg from "../assets/svg/menu3x.svg";
import "./DrawerMenu.css";
import { useTranslation } from "../i18n/LanguageContext";

const DrawerMenu = ({ history }) => {
  const [isDynamicCatalogOpen, setIsDynamicCatalogOpen] = useState(false);
  const resetStorage = () => {
    // Wipe out our shopping cart now
    ShoppingCart.resetCart();
  };
  const isVisualFailure = isVisualUser();
  const imageClass = isVisualFailure ? "visual_failure" : "";
  const { t } = useTranslation();

  return (
    <Menu
      customBurgerIcon={
        <img
          src={menuIconPng}
          className={imageClass}
          srcSet={menuIconSvg}
          alt={t("menu.open")}
          data-test="open-menu"
        />
      }
      customCrossIcon={
        <img
          src={menuClosePng}
          className={imageClass}
          srcSet={menuCloseSvg}
          alt={t("menu.close")}
          data-test="close-menu"
        />
      }
      outerContainerId={"page_wrapper"}
      pageWrapId={"contents_wrapper"}
      noOverlay
      aria-label={t("menu.main")}
    >
      <a
        id="inventory_sidebar_link"
        className="menu-item"
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          history.push(ROUTES.INVENTORY);
        }}
        data-test="inventory-sidebar-link"
        role="button"
      >
        {t("menu.allItems")}
      </a>
      <a
        id="dynamic_catalog_sidebar_link"
        className="menu-item"
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          setIsDynamicCatalogOpen((open) => !open);
        }}
        data-test="dynamic-catalog-sidebar-link"
        role="button"
        aria-expanded={isDynamicCatalogOpen}
        aria-controls="dynamic_catalog_submenu"
      >
        {t("menu.dynamicCatalog")}
        <span
          className={`submenu-chevron${isDynamicCatalogOpen ? " open" : ""}`}
          aria-hidden="true"
        />
      </a>
      {isDynamicCatalogOpen && (
        <div id="dynamic_catalog_submenu" data-test="dynamic-catalog-submenu">
          <a
            id="dynamic_catalog_lazy_load_link"
            className="menu-item submenu-item"
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              history.push(ROUTES.DYNAMIC_CATALOG_LAZY_LOAD);
            }}
            data-test="dynamic-catalog-lazy-load-link"
            role="button"
          >
            {t("menu.lazyLoad")}
          </a>
          <a
            id="dynamic_catalog_spinner_link"
            className="menu-item submenu-item"
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              history.push(ROUTES.DYNAMIC_CATALOG_SPINNER);
            }}
            data-test="dynamic-catalog-spinner-link"
            role="button"
          >
            {t("menu.spinner")}
          </a>
          <a
            id="dynamic_catalog_slider_link"
            className="menu-item submenu-item"
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              history.push(ROUTES.DYNAMIC_CATALOG_SLIDER);
            }}
            data-test="dynamic-catalog-slider-link"
            role="button"
          >
            {t("menu.slider")}
          </a>
        </div>
      )}
      <a
        id="about_sidebar_link"
        className="menu-item menu-item-disabled"
        data-test="about-sidebar-link"
        aria-disabled="true"
        tabIndex={-1}
      >
        {t("menu.about")}
      </a>
      <a
        id="logout_sidebar_link"
        className="menu-item"
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          removeCredentials();
          history.push(ROUTES.LOGIN);
        }}
        data-test="logout-sidebar-link"
        role="button"
      >
        {t("menu.logout")}
      </a>
      <a
        id="reset_sidebar_link"
        className="menu-item"
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          resetStorage();
        }}
        data-test="reset-sidebar-link"
        role="button"
      >
        {t("menu.reset")}
      </a>
    </Menu>
  );
};
DrawerMenu.propTypes = {
  /**
   * The history
   */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(DrawerMenu);
