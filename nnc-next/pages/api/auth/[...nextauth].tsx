import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const options = {
    providers: [
        Providers.Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "test@test.com",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials: any) {
                try {
                    const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
                        {
                            identifier: credentials.email,
                            password: credentials.password,
                        }
                    );
                    if (data) {
                        return data;
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login'
    },
    debug: true,
    session: {
        jwt: true,
    },

    callbacks: {
        jwt: async (token, user, account) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.jwt = user.jwt;
                token.id = user.user.id;
                user &&
                    (token.user = {
                        name: user.user.username,
                        email: user.user.email,
                        image: null,
                    });
            }
            return Promise.resolve(token);
        },

        session: async (session, token) => {
            session.jwt = token.jwt;
            session.id = token.id;
            session.user = token.user;
            return Promise.resolve(session);
        },
    },
};

export default (req, res) => NextAuth(req, res, options);
