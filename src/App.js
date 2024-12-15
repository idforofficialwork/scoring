import React, { useState } from "react";
import Login from "./components/Login";
import StudentList from "./components/StudentList";
import Scoring from "./components/Scoring";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, name: "김도균", score: null },
    { id: 2, name: "김수영", score: null },
    { id: 3, name: "김현묵", score: null },
    { id: 4, name: "노성현", score: null },
    { id: 5, name: "노영주", score: null },
    { id: 6, name: "서재형", score: null },
    { id: 7, name: "이지은", score: null },
    { id: 8, name: "장미경", score: null },
    { id: 9, name: "조성빈", score: null },
    { id: 10, name: "최유이", score: null },
    { id: 11, name: "호원준", score: null },
    { id: 12, name: "홍성륜", score: null },
  ]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleScoreSubmit = (id, score) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, score } : student
      )
    );
    setSelectedStudent(null); // 점수 제출 후 StudentList로 돌아가기
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : selectedStudent ? (
        <Scoring
          student={selectedStudent}
          onSubmit={handleScoreSubmit}
          onCancel={() => setSelectedStudent(null)}
        />
      ) : (
        <StudentList
          students={students}
          onScoreClick={(student) => setSelectedStudent(student)}
        />
      )}
    </div>
  );
};

export default App;
