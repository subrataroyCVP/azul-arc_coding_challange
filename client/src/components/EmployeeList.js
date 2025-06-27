import { useEffect, useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
// import EmployeeForm from "./EmployeeForm";
import {
    Container,
    Box,
    Button,
    CircularProgress,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardActions,
    CardContent,
} from "@mui/material";

const EmployeeList = () => {
    const { employees, getEmployees, deleteEmployee, loading } = useEmployees();
    const [modalOpen, setModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    useEffect(() => {
        getEmployees();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenAddModal = () => {
        setEmployeeToEdit(null);
        setModalOpen(true);
    };

    const handleOpenEditModal = (employee) => {
        setEmployeeToEdit(employee);
        setModalOpen(true);
    };

    const handleCloseModal = (employee) => {
        setEmployeeToEdit(null);
        setModalOpen(false);
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Employee Manager
                </Typography>
                <Button variant="contained" onClick={handleOpenAddModal}>
                    Add Employee
                </Button>
            </Box>

            {/* <EmployeeForm
                open={modalOpen}
                handleClose={handleCloseModal}
                employee={employeeToEdit}
            /> */}

            <Grid container spacing={3}>
                {employees.map((emp) => (
                    <Grid item xs={12} sm={6} md={4} key={emp._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={
                                    emp.photo ||
                                    "https://placehold.co/600x400?text=No+Photo"
                                }
                                alt={emp.name}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {emp.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {emp.email}
                                </Typography>
                                {emp.dob && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        DOB:{" "}
                                        {new Date(emp.dob).toLocaleDateString()}
                                    </Typography>
                                )}
                                {emp.address && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Address: {emp.address}
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() => handleOpenEditModal(emp)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => deleteEmployee(emp._id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default EmployeeList;
