import { gql, useQuery } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

export async function getAll() {
  return apolloClient
    .query({
      query: gql`
        query {
          posts {
            id
            title
            content
            slug
            image {
                url
            }
            category {
                id
                name
            }
            comments {
              id
              user {
                id
                username
              }
              content
              published_at
            }
          }
        }
      `,
    })
    .then((result) => {
      const posts = result?.data?.posts || [];
        return posts
    })
    .catch((e) => { console.error(e)});
}

export async function getPostsByCategory(params) {
    return apolloClient
    .query({
      query: gql`
      query Posts($id: String!) {
          posts(where: { category: $id }) {
              id
              title
              content
              slug
              user {
                username
              }
              image {
                  url
              }
              category {
                  id
                  name
              }
              published_at
              comments {
                id
                user {
                  id
                  username
                }
                content
                published_at
              }
            }
        }
      `,
      variables: {
        id: `${params.id}`
      }
    })
    .then((result) => {
      const posts = result?.data?.posts || [];
        return posts
    })
    .catch((e) => {
      console.error(e)
    })
}

export async function getBySlug(params) {
  return apolloClient
    .query({
      query: gql`
        query Posts($slug: String) {
          posts(where: {slug: $slug}) {
            id
            title
            content
            slug
            user {
              username
            }
            image {
                url
            }
            category {
                id
                name
            }
            published_at
            comments {
              id
              user {
                id
                username
              }
              content
              published_at
            }
          }
        }
      `,
      variables: {
        slug: params.slug
      }
    })
    .then((result) => {
      return result.data.posts[0];
    })
    .catch((e) => {
      console.error(e);
    })
}
