import React, { useEffect, useState } from "react";
import countriesData from "./data";
import { getAllCities } from "./utils/get-country-and-city";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Ulaanbaatar, Mongolia");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

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

  const weatherApiKey = "56294f0115d9424ca0e84959251501"

  const getWeatherData = async() => {
    try {
      const response = fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${selectedCity}`        
      );
      const result = (await response).json();
      setWeatherData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleClickCity = (city) => {

  }

  const onChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = allCities
      .filter((el) => el.toLowerCase().startsWith(searchValue.toLowerCase()))
      .slice(0, 5);

    setFilteredData(filtered);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [selectedCity]);

  if (isLoading) {
    return <p>Loading ...</p>
  }

  return (
    <div className="w-[1600px] justify-center items-center flex m-40">
      <div className="w-[800px] h-[1200px] relative bg-gray-100 rounded-l-xl flex-col justify-start items-start inline-flex overflow-hidden">
        <div className="w-[1740px] h-[1740px] relative">
          <div className="w-[340px] h-[340px] absolute left-[630px] top-[430px] opacity-10 rounded-full border border-gray-900" />
          <div className="w-[540px] h-[540px] absolute top-[330px] left-[530px] opacity-10 rounded-full border border-gray-900" />
          <div className="w-[940px] h-[940px] absolute bottom-[130px] left-[330px] opacity-10 rounded-full border border-gray-900" />
          <div className="w-[1340px] h-[1340px] absolute left-[130px] bottom-[-70px] opacity-5 rounded-full border border-gray-900" />
          <div className="w-[1740px] h-[1740px] absolute bottom-[-270px] left-[-70px]  opacity-5 rounded-full border border-gray-900" />

          <div className="w-[800px] h-[1200px] relative">
            <div className="w-[567px] h-[104px] px-6 py-4 absolute top-[40px] left-[40px] bg-white rounded-[48px] shadow-[0px_12px_24px_0px_rgba(0,0,0,0,0.06)] justify-start items-center gap-4 inline-flex">
              <img src="./search.png" />
              <input
                value={searchValue}
                onChange={onChange}
                className="w-[500px] h-[70px] font-bold text-[32px] justify-start items-center inline-flex"
                placeholder="Search..."
              />
            </div>

            <div className="absolute top-[150px] left-[40px]">
              {filteredData.map((el) => (
                <p onClick={()=> handleClickCity(el)} key={el}>{el}</p>
              ))}
            </div>

            <div className="w-[414px] h-[828px] left-[193px] top-[230px] relative bg-white/75 rounded-[48px] overflow-hidden">
              <div className="w-[398px] h-[504px] absolute left-[8px] top-[8px] bg-gradient-to-b from-gray-50 to-gray-50 rounded-[42px]" />
              <img
                className="w-[262.11px] h-[262.11px] absolute left-[56px] top-[196px]"
                src="./Sun.png"
              />
              <div className="h-[91px] flex-col justify-start items-start inline-flex">
                <div className="text-gray-500 text-lg top-[56px] left-[40px] absolute font-medium">
                  January 15, 2025
                </div>
                <div className="text-gray-900 text-5xl top-[81px] left-[40px] absolute font-extrabold">
                  Kraków
                </div>
                <img
                  className="absolute top-[85px] right-[40px]"
                  src="./localization_icon.png"
                />
              </div>
              <div className="h-[230px] flex-col justify-start items-start inline-flex">
                <div className="text-gray-900 text-[144px] left-[48px] bottom-[153px] absolute bg-gradient-to-b from-gray-900 to-gray-300 bg-clip-text text-transparent font-black">
                  26˚
                </div>
                <div className="text-[#fe8e26] absolute bottom-[120px] left-[48px] text-2xl font-extrabold">
                  Bright
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
        <div className="w-[340px] h-[340px] top-[430px] right-[630px] bg-gray-100 absolute  rounded-full border border-white">
          <img
            className="absolute right-[200px] top-[120px] "
            src="./Group 4.png"
          ></img>
          <img
            className="absolute right-[80px] top-[120px] "
            src="./Vector.png"
          ></img>
        </div>
        <div className="w-[540px] h-[540px] absolute top-[330px] right-[530px] opacity-10 rounded-full border border-white" />
        <div className="w-[940px] h-[940px] absolute bottom-[130px] right-[330px] opacity-10 rounded-full border border-white" />
        <div className="w-[1340px] h-[1340px] absolute right-[130px] bottom-[-70px] opacity-5 rounded-full border border-white" />
        <div className="w-[1740px] h-[1740px] absolute bottom-[-270px] right-[-70px]  opacity-5 rounded-full border border-white" />
        <img
          className="absolute bottom-[104px] right-[145px]"
          src="./Ellipse 22.png"
        />
        <div className="w-[414px] h-[832px] relative top-[216px] left-[193px] bg-gray-900/75 rounded-[48px] backdrop-blur-xl overflow-hidden">
          <div className="w-[398px] h-[504px] absolute bottom-[320px] right-[8px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[42px]">
            <div className="h-[91px] flex-col justify-start items-start inline-flex">
              <div className="text-gray-400 text-lg font-medium font-['Manrope Fallback'] absolute left-[40px] top-[56px]">
                January 15, 2025
              </div>
              <div className="text-white text-5xl font-extrabold font-['Manrope Fallback'] absolute top-[81px] left-[40px]">
                Kraków
              </div>
              <img
                className="left-[326px] top-[85px] absolute"
                src="localization_icon.png"
              ></img>
              <div className="w-[277px] h-[277px] top-[171px] left-[69px] relative">
                <img src="./shadow.png"></img>
                <img
                  className="absolute bottom-[12px] right-[11px] w-[264.89px] h-[264.89px] "
                  src="./icon.png"
                ></img>
              </div>
            </div>
          </div>
          <div className="w-[209px] h-[197px] bg-gradient-to-b from-gray-300 to-gray-700 bg-clip-text text-transparent text-[144px] absolute right-[157px] bottom-[167px] font-extrabold font-['Manrope Fallback']">
            17˚
          </div>
          <div className="text-[#777cce] text-2xl font-extrabold font-['Manrope Fallback'] absolute bottom-[134px] left-[48px]">
            Clear
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
