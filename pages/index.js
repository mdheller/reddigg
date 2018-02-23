/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import fetch from 'isomorphic-unfetch';
import $ from 'jquery';
import Layout from '../components/Layout';
import TopicForm from '../components/TopicForm';
import AlertDismissable from '../components/AlertDismissable';

class Index extends React.Component {
  static reload() {
    window.location.replace(window.location.href);
  }
  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const res = await fetch(`${baseUrl}/all`);
    const data = await res.json();
    return { topics: data.topics.slice(0, 20) };
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
          Index.reload();
        })
        .fail((jqxhr) => {
          this.setState({ alertText: `${jqxhr.readyState === 0 ? 'No connection' : `${act} failed`}. Please try again!`, alertShow: true });
        });
    };
  }
  render() {
    return (
      <div>
        <Layout>
          <TopicForm />
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
                  <td>{ topic.title }</td>
                  <td>{ topic.score }</td>
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
        </Layout>
      </div>
    );
  }
}
Index.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired),
};
Index.defaultProps = {
  topics: [],
};
export default Index;
