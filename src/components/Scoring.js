import React, { useState } from "react";
import "./Scoring.css";

const Scoring = ({ student, onSubmit, onCancel }) => {
  // 기존 점수 또는 초기값
  const [difficulty, setDifficulty] = useState(student.score?.difficulty || 1);
  const [understanding, setUnderstanding] = useState(
    student.score?.understanding || 1
  );
  const [contribution, setContribution] = useState(
    student.score?.contribution || 1
  );
  const [errorMessage, setErrorMessage] = useState("");

  // 점수 범위 유효성 검사
  const validateScores = () => {
    if (difficulty < 1 || difficulty > 6) {
      return "난이도는 1에서 6 사이여야 합니다.";
    }
    if (understanding < 1 || understanding > 7) {
      return "이해도는 1에서 7 사이여야 합니다.";
    }
    if (contribution < 1 || contribution > 7) {
      return "기여도는 1에서 7 사이여야 합니다.";
    }
    return ""; // 유효한 경우
  };

  const handleSubmit = async () => {
    const error = validateScores();
    if (error) {
      setErrorMessage(error);
      return;
    }

    const score = {
      difficulty,
      understanding,
      contribution,
    };

    const payload = {
      loginId: localStorage.getItem("id"),
      studentName: student.name,
      score,
    };

    try {
      const response = await fetch(
        "https://3wriyc5qka.execute-api.ap-northeast-2.amazonaws.com/default/write_score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        onSubmit(student.id, score); // 점수 제출 후 상태 업데이트
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "서버 오류가 발생했습니다.");
      }
    } catch (error) {
      setErrorMessage("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className="scoring-container">
      <h1>{student.name} 점수 매기기</h1>
      <div>
        <label>난이도 (1 ~ 6):</label>
        <input
          type="number"
          min="1"
          max="6"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
        />
      </div>
      <div>
        <label>이해도 (1 ~ 7):</label>
        <input
          type="number"
          min="1"
          max="7"
          value={understanding}
          onChange={(e) => setUnderstanding(Number(e.target.value))}
        />
      </div>
      <div>
        <label>기여도 (1 ~ 7):</label>
        <input
          type="number"
          min="1"
          max="7"
          value={contribution}
          onChange={(e) => setContribution(Number(e.target.value))}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="submit-button" onClick={handleSubmit}>점수 제출</button>
      <button className="cancel-button" onClick={onCancel}>취소</button>
    </div>
  );
};

export default Scoring;




/*import React, { useState } from "react";
import "./Scoring.css";

const Scoring = ({ student, onSubmit, onCancel }) => {
  // 기존 점수 또는 초기값
  const [difficulty, setDifficulty] = useState(student.score?.difficulty || 1);
  const [understanding, setUnderstanding] = useState(
    student.score?.understanding || 1
  );
  const [contribution, setContribution] = useState(
    student.score?.contribution || 1
  );

  const handleSubmit = () => {
    const score = {
      difficulty,
      understanding,
      contribution,
    };
    onSubmit(student.id, score);
  };

  return (
    <div className="scoring-container">
      <h1>{student.name} 점수 매기기</h1>
      <div>
        <label>난이도 (1 ~ 6):</label>
        <input
          type="number"
          min="1"
          max="6"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
        />
      </div>
      <div>
        <label>이해도 (1 ~ 7):</label>
        <input
          type="number"
          min="1"
          max="7"
          value={understanding}
          onChange={(e) => setUnderstanding(Number(e.target.value))}
        />
      </div>
      <div>
        <label>기여도 (1 ~ 7):</label>
        <input
          type="number"
          min="1"
          max="7"
          value={contribution}
          onChange={(e) => setContribution(Number(e.target.value))}
        />
      </div>
      <button onClick={handleSubmit}>점수 제출</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

export default Scoring;*/
