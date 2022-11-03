import { useState } from 'react';

const Stats = () => {
  const [type, setType] = useState("0");
  const typeChange = (e) => {
    setType(e.target.getAttribute('value'));
  };
  return (
    <div>
      <div className="d-table mx-auto">
        <div className="btn-group mx-auto select-bg">
          <input type="radio" checked={type === "0"} className="btn-check" readOnly />
          <span className="btn" value="0" onClick={typeChange}>지출</span>
          <input type="radio" checked={type === "1"} className="btn-check" readOnly />
          <span className="btn" value="1" onClick={typeChange}>수입</span>
        </div>
      </div>
      <div className="row justify-content-center my-3">
        <div className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 p-3">
          <canvas id="stats_chart"></canvas>
        </div>
        <div className="col-4 d-flex align-items-center">
          <table className="table text-center">
            <tbody id="">
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