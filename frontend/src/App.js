import './App.css';
import CustomerTable from './components/customerTable/customerTable';

/*
* NOTES:
* to prevent adding react-router, I did most UI work in Modals
* in general, I did not add any libraries on purpose, even if it would have made many things easier
 */
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Very Simple CRM Tool</h1>
            </header>
            <main>
                <CustomerTable/>
            </main>
        </div>
    );
}

export default App;
