import axios from "axios";
import type { Course, CountryResponse } from "../types";

const BASE_URL = "https://syncsphere-hiv6.onrender.com";

export const apiService = {
  /**
   * Fetches courses list from the backend API.
   * @param signal AbortSignal to cancel active requests on unmount.
   */
  getCourses: async (signal?: AbortSignal): Promise<Course[]> => {
    const response = await axios.get<Course[]>(`${BASE_URL}/assignment/course-data`, { signal });
    return response.data;
  },

  /**
   * Fetches detected country code from the backend API.
   * @param signal AbortSignal to cancel active requests on unmount.
   */
  getCountryCode: async (signal?: AbortSignal): Promise<CountryResponse> => {
    const response = await axios.get<CountryResponse>(`${BASE_URL}/assignment/country-code`, { signal });
    return response.data;
  }
};