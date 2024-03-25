import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FiPlus, FiMinus } from "react-icons/fi";

interface Meal {
  report_date: string;
  total: {
    total_actual: {
      count: number;
      percentage_count: number;
      sales: number;
      percentage_sales: number;
    };
    adults_actual: {
      count: number;
      percentage_count: number;
      sales: number;
      percentage_sales: number;
    };
    children_actual: {
      count: number;
      percentage_count: number;
      sales: number;
      percentage_sales: number;
    };
  };
  outlet: Outlet[];
}

interface Outlet {
  outlet_code: string;
  outlet_name: string;
  total: {
    total_actual: {
      count: number;
      percentage_count: number;
      sales: number;
      percentage_sales: number;
    };
    adults_actual: {
      count: number;
      percentage_count: number;
      sales: number;
      percentage_sales: number;
    };
    children_actual: {
      count: number;
      percentage_count: number;
      sales: number;
      percentage_sales: number;
    };
  };
  breakfast: any;
  lunch: any;
  dinner: any;
}

const TableComponent: React.FC<{ data: Meal[] }> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const handleRowClick = (id: string) => {
    // Cập nhật trạng thái mở/đóng dựa trên id (có thể là reportDate hoặc outlet_code)
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th rowSpan={2}></th>
            <th rowSpan={2}>Date</th>
            <th rowSpan={2}>RVC</th>
            <th rowSpan={2}>Period</th>
            {/* <th colSpan={4}>Expected</th>
          <th colSpan={4}>Actual</th>
          <th colSpan={2}>Count (%)</th>
          <th colSpan={2}>Sales (%)</th> */}
          </tr>
          <tr>
            <th>A. Count</th>
            <th>C. Count</th>
            <th>A. Sales</th>
            <th>C. Sales</th>
            <th>Count (%)</th>
            <th>Sales (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((meal) => (
            <React.Fragment key={meal.report_date}>
              <tr>
                <td onClick={() => handleRowClick(meal.report_date)}>
                  {expandedRows[meal.report_date] ? <FiMinus /> : <FiPlus />}
                </td>
                <td>{meal.report_date}</td>
                <td></td>
                <td></td>

                <td>{meal.total.total_actual.count}</td>
                <td>{meal.total.children_actual.count}</td>
                <td>{meal.total.total_actual.sales}</td>
                <td>{meal.total.children_actual.sales}</td>
                <td>{meal.total.total_actual.percentage_count}</td>
                <td>{meal.total.total_actual.percentage_sales}</td>
              </tr>
              {expandedRows[meal.report_date] &&
                meal.outlet.map((outlet, index) => (
                  <React.Fragment key={outlet.outlet_code}>
                    <tr>
                      <td></td>
                      <td onClick={() => handleRowClick(outlet.outlet_code)}>
                        {expandedRows[outlet.outlet_code] ? (
                          <FiMinus />
                        ) : (
                          <FiPlus />
                        )}
                      </td>
                      <td>{outlet.outlet_code}</td>
                      <td></td>
                      <td>{outlet.total.total_actual.count}</td>{" "}
                      <td>{outlet.total.children_actual.count}</td>{" "}
                      <td>{outlet.total.total_actual.sales}</td>{" "}
                      <td>{outlet.total.children_actual.sales}</td>{" "}
                      <td>{outlet.total.total_actual.percentage_count}</td>{" "}
                      <td>{outlet.total.total_actual.percentage_sales}</td>{" "}
                    </tr>
                    {expandedRows[outlet.outlet_code] && (
                      <>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td>Breakfast</td>
                          <td>{outlet.breakfast.total.total_actual.count}</td>
                          <td>
                            {outlet.breakfast.total.children_actual.count}
                          </td>
                          <td>{outlet.breakfast.total.total_actual.sales}</td>
                          <td>
                            {outlet.breakfast.total.children_actual.sales}
                          </td>
                          <td>
                            {
                              outlet.breakfast.total.total_actual
                                .percentage_count
                            }
                          </td>
                          <td>
                            {
                              outlet.breakfast.total.total_actual
                                .percentage_sales
                            }
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>

                          <td>Lunch</td>
                          <td>{outlet.lunch.total.total_actual.count}</td>
                          <td>{outlet.lunch.total.children_actual.count}</td>
                          <td>{outlet.lunch.total.total_actual.sales}</td>
                          <td>{outlet.lunch.total.children_actual.sales}</td>
                          <td>
                            {outlet.lunch.total.total_actual.percentage_count}
                          </td>
                          <td>
                            {outlet.lunch.total.total_actual.percentage_sales}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Dinner</td>
                          <td>{outlet.dinner.total.total_actual.count}</td>
                          <td>{outlet.dinner.total.children_actual.count}</td>
                          <td>{outlet.dinner.total.total_actual.sales}</td>
                          <td>{outlet.dinner.total.children_actual.sales}</td>
                          <td>
                            {outlet.dinner.total.total_actual.percentage_count}
                          </td>
                          <td>
                            {outlet.dinner.total.total_actual.percentage_sales}
                          </td>
                        </tr>
                      </>
                    )}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <Table striped bordered hover className="table-v2">
        <thead>
          <tr>
            <th rowSpan={2}></th>
            <th rowSpan={2}>Date</th>
            <th rowSpan={2}>RVC</th>
            <th rowSpan={2}>Period</th>
            {/* <th colSpan={4}>Expected</th>
          <th colSpan={4}>Actual</th>
          <th colSpan={2}>Count (%)</th>
          <th colSpan={2}>Sales (%)</th> */}
          </tr>
          <tr>
            <th>A. Count</th>
            <th>C. Count</th>
            <th>A. Sales</th>
            <th>C. Sales</th>
            <th>Count (%)</th>
            <th>Sales (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((meal) => (
            <React.Fragment key={meal.report_date}>
              <tr>
                <td></td>
                <td>{meal.report_date}</td>
                <td></td>
                <td></td>

                <td>{meal.total.total_actual.count}</td>
                <td>{meal.total.children_actual.count}</td>
                <td>{meal.total.total_actual.sales}</td>
                <td>{meal.total.children_actual.sales}</td>
                <td>{meal.total.total_actual.percentage_count}</td>
                <td>{meal.total.total_actual.percentage_sales}</td>
              </tr>
              {meal.outlet.map((outlet, index) => (
                <React.Fragment key={outlet.outlet_code}>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{outlet.outlet_code}</td>
                    <td></td>
                    <td>{outlet.total.total_actual.count}</td>{" "}
                    <td>{outlet.total.children_actual.count}</td>{" "}
                    <td>{outlet.total.total_actual.sales}</td>{" "}
                    <td>{outlet.total.children_actual.sales}</td>{" "}
                    <td>{outlet.total.total_actual.percentage_count}</td>{" "}
                    <td>{outlet.total.total_actual.percentage_sales}</td>{" "}
                  </tr>
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td>Breakfast</td>
                      <td>{outlet.breakfast.total.total_actual.count}</td>
                      <td>{outlet.breakfast.total.children_actual.count}</td>
                      <td>{outlet.breakfast.total.total_actual.sales}</td>
                      <td>{outlet.breakfast.total.children_actual.sales}</td>
                      <td>
                        {outlet.breakfast.total.total_actual.percentage_count}
                      </td>
                      <td>
                        {outlet.breakfast.total.total_actual.percentage_sales}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td>Lunch</td>
                      <td>{outlet.lunch.total.total_actual.count}</td>
                      <td>{outlet.lunch.total.children_actual.count}</td>
                      <td>{outlet.lunch.total.total_actual.sales}</td>
                      <td>{outlet.lunch.total.children_actual.sales}</td>
                      <td>
                        {outlet.lunch.total.total_actual.percentage_count}
                      </td>
                      <td>
                        {outlet.lunch.total.total_actual.percentage_sales}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Dinner</td>
                      <td>{outlet.dinner.total.total_actual.count}</td>
                      <td>{outlet.dinner.total.children_actual.count}</td>
                      <td>{outlet.dinner.total.total_actual.sales}</td>
                      <td>{outlet.dinner.total.children_actual.sales}</td>
                      <td>
                        {outlet.dinner.total.total_actual.percentage_count}
                      </td>
                      <td>
                        {outlet.dinner.total.total_actual.percentage_sales}
                      </td>
                    </tr>
                  </>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;
