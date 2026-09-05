import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="spinner">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading content</span>
      </Spinner>
    </div>
  );
}

export default Loading;
