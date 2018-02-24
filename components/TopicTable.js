/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Button, Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import AlertDismissable from './AlertDismissable';

class TopicTable extends React.Component {
  static reload() {
    window.location.replace(window.location.href);
  }
  constructor(props, context) {
    super(props, context);
    this.action = this.action.bind(this);
    this.state = {
      alertShow: false,
    };
  }
  action(act, id) {
    return () => {
      $.ajax({
        url: `/${act}/${id}`,
        type: 'PUT',
      })
        .done(() => {
          TopicTable.reload();
        })
        .fail((jqxhr) => {
          this.setState({
            alertText: `${jqxhr.readyState === 0 ? 'No connection' : `${act} failed`}. Please try again!`,
            alertShow: true,
          });
        });
    };
  }
  render() {
    return (
      <div>
        <AlertDismissable show={this.state.alertShow} text={this.state.alertText} />
        <Table striped hover>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Score</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.topics.map(topic => (
              <tr key={topic.id}>
                <td>{topic.title}</td>
                <td>{topic.score}</td>
                <td>
                  <Button onClick={this.action('upvote', topic.id)}>
                    <FontAwesome name="arrow-up" size="2x" />
                  </Button>
                  <Button onClick={this.action('downvote', topic.id)}>
                    <FontAwesome name="arrow-down" size="2x" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
TopicTable.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired),
};
TopicTable.defaultProps = {
  topics: [],
};

export default TopicTable;
