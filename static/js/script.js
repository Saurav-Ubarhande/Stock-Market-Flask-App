
async function submitData() {
    const data = document.getElementById('stockname').value;
    
    // Clear previous error messages
    document.getElementById('error').textContent = '';
    document.getElementById('error').style.display = 'none';

    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
  
    document.getElementById('company').style.display = 'none';
    document.getElementById('stocksummary').style.display = 'none';
    document.getElementById('charts').style.display = 'none';
    document.getElementById('latestnews').style.display = 'none';
  
    //Checking if the search bar is empty
    if (data.trim() == '') {
      return false;
    }

    // Encoding the data as query parameters
    const queryParams = new URLSearchParams({ 'data': data });

    try{
    // Constructing the full URLs with query parameters
    const url1 = `/process1?${queryParams.toString()}`;

    const url2 = `/process2?${queryParams.toString()}`;

    const url3 = `/process3?${queryParams.toString()}`;

    const url4 = `/process4?${queryParams.toString()}`; 

    const url5 = `/process5?${queryParams.toString()}`; 

   

    await fetch(url1)
        .then(response => response.json())
        .then(data1=> {

          if (typeof data1 === 'object' && Object.keys(data1).length === 0) {
            error.textContent = 'Error : No record has been found, please enter valid symbol';
            error.style.display = 'block';
            return false;
          }     
          showTabs();

            const txt = `${JSON.stringify(data1, null, 2)}`
            const txt1=JSON.parse(txt)
            
            document.getElementById("company").innerHTML = `<div><img class="logo" src='${txt1.logo}'></div><div class='company'><div class="column1">
            <p class="ctags">Company Name </p><p class="ctags">Stock Ticker Symbol</p><p class="ctags">Stock Exchange Code</p><p class="ctags">Company Start Date</p>
            <p class="ctags">Category</p></div><div class="column2"><p class="companyvalues">`+txt1.name+`</p><p class="companyvalues">`+ txt1.ticker+`</p>
            <p class="companyvalues">`+ txt1.exchange+`</p><p class="companyvalues">`+txt1.ipo+`</p><p class="companyvalues">`+txt1.finnhubIndustry+`</p></div></div>`

            return data1;
        })
        await fetch(url2)
        .then(response => response.json())
        .then(data2 => {

            const txt_2 = `${JSON.stringify(data2, null, 2)}`
            const txt2=JSON.parse(txt_2)

            var arrow1;
            var arrow2;
            if (txt2.d>=0){
                arrow1='../static/img/GreenArrowUp.png';
            }
            else{
                arrow1='../static/img/RedArrowDown.png';
            }

            if (txt2.d>=0){
              arrow2='../static/img/GreenArrowUp.png';
          }
          else{
              arrow2='../static/img/RedArrowDown.png';
          }

            const unixTimeSeconds = txt2.t;
            const unixTimeMilliseconds = unixTimeSeconds * 1000;
            const date = new Date(unixTimeMilliseconds);
            const year = date.getFullYear();
            const monthNumber = date.getMonth();
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = monthNames[monthNumber];
            const day = date.getDate();
            const formattedDate = `${day} ${month}, ${year}`;

            let name=data.toUpperCase();
            document.getElementById("stock").innerHTML = `<div class='stocksummary'><div class="scolumn1"><p class="stags">Stock Ticker Symbol </p>
            <p class="stags">Trading Day </p><p class="stags">Previous Closing Price </p><p class="stags">Opening Price </p><p class="stags">High Price</p><p class="stags">Low Price</p><p class="stags">Change</p><p class="stags">Change Percent</p>
            </div><div class="scolumn2"><p class="svalues">`+name+`</p><p class="svalues">`+formattedDate+`</p><p class="svalues">`+txt2.pc+`</p>
            <p class="svalues">`+txt2.o+`</p><p class="svalues">`+txt2.h+`</p><p class="svalues">`+txt2.l+`</p><p class="svalues">`+txt2.d+`<img class="arrow" src=`+arrow1+`></p><p class="svalues">`+txt2.dp+`<img class="arrow" src=`+arrow2+`></p></div></div>`

        })

        await fetch(url3)
        .then(response => response.json())
       .then(data3 => {

        if (typeof data3 === 'object' && Object.keys(data3).length === 0) {
          error.textContent = 'Error : No record has been found, please enter valid symbol';
          error.style.display = 'block';
          return false;
        }
 
            const txt_3 = `${JSON.stringify(data3, null, 2)}`
            const txt3=JSON.parse(txt_3)
            document.getElementById("strongs").innerHTML = txt3[0].strongSell;
            document.getElementById("sell").innerHTML = txt3[0].sell;
            document.getElementById("hold").innerHTML = txt3[0].hold;
            document.getElementById("buy").innerHTML = txt3[0].buy;
            document.getElementById("strongb").innerHTML = txt3[0].strongBuy;

        })

        await fetch(url4)
             .then(response => response.json())
             .then(data4=> {

              if (typeof data4 === 'object' && Object.keys(data4).length === 0) {
                error.textContent = 'Error : No record has been found, please enter valid symbol';
                error.style.display = 'block';
              
              }

                else{
                 const dataArr1 = [];
                 for (let i = 0; i < data4.results.length; i++){
                   dataArr1.push([data4.results[i].t, data4.results[i].c])
                 }

                 const dataArr2  = [];
                 for (let i = 0; i < data4.results.length; i++){
                   dataArr2.push([data4.results[i].t, data4.results[i].v])
                 }

  const d = new Date();

  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year= d.getFullYear();
  let currentDate = `${year}-${month}-${day}`;               

    const  volume = [],
    dataLength = data4.length,

    groupingUnits = [[
        'week',                        
        [1]                             
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]];

for (let i = 0; i < dataLength; i += 1) {


    volume.push([
        data4[i][0], // the date
        data4[i][5] // the volume
    ]);
}

  // create the chart
   Highcharts.stockChart('charts', {



    title: {
        text: 'Stock Price '+`${data4.ticker} `+`${currentDate}`
    },

    subtitle: {
        text: '<a href="https://polygon.io" style="color:blue">Source: Polygon.io</a>'
    },

    xAxis: {
        gapGridLineWidth: 0
    },

    yAxis: [{
      opposite:false,
      tickAmount:6,
    title: {
        text: 'Stock Price',
        margin: 30
    },
    }, {
      alignedTicks:true,
      opposite:true,
      tickAmount:6,
      tickInterval:60000000,
    title: {
        text: 'Volume',
        margin: 30
    },
    
    }],

    rangeSelector: {
        buttons: [{
            type: 'day',
            count: 7,
            text: '7d'
        }, {
            type: 'day',
            count: 15,
            text: '15d'
        },  {
            type: 'month',
            count: 1,
            text: '1m'
        },  {
            type: 'month',
            count: 3,
            text: '3m'
        }, {
            type: 'month',
            count: 6,
            text: '6m'
        }],
        selected: 4,
        inputEnabled: false
    },

    plotOptions:{
      series:{
        pointWidth:5
      }
    },
    series: [{
        name: `Stock Price`,
        type: 'area',
        data: dataArr1,
        gapSize: 5,
        yAxis:0,
        tooltip: {
            valueDecimals: 2
        },
        fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
        },
        threshold: null
    },
    {
      type:'column',
      name: 'Volume',
      data: dataArr2,
      yAxis:1,
      color: '#000000'
    }
  ]
});
                }
             })
            
        await fetch(url5)
        .then(response => response.json())
        .then(data5 => {

          if (typeof data5 === 'object' && Object.keys(data5).length === 0) {
            error.textContent = 'Error : No record has been found, please enter valid symbol';
            error.style.display = 'block';
            return false;
          }
     
            document.getElementById("latestnews").innerHTML=null;

            let j=0
            let c=1
            while (c<=5 ){  

              if(data5[j].image.length!=0){
            const unixTimeSeconds = data5[j].datetime; 
            const unixTimeMilliseconds = unixTimeSeconds * 1000;
            const date = new Date(unixTimeMilliseconds);
            const year = date.getFullYear();
            const monthNumber = date.getMonth();
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = monthNames[monthNumber];
            const day = date.getDate();
            const formattedDate = `${day} ${month}, ${year}`;

              document.getElementById("latestnews").innerHTML += `<section class="section"><div><img class="nimage" src='${data5[j].image}'></div><div><div class="nheadline">
              `+data5[j].headline+`</div><div class="ndate">`+formattedDate+`</div><div><a class="nurl" target="_blank" href='${data5[j].url}'>
              See Original Post</a></div></div></section>` 
             j=j+1;
             c=c+1;
            }
            else{
              j=j+1;
            }
          }
           
        }) 
       
      } 
      catch(error) {
            console.error('Error:', error);
        };

}

function showTabs() {
  
  const tabs = document.getElementsByClassName('tab');
  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'block'; 
  }

  document.getElementById("company").style.display = "block";

  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  tablinks[0].className += " active";
}

  
  function closebuttons() {

    document.getElementById('search').reset();

    document.getElementById('company').style.display = 'none';
    document.getElementById('stocksummary').style.display = 'none';
    document.getElementById('charts').style.display = 'none';
    document.getElementById('latestnews').style.display = 'none';
  
  document.getElementById('error').textContent = '';
  error.style.display = 'none';

  const tabs = document.getElementsByClassName('tab');
  for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = 'none';
  }

  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }
  
}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function clear() {
  document.getElementById('search').reset();
  
  const error = document.getElementById('error');
  if (error) {
      error.textContent = '';
  }
}