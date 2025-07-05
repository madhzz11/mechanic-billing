
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <div className="text-3xl font-bold text-blue-600">OM</div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">OM MURUGAN</h1>
        <p className="text-xl text-blue-100">AUTO BILL GURU</p>
        <div className="mt-8">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
