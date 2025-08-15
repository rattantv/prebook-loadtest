import Head from "next/head";
import Layout from "../components/layout";
import {
  ResponsiveGrid,
  fetchModel,
} from "@adobe/aem-react-editable-components";
import getPages from "../lib/getPages";

const { NEXT_PUBLIC_AEM_HOST, NEXT_PUBLIC_AEM_ROOT } = process.env;

export default function Home({ model, pagePath, pages }) {
  console.log("model", model, pagePath, pages);
  return (
    <Layout pages={pages}>
      <Head>
        <title>{model.title}</title>
      </Head>
      <section>
        <div className="px-2 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-2 lg:py-6">
          <ResponsiveGrid
            key={pagePath}
            model={model}
            pagePath={pagePath}
            itemPath="root/responsivegrid"
          />
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const pagePath = `${NEXT_PUBLIC_AEM_ROOT}/${
    context.query.page?.join("/") || "main"
  }`;

  const pages = await getPages(NEXT_PUBLIC_AEM_ROOT);
  const model = await fetchModel({
    pagePath,
    itemPath: "root/responsivegrid",
    host: NEXT_PUBLIC_AEM_HOST,
    options: {
      headers: {
        Authorization: `Basic ${process.env.NEXT_PUBLIC_AEM_TOKEN}`,
      },
    },
  });

  return {
    props: {
      model,
      pagePath,
      pages,
    },
  };
}
