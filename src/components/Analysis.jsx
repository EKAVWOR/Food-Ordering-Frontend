import React from 'react';
import CountUp from 'react-countup';

const Analysis = () => {
  return (
    <div className='bg-orange-500 flex flex-col md:flex-row mx-3 my-10 p-5 md:gap-25 text-center items-center rounded-xl'>
      {/* 1st Block */}
      <div className="w-full md:w-auto flex flex-col items-center justify-center pb-5 md:pb-0 md:pr-10 border-b md:border-b-0 md:border-r border-white">
        <h1 className='text-5xl font-light text-white'>
          <CountUp end={50000} duration={3} separator="," />+
        </h1>
        <p className='text-sm font-bold text-white'>Registered Customers</p>
      </div>

      {/* 2nd Block */}
      <div className="w-full md:w-auto flex flex-col items-center justify-center pb-5 md:pb-0 md:pr-10 border-b md:border-b-0 md:border-r border-white">
        <h1 className='text-5xl font-light text-white'>
          <CountUp end={1000} duration={3} separator="," />+
        </h1>
        <p className='text-sm font-bold text-white'>Registered Riders</p>
      </div>

      {/* 3rd Block */}
      <div className="w-full md:w-auto flex flex-col items-center justify-center pb-5 md:pb-0 md:pr-10 border-b md:border-b-0 md:border-r border-white">
        <h1 className='text-5xl font-light text-white'>
          <CountUp end={200} duration={3} separator="," />+
        </h1>
        <p className='text-sm font-bold text-white'>Registered Shops/Outlets</p>
      </div>

      {/* 4th Block */}
      <div className="w-full md:w-auto flex flex-col items-center justify-center">
        <h1 className='text-5xl font-light text-white'>
          <CountUp end={176} duration={3} separator="," />+
        </h1>
        <p className='text-sm font-bold text-white'>Countries</p>
      </div>
    </div>
  );
};

export default Analysis;
