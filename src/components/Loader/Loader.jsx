import { FidgetSpinner } from 'react-loader-spinner';

export default function Loader() {
    const styles = {
      margin: '0 auto',
      display: 'block',
    };
    return (
      <FidgetSpinner
        visible={true}
        height="40"
        width="40"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={styles}
        wrapperClass="fidget-spinner-wrapper"
      />
    );
  }