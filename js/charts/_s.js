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
    lcore : {
        high : 0,
        mid : 0,
        low : 0
    },
    lsurf : {
        high : 0,
        mid : 0,
        low : 0
    },
    lo2 : {
        excellent : 0,
        good : 0,
        fair : 0,
        poor : 0
    },
    lbp : {
        high : 0,
        mid : 0,
        low : 0
    },
    surfstbl : {
        stable : 0,
        mod : 0,
        unstable : 0
    },
    corestbl : {
        stable : 0,
        mod : 0,
        unstable : 0
    },
    bpstbl : {
        stable : 0,
        mod : 0,
        unstable : 0
    }
}

for(let i = 0; i < __total; i++) {
    if(data[i].dec == "S") {
        // core
        if(data[i].lcore == "low") {
            __totalData.lcore.low++
        } else if(data[i].lcore == "mid") {
            __totalData.lcore.mid++
        } else {
            __totalData.lcore.high++
        }

        // surface 
        if(data[i].lsurf == "low") {
            __totalData.lsurf.low++
        } else if(data[i].lsurf == "mid") {
            __totalData.lsurf.mid++
        } else {
            __totalData.lsurf.high++
        }

        // oxygene level
        if(data[i].lo2 == "excellent") {
            __totalData.lo2.excellent++
        } else if(data[i].lo2 == "good") {
            __totalData.lo2.good++
        } else if(data[i].lo2 == "fair") {
            __totalData.lo2.fair++
        } else {
           __totalData.lo2.poor++
        }

        // lbp
        if(data[i].lbp == "low") {
            __totalData.lbp.low++
        } else if(data[i].lbp == "mid") {
            __totalData.lbp.mid++
        } else {
            __totalData.lbp.high++
        }

        // surfstbl
        if(data[i].surfstbl == "stable") {
            __totalData.surfstbl.stable++
        } else if(data[i].surfstbl == "unstable") {
            __totalData.surfstbl.unstable++
        } else {
            __totalData.surfstbl.mod++
        }

        // corestbl
        if(data[i].corestbl == "stable") {
            __totalData.corestbl.stable++
        } else if(data[i].surfstbl == "unstable") {
            __totalData.corestbl.unstable++
        } else {
            __totalData.corestbl.mod++
        }     

        // bpstbl
        if(data[i].bpstbl == "stable") {
            __totalData.bpstbl.stable++
        } else if(data[i].bpstbl == "unstable") {
            __totalData.bpstbl.unstable++
        } else {
            console.log("TEST ",__totalData.bpstbl.mod)
            __totalData.bpstbl.mod++
        }  
    }
}

// here you can see the data formatted
console.log(__totalData)

// preparing the chart data
// initilizing the chart
var internal_ctx = document.getElementById("internal");
var internal = new Chart(internal_ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                __totalData.lcore.low,
                __totalData.lcore.mid,
                __totalData.lcore.high
            ],
            backgroundColor: [
                '#84C0F2',
                '#00b894',
                '#ff7675'
            ],
            label: 'Internal temperature'
        }],
        labels: [
            'Niska',
            'Normalna',
            'Visoka'
        ]
    },
    options: {
        
    }
});

var external_ctx = document.getElementById("external");
var external = new Chart(external_ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                __totalData.lsurf.low,
                __totalData.lsurf.mid,
                __totalData.lsurf.high
            ],
            backgroundColor: [
                '#84C0F2',
                '#00b894',
                '#ff7675'
            ],
            label: 'External temperature'
        }],
        labels: [
            'Niska',
            'Normalna',
            'Visoka'
        ]
    },
    options: {
        
    }
});

var bp_ctx = document.getElementById("bp");
var bp = new Chart(bp_ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                __totalData.lbp.low,
                __totalData.lbp.mid,
                __totalData.lbp.high
            ],
            backgroundColor: [
                '#84C0F2',
                '#00b894',
                '#ff7675'
            ],
            label: 'Blood pressure level'
        }],
        labels: [
            'Nizak',
            'Normalan',
            'Visok'
        ]
    },
    options: {
        
    }
});

var oxygen_ctx = document.getElementById("oxygen");
var oxygen = new Chart(oxygen_ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                __totalData.lo2.excellent,
                __totalData.lo2.good,
                __totalData.lo2.fair,
                __totalData.lo2.poor
            ],
            backgroundColor: [
                '#00b894',
                '#fdcb6e',
                '#fff04d',
                '#ff7675'
            ],
            label: 'Oxygen level'
        }],
        labels: [
            'Odlican',
            'Dobar',
            'Zadovoljavajuci',
            'Los'
        ]
    },
    options: {
        
    }
});

var surfstbl_ctx = document.getElementById("surfstbl");
var surfstbl = new Chart(surfstbl_ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                __totalData.surfstbl.stable,
                __totalData.surfstbl.mod,
                __totalData.surfstbl.unstable
            ],
            backgroundColor: [
                '#00b894',
                '#fff04d',
                '#ff7675'
            ],
            label: 'Surface temperature stability'
        }],
        labels: [
            'Stabilno',
            'Polustabilno',
            'Nestabilno'
        ]
    },
    options: {
        
    }
});

var bpstbl_ctx = document.getElementById("bpstbl");
var bpstbl = new Chart(bpstbl_ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                __totalData.bpstbl.stable,
                __totalData.bpstbl.mod,
                __totalData.bpstbl.unstable
            ],
            backgroundColor: [
                '#00b894',
                '#fff04d',
                '#ff7675'
            ],
            label: 'Surface temperature stability'
        }],
        labels: [
            'Stabilno',
            'Polustabilno',
            'Nestabilno'
        ]
    },
    options: {
        
    }
});

var corestbl_ctx = document.getElementById("corestbl");
var corestbl = new Chart(corestbl_ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                __totalData.corestbl.stable,
                __totalData.corestbl.mod,
                __totalData.corestbl.unstable
            ],
            backgroundColor: [
                '#00b894',
                '#fff04d',
                '#ff7675'
            ],
            label: 'Surface temperature stability'
        }],
        labels: [
            'Stabilno',
            'Polustabilno',
            'Nestabilno'
        ]
    },
    options: {
        
    }
});