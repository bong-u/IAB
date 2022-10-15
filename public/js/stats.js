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


const stats_chart = document.getElementById('stats_chart').getContext('2d');

const data = {
    labels: ['술값','식비','생활비'],
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: ['#CCF3EE', '#FFD1D1', '#C8DBBE'],
    }],
};

Chart.defaults.global.defaultFontColor = '#000000';
Chart.defaults.global.defaultFontFamily = 'Malang';
console.log(Chart.defaults);
Chart.defaults.global.defaultFontSize = 16;
const chart = new Chart(stats_chart, {
    type: 'pie',
    data: data,
    options: {}
});
