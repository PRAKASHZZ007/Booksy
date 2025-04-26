import { Component } from "react";
import "./index.css";

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      country: ""
    };
    
    // Bind the methods to the component instance
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    // You can add your form submission logic here
    console.log("Form submitted:", this.state);
    // For example, you might want to call a parent component's method:
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className="user-form">
        <h2>Delivery Address and Contact Info</h2>
        <form onSubmit={this.handleSubmit}>
          <label className="user-details-form-label">Name</label>
          <br />
          <div className="grid-container">
            <input
              className="user-details-form-name-input"
              type="text"
              name="firstName"
              required
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
            <input
              className="user-details-form-name-input"
              type="text"
              name="lastName"
              required
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <label className="user-details-form-label">
            Email
            <br />
            <input
              className="user-details-form-input"
              type="email"
              name="email"
              required
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label className="user-details-form-label">
            Phone Number
            <br />
            <input
              className="user-details-form-input"
              type="tel"
              name="phone"
              required
              placeholder="Phone"
              pattern="[0-9]{10}"
              value={this.state.phone}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label className="user-details-form-label">
            Address
            <br />
            <input
              className="user-details-form-input"
              type="text"
              name="address"
              required
              placeholder="Address"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label className="user-details-form-label">
            Country
            <br />
            <input
              className="user-details-form-input"
              type="text"
              name="country"
              required
              value={this.state.country}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default UserDetailsForm;