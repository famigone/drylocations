import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { withTracker } from "meteor/react-meteor-data";
import {
  Grid,
  Input,
  Table,
  Label,
  Menu,
  Card,
  Icon,
  Image,
  Rating,
  Button,
  Progress,
  Message,
  Container,
  Divider,
  Segment,
  Form,
  Modal,
  Header
} from "semantic-ui-react";
const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "green",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {text}
  </div>
);

class MyMap extends Component {
  static defaultProps = {
    center: {
      lat: -38.92,
      lng: -67.99
    },
    zoom: 11
  };
  renderHeader() {
    return (
      <Segment raised>
        <Header as="h2">
          <Icon name="wifi" />
          <Header.Content>
            Sensor {this.props.tag} {this.props.descripcion}
            <Header.Subheader>
              Último latido:{" "}
              {this.props.latido
                ? moment(this.props.latido.createdAt).format(
                    "DD-MM-YYYY, h:mm:ss a"
                  )
                : "Seleccionar Batea"}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
    );
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div>
        {this.renderHeader()}
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDCtxARRi2hLxKGlg8m2lptWTwueLBHQV8"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={-38.926905}
              lng={-67.997166}
              text={this.props.tag}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default withTracker(({ tag, descripcion }) => {
  //console.log("topicazo: ", topico.topico);
  const subEvent = Meteor.subscribe("eventsLimited", tag);
  let isLoading = !subEvent.ready();
  return {
    latido: Events.findOne(),
    isLoading: isLoading
  };
})(MyMap);
