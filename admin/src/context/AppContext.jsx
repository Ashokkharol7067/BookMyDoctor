import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const currencySymbol = "$";

  // for fromating slotData and Time
  const months = [
    "",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JULY",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_").map(Number);
    return dateArray[0] + " " + months[dateArray[1]] + " " + dateArray[2];
  };

  const value = {
    calculateAge,
    slotDateFormate,
    currencySymbol,
  };


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
