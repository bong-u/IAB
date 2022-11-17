import { useState } from 'react';
import AddAssetModal from './AddAssetModal';

const Asset = ({ token, assetList, assetColorList }) => {
  // modal의 상태 0:hide, 1:show
  const [modalFlag, setModalFlag] = useState(false);

  const openModal = () => { setModalFlag(true);   };
  const closeModal = () => { setModalFlag(false); };

  return (
    <div>
      <div className="d-flex w-100 px-5 gap-5 flex-wrap justify-content-center">
        {assetList.map((asset, idx) => {
          return (
            <div key={asset.name + idx} className="asset-div p-4 text-center shadow" style={{ backgroundColor: asset.color }}>
              <img className="asset-icon p-1 mb-2" src={`images/${asset.type}.png`} alt="" />
              <p>{asset.name}</p><p>{asset.money}원</p>
            </div>
          )
        })}
        {/* onClick -> openModal 트리거 */}
        <div id="open_modal_btn" onClick={openModal} className="asset-div p-4 text-center shadow" style={{ backgroundColor: ("#dddddd") }}>
          <img className="asset-icon p-1 mb-2" src="images/add.png" alt="" />
          <p className="my-3">자산 추가</p>
        </div>
      </div>
      {/* modalFlag에 따라 show or hide */}
      <div className={modalFlag ? 'd-block' : 'd-none'}>
        <AddAssetModal token={token} assetColorList={assetColorList} closeModal={closeModal} ></AddAssetModal>
      </div>
    </div>
  );
};

export default Asset;