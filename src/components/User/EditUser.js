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
  const lastNameRef = useRef();
  const birthDateRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("사용자 데이터 로드 실패");
        const result = await response.json();
        setFormData(result);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchUser();
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInput = () => {
    if (!formData.firstName) {
      alert("이름을 입력하세요.");
      firstNameRef.current.focus();
      return false;
    }
    if (!formData.lastName) {
      alert("성을 입력하세요.");
      lastNameRef.current.focus();
      return false;
    }
    if (!formData.birthDate) {
      alert("생년월일을 입력하세요.");
      birthDateRef.current.focus();
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateInput()) return;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("수정 실패");
      alert("수정 성공");

      setEditCount((prev) => prev + 1);

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
          ref={lastNameRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>생년월일:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          ref={birthDateRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>성별:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-control"
        >
          <option value="남">남</option>
          <option value="여">여</option>
        </select>
      </div>
      <div className="mb-3">
        <label>국적:</label>
        <select
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className="form-control"
        >
          <option value="내국인">내국인</option>
          <option value="외국인">외국인</option>
        </select>
      </div>
      <div className="mb-3">
        <label>수정 횟수:</label>
        <p>{editCount}번</p>
      </div>
      <button className="btn btn-primary me-2" onClick={handleUpdate}>
        확인
      </button>
      <button className="btn btn-secondary" onClick={handleCancel}>
        취소
      </button>
    </div>
  );
};

export default EditUser;
