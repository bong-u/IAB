'use strict';

let current_state = 0;
const income_btn = document.getElementById('income_btn');
const expense_btn = document.getElementById('expense_btn');
const btn_group = document.getElementById('btn_group');

const switch_stats = (event) => {
    const target = event.target;
    const target_id = parseInt(target.getAttribute('btn-value'));
    const sibling = target_id ? target.previousElementSibling:  target.nextElementSibling;

    target.classList.add('btn-select');
    sibling.classList.remove('btn-select');

    current_state = target_id;
};

btn_group.addEventListener('click', switch_stats);


const mychart = document.getElementById('stats_chart');

const data = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: ['#CCF3EE', '#FFD1D1', '#C8DBBE'],
    }],
    labels: ['술값','식비','생활비'],
};

new Chart(mychart, {
    type: 'pie',
    data: data,
    options: {}
}); 