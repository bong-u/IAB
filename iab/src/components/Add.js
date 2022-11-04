import { useState } from 'react';

const Add = ({ assetList, expenseTypeList }) => {
  const todayDate = new Date().toISOString().substring(0,10);

  const [type, setType] = useState('0');
  const [asset, setAsset] = useState(0);
  const [expense, setExpense] = useState(0);
  
  const [date, setDate] = useState(0);
  const [content, setContent] = useState(0);

  const typeChange = (e) => {
    setType(e.target.getAttribute('value'));
  };
  const handleAsset = (e) => {
    const target = e.target.closest('div');
    setAsset(parseInt(target.getAttribute('value')));
  };
  const handleExpense = (e) => {
    const target = e.target.closest('div');
    setExpense(parseInt(target.getAttribute('value')));
  };
  const handleDate = ({target: { value }}) => setDate(value);
  const handleMoney = ({target: { value }}) => setDate(value);
  const handleContent = ({target: { value }}) => setContent(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(type, asset, expense, date, content);

  };

  return (
    <form id="add-form" className="row p-3 g-5" onSubmit={handleSubmit}>
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
            {assetList.map((item, idx) => {
              return (
                <div key={item.name + idx} value={idx} onClick={handleAsset} className="btn select-scale" style={{ backgroundColor: item.color }}>
                  <input type="radio" checked={asset===idx} className="btn-check" readOnly/>
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="border">
          <label className="d-block text-center my-1 fs-5">분류</label>
          <div id="select-type" className="d-flex gap-2 flex-wrap p-3 justify-content-center">
            {expenseTypeList.map((item, idx) => {
              return (
                <div key={item + idx} value={idx} onClick={handleExpense} className="btn select-scale">
                  <input type="radio" checked={expense===idx} className="btn-check" readOnly/>
                  <span>{item}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>


      <div className="col-lg-4 d-flex flex-wrap align-content-center gap-5">
        <input id="input_date" type="date" onChange={handleDate} className="form-control" defaultValue={todayDate}/>
        <input type="text" onChange={handleMoney} className="form-control" placeholder="금액" aria-label="금액"/>
        <input type="text" onChange={handleContent} className="form-control" placeholder="내용" aria-label="내용"/>
        <input type="submit" className="form-control" value="추가" aria-label="추가"/>
      </div>
    </form>
  );
};

export default Add;