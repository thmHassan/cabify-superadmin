import React, { useMemo, useRef } from "react";
import CardContainer from "../../../../components/shared/CardContainer";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import Table from "../../../../components/shared/Table/Table";
import DataTable from "../../../../components/shared/DataTable/DataTable";
import EditPaperPencilIcon from "../../../../components/svg/EditPaperPencilIcon";
import BinIcon from "../../../../components/svg/BinIcon";
import CardSubtitle from "../../../../components/ui/CardSubtitle/CardSubtitle";
import TableActionColumn from "../../../../components/ui/TableActionColumn";

const data = [
  {
    documentType: "Driver’s License",
    type: "XXXXX",
    issueDate: "Yes ✓",
    expiryDate: "01-02-1999",
  },
  {
    documentType: "Profile Photo",
    type: "XXXXX",
    issueDate: "-",
    expiryDate: "-",
  },
  {
    documentType: "Vehicle Photo",
    type: "Image",
    issueDate: "-",
    expiryDate: "-",
  },
  {
    documentType: "Front Photo",
    type: "Image",
    issueDate: "-",
    expiryDate: "-",
  },
  {
    documentType: "Back Photo",
    type: "Image",
    issueDate: "-",
    expiryDate: "-",
  },
  {
    documentType: "Insurance",
    type: "Image",
    issueDate: "-",
    expiryDate: "-",
  },
];

const Driver = () => {
  const tableRef = useRef(null);

  const onPaginationChange = (page) => {
    console.log(page);
    // const newTableData = cloneDeep(tableData)
    // newTableData.pageIndex = page
    // dispatch(setTableData(newTableData))
  };

  // const onSort = (sort) => {
  //   // const newTableData = cloneDeep(tableData)
  //   // newTableData.sort = sort
  //   // dispatch(setTableData(newTableData))
  // };

  const onView = () => {};
  const onEdit = () => {};
  const onDelete = () => {};

  const columns = useMemo(
    () => [
      {
        header: "Document Type",
        accessorKey: "documentType",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="whitespace-nowrap">
              <CardSubtitle
                subtitle={row.documentType}
                className="!text-[#000000]"
              />
            </span>
          );
        },
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="whitespace-nowrap">
              <CardSubtitle
                variant={1}
                subtitle={row.type}
                className="!text-[#000000] !font-normal"
              />
            </span>
          );
        },
      },
      {
        header: "Has Issue Date",
        accessorKey: "issueDate",
        cell: (props) => {
          const row = props.row.original;
          return <span className="whitespace-nowrap">{row.issueDate}</span>;
        },
      },
      {
        header: "Has Expiry Date",
        accessorKey: "expiryDate",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="whitespace-nowrap">
              <CardSubtitle
                variant={1}
                subtitle={row.expiryDate}
                className="!text-[#000000] !font-normal"
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
          <PageTitle title="Default Document Type" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add New Document</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Manage driver documents across all panels" />
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
              paginationVariant={1}
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

export default Driver;
