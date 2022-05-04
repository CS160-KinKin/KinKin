import React, { Component } from "react";
import { Navigation, Footer } from "../index";
import { getHealth } from "../../util/healthdata";
import "./activity.css";
import {
    VictoryPie,
    VictoryLegend,
    VictoryLabel,
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryStack,
    VictoryArea
} from 'victory';

const sharedAxisStyles = {
    tickLabels: {
        fontSize: 20
    },
    axisLabel: {
        padding: 60,
        fontSize: 20
    }
};

const dailyChartView = "0 0 400 400";
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const navy = "#143F6B";
const red = "#F55353";
const orange = "#FEB139";
const grey = "#EEEEEE";
const currDate = new Date();

const weeklyData = [
    { day: new Date(2020, 3, 1), calories: 300, walked: 3.5, ran: 0, cycled: 0, minutes: 45 },
    { day: new Date(2020, 3, 2), calories: 400, walked: 1, ran: 2, cycled: 3, minutes: 20 },
    { day: new Date(2020, 3, 3), calories: 300, walked: 0, ran: 4, cycled: 3, minutes: 60 },
    { day: new Date(2020, 3, 4), calories: 450, walked: 1, ran: 0, cycled: 3, minutes: 100 },
    { day: new Date(2020, 3, 5), calories: 150, walked: 0.5, ran: 1.5, cycled: 0, minutes: 50 },
    { day: new Date(2020, 3, 6), calories: 30, walked: 0, ran: 0, cycled: 2, minutes: 60 },
    { day: new Date(2020, 3, 7), calories: 170, walked: 2, ran: 2, cycled: 1, minutes: 70 },
];

const monthlyData = [
    { day: new Date(2020, 3, 1), calories: 300, walked: 3.5, ran: 1, cycled: 0, minutes: 45 },
    { day: new Date(2020, 3, 2), calories: 400, walked: 1, ran: 2, cycled: 3, minutes: 50 },
    { day: new Date(2020, 3, 3), calories: 300, walked: 3, ran: 4, cycled: 3, minutes: 60 },
    { day: new Date(2020, 3, 4), calories: 450, walked: 1, ran: 0.5, cycled: 0, minutes: 100 },
    { day: new Date(2020, 3, 5), calories: 150, walked: 0.5, ran: 1.5, cycled: 0, minutes: 80 },
    { day: new Date(2020, 3, 6), calories: 30, walked: 0.75, ran: 0.5, cycled: 0, minutes: 70 },
    { day: new Date(2020, 3, 7), calories: 170, walked: 2, ran: 2, cycled: 1, minutes: 70 },
    { day: new Date(2020, 3, 8), calories: 300, walked: 3.5, ran: 0.75, cycled: 2, minutes: 65 },
    { day: new Date(2020, 3, 9), calories: 400, walked: 1, ran: 2, cycled: 3, minutes: 30 },
    { day: new Date(2020, 3, 10), calories: 300, walked: 0.75, ran: 4, cycled: 3, minutes: 30 },
    { day: new Date(2020, 3, 11), calories: 450, walked: 1, ran: 0.75, cycled: 3, minutes: 40 },
    { day: new Date(2020, 3, 12), calories: 150, walked: 0.5, ran: 1.5, cycled: 4, minutes: 45 },
    { day: new Date(2020, 3, 13), calories: 30, walked: 0.75, ran: 0.5, cycled: 2, minutes: 50 },
    { day: new Date(2020, 3, 14), calories: 170, walked: 2, ran: 2, cycled: 1, minutes: 70 },
    { day: new Date(2020, 3, 15), calories: 300, walked: 3.5, ran: 0.75, cycled: 1, minutes: 85 },
    { day: new Date(2020, 3, 16), calories: 400, walked: 1, ran: 2, cycled: 3, minutes: 60 },
    { day: new Date(2020, 3, 17), calories: 300, walked: 0.75, ran: 4, cycled: 3, minutes: 15 },
    { day: new Date(2020, 3, 18), calories: 450, walked: 1, ran: 3, cycled: 3, minutes: 15 },
    { day: new Date(2020, 3, 19), calories: 150, walked: 0.5, ran: 1.5, cycled: 0.5, minutes: 50 },
    { day: new Date(2020, 3, 20), calories: 30, walked: 0.75, ran: 1, cycled: 2, minutes: 60 },
    { day: new Date(2020, 3, 21), calories: 170, walked: 2, ran: 2, cycled: 1, minutes: 70 },
    { day: new Date(2020, 3, 22), calories: 300, walked: 3.5, ran: 0.25, cycled: 0.5, minutes: 35 },
    { day: new Date(2020, 3, 23), calories: 400, walked: 1, ran: 2, cycled: 3, minutes: 20 },
    { day: new Date(2020, 3, 24), calories: 300, walked: 0.5, ran: 4, cycled: 3, minutes: 60 },
    { day: new Date(2020, 3, 25), calories: 450, walked: 1.5, ran: 3.75, cycled: 3, minutes: 100 },
    { day: new Date(2020, 3, 26), calories: 150, walked: 0.5, ran: 1.5, cycled: 1.5, minutes: 80 },
    { day: new Date(2020, 3, 27), calories: 30, walked: 3, ran: 2, cycled: 2, minutes: 60 },
    { day: new Date(2020, 3, 28), calories: 170, walked: 2, ran: 2, cycled: 1, minutes: 70 },
    { day: new Date(2020, 3, 29), calories: 300, walked: 3.5, ran: 1, cycled: 0.5, minutes: 45 },
    { day: new Date(2020, 3, 30), calories: 400, walked: 1, ran: 2, cycled: 3, minutes: 20 }
];

