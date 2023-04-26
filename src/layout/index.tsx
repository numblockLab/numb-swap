import Footer from "./footer";
import Header from "./header";

export default function DefaultLayout(props: { children: JSX.Element | string | undefined | null }) {
  const { children } = props;
  return (
    <div data-rk>
      <div className="css-hzuiln ejqi8vo0">
        <Header />
        <div className="main-content-cover">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
