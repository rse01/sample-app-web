import React from "react";
import { useTranslation } from "../i18n/LanguageContext";
import "./LanguageToggle.css";

const LanguageToggle = () => {
  const { language, setLanguage, t } = useTranslation();
  const nextLanguage = language === "en" ? "fr" : "en";

  return (
    <button
      type="button"
      className="language_toggle"
      onClick={() => setLanguage(nextLanguage)}
      aria-label={t("language.switch")}
      title={t("language.switch")}
      data-test="language-toggle"
    >
      <span className={language === "en" ? "active" : ""}>EN</span>
      <span aria-hidden="true" className="language_toggle_separator">
        /
      </span>
      <span className={language === "fr" ? "active" : ""}>FR</span>
    </button>
  );
};

export default LanguageToggle;
