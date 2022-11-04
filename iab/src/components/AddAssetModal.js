import { useState } from 'react';

const AddAssetModal = ({ assetColorList, closeModal }) => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [money, setMoney] = useState();
  const [color, setColor] = useState(0);

  const handleName = ({target: { value }}) => setName(value);
  const handleType = ({target: { value }}) => setType(value);
  const handleMoney = ({target: { value }}) => setMoney(value);
  const handleColor = ({target}) => {
    setColor(parseInt(target.getAttribute('value')));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(type);
    console.log(money);
    console.log(color); 
  };
  return (
    <div id="add_asset_modal" className="modal fade show">
      <div className="modal-dialog modal-dialog-centered">  
        <div className="modal-content border">
          <button onClick={closeModal} id="close_modal_btn" type="button" className="btn-close p-3" aria-label="Close"></button>
          <form id="add_asset_form" className="d-flex flex-wrap p-5 mx-5 gap-3" onSubmit={handleSubmit}>
            <input type="text" onChange={handleName} className="form-control" placeholder="이름" required/>
            <select name="type" id="asset-type" onChange={handleType} className="form-select border" required>
              <option value="">--- 자산 형태 선택 ---</option>
              <option value="0">통장</option>
              <option value="1">카드</option>
              <option value="2">간편결제</option>
            </select>
            <input id="input_money" type="text" onChange={handleMoney} className="form-control" placeholder="금액" required/>
            <div className="d-flex w-100 justify-content-center gap-3">
              {assetColorList.map((item, idx) => {
                return (
                  <span key={idx} value={idx} className="btn p-2 select-scale"  onClick={handleColor} style={{ backgroundColor: item }}>
                    <input type="radio" checked={color===idx} className="btn-check" readOnly></input>
                  </span>
                )
              })}
            </div>
            <input type="submit" className="btn my-3 mx-auto" value="추가" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;