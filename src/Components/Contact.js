import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

const Contact = (props) => {
   // SnackBar State and functions
   const [snackBarState, setState] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
      snackMessage: ''
   });

   const { vertical, horizontal, open, snackMessage } = snackBarState;

   const handleClick = (newState) => {
      console.log("2021");
      setState({ open: true, ...newState });
   };

   const handleClose = () => {
      setState({ ...snackBarState, open: false });
   };
   // State for submit loader
   const [loader, setLoader] = useState('none');
   // end
   // FormData State, other variables and Submit Form Method
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: '',
   });
   if (props.data) {
      var name = props.data.name;
      var street = props.data.address.street;
      var city = props.data.address.city;
      var state = props.data.address.state;
      var zip = props.data.address.zip;
      var phone = props.data.phone;
      var email = props.data.email;
      var message = props.data.contactmessage;
   }
   const handleChange = (event) => {
      console.log("Clicked");
      const { value, name } = event.target;
      setFormData((prevValue) => {
         return {
            ...prevValue,
            [name]: value
         }
      })
   }
   const onSubmit = (event) => {
      setLoader((prevValue) => {
         return 'inline';
      })
      event.preventDefault();
      setFormData({
         name: '',
         email: '',
         phone: '',
         message: '',
      })
      console.log("Form Submitted", formData);
      axios.post(`https://portfolio-node-webapp.herokuapp.com/contact`, formData)
        .then(res => {
         setLoader((prevValue) => {
            return 'none';
         })
         handleClick({ vertical: 'bottom', horizontal: 'right', snackMessage: `Thank you for your Message! I will get back to you as soon as possible`  });
         console.log("ressss", res);
        })
        .catch(error => {
         setLoader((prevValue) => {
            return 'none';
         })
          console.error('There was an error !', error.message, "sdfasdfasdf");
          handleClick({ vertical: 'bottom', horizontal: 'right', snackMessage: 'Sorry, Please check you input once again.' });
        });
   }
   return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

               <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form onSubmit={onSubmit} id="contactForm" name="contactForm">
                  <fieldset>

                     <div>
                        <label htmlFor="contactName">Name <span className="required">*</span></label>
                        <input value={formData.name} type="text" size="35" id="contactName" name="name" onChange={handleChange} />
                     </div>

                     <div>
                        <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                        <input value={formData.email} type="text" size="35" id="contactEmail" name="email" onChange={handleChange} />
                     </div>
                     <div>
                        <label htmlFor="contactPhone">Phone <span className="required">*</span></label>
                        <input value={formData.phone} type="number" size="35" id="contactPhone" name="phone" placeholder="Enter 10 digit mobile no." onChange={handleChange} />                        
                     </div>
                     {/* <div>
                        <label htmlFor="contactSubject">Subject</label>
                        <input value={formData.subject} type="text" size="35" id="contactSubject" name="subject" onChange={handleChange} />
                     </div> */}

                     <div>
                        <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                        <textarea value={formData.message} cols="50" rows="15" id="contactMessage" name="message" onChange={handleChange}></textarea>
                     </div>

                     <div>
                        <button type="submit" className="submit">Submit</button>
                        <span id="image-loader" style={{ display: loader }}>
                           <img alt="" src="images/loader.gif" />
                        </span>
                     </div>
                  </fieldset>
               </form>
               <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  message={snackMessage}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  key={vertical + horizontal}>

               </Snackbar>

               <div id="message-warning"> Error boy</div>
               <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
               </div>
            </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

                  <h4>Address and Phone</h4>
                  <p className="address">
                     {name}<br />
                     {street} <br />
                     {city}, {state} {zip}<br />
                     {/* <span>{phone}</span> */}
                  </p>
               </div>

               {/* <div className="widget widget_tweets">
                  <h4 className="widget-title">Latest Tweets</h4>
                  <ul id="twitter">
                     <li>
                        <span>
                           Lorem IPSUM Test tweet 1
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">2 Days Ago</a></b>
                     </li>
                     <li>
                        <span>Lorem IPSUM Test tweet 2
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">3 Days Ago</a></b>
                     </li>
                  </ul>
               </div> */}
            </aside>
         </div>
      </section>
   );
}

export default Contact;
