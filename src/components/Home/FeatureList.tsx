const FeatureList = () => {
  return (
    <div className=" rounded-lg p-4">
      <h3 className="text-lg font-medium mb-2">Features</h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <svg
            className="h-5 w-5 mr-2"
            style={{
              color: "#7263d8",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Organize your tasks
        </li>
        <li className="flex items-center">
          <svg
            className="h-5 w-5 mr-2"
            style={{
              color: "#7263d8",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Track your progress
        </li>
      </ul>
    </div>
  );
};

export default FeatureList;
