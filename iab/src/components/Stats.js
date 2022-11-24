import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';

const Stats = ({ token, categoryList, logoutFunc }) => {
  const [isFetched, setIsFetched] = useState(false);
  // 지출, 수입 switch state
  const [type, setType] = useState(0);
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();
  // switch 전환
  const typeChange = (e) => {
    setType(parseInt(e.target.getAttribute('value')));
  };
  
  useEffect(() => {
    if (token === null)
      navigate('/login');
    else {
      fetch('http://localhost:8001/transaction', {
        method: 'GET',
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(async res => {
          const data = await res.json();
          const valueList = Array(categoryList[type].length);

          valueList.fill(0);

          if (res.status === 200) {
            for (const [, item] of Object.entries(data[type]))
              valueList[item.category] += item.money;

            setChartData({
              labels:categoryList[type],
              datasets: [{
                backgroundColor: ['#FFD1D1', '#F9F7CF', '#CCF3EE', '#C8DBBE', '#9ADCFF', '#F0D9FF', '#DDDDDD'],
                borderColor: '#000000',
                data: valueList
              }]
            });

            setIsFetched(true);
          } else {
            console.log(data);
            alert('데이터를 가져오는데 실패했습니다.');
            logoutFunc(); //to refresh token
          }
        });
    }
  }, [token, navigate, logoutFunc, categoryList, type]);

  const options = {
  };

  return (
    <div>
      <div className="d-table mx-auto">
        {/* 지출, 수입 switch */}
        <div className="btn-group mx-auto select-bg">
          <input type="radio" checked={type === 0} className="btn-check" readOnly />
          <span className="btn" value="0" onClick={typeChange}>지출</span>
          <input type="radio" checked={type === 1} className="btn-check" readOnly />
          <span className="btn" value="1" onClick={typeChange}>수입</span>
        </div>
      </div>
      <div className="row justify-content-center my-3">
        {/* 항목 별 차트 */}
        <div className="col-8 col-sm-7 col-md-6 col-lg-5 col-xl-4 p-3">
          {/* <PieChart/> */}
          { isFetched===true &&
            <Pie data={chartData} options={options}/>
          }
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