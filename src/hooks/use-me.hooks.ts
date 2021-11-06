import { useEffect, useState } from 'react';
import { getMeAPI } from '@api/user.service';
import { signOutAPI } from '@api/auth.service';

export const useMe = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMeAPI();
        setUserId(data.user?.id || null);
      } catch (err) {
        await signOutAPI();
      }
    })();
  }, []);

  return [userId];
};
