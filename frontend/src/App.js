import './App.css';
import axios from 'axios';
import CustomerTable from './components/customerTable/customerTable';
import AddCustomerButton from "./components/addCustomerButton/AddCustomerButton";
import config from "./config";
import React, {useState, useEffect} from 'react';

/*
* NOTES:
* to prevent adding react-router, I did most UI work in Modals
* in general, I did not add any libraries on purpose, even if it would have made many things easier
 */
function App() {

    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchCustomers(customer_id) {
        setLoading(true);
        const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/customers`;
        axios.get(url)
            .then((res) => {
                setCustomers(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // load customers once on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Very Simple CRM Tool</h1>
            </header>
            <main>
                <div className="table-header">
                    <h2>Customer List</h2>
                    <AddCustomerButton fetchCustomers={fetchCustomers} />
                </div>

                {loading ? (
                        <p className="text-gray-500">Loading customers...</p>
                    )
                    :
                    <CustomerTable customers={customers} fetchCustomers={fetchCustomers}/>

                }
            </main>
        </div>
    );
}

export default App;
