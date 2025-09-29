import React from "react";
import PageTitle from "../../../../components/ui/PageTitle/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle/PageSubTitle";
import CardContainer from "../../../../components/shared/CardContainer/CardContainer";
import TableActionColumn from "../../../../components/ui/TableActionColumn";
import SearchBar from "../../../../components/shared/SearchBar";

const PLOTS = ["Abbottabad ", "Rawalpindi", "Lahore", "Peshawar"];

const ZonesLocation = () => {
  const onEdit = () => {};
  const onDelete = () => {};
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Default Plots" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add New Plots</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="These plots will be pushed to all customer panels for their help or they can choose their own plots by creating in their own panels" />
        </div>
      </div>
      <CardContainer className="p-5 flex gap-5">
        <div className="w-[333px]">
          <h5 className="text-[30px] leading-[41px] text-[#000000] font-semibold mb-5">
            Add New Plots
          </h5>
          <CardContainer type={1} className="p-5 h-[calc(100%-61px)]">
            <div className="flex flex-col gap-5">
              <SearchBar variant={1} />
              {PLOTS.map((plot, index) => (
                <div
                  key={index}
                  className="flex justify-between px-5 py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                >
                  <div>
                    <span>{plot}</span>
                  </div>
                  <TableActionColumn
                    row={{}}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              ))}
              <Button
                type="filled"
                btnSize="md"
                className="!py-4"
                // onClick={() => setIsAddSubscriptionModalOpen(true)}
              >
                <div className="flex gap-[15px] items-center justify-center">
                  <PlusIcon width={18} height={18} />
                  <span>Add New Plots</span>
                </div>
              </Button>
            </div>
          </CardContainer>
        </div>
        <div className="w-[calc(100%-353px)]">
          <div className="h-[547px] w-full">
            <CardContainer type={1} className="w-full h-full"></CardContainer>
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default ZonesLocation;
