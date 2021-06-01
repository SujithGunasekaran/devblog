import HeadTag from '../components/HeadTag';

const Home = () => {
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

export default Home;
