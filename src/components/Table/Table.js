import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./Table.scss";

function Table(props) {
  const { customClass, columns, dataSource } = props;
  return (
    <ErrorBoundary>
      <table className={`custom-table ` + customClass}>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={column.title + "" + i}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.length ? dataSource.map((data, i) => (
            <tr key={data.title + "" + i}>
              {columns.map((column, i) => (
                <td key={column.title + "" + i}>
                  {column.template
                    ? column.template(data)
                    : data[column.key] || "-"}{" "}
                </td>
              ))}
            </tr>
          )) : <span className="no-data mt5">No Data</span>}
        </tbody>
      </table>
    </ErrorBoundary>
  );
}

export default React.memo(Table);
