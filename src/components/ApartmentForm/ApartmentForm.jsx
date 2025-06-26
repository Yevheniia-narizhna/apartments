import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createApartment,
  getApartmentById,
  updateApartment,
} from "../../redux/apartment/operations.js";

const ApartmentForm = ({ mode = "create" }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentApartment, loading } = useSelector((state) => state.apartment);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    rooms: 1,
    existingImages: [],
    newImages: [],
  });

  useEffect(() => {
    if (mode === "edit") {
      dispatch(getApartmentById(id));
    }
  }, [dispatch, id, mode]);

  useEffect(() => {
    if (mode === "edit" && currentApartment) {
      setForm({
        title: currentApartment.title,
        description: currentApartment.description,
        price: currentApartment.price,
        rooms: currentApartment.rooms,
        existingImages: currentApartment.images || [],
        newImages: [],
      });
    }
  }, [currentApartment, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...e.target.files],
    }));
  };

  const handleRemoveImage = (url) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== url),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("rooms", form.rooms);

    if (mode === "edit") {
      formData.append("images", JSON.stringify(form.existingImages));
    }

    form.newImages.forEach((file) => {
      formData.append("images", file);
    });

    if (mode === "edit") {
      await dispatch(updateApartment({ id, formData }));
      navigate(`/apartment/${id}`);
    } else {
      const res = await dispatch(createApartment(formData));
      navigate(`/apartment/${res.payload._id}`);
    }
  };

  if (mode === "edit" && (loading || !currentApartment))
    return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Заголовок"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Опис"
        required
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Ціна"
        required
      />
      <select name="rooms" value={form.rooms} onChange={handleChange}>
        <option value={1}>1 кімната</option>
        <option value={2}>2 кімнати</option>
        <option value={3}>3 кімнати</option>
      </select>

      {mode === "edit" && (
        <>
          <p>Існуючі фото:</p>
          <div style={{ display: "flex", gap: 10 }}>
            {form.existingImages.map((img, idx) => (
              <div key={idx}>
                <img src={img} alt="apartment" width={100} />
                <button type="button" onClick={() => handleRemoveImage(img)}>
                  Видалити
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <button type="submit">
        {mode === "edit" ? "Оновити" : "Додати"} квартиру
      </button>
    </form>
  );
};

export default ApartmentForm;
