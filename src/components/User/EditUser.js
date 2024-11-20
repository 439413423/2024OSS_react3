import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

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
  const userId = searchParams.get("id");
  const apiUrl = `https://672819d3270bd0b975545f98.mockapi.io/api/vi/users/${userId}`;
  const firstNameRef = useRef();
  const lastNameRef = useRef();

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


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setEditCount((prev) => prev + 1);

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, [name]: value }),
      });
      if (!response.ok) throw new Error("수정 실패");
    } catch (error) {
      alert(error.message);
    }
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
    return true;
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
        <label>수정 횟수:</label>
        <p>{editCount} 번</p>
      </div>
      <button
        className="btn btn-secondary"
        onClick={() => {
          if (validateInput()) alert("유효성 검증 완료");
        }}
      >
        유효성 체크
      </button>
    </div>
  );
};

export default EditUser;
