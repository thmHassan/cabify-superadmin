import React, { useMemo, useRef } from "react";
import CardContainer from "../../../../components/shared/CardContainer";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import PlusIcon from "../../../../components/svg/PlusIcon";
import Table from "../../../../components/shared/Table/Table";
import TableActionColumn from "../../../../components/ui/TableActionColumn";
import DataTable from "../../../../components/shared/DataTable/DataTable";
import CardSubtitle from "../../../../components/ui/CardSubtitle/CardSubtitle";
import { useNavigate } from "react-router-dom";
import { DRIVER_VEHICLE_NEW_PATH } from "../../../../constants/routes.path.constant/user.route.path.constant";

const data = [
  {
    vehicleMake: "Toyota Camry",
    image: "",
    passengerSeating: "",
    luggage: "",
  },
  {
    vehicleMake: "Honda",
    image: "",
    passengerSeating: "",
    luggage: "",
  },
  {
    vehicleMake: "MPV",
    image: "",
    passengerSeating: "",
    luggage: "",
  },
  {
    vehicleMake: "Mini Bus",
    image: "",
    passengerSeating: "",
    luggage: "",
  },
];

const DriverVehicle = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const onPaginationChange = (page) => {
    console.log(page);
    // const newTableData = cloneDeep(tableData)
    // newTableData.pageIndex = page
    // dispatch(setTableData(newTableData))
  };

  const onView = () => {};
  const onEdit = () => {};
  const onDelete = () => {};

  const columns = useMemo(
    () => [
      {
        header: "Vehicle Make",
        accessorKey: "vehicleMake",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="whitespace-nowrap">
              <CardSubtitle
                subtitle={row.vehicleMake}
                className="!text-[#000000]"
              />
            </span>
          );
        },
      },
      {
        header: "Image",
        accessorKey: "image",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="whitespace-nowrap">
              <CardSubtitle subtitle={row.image} className="!text-[#000000]" />
            </span>
          );
        },
      },
      {
        header: "Passenger Seating",
        accessorKey: "passengerSeating",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="whitespace-nowrap">
              <CardSubtitle
                subtitle={row.passengerSeating}
                className="!text-[#000000]"
              />
            </span>
          );
        },
      },
      {
        header: "Luggage",
        accessorKey: "luggage",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="whitespace-nowrap">
              <CardSubtitle
                subtitle={row.luggage}
                className="!text-[#000000]"
              />
            </span>
          );
        },
      },
      {
        header: "File",
        accessorKey: "file",
        className: "flex justify-center",
        cell: (props) => {
          const row = props.row.original;
          console.log(row);
          return (
            <div className="flex justify-center">
              <Button type="filled" btnSize="md" onClick={onView}>
                <span>View</span>
              </Button>
            </div>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "action",
        className: "flex justify-center",
        cell: (props) => {
          const row = props.row.original;
          return (
            <TableActionColumn row={row} onEdit={onEdit} onDelete={onDelete} />
          );
        },
      },
    ],
    []
  );

  return (
    <div className="p-10">
      <div className="flex flex-col gap-2.5 mb-[30px] px-4 pt-2">
        <div className="flex justify-between">
          <PageTitle title="Vehicle Types " />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => navigate(DRIVER_VEHICLE_NEW_PATH)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add New Vehicle</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Manage vehicle related documents across all panels" />
        </div>
      </div>
      <CardContainer className="p-5">
        <CardContainer type={1} className="px-10 py-7">
          <div>
            <DataTable
              ref={tableRef}
              columns={columns}
              data={data}
              skeletonAvatarColumns={[0]}
              skeletonAvatarProps={{ className: "rounded-md" }}
              loading={false}
              pagingData={{
                total: data?.length,
                pageIndex: 0,
                pageSize: 10,
              }}
              onPaginationChange={onPaginationChange}
              // onSelectChange={onSelectChange}
              // onSort={onSort}
            />
          </div>
        </CardContainer>
        <div className="pt-[50px] pb-8 flex justify-center">
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Push to All Panels</span>
            </div>
          </Button>
        </div>
      </CardContainer>
    </div>
  );
};

export default DriverVehicle;
