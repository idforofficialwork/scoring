import React from "react";
import "./StudentList.css";

const StudentList = ({ students, onScoreClick }) => {
  return (
    <div className="student-list-container">
      <h1>학생 목록</h1>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student.id}>
            <span>{student.name}</span>
            <span>
              {student.score
                ? `합산 점수: ${
                    student.score.difficulty +
                    student.score.understanding +
                    student.score.contribution
                  }`
                : "점수 없음"}
            </span>
            <button onClick={() => onScoreClick(student)}>점수 매기기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
