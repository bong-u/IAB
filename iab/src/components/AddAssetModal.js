import { useState } from 'react';

const AddAssetModal = ({ token, assetColorList, closeModal }) => {
  // form의 values
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [balance, setBalance] = useState();
  const [color, setColor] = useState(0);

  // update state
  const handleName = ({ target: { value } }) => setName(value);
  const handleType = ({ target: { value } }) => setType(parseInt(value));
  const handleBalance = ({ target: { value } }) => setBalance(value);
  const handleColor = ({ target }) => {
    setColor(parseInt(target.getAttribute('value')));
  };

  // submit post
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, type, balance, color);
    fetch('http://localhost:8001/asset', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: name, type: type, balance: balance, color: color })
    })
      .then(async res => {
        const data = await res.json();
        if (res.status === 200) {
          alert('자산이 추가되었습니다.');
          window.location.reload();
        } else {
          console.log(data);
          alert ('자산을 추가하는데 실패했습니다');
        }
      });
  };
  return (
    <div id="add_asset_modal" className="modal fade show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border">
          <button onClick={closeModal} id="close_modal_btn" type="button" className="btn-close p-3" aria-label="Close"></button>
          <form id="add_asset_form" onSubmit={handleSubmit} className="d-flex flex-wrap p-5 mx-5 gap-3">
            {/* name */}
            <input type="text" onChange={handleName} className="form-control" placeholder="이름" required />
            {/* asset type */}
            <select name="type" id="asset-type" onChange={handleType} className="form-select border" required>
              <option value="">--- 자산 형태 선택 ---</option>
              <option value="0">통장</option>
              <option value="1">카드</option>
              <option value="2">간편결제</option>
            </select>
            {/* balance */}
            <input type="number" onChange={handleBalance} className="form-control" placeholder="금액" required />
            {/* asset */}
            <div className="d-flex w-100 justify-content-center gap-3">
              {assetColorList.map((item, idx) => {
                return (
                  <span key={idx} value={idx} className="btn p-2 select-scale" onClick={handleColor} style={{ backgroundColor: item }}>
                    <input type="radio" checked={color === idx} className="btn-check" readOnly></input>
                  </span>
                )
              })}
            </div>
            {/* submit */}
            <input type="submit" className="btn my-3 mx-auto" value="추가" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;