// calories burned daily
const CaloriesDaily = (props) => (
    <svg viewBox={dailyChartView}>
        <text x={175} y={175} fontSize="18" textAnchor="middle" >
            {props.burned} calories burned
        </text>
        <text x={175} y={190} fontSize="14" textAnchor="middle" >
            Your goal is {props.goal} calories
        </text>
        <VictoryPie
            standalone={false}
            innerRadius={90}
            labelComponent={<span />}
            width={350} height={350}
            data={[props.burned, props.goal - props.burned]}
            colorScale={[navy, grey]}
        />
    </svg>
);

// distance walked/ran/cycled
const DistanceDaily = (props) => (
    <svg viewBox={dailyChartView}>
        <text x={175} y={175} fontSize="18" textAnchor="middle" >
            {props.walked + props.ran + props.cycled} miles today
        </text>
        <text x={175} y={190} fontSize="14" textAnchor="middle" >
            Your goal is {props.goal} miles
        </text>
        <VictoryPie
            standalone={false}
            innerRadius={90}
            labelComponent={<span />}
            width={350} height={350}
            data={[
                { x: "Walked", y: props.walked },
                { x: "Ran", y: props.ran },
                { x: "Cycled", y: props.cycled },
                { x: "", y: props.goal - props.walked - props.ran - props.cycled }
            ]}
            colorScale={[navy, red, orange, grey]}
        />
        <VictoryLegend x={65} y={320}
            standalone={false}
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" } }}
            colorScale={[navy, red, orange]}
            data={[
                { name: "Walked" }, { name: "Ran" }, { name: "Cycled" }
            ]}
        />
    </svg>
);

// minutes spent working out daily
const MinutesDaily = (props) => (
    <svg viewBox={dailyChartView}>
        <text x={175} y={175} fontSize="18" textAnchor="middle" >
            {props.minutes} minutes today
        </text>
        <text x={175} y={190} fontSize="14" textAnchor="middle" >
            Your goal is {props.goal} minutes
        </text>
        <VictoryPie
            standalone={false}
            innerRadius={90}
            labelComponent={<span />}
            width={350} height={350}
            data={[props.minutes, props.goal - props.minutes]}
            colorScale={[navy, grey]}
        />
    </svg>
);

const CaloriesWeekly = (props) => (
    <VictoryChart scale={{ x: "time" }}
        domainPadding={30}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={650} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Calories in the last week"
        />
        <VictoryBar
            barRatio={0.7}
            style={{
                data: { fill: navy },
            }}
            data={props.data}
            x="day"
            y="calories"
        />
        <VictoryAxis
            tickCount={7}
            tickFormat={date => days[date.getDay()]}
            style={sharedAxisStyles}
        />
        <VictoryAxis
            dependentAxis
            label="Calories Burned"
            style={sharedAxisStyles}
        />
    </VictoryChart>
);

const DistanceWeekly = (props) => (
    <VictoryChart scale={{ x: "time" }}
        domainPadding={30}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={650} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Distance in the last week"
        />
        <VictoryStack offset={20}
        >
            <VictoryBar
                barRatio={0.7}
                style={{
                    data: { fill: navy },
                }}
                data={props.data}
                x="day"
                y="walked"
            />
            <VictoryBar
                barRatio={0.7}
                style={{
                    data: { fill: red },
                }}
                data={props.data}
                x="day"
                y="ran"
            />
            <VictoryBar
                barRatio={0.7}
                style={{
                    data: { fill: orange },
                }}
                data={props.data}
                x="day"
                y="cycled"
            />
            <VictoryAxis
                tickCount={7}
                tickFormat={date => days[date.getDay()]}
                style={sharedAxisStyles}
            />
            <VictoryAxis
                dependentAxis
                label="Distance in miles"
                style={sharedAxisStyles}
            />
        </VictoryStack>
        <VictoryLegend x={270} y={60}
            standalone={false}
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" } }}
            colorScale={[navy, red, orange]}
            data={[
                { name: "Walked" }, { name: "Ran" }, { name: "Cycled" }
            ]}
        />
    </VictoryChart>
);

