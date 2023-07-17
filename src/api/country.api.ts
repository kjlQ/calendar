import { api } from "../utils/httpInterceptor";

export const getCountries = () => {
  return api.get(`/api/v3/AvailableCountries`, {});
};

export const getCountriesHolidays = (year: number, countryCode: string) => {
  return api.get(`/api/v3/PublicHolidays/${year}/${countryCode}`, {});
};
