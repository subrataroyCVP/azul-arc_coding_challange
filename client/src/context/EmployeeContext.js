import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/employees`;

console.log("API URL:", API_URL);

// Initial State
const initialState = {
    employees: [],
    loading: true,
    error: null,
};

// Reducer function
const employeeReducer = (state, action) => {
    switch (action.type) {
        case "GET_EMPLOYEES_SUCCESS":
            return { ...state, employees: action.payload, loading: false };
        case "ADD_EMPLOYEE_SUCCESS":
            return {
                ...state,
                employees: [...state.employees, action.payload],
            };
        case "UPDATE_EMPLOYEE_SUCCESS":
            return {
                ...state,
                employees: state.employees.map((emp) =>
                    emp._id === action.payload._id ? action.payload : emp
                ),
            };
        case "DELETE_EMPLOYEE_SUCCESS":
            return {
                ...state,
                employees: state.employees.filter(
                    (emp) => emp._id !== action.payload
                ),
            };
        case "API_ERROR":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

// Create Context
const EmployeeContext = createContext(initialState);

// Provider Component
export const EmployeeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(employeeReducer, initialState);

    // Actions
    const getEmployees = async () => {
        try {
            const res = await axios.get(API_URL);
            dispatch({ type: "GET_EMPLOYEES_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "API_ERROR", payload: err.response.data.message });
        }
    };

    const addEmployee = async (employee) => {
        try {
            const res = await axios.post(API_URL, employee);
            dispatch({ type: "ADD_EMPLOYEE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "API_ERROR", payload: err.response.data.message });
        }
    };

    const updateEmployee = async (id, employee) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, employee);
            dispatch({ type: "UPDATE_EMPLOYEE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "API_ERROR", payload: err.response.data.message });
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            dispatch({ type: "DELETE_EMPLOYEE_SUCCESS", payload: id });
        } catch (err) {
            dispatch({ type: "API_ERROR", payload: err.response.data.message });
        }
    };

    return (
        <EmployeeContext.Provider
            value={{
                ...state,
                getEmployees,
                addEmployee,
                updateEmployee,
                deleteEmployee,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};

// Custom Hook to use the Employee Context
export const useEmployees = () => {
    return useContext(EmployeeContext);
};
