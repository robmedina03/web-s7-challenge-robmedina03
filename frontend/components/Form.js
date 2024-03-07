import React, { useEffect, useState } from 'react'
import * as yup from 'yup';


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
};

// 👇 Here you will create your schema.

const schema = yup.object().shape({

    fullName: yup.string().min(3, validationErrors.fullNameTooShort).max(20,validationErrors.fullNameTooLong),
    size: yup.string().oneOf(['S','M','L'], validationErrors.sizeIncorrect)
});

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
      const [enteredFullName,setEnteredFullName]= useState('')
      const [selectedToppingsMessage, setSelectedToppingsMessage] = useState('');
      const [submittedSize, setSubmittedSize] = useState('');

        
      const handleCheckbox = (e) => {

        const value = e.target.value;
        const ischecked = e.target.checked;

        if(ischecked){
          setSelectedToppings([...selectedToppings,value])
        
        } else {

          setSelectedToppings(selectedToppings.filter(topping => topping !== value));
         
        }

      }

        const HandleChangeFullName = (e) =>{
              const value = e.target.value
          setfullName(value);
          
          validateField('fullName', value);
          
      };
      

      
         const handleChangeSize = (e) => {
          const value = e.target.value
         setSize(value)
         
         validateField('size', value);
         
          
         };
         
         const validateField = async (fieldName, value) => {

          try{
            const trimmedValue = value.trim();

            await schema.validate({[fieldName]: trimmedValue});
            setErrors((prevErrors) => ({ ...prevErrors,[fieldName]: ''
              
            }));
          }catch (err){
            setErrors((prevErrors) =>({
              ...prevErrors,[fieldName]: err.errors[0]
            }));
          }
          };

     
      
         


      
      const isFormValid = () => Object.values(errors).every(error => !error) && fullName !== '' && size !== '';

      const handleSubmit = (e) => {

        e.preventDefault();
        

          const selectedBoxCount = selectedToppings.length
          const message = selectedBoxCount === 0 ? 'no toppings' :`${selectedBoxCount} ${selectedBoxCount === 1 ? 'topping' : 'toppings'}`;
          setSelectedToppingsMessage(message)
          setEnteredFullName(fullName)
          setSubmitSuccess(true);
            
          setSubmitFailure(false);
          setfullName('');
         setSelectedToppings([]);
          setSize('');
          setSubmittedSize(size)
      };

      



      
     
  return (
    
    <form onSubmit={handleSubmit}>
      
      <h2>Order Your Pizza</h2>
      {submitSuccess && <div className='success'>Thank you for your order, {enteredFullName}! Your {submittedSize === 'S' ? 'small': submittedSize === 'M' ? 'medium': 'large'}{' '} pizza with {selectedToppingsMessage} is on the way.  </div>}
      {submitFailure && <div className='failure'>Something went wrong</div>}
      
        
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" value= {fullName} onChange={HandleChangeFullName} />
        </div>
        {errors.fullName  && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" value={size} onChange={handleChangeSize}>
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
            checked={selectedToppings.includes(topping.text)}
            onChange={handleCheckbox}
            
           
          />
          {topping.text}<br />
        </label>
        )}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled= {!isFormValid()} />
    </form>
  );
        }
      
      