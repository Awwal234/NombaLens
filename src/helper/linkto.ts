import { useRouter } from "vue-router";

export const useLinkTo = () => {
  const router = useRouter();

  const linkTo = (path: string) => {
    router.push(path);
    window.scrollTo(0, 0)
  };

  return { linkTo };
};

