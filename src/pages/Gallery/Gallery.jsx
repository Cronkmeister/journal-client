import "./Gallery.scss";
import NavBar from "../../components/NavBar/NavBar";
import AddNew from "../AddNew/AddNew";
import AddNewSuccess from "../AddNewSuccess/AddNewSuccess";
import PhotoMap from "../PhotoMap/PhotoMap";
import AlbumView from "../../components/AlbumView/AlbumView";
import MultiView from "../../components/MultiView/MultiView";
import FullView from "../../components/FullView/FullView";
import Edit from "../Edit/Edit";
import { Route, Switch } from "react-router-dom";

function Gallery(props) {
  document.title = "Film Journal";
  return (
    <>
      <NavBar />
      <section className="gallery">
        {/* <div className="gallery__wrapper"> */}
        <Switch>
          <Route path={`${props.match.path}`} exact component={AlbumView} />
          <Route path={`/gallery/multi/:id`} component={MultiView} />
          <Route path={`${props.match.path}/full/:id`} component={FullView} />
          <Route path={`${props.match.path}/map`} component={PhotoMap} />
          <Route path={`/gallery/edit/:id`} component={Edit} />
          <Route path={`${props.match.path}/new`} exact component={AddNew} />
          <Route
            path={`${props.match.path}/new/success`}
            component={AddNewSuccess}
          />
        </Switch>
        {/* </div> */}
      </section>
    </>
  );
}

export default Gallery;
