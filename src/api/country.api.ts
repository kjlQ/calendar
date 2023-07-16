import axios from "axios";

export const getCountries = () => {
  return axios.get(`https://date.nager.at/api/v3/AvailableCountries`, {});
};

export const getCountriesHolidays = (year: number, countryCode: string) => {
  return axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`, {});
};
