/* eslint-disable prettier/prettier */
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { loadPosts, StrapiPostAndSettings, defaultLoadPostsVariables } from "../../api/load-posts";
import { PostsTemplate } from "../../templates/PostsTemplates";


export default function SearchPage({posts, setting, variables,}:StrapiPostAndSettings) {
    const router = useRouter()

    return (
        <>
          <Head>
            <title>Pesquisa: {router.query.q} - {setting.blogName}</title>
            <meta name="description" content={setting.blogDescription} />
          </Head>
          <PostsTemplate posts={posts} settings={setting} variables={variables} />
        </>
      );
}

export const getServerSideProps: GetServerSideProps<StrapiPostAndSettings> = async (ctx) => {
    let data = null;
    const query = ctx.query.q || ''
    const variables = { postSearch: query as string };

    if (!query) {
        return {
            notFound: true,
        }
    }
  
    try {
      data = await loadPosts(variables);
    } catch(error) {
      data = null;
    }
  
    if (!data || !data.posts) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
        posts: data.posts,
        setting: data.setting,
        variables: {
            ...defaultLoadPostsVariables,
            ...variables,
          },
      }
    }
  }

  /* COMO SÃO VÁRIOS POSTS EU TENHO Q RENDERIZAR ALGUNS PRIMEIROS COM GETSTATICPATHS */