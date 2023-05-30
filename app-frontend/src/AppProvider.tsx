import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { FC, ReactNode, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppState } from "./store";

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { jwt } = useAppState();

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: `${process.env.REACT_APP_BACKEND_BASE_URI}/graphql`,
        cache: new InMemoryCache(),
        defaultOptions: {
          query: { fetchPolicy: "no-cache" },
          mutate: { fetchPolicy: "no-cache" },
          watchQuery: { fetchPolicy: "no-cache" },
        },
        headers: { authorization: `Bearer ${jwt}` },
      }),
    [jwt]
  );

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
