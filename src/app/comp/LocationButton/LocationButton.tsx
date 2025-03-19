interface LocationButtonProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const LocationButton: React.FC<LocationButtonProps> = ({ setCity }) => {
  return (
    <button onClick={() => setCity("London")} className="bg-blue-500 p-2 rounded">
      Change Location to London
    </button>
  );
};

export default LocationButton;
