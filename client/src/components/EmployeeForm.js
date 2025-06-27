import { useCallback, useState, useEffect } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { useForm, Controller } from "react-hook-form";
import {
    Modal,
    Box,
    Typography,
    TextField,
    IconButton,
    Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const EmployeeForm = ({ employee, open, handleClose }) => {
    console.log("EmployeeForm rendered with employee:", employee);

    const { addEmployee, updateEmployee } = useEmployees();
    const isEditMode = Boolean(employee);
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    // Reset form values when employee changes
    useEffect(() => {
        if (employee) {
            reset({
                name: employee.name || "",
                dob: new Date(employee.dob).toISOString().split("T")[0] || "",
                email: employee.email || "",
                address: employee.address || "",
                photo: employee.photo || null,
            });
            setPhotoPreview(employee.photo || null);
        } else {
            reset({
                name: "",
                dob: "",
                email: "",
                address: "",
                photo: null,
            });
            setPhotoPreview(null);
        }
    }, [employee, reset, open]);

    const [photoPreview, setPhotoPreview] = useState(
        employee ? employee.photo : null
    );

    const onSubmit = useCallback(
        (data) => {
            if (isEditMode) {
                updateEmployee(employee._id, data);
            } else {
                addEmployee(data);
            }
            setPhotoPreview(null);
            handleClose();
        },
        [isEditMode, addEmployee, updateEmployee, handleClose]
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setValue("photo", reader.result, { shouldValidate: true });
                setPhotoPreview(reader.result);
            };
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", top: 10, right: 10 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" mb={2}>
                    {employee ? "Edit Employee" : "Add Employee"}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Name is required",
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message:
                                        "Only letters and spaces are allowed",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name*"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="email"
                                    label="Email*"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="dob"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="date"
                                    label="Date of Birth"
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField {...field} label="Address" />
                            )}
                        />

                        <Button variant="contained" component="label">
                            Upload Photo
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                        {photoPreview && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    style={{
                                        marginTop: 10,
                                        height: "150px",
                                        width: "150px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                        )}
                        {/* Action Buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 1,
                                mt: 2,
                            }}
                        >
                            <Button onClick={handleClose} color="inherit">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                                Save
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EmployeeForm;
