import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getWeather } from "./services/api";
import UIProvider from "./context/UIProvider";
import AuthProvider from "./context/AuthProvider";
import Login from "./pages/Login";
import Home from "./pages/Home";
import News from "./pages/News";
import Favorites from "./pages/Favorites";
import PhotoChallenge from "./pages/PhotoChallenge";
import Community from "./pages/Community";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import HomeSkeleton from "./components/Home/HomeSkeleton";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainLayout() {
  const [searchCity, setSearchCity] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await getWeather(`${latitude},${longitude}`);
          setSearchCity(res.data.location.name);
        } catch {
          setSearchCity("Bangkok");
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        setSearchCity("Bangkok");
        setLocationLoading(false);
      }
    );
  }, []);

  return (
    <div className="flex h-screen bg-(--bg-primary) overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar onSearch={setSearchCity} />

        <main className="flex-1 overflow-y-auto mt-4 p-4 pt-0!  pb-24 lg:pb-6">
          {locationLoading ? (
            <HomeSkeleton />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Home city={searchCity} onSelectCity={setSearchCity} />
                }
              />
              <Route path="/news" element={<News city={searchCity} />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/photo-challenge" element={<PhotoChallenge city={searchCity} />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
