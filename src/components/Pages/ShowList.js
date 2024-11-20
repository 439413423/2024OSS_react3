import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [data, setData] = useState([]); // 데이터 상태
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로드 여부
  const navigate = useNavigate();

  const apiUrl = "https://672819d3270bd0b975545f98.mockapi.io/api/vi/users";

  // 데이터 로드 함수
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

  // 데이터 삭제 함수
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("삭제 실패");
      alert("삭제 성공");
      fetchData(); // 삭제 후 목록 새로고침
    } catch (error) {
      alert(error.message);
    }
  };

  // 상세 페이지로 이동
  const goToDetail = (id) => {
    navigate(`/detail?id=${id}`);
  };

  // 수정 페이지로 이동
  const goToUpdate = (id) => {
    navigate(`/update?id=${id}`);
  };

  // 추가 페이지로 이동
  const goToCreate = () => {
    navigate(`/create`);
  };

  return (
    <div className="container">
      <h1>회원 관리</h1>
      <button className="btn btn-outline-dark" onClick={fetchData}>
        회원 목록 로드
      </button>
      <button className="btn btn-primary ms-2" onClick={goToCreate}>
        데이터 추가
      </button>
      <br />
      <br />
      <h2>회원 목록</h2>
      {isDataLoaded ? (
        data.length > 0 ? (
          <div id="data-list">
            {data.map((user) => (
              <div key={user.id} className="mb-3 d-flex align-items-center">
                {/* 상세 보기 링크 */}
                <span
                  onClick={() => goToDetail(user.id)} // 클릭 시 상세 페이지 이동
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {`ID: ${user.id}, 이름: ${user.firstName}, 성: ${user.lastName}`}
                </span>

                {/* 수정 버튼 */}
                <button
                  className="btn btn-warning ms-2"
                  onClick={() => goToUpdate(user.id)}
                >
                  수정
                </button>

                {/* 삭제 버튼 */}
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => deleteUser(user.id)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>데이터가 없습니다.</p>
        )
      ) : (
        <p>데이터가 로드되지 않았습니다.</p>
      )}
    </div>
  );
};

export default List;
