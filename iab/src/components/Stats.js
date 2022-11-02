const Stats = () => {
  return (
    <div>
      <div className="d-table mx-auto">
        <div className="btn-group mx-auto select-bg">
          <input type="radio" name="select" id="income" className="btn-check" checked />
          <label className="btn" for="income">지출</label>
          <input type="radio" name="select" id="expense" className="btn-check" />
          <label className="btn" for="expense">수입</label>
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