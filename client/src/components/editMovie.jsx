import { useState } from "react";
import { useSelector } from "react-redux";

function editMovie(props) {
  const movie = useSelector((state) => state.movie);

  const [mov, setMovie] = useState({
    id: movie._id,
    name: movie.name,
    genres: movie.genres,
    image: movie.image,
    premiered: movie.premiered,
  });

  const update = async () => {
    const urlMovies = "http://localhost:4000/movies";

    const resp = await fetch(`${urlMovies}/${movie._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mov),
    });

    props.setVisibleEditMovie(!props.visibleEditMovie);
  };

  return (
    <div>
      <h3>Edit Movie: {movie.name}</h3>
      Name:
      <input
        type="text"
        defaultValue={movie.name}
        onInput={(e) => setMovie({ ...mov, name: e.target.value })}
      />
      <br />
      Genres:
      <input
        type="text"
        defaultValue={movie.genres}
        onInput={(e) => setMovie({ ...mov, genres: e.target.value })}
      />
      <br />
      Image url:
      <input
        type="text"
        defaultValue={movie.image}
        onInput={(e) => setMovie({ ...mov, image: e.target.value })}
      />
      <br />
      Premiered:
      <input
        type="text"
        defaultValue={movie.premiered}
        onInput={(e) => setMovie({ ...mov, premiered: e.target.value })}
      />
      <br />
      <button type="submit" onClick={update}>
        update
      </button>
      <button
        type="submit"
        onClick={() => props.setVisibleEditMovie(!props.visibleEditMovie)}
      >
        cancel
      </button>
    </div>
  );
}

export default editMovie;
