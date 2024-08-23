interface ITableValidationCristales {
  data: any;
}

const TableValidationCristales: React.FC<ITableValidationCristales> = ({
  data,
}) => {
  console.log(data);

  return (
    <table className="w-full h-full">
      <thead>
        <tr>
          <th>CODIGO</th>
          <th>UBICACION</th>
        </tr>
      </thead>
      <tbody>
        {data.map((codigos: any) => (
          <tr key={codigos.codigo}>
            <td className="text-black">{codigos.codigo}</td>
            <td className="text-black">ubicacion</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableValidationCristales;
