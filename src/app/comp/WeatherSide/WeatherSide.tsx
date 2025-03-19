interface WeatherSideProps {
  weatherData: any; // Daha iyi bir tip belirtebilirsin
}

const WeatherSide: React.FC<WeatherSideProps> = ({ weatherData }) => {
  return (
    <div>
      <h1>{weatherData.name}</h1>
      <p>{weatherData.weather[0].description}</p>
      <p>{weatherData.main.temp}°C</p>
    </div>
  );
};

export default WeatherSide;
