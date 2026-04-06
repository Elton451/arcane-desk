import { auth0 } from "@/lib/auth0";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";

const HomePage = async ({ params }: { params: Promise<Params> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/auth/login?screen_hint=signup"
        >
          Sign up
        </a>
        <a target="_blank" rel="noopener noreferrer" href="/auth/login">
          Log in
        </a>
      </main>
    );
  }

  return <div>{dict.home.title}</div>;
};

export default HomePage;
