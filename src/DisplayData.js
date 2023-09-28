
function DisplayData(props) {
  const { apiData, onlyInMyCollection } = props;

  if (!apiData.results) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="display-wrapper">
        <table>
          <thead>
            <tr>
              <th>-</th>
              <th>Title</th>
              <th>Released</th>
              <th>Formats</th>
            </tr>
          </thead>
          <tbody>
            {apiData.results.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.thumb} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.year}</td>
                <td>{item.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DisplayData;
