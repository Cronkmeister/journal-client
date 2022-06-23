import "./FullView.scss";
import Slider from "../../components/Slider/Slider";
import Modal from "../Modal/Modal";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiFullscreenLine } from "react-icons/ri";
import { MdOutlineGridView, MdOutlineEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { convertTime } from "../../utilities/convertTime.js";

const serverURL = `https://journal-server-jc.herokuapp.com`;

class FullView extends Component {
  // constructor(props) {
  // super(props);
  state = {
    selectedAlbumDetail: [],
    selectedPhotos: [],
    isShowing: false,
  };

  componentDidMount() {
    document.title = "gallery image view:full";

    axios
      .get(`${serverURL}/entries/${this.props.match.params.id}`)
      .then((response) => {
        //parse whole url to get array of individual image paths
        let parsedPhotos = JSON.parse(response.data.imageURL);
        //maps through array to get to remove 'public' from the path
        parsedPhotos = parsedPhotos.map((photo) => {
          let photoArray = photo.path.split("/");
          photoArray[0] = serverURL;
          photo.path = photoArray.join("/");
          return photo;
        });
        this.setState({
          selectedAlbumDetail: response.data,
          selectedPhotos: parsedPhotos,
        });
      })
      .catch((err) => console.log(err));
  }

  showModal = () => {
    this.setState({ isShowing: true });
  };

  hideModal = () => {
    this.setState({ isShowing: false });
  };

  render() {
    return (
      <>
        <div className="gallery__wrapper">
          <div className="multiView__container">
            <h1 className="gallery__title">
              {this.state.selectedAlbumDetail.location}
            </h1>
            {/* <h2 className="multiView__location"></h2> */}
            <div className="multiView__container--buttons">
              <Link to={`/gallery/multi/${this.state.selectedAlbumDetail.id}`}>
                <MdOutlineGridView className="view-button" />
              </Link>
              <RiFullscreenLine className="view-button button-active" />
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
          <div className="gallery__image-container">
            <Slider
              selectedPhotos={this.state.selectedPhotos}
              slides={this.state.selectedPhotos}
            />

            <div className="gallery__image-info">
              <p className="gallery__image-info--date">
                {convertTime(this.state.selectedAlbumDetail.date)}
              </p>
              <p className="gallery__image-info--text">
                {this.state.selectedAlbumDetail.camera}
              </p>
              <p className="gallery__image-info--text">
                {this.state.selectedAlbumDetail.film}
              </p>
            </div>
            <p className="gallery__description">
              {this.state.selectedAlbumDetail.textContent}
            </p>
          </div>
          {this.state.isShowing ? (
            <Modal
              id={this.props.match.params.id}
              handleClose={() => this.hideModal()}
            />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default FullView;
