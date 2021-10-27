import React,{useState, useRef} from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModel from '../UI/ErrorModel';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState('');
    const nameInputRef =useRef();
    const ageInputRef = useRef();


    const addUserHandler = (event) => {
        event.preventDefault();

        

        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: 'Invalid username',
                message: 'Please insert a valid name'
            })
            return;
        }

        if(+enteredAge < 1){
            setError({
                title: 'invalid age',
                message: 'Please insert a valid age'
            })
            
            return;
        }
        
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredAge('');
        setEnteredUsername('');
    }

    const usernameChangerHandler = (event) => {
        setEnteredUsername(event.target.value)
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value)
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <>
            {error && <ErrorModel title={error.title} message={error.message} onConfirm={errorHandler}/>}

            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                        <label htmlFor="username">User Name</label>
                        <input id="username" type="text" value={enteredUsername} onChange={usernameChangerHandler} ref={nameInputRef}></input>
                        <label htmlFor="age">Age (Years)</label>
                        <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler} ref={ageInputRef}></input>

                        <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>    
        
    );
};

export default AddUser;