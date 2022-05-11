import React, { Component } from "react";
import { Navigation, Footer } from "../index";
import { getWeeklyHealth, getMonthlyHealth, getDailyHealth } from "../../util/healthdata";
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

const CaloriesWeekly = (props) => {

    return (
        <VictoryChart scale={{ x: "time" }}
            domainPadding={30}
            padding={{ top: 50, bottom: 50, left: 100, right: 50 }}
            width={650} height={450}
        >
            <VictoryLabel
                x={300}
                y={10}
                style={[{ fontSize: 30 }]}
                textAnchor="middle"
                text="Calories in the last 7 days"
            />
            <VictoryBar
                barRatio={0.7}
                style={{
                    data: { fill: navy },
                }}
                data={props.data}
                x="date"
                y="calories"
            />
            <VictoryAxis
                tickCount={props.data.length}
                tickFormat={date => days[(new Date(date)).getDay()]}
                style={sharedAxisStyles}
            />
            <VictoryAxis
                dependentAxis
                label="Calories Burned"
                style={sharedAxisStyles}
            />
        </VictoryChart>
    );
};

const DistanceWeekly = (props) => (
    <VictoryChart scale={{ x: "time" }}
        domainPadding={30}
        padding={{ top: 50, bottom: 50, left: 100, right: 50 }}
        width={650} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Distance in the last 7 days"
        />
        <VictoryStack offset={20}
        >
            <VictoryBar
                barRatio={0.7}
                style={{
                    data: { fill: navy },
                }}
                data={props.data}
                x="date"
                y="distanceWalked"
            />
            <VictoryBar
                barRatio={0.7}
                style={{
                    data: { fill: red },
                }}
                data={props.data}
                x="date"
                y="distanceRan"
            />
            <VictoryBar
                barRatio={0.7}
                style={{
                    data: { fill: orange },
                }}
                data={props.data}
                x="date"
                y="distanceCycled"
            />

        </VictoryStack>
        <VictoryAxis
            tickCount={props.data.length}
            tickFormat={date => days[(new Date(date)).getDay()]}
            style={sharedAxisStyles}
        />
        <VictoryAxis
            dependentAxis
            label="Distance in miles"
            style={sharedAxisStyles}
        />
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
        padding={{ top: 50, bottom: 50, left: 100, right: 50 }}
        width={650} height={450}
    >
        <VictoryLabel
            x={300}
            y={10}
            style={[{ fontSize: 30 }]}
            textAnchor="middle"
            text="Minutes in the last 7 days"
        />
        <VictoryBar
            barRatio={0.7}
            style={{
                data: { fill: navy },
            }}
            data={props.data}
            x="date"
            y="minutes"
        />
        <VictoryAxis
            tickCount={props.data.length}
            tickFormat={date => days[(new Date(date)).getDay()]}
            style={sharedAxisStyles}
        />
        <VictoryAxis
            dependentAxis
            label="Minutes Exercised"
            style={sharedAxisStyles}
        />
    </VictoryChart>
);

const CaloriesMonthly = (props) => {
    return (
        <VictoryChart scale={{ x: "time" }}
            padding={{ top: 50, bottom: 50, left: 100, right: 10 }}
            width={1000} height={450}
        >
            <VictoryLabel
                x={300}
                y={10}
                style={[{ fontSize: 30 }]}
                textAnchor="middle"
                text="Calories in the last 30 days"
            />
            <VictoryArea
                style={{
                    data: { fill: navy },
                }}
                data={props.data}
                x="date"
                y="calories"
            />
            <VictoryAxis
                tickCount={props.data.length}
                tickFormat={date => (new Date(date)).getDate()}
                style={sharedAxisStyles}
            />
            <VictoryAxis
                dependentAxis
                label="Calories Burned"
                style={sharedAxisStyles}
            />
        </VictoryChart>);
};

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
            text="Distance in the last 30 days"
        />
        <VictoryStack offset={20}
        >
            <VictoryArea
                style={{
                    data: { fill: navy },
                }}
                data={props.data}
                x="date"
                y="distanceWalked"
            />
            <VictoryArea
                style={{
                    data: { fill: red },
                }}
                data={props.data}
                x="date"
                y="distanceRan"
            />
            <VictoryArea
                style={{
                    data: { fill: orange },
                }}
                data={props.data}
                x="date"
                y="distanceCycled"
            />

        </VictoryStack>
        <VictoryAxis
            tickCount={props.data.length}
            tickFormat={date => (new Date(date)).getDate()}
            style={sharedAxisStyles}
        />
        <VictoryAxis
            dependentAxis
            label="Distance in miles"
            style={sharedAxisStyles}
        />
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
            text="Minutes in the last 30 days"
        />
        <VictoryArea
            style={{
                data: { fill: navy },
            }}
            data={props.data}
            x="date"
            y="minutes"
        />
        <VictoryAxis
            tickCount={props.data.length}
            tickFormat={date => (new Date(date)).getDate()}
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
            const dailyData = await getDailyHealth(this.props.user.token);
            const weekData = await getWeeklyHealth(this.props.user.token);
            const monthData = await getMonthlyHealth(this.props.user.token);

            this.setState({ todaysData: dailyData, weeklyData: weekData, monthlyData: monthData });
        } catch (err) {
            console.error(err.message);
        }
    }

    // will need to create a flexbox to align the charts
    render() {
    const index = this.state.todaysData.length - 1

        return (
            <>
                <Navigation {...this.props} />
                <div className="row content">
                    <div className="container">
                        <div className="pie">
                            <CaloriesDaily
                                burned={this.state.todaysData.length > 0 ? this.state.todaysData[index].calories : 0}
                                goal={1000}
                            />
                        </div>
                        <div className="pie">
                            <DistanceDaily
                                walked={this.state.todaysData.length > 0 ? this.state.todaysData[0].distanceWalked : 0}
                                ran={this.state.todaysData.length > 0 ? this.state.todaysData[0].distanceRan : 0}
                                cycled={this.state.todaysData.length > 0 ? this.state.todaysData[0].distanceCycled : 0}
                                goal={15}
                            />
                        </div>
                        <div className="pie">
                            <MinutesDaily
                                minutes={this.state.todaysData.length > 0 ? this.state.todaysData[0].minutes : 0}
                                goal={75}
                            />
                        </div>
                    </div>
                    <div>
                        <CaloriesWeekly
                            data={this.state.weeklyData.length > 0 ? this.state.weeklyData : 0}
                        />
                    </div>
                    <div>
                        <DistanceWeekly
                            data={this.state.weeklyData.length > 0 ? this.state.weeklyData : 0}
                        />
                    </div>
                    <div>
                        <MinutesWeekly
                            data={this.state.weeklyData.length > 0 ? this.state.weeklyData : 0}
                        />
                    </div>
                    <div>
                        <CaloriesMonthly
                            data={this.state.monthlyData.length > 0 ? this.state.monthlyData : 0}
                        />
                    </div>
                    <div>
                        <DistanceMonthly
                            data={this.state.monthlyData.length > 0 ? this.state.monthlyData : 0}
                        />
                    </div>
                    <div>
                        <MinutesMonthly
                            data={this.state.monthlyData.length > 0 ? this.state.monthlyData : 0}
                        />
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}