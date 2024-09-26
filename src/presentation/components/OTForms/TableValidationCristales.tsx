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
          <th>INDICE</th>
          <th>DIAMETRO</th>
          <th>ESF </th>
          <th>CIL</th>
          <th>UBICACION</th>
        </tr>
      </thead>
      <tbody>
        {data.map((codigos: any) => (
          <tr key={codigos.codigo}>
            <td className="text-black text-center">{codigos.codigo}</td>
            <td className="text-black text-right">{codigos.indice}</td>
            <td className="text-black text-center">{codigos.diametro}</td>
            <td className="text-black text-center">{codigos.esferico}</td>
            <td className="text-black text-center">{codigos.cilindrico}</td>
            <td className="text-black">{codigos.ubicacion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableValidationCristales;
