import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListPage from "./pages/ListPage/ListPage";
import AddPage from "./pages/AddPage/AddPage";
import EditPage from "./pages/EditPage/EditPage";
import ApartmentPage from "./pages/ApartmentPage/ApartmentPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/add" element={<AddPage />} />
      <Route path="/apartment/:id" element={<ApartmentPage />} />
      <Route path="/apartment/:id/edit" element={<EditPage />} />
    </Routes>
  );
}

export default App;
