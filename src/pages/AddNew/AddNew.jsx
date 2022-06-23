import "./AddNew.scss";
import React, { Component } from "react";
import axios from "axios";
import FormData from "form-data";
import { Redirect } from "react-router-dom";

const serverURL = `https://journal-server-jc.herokuapp.com`;

class AddNew extends Component {
  state = {
    file: null,
    date: "",
    location: "",
    category: "",
    camera: "",
    film: "",
    notes: "",
    imageURL: "",
    isRedirecting: false,
  };

  //handle the files uploaded
  handleFile(e) {
    let file = e.target.files;
    this.setState({ file });
  }
  async handleUpload(e) {
    e.preventDefault();

    let newEntry = {
      date: this.state.date,
      location: this.state.location,
      category: this.state.category,
      camera: this.state.camera,
      film: this.state.film,
      textContent: this.state.notes,
    };

    await uploadImage(this.state.file, newEntry);
    this.setState({ isRedirecting: true });
  }

  //set state for other info inputs
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.state.isRedirecting) {
      return <Redirect to="/gallery/new/success" />;
    }

    return (
      <>
        <section className="new">
          <div className="new__wrapper">
            <form className="new__form" onSubmit={(e) => this.handleUpload(e)}>
              <h2 className="new__form-heading">new entry</h2>
              <div className="new__form-container">
                <div className="new__form-container--left">
                  <label>Upload</label>
                  <input
                    className="new__form-file-input"
                    name="galleryImage"
                    type="file"
                    onChange={(e) => this.handleFile(e)}
                    multiple
                  />
                  <label className="new__form-label">Date</label>
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
                    value={this.state.notes}
                    name="notes"
                  ></textarea>
                </div>
              </div>
              <div className="new__form-submit--container">
                <button className="new__form-submit" type="submit">
                  submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default AddNew;

//handle upload of image and package it with other info from form
const uploadImage = async (file, entry) => {
  try {
    const formData = new FormData();
    Array.from(file).forEach((img) => {
      formData.append("galleryImage", img);
    });
    //assign keys object containing entry details in order to append to formdata
    Object.keys(entry).forEach((key) => formData.append(key, entry[key]));
    formData.append("destination", "uploads");
    formData.append("create_thumbnail", true);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const url = `${serverURL}/upload`;

    const result = await axios.post(url, formData, config);
    console.log("Result: ", result);
  } catch (error) {
    console.error(error);
  }
};
