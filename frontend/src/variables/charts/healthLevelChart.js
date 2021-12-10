const statusChart = {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    enabled: false
                }
            }
        }]
    },
    title: {
        text: 'Health Level'
    },
    series: [{
        data: [1, 2, 3]
    }]
}

export default statusChart;
