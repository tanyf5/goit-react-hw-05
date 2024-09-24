export default function ErrorMessage({ message }) {
    return (
      <div>
        <h3>Something wrong! Please reload page</h3>
        <p>Error: {message}</p>
      </div>
    );
  }