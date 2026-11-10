import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LANGUAGE_STORAGE_KEY = "swag-labs-language";

const translations = {
  en: {
    "language.switch": "Switch to French",
    "language.english": "English",
    "language.french": "French",
    "login.username": "Username",
    "login.password": "Password",
    "login.submit": "Login",
    "login.acceptedUsers": "Accepted usernames are:",
    "login.passwordForAll": "Password for all users:",
    "login.usernameRequired": "Username is required",
    "login.passwordRequired": "Password is required",
    "login.lockedOut": "Sorry, this user has been locked out.",
    "login.invalidCredentials":
      "Username and password do not match any user in this service",
    "login.protectedRoute":
      "You can only access '{path}' when you are logged in.",
    "menu.open": "Open Menu",
    "menu.close": "Close Menu",
    "menu.main": "Main menu",
    "menu.allItems": "All Items",
    "menu.dynamicCatalog": "Dynamic Catalog",
    "menu.lazyLoad": "Lazy Load",
    "menu.spinner": "Spinner",
    "menu.slider": "Slider",
    "menu.about": "About",
    "menu.logout": "Logout",
    "menu.reset": "Reset App State",
    "products.title": "Products",
    "products.sort": "Sort products",
    "products.nameAsc": "Name (A to Z)",
    "products.nameDesc": "Name (Z to A)",
    "products.priceAsc": "Price (low to high)",
    "products.priceDesc": "Price (high to low)",
    "product.add": "Add to cart",
    "product.remove": "Remove",
    "product.details": "View details for {name}",
    "product.back": "Back to products",
    "product.notFound": "ITEM NOT FOUND",
    "product.notFoundDescription":
      "We're sorry, but your call could not be completed as dialled. Please check your number, and try your call again.",
    "cart.title": "Your Cart",
    "cart.quantity": "QTY",
    "cart.description": "Description",
    "cart.continue": "Continue Shopping",
    "cart.checkout": "Checkout",
    "checkout.information": "Checkout: Your Information",
    "checkout.overview": "Checkout: Overview",
    "checkout.complete": "Checkout: Complete!",
    "checkout.firstName": "First Name",
    "checkout.lastName": "Last Name",
    "checkout.postalCode": "Zip/Postal Code",
    "checkout.firstNameRequired": "First Name is required",
    "checkout.lastNameRequired": "Last Name is required",
    "checkout.postalCodeRequired": "Postal Code is required",
    "checkout.form": "Checkout information",
    "checkout.cancel": "Cancel",
    "checkout.continue": "Continue",
    "checkout.payment": "Payment Information:",
    "checkout.shipping": "Shipping Information:",
    "checkout.delivery": "Free Pony Express Delivery!",
    "checkout.priceTotal": "Price Total",
    "checkout.itemTotal": "Item total: ${total}",
    "checkout.tax": "Tax: ${total}",
    "checkout.total": "Total: ${total}",
    "checkout.finish": "Finish",
    "finish.ponyExpress": "Pony Express",
    "finish.thanks": "Thank you for your order!",
    "finish.message":
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    "finish.backHome": "Back Home",
    "finish.generating": "Generating...",
    "finish.generatePdf": "Generate PDF order",
    "catalog.lazyLoad": "Dynamic Catalog - Lazy Load",
    "catalog.spinner": "Dynamic Catalog - Spinner",
    "catalog.slider": "Dynamic Catalog - Slider",
    "catalog.loading": "Loading",
    "catalog.show": "Show {name}",
    "footer.rights": "All Rights Reserved. Terms of Service | Privacy Policy",
  },
  fr: {
    "language.switch": "Passer en anglais",
    "language.english": "Anglais",
    "language.french": "Français",
    "login.username": "Nom d'utilisateur",
    "login.password": "Mot de passe",
    "login.submit": "Se connecter",
    "login.acceptedUsers": "Noms d'utilisateur acceptés :",
    "login.passwordForAll": "Mot de passe pour tous les utilisateurs :",
    "login.usernameRequired": "Le nom d'utilisateur est requis",
    "login.passwordRequired": "Le mot de passe est requis",
    "login.lockedOut": "Désolé, cet utilisateur a été verrouillé.",
    "login.invalidCredentials":
      "Le nom d'utilisateur et le mot de passe ne correspondent à aucun utilisateur",
    "login.protectedRoute":
      "Vous ne pouvez accéder à « {path} » qu'après vous être connecté.",
    "menu.open": "Ouvrir le menu",
    "menu.close": "Fermer le menu",
    "menu.main": "Menu principal",
    "menu.allItems": "Tous les articles",
    "menu.dynamicCatalog": "Catalogue dynamique",
    "menu.lazyLoad": "Chargement progressif",
    "menu.spinner": "Chargement",
    "menu.slider": "Carrousel",
    "menu.about": "À propos",
    "menu.logout": "Se déconnecter",
    "menu.reset": "Réinitialiser l'application",
    "products.title": "Produits",
    "products.sort": "Trier les produits",
    "products.nameAsc": "Nom (A à Z)",
    "products.nameDesc": "Nom (Z à A)",
    "products.priceAsc": "Prix (croissant)",
    "products.priceDesc": "Prix (décroissant)",
    "product.add": "Ajouter au panier",
    "product.remove": "Retirer",
    "product.details": "Voir les détails de {name}",
    "product.back": "Retour aux produits",
    "product.notFound": "ARTICLE INTROUVABLE",
    "product.notFoundDescription":
      "Désolé, votre appel n'a pas pu être traité. Vérifiez votre numéro et réessayez.",
    "cart.title": "Votre panier",
    "cart.quantity": "QTÉ",
    "cart.description": "Description",
    "cart.continue": "Continuer vos achats",
    "cart.checkout": "Paiement",
    "checkout.information": "Paiement : vos informations",
    "checkout.overview": "Paiement : récapitulatif",
    "checkout.complete": "Paiement terminé !",
    "checkout.firstName": "Prénom",
    "checkout.lastName": "Nom",
    "checkout.postalCode": "Code postal",
    "checkout.firstNameRequired": "Le prénom est requis",
    "checkout.lastNameRequired": "Le nom est requis",
    "checkout.postalCodeRequired": "Le code postal est requis",
    "checkout.form": "Informations de paiement",
    "checkout.cancel": "Annuler",
    "checkout.continue": "Continuer",
    "checkout.payment": "Informations de paiement :",
    "checkout.shipping": "Informations de livraison :",
    "checkout.delivery": "Livraison Pony Express gratuite !",
    "checkout.priceTotal": "Total des prix",
    "checkout.itemTotal": "Total des articles : ${total}",
    "checkout.tax": "Taxes : ${total}",
    "checkout.total": "Total : ${total}",
    "checkout.finish": "Terminer",
    "finish.ponyExpress": "Pony Express",
    "finish.thanks": "Merci pour votre commande !",
    "finish.message":
      "Votre commande a été expédiée et arrivera aussi vite que le poney le pourra !",
    "finish.backHome": "Retour à l'accueil",
    "finish.generating": "Génération...",
    "finish.generatePdf": "Générer le reçu PDF",
    "catalog.lazyLoad": "Catalogue dynamique - Chargement progressif",
    "catalog.spinner": "Catalogue dynamique - Chargement",
    "catalog.slider": "Catalogue dynamique - Carrousel",
    "catalog.loading": "Chargement",
    "catalog.show": "Afficher {name}",
    "footer.rights":
      "Tous droits réservés. Conditions d'utilisation | Politique de confidentialité",
  },
};

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key, values) => translate("en", key, values),
});

const translate = (language, key, values = {}) =>
  Object.entries(values).reduce(
    (message, [name, value]) => message.replace(`{${name}}`, value),
    translations[language][key] || translations.en[key] || key,
  );

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLanguage === "fr" ? "fr" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key, values) => translate(language, key, values),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
