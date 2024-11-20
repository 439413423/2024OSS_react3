import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "남",
    nationality: "내국인",
  });
  const apiUrl = "https://672819d3270bd0b975545f98.mockapi.io/api/vi/users";
  const firstNameRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("추가 실패");
      alert("추가 성공");
      navigate("/list");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h1>데이터 추가</h1>
      <input
        type="text"
        name="firstName"
        placeholder="이름"
        value={formData.firstName}
        onChange={handleChange}
        ref={firstNameRef}
        className="form-control mb-2"
      />
      <input
        type="text"
        name="lastName"
        placeholder="성"
        value={formData.lastName}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        추가
      </button>
    </div>
  );
};

export default CreateUser;
