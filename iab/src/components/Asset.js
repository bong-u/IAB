import { useEffect, useState } from 'react';
import AddAssetModal from './AddAssetModal';

const Asset = () => {
  const [assetList, setAssetList] = useState([]);
  const [assetColorList, setAssetColorList] = useState([]);
  const [modalFlag, setModalFlag] = useState(false);
  const gray = '#dddddd';

  const openModal = () => { setModalFlag(true); };
  const closeModal = () => { setModalFlag(false); };


  useEffect(() => {
    fetch('http://localhost:3001/asset', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setAssetList(data['asset_list']);
        setAssetColorList(data['asset_color_list'])
      });
  }, []);

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
        <div id="open_modal_btn" onClick={openModal} className="asset-div p-4 text-center shadow" style={{ backgroundColor: gray }}>
          <img className="asset-icon p-1 mb-2" src="images/add.png" alt="" />
          <p className="my-3">자산 추가</p>
        </div>
      </div>
      <div className={modalFlag ? '' : 'hide'}>
        <AddAssetModal assetColorList={assetColorList} closeModal={closeModal} ></AddAssetModal>
      </div>
    </div>
  );
};

export default Asset;