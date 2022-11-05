import { useState } from 'react';

const Stats = () => {
  // 지출, 수입 switch state
  const [type, setType] = useState("0");
  // switch 전환
  const typeChange = (e) => {
    setType(e.target.getAttribute('va환ue'));
  };
  return (
    <div>
      <div className="d-table mx-auto">
        {/* 지출, 수입 switch */}
        <div className="btn-group mx-auto select-bg">
          <input type="radio" checked={type === "0"} className="btn-check" readOnly />
          <span className="btn" value="0" onClick={typeChange}>지출</span>
          <input type="radio" checked={type === "1"} className="btn-check" readOnly />
          <span className="btn" value="1" onClick={typeChange}>수입</span>
        </div>
      </div>
      <div className="row justify-content-center my-3">
        <div className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 p-3">
          {/* 지출/수입 그래프, 아직 구현X */}
          <canvas id="stats_chart"></canvas>
        </div>
        <div className="col-4 d-flex align-items-center">
          {/* 세부사항 table */}
          <table className="table text-center">
            <tbody>
              <tr><td>술값</td><td>5000원</td></tr>
              <tr><td>식비</td><td>10000원</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stats;