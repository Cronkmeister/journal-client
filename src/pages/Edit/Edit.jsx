import "./Edit.scss";
import React, { Component } from "react";
import axios from "axios";
import { convertTime } from "../../utilities/convertTime";

const serverURL = `https://journal-server-jc.herokuapp.com`;

class Edit extends Component {
  state = {
    location: "",
    category: "",
    textContent: "",
    date: "",
    imageURL: "",
    camera: "",
    film: "",
    selectedPhotos: [],
    firstPhoto: "",
    isSaved: false,
  };

  componentDidMount() {
    document.title = "Edit Entry";
    this.fetchEntryInfo();
  }

  //load the details from entry to be editted
  fetchEntryInfo() {
    let id = this.props.match.params.id;
    axios
      .get(`${serverURL}/entries/${id}`)
      .then((response) => {
        let data = response.data;
        //set state for form field with response data
        this.setState({
          date: convertTime(data.date),
          location: data.location,
          category: data.category,
          camera: data.camera,
          film: data.film,
          textContent: data.textContent,
        });
        // get photos from server URL path
        let parsedPhotos = JSON.parse(response.data.imageURL);
        parsedPhotos = parsedPhotos.map((photo) => {
          let photoArray = photo.path.split("/");
          photoArray[0] = serverURL;
          photo.path = photoArray.join("/");
          return photo;
        });

        this.setState({
          selectedPhotos: parsedPhotos,
          firstPhoto: parsedPhotos[0].path,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //allows for form field values to be changed
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //save the new entry and make PUT request
  handleSubmit = (e) => {
    e.preventDefault();
    let id = this.props.match.params.id;

    const editedEntry = {
      location: this.state.location,
      category: this.state.category,
      textContent: this.state.textContent,
      date: this.state.date,
      camera: this.state.camera,
      film: this.state.film,
    };

    axios
      .put(`${serverURL}/entries/${id}`, editedEntry)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isSaved: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <section className="new">
          <div className="edit__background-container">
            {/* <img
              className="edit__background-image"
              src={this.state.firstPhoto}
              alt="background image from album"
            ></img> */}
            <div className="new__wrapper">
              <form className="new__form" onSubmit={this.handleSubmit}>
                <h2 className="new__form-heading">edit entry</h2>
                <div className="new__form-container">
                  <div className="new__form-container--left">
                    <label className="new__form-label">Date yyyy-mm-dd</label>
                    <input
                      className="new__form-input"
                      onChange={this.handleChange}
                      value={this.state.date}
                      name="date"
                    ></input>
                    <label className="new__form-label">Location</label>
                    <input
                      className="new__form-input"
                      onChange={this.handleChange}
                      value={this.state.location}
                      name="location"
                    ></input>
                    <label className="new__form-label">Category</label>
                    <input
                      className="new__form-input"
                      onChange={this.handleChange}
                      value={this.state.category}
                      name="category"
                    ></input>
                  </div>
                  <div className="new__form-container--right">
                    <label className="new__form-label">Camera</label>
                    <input
                      className="new__form-input"
                      onChange={this.handleChange}
                      value={this.state.camera}
                      name="camera"
                    ></input>
                    <label className="new__form-label">Film</label>
                    <input
                      className="new__form-input"
                      onChange={this.handleChange}
                      value={this.state.film}
                      name="film"
                    ></input>
                    <label className="new__form-label">Notes</label>
                    <textarea
                      className="new__form-textarea"
                      onChange={this.handleChange}
                      value={this.state.textContent}
                      name="notes"
                    ></textarea>
                  </div>
                </div>
                <div className="new__form-submit--container">
                  <button
                    className="edit__button-back"
                    onClick={() => this.props.history.goBack()}
                  >
                    go back
                  </button>
                  <button className="new__form-submit" type="submit">
                    save
                  </button>
                  {this.state.isSaved ? (
                    <p className="edit__saved">saved!</p>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Edit;
