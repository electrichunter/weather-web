interface TodayInfoProps {
  weatherData: any;
}

const TodayInfo: React.FC<TodayInfoProps> = ({ weatherData }) => {
  return (
    <div>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} km/h</p>
    </div>
  );
};

export default TodayInfo;
