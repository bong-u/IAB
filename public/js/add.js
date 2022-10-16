'use strict';

const input_date = document.getElementById('input_date');
input_date.valueAsDate = new Date();
input_date.max = new Date().toISOString().split("T")[0];