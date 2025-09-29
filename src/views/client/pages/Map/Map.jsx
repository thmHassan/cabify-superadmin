import React from 'react'
import PageTitle from '../../../../components/ui/PageTitle';
import PageSubTitle from '../../../../components/ui/PageSubTitle';

const Map = () => {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-1 pb-7 border-b border-[#00000033]">
        <PageTitle textColor={1} title="Maps" />
        <PageSubTitle textColor={1} title="Driver Location & Aerial View " />
      </div>
    </div>
  );
}

export default Map