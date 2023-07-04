import {
  TextField,
  Button,
  Paper,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../userStore";

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: number;
  country: string;
  ocupation: string;
}

const Register = () => {
  const [country, setCountry] = useState("");

  const handleCountry = (e: SelectChangeEvent) => {
    setCountry(e.target.value as string);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const addUser = useUserStore((state) => state.addUser);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    addUser(data);
    console.log(data);
    reset();
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ display: "flex", flexDirection: "column", p: 2, gap: 2 }}>
          <Controller
            defaultValue=""
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.name}
                helperText={errors.name ? "Please add name" : ""}
                label="Name"
                autoComplete="off"
              ></TextField>
            )}
          />
          <Controller
            defaultValue=""
            control={control}
            name="surname"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.surname}
                helperText={errors.surname ? "Please add surname" : ""}
                label="Surname"
                autoComplete="off"
              ></TextField>
            )}
          />

          <Controller
            defaultValue=""
            control={control}
            name="email"
            rules={{ required: true, pattern: /^\S+@\S+$/ }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.email}
                helperText={errors.email ? "Please add email address" : ""}
                label="Email"
                autoComplete="off"
              ></TextField>
            )}
          />
          <Controller
            defaultValue=""
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                type="password"
                {...field}
                error={!!errors.password}
                helperText={errors.password ? "Please add password" : ""}
                label="Password"
                autoComplete="off"
              ></TextField>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: true, pattern: /^[0-9]+$/ }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.phoneNumber}
                helperText={
                  errors.phoneNumber ? "Please add valid phone number" : ""
                }
                label="Phone Number"
                autoComplete="off"
              ></TextField>
            )}
          />
          <FormControl>
            <InputLabel id="country">Country</InputLabel>
            <Select
              {...register("country")}
              labelId="country"
              color="primary"
              label="Country"
              value={country}
              onChange={handleCountry}
            >
              <MenuItem value={"Uk"}>Uk</MenuItem>
              <MenuItem value={"USA"}>Usa</MenuItem>
              <MenuItem value={"France"}>France</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...register("ocupation")}
            label="Ocupation"
            autoComplete="off"
          ></TextField>
          <Button type="submit">Create User</Button>
        </Paper>
      </form>
    </Box>
  );
};

export default Register;
