import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/anime`);
      setAnime(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this anime?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/anime/${id}`);
        // Update the list after successful deletion
        setAnime(anime.filter(item => item._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <main className="container">
      <h1 className="heading">Your Anime Collection</h1>
      <p className="sub_heading">Discover and track your favorite anime series</p>

      <ul className="anim_list">
        {anime.length > 0 &&
          anime.map((anim) => (
            <li key={anim._id} className="anime_card">
              <div className="anime_info">
                <h4>{anim.title}</h4>
                <p>{anim.description}</p>
              </div>

              <div className="anime_actions">
                <Link to={anim.link} target="_blank" className="link">
                  Start Watching
                </Link>
                <button 
                  onClick={() => handleDelete(anim._id)} 
                  className="delete_btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>

      {anime.length === 0 && (
        <p className="no_result">Your anime collection is empty. Start adding your favorites!</p>
      )}
    </main>
  );
}

export default Home;
