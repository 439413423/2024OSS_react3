import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  const apiUrl = "https://672819d3270bd0b975545f98.mockapi.io/api/vi/users";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("데이터 로드 실패");
      const result = await response.json();
      setData(result);
      setIsDataLoaded(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const goToUpdate = (id) => {
    navigate(`/update?id=${id}`);
  };

  return (
    <div className="container">
      <h1>회원 관리</h1>
      <button className="btn btn-outline-dark" onClick={fetchData}>
        회원 목록 로드
      </button>
      <br />
      <br />
      <h2>회원 목록</h2>
      {isDataLoaded ? (
        <div id="data-list">
          {data.map((user) => (
            <div key={user.id} className="mb-3">
              <span>
                {`ID: ${user.id}, 이름: ${user.firstName}, 성: ${user.lastName}`}
              </span>
              <button
                className="btn btn-link"
                onClick={() => goToUpdate(user.id)}
              >
                수정
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>데이터가 로드 안됨.</p>
      )}
    </div>
  );
};

export default List;
