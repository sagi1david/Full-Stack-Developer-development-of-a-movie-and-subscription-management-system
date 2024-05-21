import { useState } from "react";

function addMovie(props) {
  const urlMovies = "http://localhost:4000/movies";

  const [movie, setMovie] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: "",
  });

  const addMovie = async () => {
    const resp1 = await fetch(urlMovies, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    props.setVisibleAddMovie(!props.visibleAddMovie);
    props.setVisibleAllMovies(!props.visibleAllMovies);
  };

  return (
    <div>
      Name:
      <input
        type="text"
        onInput={(e) => setMovie({ ...movie, name: e.target.value })}
        placeholder="Name"
      />
      <br />
      Genres:
      <input
        type="text"
        onInput={(e) => setMovie({ ...movie, genres: e.target.value })}
        placeholder="Genres"
      />
      <br />
      Image url:
      <input
        type="text"
        onInput={(e) => setMovie({ ...movie, image: e.target.value })}
        placeholder="Image url"
      />
      <br />
      Premiered:
      <input
        type="date"
        onInput={(e) => setMovie({ ...movie, premiered: e.target.value })}
        placeholder="Premiered"
      />
      <br />
      <button type="submit" onClick={addMovie}>
        Save
      </button>
      <button
        type="submit"
        onClick={() => props.setVisibleAddMovie(!props.visibleAddMovie)}
      >
        Cancel
      </button>
    </div>
  );
}

export default addMovie;
