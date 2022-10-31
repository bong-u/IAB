'use strict';

const open_modal_btn = document.getElementById('open_modal_btn');
const close_modal_btn = document.getElementById('close_modal_btn');
const modal = document.getElementById('add_asset_modal');

const add_asset_form = document.getElementById('add_asset_form');
const input_money = document.getElementById('input_money');

const add_asset = (e) => {
    // e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    console.log (data);
};

open_modal_btn.addEventListener('click', () => {
    modal.classList.add('show');
    modal.style.display = 'block';
});
close_modal_btn.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.style.display = 'none';
    add_asset_form.reset();
});
input_money.addEventListener('focusout', (e) => {
    let value = e.target.value;
    input_money.value = value.replace (/[^0-9]/g, '') + '원';
});
input_money.addEventListener('keyup', (e) => {
    let value = e.target.value;
    input_money.value = value.replace (/[^0-9]/g, '');
});
add_asset_form.addEventListener('submit', add_asset);