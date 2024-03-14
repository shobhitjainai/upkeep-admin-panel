import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormHelperText from "@mui/material/FormHelperText";
import jwtService from "../../auth/services/jwtService";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from "@mui/material/FormLabel";


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  // userName: yup.string().required("You must enter display name"),
  // email: yup
  //   .string()
  //   .email("You must enter a valid email")
  //   .required("You must enter a email"),
  // password: yup
  //   .string()
  //   .required("Please enter your password.")
  //   .min(8, "Password is too short - should be 8 chars minimum."),
  // passwordConfirm: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match"),
  // acceptTermsConditions: yup
  //   .boolean()
  //   .oneOf([true], "The terms and conditions must be accepted."),
});

const defaultValues = {
  userName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phoneNumber: "",
  role: "",
  gender:"",
  acceptTermsConditions: false,
};

function SignUpPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ userName, password, email, phoneNumber,role, gender }) {
    jwtService
      .createUser({
        username : userName,
        password,
        email,
        phoneNumber,
        role,
        gender
      })
      .then((res) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
        
      })
      .catch((errors) => {
        console.log(errors,'ghfhgfh')
        // _errors.forEach((error) => {
          // setError(error.type, {
          //   type: "manual",
          //   message: error.message,
          // });
        // });
      });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0 flex flex-col items-center">
          <img
            className="w-48"
            src="assets/images/logo/upkeep_logo.png"
            alt="logo"
          />
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
            Sign up
          </Typography>

          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" to="/sign-in">
              Sign in
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="User Name"
                  autoFocus
                  type="name"
                  error={!!errors.userName}
                  helperText={errors?.userName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            {/* <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            /> */}

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type={showConfirmPassword ? "text" : "password"}
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone Number"
                  autoFocus
                  type="text"
                  error={!!errors.phoneNumber}
                  helperText={errors?.phoneNumber?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                   <Typography variant="h6">Role</Typography>
                  {/* <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                  /> */}
                  <FormControlLabel
                    value="Tenant"
                    control={<Radio />}
                    label="Tenant"
                  />
                  <FormControlLabel
                    value="Landlord"
                    control={<Radio />}
                    label="Landlord"
                  />
                </RadioGroup>
              )}
            />
             <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                   <Typography variant="h6">Gender</Typography>
                  
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              )}
            />

            {/* <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl
                  className="items-center"
                  error={!!errors.acceptTermsConditions}
                >
                  <FormControlLabel
                    label="I agree to the Terms of Service and Privacy Policy"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>
                    {errors?.acceptTermsConditions?.message}
                  </FormHelperText>
                </FormControl>
              )}
            /> */}

            <Button
              variant="contained"
              style={{ backgroundColor: "#51AB30", color: "white" }}
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Create your free account
            </Button>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: "primary.main" }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: "primary.light" }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: "primary.light" }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to Upkeep</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            Your trusted platform for landlord-tenant relations, fostering
            transparency and ease in property management
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignUpPage;
