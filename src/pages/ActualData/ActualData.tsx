import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer";
import CustomTable from "../../components/Table/Table";
import { formatPrice, roundPriceToInt } from "../../utils/formatPrice";
import { useSelector } from "react-redux";
import CheckBox from "../../components/Checkbox/Checkbox";
import { useHistory, useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import BarChart from "../../components/Chart/Chart";
import { IonButton, IonContent, IonIcon } from "@ionic/react";
import Toast from "../../components/Toast/Toast";
import {
  AiFillDollarCircle,
  AiFillCreditCard,
  AiFillLayout,
  AiFillGift,
} from "react-icons/ai";
import { trashBinOutline } from "ionicons/icons";
import "./ActualData.scss";

const ActualData: React.FC = () => {
  const hotels = useSelector((state: any) => state.hotel);

  const [selectedHotels, setSelectedHotels] = useState<number[]>([]);

  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [debouncedProperties] = useDebounce(selectedProperties, 500); // Debounce trong 500ms
  const [searchTerm, setSearchTerm] = useState<string>(""); // Từ khóa tìm kiếm
  const history = useHistory();
  const location = useLocation();

  const showToast = Toast();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedPropertiesFromURL = queryParams.getAll("type");
    setSelectedProperties(selectedPropertiesFromURL);
  }, [location]);

  const handleChangeCheckbox = (property: string, checked: boolean) => {
    let updatedSelectedProperties: string[] = [];
    if (checked) {
      updatedSelectedProperties = [...selectedProperties, property];
    } else {
      updatedSelectedProperties = selectedProperties.filter(
        (selectedProperty) => selectedProperty !== property
      );
    }
    setSelectedProperties(updatedSelectedProperties);

    const queryParams = new URLSearchParams();
    updatedSelectedProperties.forEach((property) =>
      queryParams.append("type", property)
    );
    history.push({ search: queryParams.toString() });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Update URL
    history.push(`?typeProp=${event.target.value}`);
  };

  const filteredHotels =
    selectedProperties.length > 0
      ? hotels.filter((hotel: any) =>
          debouncedProperties.includes(hotel.property)
        )
      : hotels;

  const searchedHotels = searchTerm
    ? filteredHotels.filter((hotel: any) =>
        hotel.property.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredHotels;

  const totals = searchedHotels.reduce(
    (acc: any, row: any) => {
      acc.total_room_in_hotel += row.total_room_in_hotel;
      acc.room_revenue += row.room_revenue;
      acc.FB_revenue += row.FB_revenue;
      acc.other_revenue += row.other_revenue;
      acc.total_revenue += row.total_revenue;
      acc.Occ += row.Occ;
      acc.ADR += row.ADR;
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

  const toggleItemSelection = (id: number) => {
    const updatedSelectedHotels = selectedHotels.includes(id)
      ? selectedHotels.filter((hotelId) => hotelId !== id)
      : [...selectedHotels, id];
    setSelectedHotels(updatedSelectedHotels);
    console.log("Selected hotels:", updatedSelectedHotels);
  };

  const columns = [
    // {
    //   header: "#",
    //   accessor: "id",
    //   Cell: (index: number) => (
    //     <input
    //       type="checkbox"
    //       checked={selectedHotels.includes(hotels[index].id)}
    //       onChange={() => toggleItemSelection(hotels[index].id)}
    //     />
    //   ),
    // },
    {
      header: "ID",
      accessor: "id",
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

  // total các property tương ứng
  const totalRoomInHotel: number = hotels.reduce(
    (total: number, hotel: any) => total + hotel.total_room_in_hotel,
    0
  );

  const totalRoomRevenue: number = hotels.reduce(
    (total: number, hotel: any) => total + hotel.room_revenue,
    0
  );

  const totalFBRevenue: number = hotels.reduce(
    (total: number, hotel: any) => total + hotel.FB_revenue,
    0
  );

  const totalRevenue: number = hotels.reduce(
    (total: number, hotel: any) => total + hotel.total_revenue,
    0
  );

  // Hàm xử lý khi click vào nút "Clear Filter"
  const handleClearFilter = () => {
    setSelectedProperties([]);
    setSearchTerm("");
    setSelectedProperties([]);

    const queryParams = new URLSearchParams();
    history.push({ search: queryParams.toString() });
    showToast("Filter cleared successfully", "success", "top");
  };

  return (
    <IonContent>
      <AdminContainer>
        <h4 className="font-bold my-2">Actual Data</h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-3 md:gap-x-5 text-center my-4">
          <div className="bg-[#74E291] p-3 md:p-3 rounded-lg flex flex-col items-center justify-center shadow-md">
            <div className="flex flex-row md:flex-col justify-center items-center">
              <AiFillLayout className="text-2xl md:text-4xl text-white" />
              <span className="ml-2 text-white">Total Room in Hotel</span>
            </div>
            <span className="text-white font-bold text-xl md:text-2xl">
              $ {roundPriceToInt(totalRoomInHotel) || 0}
            </span>
          </div>

          <div className="bg-[#8ECDDD] p-3 md:p-3 rounded-lg flex flex-col items-center justify-center shadow-md">
            <div className="flex flex-row md:flex-col justify-center items-center">
              <AiFillDollarCircle className="text-2xl md:text-4xl text-white" />
              <span className="ml-2 text-white">Total Revenue</span>
            </div>
            <span className="text-white font-bold text-xl md:text-2xl">
              $ {roundPriceToInt(totalRevenue) || 0}
            </span>
          </div>

          <div className="bg-[#E6B9DE] p-3 md:p-3 rounded-lg flex flex-col items-center justify-center shadow-md">
            <div className="flex flex-row md:flex-col justify-center items-center">
              <AiFillCreditCard className="text-2xl md:text-4xl text-white" />
              <span className="ml-2 text-white">Room Revenue</span>
            </div>
            <span className="text-white font-bold text-xl md:text-2xl">
              $ {roundPriceToInt(totalRoomRevenue) || 0}
            </span>
          </div>

          <div className="bg-[#D7C0AE]  p-3 md:p-3 rounded-lg flex flex-col items-center justify-center shadow-md">
            <div className="flex flex-row md:flex-col justify-center items-center">
              <AiFillGift className="text-2xl md:text-4xl text-white" />
              <span className="ml-2 text-white">F&B Revenue</span>
            </div>
            <span className="text-white font-bold text-xl md:text-2xl">
              $ {roundPriceToInt(totalFBRevenue) || 0}
            </span>
          </div>
        </div>

        <div className="">
          <div className="w-full md:p-5 rounded-lg md:bg-[#F2F2F2] grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 mt-2 mb-4">
            <div className="w-full">
              <span className="flex text-base font-bold mb-2">Search</span>
              <input
                type="text"
                placeholder="Search by property"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full h-[40px] border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div className="w-full">
              <span className="flex text-base font-bold mb-2">
                Filter by Property
              </span>
              <div className="flex justify-between">
                {hotels?.map((item: any, index: any) => (
                  <CheckBox
                    key={index}
                    id={`property-${index}`}
                    label={item?.property}
                    className="capitalize"
                    checked={selectedProperties.includes(item?.property)}
                    onChange={(checked) =>
                      handleChangeCheckbox(item?.property, checked)
                    }
                  />
                ))}
              </div>
              <IonButton
                size="small"
                className="w-full mt-3"
                onClick={handleClearFilter}
              >
                <IonIcon slot="start" icon={trashBinOutline}></IonIcon>
                Clear Filter
              </IonButton>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto-custome">
          <CustomTable
            data={searchedHotels}
            columns={columns}
            itemsPerPage={3}
          />
        </div>

        <div className="p-4 md:mt-8 my-8 rounded-lg shadow-xs bg-white border shadow-sm">
          <p className="opacity-80 font-medium text-lg mb-5">
            The chart shows revenue by property
          </p>
          <BarChart data={hotels} />
        </div>
      </AdminContainer>
    </IonContent>
  );
};

export default ActualData;
