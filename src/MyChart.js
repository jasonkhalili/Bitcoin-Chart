import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';


const MyChart = (props) => {
    const [data, setData] = useState({});

    useEffect(() => {
        setData(
            {
                labels: Object.keys(props.bpi),
                datasets: [
                    {
                        label: 'BTC/USD',
                        data: Object.values(props.bpi),
                        borderColor: "#5569FF",
                        backgroundColor: "#5569FF",
                    }
                ]
            }
        ) 
    }, [props])

    if (!(Object.keys(props.bpi).length === 0)) {
        return (
            <Line data={data || null} />
        );
    } else {
        return (
            <h1>didn't work fam</h1>
        );
    }
}

export default MyChart;