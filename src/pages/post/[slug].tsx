/* eslint-disable prettier/prettier */
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";
import { loadPosts, StrapiPostAndSettings } from "../../api/load-posts";
import { PostTemplate } from "../../templates/PostTemplate";
import {Loading} from '../../templates/Loading';

export default function PostPage({posts, setting}:StrapiPostAndSettings) {
    const router = useRouter()

    if(router.isFallback) {
        return <Loading />
    }
    const post = posts[0];
    return (
        <>
            <Head>
                <title>{post.title} - {setting.blogName}</title>
                <meta name="description" content={post.excerpt} />
            </Head>
            <PostTemplate post={posts[0]} settings={setting} />
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    let data: StrapiPostAndSettings | null = null;
    let paths = [];
  
    try {
      data = await loadPosts();
      paths = data.posts.map(post => ({params: {slug: post.slug}}))
    } catch(error) {
      data = null;
    }
    
    if (!data || !data.posts || !data.posts.length) {
        paths = []
    }

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<StrapiPostAndSettings> = async (ctx) => {
    let data = null;
  
    try {
      data = await loadPosts({postSlug: ctx.params.slug as string});
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
        setting: data.setting
      },
      revalidate: 24 * 60 * 60
    }
  }

  /* COMO SÃO VÁRIOS POSTS EU TENHO Q RENDERIZAR ALGUNS PRIMEIROS COM GETSTATICPATHS */