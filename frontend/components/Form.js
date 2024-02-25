import React, { useEffect, useState } from 'react'
import * as yup from 'yup';

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.

const schema = yup.object().shape({

    fullName: yup.string().min(3, validationErrors.fullNameTooShort).max(20,validationErrors.fullNameTooLong),
    size: yup.string().oneOf(['S','M','L'], validationErrors.sizeIncorrect).required()
})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {
      const [errors, setErrors] = useState({});
      const [submitSuccess,setSubmitSuccess] = useState(false)
      const [submitFailure,setSubmitFailure] = useState(false)
      const [selectedToppings, setSelectedToppings] =useState([])
      const [fullName, setfullName] = useState('');
      const [size, setSize]= useState('');

      const isFormValid = () =>{
        return fullName.length > 3 && fullName.length < 20 && selectedToppings.length > 0 && size !== '';
      }

      const handleSubmit = (e) => {

        e.preventDefault();
       
        schema.validate({fullName: e.target.fullName.value, size: e.target.size.value})
        .then(() => {
           
          setSubmitSuccess(true);
          setSubmitFailure(false);
          setErrors({});
        })
        .catch(err => {
          
          const newErrors = {};
          err.inner.forEach(e => {
            newErrors[e.path]= e.message;
          })

          setErrors(newErrors);
          
          setSubmitSuccess(false);
          setSubmitFailure(true);
        });
      }

      const HandleCheckbox = (e) => {

        const value = e.target.value;
        const ischecked = e.target.checked;

        if(ischecked){
          setSelectedToppings([...selectedToppings,value])
        } else {

          setSelectedToppings(selectedToppings.filter(topping => topping !== value));
        }
      };

      const handleFullNameChange = (e) => {
        setfullName(e.target.value);
      }

      const handleSizeChange = (e) =>{
        setSize(e.target.value);
      };

      

      
     
  return (
    
    <form onSubmit={handleSubmit}>
      
      <h2>Order Your Pizza</h2>
      {submitSuccess && <div className='success'>Thank you for your order!</div>}
      {submitFailure && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" value= {fullName} onChange={handleFullNameChange} />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" value={size} onChange={handleSizeChange}>
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {toppings.map(topping =>
          
        <label key={topping.topping_id}>
          <input
            name={topping.text}
            type="checkbox"
            value = {topping.text}
            onChange={HandleCheckbox}
          />
          {topping.text}<br />
        </label>
        )}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled= {!isFormValid()} />
    </form>
  )
}
