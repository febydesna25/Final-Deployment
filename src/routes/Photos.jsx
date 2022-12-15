import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = (id) => {
    // TODO: answer here
    fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
      method: 'DELETE', 
    }).then(() => {
      let a = [...photos]
      const temp = a
      let d = temp
      const filtered = d.filter((item) => item.id !== id);
      setPhotos(filtered)
    })
  };
  // console.log(temp)
  console.log(deletePhoto)
  //

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    let ascending = "asc"
    let descending = "desc"
    if (sort === ascending) {
      fetch("https://gallery-app-server.vercel.app/photos?_sort=id&_order=asc").then((respon) => respon.json().then((data) => {
      setPhotos(data);
      setLoading(false);
    })).catch((err) => { 
      setError(true)
    })
    } 
    else if (sort === descending) {
      fetch("https://gallery-app-server.vercel.app/photos?_sort=id&_order=desc").then((respon) => respon.json().then((data) => {
      setPhotos(data);
      setLoading(false);
    })).catch((err) => { 
      setError(true)
    })
    }
    if (submited.length > 0) { 
      fetch(`https://gallery-app-server.vercel.app/photos?q=${submited}`).then((respon) => respon.json().then((data) => {
      setPhotos(data);
      setLoading(false);
    })).catch((err) => { 
      setError(true)
    })
    }
    setLoading(false);
    //
  }, [sort, submited]);

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    let x = 0
    console.log(x)
    fetch("https://gallery-app-server.vercel.app/photos").then((respon) => respon.json().then((data) => {
      let a = data
      let x = false
      setPhotos(a);
      setLoading(x);
    })).catch((err) => { 
      setError(true)
    })
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
