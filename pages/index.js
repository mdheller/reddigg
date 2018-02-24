import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Layout from '../components/Layout';
import TopicForm from '../components/TopicForm';
import TopicTable from '../components/TopicTable';

const Index = props => (
  <div>
    <Layout>
      <TopicForm />
      <h1>Top 20 Topics</h1>
      <TopicTable topics={props.topics} />
      <Link href="/pages"><a>See more topics</a></Link>
    </Layout>
  </div>
);

Index.getInitialProps = async ({ req }) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(`${baseUrl}/all`);
  const data = await res.json();
  return { topics: data.topics.slice(0, 20) };
};

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
