let data = null

// make it sync
$.ajaxSetup({
    async: false
})

// fetch json data from the data file
$.getJSON("https://api.myjson.com/bins/buh36", function(json) {
    data = json 
})

// data preparation

// count the total entries in the data set
let __total = data.length

// count the total low, med and high BP entires
let __totalData = {
    excellent : {
        __count : 0,
        __data : {
            i: 0,
            s: 0,
            a: 0
        }
    },
    good : {
        __count : 0,
        __data : {
            i: 0,
            s: 0,
            a: 0
        }
    },
    fair : {
        __count : 0,
        __data : {
            i: 0,
            s: 0,
            a: 0
        }
    },
	poor : {
        __count : 0,
        __data : {
            i: 0,
            s: 0,
            a: 0
        }
    }
}

for(let i = 0; i < __total; i++) {
    if(data[i].lo2 == "excellent") {
        __totalData.excellent.__count++

        if(data[i].dec == "A") {
            __totalData.excellent.__data.a++
        } else if(data[i].dec == "S") {
            __totalData.excellent.__data.s++
        } else {
            __totalData.excellent.__data.i++
        }
    } else if(data[i].lo2 == "good") {
        __totalData.good.__count++

        if(data[i].dec == "A") {
            __totalData.good.__data.a++
        } else if(data[i].dec == "S") {
            __totalData.good.__data.s++
        } else {
            __totalData.good.__data.i++
        }
    } else if(data[i].lo2 == "fair") {
        __totalData.fair.__count++

        if(data[i].dec == "A") {
            __totalData.fair.__data.a++
        } else if(data[i].dec == "S") {
            __totalData.fair.__data.s++
        } else {
            __totalData.fair.__data.i++
        }
    } else {
        __totalData.poor.__count++

        if(data[i].dec == "A") {
            __totalData.poor.__data.a++
        } else if(data[i].dec == "S") {
            __totalData.poor.__data.s++
        } else {
            __totalData.poor.__data.i++
        }
    }
}

// here you can see the data formatted
console.log(__totalData)

// preparing the chart data
let chartData = {
    labels: ['Excellent', 'Good', 'Fair', 'Poor'],
    datasets: [{
        label: 'I - Intensive care',
        backgroundColor: '#ff7675',
        data: [
            __totalData.excellent.__data.i,
            __totalData.good.__data.i,
            __totalData.fair.__data.i,
			__totalData.poor.__data.i
        ]
    }, {
        label: 'S - Ready to go home',
        backgroundColor: '#00b894',
        data: [
            __totalData.excellent.__data.s,
            __totalData.good.__data.s,
            __totalData.fair.__data.s,
			__totalData.poor.__data.s
        ]
    }, {
        label: 'A - General hospital floor',
        backgroundColor: '#0984e3',
        data: [
            __totalData.excellent.__data.a,
            __totalData.good.__data.a,
            __totalData.fair.__data.a,
			__totalData.poor.__data.a
        ]
    }]
}

// initilizing the chart
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});