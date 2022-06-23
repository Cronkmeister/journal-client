import "./AlbumView.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const serverURL = `https://journal-server-jc.herokuapp.com`;

class AlbumView extends Component {
  state = {
    entryList: [],
    entryInfo: {},
    albumArray: [],
  };

  componentDidMount() {
    axios
      .get(serverURL + "/entries")
      .then((response) => {
        let newAlbums = response.data.map((album) => {
          let parsedPhotos = JSON.parse(album.imageURL);

          let photoArray = parsedPhotos[0].path.split("/");
          photoArray[0] = serverURL;
          parsedPhotos[0].path = photoArray.join("/");

          return {
            photo: parsedPhotos[0],
            id: album.id,
            location: album.location,
          };
        });

        this.setState({
          entryList: response.data,
          entryInfo: response.data[0],
          albumArray: newAlbums,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <section className="albums">
          <div className="albums__wrapper">
            <h1 className="albums__sort">gallery</h1>
            <div className="albums-content">
              <div className="albums-content__container">
                {this.state.albumArray.map((album, index) => (
                  <Link
                    to={`gallery/multi/${album.id}`}
                    key={index}
                    className={
                      album.id % 5 === 0
                        ? "box zoom-in col-row-span-2"
                        : "box zoom-in "
                    }
                  >
                    <img className="image" src={album.photo.path} alt=""></img>

                    <p>{album.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default AlbumView;
