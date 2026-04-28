import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import GoogleBtn from "../components/Login/GoogleBtn";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-(--bg-primary)">
      <h1 className="text-(--text-primary) text-2xl font-bold text-center tracking-tight mb-4">
        ClearCast
      </h1>

      <div className="flex flex-col bg-(--bg-card) p-8 gap-4 rounded-2xl w-full max-w-sm border border-(--border) shadow-2xl">
        <div className="text-center mb-2">
          <p className="text-(--text-primary) font-semibold text-xl">
            Welcome back
          </p>
          <p className="text-(--text-secondary) text-xs mt-1">
            Use your Google account to sign in
          </p>
        </div>

        <GoogleBtn onClick={handleGoogleLogin} />

        <p className="text-(--text-muted) text-xs text-center mt-2">
          By signing in, you agree to our{" "}
          <span className="text-(--text-secondary) hover:underline cursor-pointer">
            Terms of Service
          </span>
        </p>
      </div>
    </div>
  );
}
