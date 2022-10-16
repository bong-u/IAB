'use strict';

const stats_chart = document.getElementById('stats_chart').getContext('2d');

const data = {
    labels: ['술값','식비','생활비'],
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: ['#CCF3EE', '#FFD1D1', '#C8DBBE'],
        borderColor: Array.from({length: 3}, () => '#000000'),
    }],
};

Chart.defaults.global.defaultFontColor = '#000000';
Chart.defaults.global.defaultFontFamily = 'Malang';
Chart.defaults.global.defaultFontSize = 16;
const chart = new Chart(stats_chart, {
    type: 'pie',
    data: data,
    options: {},
});