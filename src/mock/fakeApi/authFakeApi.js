export default function authFakeApi(server, apiPrefix) {
  server.post(`${apiPrefix}/sign-in`, (schema, { requestBody }) => {
    const { email, password } = JSON.parse(requestBody);
    const user = schema.db.signInUserData.findBy({
      accountUsername: email,
      password,
    });

    if (user) {
      const { avatar, userName, email, role } = user;
      return {
        user: { avatar, userName, email, role },
        token: "wVYrxaeNa9OxdnULvde1Au5m5w63",
      };
    }
    return new Response(
      401,
      { some: "header" },
      { message: "Invalid email or password!" }
    );
  });

  server.post(`${apiPrefix}/sign-out`, () => {
    return true;
  });
}
