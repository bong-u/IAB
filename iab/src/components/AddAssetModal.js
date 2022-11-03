const AddAssetModal = ({ assetColorList, closeModal }) => {
  return (
    <div id="add_asset_modal" className="modal fade show">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border">
          <button onClick={closeModal} id="close_modal_btn" type="button" className="btn-close p-3" aria-label="Close"></button>
          <form id="add_asset_form" className="d-flex flex-wrap p-5 mx-5 gap-3" method="post">
            <input type="text" name="name" className="form-control" placeholder="이름" />
            <select name="type" id="asset-type" className="form-select border" required>
              <option value="">--- 자산 형태 선택 ---</option>
              <option value="0">통장</option>
              <option value="1">카드</option>
              <option value="2">간편결제</option>
            </select>
            <input id="input_money" type="text" name="money" className="form-control" placeholder="금액" />
            <div className="d-flex w-100 justify-content-center gap-3">
              {assetColorList.map((color, idx) => {
                return (
                  <div key={"color" + idx} className="select-scale">
                    <input type="radio" name="color" value={idx} id={"color" + idx} className="btn-check" required />
                    <span className="btn p-2" style={{ backgroundColor: color }}></span>
                  </div>
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