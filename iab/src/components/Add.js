const Add = () => {
  return (
    <form id="add-form" className="row p-3 g-5">
      <div className="col-lg-8 d-flex flex-column gap-3">
        <div className="btn-group d-table mx-auto select-bg">
          <input type="radio" name="select" id="income" className="btn-check" checked />
          <label className="btn" for="income">지출</label>
          <input type="radio" name="select" id="expense" className="btn-check" />
          <label className="btn" for="expense">수입</label>
        </div>
        <div className="border">
          <label className="d-block text-center my-1 fs-5">자산선택</label>
          <div id="select-asset" className="d-flex gap-2 flex-wrap p-3 justify-content-center select-scale">
            <input type="radio" name="select_asset" id="<%= item.name %>" className="btn-check" />
            <label className="btn" for="<%= item.name %>"></label>
            {/* style itme color */}
          </div>
        </div>
        <div className="border">
          <label className="d-block text-center my-1 fs-5">분류</label>
          <div id="select-type" className="d-flex gap-2 flex-wrap p-3 justify-content-center select-scale">
            <input type="radio" name="select_asset" id="<%= item %>" className="btn-check" />
            <label className="btn" for="<%= item %>"></label>
          </div>
        </div>
      </div>


      <div className="col-lg-4 d-flex flex-wrap align-content-center gap-5">
        <input id="input_date" type="date" className="form-control" value="" />
        <input type="text" className="form-control" placeholder="금액" aria-label="금액" />
        <input type="text" className="form-control" placeholder="내용" aria-label="내용" />
        <input type="button" className="form-control" value="추가" aria-label="추가" />
      </div>
    </form>
  );
};

export default Add;