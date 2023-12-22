import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
const CustomerList = ( ) => {
  const navigate = useNavigate();
  const searchQuery = useSearchParams()[0];
  const  token  = searchQuery.get("token");
  const [customerList, setCustomerList] = useState([]);
  const [updatedCustomerData, setUpdatedCustomerData] = useState({
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
    uuid: '', // Assuming uuid is part of the customer data
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const fetchCustomerList = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/getCustomerList',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            cmd: 'get_customer_list',
          },
        }
      );

      setCustomerList(response.data);
    } catch (error) {
      console.error('Failed to fetch customer list', error);
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, []); // Fetch customer list on component mount

  const handleDelete = async (uuid) => {
    try {
      await axios.post(
        'http://localhost:4000/deleteCustomer',
        {
          cmd: 'delete',
          uuid: uuid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the customer list after deletion
      fetchCustomerList();
    } catch (error) {
      console.error('Failed to delete customer', error);
    }
  };

  const openUpdateModal = (customer) => {
    setUpdatedCustomerData({ ...customer });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        'http://localhost:4000/updateCustomer',
        {
          cmd: 'update',
          uuid: updatedCustomerData.uuid,
          ...updatedCustomerData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the customer list after update
      fetchCustomerList();
      closeUpdateModal();
    } catch (error) {
      console.error('Failed to update customer', error);
    }
  };
  const customerHandler=(e)=>{
    e.preventDefault();
    navigate(`/create-customer/?token=${token}`)
  }
  return (
    <div className="h-[100vh] bg-gray-400 mx-auto p-4">
      <h2 className="text-center rounded-md mt-8 w-2/6 mx-auto font-mono bg-gray-300 text-2xl font-bold mb-4">Customer List</h2>
      <table className="min-w-5/6 min-h-4/6 mx-auto shadow-lg shadow-red-700 scale-95 hover:scale-100 transition-all duration-700
       border-hidden rounded-lg outline bg-gray-200 oultline">
        <thead>
          <tr>
            <th className="border  p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Street</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">City</th>
            <th className="border p-2">State</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((customer) => (
            <tr key={customer.uuid}>
              <td className="border p-2">{customer.first_name}</td>
              <td className="border p-2">{customer.last_name}</td>
              <td className="border p-2">{customer.street}</td>
              <td className="border p-2">{customer.address}</td>
              <td className="border p-2">{customer.city}</td>
              <td className="border p-2">{customer.state}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                  onClick={() => openUpdateModal(customer)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleDelete(customer.uuid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-200 p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Customer</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
                <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                    </label>
                    <input
                    type="text"
                    id="firstName"
                    value={updatedCustomerData.first_name}
                    onChange={(e) =>
                        setUpdatedCustomerData({ ...updatedCustomerData, first_name: e.target.value })
                    }
                    className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                    </label>
                    <input
                    type="text"
                    id="lastName"
                    value={updatedCustomerData.last_name}
                    onChange={(e) =>
                        setUpdatedCustomerData({ ...updatedCustomerData, last_name: e.target.value })
                    }
                    className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                    Street
                    </label>
                    <input
                    type="text"
                    id="street"
                    value={updatedCustomerData.street}
                    onChange={(e) =>
                        setUpdatedCustomerData({ ...updatedCustomerData, street: e.target.value })
                    }
                    className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Address
                    </label>
                    <input
                    type="text"
                    id="address"
                    value={updatedCustomerData.address}
                    onChange={(e) =>
                        setUpdatedCustomerData({ ...updatedCustomerData, address: e.target.value })
                    }
                    className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                    City
                    </label>
                    <input
                    type="text"
                    id="city"
                    value={updatedCustomerData.city}
                    onChange={(e) =>
                        setUpdatedCustomerData({ ...updatedCustomerData, city: e.target.value })
                    }
                    className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                    State
                    </label>
                    <input
                    type="text"
                    id="state"
                    value={updatedCustomerData.state}
                    onChange={(e) =>
                        setUpdatedCustomerData({ ...updatedCustomerData, state: e.target.value })
                    }
                    className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    value={updatedCustomerData.email}
                    onChange={(e) =>
                        setUpdatedCustomerData({ ...updatedCustomerData, email: e.target.value })
                    }
                    className="border p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone
                    </label>
                    <input
                    type="tel"
                    id="phone"
                    value={updatedCustomerData.phone}
                    onChange={(e) =>
                        setUpdatedCustomerData({ ...updatedCustomerData, phone: e.target.value })
                    }
                    className="border p-2 w-full"
                    />
                </div>
                </div>

                <div className="mt-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={closeUpdateModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
                </div>
            </form>
          </div>
        </div>
      )}
      <div className='text-center'>
        <button className='bg-blue-500 text-white py-2 px-3 font-semibold rounded-md mt-4' onClick={customerHandler}>Add Customer</button>
      </div>
    </div>
  );
};

export default CustomerList;
