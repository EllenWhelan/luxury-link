import React, { Component } from "react";
import PropTypes from 'prop-types';
import emailjs from 'emailjs-com';
import "./App.css";

class App extends Component{
  constructor(){
    {
      super();
      this.state = {
        startDate: new Date(),
        startTime: new Date(),
        filters: [],
        pub_filters: "",
        pub_category: "No category",
        bookingId: "",
        bookingInfo: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.sendEmail = this.sendEmail.bind(this);
    }
  }

//function to handle submit button click 
async handleClick(e){
  this.sendEmail(e, this.state.bookingId, this.state.bookingInfo, this.state.date,
    this.state.startTime, this.state.endTime, this.state.pub_category);

}

//handles change of filter checkboxes and drop downs 
async handleChange(event){
  const { name, value, type} = event.target;
  console.log(name);
  if (type === "checkbox") {
    if (this.state.filters.includes(value)) {
      this.state.filters = this.state.filters.filter(f => f !== value);
    } else {
      this.state.filters.push(value);
    }

    this.setState(
      {
        pub_filters: this.state.filters.join(", ")
      },
      () => this.updateBookingInfo()
    );
  }
  if (type === "select-one") {
    this.setState(
      {
        pub_category: event.target.value
      },
      () => this.updateBookingInfo()
    );
  }
  if (type === "date"){
    this.setState(
      {
        date : event.target.value
      }
    );
  }
  if (type === "time"){
    if (name === "startTime"){
      this.setState(
        {
          startTime : event.target.value
        }
      );
    }
    if (name === "endTime"){
      this.setState(
        {
          endTime : event.target.value
        }
      );
    }
  }
  if (type === "text") {
    if (name === "bookingId"){
      this.setState(
        {
          bookingId : event.target.value
        }
      );
    }
    console.log("Booking ID : " + this.state.bookingId);
    console.log("Date : " + this.state.date);
    console.log("Time : " + this.state.time);
  };

}

//funtion to keep track of booking info 
updateBookingInfo() {
  if (this.state.pub_category.length !== 0)
  this.bookingInfo += `${this.state.pub_category}`;
  this.bookingInfo = this.state.filters.toString();
  this.bookingInfo = this.bookingInfo.replace(/,/g, '<br/>');
  this.bookingInfo = this.bookingInfo.replace(/_/g, ' ');
  this.setState({
    bookingInfo: this.bookingInfo
  });
}


//function that uses email js to send email 
async sendEmail(e){
  e.preventDefault();
  //print outs to ensure email is succesfully sent 
  console.log(process.env.REACT_APP_SERVICE_ID);
  console.log(process.env.REACT_APP_TEMPLATE_ID);
  console.log(process.env.REACT_APP_USER_ID);
  console.log(process.env.REACT_APP_EMAILJS_RECEIVER);

  //gathers parameters for email 
  var receiverEmail = process.env.REACT_APP_EMAILJS_RECEIVER;
  var senderEmail = process.env.REACT_APP_EMAILJS_SENDER;
  var templateId = process.env.REACT_APP_TEMPLATE_ID;
  var userId = process.env.REACT_APP_USER_ID;
  var serviceId = process.env.REACT_APP_SERVICE_ID;
  var bookingId = this.state.bookingId;
  var startTime = this.state.startTime;
  var endTime = this.state.endTime;
  var date = this.state.date;
  var category = this.state.pub_category.replace(/_/g, ' ');
  var filters = this.state.bookingInfo;

  let templateParams = {
    from_name: senderEmail,
    to_name: receiverEmail,
    bookingId: bookingId,
    startTime: startTime,
    endTime: endTime,
    date: date,
    category: category,
    filters: filters
  }

  emailjs.send(process.env.REACT_APP_SERVICE_ID,process.env.REACT_APP_TEMPLATE_ID,templateParams,process.env.REACT_APP_USER_ID)
  .then((result) => {
    console.log(result.text);
  }, (error) => {

    console.log(error.text);
  });
}

//form for childminder requirements 
render() {
  return (
    <div>
      <form>
        <h1>
          <img className = "logo"  alt = "logo" src={"logo192.png"}  width = "220" height = "80"/>
        </h1>
        <text className = "title">Book a Minder</text>
        <h2 className = "press"></h2>
        <div className='parent'>
        <div className='child'>
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="new_borns"
                onChange={this.handleChange}
                />{" "}
                New borns
              </label>

              <br />
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="non_smoker"
                onChange={this.handleChange}
                />{" "}
                Non smoker
              </label>
          
              <br />
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="first_aid"
                onChange={this.handleChange}
                />{" "}
                First aid
              </label>

              <br />
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="own_transport"
                onChange={this.handleChange}
                />{" "}
                Own Transport
              </label>

              <br />
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="qualifications"
                onChange={this.handleChange}
                />{" "}
                Qualifications
              </label>

              <br />
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="overnights"
                onChange={this.handleChange}
                />{" "}
                Overnights
              </label>

              <br />
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="evenings"
                onChange={this.handleChange}
                />{" "}
                Evenings
              </label>

              <br />
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="mornings"
                onChange={this.handleChange}
                />{" "}
                Mornings
              </label>

              <br />
              <label className='boxes'>
                <input
                type="checkbox"
                name="pub_filters"
                value="all_day"
                onChange={this.handleChange}
                />{" "}
                All day
              </label>
        </div>
       
        <div className='child'>
          <div className='categories'>
                  <label className='others'>Category: </label>
                  <br/>
                  <select
                  value={this.state.pub_category}
                  defaultValue={{ label: "Select Dept", value: 0 }}
                  onChange={this.handleChange}
                  name="pub_category"
                  >
                    <option value="">none</option>
                    <option value="babysitter"> babysitter</option>
                    <option value="babysitter_overnight">babysitter_overnight</option>
                    <option value="nanny">nanny</option>
                    <option value="childminder">childminder</option>
                    <option value="day_care">day_care</option>
                    <option value="maternity_nurse">maternity_nurse</option>
                  </select>

                  <br/>
          </div>
          <div className='bookingNumber'>
                <label className='others'>Booking number:</label>
                <input className='rightInputs'
                type="text"
                name="bookingId"
                value={this.state.value}
                onChange={this.handleChange}
                />

                <br/>
          </div>
          <div className='dates'>      
                <label className='others'> Date for Childcare: </label>
                <input className='rightInputs'
                type="date"
                name="date"
                value={this.state.value}
                onChange={this.handleChange}
                />
          </div>
          <div className='times'>
                <br/>
                <label className='others'> Start Time</label>
                <br/>
                <input className='rightInputs'
                type="time"
                name="startTime"
                value={this.state.value}
                onChange={this.handleChange}
                />
                <br/>
                
                <label className='others'> End Time:</label>
                  <br/>
                <input 
                className='rightInputs'
                type="time"
                name="endTime"
                value={this.state.value}
                onChange={this.handleChange}
                />
          </div>
        </div>
        
        <button
          className = "submit"
          target="_blank"
          rel="noopener noreferrer"
          onClick = {this.handleClick}
          >
          Submit
        </button>
        </div>
      </form>
      <script type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/emailjs-com@2.4.1/dist/email.min.js">
      </script>
      <script type="text/javascript">
      (function(){
        emailjs.init(process.env.REACT_APP_USER_ID)
      })();
      </script>
    </div>

  );
}
}

App.propTypes = {
env: PropTypes.object.isRequired
};

export default App;
