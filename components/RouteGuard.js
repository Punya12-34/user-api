import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavourites] = useAtom(favouritesAtom);
  const [, setHistory] = useAtom(searchHistoryAtom);

  // ✅ This runs on every route change
  useEffect(() => {
    async function updateAtoms() {
      setFavourites(await getFavourites());
      setHistory(await getHistory());
    }

    if (isAuthenticated()) {
      updateAtoms();
    }

    if (!PUBLIC_PATHS.includes(router.pathname) && !isAuthenticated()) {
      router.push('/login');
    }
  }, [router.pathname]);

  return children;
}
