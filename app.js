//this is all the information my app needs to access the api and get all the nessacary data
const key = "4PLFFAGB52WKXUZS"
let symbol = "1. symbol"
let name = "2. name"
let currency = "8. currency"
let region = "4. region"
let table = document.getElementById("resultstable")
let datacanvas = document.getElementById("datachart")
//this is initilizing the charts and table
let datachart = new Chart(datacanvas,{
    type:'line',
    data: {
        labels: stockdate,
    datasets : [
    {
        data : stockopen,
        label : "Open",
        borderColor : "#3e95cd",
        fill: false
    },
    {
        data : stockhigh,
        label : "High",
        borderColor : "#8e5ea2",
        fill: false
    },
    {
        data : stocklow,
        label : "Low",
        borderColor : "#e8c3b9",
        fill: false
    },
    {
        data : stockclose,
        label : "Close",
        borderColor : "#c45850",
        fill: false
    },
    ]
    },
    options:{
        title:{
            display: true,
            text:"Stock Information"
        }
        
    }
})
let counter = 0
    while(counter<100){
        console.log( counter, stockopen[counter], stockhigh[counter], stocklow[counter], stockclose[counter])
        let row = table.insertRow(1)
        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)
        let cell4 = row.insertCell(3)
        let cell5 = row.insertCell(4)
        let cell6 = row.insertCell(5)
        cell1.innerHTML = counter+1
        cell2.innerHTML = stockopen[counter]
        cell3.innerHTML = stockhigh[counter]
        cell4.innerHTML = stocklow[counter]
        cell5.innerHTML = stockclose[counter]
        cell6.innerHTML = stockvolume[counter]
        counter++

    
    }
let volumecanvas = document.getElementById("volumechart")
let volumechart = new Chart(volumecanvas,{
    type: 'bar',
    data: {
      labels: stockdate,
      datasets: [
        {
          label: "Volume of Stock",
          backgroundColor: "#3e95cd",
          data: stockvolume
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Volume of of Stock'
      }
    }
})
//this is triggered when the button is clicked it searches for any matches to a user query
document.getElementById("searcher").addEventListener("click", function(){
    let input = document.getElementById("input").value    
    let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${key}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let list = document.getElementById("search-results")
        while(list.firstChild){
            list.removeChild(list.firstChild)
        }
      
        if(data.bestMatches.length !=0){
            data.bestMatches.forEach(element => {
                let item = document.createElement("li")

                item.setAttribute("class","list-group-item list-group-item-action")

                item.innerHTML = element[symbol];
                list.appendChild(item)
            });
        }
    })

})
//this is triggered when a list item is clicked it gets the inner html stock symbol and returns all the data
document.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        let symbol = e.target.innerHTML
        document.getElementById("symbol").innerHTML = symbol 
        console.log(symbol)
        let url =`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
        let mainobject = "Time Series (Daily)"
        let opendata = "1. open"
        let highdata = "2. high"
        let lowdata = "3. low"
        let closedata = "4. close"
        let volumedata = "5. volume"

        let date = [];
        let open = [];
        let high = [];
        let low = [];
        let close = [];
        let volume = [];
            for(object in data[mainobject]){
                date.push(object)
                open.push(data[mainobject][object][opendata])
                high.push(data[mainobject][object][highdata])
                low.push(data[mainobject][object][lowdata])
                close.push(data[mainobject][object][closedata])
                volume.push(data[mainobject][object][volumedata])
        
            }
            let number = table.rows.length
            while(--number){
                table.deleteRow(number)
            }
            //this updates the chart data
            datachart.data.labels = date.reverse()
            datachart.data.datasets[0].data = open.reverse()
            datachart.data.datasets[1].data = high.reverse()
            datachart.data.datasets[2].data = low.reverse()
            datachart.data.datasets[3].data = close.reverse()
            datachart.update()
            volumechart.data.datasets[0].data = volume.reverse()
            volumechart.update()
            let tbody = document.querySelector("tbody")
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild)
    }
    //this updates the table
    let counter = 0
    while(counter<100){
        console.log( counter, open[counter], high[counter], low[counter], close[counter])
        let row = table.insertRow(1)
        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)
        let cell4 = row.insertCell(3)
        let cell5 = row.insertCell(4)
        let cell6 = row.insertCell(5)
        cell1.innerHTML = counter+1
        cell2.innerHTML = open[counter]
        cell3.innerHTML = high[counter]
        cell4.innerHTML = low[counter]
        cell5.innerHTML = close[counter]
        cell6.innerHTML = volume[counter]
        counter++

    
    }
            
        })
        }
    })
   

