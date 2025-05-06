import React, { useEffect, useState } from "react";
import { getAllCities } from "./utils/get-country-and-city";

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
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full max-w-[1600px] max-h-[1000px] overflow-hidden">
        {/* LEFT PANEL - Day Mode */}
        <div className="flex-1 bg-gray-100 relative rounded-l-2xl overflow-hidden">
          {/* Weather Circle Decorations */}
          <div className="absolute w-[340px] h-[340px] top-[25%] left-[25%] rounded-full border border-gray-200"></div>
          <div className="absolute w-[540px] h-[540px] top-[20%] left-[20%] rounded-full border border-gray-200"></div>
          <div className="absolute w-[940px] h-[940px] top-[10%] left-[10%] rounded-full border border-gray-200"></div>

          {/* Sun Icon and Circle */}
          <div className="absolute top-[45%] left-[45%] w-[140px] h-[140px] bg-gray-100 rounded-full border border-gray-200 flex justify-center items-center">
            <img className="w-[60px]" src="./Group 4.png" alt="Sun" />
          </div>
          <img
            className="absolute top-[12%] left-[10%]"
            src="./sun-little.webp"
            alt="Small Sun"
          />

          {/* Search Bar */}
          <div className="absolute top-5 left-10 w-[90%] max-w-[400px] px-6 py-4 bg-white rounded-full shadow-lg flex items-center gap-4">
            <img src="./search.png" alt="Search Icon" />
            <input
              value={searchValue}
              onChange={onChange}
              className="flex-1 font-bold text-lg outline-none"
              placeholder="Search..."
            />
          </div>

          {/* Search Dropdown */}
          {filteredData.length > 0 && (
            <div className="absolute top-[100px] left-10 w-[90%] max-w-[400px] py-4 bg-white/80 rounded-3xl backdrop-blur shadow-lg z-10">
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

          {/* Main Weather Card - Day */}
          <div className="absolute top-[20%] left-[15%] w-[90%] max-w-[414px] h-[80%] bg-white/75 rounded-[48px] overflow-hidden shadow-xl">
            <div className="w-full h-[60%] bg-gradient-to-b from-gray-50 to-gray-50 rounded-[42px] relative">
              <div className="absolute top-6 left-6 text-gray-500 text-lg font-medium">
                {currentDate}
              </div>
              <div className="absolute top-16 left-6 text-gray-900 text-5xl font-extrabold">
                {selectedCity}
              </div>
              <img
                className="absolute top-40 left-14 w-[262px] h-[262px]"
                src="./Sun.png"
                alt="Weather Icon"
              />
              <div className="absolute top-[370px] left-2 text-[120px] text-transparent bg-gradient-to-b from-gray-900 to-gray-300 bg-clip-text font-black">
                {weatherData}˚
              </div>
              <div className="absolute top-[540px] left-12 text-[#fe8e26] text-2xl font-extrabold">
                {weatherCondition}
              </div>
            </div>

            {/* Bottom Nav Icons */}
            <div className="absolute bottom-4 left-10 flex justify-between w-[318px]">
              <img src="./Home.png" alt="Home" />
              <img src="./Pin.png" alt="Pin" />
              <img src="./Heart.png" alt="Heart" />
              <img src="./User.png" alt="User" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Night Mode */}
        <div className="flex-1 bg-[#0f141e] relative rounded-r-2xl overflow-hidden">
          {/* Night Decorations */}
          <div className="absolute w-[340px] h-[340px] top-[25%] right-[25%] rounded-full border border-white opacity-10"></div>
          <div className="absolute w-[540px] h-[540px] top-[20%] right-[20%] rounded-full border border-white opacity-10"></div>
          <div className="absolute w-[940px] h-[940px] top-[10%] right-[10%] rounded-full border border-white opacity-10"></div>

          {/* Vector Icon in Circle */}
          <div className="absolute top-[45%] right-[45%] w-[140px] h-[140px] bg-gray-100 rounded-full border border-gray-200 flex justify-center items-center">
            <img className="w-[60px]" src="./Vector.png" alt="Moon Icon" />
          </div>

          {/* Decorative Ellipse */}
          <img
            className="absolute bottom-24 right-36"
            src="./Ellipse 22.png"
            alt="Decoration"
          />

          {/* Main Weather Card - Night */}
          <div className="absolute top-[20%] left-[15%] w-[90%] max-w-[414px] h-[80%] bg-gray-900/75 rounded-[48px] backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="w-full h-[60%] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[42px] relative">
              <div className="absolute top-6 left-6 text-gray-400 text-lg font-medium">
                {currentDate}
              </div>
              <div className="absolute top-16 left-6 text-white text-5xl font-extrabold">
                {selectedCity}
              </div>
              <img
                className="absolute top-20 right-6"
                src="localization_icon.png"
                alt="Location"
              />
              <div className="absolute top-32 left-[69px] w-[277px] h-[277px]">
                <img src="./shadow.png" alt="Shadow" />
                <img
                  className="absolute bottom-[12px] right-[11px] w-[265px] h-[265px]"
                  src="./icon.png"
                  alt="Weather Icon"
                />
              </div>
            </div>

            <div className="absolute top-[370px] left-4 w-[396px] text-[120px] text-transparent bg-gradient-to-b from-gray-300 to-gray-700 bg-clip-text font-extrabold">
              {nightTemperature}˚
            </div>
            <div className="absolute top-[540px] left-12 text-[#777cce] text-2xl font-extrabold">
              {nightCondition}
            </div>

            {/* Bottom Nav Icons */}
            <div className="absolute bottom-4 left-10 flex justify-between w-[318px]">
              <img src="./Home.png" alt="Home" />
              <img src="./Pin.png" alt="Pin" />
              <img src="./Heart.png" alt="Heart" />
              <img src="./User.png" alt="User" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
