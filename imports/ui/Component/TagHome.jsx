import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6
import { insertTag } from "/api/methods.js";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import ModalSensor from "./modalSensor.jsx";
import Sensores from "./Sensores.jsx";
import EventHome from "./events/EventHome.jsx";
import MyMap from "./maps/MyMap.js";
import LoaderExampleText from "./LoaderExampleText.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  List,
  useRouteMatch
} from "react-router-dom";
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

//const App = () => (

export class TagHome extends Component {
  state = {
    tag: "",
    tagId: "",
    descripcion: "",
    habilitarBoton: false,
    modalOpen: false
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const textCodigo = ReactDOM.findDOMNode(
      this.refs.textInputCodigo
    ).value.trim();
    const textDescripcion = ReactDOM.findDOMNode(
      this.refs.textInputDescripcion
    ).value.trim();
    const one = {
      tag: textCodigo,
      descripcion: textDescripcion
    };
    // Call the Method
    //insertLocacion.validate(one);
    insertTag.call(one, (err, res) => {
      if (err) {
        console.log(err);
      }
    });

    ReactDOM.findDOMNode(this.refs.textInputCodigo).value = "";
  }

  renderForm() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group widths="equal">
          <Form.Field>
            <input ref="textInputCodigo" placeholder="identificador" />
          </Form.Field>
          <Form.Field>
            <input ref="textInputDescripcion" placeholder="Dominio" />
          </Form.Field>
        </Form.Group>
        <Button color="grey" type="submit" size="mini">
          Guardar
        </Button>
      </Form>
    );
  }

  renderTags() {
    return (
      <Table singleLine selectable>
        <Table.Header>
          <Table.Row />
        </Table.Header>

        <Table.Body>{this.renderFila()}</Table.Body>
      </Table>
    );
  }
  clickFila(id, tag, descripcion) {
    this.setState({
      tag: tag,
      tagId: id,
      descripcion: descripcion,
      habilitarBoton: true
    });
  }

  renderFila() {
    return this.props.tags.map(tag => (
      <Table.Row
        key={tag._id}
        onClick={() => this.clickFila(tag._id, tag.tag, tag.descripcion)}
      >
        <Table.Cell collapsing>{tag.tag}</Table.Cell>
        <Table.Cell collapsing>{tag.descripcion}</Table.Cell>
      </Table.Row>
    ));
  }

  renderModal() {
    return (
      <ModalSensor
        tagId={this.state.tagId}
        tag={this.state.tag}
        modalOpen={this.state.modalOpen}
        handleClose={() => {
          this.setState({ modalOpen: false });
        }}
      />
    );
  }
  render() {
    if (this.props.isLoading) {
      return <LoaderExampleText />;
    }

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={3}>
              <Segment raised>
                <Header dividing>Nuevo GPS</Header>
                {this.renderForm()}
              </Segment>
              <Segment raised> {this.renderTags()}</Segment>
            </Grid.Column>
            <Grid.Column width={11}>
              <Segment raised>
                <MyMap
                  tag={this.state.tag}
                  descripcion={this.state.descripcion}
                />
                <EventHome topico={this.state.tag} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
          {this.renderModal()}
        </Grid>
        <Segment />
      </div>
    );
  }
}

export default withTracker(({}) => {
  const handles = [Meteor.subscribe("tags")];
  const loading = handles.some(handle => !handle.ready());
  return {
    tags: Tags.find({}).fetch(),
    isLoading: loading
  };
})(TagHome);
