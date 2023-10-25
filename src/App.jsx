import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState([]);

  const removeTour = (id) => {
    const newTour = tour.filter((tour) => tour.id !== id);
    setTour(newTour);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const respne = await fetch(url);
      if (!respne.ok) {
        throw new Error("network problem");
      }
      const data = await respne.json();
      console.log(data);
      setTour(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tour.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>there is no tours</h2>
          <button className="btn" onClick={() => fetchData()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tour={tour} removeTour={removeTour} />;
    </main>
  );
}

export default App;
