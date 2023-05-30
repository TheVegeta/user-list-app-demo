import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type IAuthResponse = {
  __typename?: "IAuthResponse";
  jwt: Scalars["String"]["output"];
  msg: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
  username: Scalars["String"]["output"];
};

export type ICreaeUser = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type IUserAuthInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  registerUser: IAuthResponse;
  userAtuh: IAuthResponse;
};

export type MutationRegisterUserArgs = {
  options: ICreaeUser;
};

export type MutationUserAtuhArgs = {
  options: IUserAuthInput;
};

export type Query = {
  __typename?: "Query";
  getAllUser: Array<User>;
  hello: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  age: Scalars["Float"]["output"];
  email: Scalars["String"]["output"];
  hash: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isForLogin: Scalars["Boolean"]["output"];
  mobile: Scalars["String"]["output"];
  registerDate: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type RegisterUserMutationVariables = Exact<{
  options: ICreaeUser;
}>;

export type RegisterUserMutation = {
  __typename?: "Mutation";
  registerUser: {
    __typename?: "IAuthResponse";
    success: boolean;
    msg: string;
    jwt: string;
    username: string;
  };
};

export type UserAtuhMutationVariables = Exact<{
  options: IUserAuthInput;
}>;

export type UserAtuhMutation = {
  __typename?: "Mutation";
  userAtuh: {
    __typename?: "IAuthResponse";
    success: boolean;
    msg: string;
    jwt: string;
    username: string;
  };
};

export type GetAllUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUserQuery = {
  __typename?: "Query";
  getAllUser: Array<{
    __typename?: "User";
    id: string;
    username: string;
    mobile: string;
    hash: string;
    email: string;
    age: number;
    registerDate: string;
    isForLogin: boolean;
    isActive: boolean;
  }>;
};

export const RegisterUserDocument = gql`
  mutation RegisterUser($options: ICreaeUser!) {
    registerUser(options: $options) {
      success
      msg
      jwt
      username
    }
  }
`;
export type RegisterUserMutationFn = Apollo.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(RegisterUserDocument, options);
}
export type RegisterUserMutationHookResult = ReturnType<
  typeof useRegisterUserMutation
>;
export type RegisterUserMutationResult =
  Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const UserAtuhDocument = gql`
  mutation UserAtuh($options: IUserAuthInput!) {
    userAtuh(options: $options) {
      success
      msg
      jwt
      username
    }
  }
`;
export type UserAtuhMutationFn = Apollo.MutationFunction<
  UserAtuhMutation,
  UserAtuhMutationVariables
>;

/**
 * __useUserAtuhMutation__
 *
 * To run a mutation, you first call `useUserAtuhMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserAtuhMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userAtuhMutation, { data, loading, error }] = useUserAtuhMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUserAtuhMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserAtuhMutation,
    UserAtuhMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserAtuhMutation, UserAtuhMutationVariables>(
    UserAtuhDocument,
    options
  );
}
export type UserAtuhMutationHookResult = ReturnType<typeof useUserAtuhMutation>;
export type UserAtuhMutationResult = Apollo.MutationResult<UserAtuhMutation>;
export type UserAtuhMutationOptions = Apollo.BaseMutationOptions<
  UserAtuhMutation,
  UserAtuhMutationVariables
>;
export const GetAllUserDocument = gql`
  query GetAllUser {
    getAllUser {
      id
      username
      mobile
      hash
      email
      age
      registerDate
      isForLogin
      isActive
    }
  }
`;

/**
 * __useGetAllUserQuery__
 *
 * To run a query within a React component, call `useGetAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllUserQuery,
    GetAllUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUserQuery, GetAllUserQueryVariables>(
    GetAllUserDocument,
    options
  );
}
export function useGetAllUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUserQuery,
    GetAllUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUserQuery, GetAllUserQueryVariables>(
    GetAllUserDocument,
    options
  );
}
export type GetAllUserQueryHookResult = ReturnType<typeof useGetAllUserQuery>;
export type GetAllUserLazyQueryHookResult = ReturnType<
  typeof useGetAllUserLazyQuery
>;
export type GetAllUserQueryResult = Apollo.QueryResult<
  GetAllUserQuery,
  GetAllUserQueryVariables
>;
