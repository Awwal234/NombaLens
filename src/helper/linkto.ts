import { useRouter } from "vue-router";

export const useLinkTo = () => {
  const router = useRouter();

  const linkTo = (path: string, e: Event) => {
    router.push(path);
    window.scrollTo(0, 0)
    e.stopPropagation();
  };

  return { linkTo };
};

