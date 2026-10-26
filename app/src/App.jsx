
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </>
  );
}

export default App;
