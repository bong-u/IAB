'use strict';

const today_title = document.getElementById('today_title');
const this_month_title = document.getElementById('this_month_title');
const tbody_day = document.getElementById('tbody_day');
const tbody_month = document.getElementById('tbody_month');

const date = new Date();
const week = ['일','월','화','수','목','금','토'];

today_title.textContent = `${date.getDate()}일 (${week[date.getDay()]})`;
this_month_title.textContent = `${date.getMonth()}월`;

const data_day = {
    '99아메리카노' : '2300',
    '학식' : '7000',
}
const data_month = {
    '수입' : '12000',
    '지출' : '7000',
    '계'   : '5000'
}

for (let [key, value] of Object.entries(data_day)) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.textContent = key;
    var td2 = document.createElement('td');
    td2.textContent = value+'원';
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody_day.appendChild(tr);
}
for (let [key, value] of Object.entries(data_month)) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.textContent = key;
    var td2 = document.createElement('td');
    td2.textContent = value+'원';
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody_month.appendChild(tr);
}