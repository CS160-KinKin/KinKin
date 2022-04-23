import React, { Component } from "react";
//import Select from 'react-select';
import { getClient } from '../../util/client';

export default class FilterSearch extends Component {
    constructor(props) {
        super(props);

        // Setting up functions
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        //this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeMaxDistance = this.onChangeMaxDistance.bind(this);
        this.onChangeSpecialty = this.onChangeSpecialty.bind(this);
        this.onChangeMinRate = this.onChangeMinRate.bind(this);
        this.onChangeMaxRate = this.onChangeMaxRate.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            language: null,
            location: null,
            maxDistance: null,
            specialty: null,
            minRate: null,
            maxRate: null,
            availability: [],
        };
    }

    async componentDidMount() {
        const client = await getClient(this.props.user.token);
        this.setState({ location: client.location });
    }

    onChangeLanguage(e) {
        this.setState({
            language: e.target.value,
        });
    }

    /*onChangeLocation(e) {
        this.setState({
            location: e.target.value,
        });
    }*/

    onChangeMaxDistance(e) {
        this.setState({
            maxDistance: e.target.value,
        });
    }

    onChangeSpecialty(e) {
        this.setState({
            specialty: e.target.value,
        });
    }

    onChangeMinRate(e) {
        this.setState({
            minRate: e.target.value,
        });
    }

    onChangeMaxRate(e) {
        this.setState({
            maxRate: e.target.value,
        });
    }

    onChangeAvailability(e) {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        this.setState({
            availability: value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.getMarketplace({
            language: this.state.language,
            location: this.state.location,
            maxDistance: this.state.maxDistance,
            specialty: this.state.specialty,
            minRate: this.state.minRate,
            maxRate: this.state.maxRate,
            availability: this.state.availability,
        });
    }

    render() {
        return (
            <>
                <h4>PT Search Filters</h4>
                <form onSubmit={this.onSubmit}>
                    <label>Select a language:
                        <select value={this.state.language} onChange={this.onChangeLanguage} >
                            <option value="english" selected>English</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                            <option value="japanese">Japanese</option>
                            <option value="mandarin">Mandarin</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </label>
                    <br />
                    <label>Maximum Distance (m):
                        <input
                            type="number"
                            value={this.state.maxDistance}
                            onChange={this.onChangeMaxDistance}
                        />
                    </label>
                    <br />
                    <label>Specialty:
                        <input
                            type="text"
                            value={this.state.specialty}
                            onChange={this.onChangeSpecialty}
                        />
                    </label>
                    <br />
                    <label>Minimum Rate ($):
                        <input
                            type="number"
                            value={this.state.minRate}
                            onChange={this.onChangeMinRate}
                        />
                    </label>
                    <br />
                    <label>Maximum Rate ($):
                        <input
                            type="number"
                            value={this.state.maxRate}
                            onChange={this.onChangeMaxRate}
                        />
                    </label>
                    <br />
                    <label>Select available days:
                        <select value={this.state.availability} onChange={this.onChangeAvailability} >
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tueday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </select>
                    </label>
                    <br />
                    <input
                        type="submit"
                        value="Search PTs"
                    />
                </form>
            </>
        );
    }
}