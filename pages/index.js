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
        <p>Hello, I'm Igor; a software enginner and a chef of pancakes!</p>
        <p>Here you will meet the BYoda, my little assistant.</p>
        <br />
        <p>You can see below all the BYoda super powers:</p>
        <ul>
          <li><Link href='/chat'>Creative Block</Link></li>
          <li><Link href='/imaginex'>Character Generator</Link></li>
        </ul>
        <small>(It was made  especially for Gabs (❤️) but if you are a curious, you can play it too)</small>
      </section>
    </Layout>
  );
}