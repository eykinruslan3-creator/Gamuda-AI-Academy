function QueryString() {
  const [queryParams] = useSearchParams();
  const id = queryParams.id;
  const category = queryParams.category;

  return (
    <div>
      <h2>Query String Parameters</h2>
      <p>Name: {id}</p>
      <p>Age: {category}</p>
    </div>
  );
}

export default QueryString;
