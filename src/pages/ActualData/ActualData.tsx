import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer";
import CustomTable from "../../components/Table/Table";
import { formatPrice, roundPriceToInt } from "../../utils/formatPrice";
import { useSelector } from "react-redux";
import CheckBox from "../../components/Checkbox/Checkbox";
import { useHistory, useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import BarChart from "../../components/Chart/Chart";
import { IonContent } from "@ionic/react";

const ActualData: React.FC = () => {
  const hotels = useSelector((state: any) => state.hotel);

  const [selectedHotels, setSelectedHotels] = useState<number[]>([]);

  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [debouncedProperties] = useDebounce(selectedProperties, 500); // Debounce trong 500ms
  const [searchTerm, setSearchTerm] = useState<string>(""); // Từ khóa tìm kiếm
  const history = useHistory();
  const location = useLocation();

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

  return (
    <IonContent>
      <AdminContainer>
        <div className="bg-red-400">
          <h1>Actual Data</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-3 md:gap-x-5 text-center">
          <div className="bg-[#74E291]  rounded-lg flex flex-col items-center justify-center py-5 shadow-lg">
            <div className="flex flex-row md:flex-col">
              <i className="bx bx-layer text-2xl md:text-4xl text-white"></i>
              <p className="md:text-lg md:mt-1 ml-2 md:ml-0 text-white">
                Total Room in Hotel:
              </p>
            </div>
            <p className="text-xl md:text-2xl font-bold mt-2 text-white">
              $ {roundPriceToInt(totalRoomInHotel) || 0}
            </p>
          </div>
          <div className="bg-[#8ECDDD] rounded-lg flex flex-col items-center justify-center py-5 shadow-lg">
            <div className="flex flex-row md:flex-col">
              <i className="bx bx-cart text-2xl md:text-4xl text-white"></i>
              <p className="md:text-lg md:mt-1 ml-2 md:ml-0 text-white">
                Total Revenue
              </p>
            </div>
            <p className="text-xl md:text-2xl font-bold mt-2 text-white">
              $ {roundPriceToInt(totalRevenue) || 0}
            </p>
          </div>
          <div className="bg-[#E6B9DE] rounded-lg flex flex-col items-center justify-center py-5 shadow-lg">
            <div className="flex flex-row md:flex-col">
              <i className="bx bxs-credit-card text-2xl md:text-4xl text-white"></i>
              <p className="md:text-lg md:mt-1 ml-2 md:ml-0 text-white">
                Room Revenue
              </p>
            </div>
            <p className="text-xl md:text-2xl font-bold mt-2 text-white">
              {roundPriceToInt(totalRoomRevenue) || 0} VND
            </p>
          </div>
          <div className="bg-[#FFDD95] rounded-lg flex flex-col items-center justify-center py-5 shadow-lg">
            <div className="flex flex-row md:flex-col">
              <i className="bx bxs-credit-card text-2xl md:text-4xl text-white"></i>
              <p className="md:text-lg md:mt-1 ml-2 md:ml-0 text-white">
                F&B Revenue
              </p>
            </div>
            <p className="text-xl md:text-2xl font-bold mt-2 text-white">
              {roundPriceToInt(totalFBRevenue) || 0} VND
            </p>
          </div>
        </div>

        <div className="">
          <p className="text-lg">Property</p>
          <div className="md:px-5 flex justify-between md:block">
            <input
              type="text"
              placeholder="Search by property"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 px-2 py-1 rounded-md"
            />
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
        </div>

        <CustomTable data={searchedHotels} columns={columns} itemsPerPage={3} />

        <div className="">
          <BarChart data={hotels} />
        </div>
      </AdminContainer>
    </IonContent>
  );
};

export default ActualData;
