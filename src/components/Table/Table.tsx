import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import "./Table.sass";

interface TableColumn {
  header: string;
  accessor: string;
  Cell?: (value: any, row: TableData) => JSX.Element | string;
  Footer?: any;
}

interface TableData {
  [key: string]: any;
}

interface Props {
  data: TableData[];
  columns: TableColumn[];
  itemsPerPage: number;
}

const CustomTable: React.FC<Props> = ({ data, columns, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItems, setSelectedItems] = useState<Set<any>>(new Set());

  const lastIndex: number = currentPage * itemsPerPage;
  const firstIndex: number = lastIndex - itemsPerPage;
  const currentItems: TableData[] = data.slice(firstIndex, lastIndex);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  const totalPages: number = Math.ceil(data.length / itemsPerPage);
  let items: JSX.Element[] = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const toggleItemSelection = (item: any) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(item)) {
      newSelection.delete(item);
    } else {
      newSelection.add(item);
    }
    setSelectedItems(newSelection);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead className="bg-thead">
          <tr>
            {/* <th>#</th> */}
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {/* <td>
                <input
                  type="checkbox"
                  checked={selectedItems.has(item)}
                  onChange={() => toggleItemSelection(item)}
                />
              </td> */}
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.Cell
                    ? column.Cell(item[column.accessor], item)
                    : item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            {columns.map((column, index) => (
              <td key={index}>{column.Footer ? column.Footer(data) : null}</td>
            ))}
          </tr>
        </tfoot>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev
          onClick={() => paginate(Math.max(1, currentPage - 1))}
        />
        {items}
        <Pagination.Next
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
        />
        <Pagination.Last onClick={() => paginate(totalPages)} />
      </Pagination>
    </>
  );
};
export default CustomTable;
