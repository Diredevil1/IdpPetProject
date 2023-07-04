import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../userStore";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const users = useUserStore((state) => state.users);
  const setLoggedInUser = useUserStore((state) => state.setLoggedInUser);

  const handleRegister = () => {
    navigate("/register");
  };

  const onSubmit = (data: LoginForm) => {
    const { email, password } = data;
    const user = users.find((user) => user.email === email);
    if (user && user.password === password) {
      setLoggedInUser(user);
      navigate("/layout");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ display: "flex", flexDirection: "column", p: 2, gap: 2 }}>
          <Controller
            rules={{ required: true }}
            defaultValue=""
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                placeholder="Email"
                error={!!errors.email}
                helperText={errors.email ? "Please add email" : ""}
                onFocus={clearErrorMessage}
              />
            )}
          />

          <Controller
            rules={{ required: true }}
            defaultValue=""
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                placeholder="Password"
                error={!!errors.password}
                helperText={errors.password ? "Please add password" : ""}
                onFocus={clearErrorMessage}
              />
            )}
          />
          {errorMessage && (
            <Typography sx={{ textAlign: "center", color: "#e63946" }}>
              {errorMessage}
            </Typography>
          )}
          <Button type="submit">Login</Button>
        </Paper>
      </form>
      <Typography sx={{ mt: "10px", color: "#ffc300" }}>
        Don't have account?{" "}
        <Button color="warning" onClick={handleRegister}>
          register
        </Button>
      </Typography>
    </Box>
  );
};

export default Login;
