import React, { Component } from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";

// Task component - represents a single todo item
export default class Event extends Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.event.message}</Table.Cell>
        <Table.Cell>
          {moment(this.props.event.createdAt).format("DD-MM-YYYY, h:mm:ss a")}
        </Table.Cell>
      </Table.Row>
    );
  }
}
