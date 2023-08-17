import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler)

export default function LineChart() {
  const labels = []
  const timedata1 = []
  const timedata2 = []
  for (let i = 0; i <= 24; i++) {
    labels[i] = new Date(2023, 0, 1, i, 0, 0)
    timedata1[i] = { x: new Date(2023, 0, 1, i, 0, 0), y: Math.random() * 100 }
    timedata2[i] = { x: new Date(2023, 0, 1, i, 0, 0), y: Math.random() * 100 }
  }

  const options: any = {
    responsive: false,
    scales: {
      x: {
        type: 'time',
        ticks: {
          source: 'labels'
        },
        time: {
          unit: 'hour',
          displayFormats: {
            hour: ['MM/dd HH:mm']
          }
          // tooltipFormat: 'HH:mm'
        }
      },
      y: { beginAtZero: true, suggestedMax: 1, title: { display: true, text: 'sample' } }
    },
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: timedata1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true
      },
      {
        label: 'Dataset 2',
        data: timedata2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true
      }
    ]
  }
  return <Line options={options} data={data} height={400} width={800} />
}
