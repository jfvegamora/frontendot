/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useTable } from "react-table";

interface ITableComponentProps<T> {
  tableHead: {
    cell: JSX.Element | string;
    key: string;
    visible: boolean;
    width?: string;
    alignment?: string;
    color?: boolean;
    background?: boolean;
    excelIndividual?: boolean;
  }[];
  data?: T[] | any;
  renderButtons?: (item: any) => React.ReactNode;
  handleSelectChecked?: (id: number) => void;
  handleSelectedCheckedAll?: (event: any, rowsIds: any) => void;
  toggleEditModal?: (id: number) => void;
  toggleEditOTModal?: (id: number, folio: any) => void;
  handleDeleteSelected?: (id: number) => void;
  toggleExcel?: (id: number) => void;
  selectedRows?: number[];
  pkToDelete?: any;
  setSelectedRows?: any;
  entidad: string;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showPdfButton?: boolean;
  showExcelButton?: boolean;
  showPermisoOTButton?: boolean;
  isOT?: boolean;
  idMenu: number;
  strBaseUrl?: string;
  strEntidad?: string;
  queryExcel?: any;
  setTotalRowIndex?: any;
  params?: any;
  togglePermisoOTModal?: () => void;
  leftEdit?: boolean;
}

const TableComponent3: React.FC<ITableComponentProps<any>> = React.memo(
  ({ data }) => {
    const columns: any = [
      {
        Header: "Checkbox",
        accessor: "checkbox",
      },
      {
        Header: "Folio",
        accessor: "folio",
      },
      {
        Header: "Ubicación",
        accessor: "ubicacion",
      },
      {
        Header: "Motivo",
        accessor: "motivo",
      },
      {
        Header: "Estado ID",
        accessor: "estado_id",
      },
      {
        Header: "Estado",
        accessor: "estado",
      },
      {
        Header: "Estado Impresión",
        accessor: "estado_impresion",
      },
      {
        Header: "Punto de Venta",
        accessor: "punto_venta",
      },
      {
        Header: "Código Proyecto",
        accessor: "codigo_proyecto",
      },
      {
        Header: "Proyecto",
        accessor: "proyecto",
      },
      {
        Header: "Establecimiento",
        accessor: "establecimiento",
      },
      {
        Header: "Cliente RUT",
        accessor: "cliente_rut",
      },
      {
        Header: "Cliente Nombre",
        accessor: "cliente_nombre",
      },
      {
        Header: "Fecha Atención",
        accessor: "fecha_atencion",
      },
      {
        Header: "Tipo Anteojo ID",
        accessor: "tipo_anteojo_id",
      },
      {
        Header: "Tipo Anteojo",
        accessor: "tipo_anteojo",
      },
      {
        Header: "A1 Armazón Código",
        accessor: "a1_armazon_codigo",
      },
      {
        Header: "A2 Armazón Código",
        accessor: "a2_armazon_codigo",
      },
      {
        Header: "A3 Armazón Código",
        accessor: "a3_armazon_codigo",
      },
      {
        Header: "CR1 OD Código",
        accessor: "cr1_od_codigo",
      },
      {
        Header: "CR1 OI Código",
        accessor: "cr1_oi_codigo",
      },
      {
        Header: "CR2 OD Código",
        accessor: "cr2_od_codigo",
      },
      {
        Header: "CR2 OI Código",
        accessor: "cr2_oi_codigo",
      },
      {
        Header: "Estado Validación",
        accessor: "estado_validacion",
      },
      {
        Header: "Número Envío",
        accessor: "num_envio",
      },
      {
        Header: "Número Rep. Firma",
        accessor: "num_rep_firma",
      },
      {
        Header: "Número Rep. Atención",
        accessor: "num_rep_atencion",
      },
      {
        Header: "Por Vencer",
        accessor: "por_vencer",
      },
      {
        Header: "Número OC",
        accessor: "num_oc",
      },
      {
        Header: "Número Guía",
        accessor: "num_guia",
      },
      {
        Header: "Número Factura",
        accessor: "num_factura",
      },
      {
        Header: "Imprimir QR",
        accessor: "imprimir_qr",
      },
      {
        Header: "Imprimir Tiquet",
        accessor: "imprimir_tiquet",
      },
      {
        Header: "Usuario ID",
        accessor: "usuario_id",
      },
      {
        Header: "Estado WhatsApp",
        accessor: "estado_wsp",
      },
      {
        Header: "Opción Montaje",
        accessor: "opcionmontaje",
      },
    ];

    console.log(data);

    const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    });

    console.log(headerGroups);

    return (
      <div className="gridCointainer">
        <table className="gridContainer">
          <thead className="gridTop">
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="gridData" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        color: "black",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

export default TableComponent3;
