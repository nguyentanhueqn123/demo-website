import React from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer";
import { hotelData } from "../../data/hotelData";
import CustomTable from "../../components/Table/Table";
import { formatPrice, roundPriceToInt } from "../../utils/formatPrice";
import Toast from "../../components/Toast/Toast";

const ActualData: React.FC = () => {
  const showToast = Toast();

  const totals = hotelData.reduce(
    (acc: any, row: any) => {
      acc.total_room_in_hotel += row.total_room_in_hotel;
      acc.room_revenue += row.room_revenue;
      acc.FB_revenue += row.FB_revenue;
      acc.other_revenue += row.other_revenue;
      acc.total_revenue += row.total_revenue;
      acc.Occ += row.Occ; // Lưu ý: Đối với % Occupancy, bạn có thể cần tính trung bình thay vì tổng
      acc.ADR += row.ADR; // Lưu ý: Đối với ADR, bạn có thể cần tính trung bình thay vì tổng
      acc.hotel_room += row.hotel_room;
      acc.available_rooms += row.available_rooms;
      return acc;
    },
    {
      total_room_in_hotel: 0,
      room_revenue: 0,
      FB_revenue: 0,
      other_revenue: 0,
      total_revenue: 0,
      Occ: 0,
      ADR: 0,
      hotel_room: 0,
      available_rooms: 0,
    }
  );
  const toggleItemSelection = () => {
    showToast("Cannot be selected", "warning", "top");
  };

  const columns = [
    {
      header: "",
      accessor: "",
      Cell: (value: any) => (
        <input type="checkbox" checked={false} onChange={toggleItemSelection} />
      ),
    },
    {
      header: "Property",
      accessor: "property",
      Footer: () => <span>Grand Total</span>,
    },
    {
      header: "Total Room in Hotel",
      accessor: "total_room_in_hotel",
      Cell: (value: number) => <span>{roundPriceToInt(value)}</span>,
      Footer: () => <span>{roundPriceToInt(totals.total_room_in_hotel)}</span>,
    },
    {
      header: "Room Revenue",
      accessor: "room_revenue",
      Cell: (value: number) => <span>$ {roundPriceToInt(value)}</span>,
      Footer: () => <span>{roundPriceToInt(totals.room_revenue)}</span>,
    },
    {
      header: "F&B Revenue",
      accessor: "FB_revenue",
      Cell: (value: number) => <span>$ {formatPrice(value)}</span>,
      Footer: () => <span>{roundPriceToInt(totals.FB_revenue)}</span>,
    },
    {
      header: "Other Revenue",
      accessor: "other_revenue",
      Cell: (value: number) => <span>$ {formatPrice(value)}</span>,
      Footer: () => <span>{roundPriceToInt(totals.other_revenue)}</span>,
    },
    {
      header: "Total Revenue",
      accessor: "total_revenue",
      Cell: (value: number) => <span>$ {formatPrice(value)}</span>,
      Footer: () => <span>{roundPriceToInt(totals.total_revenue)}</span>,
    },
    {
      header: "Occ %",
      accessor: "Occ",
      Cell: (value: number) => <span>{formatPrice(value)} %</span>,
      Footer: () => <span>{formatPrice(totals.Occ)} %</span>,
    },
    {
      header: "ADR",
      accessor: "ADR",
      Cell: (value: number) => <span>{formatPrice(value)}</span>,
      Footer: () => <span>{formatPrice(totals.ADR)}</span>,
    },
    {
      header: "Hotel Room",
      accessor: "hotel_room",
      Cell: (value: number) => <span>{roundPriceToInt(value)}</span>,
      Footer: () => <span>{roundPriceToInt(totals.hotel_room)}</span>,
    },
    {
      header: "Available Rooms",
      accessor: "available_rooms",
      Cell: (value: number) => <span>{roundPriceToInt(value)}</span>,
      Footer: () => <span>{roundPriceToInt(totals.available_rooms)}</span>,
    },
  ];

  return (
    <AdminContainer>
      <div className="bg-red-400">
        <h1>Actual Data</h1>
      </div>
      <CustomTable data={hotelData} columns={columns} itemsPerPage={3} />
    </AdminContainer>
  );
};

export default ActualData;
