import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllApartments } from "../../redux/apartment/operations";
import { Link } from "react-router-dom";
import s from "./ApartmentList.module.css";

const ApartmentList = () => {
  const dispatch = useDispatch();
  const { apartments, loading, error } = useSelector(
    (state) => state.apartment
  );

  const [filters, setFilters] = useState({
    rooms: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterSubmit = () => {
    const params = {};
    if (filters.rooms) params.rooms = filters.rooms;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    const query = new URLSearchParams(params).toString();
    dispatch(getAllApartments(query ? `?${query}` : ""));
  };

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    dispatch(getAllApartments());
  }, [dispatch]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div className={s.contList}>
      <Link to={`/add`} className={s.add}>
        Додати квартиру
      </Link>
      <h2>Список квартир</h2>
      <div className={s.selectCont}>
        <label>
          Кімнат:
          <select name="rooms" value={filters.rooms} onChange={handleChange}>
            <option value="">Всі</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <label>
          Мін. ціна:
          <input
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
          />
        </label>
        <label>
          Макс. ціна:
          <input
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleFilterSubmit}>Знайти</button>
      </div>
      {apartments.length === 0 ? (
        <p>Немає квартир</p>
      ) : (
        <ul className={s.list}>
          {apartments.map((apt) => (
            <li className={s.card} key={apt._id}>
              <h3>{apt.title}</h3>
              <p className={s.description}>{apt.description}</p>
              <p>Ціна: {apt.price} грн</p>
              <p>Кімнат: {apt.rooms}</p>
              {apt.images?.[0] && (
                <img src={apt.images[0]} alt="квартира" width={200} />
              )}
              <br />
              <Link to={`/apartment/${apt._id}`}>Детальніше</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApartmentList;
