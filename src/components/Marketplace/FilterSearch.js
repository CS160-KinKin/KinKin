import React, { Component } from "react";
import axios from "axios";

export default class FilterSearch extends Component {
    constructor(porps) {
        super(props);

        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeSpecialties = this.onChangeSpecialties.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            language: "",
            location: "",
            specialties: "",
            rate: 0,
            availability: 0,
        };
    }

    componentDidMount() {
        /*axios
            .get(process.env.REACT_APP_CONTROL_SERVER_URL + "/marketplace/" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    language: response.data.language,
                    location: response.data.location,
                    specialties: response.data.specialties,
                    rate: response.data.rate,
                    availability: response.data.availability,
                });
            })
            .catch(function (error) {
                console.log(error);
            });*/
    }

    onChangeLanguage(e) {
        this.setState({
            language: e.target.value,
        });
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value,
        });
    }

    onChangeSpecialties(e) {
        this.setState({
            specialties: e.target.value,
        });
    }

    onChangeRate(e) {
        this.setState({
            rate: e.target.value,
        });
    }

    onChangeAvailability(e) {
        this.setState({
            availability: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const task = {
            language: this.state.language,
            location: this.state.location,
            specialties: this.state.specialties,
            rate: this.state.rate,
            availability: this.state.availability,
        };

        console.log(task);
        /*axios
            .post(process.env.REACT_APP_CONTROL_SERVER_URL + "/marketplace/filter", task)
            .then((res) => console.log(res.data));*/

        window.location = "/marketplace";
    }

    render() {
        return (
            <div>
                <h4>PT Search Filters</h4>
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label>Language: </label>
                        <select
                            ref="userInput"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        ></select>
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.client}
                            onChange={this.onChangeClient}
                        />
                    </div>
                    <div className="form-group">
                        <label>Specialties: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Rate: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Available days/week</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="PT search filter log"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}