const MinutesWeekly = (props) => (
    <VictoryChart scale={{ x: "time" }}
        domainPadding={30}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={650} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Minutes in the last week"
        />
        <VictoryBar
            barRatio={0.7}
            style={{
                data: { fill: navy },
            }}
            data={props.data}
            x="day"
            y="minutes"
        />
        <VictoryAxis
            tickCount={7}
            tickFormat={date => days[date.getDay()]}
            style={sharedAxisStyles}
        />
        <VictoryAxis
            dependentAxis
            label="Minutes Exercised"
            style={sharedAxisStyles}
        />
    </VictoryChart>
);

const CaloriesMonthly = (props) => (
    <VictoryChart scale={{ x: "time" }}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={1000} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Calories in the last month"
        />
        <VictoryArea
            style={{
                data: { fill: navy },
            }}
            data={props.data}
            x="day"
            y="calories"
        />
        <VictoryAxis
            tickCount={31}
            tickFormat={date => date.getDate()}
            style={sharedAxisStyles}
        />
        <VictoryAxis
            dependentAxis
            label="Calories Burned"
            style={sharedAxisStyles}
        />
    </VictoryChart>
);

const DistanceMonthly = (props) => (
    <VictoryChart scale={{ x: "time" }}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={1000} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Distance in the last month"
        />
        <VictoryStack offset={20}
        >
            <VictoryArea
                style={{
                    data: { fill: navy },
                }}
                data={props.data}
                x="day"
                y="walked"
            />
            <VictoryArea
                style={{
                    data: { fill: red },
                }}
                data={props.data}
                x="day"
                y="ran"
            />
            <VictoryArea
                style={{
                    data: { fill: orange },
                }}
                data={props.data}
                x="day"
                y="cycled"
            />
            <VictoryAxis
                tickCount={31}
                tickFormat={date => date.getDate()}
                style={sharedAxisStyles}
            />
            <VictoryAxis
                dependentAxis
                label="Distance in miles"
                style={sharedAxisStyles}
            />
        </VictoryStack>
        <VictoryLegend x={270} y={60}
            standalone={false}
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" } }}
            colorScale={[navy, red, orange]}
            data={[
                { name: "Walked" }, { name: "Ran" }, { name: "Cycled" }
            ]}
        />
    </VictoryChart>
);

const MinutesMonthly = (props) => (
    <VictoryChart scale={{ x: "time" }}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={1000} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Minutes in the last month"
        />
        <VictoryArea
            style={{
                data: { fill: navy },
            }}
            data={props.data}
            x="day"
            y="minutes"
        />
        <VictoryAxis
            tickCount={31}
            tickFormat={date => date.getDate()}
            style={sharedAxisStyles}
        />
        <VictoryAxis
            dependentAxis
            label="Minutes Exercised"
            style={sharedAxisStyles}
        />
    </VictoryChart>
);

export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.getHealthData = this.getHealthData.bind(this);

        this.state = {
            todaysData: [],
            weeklyData: [],
            monthlyData: [],
        }
    }

    componentDidMount() {
        if (this.props.user.token) this.getHealthData();
    }

    async getHealthData() {
        try {
            // let weekAgoMS = Date.now()-604800000; // 7 days ago
            // let monthAgoMS = Date.now()-2592000000; // 30 days ago
            // console.log(todaysData);
            const data = await getHealth(this.props.user.token);
            console.log( data );
            this.setState({ healthData: data });
        } catch (err) {
            console.error(err.message);
        }
    }

    // will need to create a flexbox to align the charts
    render() {
        return (
            <>
                <Navigation {...this.props} />
                <div className="row content">
                    <div className="container">
                        <div className="pie">
                            <CaloriesDaily
                                burned={250}
                                goal={1000}
                            />
                        </div>
                        <div className="pie">
                            <DistanceDaily
                                walked={350}
                                ran={100}
                                cycled={200}
                                goal={1000}
                            />
                        </div>
                        <div className="pie">
                            <MinutesDaily
                                minutes={45}
                                goal={75}
                            />
                        </div>
                    </div>
                    <div>
                        <CaloriesWeekly
                            startDate="3/1"
                            endDate="3/7"
                            data={weeklyData}
                        />
                    </div>
                    <div>
                        <DistanceWeekly
                            startDate="3/1"
                            endDate="3/7"
                            data={weeklyData}
                        />
                    </div>
                    <div>
                        <MinutesWeekly
                            startDate="3/1"
                            endDate="3/7"
                            data={weeklyData}
                        />
                    </div>
                    <div>
                        <CaloriesMonthly
                            startDate="3/1"
                            endDate="3/7"
                            data={monthlyData}
                        />
                    </div>
                    <div>
                        <DistanceMonthly
                            startDate="3/1"
                            endDate="3/7"
                            data={monthlyData}
                        />
                    </div>
                    <div>
                        <MinutesMonthly
                            startDate="3/1"
                            endDate="3/7"
                            data={monthlyData}
                        />
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}