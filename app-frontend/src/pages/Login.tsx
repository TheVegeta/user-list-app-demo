import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import cogoToast from "cogo-toast";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone-lite";
import { FormInput } from "../component/Forms";
import { IUserAuthInput, useUserAtuhMutation } from "../generated/graphql";
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

const initialValue: IUserAuthInput = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(18).required(),
});

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUserAuthInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const [registerUser] = useUserAtuhMutation();
  const { setAuth } = useAppState();
  const { push } = useHistory();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await registerUser({
        variables: {
          options: {
            email: data.email,
            password: data.password,
          },
        },
      });

      if (response.data?.userAtuh.success === true) {
        setAuth({
          jwt: response.data.userAtuh.jwt,
          username: response.data.userAtuh.username,
        });

        push("/dashboard");

        cogoToast.success("Authenticated successfully");
      } else {
        cogoToast.error(response.data?.userAtuh.msg);
      }
    } catch (err) {
      cogoToast.error("Network Issues");
    }
  });

  return (
    <Center>
      <form onSubmit={onSubmit}>
        <Card>
          <H4>Login</H4>

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

          <Button type="submit">Login</Button>
          <P>
            Don't have an account? <Link to="/signup">Register</Link>
          </P>
        </Card>
      </form>
    </Center>
  );
};

export default Login;
