import React from "react";
import "./Footer.css";
import { useTranslation } from "../i18n/LanguageContext";

const SwagLabsFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer" data-test="footer">
      {/* <div className="footer_container"> */}
      <ul className="social">
        <li className="social_x">
          <a
            href="https://x.com/saucelabs"
            target="_blank"
            rel="noreferrer"
            data-test="social-x"
          >
            X
          </a>
        </li>
        <li className="social_facebook">
          <a
            href="https://www.facebook.com/saucelabs"
            target="_blank"
            rel="noreferrer"
            data-test="social-facebook"
          >
            Facebook
          </a>
        </li>
        <li className="social_linkedin">
          <a
            href="https://www.linkedin.com/company/sauce-labs/"
            target="_blank"
            rel="noreferrer"
            data-test="social-linkedin"
          >
            LinkedIn
          </a>
        </li>
      </ul>

      <div className="footer_copy" data-test="footer-copy">
        &copy; {new Date().getFullYear()} Sauce Labs. {t("footer.rights")}
      </div>
      {/* </div> */}
    </footer>
  );
};

export default SwagLabsFooter;
