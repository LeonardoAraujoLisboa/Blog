/* eslint-disable prettier/prettier */
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";
import { loadPosts, StrapiPostAndSettings, defaultLoadPostsVariables } from "../../api/load-posts";
import {Loading} from '../../templates/Loading';
import { PostsTemplate } from "../../templates/PostsTemplates";


export default function TagPage({posts, setting, variables}:StrapiPostAndSettings) {
    const router = useRouter()

    if(router.isFallback) {
        return <Loading />
    }

    const tagName = posts[0].tags.filter((tag) => tag.slug === router.query.slug)[0].displayName
    return (
        <>
          <Head>
            <title>Tag: {tagName} - {setting.blogName}</title>
            <meta name="description" content={setting.blogDescription} />
          </Head>
          <PostsTemplate posts={posts} settings={setting} variables={variables} />
        </>
      );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<StrapiPostAndSettings> = async (ctx) => {
    let data = null;
    const variables = { tagSlug: ctx.params.slug as string };
  
    try {
      data = await loadPosts(variables);
    } catch(error) {
      data = null;
    }
  
    if (!data || !data.posts || !data.posts.length) {
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
      },
      revalidate: 24 * 60 * 60
    }
  }

  /* COMO SÃO VÁRIOS POSTS EU TENHO Q RENDERIZAR ALGUNS PRIMEIROS COM GETSTATICPATHS */