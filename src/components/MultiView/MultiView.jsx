import "./MultiView.scss";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiFullscreenLine } from "react-icons/ri";
import { MdOutlineGridView, MdOutlineEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import Modal from "../Modal/Modal";

const serverURL = `https://journal-server-jc.herokuapp.com`;

class MultiView extends Component {
  state = {
    selectedAlbumDetail: [],
    selectedPhotos: [],
    isShowing: false,
  };

  componentDidMount() {
    document.title = "gallery image view:multi";
    axios
      .get(`${serverURL}/entries/${this.props.match.params.id}`)
      .then((response) => {
        //parse whole url to get array of individual image paths
        let albumDetails = response.data;
        let parsedPhotos = JSON.parse(response.data.imageURL);
        //maps through array to get to remove 'public' from the path
        parsedPhotos = parsedPhotos.map((photo) => {
          let photoArray = photo.path.split("/");
          photoArray[0] = serverURL;
          photo.path = photoArray.join("/");
          return photo;
        });

        this.setState({
          selectedAlbumDetail: albumDetails,
          selectedPhotos: parsedPhotos,
        });
      })
      .catch((err) => console.log(err));
  }

  showModal() {
    this.setState({ isShowing: true });
  }
  hideModal() {
    this.setState({ isShowing: false });
  }

  render() {
    return (
      <>
        <section className="multiView">
          <div className="multiView__container">
            {/* <h2 className="multiView__location">
              {this.state.selectedAlbumDetail.date}
            </h2> */}
            <h1 className="multiView__title">
              {this.state.selectedAlbumDetail.location}
            </h1>
            <div className="multiView__container--buttons">
              <MdOutlineGridView className="view-button button-active" />
              <Link to={`/gallery/full/${this.state.selectedAlbumDetail.id}`}>
                <RiFullscreenLine className="view-button" />
              </Link>
              <div className="button-divider"></div>
              <Link to={`/gallery/edit/${this.state.selectedAlbumDetail.id}`}>
                <MdOutlineEdit className="gallery__button" />
              </Link>
              <HiOutlineTrash
                className="gallery__button"
                onClick={() => this.showModal()}
              />
            </div>
          </div>
          <div className="main-content">
            <div className="main-content__container">
              {this.state.selectedPhotos.map((album, index) => (
                <>
                  <img
                    className="image col-span-2"
                    src={album.path}
                    key={index}
                    alt="travel album"
                  ></img>

                  <div className="image"></div>
                </>
              ))}
            </div>
          </div>
          {this.state.isShowing ? (
            <Modal
              id={this.props.match.params.id}
              handleClose={() => this.hideModal()}
            />
          ) : (
            ""
          )}
        </section>
      </>
    );
  }
}

export default MultiView;
