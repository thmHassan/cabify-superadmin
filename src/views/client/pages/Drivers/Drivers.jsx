import React from 'react'
import PageTitle from '../../../../components/ui/PageTitle';
import PageSubTitle from '../../../../components/ui/PageSubTitle';
import Button from '../../../../components/ui/Button/Button';
import DownloadIcon from '../../../../components/svg/DownloadIcon';
import AddUserIcon from '../../../../components/svg/AddUserIcon';

const Drivers = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-start pb-7 border-b border-[#00000033]">
        <div className="flex flex-col gap-1">
          <PageTitle textColor={1} title="Drivers Management" />
          <PageSubTitle
            textColor={1}
            title="Manage your driver network and monitor their performance"
          />
        </div>
        <div className="flex gap-5">
          <Button className="min-w-[230px] gap-5 pt-[23px] pb-[22px] rounded-[10px] border-2 border-[#1F41BB33] flex justify-center bg-[#F2F2F2]">
            <DownloadIcon />
            <PageSubTitle title="Export Report" className="!text-[#1F41BB]" />
          </Button>
          <Button
            type="filled"
            className="min-w-[230px] gap-5 pt-[23px] pb-[22px] rounded-[10px] border-2 border-[#1F41BB33] flex justify-center"
          >
            <AddUserIcon />
            <PageSubTitle title="Add Driver" className="!text-[#ffffff]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Drivers