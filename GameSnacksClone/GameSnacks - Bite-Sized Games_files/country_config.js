// These experiments will be disabled globally.
// Per country flags can enable them via
// https://firebase.google.com/docs/hosting/i18n-rewrites
// In order to enable these experiments for a country
// Find country code here https://en.wikipedia.org/wiki/ISO_3166-1
// Create a new folder (or find existing file) at
// firebase/public/localized-files/ALL_[country code]/embed/country_config.js
// Note, Firebase will serve this file for all countries unless
// it is specified in the above file.
window.DISABLED_EXPERIMENTS = ["ADS", "REWARDED"];
