'use strict';

const open_modal_btn = document.getElementById('open_modal_btn');
const close_modal_btn = document.getElementById('close_modal_btn');
const modal = document.getElementById('add_asset_modal');

open_modal_btn.addEventListener('click', () => {
    modal.classList.add('show');
    modal.style.display = 'block';
});
close_modal_btn.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.style.display = 'none';
});
