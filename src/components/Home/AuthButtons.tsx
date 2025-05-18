import { Link } from "react-router";

const AuthButtons = () => {
  return (
    <div className="space-y-4">
      <Link
        to="/login"
        className="w-full flex justify-center py-3 px-4"
        style={{
          backgroundColor: "#7263d8",
        }}
      >
        Sign In
      </Link>
      <Link
        to="/register"
        className="w-full flex justify-center py-3 px-4"
        style={{
          backgroundColor: "#7263d8",
        }}
      >
        Create Account
      </Link>
    </div>
  );
};

export default AuthButtons;
