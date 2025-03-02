import { useState } from 'react';
import CustomerList from '../components/CustomerList';

const Home = () => {
  const [filterDate, setFilterDate] = useState('');

  return (
    <div className='bg-gray-100 w-full h-full min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold'>Shopify Customers</h1>
      <CustomerList filterDate={filterDate} onFilterDateChange={setFilterDate} />
    </div>
  );
};

export default Home;
