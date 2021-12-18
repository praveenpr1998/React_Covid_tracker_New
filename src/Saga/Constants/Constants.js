const ALL_CONSTANTS = {
  // -------------------------------- Redux Constants
  GET_COVID_DATA_FAILED: "Error Fetching covid data",
  GET_COVID_DATA: "GET_COVID_DATA",
  GET_COVID_DATA_SAGA: "GET_COVID_DATA_SAGA",

  GET_COVID_DATES_DATA_SAGA: "GET_COVID_DATES_DATA_SAGA",
  GET_COVID_DATES_DATA: "GET_COVID_DATES_DATA",

  // -------------------------------- Other Constants

  mappedStates: {
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CT: "Chhattisgarh",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PB: "Punjab",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TG: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand",
    WB: "West Bengal",
    AN: "Andaman and Nicobar Islands",
    CH: "Chandigarh",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    LD: "Lakshadweep",
    DL: "National Capital Territory of Delhi",
    PY: "Puducherry",
    LA: "Ladakh",
  },

  commonInitialState: {
    isPending: false,
    isFailed: false,
    isSuccess: false,
    payload: {},
  },

  BASE_URL: "https://data.covid19india.org/v4/min/",
};
export default ALL_CONSTANTS;
