import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "남",
    nationality: "내국인",
  });
  const [editCount, setEditCount] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("id");
  const apiUrl = `https://672819d3270bd0b975545f98.mockapi.io/api/vi/users/${userId}`;
  const firstNameRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("사용자 데이터 로드 실패");
        const result = await response.json();
        setFormData(result);
        firstNameRef.current.focus();
      } catch (error) {
        alert(error.message);
      }
    };
    fetchUser();
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setEditCount((prev) => prev + 1);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("수정 실패");
      alert("수정 성공");
      navigate("/list");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/list");
  };

  return (
    <div className="container">
      <h1>데이터 수정</h1>
      <div className="mb-3">
        <label>이름:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          ref={firstNameRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>성:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>수정 횟수:</label>
        <p>{editCount} 번</p>
      </div>
      <button className="btn btn-primary me-2" onClick={handleConfirm}>
        수정 확인
      </button>
      <button className="btn btn-secondary" onClick={handleCancel}>
        취소
      </button>
    </div>
  );
};

export default EditUser;
