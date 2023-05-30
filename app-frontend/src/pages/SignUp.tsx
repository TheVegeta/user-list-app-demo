import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone-lite";
import { FormInput } from "../component/Forms";
import { ICreaeUser, useRegisterUserMutation } from "../generated/graphql";
import { useAppState } from "../store";
import { Button, Card, Center } from "../styles";

const H4 = styled.h4`
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const P = styled.p`
  padding: 1rem;
  text-align: center;
  margin-top: 0.8rem;

  a {
    color: #000;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

interface IRegisterUser extends ICreaeUser {
  confirmpassword: string;
}

const initialValue: IRegisterUser = {
  email: "",
  username: "",
  password: "",
  confirmpassword: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  username: Yup.string().min(3).required(),
  password: Yup.string().min(8).max(18).required(),
  confirmpassword: Yup.string()
    .min(8)
    .max(18)
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(),
});

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegisterUser>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const [registerUser] = useRegisterUserMutation();
  const { setAuth } = useAppState();
  const { push } = useHistory();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await registerUser({
        variables: {
          options: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        },
      });

      if (response.data?.registerUser.success === true) {
        setAuth({
          jwt: response.data.registerUser.jwt,
          username: response.data.registerUser.username,
        });

        push("/dashboard");

        cogoToast.success("Authenticated successfully");
      } else {
        cogoToast.error(response.data?.registerUser.msg);
      }
    } catch (err) {
      cogoToast.error("Network Issues");
    }
  });

  return (
    <Center>
      <form onSubmit={onSubmit}>
        <Card>
          <H4>Registration</H4>
          <FormInput
            label="Full name"
            placeholder="Enter name"
            err={errors.username}
            register={register}
            name="username"
          />
          <FormInput
            label="Email"
            placeholder="Enter Email"
            err={errors.email}
            register={register}
            name="email"
          />
          <FormInput
            label="Password"
            placeholder="Enter Password"
            err={errors.password}
            register={register}
            name="password"
            isSecure={true}
          />
          <FormInput
            label="Confirm Password"
            placeholder="Enter Password"
            err={errors.confirmpassword}
            register={register}
            name="confirmpassword"
            isSecure={true}
          />
          <Button type="submit">Sign Up</Button>
          <P>
            Already have an account? <Link to="/login">Login</Link>
          </P>
        </Card>
      </form>
    </Center>
  );
};

export default SignUp;
