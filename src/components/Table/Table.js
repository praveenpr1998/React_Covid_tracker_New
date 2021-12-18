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
        {dataSource.length ?
        <tbody>
          {dataSource.map((data, i) => (
            <tr key={data.title + "" + i}>
              {columns.map((column, i) => (
                <td key={column.title + "" + i}>
                  {column.template
                    ? column.template(data)
                    : data[column.key] || "-"}{" "}
                </td>
              ))}
            </tr>
          ))}
        </tbody> :<tbody className="no-data mt5"><tr><td>No Data</td></tr></tbody>}
      </table>
    </ErrorBoundary>
  );
}

export default React.memo(Table);
