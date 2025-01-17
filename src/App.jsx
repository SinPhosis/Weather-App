import React, { useEffect, useState } from "react";
import { getAllCities } from "./utils/get-country-and-city";
import Skeleton from "react-loading-skeleton";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Ulaanbaatar, Mongolia");
  const [weatherData, setWeatherData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [nightTemperature, setNightTemperature] = useState(null);
  const [nightCondition, setNightCondition] = useState(null);

  const weatherApiKey = "56294f0115d9424ca0e84959251501";

  const getCountries = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const result = await response.json();
      const countries = result.data;
      const cities = getAllCities(countries);
      setAllCities(cities);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${selectedCity}`
      );
      const result = await response.json();

      /* day temperature */
      const temp = result.forecast.forecastday[0].day.maxtemp_c;

      setWeatherData(temp);

      /* day condition */
      const condition = result.forecast.forecastday[0].day.condition.text;
      setWeatherCondition(condition);

      /* night temperature */
      const nightT = result.forecast.forecastday[0].day.mintemp_c;
      setNightTemperature(nightT);

      /* night condition */
      const nightC = result.forecast.forecastday[0].day.condition.text;
      setNightCondition(nightC);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickCity = (city) => {
    setSelectedCity(city);
    setSearchValue("");
    setFilteredData([]);
  };

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const filtered = allCities
      .filter((el) => el.toLowerCase().startsWith(value.toLowerCase()))
      .slice(0, 4);
    setFilteredData(filtered);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      getWeatherData();
    }
  }, [selectedCity]);

  useEffect(() => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  if (isLoading) {
    return (
      <>
        <div
          className="animate-spin inline-block size-6 border-[3px] ml-[550px] mt-[550px] border-current border-t-transparent text-black rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="animate-spin inline-block size-6 border-[3px] ml-[800px] mt-[550px] border-current border-t-transparent text-black rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <div className="w-[1600px] h-[1200px] justify-center items-center flex m-40">
      <div className="w-[800px] h-[1200px] relative bg-gray-100 rounded-l-xl flex-col justify-start items-start inline-flex overflow-hidden">
        <div className="w-[1740px] h-[1200px] relative">
          <div className="w-[140px] h-[140px] top-[530px] left-[730px] bg-gray-100 absolute rounded-full border border-gray-200">
            <img
              className="absolute block right-[75px] top-[25px]"
              src="./Group 4.png"
            ></img>
          </div>
          <div className="w-[340px] h-[340px] absolute left-[630px] top-[430px] rounded-full border border-gray-200" />
          <div className="w-[540px] h-[540px] absolute left-[530px] top-[330px] rounded-full border border-gray-200" />
          <div className="w-[940px] h-[940px] absolute left-[330px] top-[130px] rounded-full border border-gray-200" />
          <div className="w-[1340px] h-[1340px] absolute left-[130px] top-[-70px] rounded-full border border-gray-200" />
          <div className="w-[1740px] h-[1740px] absolute left-[-70px] bottom-[-270px] rounded-full border border-gray-200" />
          <img
            className="absolute left-[130px] top-[170px]"
            src="./sun-little.webp"
          ></img>
          <div className="w-[800px] h-[1200px] relative">
            <div className="w-[400px] h-[65px] px-6 py-4 absolute top-[20px] left-[40px] bg-white rounded-[48px] shadow-[0px_12px_24px_0px_rgba(0,0,0,0,0.06)] justify-start items-center gap-4 inline-flex">
              <img src="./search.png" alt="Search Icon" />
              <input
                value={searchValue}
                onChange={onChange}
                className="w-[400px] h-[65px] font-bold text-[20px] rounded-[48px] justify-start items-center inline-flex"
                placeholder="Search..."
              />
            </div>
            {filteredData.length > 0 && (
              <div className="w-[400px] absolute top-[100px] left-[40px] py-4 bg-white/80 rounded-3xl bg-transparent backdrop-blur shadow-lg">
                {filteredData.map((city) => (
                  <p
                    key={city}
                    onClick={() => handleClickCity(city)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {city}
                  </p>
                ))}
              </div>
            )}

            <div className="w-[414px] h-[828px] left-[193px] top-[230px] relative bg-white/75 rounded-[48px] overflow-hidden">
              <div className="w-[398px] h-[504px] absolute left-[8px] top-[8px] bg-gradient-to-b from-gray-50 to-gray-50 rounded-[42px]" />
              <img
                className="w-[262.11px] h-[262.11px] absolute left-[56px] top-[196px]"
                src="./Sun.png"
                alt="Weather Icon"
              />
              <div className="h-[91px] flex-col justify-start items-start inline-flex">
                <div className="text-gray-500 text-lg top-[56px] left-[40px] absolute font-medium">
                  {currentDate}
                </div>
                <div className="text-gray-900 text-5xl top-[81px] left-[40px] absolute font-extrabold">
                  {selectedCity}
                </div>
              </div>
              <div className="h-[230px] flex-col justify-start items-start inline-flex">
                <div className="text-gray-900 text-[144px] left-[25px] bottom-[153px] absolute bg-gradient-to-b from-gray-900 to-gray-300 bg-clip-text text-transparent font-black">
                  {weatherData}˚
                </div>
                <div className="text-[#fe8e26] absolute bottom-[120px] left-[48px] text-2xl font-extrabold">
                  {weatherCondition}
                </div>
              </div>
            </div>

            <div className="w-[318px] h-8 bottom-[182px] left-[241px] absolute justify-between items-end inline-flex">
              <img src="./Home.png" />
              <img src="./Pin.png" />
              <img src="./Heart.png" />
              <img src="./User.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[800px] h-[1200px] bg-[#0f141e] relative flex-col justify-start items-start inline-flex overflow-hidden">
        <div className="w-[140px] h-[140px] top-[530px] right-[730px] bg-gray-100 absolute rounded-full border border-gray-200">
          <img
            className="absolute right-[15px] top-[25px]"
            src="./Vector.png"
          ></img>
        </div>
        <div className="w-[340px] h-[340px] top-[430px] right-[630px] opacity-10 absolute rounded-full border border-white" />
        <div className="w-[540px] h-[540px] absolute top-[330px] right-[530px] opacity-10 rounded-full border border-white" />
        <div className="w-[940px] h-[940px] absolute top-[130px] right-[330px] opacity-10 rounded-full border border-white" />
        <div className="w-[1340px] h-[1340px] absolute top-[-70px] right-[130px] opacity-5 rounded-full border border-white" />
        <div className="w-[1740px] h-[1740px] absolute top-[-270px] right-[-70px] opacity-5 rounded-full border border-white" />

        <img
          className="absolute bottom-[104px] right-[145px]"
          src="./Ellipse 22.png"
        />
        <div className="w-[414px] h-[832px] relative top-[216px] left-[193px] bg-gray-900/75 rounded-[48px] backdrop-blur-xl overflow-hidden">
          <div className="w-[398px] h-[504px] absolute bottom-[320px] right-[8px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[42px]">
            <div className="h-[91px] flex-col justify-start items-start inline-flex">
              <div className="text-gray-400 text-lg font-medium font-['Manrope Fallback'] absolute left-[40px] top-[56px]">
                {currentDate}
              </div>
              <div className="text-white text-5xl font-extrabold font-['Manrope Fallback'] absolute top-[81px] left-[40px]">
                {selectedCity}
              </div>
              <img
                className="left-[326px] top-[85px] absolute"
                src="localization_icon.png"
              ></img>
              <div className="w-[277px] h-[277px] top-[171px] left-[69px] relative">
                <img src="./shadow.png"></img>
                <img
                  className="absolute bottom-[12px] right-[11px] w-[264.89px] h-[264.89px]"
                  src="./icon.png"
                ></img>
              </div>
            </div>
          </div>
          <div className="w-[396px] h-[197px] bg-gradient-to-b from-gray-300 to-gray-700 bg-clip-text text-transparent text-[144px] absolute bottom-[167px] font-extrabold font-['Manrope Fallback']">
            {nightTemperature}˚
          </div>
          <div className="text-[#777cce] text-2xl font-extrabold font-['Manrope Fallback'] absolute bottom-[134px] left-[48px]">
            {nightCondition}
          </div>
          <div className="w-[318px] h-8 absolute bottom-[48px] left-[48px] justify-between items-end inline-flex">
            <img src="./Home.png" />
            <img src="./Pin.png" />
            <img src="./Heart.png" />
            <img src="./User.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
