import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getApartmentById } from "../../redux/apartment/operations";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentApartment, loading, error } = useSelector(
    (state) => state.apartment
  );

  useEffect(() => {
    dispatch(getApartmentById(id));
  }, [dispatch, id]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;
  if (!currentApartment) return <p>Квартиру не знайдено</p>;

  const { title, description, price, rooms, images } = currentApartment;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Ціна: {price} грн</p>
      <p>Кімнат: {rooms}</p>

      {images && images.length > 0 && (
        <div>
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`apartment-${idx}`} width={300} />
          ))}
        </div>
      )}

      <Link to={`/apartment/${id}/edit`}>Редагувати</Link>
    </div>
  );
};

export default Details;
