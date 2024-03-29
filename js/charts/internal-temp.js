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
    low : {
        __count : 0,
        __data : {
            i: 0,
            s: 0,
            a: 0
        }
    },
    medium : {
        __count : 0,
        __data : {
            i: 0,
            s: 0,
            a: 0
        }
    },
    high : {
        __count : 0,
        __data : {
            i: 0,
            s: 0,
            a: 0
        }
    }
}

for(let i = 0; i < __total; i++) {
    if(data[i].lcore == "low") {
        __totalData.low.__count++

        if(data[i].dec == "A") {
            __totalData.low.__data.a++
        } else if(data[i].dec == "S") {
            __totalData.low.__data.s++
        } else {
            __totalData.low.__data.i++
        }
    } else if(data[i].lcore == "mid") {
        __totalData.medium.__count++

        if(data[i].dec == "A") {
            __totalData.medium.__data.a++
        } else if(data[i].dec == "S") {
            __totalData.medium.__data.s++
        } else {
            __totalData.medium.__data.i++
        }
    } else {
        __totalData.high.__count++

        if(data[i].dec == "A") {
            __totalData.high.__data.a++
        } else if(data[i].dec == "S") {
            __totalData.high.__data.s++
        } else {
            __totalData.high.__data.i++
        }
    }
}

// here you can see the data formatted
console.log(__totalData)

// preparing the chart data
let chartData = {
    labels: ['Niska', 'Normalna', 'Visoka'],
    datasets: [{
        label: 'I - Intenzivna njega',
        backgroundColor: '#ff0000',
        data: [
            __totalData.low.__data.i,
            __totalData.medium.__data.i,
            __totalData.high.__data.i
        ]
    },{
        label: 'A - Odjel opce medicine',
        backgroundColor: '#fff04d',
        data: [
            __totalData.low.__data.a,
            __totalData.medium.__data.a,
            __totalData.high.__data.a
        ]
    }, {
        label: 'S - Spremni za odlazak kuci',
        backgroundColor: '#00b894',
        data: [
            __totalData.low.__data.s,
            __totalData.medium.__data.s,
            __totalData.high.__data.s
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