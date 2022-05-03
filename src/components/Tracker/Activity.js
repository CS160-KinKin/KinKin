import React, { Component } from "react";
import { Navigation, Footer } from "../index";
import "./activity.css";
import {
    VictoryPie,
    VictoryLegend,
    VictoryTheme,
    VictoryLabel,
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryStack
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
        domainPadding={10}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={500} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Calories in the last week"
        />
        <VictoryBar
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
        domainPadding={10}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={500} height={450}
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
                style={{
                    data: { fill: navy },
                }}
                data={props.data}
                x="day"
                y="walked"
            />
            <VictoryBar
                style={{
                    data: { fill: red },
                }}
                data={props.data}
                x="day"
                y="ran"
            />
            <VictoryBar
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
        domainPadding={10}
        padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
        width={500} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Minutes in the last week"
        />
        <VictoryBar
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

export default class Activity extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //TODO
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
                            data={[
                                { day: new Date(2020, 3, 1), calories: 300 },
                                { day: new Date(2020, 3, 2), calories: 400 },
                                { day: new Date(2020, 3, 3), calories: 0 },
                                { day: new Date(2020, 3, 4), calories: 150 },
                                { day: new Date(2020, 3, 5), calories: 450 },
                                { day: new Date(2020, 3, 6), calories: 30 },
                                { day: new Date(2020, 3, 7), calories: 170 },
                            ]}
                        />
                    </div>
                    <div>
                        <DistanceWeekly
                            startDate="3/1"
                            endDate="3/7"
                            data={[
                                { day: new Date(2020, 3, 1), walked: 3.5, ran: 0, cycled: 0 },
                                { day: new Date(2020, 3, 2), walked: 1, ran: 2, cycled: 3 },
                                { day: new Date(2020, 3, 3), walked: 0, ran: 4, cycled: 3 },
                                { day: new Date(2020, 3, 4), walked: 1, ran: 0, cycled: 3 },
                                { day: new Date(2020, 3, 5), walked: 0.5, ran: 1.5, cycled: 0 },
                                { day: new Date(2020, 3, 6), walked: 0, ran: 0, cycled: 2 },
                                { day: new Date(2020, 3, 7), walked: 2, ran: 2, cycled: 1 },
                            ]}
                        />
                    </div>
                    <div>
                        <MinutesWeekly
                            startDate="3/1"
                            endDate="3/7"
                            data={[
                                { day: new Date(2020, 3, 1), minutes: 45 },
                                { day: new Date(2020, 3, 2), minutes: 20 },
                                { day: new Date(2020, 3, 3), minutes: 60 },
                                { day: new Date(2020, 3, 4), minutes: 100 },
                                { day: new Date(2020, 3, 5), minutes: 0 },
                                { day: new Date(2020, 3, 6), minutes: 60 },
                                { day: new Date(2020, 3, 7), minutes: 70 },
                            ]}
                        />
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}