const ToggleSwitch = ({ checked, onChange, name }) => {
  return (
    <label className="relative inline-flex items-center w-11 h-6 cursor-pointer">
      <input
        type="checkbox"
        id={name}
        name={name}
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer:focus:ring-4 peer:focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600`}
      ></div>
    </label>
  );
};

export default ToggleSwitch;
