const Asset = () => {
  return (
    <div>
      <div className="d-flex w-100 px-5 gap-5 flex-wrap justify-content-center">
          <div id="open_modal_btn" className="asset-div p-4 text-center shadow">
              {/* background #DDDDDD */}
              <img className="asset-icon p-1 mb-2" src="images/add.png" alt=""/>
              <p className="my-3">자산 추가</p>
          </div>
      </div>
    </div>
  );
};

export default Asset;