$(document).ready(function() {

  // alert("Thanks for visiting!");

  let r01 = $.ajax({
    type: 'GET',
    url: 'https://api.vanguard.com/rs/gre/gra/1.7.0/datasets/auw-retail-price-history-mf.jsonp',
    data: 'vars=portId:8146,issueType:S,sDate:2020-04-15,eDate:2060-12-31,as_of:DAILY',
    dataType: 'jsonp',
    success: (data) => {
      $("#output01").html('Total results found for 8146: ' + data.fundPricesBuy.length);
    }
  });

  // 20200121: r02 started breaking when using an eDate of 2061-01-01
  let r02 = $.ajax({
    type: 'GET',
    url: 'https://api.vanguard.com/rs/gre/gra/1.7.0/datasets/auw-retail-price-history-mf.jsonp',
    data: 'vars=portId:8145,issueType:S,sDate:2020-04-15,eDate:2060-12-31,as_of:DAILY',
    dataType: 'jsonp',
    success: (data) => {
      $("#output01b").html('Total results found for 8145: ' + data.fundPricesBuy.length);
    }
  });

  let r03 = $.ajax({
    type: 'GET',
    url: 'https://api.vanguard.com/rs/gre/gra/1.7.0/datasets/auw-retail-price-history-mf.jsonp',
    data: 'vars=portId:8129,issueType:S,sDate:2020-04-15,eDate:2060-12-31,as_of:DAILY',
    dataType: 'jsonp',
    success: function(data) {
      $("#output01c").html('Total results found for 8129: ' + data.fundPricesBuy.length);
    }
  });

  $.when(r01, r02, r03).then((data01, data02, data03) => {


    Plotly.newPlot(document.getElementById("output02a"), [{
        x: data02[0].fundPricesBuy.map((i) => {
          return i.asOfDate;
        }),
        y: data02[0].fundPricesBuy.map((i) => {
          return i.price;
        }),
        name: "8145"
      },
      {
        x: data03[0].fundPricesBuy.map((i) => {
          return i.asOfDate;
        }),
        y: data03[0].fundPricesBuy.map((i) => {
          return i.price;
        }),
        name: "8129"
      }
    ], {
      title: {
        text: 'Unit Prices: 8145 vs 8129',
        xref: 'paper',
        x: 0.05,
      }
    });

    Plotly.newPlot(document.getElementById("output02b"), [{
      x: data01[0].fundPricesBuy.map((i) => {
        return i.asOfDate;
      }),
      y: data01[0].fundPricesBuy.map((i) => {
        return i.price;
      }),
      name: "8146"
    }], {
      title: {
        text: '8146 Unit Price',
        xref: 'paper',
        x: 0.05,
      },
      xaxis: {
        title: {
          text: 'Price',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
      yaxis: {
        title: {
          text: 'Date',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    });

    window.onresize = () => {
      Plotly.Plots.resize(document.getElementById("output02a"));
      Plotly.Plots.resize(document.getElementById("output02b"));
    };
  })
})
