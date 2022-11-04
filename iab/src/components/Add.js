import { useEffect, useState } from 'react';

const Add = ({ assetList, expenseTypeList }) => {
  const [type, setType] = useState('0');
  const [selectAsset, setSelectAsset] = useState(0);
  const [selectExpense, setSelectExpense] = useState(0);
  const todayDate = new Date().toISOString().substring(0,10);

  const typeChange = (e) => {
    setType(e.target.getAttribute('value'));
  };
  const selectAssetChange = (e) => {
    const target = e.target.closest('div');
    setSelectAsset(parseInt(target.getAttribute('value')));
  };
  const selectExpenseChange = (e) => {
    const target = e.target.closest('div');
    setSelectExpense(parseInt(target.getAttribute('value')));
  };

  // useEffect(() => {
  //   document.querySelectorAll('input[type=input_date]').value = new Date().toISOString().slice(0, 7);
  // }, []);
  return (
    <form id="add-form" className="row p-3 g-5">
      <div className="col-lg-8 d-flex flex-column gap-3">
        <div className="btn-group d-table mx-auto select-bg">
          <input type="radio" checked={type === "0"} className="btn-check" readOnly />
          <span className="btn" value="0" onClick={typeChange}>지출</span>
          <input type="radio" checked={type === "1"} className="btn-check" readOnly />
          <span className="btn" value="1" onClick={typeChange}>수입</span>
        </div>
        <div className="border">
          <label className="d-block text-center my-1 fs-5">자산선택</label>
          <div id="select-asset" className="d-flex gap-2 flex-wrap p-3 justify-content-center">
            {assetList.map((asset, idx) => {
              return (
                <div key={asset.name + idx} value={idx} onClick={selectAssetChange} className="btn select-scale" style={{ backgroundColor: asset.color }}>
                  <input type="radio" checked={selectAsset===idx} className="btn-check" readOnly/>
                  <span>{asset.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="border">
          <label className="d-block text-center my-1 fs-5">분류</label>
          <div id="select-type" className="d-flex gap-2 flex-wrap p-3 justify-content-center">
            {expenseTypeList.map((expense, idx) => {
              return (
                <div key={expense + idx} value={idx} onClick={selectExpenseChange} className="btn select-scale">
                  <input type="radio" checked={selectExpense===idx} className="btn-check" readOnly/>
                  <span>{expense}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>


      <div className="col-lg-4 d-flex flex-wrap align-content-center gap-5">
        <input id="input_date" type="date" className="form-control" defaultValue={todayDate}/>
        <input type="text" className="form-control" placeholder="금액" aria-label="금액"/>
        <input type="text" className="form-control" placeholder="내용" aria-label="내용"/>
        <input type="button" className="form-control" value="추가" aria-label="추가"/>
      </div>
    </form>
  );
};

export default Add;