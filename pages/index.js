import HeadTag from '../components/HeadTag';
import { useRouter } from 'next/router';
import withApollo from '../hoc/withApollo';
import { useSample } from '../apollo/apolloActions';

const Home = () => {

  const { data, loading, error } = useSample();

  console.log("data", data);

  return (
    <div>
      <HeadTag
        title="Home"
        description="devblog is an blog website people can publish their blog post"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            Home Component
          </div>
        </div>
      </div>
    </div>
  )
}

export default withApollo(Home);
