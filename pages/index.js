import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Igor; I'm a software enginner and a chef of pancakes!</p>
        <p>Here yoy will meet the BYoda, my little assistant.</p>
        <br />
        <p>
          You can see the <strong>Writers Helper</strong> of BYoda here:
          <strong><Link href='/chat'> BYoda Helps!</Link></strong>
          <br /><br />
          <small>(It was made  especially for Gabs (❤️) but if you are a curious, you can play it too)</small>
        </p>
      </section>
    </Layout>
  );
}