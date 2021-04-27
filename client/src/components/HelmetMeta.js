import { Helmet } from "react-helmet";

export default function HelmetMeta({ title}) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  );
}
