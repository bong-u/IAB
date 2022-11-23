import { useState } from 'react';

const Add = ({ token, assetList, categoryList}) => {
  // 오늘 날짜를 placeholder로 설정
  const todayDate = new Date().toISOString().substring(0, 10);

  // form의 values
  const [type, setType] = useState(0);
  const [asset, setAsset] = useState(0);
  const [category, setCategory] = useState(0);
  const [date, setDate] = useState(todayDate);
  const [money, setMoney] = useState(0);
  const [content, setContent] = useState(0);

  // update state
  const typeChange = (e) => {
    console.log(categoryList);
    setType(parseInt(e.target.getAttribute('value')));
  };
  const handleAsset = (e) => {
    const target = e.target.closest('div');
    setAsset(parseInt(target.getAttribute('value')));
  };
  const handleCategory = (e) => {
    const target = e.target.closest('div');
    setCategory(parseInt(target.getAttribute('value')));
  };
  const handleDate = ({ target: { value } }) => setDate(value);
  const handleMoney = ({ target: { value } }) => setMoney(parseInt(value));
  const handleContent = ({ target: { value } }) => setContent(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8001/transaction', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      // js array의 index는 0부터 시작, sqlalchemy model의 id는 1부터 시작이므로 asset_id에 1더해서 요청한다.
      body: JSON.stringify({ type: type, asset_id: asset + 1, category: category, date: date, money: money, content: content })
    })
      .then(async res => {
        const data = await res.json();
        if (res.status === 200) {
          alert('거래내용이 추가되었습니다.');
          document.getElementById('add-form').reset();
        } else {
          console.log(data);
          alert('자산을 추가하는데 실패했습니다');
        }
      });
  };

  return (
    <form id="add-form" className="row p-3 g-5" onSubmit={handleSubmit}>
      <div className="col-lg-8 d-flex flex-column gap-3">
        {/* expense/income switch */}
        <div className="btn-group d-table mx-auto select-bg">
          <input type="radio" checked={type === 0} className="btn-check" readOnly />
          <span className="btn" value="0" onClick={typeChange}>지출</span>
          <input type="radio" checked={type === 1} className="btn-check" readOnly />
          <span className="btn" value="1" onClick={typeChange}>수입</span>
        </div>
        {/* asset */}
        <div className="border">
          <label className="d-block text-center my-1 fs-5">자산선택</label>
          <div id="select-asset" className="d-flex gap-2 flex-wrap p-3 justify-content-center">
            {assetList.map((item, idx) => {
              return (
                <div key={item.name + idx} value={idx} onClick={handleAsset} className="btn select-scale" style={{ backgroundColor: item.color }}>
                  <input type="radio" checked={asset === idx} className="btn-check" readOnly />
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        {/* type */}
        <div className="border">
          <label className="d-block text-center my-1 fs-5">분류</label>
          <div id="select-type" className="d-flex gap-2 flex-wrap p-3 justify-content-center">
            { categoryList !== undefined
            ? categoryList[type].map((item, idx) => {
              return (
                <div key={item + idx} value={idx} onClick={handleCategory} className="btn select-scale">
                  <input type="radio" checked={category === idx} className="btn-check" readOnly />
                  <span>{item}</span>
                </div>
              )
            }) : null}  
          </div>
        </div>
      </div>


      <div className="col-lg-4 d-flex flex-wrap align-content-center gap-5">
        {/* date */}
        <input id="input_date" type="date" onChange={handleDate} className="form-control" defaultValue={todayDate} />
        {/* money */}
        <input type="text" onChange={handleMoney} className="form-control" placeholder="금액" aria-label="금액" />
        {/* content */}
        <input type="text" onChange={handleContent} className="form-control" placeholder="내용" aria-label="내용" />
        {/* submit */}
        <input type="submit" className="form-control" value="추가" aria-label="추가" />
      </div>
    </form>
  );
};

export default Add;