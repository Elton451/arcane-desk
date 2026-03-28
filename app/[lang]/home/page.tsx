import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";

const HomePage = async ({ params }: { params: Promise<Params> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <div>{dict.home.title}</div>;
};

export default HomePage;
