const Home = ({ monthData, dateData }) => {
  const todayDate = new Date().getDate();
  // JS에서 달은 0부터 시작
  const todayMonth = new Date().getMonth() + 1;

  return (
    <div className="row justify-content-around">
      <div className="col-md-5 m-3">
        <h3 id="this_month_title" className="text-center">{todayMonth}월</h3>
        <div className="border p-4">
          <table className="table w-100 text-center">
            <tbody id="tbody_month">
              {monthData.map((item, idx) => {
                return (
                  <tr key={'monthData' + idx}>
                    <td>{item.content}</td><td>{item.money}원</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-5 m-3">
        <h3 id="today_title" className="text-center">{todayDate}일</h3>
        <div className="border p-4">
          <table className="table w-100 text-center">
            <tbody id="tbody_day">
              {dateData.map((item, idx) => {
                return (
                  <tr key={'dateData' + idx}>
                    <td>{item.content}</td><td>{item.money}원</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="m-3 d-flex flex-column gap-3 text-center">
        <h3 className="">뉴스</h3>
        <div>
          <span className="bg-secondary text-center m-3 p-3 bg-opacity-25 border">
            ‘안심전환대출’ 보름 간 3만,19건,2조9098 신청 접수
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;